import Bug from "../enteties/Bug.js";
import Tester from "../enteties/Tester.js";
import Proiect from "../enteties/Proiect.js";

async function getBugs() {
    try {
        const bugs = await Bug.findAll();
        if (!bugs || bugs.length === 0) {
            throw new Error("Nu există bug-uri în baza de date.");
        }
        return bugs;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getBugById(id) {
    try {
        const bug = await Bug.findByPk(id);
        if (!bug) {
            throw new Error(`Bug-ul cu id-ul ${id} nu există.`);
        }
        return bug;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function createBug(bug) {
    try {
        // Verifică existența proiectului
        const proiect = await Proiect.findByPk(bug.ProiectId);
        if (!proiect) {
            throw new Error(`Proiectul cu id-ul ${bug.ProiectId} nu există.`);
        }

        // Verifică existența testerului
        const tester = await Tester.findByPk(bug.TesterId);
        if (!tester) {
            throw new Error(`Testerul cu id-ul ${bug.TesterId} nu există.`);
        }

        // Setează statusul implicit
        bug.Status = "Open";

        // Creează bug-ul
        return await Bug.create(bug);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            // Prinde și combină toate mesajele de validare
            throw new Error(error.errors.map((err) => err.message).join(", "));
        }

        // Aruncă alte erori
        throw new Error(error.message);
    }
}


async function deleteBug(id){
    try {
        const deletElem = await Bug.findByPk(id);
        if (!deletElem) {
            throw new Error(`Bug-ul cu id-ul ${id} nu există și nu poate fi șters.`);
        }
        await deletElem.destroy();
        return deletElem;
    } catch (error) {
        throw new Error(error.message);
    }
}
async function updateBug(id, updatedData) {
    try {
        const bug = await Bug.findByPk(id);

        if (!bug) {
            throw new Error(`Bug-ul cu id-ul ${id} nu există.`);
        }

        if (updatedData.ProiectId) {
            const proiect = await Proiect.findByPk(updatedData.ProiectId);
            if (!proiect) {
                throw new Error(`Proiectul cu id-ul ${updatedData.ProiectId} nu există.`);
            }
        }

        if (updatedData.TesterId) {
            const tester = await Tester.findByPk(updatedData.TesterId);
            if (!tester) {
                throw new Error(`Testerul cu id-ul ${updatedData.TesterId} nu există.`);
            }
        }

        // Actualizează câmpurile primite
        await bug.update(updatedData);

        // Setează `Status` la "In Progress" dacă este furnizat `MembruId`
        if (updatedData.MembruId && bug.Status === "Open") {
            bug.Status = "In Progress";
            await bug.save(); // Salvează modificarea
        }

        return bug;
    } catch (error) {
        throw new Error(error.message);
    }
}

export{
    getBugById,
    getBugs,
    createBug,
    deleteBug,
    updateBug
}