// GET /appointment
// GET /appointment/{appointmentId}
// POST /appointment
// PUT /appointment/{appointmentId}
// DELETE /appointment/{appointmentId}

// Importing Dependencies:
const mongodb = require('../db/connect'); // is a reference to my database connection
const ObjectId = require('mongodb').ObjectId; // is a type provided by the MongoDB driver. Allows me to work with MongoDB's unique identifiers.

// Centralized error response function
function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({ error: message });
}

// Function that handles a GET request.
const getAllAppointments = async (req, res) => {
  try {
    /* 
    The below "tags" tells swagger-autogen to group this function
      #swagger.tags = ['Appointments']
    The below "summary" tells swagger-autogen to add a summary to this function
      #swagger.summary = 'Gets information for all appointments.'
    */
    // add the database
    const result = await mongodb.getDb().db().collection('appointments').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Gets a single appointment
const getSingleAppointment = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Appointments']
      #swagger.summary = 'Gets information for a single appointment.'
    */
    // add the database
    const appointmentId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .find({ _id: appointmentId })
      .toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Create a POST const
const createAppointment = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Appointments']
      #swagger.summary = 'Creates an appointment.'
    */
    // Check if user is authenticated (To be used with OAuth)
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule an appointment.');
    // }
    // add the database
    // const appointment = req.body;
    const appointment = {
      user: req.body.user,
      veterinarian: req.body.veterinarian,
      dateAndTime: req.body.dateAndTime,
      purpose: req.body.purpose
    };
    const response = await mongodb.getDb().db().collection('appointments').insertOne(appointment);

    if (response.acknowledged) {
      const newAppointmentId = response.insertedId;
      res
        .status(201)
        .json({ message: 'Appointments created successfully', AppointmentId: newAppointmentId });
    } else {
      errorResponse(res, 500, 'Failed to create Appointment');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a PUT request to update a appointment.
const updateAppointment = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Appointments']
      #swagger.summary = 'Updates an appointment.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to schedule a appointment.');
    // }
    const appointmentId = new ObjectId(req.params.id);
    const updatedAppointment = req.body;
    // add the database
    const response = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .updateOne({ _id: appointmentId }, { $set: { appointment: updatedAppointment } });

    if (response.matchedCount === 1 && response.modifiedCount === 1) {
      res.status(204).json({ message: 'Appointment updated successfully' });
    } else {
      errorResponse(res, 404, 'Appointment not found or not updated');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

// Function that handles a DELETE request.
const deleteAppointment = async (req, res) => {
  try {
    /* 
      #swagger.tags = ['Appointments']
      #swagger.summary = 'Delets an appointment.'
    */
    // Check if user is authenticated
    // if (!req.oidc.isAuthenticated()) {
    //   return errorResponse(res, 401, 'Unauthorized. Please login to delete an appointment.');
    // }
    // add the database
    const appointmentId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection('appointments')
      .deleteOne({ _id: appointmentId });

    if (response.deletedCount === 1) {
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } else {
      errorResponse(res, 404, 'Appointment not found');
    }
  } catch (error) {
    console.error(error);
    errorResponse(res, 500, 'Internal Server Error');
  }
};

module.exports = {
  getAllAppointments,
  getSingleAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
};
