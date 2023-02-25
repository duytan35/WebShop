
const siteRouter = require('./site.js');
const registerRouter = require('./register.js');
const loginRouter = require('./login.js');

function route (app) {
    app.use("/home", siteRouter);
    app.use("/login", loginRouter);
    app.use("/register", registerRouter);
}
module.exports = route;
