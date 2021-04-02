import mongoose from 'mongoose';

const DB_STRING = `mongodb+srv://consultationeasy:${process.env.DATABASE_PASSWORD}@cluster0.umi85.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const initDB = async () => {
  try {
    await mongoose.connect(DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('DB connected');
  } catch (err) {
    console.log('Database connection error', err);
  }
};

export { initDB as default };
