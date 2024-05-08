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
exports.PermissionServices = void 0;
var permision_entity_1 = require("./../../data/entities/api/permission/permision.entity");
var data_source_1 = require("../../data/database-config/data-source");
var permission_constant_1 = require("./../../data/constant/permission/permission.constant");
var PermissionServices = (function () {
    function PermissionServices() {
        this.PermissionRepository = data_source_1.AppDataSource.getRepository(permision_entity_1.Permission);
    }
    PermissionServices.prototype.findAllPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.PermissionRepository.find()];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    PermissionServices.prototype.syncPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var incosistentPermissions, storedPermissions, storedPermissionNames, staticPermissions, _i, staticPermissions_1, permission, errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        incosistentPermissions = [];
                        console.log("Verfyng permissions...");
                        return [4, this.PermissionRepository.find()];
                    case 1:
                        storedPermissions = _a.sent();
                        storedPermissionNames = storedPermissions.map(function (permission) { return permission.permissionName; });
                        staticPermissions = Object.values(permission_constant_1.EValidPermission);
                        _i = 0, staticPermissions_1 = staticPermissions;
                        _a.label = 2;
                    case 2:
                        if (!(_i < staticPermissions_1.length)) return [3, 5];
                        permission = staticPermissions_1[_i];
                        if (!(process.env.DB_SYNCHRONIZE === "true")) return [3, 4];
                        if (!!storedPermissionNames.includes(permission)) return [3, 4];
                        return [4, this.PermissionRepository.save({
                                permissionName: permission,
                                permissionDescription: "".concat(permission
                                    .split(":")
                                    .join(" "), " (default)"),
                                permissionState: true,
                            })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 2];
                    case 5:
                        storedPermissionNames.forEach(function (permission) {
                            if (!staticPermissions.includes(permission)) {
                                incosistentPermissions.push(permission);
                            }
                        });
                        if (incosistentPermissions.length > 0) {
                            errorMessage = "Inconsistent permissions found: " + incosistentPermissions.join(",");
                            console.error(incosistentPermissions.join(","));
                            throw new Error(errorMessage);
                        }
                        return [4, this.PermissionRepository.find()];
                    case 6:
                        storedPermissions = _a.sent();
                        if (!(storedPermissions.length === staticPermissions.length)) {
                            throw new Error("Permission imcomplite activate sincronized");
                        }
                        console.log("Verification done!");
                        return [2];
                }
            });
        });
    };
    return PermissionServices;
}());
exports.PermissionServices = PermissionServices;
