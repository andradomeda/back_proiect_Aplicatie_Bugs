import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const EchipaMembru = db.define("EchipaMembru", {
    EchipaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    MembruId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    }
});

export default EchipaMembru;