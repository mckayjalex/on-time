const db = require('../config/connection.js');
const { User, Flight, Result} = require('../models')

const flightData = require('./flightData.json')

db.once('open', async () => {
    await User.deleteMany({});
    await Flight.deleteMany({});
    await Result.deleteMany({});

    const flights = await Flight.insertMany(flightData)
  
    console.log('Info seeded');
    process.exit(0);
  });