import express from 'express';
import { getBugsByProiectId,getProiecte,createProiect,asociereProiectTester,getProiecteAndTesteri ,getProiectById} from '../dataAcess/ProiectDA.js';

let proiectRouter=express.Router();

//creare proiect
proiectRouter.route('/proiect').post(async (req,res)=>{
    try {
        const proiect = await createProiect(req.body);
        return res.status(201).json({
            success: true,
            message: "Proiectul a fost creat cu succes.",
            data: proiect,
        });
    } catch (error) {
        console.error("Eroare:", error.message);

        if (error.message.includes("Echipa cu id-ul")) {
            return res.status(404).json({
                success: false,
                message: error.message, 
            });
        }

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message, 
            });
        }

        // Eroare generică (în cazuri neprevăzute)
        return res.status(500).json({
            success: false,
            message: "A apărut o eroare.",
        });
    }
});
proiectRouter.route('/proiecte').get(async (req,res)=>{
    try {
        const proiecte = await getProiecte();
        return res.json({
            success: true,
            data: proiecte,
        });
    } catch (error) {
        console.error("Eroare la obținerea proiectelor:", error.message);
        return res.status(500).json({
            success: false,
            message: "Nu s-au putut obține proiectele.",
        });
    }
});
//obtinere proiect dupa id
proiectRouter.route('/proiect/:id').get(async (req,res)=>{
    try {
        const proiect = await getProiectById(req.params.id);
        return res.json({
            success: true,
            data: proiect,
        });
    } catch (error) {
        console.error(`Eroare la obținerea proiectului cu id-ul ${req.params.id}:`, error.message);

        if (error.message.includes("nu a fost găsit")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea proiectului.",
        });
    }
});
//creare asociere intre proiect si tester
proiectRouter.route('/proiecteTester').post(async (req,res)=>{
    try {
        const asociere = await asociereProiectTester(req.body);
        return res.status(201).json({
            success: true,
            message: "Asocierea a fost creată cu succes.",
            data: asociere,
        });
    } catch (error) {
        console.error("Eroare la crearea asocierii proiect-tester:", error.message);

        if (error.message.includes("Proiectul cu id-ul")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("Testerul cu id-ul")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        if (error.message.includes("Asocierea dintre proiectul")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }


        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la crearea asocierii proiect-tester.",
        });
    }
});
//obtinerea tuturor proiectelor si testarilor asociati
proiectRouter.route('/proiecteTesteri').get(async (req,res)=>{
    try {
        const proiecte = await getProiecteAndTesteri();
        if (!proiecte || proiecte.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nu există proiecte sau testeri în baza de date.",
            });
        }
        return res.json({
            success: true,
            data: proiecte,
        });
    } catch (error) {
        console.error("Eroare la obținerea proiectelor și testerilor:", error.message);

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea proiectelor și testerilor.",
        });
    }
});
proiectRouter.route('/proiect/:id/bugs').get(async (req, res) => {
    try {
        const bugs = await getBugsByProiectId(req.params.id);

        if (!bugs || bugs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nu există bug-uri pentru acest proiect.",
            });
        }

        return res.json({
            success: true,
            data: bugs,
        });
    } catch (error) {
        console.error("Eroare la obținerea bug-urilor pentru proiectul cu id-ul ${req.params.id}:", error.message);

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea bug-urilor proiectului.",
        });
    }
});

export default proiectRouter;  