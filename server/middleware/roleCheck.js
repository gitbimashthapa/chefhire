const roleCheck = (roles) => {
    return (req, res, next) => {
        // Check if the user is authenticated
        if (!req.user) {
            return res.status(403).json({ message: 'Access denied. No user logged in.' });
        }

        // Check if the user's role is included in the allowed roles
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied. You do not have the required role.' });
        }

        // If the user has the required role, proceed to the next middleware
        next();
    };
};

module.exports = roleCheck;