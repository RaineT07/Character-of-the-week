const mongoose = require('mongoose');
const File = require('/filestore.js');
const {FileSchema} = File;
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
  description: {
    type: String,
    required: true,
    trim: true,
    set: setDescription,
  },
  image:{
    type:FileSchema,
    required:false,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required:true,
    ref: 'Account',
  },
  createdDate: {
    type:Date,
    default:Date.now
  }
});

SheetSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  playbook: doc.playbook,
  level: doc.level,
  experience: doc.experience,
  luck: doc.luck,
  harm: doc.harm,
  unstable: doc.unstable,
  description: doc.description,
});

const SheetModel = mongoose.model('Sheet', SheetSchema);
module.exports = SheetModel;
