const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const mongoose = require("mongoose");
const requireLogin = require("../Middlewares/requireLogin");
const requireCredits = require("../Middlewares/requireCredits");
const Survey = mongoose.model("Surveys");
const Mailer = require("../Service/Mailer");
const surveyTemplate = require("../Service/emailTemplates/surveyTemplate");

module.exports = (app) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Survey:
   *       type: object
   *       required:
   *         - title
   *         - subject
   *         - body
   *         - recipients
   *       properties:
   *         id:
   *           type: string
   *           description: The auto-generated id of the Survey
   *         title:
   *           type: string
   *           description: The Survey title
   *         subject:
   *           type: string
   *           description: The Survey email subject
   *         body:
   *           type: string
   *           description: The Survey email body
   *         recipients:
   *           type: [string]
   *           description: The Survey recipient list
   *       example:
   *         title: Needs Your Opinion!
   *         subject: Can we take a minute from you?
   *         body: Please give us your feedback about our service [ x , y , z]
   *         recipients : [email1@example.com,email2@example.com]
   */

  /**
   * @swagger
   * /api/surveys:
   *   get:
   *     summary: Returns the list of all user's surveys
   *     tags: [Surveys]
   *     responses:
   *       200:
   *         description: The list of the surveys
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Survey'
   */

  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  /**
   * @swagger
   * /api/surveys/:
   *   post:
   *     summary: adding a new survey to the db
   *     tags: [Surveys]
   *     responses:
   *       200:
   *         description: adding a new survey to the db
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Survey'
   */

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

  /**
   * @swagger
   * /api/surveys/surveys/webhooks:
   *   post:
   *     summary: post the voting result from email , sending by sendgrid webhook service
   *     tags: [Surveys]
   *     responses:
   *       200:
   *         description: adding yes/no results in db
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Survey'
   */

  app.post("/api/surveys/webhooks", (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    console.log("[+] New Event Received ");
    res.send({ msg: "Delivered" });
  });

  /**
   * @swagger
   * /api/surveys/:surveyId/:choice:
   *   get:
   *     summary: Returns thanks message to the user after voting
   *     tags: [Surveys]
   *     responses:
   *       200:
   *         description: thanks message to the user after voting
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Survey'
   */

  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thanks for voting!");
  });
};

//const sur = {title:'hello',subject:'mailing survey',body:'need ur feedback!',recipients:'email.survey.system@gmail.com'}
