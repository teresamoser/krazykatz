// Test for getAllAppointments function

const appointmentsController = require('../controllers/appointments');
const mongodb = require('../db/connect');

describe('getAllAppointments', () => {
  it('should return all appointments', async () => {
    const mockAppointments = [
      {
        /* mocked appointment data */
      }
    ];
    jest.spyOn(mongodb.getDb().db().collection('appointments'), 'find').mockReturnValue({
      toArray: jest.fn().mockResolvedValue(mockAppointments)
    });

    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn(),
      json: jest.fn()
    };

    await appointmentsController.getAllAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAppointments);
  });

  it('should handle errors and return 500 status', async () => {
    jest
      .spyOn(mongodb.getDb().db().collection('appointments'), 'find')
      .mockRejectedValue(new Error('Mocked error'));

    const req = {};
    const res = {
      setHeader: jest.fn(),
      status: jest.fn(),
      json: jest.fn()
    };

    await appointmentsController.getAllAppointments(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});
