function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            return res.status(400).json({ message: "No token provided." });
        }
        const token = authHeader.split(" ");
        if (token.length === 1) {
            return res.status(400).json({ message: "Invalid request." });
        }
        if (token[1] !== process.env.API_SECRET) {
            return res.status(403).json({ message: "Unauthorised entry." });
        }
    } catch (err) {
        return res.status(500).json({ message: err });
    }

    next();
}

module.exports = authenticate;
