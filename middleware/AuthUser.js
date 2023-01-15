import Users from "../models/UsersModels.js"

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) {
        return res.status(401).json({msg: "Please Login to your account!" })
    }
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    req.userid = user.id;
    req.role = user.role;
    next();
}


export const adminOnly = async (req, res, next) => {
 
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User doesn't not exist" });
    if(user.role !== 'admin') return res.status(404).json({msg: "Access doesn't allow" });
    next();
}