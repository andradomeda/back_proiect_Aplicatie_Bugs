import express from 'express';
import { createEchipa,getEchipaById,getEchipe,deleteEchipa, asociereEchipaMembru,getEchipaAndMembrii } from '../dataAcess/EchipaDA.js';

let echipaRouter=express.Router();
//crearea unei echipe
echipaRouter.route('/echipa').post(async (req,res)=>{
    try {
        const echipa = await createEchipa(req.body);
        return res.status(201).json({
            success: true,
            message: "Echipa a fost creată cu succes.",
            data: echipa,
        });
    } catch (error) {
        console.error("Eroare la crearea echipei:", error.message);

        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message, 
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la crearea echipei.",
        });
    }
});
//obtinerea tuturor echipelor
echipaRouter.route('/echipe').get(async (req,res)=>{
    try {
        const echipe = await getEchipe();
        if (!echipe || echipe.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nu există echipe în baza de date.",
            });
        }
        return res.json({
            success: true,
            data: echipe,
        });
    } catch (error) {
        console.error("Eroare la obținerea echipelor:", error.message);
        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea echipelor.",
        });
    }
});
//obtinerea unei echipe dupa id
echipaRouter.route('/echipa/:id').get(async (req,res)=>{
    try {
        const echipa = await getEchipaById(req.params.id);
        return res.json({
            success: true,
            data: echipa,
        });
    } catch (error) {
        console.error(`Eroare la obținerea echipei cu id-ul ${req.params.id}:`, error.message);

        if (error.message.includes("nu a fost găsită")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea echipei.",
        });
    }
});
//stergerea unei echipe--vor fi sterse legaturile dar membrii vor ramane in continuare in bd
echipaRouter.route('/echipa/:id').delete(async (req,res)=>{
    try {
        const echipa = await deleteEchipa(req.params.id);
        return res.json({
            success: true,
            message: "Echipa a fost ștearsă cu succes.",
            data: echipa,
        });
    } catch (error) {
        console.error(`Eroare la ștergerea echipei cu id-ul ${req.params.id}:`, error.message);

        if (error.message.includes("nu există")) {
            return res.status(404).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la ștergerea echipei.",
        });
    }
});
//asocierea echipa membru
echipaRouter.route('/echipaMembru').post(async (req,res)=>{
    try {
        const asociere = await asociereEchipaMembru(req.body);
        return res.status(201).json({
            success: true,
            message: "Membrul a fost asociat cu echipa cu succes.",
            data: asociere,
        });
    } catch (error) {
        console.error("Eroare la asocierea echipei cu membrul:", error.message);

        if (error.message.includes("nu există")) {
            return res.status(404).json({
                success: false,
                message: error.message, 
            });
        }

        if (error.message.includes("este deja asociat")) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la asocierea echipei cu membrul.",
        });
    }
});
//obtinerea tuturor echipelor si membrilor asociati
echipaRouter.route('/echipaMembrii').get(async (req,res)=>{
    try {
        const echipe = await getEchipaAndMembrii();
        if (!echipe || echipe.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nu există echipe sau membri în baza de date.",
            });
        }
        return res.json({
            success: true,
            data: echipe,
        });
    } catch (error) {
        console.error("Eroare la obținerea echipelor și membrilor:", error.message);
        return res.status(500).json({
            success: false,
            message: "A apărut o eroare la obținerea echipelor și membrilor.",
        });
    }
});


export default echipaRouter;