"use strict";

const UserStorage = require("../../models/UserStorage");
const User = require("../../models/User");
const path = require("path");



const output = {
    home: (req,res) => {
        // res.sendFile(path.join(__dirname, "index.ejs"));
        res.render("home/index");
    },

    login: (req, res) => {
        res.render("home/login");
    },
    register: (req, res) => {
        res.render("home/register");
    },
    upload: (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: '파일이 업로드되지 않았습니다.' 
                });
            }

            res.json({
                success: true,
                message: '파일 업로드 성공',
                filename: req.file.filename
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: '서버 오류가 발생했습니다.' 
            });
        }
    },
};



const process = {
    login: async (req,res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req,res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
    upload: (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ 
                    success: false, 
                    message: '파일이 업로드되지 않았습니다.' 
                });
            }

            res.json({
                success: true,
                message: '파일 업로드 성공',
                filename: req.file.filename
            });
        } catch (error) {
            res.status(500).json({ 
                success: false, 
                message: '서버 오류가 발생했습니다.' 
            });
        }
    },  
};

module.exports = {
    output,
    process,
};

