/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * @description     : get the values from the controller and process them for the labels in fundo notes
 *
 * @file            : label.service.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-dec-2021
 *
 **************************************************************************/

const {
  createLabel,
  findLabels,
  findSingleLabel,
  findSingleLabelAndUpdate,
  findAndRemove,
} = require("../models/label.model.js");

/**
 * @description extracting details to create a new label in the model
 * @param {String} title
 * @param {String} userId
 * @returns error or data
 */
const createNewLabel = async (title, userId) => {
  try {
    return await createLabel(title, userId);
  } catch (error) {
    throw error;
  }
};

/**
 * @description find all labels
 * @param {callback} callback
 * @param {String} userId
 * @returns error or data
 */
const findAllLabels = async (userId) => {
  try {
    const data = await findLabels(userId);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description find a single label
 * @param {String} userId
 * @param {String} findId
 */
const findLabel = async (userId, findId) => {
  try {
    const data = await findSingleLabel(userId, findId);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Find label and update it with the request body
 * @param {String} findId
 * @param {String} title
 * @param {String} userId
 */
const updateLabel = async (findId, title, userId) => {
  try {
    const data = await findSingleLabelAndUpdate(findId, title, userId);
    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * @description delete a label
 * @param {String} findId
 * @param {String} userId
 */
const deleteById = async (findId, userId) => {
  try {
    const data = await findAndRemove(findId, userId);
    return data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewLabel,
  findAllLabels,
  findLabel,
  updateLabel,
  deleteById,
};
