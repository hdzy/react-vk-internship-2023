import {registerValidation} from "../validations/auth.js";
import {validationResult} from "express-validator";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: passHash,
            avatarUrl: req.body.avatarUrl,
        })

        const user = await doc.save();


        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret',
            {
                expiresIn: '30d'
            });

        const {passwordHash, ...userDate} = user._doc;

        res.json({...userDate, token});
    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при регистрации');
    }
};
export const login = async (req, res) => async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});

        if (!user) {
            return res.status(404).json({errors: [{msg: 'Ошибка авторизации'}]});
        }

        const isValid = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValid) {
            return res.status(404).json({errors: [{msg: 'Ошибка авторизации'}]});
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret',
            {
                expiresIn: '30d'
            });

        const {passwordHash, ...userDate} = user._doc;

        res.json({...userDate, token});

    } catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при авторизации');
    }
};
export const getMe = async (req , res) => {
    try {
        const user = await UserModel.findById(req.userID);

        if (!user) {
            return res.status(404).json({errors: [{msg: 'No user found'}]});
        }

        const {passwordHash,...userDate} = user._doc;
        res.json({...userDate});
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Ошибка при авторизации');
    }
};