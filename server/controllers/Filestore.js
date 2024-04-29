const models = require('../models');

const {Filestore} = models

const uploadFile = async (req, res) =>{
    if(!req.files || req.files.sampleFile){
        return res.status(400).json({error: 'No files were uploaded'});
    }

    const {sampleFile} = req.files;

    try{
        const newFile = new Filestore.FileModel(sampleFile);
        const doc = await newFile.save();
        return res.status(201).json({
            message: 'File stored successfully!',
            fileId: doc._id,
        });
    }catch (err) {
        console.log(err);
        return res.status(400).json({
            error:'Something went wrong uploading file!',
        });
    }
};

//use findOneAndUpdate for changing the image to a character's image :)

const retrieveFile = async (req, res) =>{
    if(!req.query._id){
        return res.status(400).json({error:'Missing file id!'});
    }

    let doc;
    try{
        doc = await File.findOne({_id:req.query.id}).exec();
    }catch (err) {
        console.log(err);
        return res.status(400).json({error:'Something went wrong retrieving file!'});
    }
}

module.exports = {
    retrieveFile,
    uploadFile,
}