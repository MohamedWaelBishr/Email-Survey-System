const mongoose = require("mongoose");
const requireLogin = require("../Middlewares/requireLogin");
const requireCredits = require("../Middlewares/requireCredits");
const Survey = mongoose.model("Surveys");
const Mailer = require("../Service/Mailer");
const surveyTemplate = require("../Service/emailTemplates/surveyTemplate");

module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.get("/api/surveys/thanks", (req, res) => {
    res.send({ msg: "Thanks for using our services amd voting ." });
  });

  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(",")
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    /* Send an Email using Sendgrid mailing service*/
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(402).send(err);
    }
  });
};

//const sur = {title:'hello',subject:'mailing survey',body:'need ur feedback!',recipients:'email.survey.system@gmail.com'}
