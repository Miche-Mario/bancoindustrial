import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import DemandePret from "./DemandePretModels.js";


const  {DataTypes} = Sequelize;

const Users = db.define('users', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: false
        }
    },
    firstname:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    surname:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    fiscalcode:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    country:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    dateofbirth:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    maritalstatus:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    phonenumber:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    address1:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    address2:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    occupation:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    monthlyincome:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    sourceofincome:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    username:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    profile:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false,
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    role:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    iban:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    pourcentage:{
        type: DataTypes.INTEGER,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    codee:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    },
    montant:{
        type: DataTypes.STRING,
        allowNull: true,
        validate:{
            notEmpty: false
        }
    }

},{
    freezeTableName: true
})

 DemandePret.belongsTo(Users, {foreignKey: 'user_userid'});



export default Users  

