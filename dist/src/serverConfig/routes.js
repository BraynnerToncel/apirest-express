"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_routes_1 = __importDefault(require("../api/auth/auth.routes"));
var permission_routes_1 = __importDefault(require("../api/permission/permission.routes"));
var role_routes_1 = __importDefault(require("../api/role/role.routes"));
var user_routes_1 = __importDefault(require("../api/user/user.routes"));
var AppRouter = (function () {
    function AppRouter() {
    }
    AppRouter.prototype.router = function () {
        var router = (0, express_1.Router)();
        router.use('/auth', auth_routes_1.default);
        router.use('/users', user_routes_1.default);
        router.use('/roles', role_routes_1.default);
        router.use('/permissions', permission_routes_1.default);
        return router;
    };
    return AppRouter;
}());
exports.default = AppRouter;
