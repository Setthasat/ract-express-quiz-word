"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidString = isValidString;
exports.isValidEmail = isValidEmail;
function isValidString(value, minLength, maxLength) {
    if (value == undefined || value == "" || value == null) {
        return false;
    }
    if (value.length < minLength || value.length > maxLength) {
        return false;
    }
    return true;
}
function isValidEmail(email, minLength, maxLength) {
    if (email == undefined) {
        return false;
    }
    const aderssCheck = email.includes("@");
    const dotCheck = email.includes(".");
    if (aderssCheck == false || dotCheck == false) {
        return false;
    }
    let adressIndex = 0;
    let dotIndex = 0;
    for (let i = 0; i < (email === null || email === void 0 ? void 0 : email.length); i++) {
        if (email[i].includes("@")) {
            adressIndex = i;
        }
        if (email[i].includes(".")) {
            dotIndex = i;
        }
    }
    if (adressIndex > dotIndex) {
        return false;
    }
    return isValidString(email, minLength, maxLength);
}
