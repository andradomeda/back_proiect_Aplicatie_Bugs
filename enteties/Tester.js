import db from "../dbConfig.js"
import { Sequelize } from "sequelize";

const Tester=db.define("Tester",{
    TesterId:{
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
                msg: "Numele trebuie să aibă între 3 și 50 de caractere!",
            },
            is: {
                args: /^([a-zA-Z]{3,}\s)+[a-zA-Z]{3,}$/,
                msg: "Numele trebuie să conțină minim două grupuri de litere, fiecare având cel puțin trei caractere, separate printr-un spațiu!",
            },
        },
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            msg: "Această adresă de email este deja utilizată!",
        },
        validate: {
            is: {
                // Regex pentru validarea generală a emailului
                args: /^[a-zA-Z0-9._%+-]{3,}@(gmail|yahoo|outlook|hotmail|icloud|customdomain)\.(com|org|net|edu|gov|info|io|biz|co|ro|uk|fr|de|es|it)$/,
                msg: "Te rog să introduci o adresă de email validă, cu un domeniu și TLD existent!",
            },
        },
    },
    Parola: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8, 100],
                msg: "Parola trebuie să aibă cel puțin 8 caractere!",
            },
        },
    }
});
export default Tester;