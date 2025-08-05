import { Request, Response } from "express";
import { isValidEmail, isValidString } from "../utils/auth.util";
import User from "../model/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

interface RegisterRequestBody {
    email: string;
    username: string;
    password: string;
    user_id: string;
    otp: string;  // Add OTP to request body
}

interface LoginRequestBody {
    email: string;
    password: string;
}

type RegisterRequest = Request<{}, {}, RegisterRequestBody>;
type LoginRequest = Request<{}, {}, LoginRequestBody>;

// Base response class to standardize API responses
class BaseResponse {
    code: number;
    description: string;
    data: any;

    constructor(code: number = 200, description: string = "", data: any = null) {
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

    setValue(code: number, description: string, data: any) {
        this.code = code;
        this.description = description;
        this.data = data;
    }
}

// Auth Controller class with methods for registration, login, and OTP verification
export class Auth {
    // Register user
    public async register(req: RegisterRequest, res: Response) {
        const baseResponseInst = new BaseResponse();
        const { email, username, password, user_id, otp } = req.body;

        if (!isValidEmail(email, 1, 100) || !isValidString(username, 1, 100) || !isValidString(password, 1, 100)) {
            baseResponseInst.setValue(400, "Invalid input", null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        // Check if email already exists
        const isExistingEmail = await User.findOne({ email });
        if (isExistingEmail) {
            baseResponseInst.setValue(400, "User already exists", null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            // Create new user with the OTP sent from the frontend
            const user = await User.create({
                user_id,
                email,
                username,
                password: hashedPassword,
                verified: false,
                verificationToken: otp,  // Save OTP in the database
            });

            baseResponseInst.setValue(201, "User registered, OTP sent", user);
            return res.status(201).json(baseResponseInst.buildResponse());
        } catch (error) {
            console.error("User creation error:", error);
            baseResponseInst.setValue(500, "Internal Server Error", null);
            return res.status(500).json(baseResponseInst.buildResponse());
        }
    }

    // Login user
    public async login(req: LoginRequest, res: Response) {
        const baseResponseInst = new BaseResponse();
        const { email, password } = req.body;
        
        // Validate inputs
        if (!isValidEmail(email, 1, 100) || !isValidString(password, 1, 100)) {
            baseResponseInst.setValue(400, "invalid input", null);
            const responseData = baseResponseInst.buildResponse();
            return res.status(400).json(responseData);
        }

        // Check if user exists
        const user = await User.findOne({ email });
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
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            baseResponseInst.setValue(400, "password is incorrect", null);
            const responseData = baseResponseInst.buildResponse();
            return res.status(400).json(responseData);
        }

        baseResponseInst.setValue(200, "login success!!!", user);
        const responseData = baseResponseInst.buildResponse();
        return res.status(200).json(responseData);
    }

    // Verify OTP
    public async verifyOTP(req: Request, res: Response) {
        const baseResponseInst = new BaseResponse();
        const { email, otp } = req.body;
        console.log(req.body)
        if (!email || !otp) {
            baseResponseInst.setValue(400, "Email and OTP are required", null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        // Find user by email and OTP
        const user = await User.findOne({ email: email.toLowerCase(), verificationToken: otp });

        if (!user) {
            baseResponseInst.setValue(400, "Invalid OTP", null);
            return res.status(400).json(baseResponseInst.buildResponse());
        }

        // Mark the user as verified and clear the OTP
        user.verified = true;
        user.verificationToken = "";  // Clear OTP after verification
        await user.save();

        baseResponseInst.setValue(200, "Email verified successfully", user);
        return res.status(200).json(baseResponseInst.buildResponse());
    }
}
