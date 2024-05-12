import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization denied"
        })
    }

    //if token is valid then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ success: false, message: "Token is not valid!" });
        }

        req.user = user;
        next(); // do not forget to call the next function
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not Authenticated!" });
        }
    });
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === "admin") {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You're not Authorize!" });
        }
    });
}