import Users from "../models/UsersModels.js"
import argon2 from "argon2";

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            username: req.body.username
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });

    if(user.password !==  req.body.password) return res.status(400).json({msg: "Wrong Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const id = user.id;
    const firstname = user.firstname;
    const username = user.username;
    const role = user.role
    const profile = user.profile

    res.status(200).json({uuid, id, firstname, username, role, profile});
}

export const Me = async (req, res) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Please Login to your account!" })
    }
    const user = await Users.findOne({
        attributes: ['uuid','id', 'firstname', 'username', 'role', 'profile'],
        where: {
            uuid: req.session.userId
        }
    });
    console.log(req.session)
   
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    res.status(200).json(user)
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Cann't log Out..."})
        res.status(200).json({msg: "You have logged out"})
    })
}