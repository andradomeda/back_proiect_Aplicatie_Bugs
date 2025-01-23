import db from "../dbConfig.js"
import { Sequelize } from "sequelize";

const Bug = db.define("Bug", {
    BugId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Descriere: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            len: {
                args: [5, 1000],
                msg: "Descrierea trebuie să aibă între 5 și 1000 de caractere!",
            },
        },
    },
    Severitate: {
        type: Sequelize.ENUM("Low", "Medium", "High", "Critical"),
        allowNull: false
    },
    Prioritate: {
        type: Sequelize.ENUM("Low", "Medium", "High"),
        allowNull: false
    },
    Status: {
        type: Sequelize.ENUM("Open", "In Progress", "Closed"),
        defaultValue: "Open",
        allowNull: false
    },
    CommitLink: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isValidUrl(value) {
                const regex = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
                if (!regex.test(value)) {
                    throw new Error("CommitLink trebuie să fie un URL valid, care începe cu 'http' sau 'https' și conține un domeniu valid!");
                }
            },
        },
    },    
    ProiectId: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    TesterId: {
        type:Sequelize.INTEGER,
        allowNull:false
    },
    MembruId: {
        type:Sequelize.INTEGER,
        allowNull:true
    }
});

export default Bug;