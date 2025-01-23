import express from 'express';
import { createBug,getBugById,getBugs,deleteBug,updateBug } from '../dataAcess/BugDA.js';

let bugRouter=express.Router();
//crearea unui bug
bugRouter.route('/bug').post(async (req, res) => {
    try {
        const bug = await createBug(req.body);
        return res.status(201).json({
            success: true,
            message: "Bug-ul a fost creat cu succes.",
            data: bug,
        });
    } catch (error) {
        console.error("Eroare la crearea bug-ului:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});

//obtinere bugs
bugRouter.route('/bug').get(async (req,res)=>{
    try {
        const bugs = await getBugs();
        return res.json({
            success: true,
            data: bugs,
        });
    } catch (error) {
        console.error("Eroare la obținerea bug-urilor:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
//bug dupa id
bugRouter.route('/bug/:id').get(async (req,res)=>{
    try {
        const bug = await getBugById(req.params.id);
        if (!bug) {
            return res.status(404).json({
                success: false,
                message: `Bug-ul cu id-ul ${req.params.id} nu a fost găsit.`,
            });
        }
        return res.json({
            success: true,
            data: bug,
        });
    } catch (error) {
        console.error("Eroare la obținerea bug-ului:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
//stergere bug-fara a sterge referintele catre celelalte tabele
bugRouter.route('/bug/:id').delete(async (req,res)=>{
    try {
        await deleteBug(req.params.id);
        return res.json({
            success: true,
            message: "Bug-ul a fost șters cu succes.",
        });
    } catch (error) {
        console.error("Eroare la ștergerea bug-ului:", error.message);

        // Returnează mesajul specific al erorii
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
//actualizarea unui bug
bugRouter.route('/bug/:id').patch(async (req, res) => {
    try {
        const bug = await updateBug(req.params.id, req.body);
        return res.json({
            success: true,
            message: "Bug-ul a fost actualizat cu succes.",
            data: bug,
        });
    } catch (error) {
        console.error("Eroare la actualizarea bug-ului:", error.message);

        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
export default bugRouter