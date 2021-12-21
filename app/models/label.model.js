/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * @description     : get the values from the service and process them for the label in fundo notes
 *
 * @file            : label.models.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-dec-2021
 *
 **************************************************************************/

const mongoose = require("mongoose");


//creation of schema for label collection
const LabelSchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Label = mongoose.model("Label", LabelSchema);

/**
 * @description Query to create a label
 * @param {String} title
 * @returns
 */
const createLabel = async (title, userId) => {
  const label = new Label({
    title: title,
    userId: userId,
  });

  try {
    return await label.save({});
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to find all labels
 * @param {String} userId
 * @returns error 
 */
const findLabels = async (userId) => {
  try {
    const data = await Label.find({ userId: userId })
      .populate({ path: "userId", select: "email" })
      .exec();
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to find one specific note
 * @param {String} userId
 * @param {String} id
 * @returns error 
 */
const findSingleLabel = async (userId, id) => {
  try {
    const data = await Label.find({ userId: userId });
    let result = data.filter((obj) => id == obj._id);
    if (result.length == 0) throw "No label found";
    else return result;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to find and update note
 * @param {String} id
 * @param {String} title
 * @param {String} userId
 * @returns
 */
const findSingleLabelAndUpdate = async (id, title, userId) => {
  try {
    const label = await Label.findOne({ userId: userId, _id: id });
    if (!label) {
      throw "no label found";
    }
    const data = await Label.findByIdAndUpdate(
      id,
      { title: title },
      { new: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Query to find and remove a label
 * @param {String} id
 * @param {String} userId
 * @returns
 */
const findAndRemove = async (id, userId) => {
  try {
    const data = await Label.findOneAndRemove({ userId: userId, _id: id });
    if (!data) {
      throw "no label found"
    }
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createLabel,
  findLabels,
  findSingleLabel,
  findSingleLabelAndUpdate,
  findAndRemove,
};
