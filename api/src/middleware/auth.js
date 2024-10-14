const { verifyToken } = require('../api/helpers/token');

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization; //no standard for either Authorization or authorization. but i will always start with Bearer and a space

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    const verified = await verifyToken(token);

    if (!verified) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
    next();
};

module.exports = isAuthenticated;
