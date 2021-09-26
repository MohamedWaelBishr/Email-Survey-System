//const keys =require
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const requireLogin = require("../Middlewares/requireLogin");

module.exports = (app) => {
  /**
   * @swagger
   * /api/stripe:
   *   post:
   *     summary: adding credits to the user after stripe checkout success
   *     tags: [Payments]
   *     responses:
   *       200:
   *         description: adding credits to the user after stripe checkout success
   */

  app.post("/api/stripe", requireLogin, async (req, res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 for 5 credits",
      source: req.body.id,
    });

    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
