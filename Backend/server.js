const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling Uncaught Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Uncaught Error Rejection`);
  process.exit(1);
});

// Config
dotenv.config({ path: "Backend/config/config.env" });
// Connecting to Database
connectDatabase();
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting Down the server due to Unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
