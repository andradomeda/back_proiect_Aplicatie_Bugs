import Tester from "../enteties/Tester.js";
import Proiect from "../enteties/Proiect.js";
import Bug from "../enteties/Bug.js";

async function getTesteri() {
    return await Tester.findAll({include:["Bug-uri"]});
}

async function getTesterById(id) {
    const tester = await Tester.findByPk(id,{include:["Bug-uri"]});
    if (!tester) {
        throw new Error(`Tester cu id-ul ${id} nu a fost găsit.`);
    }
    return tester;
}
async function getTesterByName(nume) {
   try {
       // Găsește un singur document care are numele specificat
       const tester = await Tester.findOne({where:{ Nume: nume }});
       console.log(tester);
       return tester;
   } catch (error) {
       console.error(`Eroare la obținerea testerului cu numele ${nume}:`, error.message);
       throw new Error("Eroare la obținerea testerului după nume.");
   }
}

async function createTester(tester) {
    try {
        return await Tester.create(tester);
    } catch (error) {
        // Gestionare eroare pentru email duplicat
        if (error.name === "SequelizeUniqueConstraintError") {
            throw new Error("Această adresă de email este deja utilizată!");
        }

        // Gestionare alte erori de validare
        if (error.name === "SequelizeValidationError") {
            throw new Error(error.errors.map(err => err.message).join(", "));
        }

        // Alte erori
        throw new Error("A apărut o eroare la crearea testerului.");
    }
}


async function deleteTester(id) {
    const deletElem = await Tester.findByPk(id);
    if (!deletElem) {
        throw new Error(`Tester cu id-ul ${id} nu a fost găsit.`);
    }
    await deletElem.destroy();
    return { message: `Testerul cu id-ul ${id} a fost șters.` };
}
async function getTesterProjects(id) {
    const tester = await Tester.findByPk(id, {
        include: [
            {
                model: Proiect,
                as: "Proiecte",
            },
        ],
    });

    if (!tester) {
        throw new Error(`Tester cu id-ul ${id} nu există.`);
    }

    return tester;
}
export{
    getTesterById,
    getTesteri,
    createTester,
    deleteTester,
    getTesterProjects,
    getTesterByName
}