import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Taux from "../models/TauxModels.js";

export const getTaux = async (req,res) => {
    try {
        const response = await Taux.findAll({
            attributes: ['uuid', 'id','name', 'value']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}



export const createTaux = async(req,res) => {
    const {name, value} = req.body;
    try {
        await Taux.create({
            name: name,
            value: value
        });
        res.status(201).json({msg: "Taux Well Created"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateTaux = async(req,res) => {
    const taux = await Taux.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!taux) return res.status(404).json({msg: "Taux doesn't not exist" });
    const {name, value} = req.body;
    
    try {
        await Taux.update({
            name: name,
            value: value
        }, {
            where: {
                id: taux.id
            }
        });
        res.status(200).json({msg: "Taux updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const deleteTaux = async(req,res) => {
    const taux = await Taux.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!taux) return res.status(404).json({msg: "Taux doesn't not exist" });
    try {
        await Taux.destroy({
            where: {
                id: taux.id
            }
        });
        res.status(201).json({msg: "Taux Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }

}