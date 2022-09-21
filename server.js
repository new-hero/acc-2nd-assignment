const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 5000;
const app = require("./app");
const errorHandler = require("./middlewars/errorHandler");
const TourRoute=require('./routes/v1/tours.routes');
const connectToDatabase = require("./utils/dbConnections");

connectToDatabase()

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
// route  codding here 
app.use("/api/v1/", TourRoute)





app.all("*", (req, res) => {
  res.send("NO route found.");
});

app.use(errorHandler);
process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});




