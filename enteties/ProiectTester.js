import db from "../dbConfig.js"
import { Sequelize } from "sequelize";

const ProiectTester=db.define("ProiectTester",{
    ProiectId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    TesterId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
});
export default ProiectTester;