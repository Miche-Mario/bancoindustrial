import Messagerie from "../models/MessagerieModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Users from "../models/UsersModels.js";
import MessageType from "../models/MessageTypeModels.js";

export const getAdminMessage = async (req,res) => {
    try {
        const response = await Messagerie.findAndCountAll({
            attributes: ['uuid','sent', 'receive','username', 'message','createdAt'],
            include: [{
                model: Users,
              
            }],
            where: {
                [Op.or]: [
               { receive: true},
               { sent: true}
                ]
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getMessageByUserId = async (req,res) => {
    const {name} = req.body;

    try {
        const response = await Messagerie.findAndCountAll({
            attributes: ['uuid','sent', 'receive','username', 'message','createdAt'],
            include: [{
                model: Users
            }],
            where: {
                username: {
                    [Op.like]: `%${name}%`
                  }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createMessageAdmin= async(req,res) => {
    const {message, userId, msgtypeid,username} = req.body;
    try {
        await Messagerie.create({
            username: username,
            message: message,
            sent: true,
            receive: false,
            user_userid: userId,
            msgtype_msgtypeid: msgtypeid
        });
        res.status(201).json({msg: "Message well Send"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}











export const getUserMessage = async (req,res) => {
    const {userId} = req.body
    try {
        const response = await Messagerie.findAndCountAll({
            attributes: ['uuid','sent', 'receive','username', 'message','createdAt'],
            include: [{
                model: MessageType
            }],
            where: {
                [Op.or]: [
                    { sent: true},
                    { receive: true}
                ],
                [Op.and]: [
                    { user_userid: userId},
                 
                ],
             
                
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}





export const getNumUserMessage = async (req,res) => {
    const {userId} = req.body
    try {
        const response = await Messagerie.findAndCountAll({
           
            where: {
                [Op.and]: [
                    { user_userid: userId},
                    { sent: true},
                ],
             
                
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getNumAdminMessage = async (req,res) => {
    try {
        const response = await Messagerie.findAndCountAll({
           
            where: {
                    receive: true
            }
        })
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}








export const createMessageUser = async(req,res) => {
    const {message, userId,username} = req.body;
    try {
        await Messagerie.create({
            username: username,
            message: message,
            sent: false,
            receive: true,
            user_userid: userId
        });
        res.status(201).json({msg: "Message well Send"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}




export const createReport = async(req,res) => {
    const {username, userId} = req.body;
    try {
        await Messagerie.create({
            message: "Transaction failled",
            user_userid: userId,
            receive: true,
            sent: false,
            username: username
        });
        res.status(201).json({msg: "Report well Send"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateMessagerie = async(req,res) => {
    const msg = await Messagerie.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!trans) return res.status(404).json({msg: "Message does not exist" });
    //  const {amount, description, user_userid, compte_compteid, archieve} = req.body;
    
    try {
        await Messagerie.update({
            archieve: true
        }, {
            where: {
                id: msg.id
            }
        });
        res.status(200).json({msg: "Message Archieved"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}