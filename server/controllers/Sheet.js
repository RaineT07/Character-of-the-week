const models = require('../models');

const { Sheet } = models;

const listPage = async (req, res) => res.render('storage');

const sheetPage = async (req, res) => res.render('sheet');

const makeCharacter = async (req, res) => {
  if (!req.body.name || !req.body.playbook || !req.body.description) { // if its missing a field;
    return res.status(400).json({ error: 'A field is missing!' });
  }

  const sheetData = {
    name: req.body.name,
    playbook: req.body.playbook,
    level: 0,
    expereince: 0,
    luck: 0,
    harm: 0,
    unstable: false,
    description: req.body.description,
    owner: req.session.account._id,
  };

  try {
    const newSheet = new Sheet(sheetData);
    await newSheet.save();
    return res.status(201).json({ name: newSheet.name, playbook: newSheet.playbook });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Character sheet already exists' });
    }
    return res.status(500).json({ error: 'An error occured making the character sheet' });
  }
};

const getSheets = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Sheet.find(query).select('name playbook').lean().exec();

    return res.json({ sheets: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving Sheets!' });
  }
};

module.exports = {
  listPage,
  getSheets,
  sheetPage,
  makeCharacter,
};
