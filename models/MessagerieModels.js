import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import MessageType from "./MessageTypeModels.js";
import Users from "./UsersModels.js";


const  {DataTypes} = Sequelize;

const Messagerie = db.define('messagerie', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    message:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: false,
                }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: false,
                }
    },
    sent:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    receive:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
})

Messagerie.belongsTo(Users, {foreignKey: 'user_userid'});
Messagerie.belongsTo(MessageType, {foreignKey: 'msgtype_msgtypeid'});


export default Messagerie