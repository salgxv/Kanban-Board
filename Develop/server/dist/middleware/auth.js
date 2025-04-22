import jwt from 'jsonwebtoken';
export const authenticateToken = (req, res, next) => {
    // TODO: verify the token exists and add the user data to the request object
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Expecting: "Bearer <token>"
    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        const user = decoded;
        req.user = user; // Attach user to request
        next(); // Move to next middleware or route
    });
};
