import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect"

export const arcjetProtection = async (req, res, next) => {
        if (process.env.NODE_ENV === "development") return next(); 
    try {
        const decision = await aj.protect(req);

        // Spoofed bot check
        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({ message: "Malicious bot activity detected." });
        }

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ message: "Rate limit exceeded. Please try again later." });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({ message: "Bot access denied" });
            } else {
                return res.status(403).json({ message: "Access denied by security policy." });
            }
        }

        next(); 

    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();
    }
}