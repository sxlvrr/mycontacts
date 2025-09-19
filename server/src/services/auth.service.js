const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('./token.service');

/**
 * Inscription d'un nouvel utilisateur
 */
const register = async (userData) => {
  const { email, password } = userData;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Cet email est déjà utilisé');
  }

  // Créer l'utilisateur
  const user = new User({ email, password });
  await user.save();

  // Générer le token
  const token = generateToken({ userId: user._id });

  return {
    token,
    user: {
      id: user._id,
      email: user.email
    }
  };
};

/**
 * Connexion d'un utilisateur
 */
const login = async (credentials) => {
  const { email, password } = credentials;

  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Vérifier le mot de passe
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Email ou mot de passe incorrect');
  }

  // Générer le token
  const token = generateToken({ userId: user._id });

  return {
    token,
    user: {
      id: user._id,
      email: user.email
    }
  };
};

module.exports = {
  register,
  login,
};