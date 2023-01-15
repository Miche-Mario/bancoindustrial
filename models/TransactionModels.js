import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users from "./UsersModels.js";


const  {DataTypes} = Sequelize;

const Transaction = db.define('transaction', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    description:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    courant:{
        type: DataTypes.DECIMAL(11, 4),
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    pret:{
        type: DataTypes.DECIMAL(11, 4),
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    }
},{
    freezeTableName: true
})

Transaction.belongsTo(Users, {foreignKey: 'user_userid'});

export default Transaction