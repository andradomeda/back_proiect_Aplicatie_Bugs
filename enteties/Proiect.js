import db from "../dbConfig.js"
import { Sequelize } from "sequelize";

const Proiect=db.define("Proiect",{
    ProiectId:{
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
                args: [3, 100],
                msg: "Numele proiectului trebuie să aibă între 3 și 100 de caractere!",
            },
        },
    },
    Repository: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isValidUrl(value) {
                const regex = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/.*)?$/;
                if (!regex.test(value)) {
                    throw new Error("Repository trebuie să fie un URL valid, care începe cu 'http' sau 'https' și conține un domeniu valid!");
                }
            },
        },
    },
    EchipaId: {
        type:Sequelize.INTEGER,
        allowNull:false
    }
});
export default Proiect;