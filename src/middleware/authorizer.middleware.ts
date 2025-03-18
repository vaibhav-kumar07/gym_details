import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/helper";
// import RoleRedisUtils from "@utils/role.redis";



export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];  // Extract token from Authorization header (Bearer <token>)
        if (!token)
            return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });


        const userData = verifyToken(token);  // Verify and decode the token
        if (!userData || !userData._id || !userData.role)
            return res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });

        // const userRole = await RoleRedisUtils.getUserRole(userData._id) //get User role from redis
        // if (!userRole)
        //     return res.status(401).json({ success: false, error: "Unauthorized: Please log in again." });

        req.body.loggedInUser = userData;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, error: "Unauthorized: Token verification failed" });
    }
};


const VALID_ROLES = ["owner", "admin", "trainer", "member"] as const;
type ValidRole = (typeof VALID_ROLES)[number];
export const authorizeRole = (allowedRoles: ValidRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Extract token from Authorization header
            const token = req.headers.authorization?.split(" ")[1];
            if (!token) {
                return res.status(401).json({ success: false, error: "Unauthorized: No token provided" });
            }

            // Verify and decode the token
            const userData = verifyToken(token);
            if (!userData || !userData._id || !userData.role) {
                return res.status(401).json({ success: false, error: "Unauthorized: Invalid token" });
            }

            // Ensure user has permission
            console.log(userData.role,allowedRoles)
            if (!allowedRoles.includes(userData.role as ValidRole)) {
                return res.status(403).json({ success: false, error: "Access Denied: Insufficient permissions." });
            }

            req.body.loggedInUser = userData;
            next();
        } catch (error) {
            return res.status(401).json({ success: false, error: "Unauthorized: Token verification failed" });
        }
    };
};
