const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/unknown', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
// TEMP TRY FIX
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose.connection;
