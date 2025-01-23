import Membru from "../enteties/Membru.js";
import EchipaMembru from "../enteties/EchipaMembru.js";
import Echipa from "../enteties/Echipa.js";
import Proiect from "../enteties/Proiect.js";
import Bug from "../enteties/Bug.js";

async function createMembru(membru){
    return await Membru.create(membru);
}
async function getMembruById(id) {
    return await Membru.findByPk(id);
}
async function getMembruProjects(id) {
    const membru = await Membru.findByPk(id, {
        include: [
            {
                model: Echipa,
                as: "Echipe",
                include: [
                    {
                        model: Proiect,
                        as: "Proiecte",
                        required: true, // Doar proiectele existente
                    },
                ],
            },
        ],
    });

    if (!membru) {
        throw new Error(`Membrul cu id-ul ${id} nu există.`);
    }

    const proiecte = membru.Echipe.flatMap(echipa => echipa.Proiecte);

    return proiecte;
}
async function getMembruByName(nume) {
    try {
        // Găsește un singur document care are numele specificat
        const membru = await Membru.findOne({where:{ Nume: nume }});
        return membru;
    } catch (error) {
        console.error(`Eroare la obținerea membrului cu numele ${nume}:`, error.message);
        throw new Error("Eroare la obținerea membrului după nume.");
    }
 }
async function getMembruBugs(id) {
    const membru = await Membru.findByPk(id, {
        include: [
            {
                model: Bug,
                as: "Bug-uri",
            },
        ],
    });

    if (!membru) {
        throw new Error(`Membrul cu id-ul ${id} nu există.`);
    }

    return membru;
}


async function asociereEchipaMembru(echipaMembru) {
    const membru = await Membru.findByPk(echipaMembru.MembruId);
    const echipa = await Echipa.findByPk(echipaMembru.EchipaId);

    if (!membru) {
        throw new Error(`Membrul cu id-ul ${echipaMembru.MembruId} nu există.`);
    }

    if (!echipa) {
        throw new Error(`Echipa cu id-ul ${echipaMembru.EchipaId} nu există.`);
    }

    return await EchipaMembru.create(echipaMembru);
}

async function getMembruAndEchipe() {
    return await Membru.findAll({
        include:[
            {
                model:Echipa,
                as:'Echipe'
            }
        ]
    });
}
async function getMembruProjectBugs(id) {
    const membru = await Membru.findByPk(id, {
        include: [
            {
                model: Echipa,
                as: "Echipe",
                include: [
                    {
                        model: Proiect,
                        as: "Proiecte",
                        include: [
                            {
                                model: Bug,
                                as: "Bug-uri",
                            },
                        ],
                    },
                ],
            },
        ],
    });

    if (!membru) {
        throw new Error(`Membrul cu id-ul ${id} nu există.`);
    }

    const buguri = membru.Echipe.flatMap(echipa =>
        echipa.Proiecte.flatMap(proiect => proiect["Bug-uri"])
    );

    return buguri;
}
async function getMembruEchipa(id) {
    const membru = await Membru.findByPk(id, {
        include: [
            {
                model: Echipa,
                as: "Echipe" ,
            },
        ],
    });

    if (!membru) {
        throw new Error("Membrul cu id-ul ${id} nu există.");
    }

    return membru.Echipe;
}

export {
    createMembru,
    asociereEchipaMembru,
    getMembruAndEchipe,
    getMembruById,
    getMembruProjects,
    getMembruBugs,
    getMembruProjectBugs,
    getMembruByName,
    getMembruEchipa
}
