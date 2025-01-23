import Echipa from "../enteties/Echipa.js";
import Proiect from "../enteties/Proiect.js";
import EchipaMembru from "../enteties/EchipaMembru.js";
import Membru from "../enteties/Membru.js";

async function getEchipe() {
    try {
        return await Echipa.findAll({ include: ["Proiecte"] });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getEchipaById(id) {
    try {
        const echipa = await Echipa.findByPk(id, { include: ["Proiecte"] });
        if (!echipa) {
            throw new Error(`Echipa cu id-ul ${id} nu a fost găsită.`);
        }
        return echipa;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function createEchipa(echipa){
    try {
        return await Echipa.create(echipa, { include: [{ model: Proiect, as: "Proiecte" }] });
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw {
                name: "SequelizeValidationError",
                message: error.errors.map((err) => err.message).join(", "),
            };
        }
        throw new Error(error.message);
    }
}
async function deleteEchipa(id){
    try {
        const deletElem = await Echipa.findByPk(id);
        if (!deletElem) {
            throw new Error(`Echipa cu id-ul ${id} nu există.`);
        }
        return await deletElem.destroy();
    } catch (error) {
        throw new Error(error.message);
    }
}

async function asociereEchipaMembru(echipaMembru) {
    try {
        const { EchipaId, MembruId } = echipaMembru;

        const echipa = await Echipa.findByPk(EchipaId);
        if (!echipa) {
            throw new Error(`Echipa cu id-ul ${EchipaId} nu există.`);
        }

        const membru = await Membru.findByPk(MembruId);
        if (!membru) {
            throw new Error(`Membrul cu id-ul ${MembruId} nu există.`);
        }

        const asociereExistenta = await EchipaMembru.findOne({
            where: { EchipaId, MembruId },
        });

        if (asociereExistenta) {
            throw new Error(
                `Membrul cu id-ul ${MembruId} este deja asociat echipei cu id-ul ${EchipaId}.`
            );
        }

        return await EchipaMembru.create(echipaMembru);
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            throw new Error(error.errors.map((err) => err.message).join(", "));
        }
        throw error; // Aruncă eroarea pentru a fi gestionată de router
    }
} 
async function getEchipaAndMembrii() {
    try {
        return await Echipa.findAll({
            include: [
                {
                    model: Membru,
                    as: "Membrii",
                },
            ],
        });
    } catch (error) {
        throw new Error(error.message);
    }
}
export{
    getEchipaById,
    getEchipe,
    createEchipa,
    deleteEchipa,
    asociereEchipaMembru,
    getEchipaAndMembrii
}