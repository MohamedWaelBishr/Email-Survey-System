const passport = require("passport");

module.exports = (app) => {
  /**
   * @swagger
   * components:
   *   schemas:
   *     Users:
   *       type: object
   *       required:
   *         - google_id
   *         - credits
   *       properties:
   *         id:
   *           type: string
   *           description: The auto-generated id of the Survey
   *         google_id:
   *           type: string
   *           description: Id fetched from google authentication
   *         credits:
   *           type: number
   *           description: The user credits
   *       example:
   *         google_id: 010101010101010101
   *         credits: 4
   */

  /**
   * @swagger
   * /auth/google:
   *   get:
   *     summary: sign in endpoint
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: sign in endpoint
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Users'
   */

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  /**
   * @swagger
   * /auth/google/callback:
   *   get:
   *     summary: redirect url callback after sign in
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: redirect url callback after sign in
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Users'
   */

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  /**
   * @swagger
   * /api/logout:
   *   get:
   *     summary: logs out the user
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: logs out the user
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Users'
   */

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  /**
   * @swagger
   * /api/current_user:
   *   get:
   *     summary: fetch the current signed in user data
   *     tags: [Auth]
   *     responses:
   *       200:
   *         description: fetch the current signed in user data
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Users'
   */

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
  });
};
