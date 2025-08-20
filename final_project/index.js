const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
  try {
    // Ensure session & token exist
    if (!req.session || !req.session.authorization) {
      return res.status(403).json({ message: "User not logged in" });
    }

    const { accessToken } = req.session.authorization;
    if (!accessToken) {
      return res.status(403).json({ message: "Access token missing" });
    }

    // Verify JWT (must match the secret used when signing, e.g., "access")
    jwt.verify(accessToken, "access", (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "User not authenticated" });
      }
      // Attach decoded payload (e.g., username) for downstream handlers
      req.user = decoded;
      return next();
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal authentication error" });
  }
});

 
const PORT =7000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
