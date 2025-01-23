import db from "../dbConfig.js";
import { Sequelize } from "sequelize";

const Echipa = db.define("Echipa", {
    EchipaId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nume: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [3, 50], 
                msg: "Numele echipei trebuie să aibă între 3 și 50 de caractere!",
            },
            is: {
                args: /^[a-zA-Z\s]+$/i,
                msg: "Numele echipei trebuie să conțină doar litere și spații!",
            },
        },
    }
});

export default Echipa;