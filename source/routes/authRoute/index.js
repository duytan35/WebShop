const registerRouter = require('./register.js');
const loginRouter = require('./login.js');
const verifyRouter = require('./verify.js');

function route (app) {
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);
    app.use("/verify", verifyRouter);
}

module.exports = route;
