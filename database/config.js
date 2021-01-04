const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.kx29w.mongodb.net/hospitaldb",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    console.log('DB Online');
  } catch (error) {
    console.log(error);
    throw new Error('Error a la hora se iniciar la BD ver logs');
  }
};

module.exports = {
  dbConnection
}