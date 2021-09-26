//dependencies
const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");
const user = require("./Models/User");
const survey = require("./Models/Survey");
const ConnectDB = require("./DBconnect");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

////google oauth///

require("./Service/Passport");
ConnectDB();
const app = express();
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
require("./Routes/authRoute")(app);
require("./Routes/billingRoute")(app);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Email Survey System API",
      version: "1.0.0",
      description:
        "A Simple Express Backend API For Email Survey System Application",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

//app methods
app.get("/", (req, res) => {
  res.send({ msg: "Hello World!" });
});

require("./Routes/SurveyRoute")(app);

//server port
const PORT = process.env.PORT;

app.listen(PORT, () => {
  `Successfully Started The Server Side On Port ${PORT}`, PORT;
});
