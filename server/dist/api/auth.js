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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const auth_util_1 = require("../utils/auth.util");
const User_1 = __importDefault(require("../model/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Base response class to standardize API responses
class BaseResponse {
    constructor(code = 200, description = "", data = null) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
    buildResponse() {
        return {
            status: { code: this.code, description: this.description },
            data: this.data,
        };
    }
    setValue(code, description, data) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}
// Auth Controller class with methods for registration, login, and OTP verification
class Auth {
    // Register user
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { email, username, password, user_id, otp } = req.body;
            if (!(0, auth_util_1.isValidEmail)(email, 1, 100) || !(0, auth_util_1.isValidString)(username, 1, 100) || !(0, auth_util_1.isValidString)(password, 1, 100)) {
                baseResponseInst.setValue(400, "Invalid input", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            // Check if email already exists
            const isExistingEmail = yield User_1.default.findOne({ email });
            if (isExistingEmail) {
                baseResponseInst.setValue(400, "User already exists", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            // Hash the password
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
            try {
                // Create new user with the OTP sent from the frontend
                const user = yield User_1.default.create({
                    user_id,
                    email,
                    username,
                    password: hashedPassword,
                    verified: false,
                    verificationToken: otp, // Save OTP in the database
                });
                baseResponseInst.setValue(201, "User registered, OTP sent", user);
                return res.status(201).json(baseResponseInst.buildResponse());
            }
            catch (error) {
                console.error("User creation error:", error);
                baseResponseInst.setValue(500, "Internal Server Error", null);
                return res.status(500).json(baseResponseInst.buildResponse());
            }
        });
    }
    // Login user
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { email, password } = req.body;
            // Validate inputs
            if (!(0, auth_util_1.isValidEmail)(email, 1, 100) || !(0, auth_util_1.isValidString)(password, 1, 100)) {
                baseResponseInst.setValue(400, "invalid input", null);
                const responseData = baseResponseInst.buildResponse();
                return res.status(400).json(responseData);
            }
            // Check if user exists
            const user = yield User_1.default.findOne({ email });
            if (!user) {
                baseResponseInst.setValue(400, "user not found", null);
                const responseData = baseResponseInst.buildResponse();
                return res.status(400).json(responseData);
            }
            // Check if the user is verified
            if (!user.verified) {
                baseResponseInst.setValue(400, "Email not verified. Please check your inbox.", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            // Compare password
            const isPasswordMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isPasswordMatch) {
                baseResponseInst.setValue(400, "password is incorrect", null);
                const responseData = baseResponseInst.buildResponse();
                return res.status(400).json(responseData);
            }
            baseResponseInst.setValue(200, "login success!!!", user);
            const responseData = baseResponseInst.buildResponse();
            return res.status(200).json(responseData);
        });
    }
    // Verify OTP
    verifyOTP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const baseResponseInst = new BaseResponse();
            const { email, otp } = req.body;
            console.log(req.body);
            if (!email || !otp) {
                baseResponseInst.setValue(400, "Email and OTP are required", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            // Find user by email and OTP
            const user = yield User_1.default.findOne({ email: email.toLowerCase(), verificationToken: otp });
            if (!user) {
                baseResponseInst.setValue(400, "Invalid OTP", null);
                return res.status(400).json(baseResponseInst.buildResponse());
            }
            // Mark the user as verified and clear the OTP
            user.verified = true;
            user.verificationToken = ""; // Clear OTP after verification
            yield user.save();
            baseResponseInst.setValue(200, "Email verified successfully", user);
            return res.status(200).json(baseResponseInst.buildResponse());
        });
    }
}
exports.Auth = Auth;
