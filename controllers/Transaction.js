import Transaction from "../models/TransactionModels.js"
import { Sequelize } from "sequelize";
import {Op} from 'sequelize'
import multer from "multer";
import path from "path"
import Users from "../models/UsersModels.js";

export const getTransaction = async (req,res) => {
    try {
        const response = await Transaction.findAndCountAll({
            attributes: ['uuid', 'courant','description', 'pret'],
            include: [{
                model: Users,
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const getTransactionByUser = async (req,res) => {
    const {userid} = req.body;
    try {
        const response = await Transaction.findOne({
            attributes: ['uuid', 'courant','description', 'pret'],
            where: {
                user_userid: userid
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createTransaction = async(req,res) => {

    const {userid, description, user_userid, courant, pret} = req.body;


    let responsee;
      
            responsee = await Transaction.findOne({ 
                where: {
                    user_userid: userid
                }
            
            });

        if(responsee) {
           
                await Transaction.destroy({
                    where: {
                        id: responsee.id
                    }
                });
              


            
        }
            
        
    try {
        await Transaction.create({
            description: description,
            courant: courant,
            pret: pret,
            user_userid: user_userid
        });
        res.status(201).json({msg: "Transaction well Send"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}
export const updateTransaction = async(req,res) => {
    const trans = await Transaction.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!trans) return res.status(404).json({msg: "Transaction does not exist" });
     const {amount, description, user_userid, compte_compteid, archieve} = req.body;
    
    try {
        await DemandePret.update({
            amount: amount,
            description: description,
            user_userid: user_userid,
            compte_compteid: compte_compteid,
            archieve: archieve
        }, {
            where: {
                id: trans.id
            }
        });
        res.status(200).json({msg: "Transaction Well Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}