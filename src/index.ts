import http from 'http';
import MongoConfiguration from './config/database/mongo/mongoConfiguration';
import app from './app';

// MongoDB Connection
const mongo: MongoConfiguration = new MongoConfiguration();
mongo.connectDB();

const server = http.createServer(app);
server.listen(process.env.SERVER_PORT, () => {
  console.log(`Server up and running on port ${process.env.SERVER_PORT}`);
});
