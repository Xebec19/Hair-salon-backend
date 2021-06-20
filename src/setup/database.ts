import mongoose from 'mongoose'
import * as de from 'dotenv';
const dotenv = de.config();

const dbConnection = async () => {
  //config mongoDB
  try {
    let setup = await mongoose.connect(`${process.env.DB_URL_LOCAL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    console.log('Database connected')
  }
  catch (error) {
    console.log('Sorry, Database couldn\'t be connected because ', error);
  }
}

export default dbConnection;