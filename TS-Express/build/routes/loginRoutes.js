"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
function auth(req, res, next) {
    if (req.session && req.session.loggedIn) {
        next();
        return;
    }
    res.status(403);
    res.send("<h1>Can't access</h1>");
}
router.get("/login", function (req, res) {
    res.send("<form method=\"POST\">\n              <label for=\"email\">Email</label><br>\n              <input type=\"email\" id=\"email\" name=\"email\"><br>\n              <label for=\"password\">password:</label><br>\n              <input type=\"password\" id=\"password\" name=\"password\">\n              <button>Submit</button>\n          </form>");
});
router.post("/login", function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email &&
        password &&
        email === "mioncgp@gmail.com" &&
        password === "asd") {
        req.session = { loggedIn: true };
        res.redirect("/");
    }
    else {
        res.send("Provide email");
    }
});
router.get("/", function (req, res) {
    if (req.session && req.session.loggedIn) {
        res.send("<div>Logged in</div><a href=\"/logout\">Logout</a>");
    }
    else {
        res.send("<div>Logged out</div><a href=\"/login\">Login</a>");
    }
});
router.get("/logout", function (req, res) {
    req.session = undefined;
    res.redirect("/");
});
router.get("/protected", auth, function (req, res) {
    res.send("<h1>Welcome to main page</h1>");
});
