// const { uniqueId } = require('underscore');
const { randomUUID } = require('crypto');
const models = require('../models');

const { Sheet } = models;

const listPage = async (req, res) => {
  res.render('storage');
};

const sheetPage = async (req, res) => {
  // console.log(req);
  res.render('sheet');
};

const makeCharacter = async (req, res) => {
  if (!req.body.name || !req.body.playbook || !req.body.description) { // if its missing a field;
    return res.status(400).json({ error: 'A field is missing!' });
  }

  console.log(`make character: ${req.session}`);
  const sheetData = {
    name: req.body.name,
    playbook: req.body.playbook,
    ratings: ['0', '0', '0', '0', '0'],
    level: 0,
    experience: 0,
    luck: 0,
    harm: 0,
    unstable: false,
    description: req.body.description,
    owner: req.session.account._id,
    _id: randomUUID(),
  };

  try {
    const newSheet = new Sheet(sheetData);
    await newSheet.save();
    return res.status(201).json(
      {
        name: newSheet.name,
        playbook: newSheet.playbook,
        ratings: newSheet.ratings,
        level: newSheet.level,
        experience: newSheet.experience,
        luck: newSheet.luck,
        harm: newSheet.harm,
        unstable: newSheet.unstable,
        description: newSheet.description,
        _id: newSheet._id,
      },
    );
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character sheet already exists' });
    }
    return res.status(500).json({ error: 'An error occured making the character sheet' });
  }
};

const getSheets = async (req, res) => {
  try {
    console.log(req.session);
    const query = { owner: req.session.account._id };
    const docs = await Sheet.find(query).select('name playbook ratings level experience luck harm unstable description').lean().exec();
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

const getSingleSheet = async (req, res) => {
  try {
    // console.log(re/q);
    console.log('getting single sheet:');
    console.log(req.body);
    const data = req.body;
    data.name = data.name.substring(6, data.name.length);
    data.playbook = data.playbook.substring(10, data.playbook.length);
    data.description = data.description.substring(13, data.description.length);
    // console.log(data);

    return res.json({ redirect: `/singleSheet/${data.id}` });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving character' });
  }
};

const getCharacter = async (req, res) => {
  console.log('oh help');
  try {
    const data = req.body;
    const query = { _id: data.character_id };
    const docs = await Sheet.find(query).select('name playbook ratings level experience luck harm unstable description').lean().exec();
    console.log(docs);
    // console.log(data);
    return res.json({ char: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving character' });
  }
};

const updateChar = async (req, res) => {
  console.log('updating char');
  console.log(req.body);
  try {
    const data = req.body;
    const query = { _id: data.character_id };
    const docs = await Sheet.updateOne(query, { ratings: data.ratingValues }).lean().exec();
    return res.status(201).json({update: docs});
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error updating character' });
  }
};

module.exports = {
  listPage,
  getSheets,
  sheetPage,
  makeCharacter,
  getSingleSheet,
  getCharacter,
  updateChar,
};
