import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import MessageType from "../models/MessageTypeModels.js";

export const getMessageType = async (req,res) => {
    try {
        const response = await MessageType.findAll({
            attributes: [ 'idd','messagetype']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createMessageType = async(req,res) => {
    const {messagetype, idd} = req.body;
    try {
        await MessageType.create({
            idd: idd,
            messagetype: messagetype
        });
        res.status(201).json({msg: "Message Type Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
