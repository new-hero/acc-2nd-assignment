const dotenv = require("dotenv").config();
const colors = require("colors");
const { connectToServer } = require("./utils/dbConnections");
const port = process.env.PORT || 5000;
const app = require("./app");
const errorHandler = require("./middlewars/errorHandler");
const TourRoute=require('./routes/v1/tours.routes')

connectToServer((err) => {
  if (!err) {
    app.listen(port, () => {
      console.log(`App is running on port ${port}`.yellow.bold);
    });
  } else {
    console.log(err)
  }
});

// route  codding here 
app.use("/tours", TourRoute)





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




