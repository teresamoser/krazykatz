// Created by Nina just for Swagger - Code to be finalized later.
// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllUsers = async (req, res) => {
  try {
    /* 
    The below "tags" tells swagger-autogen to group this function
      #swagger.tags = ['Users']
    The below "summary" tells swagger-autogen to add a summary to this function
      #swagger.summary = 'Gets all users.'
    */
    // add the database
    const result = await mongodb.getDb().db().collection('users').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single pet
const getSingleUser = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Gets informaiton for one user.'
    */
    // add the database
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('users').find({ _id: userId }).toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const
const createUser = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Creates a user.'
    */
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to create a User.');
    // }
    // add the database
    // const user = req.body;
    const user = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      contactInformation: req.body.contactInformation
    };
    const response = await mongodb.getDb().db().collection('users').insertOne(user);

    if (response.acknowledged) {
      const newUserId = response.insertedId;
      res.status(201).json({ message: 'User created successfully', userId: newUserId });
    } else {
      errorResponse(res, 500, 'Failed to create a User');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a pet.
const updateUser = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Updates a user.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to update user.');
    // }
    const userId = new ObjectId(req.params.id);
    const updatedUser = req.body;
    // add the database
    const response = await mongodb
      .getDb()
      .db()
      .collection('users')
      .updateOne({ _id: userId }, { $set: { pet: updatedUser } });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'User updated successfully' });
    } else {
      errorResponse(res, 404, 'User not found or not updated');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deleteUser = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Users']
      #swagger.summary = 'Deletes a user.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete a User.');
    // }
    // add the database
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('users').deleteOne({ _id: userId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      errorResponse(res, 404, 'User not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
};
