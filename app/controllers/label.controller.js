/* ************************************************************************
 * Execution        : 1. default node       cmd> nodemon server.js
 *
 * @description     : get the request, response object from label routes
 *
 * @file            : label.controller.js
 * @author          : Mohammad Musthafa
 * @version         : 1.0
 * @since           : 1-dec-2021
 *
 **************************************************************************/

const {
  createNewLabel,
  findAllLabels,
  findLabel,
  updateLabel,
  deleteById,
} = require("../service/label.service.js");
const logger = require("../../config/logger");
const { createCustomError } = require("../error-handler/custom-error");

/**
 * @description handles request response for creating a label
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const create = async (req, res, next) => {
  let title = req.body.title;
  let userId = req.body.userId;
  try {
    const data = await createNewLabel(title, userId);
    logger.info(`created a new label ${data._id}`);
    return res.status(200).json({
      message: "created label successfully",
      createdLabel: {
        request: {
          type: "POST",
          url: "http://localhost:5000/labels/"
        },
        Label: data
      },
    });
  } catch (error) {
    return next(
      createCustomError("Error occurred while creating the label.", 500)
    );
  }
};

/**
 * @description handles request response for retrieving all labels from the database.
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findAll = async (req, res, next) => {
  try {
    const data = await findAllLabels(req.body.userId);
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    const response = {
      count: data.length,
      Labels: data.map((label) => {
        return {
          title: label.title,
          _id: label._id,
          userId: label.userId,
          request: {
            type: "GET",
            url: "http://localhost:3000/labels/" + label._id,
          },
        };
      }),
    };
    logger.info("responded with all labels");
    return res.status(200).json(response);
  } catch (error) {
    return next(
      createCustomError("Error occurred while fetching all labels", 500)
    );
  }
};

/**
 * @description handles request response for finding a single label with a labelId
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const findOne = async (req, res, next) => {
  let id = req.params.labelId;
  let userId = req.body.userId;

  try {
    const data = await findLabel(userId, id);
    if (!data) {
      res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`responded with a label ${data._id}`);
    return res.status(200).send({ Message: "label found!!!", Label: data });
  } catch (error) {
    return next(createCustomError(`no label found with id: ${id}`, 500));
  }
};

/**
 * @description handles request response for updating a label identified by the labelId in the request
 * @param {Object} req
 * @param {Object} res
 */
const update = async (req, res, next) => {
  let id = req.params.labelId;
  let title = req.body.title;
  let userId = req.body.userId;

  try {
    const data = await updateLabel(id, title, userId);
    if (!data) {
      return res.status(404).send({
        message: "no data found",
      });
    }
    logger.info(`Updated the label ${data._id}`);
    return res
      .status(200)
      .send({ Message: "label updated successfully", label: data });
  } catch (error) {
      if (error.kind === "ObjectId") {
        return res.status(404).send({
          message: "label not found with id (catch)" + id,
        });
      }
      return next(createCustomError(`no label found with id: ${id}`, 500));
  }
};

/**
 * @description handles request response for deleting a label with the specified labelId in the request
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
const deleteOne = async (req, res, next) => {
  let id = req.params.labelId;
  let userId = req.body.userId;
  try {
      const data = await deleteById(id, userId)
      if (!data) {
        return res.status(404).send({
          message: "no label found",
        });
      }
      logger.info(`deleted the label ${data._id}`);
      return res
      .status(200)
      .send({ message: "Label deleted successfully", label: data})
  } catch (error) {
    return next(
        createCustomError(`could not delete the label with id: ${id}`, 500)
      );
  }
};

module.exports = { create, findAll, findOne, update, deleteOne };
