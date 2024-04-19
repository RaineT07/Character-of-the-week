const mongoose = require('mongoose');
const _ = require('underscore');

const setName = (name) => _.escape(name).trim();
const setPlaybook = (playbook) => _.escape(playbook).trim();
const setDescription = (description) => _.escape(description).trim();

const SheetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  playbook: {
    type: String,
    required: true,
    trim: true,
    set: setPlaybook,
  },
  level: {
    type: Number,
    min: 0,
    required: true,
    default: 0,
  },
  experience: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
    default: 0,
  },
  luck: {
    type: Number,
    min: 0,
    max: 7,
    required: true,
    default: 0,
  },
  harm: {
    type: Number,
    min: 0,
    max: 7,
    required: true,
    default: 0,
  },
  unstable: {
    type: Boolean,
    required: true,
    default: false,
  },
  // moves:{
  // type: [String],
  //    required:true,
  // },
  // ratings:{
  // type:[String],
  // required:true,
  // },
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
});

SheetSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  playbook: doc.playbook,
  level: doc.level,
  experience: doc.experience,
  luck: doc.luck,
  harm: doc.harm,
  unstable: doc.unstable,
  // moves:doc.moves,
  // ratings:doc.ratings,
  description: doc.description,
});

const SheetModel = mongoose.model('Sheet', SheetSchema);
module.exports = SheetModel;