const models = require('../models');

const { Sheet } = models;

const listPage = async (req, res) => {
  res.render('storage');
}

const sheetPage = async (req, res) => {
  console.log(req);
  res.render('sheet');
}

const makeCharacter = async (req, res) => {
  if (!req.body.name || !req.body.playbook || !req.body.description) { // if its missing a field;
    return res.status(400).json({ error: 'A field is missing!' });
  }

  console.log('make character: ' + req.session);
  const sheetData = {
    name: req.body.name,
    playbook: req.body.playbook,
    level: 0,
    experience: 0,
    luck: 0,
    harm: 0,
    unstable: false,
    description: req.body.description,
    owner: req.session.account._id,
  };

  try {
    const newSheet = new Sheet(sheetData);
    await newSheet.save();
    return res.status(201).json(
        { 
          name: newSheet.name, 
          playbook: newSheet.playbook, 
          level: newSheet.level,
          experience:newSheet.experience,
          luck: newSheet.luck,
          harm: newSheet.harm,
          unstable: newSheet.unstable,
          description: newSheet.description });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character sheet already exists' });
    }
    return res.status(500).json({ error: 'An error occured making the character sheet' });
  }
};

//Note for monday: ask professor why the data shows a different owner than it is saved with.

const getSheets = async (req, res) => {
  try {
    console.log(req.session);
    const query = { owner: req.session.account._id };
    const docs = await Sheet.find(query).select('name playbook level experience luck harm unstable description').lean().exec();
    console.log(docs);
    return res.json({ sheets: docs });
  
  
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving Sheets!' });
  }
};

// const getSingle = async (req, res) =>{
//   try{
//     const query = {owner: req.session.account._id};
//   }
// }

module.exports = {
  listPage,
  getSheets,
  sheetPage,
  makeCharacter,
};
