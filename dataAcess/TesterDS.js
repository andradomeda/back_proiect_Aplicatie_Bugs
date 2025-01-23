import Tester from "../enteties/Tester.js";
import Proiect from "../enteties/Proiect.js";
import Bug from "../enteties/Bug.js";

async function getTesteri() {
    return await Tester.findAll({include:["Bug-uri"]});
}

async function getTesterById(id) {
    return await Tester.findByPk(id,{include:["Bug-uri"]});
}

async function createTester(tester){
    return await Tester.create(tester,{include:[{model:Bug, as:"Bug-uri"}]});
}
async function deleteTester(id){
    let deletElem=await Tester.findByPk(id);
    if(!deletElem){
        console.log("Acest element nu exista");
    }
    return await deletElem.destroy();
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
    getTesterProjects
}