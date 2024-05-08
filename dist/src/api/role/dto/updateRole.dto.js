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
exports.UpdateRolesPermissionDto = exports.UpdateRoleDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var UpdateRoleDto = (function () {
    function UpdateRoleDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.MaxLength)(45),
        __metadata("design:type", String)
    ], UpdateRoleDto.prototype, "roleName", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.MaxLength)(100),
        __metadata("design:type", String)
    ], UpdateRoleDto.prototype, "roleDescription", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], UpdateRoleDto.prototype, "roleState", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return UpdateRolesPermissionDto; }),
        __metadata("design:type", Array)
    ], UpdateRoleDto.prototype, "permissions", void 0);
    return UpdateRoleDto;
}());
exports.UpdateRoleDto = UpdateRoleDto;
var UpdateRolesPermissionDto = (function () {
    function UpdateRolesPermissionDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], UpdateRolesPermissionDto.prototype, "permissionId", void 0);
    return UpdateRolesPermissionDto;
}());
exports.UpdateRolesPermissionDto = UpdateRolesPermissionDto;
