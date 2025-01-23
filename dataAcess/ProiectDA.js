import Proiect from "../enteties/Proiect.js";
import ProiectTester from "../enteties/ProiectTester.js";
import Tester from "../enteties/Tester.js";
import Echipa from "../enteties/Echipa.js";
import Bug from "../enteties/Bug.js";

async function createProiect(proiect) {
    try {
        const echipa = await Echipa.findByPk(proiect.EchipaId);
        if (!echipa) {
            throw new Error(`Echipa cu id-ul ${proiect.EchipaId} nu există.`);
        }

        return await Proiect.create(proiect);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw {
                name: "SequelizeValidationError",
                message: error.errors.map((err) => err.message).join(", "),
            };
        }
        throw error;//alte erori
    }
}
async function getProiecte() {
    return await Proiect.findAll();
}
async function getProiectById(id) {
    try {
        const proiect = await Proiect.findByPk(id);
        if (!proiect) {
            throw new Error(`Proiectul cu id-ul ${id} nu a fost găsit.`);
        }
        return proiect;
    } catch (error) {
        throw new Error(`A apărut o eroare la căutarea proiectului cu id-ul ${id}: ${error.message}`);
    }
}

async function asociereProiectTester(proiectTester) {
    try {
        const { ProiectId, TesterId } = proiectTester;

        const proiect = await Proiect.findByPk(ProiectId);
        if (!proiect) {
            throw new Error(`Proiectul cu id-ul ${ProiectId} nu există.`);
        }

        const tester = await Tester.findByPk(TesterId);
        if (!tester) {
            throw new Error(`Testerul cu id-ul ${TesterId} nu există.`);
        }

        const asociereExistenta = await ProiectTester.findOne({
            where: { ProiectId, TesterId },
        });

        if (asociereExistenta) {
            throw new Error(
                `Asocierea dintre proiectul cu id-ul ${ProiectId} și testerul cu id-ul ${TesterId} deja există.`
            );
        }

        return await ProiectTester.create(proiectTester);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw {
                name: "SequelizeValidationError",
                message: error.errors.map((err) => err.message).join(", "),
            };
        }
        throw error; 
    }
}

async function getProiecteAndTesteri() {
    try {
        return await Proiect.findAll({
            include: [
                {
                    model: Tester,
                    as: "Testeri",
                },
            ],
        });
    } catch (error) {
        throw new Error("A apărut o eroare la obținerea proiectelor și testerilor.");
    }
}
async function getBugsByProiectId(proiectId) {
    try {
        const proiect = await Proiect.findByPk(proiectId, {
            include: [
                {
                    model: Bug,
                    as: "Bug-uri",
                },
            ],
        });

        if (!proiect) {
            throw new Error("Proiectul cu id-ul ${proiectId} nu a fost găsit");
        }

        return proiect["Bug-uri"];
    } catch (error) {
        throw new Error("A apărut o eroare la obținerea bug-urilor pentru proiectul cu id-ul ${proiectId}: ${error.message}");
    }
}

export{
    createProiect,
    asociereProiectTester,
    getProiecteAndTesteri,
    getProiectById,
    getProiecte,
    getBugsByProiectId
}