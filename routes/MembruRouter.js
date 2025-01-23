import express from 'express'
import { getMembruEchipa,getMembruByName,createMembru,asociereEchipaMembru,getMembruAndEchipe,getMembruById ,getMembruProjects,getMembruBugs,getMembruProjectBugs} from '../dataAcess/MembruDA.js'

let membruRouter=express.Router();
//creare membru
membruRouter.route('/membru').post(async(req,res)=>{
    try {
        const membru = await createMembru(req.body); 
        return res.status(201).json({
            success: true,
            message: "Membrul a fost creat cu succes.",
            data: membru,
        });
    } catch (error) {
        console.error("Eroare la crearea membrului:", error.message);

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                success: false,
                message: error.errors.map((err) => err.message).join(", "),
            });
        }

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                success: false,
                message: "Adresa de email este deja utilizată!",
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la crearea membrului.",
        });
    }
});

membruRouter.route('/membru/login').post(async (req, res) => {
    const { Nume, Parola } = req.body;

    try {
        const membru = await getMembruByName(Nume); // Funcție care caută testerul în baza de date după nume

        if (!membru || membru.Parola !== Parola) {
            return res.status(401).json({
                success: false,
                message: "Nume sau parolă incorectă.",
            });
        }

        return res.json({
            success: true,
            message: "Autentificare reușită.",
            data: membru,
        });
    } catch (error) {
        console.error("Eroare la autentificare:", error.message);
        return res.status(500).json({
            success: false,
            message: "Eroare la server.",
        });
    }
});

//creaza asocierea intre membru si echipa
membruRouter.route('/membriiEchipa').post(async(req,res)=>{
    try {
        const { MembruId, EchipaId } = req.body;

        if (!MembruId || !EchipaId) {
            return res.status(400).json({
                success: false,
                message: "Trebuie să specifici atât MembruId cât și EchipaId.",
            });
        }

        const asociere = await asociereEchipaMembru(req.body);
        return res.status(201).json({
            success: true,
            message: "Asocierea a fost realizată cu succes.",
            data: asociere,
        });
    } catch (error) {
        console.error("Eroare la asocierea membrului cu echipa:", error.message);
        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la asocierea membrului cu echipa.",
        });
    }
});
//reaturneaza membru dupa id
membruRouter.route('/membru/:id').get(async (req,res)=>{
    try {
        const membru = await getMembruById(req.params.id);
        if (!membru) {
            return res.status(404).json({
                success: false,
                message: `Membrul cu id-ul ${req.params.id} nu a fost găsit.`,
            });
        }
        return res.json({
            success: true,
            data: membru,
        });
    } catch (error) {
        console.error(`Eroare la obținerea membrului cu id-ul ${req.params.id}:`, error.message);
        return res.status(500).json({
            success: false,
            message: "Eroare la obținerea membrului.",
        });
    }
});

//lista cu toti membrii
membruRouter.route('/membrii').get(async (req,res)=>{
    try {
        const membrii = await getMembruAndEchipe();
        if (!membrii || membrii.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nu există membri în baza de date.",
            });
        }
        return res.json({
            success: true,
            data: membrii,
        });
    } catch (error) {
        console.error("Eroare la obținerea membrilor:", error.message);
        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea membrilor.",
        });
    }
});
//proiectele asociate unui membru dupa id
membruRouter.route('/membru/:id/proiecte').get(async (req, res) => {
    try {
        const membruProjects = await getMembruProjects(req.params.id);
        return res.json({
            success: true,
            data: membruProjects,
        });
    } catch (error) {
        console.error(`Eroare la obținerea proiectelor pentru membrul cu id-ul ${req.params.id}:`, error.message);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
//bug urile asociate unui membru
membruRouter.route('/membru/:id/buguri').get(async (req, res) => {
    try {
        const membruBugs = await getMembruBugs(req.params.id);
        if (!membruBugs) {
            return res.status(404).json({
                success: false,
                message: `Membrul cu id-ul ${req.params.id} nu a fost găsit sau nu are bug-uri asociate.`,
            });
        }
        return res.json({
            success: true,
            data: membruBugs,
        });
    } catch (error) {
        console.error(`Eroare la obținerea bug-urilor pentru membrul cu id-ul ${req.params.id}:`, error.message);
        return res.status(500).json({
            success: false,
            message: "Eroare la obținerea bug-urilor.",
        });
    }
});
//lista bug urilor din proiectele asociate unui membru
// --pt toate echipele membrului extrage bugurile asociate
membruRouter.route('/membru/:id/buguri-proiecte').get(async (req, res) => {
    try {
        const buguri = await getMembruProjectBugs(req.params.id);
        return res.json(buguri);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});
//echipele unui membru
membruRouter.route('/membru/:id/membru-echipe').get(async (req, res) => {
    try {
        const echipe = await getMembruEchipa(req.params.id);
        return res.json(echipe);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
});


export default membruRouter;