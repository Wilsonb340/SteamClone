// routes/authRoutes.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();

// Registro
router.post('/registro', async (req, res) => {
  const { username, numero, correo, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);
  try {
    const nuevoUsuario = new Usuario({ username, numero, correo, password: hashedPass });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: "Usuario creado" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "Usuario o correo ya registrado" });
    }
    res.status(500).json({ error: "Error del servidor" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  const usuario = await Usuario.findOne({ correo });
  if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) return res.status(400).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
  res.json({ mensaje: "Login exitoso", token, usuario });
});

export default router;
