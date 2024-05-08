"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_controller_1 = require("./auth.controller");
var authRoutes = (0, express_1.Router)();
var authController = new auth_controller_1.AuthController();
authRoutes.post('/login', function (req, res) { return authController.login(req, res); });
exports.default = authRoutes;
