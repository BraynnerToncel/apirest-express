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
exports.CreateRolesPermissionDto = exports.CreateRoleDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CreateRoleDto = (function () {
    function CreateRoleDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.MaxLength)(45),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateRoleDto.prototype, "roleName", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(8),
        (0, class_validator_1.MaxLength)(100),
        (0, class_validator_1.IsNotEmpty)(),
        __metadata("design:type", String)
    ], CreateRoleDto.prototype, "roleDescription", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], CreateRoleDto.prototype, "roleState", void 0);
    __decorate([
        (0, class_validator_1.IsArray)(),
        (0, class_validator_1.ValidateNested)({ each: true }),
        (0, class_transformer_1.Type)(function () { return CreateRolesPermissionDto; }),
        __metadata("design:type", Array)
    ], CreateRoleDto.prototype, "permissions", void 0);
    return CreateRoleDto;
}());
exports.CreateRoleDto = CreateRoleDto;
var CreateRolesPermissionDto = (function () {
    function CreateRolesPermissionDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateRolesPermissionDto.prototype, "permissionId", void 0);
    return CreateRolesPermissionDto;
}());
exports.CreateRolesPermissionDto = CreateRolesPermissionDto;
