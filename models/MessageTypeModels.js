import { Sequelize } from "sequelize";
import db from '../config/Database.js';


const  {DataTypes} = Sequelize;

const MessageType = db.define('messagetype', {
    idd:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: false,
                }
    },
    messagetype:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: false,
                }
    }
},{
    freezeTableName: true,
    timestamps: false
})


export default MessageType