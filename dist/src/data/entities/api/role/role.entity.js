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
exports.Role = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user/user.entity");
var permision_entity_1 = require("../permission/permision.entity");
var Role = (function () {
    function Role() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Role.prototype, "roleId", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 45, nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "roleName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 100, nullable: false }),
        __metadata("design:type", String)
    ], Role.prototype, "roleDescription", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'bool', default: true }),
        __metadata("design:type", Boolean)
    ], Role.prototype, "roleState", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return user_entity_1.User; }, function (user) { return user.role; }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", Array)
    ], Role.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return permision_entity_1.Permission; }, function (permission) { return permission.role; }, {
            onDelete: 'CASCADE',
            eager: true,
        }),
        (0, typeorm_1.JoinTable)({ name: 'roles_has_permissions' }),
        __metadata("design:type", Array)
    ], Role.prototype, "permissions", void 0);
    Role = __decorate([
        (0, typeorm_1.Entity)()
    ], Role);
    return Role;
}());
exports.Role = Role;
