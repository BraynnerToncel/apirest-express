"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var user_service_1 = require("./user.service");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var createUser_dto_1 = require("./dto/createUser.dto");
var updateUser_dto_1 = require("./dto/updateUser.dto");
var UserController = (function () {
    function UserController() {
        this.userService = new user_service_1.UserService();
    }
    UserController.prototype.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createUserDto, errors, _a, status, message, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        createUserDto = (0, class_transformer_1.plainToClass)(createUser_dto_1.CreateUserDto, req.body);
                        return [4, (0, class_validator_1.validate)(createUserDto)];
                    case 1:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            res.status(400).json({ errors: errors });
                            return [2];
                        }
                        return [4, this.userService.createUser(req.body)];
                    case 2:
                        _a = _b.sent(), status = _a.status, message = _a.message;
                        res.status(status).json(message);
                        return [3, 4];
                    case 3:
                        error_1 = _b.sent();
                        console.error(error_1);
                        res.status(500).json({ message: "Internal server error" });
                        return [3, 4];
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.findAllUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.userService.findAllUsers()];
                    case 1:
                        result = _a.sent();
                        res.status(result.status).json(result.message);
                        return [3, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.error("Error fetching user:", err_1);
                        res.status(500).json({ message: "Internal server error" });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.findUserById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4, this.userService.findUserById(userId)];
                    case 1:
                        result = _a.sent();
                        res.status(result.status).json(result.message);
                        return [3, 3];
                    case 2:
                        err_2 = _a.sent();
                        console.error("Error fetching user by ID:", err_2);
                        res.status(500).json({ message: "Internal server error" });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    UserController.prototype.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, UpdateUsersDto, errors, _a, status, message, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = req.params.userId;
                        UpdateUsersDto = (0, class_transformer_1.plainToClass)(updateUser_dto_1.UpdateUserDto, req.body);
                        return [4, (0, class_validator_1.validate)(updateUser_dto_1.UpdateUserDto)];
                    case 1:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            return [2, res.status(400).json({ errors: errors })];
                        }
                        return [4, this.userService.updateUsers(userId, UpdateUsersDto)];
                    case 2:
                        _a = _b.sent(), status = _a.status, message = _a.message;
                        return [2, res.status(status).json(message)];
                    case 3:
                        err_3 = _b.sent();
                        console.error("Error updating user:", err_3);
                        return [2, res.status(500).json({ message: "Internal server error" })];
                    case 4: return [2];
                }
            });
        });
    };
    UserController.prototype.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.params.userId;
                        return [4, this.userService.deleteUsers(userId)];
                    case 1:
                        result = _a.sent();
                        res.status(result.status).json(result.message);
                        return [3, 3];
                    case 2:
                        err_4 = _a.sent();
                        console.error("Error deleting user:", err_4);
                        res.status(500).json({ message: "Internal server error" });
                        return [3, 3];
                    case 3: return [2];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
