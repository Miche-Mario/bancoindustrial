import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const DemandePret = db.define('demandepret', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: true,
        validate: {
            notEmpty: false
        }
    },
    montant:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false,
                }
    },
    prettype:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    payed:{
        type: DataTypes.BOOLEAN,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    periode:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    interet:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
},{
    freezeTableName: true
})


export default DemandePret