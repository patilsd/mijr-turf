const knex = require('../db/knex');// Database connection
const jwt = require("jsonwebtoken");
require("dotenv").config();

class User {
    // Insert a new user into the database
    static async createUser(first_name, last_name, team_name, team_zone, team_id, mobile_no, otp) {
        return knex("user_registration").insert({
            first_name,
            last_name,
            team_name,
            team_zone,
            team_id,
            mobile_no,
            otp
        });
    }

    // Find a user by mobile number
    static async findUserByMobile(mobile_no) {
        return knex("user_registration").where({ mobile_no }).first();
    }

    // Update OTP for a user
    static async updateOTP(mobile_no, otp) {
        return knex("user_registration").where({ mobile_no }).update({ otp });
    }

    // Generate Access Token
    static generateAccessToken(user) {
        return jwt.sign(
            { userId: user.user_id, mobile_no: user.mobile_no, team_name: user.team_name },
            process.env.ACCESS_SECRET_KEY,
            { expiresIn: process.env.ACCESS_SECRET_KEY_EXPIRESIN }
        );
    }

    // Generate Refresh Token
    static generateRefreshToken(user) {
        return jwt.sign(
            { userId: user.user_id, mobile_no: user.mobile_no, team_name: user.team_name },
            process.env.REFRESH_SECRET_KEY,
            { expiresIn: process.env.REFRESH_SECRET_KEY_EXPIRESIN }
        );
    }
}

module.exports = User;