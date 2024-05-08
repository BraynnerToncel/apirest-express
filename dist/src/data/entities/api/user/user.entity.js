"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var role_entity_1 = require("../role/role.entity");
var User = (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], User.prototype, "userId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 32, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "userFullName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 32, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "userLastName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 10, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "username", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 32, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "userEmail", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 150, nullable: false }),
        __metadata("design:type", String)
    ], User.prototype, "userPassword", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: true, nullable: false }),
        __metadata("design:type", Boolean)
    ], User.prototype, "userState", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return role_entity_1.Role; }, function (role) { return role.user; }),
        __metadata("design:type", role_entity_1.Role)
    ], User.prototype, "role", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
