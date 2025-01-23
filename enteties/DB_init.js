//initializarea bazei de date-crearea bd si a legaturilor fk
import mysql from "mysql2/promise";
import env from "dotenv";
import Bug from "./Bug.js";
import Echipa from "./Echipa.js";
import Membru from "./Membru.js";
import Proiect from "./Proiect.js";
import Tester from "./Tester.js";

env.config();

function Create_DB(){
    let conn;

    mysql.createConnection({
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD
    })
    .then((connection) => {
    conn = connection
    return connection.query('CREATE DATABASE IF NOT EXISTS BugTracker')
    })
    .then(() => {
    return conn.end()
    })
    .catch((err) => {
    console.warn(err.stack)
    })
}
// Un membru are mai multe echipe si O echipa are mai multi membrii n-n
// Un tester are mai multe proiecte si un proiect are mai multi testeri n-n
// O echipă are mai multe proiecte 1-n
// Un proiect are mai multe bug uri 1-n
// Un tester are mai multe bug uri 1-n
// Un membru poate avea mai multe bug-uri 1-n   
function FK_Config()
{
    // ------------------- asociere 1-n -----------------------------------
    Echipa.hasMany(Proiect, {as : "Proiecte", foreignKey: "EchipaId"});
    Proiect.belongsTo(Echipa, {foreignKey: "EchipaId"});

    Proiect.hasMany(Bug, {as : "Bug-uri", foreignKey: "ProiectId", onDelete: "RESTRICT"});
    Bug.belongsTo(Proiect, {foreignKey: "ProiectId"});

    Tester.hasMany(Bug, {as : "Bug-uri", foreignKey: "TesterId", onDelete: "CASCADE"});
    Bug.belongsTo(Tester, {foreignKey: "TesterId",onDelete: "RESTRICT"});

    Membru.hasMany(Bug, {as : "Bug-uri", foreignKey: "MembruId",onDelete: "SET NULL",});
    Bug.belongsTo(Membru, {foreignKey: "MembruId"});

    // --------------------- asociere n-n -------------------------------------
    Membru.belongsToMany(Echipa,{through:"EchipaMembru", as:"Echipe",foreignKey:"MembruId",onDelete: "CASCADE"});
    Echipa.belongsToMany(Membru,{through:"EchipaMembru", as:"Membrii",foreignKey:"EchipaId",  onDelete: "CASCADE"});

    Tester.belongsToMany(Proiect,{through:"ProiectTester", as:"Proiecte",foreignKey:"TesterId"});
    Proiect.belongsToMany(Tester,{through:"ProiectTester", as:"Testeri",foreignKey:"ProiectId"});
}

function DB_Init(){
    Create_DB();
    FK_Config();
}

export default DB_Init;