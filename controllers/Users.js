import Students from "../models/UsersModels.js"
import argon2 from "argon2"
import Users from "../models/UsersModels.js"
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
export const getUsers = async(req,res) => {
    try {
        const response = await Users.findAndCountAll({
            attributes: ['id','iban','country','profile','uuid', 'firstname', 'surname', 'fiscalcode', 'email', 'dateofbirth', 'gender', 'maritalstatus', 'phonenumber', 'address1', 'address2', 'occupation', 'monthlyincome', 'sourceofincome', 'username', 'password', 'role', 'pourcentage', 'codee', 'montant'],
            where: {
                role: 'user'
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserByName = async(req,res) => {
    const { search } = await req.body;
    try {
        const response = await Users.findAndCountAll({
            attributes: ['id','iban','country','profile','uuid', 'firstname', 'surname', 'fiscalcode', 'email', 'dateofbirth', 'gender', 'maritalstatus', 'phonenumber', 'address1', 'address2', 'occupation', 'monthlyincome', 'sourceofincome', 'username', 'password', 'role', 'pourcentage', 'codee', 'montant'],
            where: {
                firstname: {
                    [Op.like]: `%${search}%`
                  }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async(req,res) => {
    const { userid } = await req.body;

    try {
        const response = await Users.findOne({
            attributes: ['id','iban','country','profile','uuid', 'firstname', 'surname', 'fiscalcode', 'email', 'dateofbirth', 'gender', 'maritalstatus', 'phonenumber', 'address1', 'address2', 'occupation', 'monthlyincome', 'sourceofincome', 'username', 'password', 'role', 'pourcentage', 'codee', 'montant'],
            where: {
                id: userid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createUser = async(req,res) => {
    const url = req.protocol + '://' + req.get('host')
    const {iban,country,confirmpassword,firstname, surname, fiscalcode, email, dateofbirth, gender, maritalstatus, phonenumber, address1, address2, occupation, monthlyincome, sourceofincome,username, password, role, pourcentage,  codee,montant} = req.body;
    if(password !== confirmpassword) return res.status(400).json({msg: "Incorrect Confirm Password"});
    try {
        await Users.create({
            firstname: firstname,
            surname: surname,
            fiscalcode: fiscalcode,
            email: email,
            dateofbirth: dateofbirth,
            gender: gender,
            maritalstatus: maritalstatus,
            phonenumber: phonenumber,
            address1: address1,
            address2: address2,
            occupation: occupation,
            monthlyincome: monthlyincome,
            sourceofincome: sourceofincome,
            profile: req.file && url + '/Images/' + req.file.filename,
            username: username,
            password: password,
            role: role,
            country: country,
            iban: iban,
            pourcentage: pourcentage,
            codee:  codee,
            montant: montant
        });
        res.status(201).json({msg: "User Successfully created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateUser = async(req,res) => {
    const url = req.protocol + '://' + req.get('host')

    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    const {pourcentage, codee, montant, country,iban,confirmpassword,firstname, surname, fiscalcode, email, dateofbirth, gender, maritalstatus, phonenumber, address1, address2, occupation, monthlyincome, sourceofincome,username, password, role, profile} = req.body;
   
    try {
        await Users.update({
            firstname: firstname && firstname,
            surname: surname && surname,
            maritalstatus: maritalstatus && maritalstatus,
            address1: address1 && address1,
            address2: address2 && address2,
            occupation: occupation && occupation,
            profile: req.file && url + '/Images/' + req.file.filename,
            iban: iban && iban,
            pourcentage: pourcentage,
            codee: codee,
            montant: montant

        }, {
            where: {
                id: user.id
            }
        });
        console.log(req.file)
        res.status(200).json({msg: "User  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error)
    }
}



export const updateIban = async(req,res) => {

    const user = await Users.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    const {iban} = req.body;
   
    try {
        await Users.update({
            iban: iban 
        }, {
            where: {
                id: user.id
            }
        });
        res.status(200).json({msg: "User  updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
        console.log(error)
    }
}
export const deleteUser = async(req,res) => {
    const user = await Users.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(201).json({msg: "User  Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}





const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images');
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, '-' + fileName)
    }
});
export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}).single('profile')

