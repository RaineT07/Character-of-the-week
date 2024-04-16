const models = require('../models');

const {Sheet} = models;

const listPage = async (req,res)=>{
    return res.render('storage');
}