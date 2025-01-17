"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentification = void 0;
var jwt = __importStar(require("jsonwebtoken"));
var dotenv = __importStar(require("dotenv"));
dotenv.config();
var authentification = function (req, res, next) {
    var header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    var token = header.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        var decode = jwt.verify(token, process.env.JWT_SECRET ? process.env.JWT_SECRET : "secret");
        console.log(decode);
        if (typeof decode === "string") {
            return res.status(401).json({ message: "Unauthorized" });
        }
        req["currentUser"] = decode;
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "El token ha expirado" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Token JWT inválido" });
        }
        else {
            return res.status(401).json({ message: "Error al verificar el token" });
        }
    }
};
exports.authentification = authentification;
