import express from "express"
import { getTesterByName,createTester,getTesterById,getTesteri,deleteTester,getTesterProjects } from "../dataAcess/TesterDA.js"

let testerRouter=express.Router();
//creare tester
testerRouter.route('/tester').post(async (req, res) => {
    try {
        const tester = await createTester(req.body);
        return res.status(201).json({
            success: true,
            message: "Testerul a fost creat cu succes.",
            data: tester,
        });
    } catch (error) {
        console.error("Eroare la crearea testerului:", error.message);

        // Mesaj specific pentru email duplicat sau alte erori
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
// Login tester
testerRouter.route('/tester/login').post(async (req, res) => {
    const { Nume, Parola } = req.body;

    try {
        const tester = await getTesterByName(Nume); // Funcție care caută testerul în baza de date după nume
        console.log("/////////////////////");
        console.log(tester);
        if (!tester || tester.Parola !== Parola) {
            return res.status(401).json({
                success: false,
                message: "Nume sau parolă incorectă.",
            });
        }

        return res.json({
            success: true,
            message: "Autentificare reușită.",
            data: tester,
        });
    } catch (error) {
        console.error("Eroare la autentificare:", error.message);
        return res.status(500).json({
            success: false,
            message: "Eroare la server.",
        });
    }
});


//obtine toti testarii
testerRouter.route('/tester').get(async (req,res)=>{
    try {
        const testeri = await getTesteri();
        return res.json({
            success: true,
            data: testeri,
        });
    } catch (error) {
        console.error("Eroare la obținerea testerilor:", error.message);
        return res.status(500).json({
            success: false,
            message: "Nu s-au putut obține testerii.",
        });
    }
});
//obtinere tester dupa id
testerRouter.route('/tester/:id').get(async (req,res)=>{
    try {
        const tester = await getTesterById(req.params.id);
        return res.json({
            success: true,
            data: tester,
        });
    } catch (error) {
        console.error(`Eroare la obținerea testerului cu id-ul ${req.params.id}:`, error.message);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
//stergere tester--ii stergem si bugurile asociate
testerRouter.route('/tester/:id').delete(async (req,res)=>{
    try {
        const result = await deleteTester(req.params.id);
        return res.json({
            success: true,
            message: result.message,
        });
    } catch (error) {
        console.error(`Eroare la ștergerea testerului cu id-ul ${req.params.id}:`, error.message);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
//obtine proiectele unui tester
testerRouter.route('/tester/:id/proiecte').get(async (req, res) => {
    try {
        const testerProjects = await getTesterProjects(req.params.id);
        return res.json({
            success: true,
            data: testerProjects,
        });
    } catch (error) {
        console.error(`Eroare la obținerea proiectelor pentru testerul cu id-ul ${req.params.id}:`, error.message);
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
});
export default testerRouter;