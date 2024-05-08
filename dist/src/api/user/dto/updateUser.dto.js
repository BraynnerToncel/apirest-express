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
exports.UpdateUserStateDto = exports.RestorePasswordDto = exports.UpdateUserDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateUserDto = (function () {
    function UpdateUserDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(32),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "userFullName", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(4),
        (0, class_validator_1.MaxLength)(32),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "userLastName", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(3),
        (0, class_validator_1.MaxLength)(24),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "username", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5),
        (0, class_validator_1.MaxLength)(46),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "newPassword", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "userEmail", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], UpdateUserDto.prototype, "userState", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsUUID)(),
        __metadata("design:type", String)
    ], UpdateUserDto.prototype, "roleId", void 0);
    return UpdateUserDto;
}());
exports.UpdateUserDto = UpdateUserDto;
var RestorePasswordDto = (function () {
    function RestorePasswordDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(5),
        (0, class_validator_1.MaxLength)(46),
        __metadata("design:type", String)
    ], RestorePasswordDto.prototype, "password", void 0);
    return RestorePasswordDto;
}());
exports.RestorePasswordDto = RestorePasswordDto;
var UpdateUserStateDto = (function () {
    function UpdateUserStateDto() {
    }
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], UpdateUserStateDto.prototype, "userState", void 0);
    return UpdateUserStateDto;
}());
exports.UpdateUserStateDto = UpdateUserStateDto;
