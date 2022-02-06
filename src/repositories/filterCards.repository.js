const Attribute = require('../models/filterCardsModels/AttributeCards.model')
const Race = require('../models/filterCardsModels/RaceCards.model')
const Rarity = require('../models/filterCardsModels/RarityCards.model')
const Type = require('../models/filterCardsModels/TypeCards.model')

exports.getAllAttributes = async () => {
    return await Attribute.find().sort({
      'name': 1
    })
  }

exports.getAllRaces = async () => {
    return await Race.find().sort({
      'name': 1
    })
  }

exports.getAllRarities = async () => {
    return await Rarity.find().sort({
      'name': 1
    })
  }

exports.getAllTypes = async () => {
    return await Type.find().sort({
      'name': 1
    })
  }