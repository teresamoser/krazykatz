//Code added by Teresa Moser
// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllVeterinarians = async (req, res) => {
  try {
    /* 
    The below "tags" tells swagger-autogen to group this function
      #swagger.tags = ['Veterinarians']
    The below "summary" tells swagger-autogen to add a summary to this function
      #swagger.summary = 'Gets information for all Veterinarians.'
    */
    // add the database
    const result = await mongodb.getDb().db().collection('veterinarians').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single pet
const getSingleVeterinarian = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Veterinarians']
      #swagger.summary = 'Gets information for a Veterinarian.'
    */
    // add the database
    const veterinarianId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('veterinarians')
      .find({ _id: veterinarianId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const
const createVeterinarian = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Veterinarians']
      #swagger.summary = 'Creates a Veterinarian file.'
    */
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a Veterinarian.');
    // }
    // add the database
    const veterinarian = {
      name: req.body.name,
      specialization: req.body.specialization,
      contactInformation: req.body.contactInformation,
      availability: req.body.availability
    };
    // const veterinarian = req.body;
    const response = await mongodb.getDb().db().collection('veterinarians').insertOne(veterinarian);

    if (response.acknowledged) {
      const newVeterinarianId = response.insertedId;
      res
        .status(201)
        .json({ message: 'Veterinarian created successfully', veterinarianId: newVeterinarianId });
    } else {
      errorResponse(res, 500, 'Failed to create Veterinarian');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a pet.
const updateVeterinarian = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Veterinarians']
      #swagger.summary = 'Updates a Veterinarian file.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a veterinarian.');
    // }
    const veterinarianId = new ObjectId(req.params.id);
    const updatedVeterinarian = req.body;
    // add the database
    const response = await mongodb
      .getDb()
      .db()
      .collection('veterinarians')
      .updateOne({ _id: veterinarianId }, { $set: { pet: updatedVeterinarian } });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'Veterinarian updated successfully' });
    } else {
      errorResponse(res, 404, 'Veterinarian not found or not updated');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deleteVeterinarian = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Veterinarians']
      #swagger.summary = 'Delete a Veterinarian file.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete a Veterinarian.');
    // }
    // add the database
    const veterinarianId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('veterinarian')
      .deleteOne({ _id: veterinarianId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Veterinarian deleted successfully' });
    } else {
      errorResponse(res, 404, 'Veterinarian not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllVeterinarians,
  getSingleVeterinarian,
  createVeterinarian,
  updateVeterinarian,
  deleteVeterinarian
};
