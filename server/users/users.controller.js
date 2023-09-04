const argon = require('argon2');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { User } = require('./users.model');
const genAuthToken = require('../utils/genAuthToken');


const register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(6).max(200).required(),
    });

    const {error} = schema.validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
    const { name, email, password } = req.body;

    let user = await User.findOne({email});

    if(user) return res.status(409).send("User already exist..");

    const salt = process.env.PASSWORD_SALT;
    const hashedPassword = await argon.hash(password,salt);
    user = new User({
        name,
        email,
        password: hashedPassword,
    });

    
    user = await user.save();

    const token = genAuthToken(user);

    res.status(201).send(token);
}

const login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  let user = await User.findOne({ email });

  if (!user) return res.status(404).send("invalid credentials");

  const isValid = await argon.verify(user.password, password);

  if (!isValid) return res.status(400).send("invalid credentials");

  const token = genAuthToken(user);

  return res.status(200).send(token);
};


module.exports = {
    register,
    login
}