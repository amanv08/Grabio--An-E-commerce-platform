const jwt = require('jsonwebtoken');

module.exports = function (model) {
    return async function (req, res, next) {
        if (!req.cookies.token) {
            req.flash("error", "You need to login First");
            return res.redirect("/");
        }

        try {
            let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
            
            let user = await model.findOne({ email: decoded.email }).select("-password");
            
            if (!user) {
                req.flash("error", "Something went wrong");
                return res.redirect("/");
            }

            req.user = user;
            next();
        } catch (err) {
            console.error(err);
            req.flash("error", "Something went wrong");
            res.redirect("/");
        }
    }
};
