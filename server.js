// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar rutas
import authRoutes from './routes/authRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Servir archivos estáticos desde carpetas específicas
app.use('/index', express.static(path.join(__dirname, 'Index')));
app.use('/styles', express.static(path.join(__dirname, 'Styles')));
app.use('/scripts', express.static(path.join(__dirname, 'Scripts')));
app.use('/imagenes', express.static(path.join(__dirname, 'Imagenes')));

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/Steam')
  .then(() => console.log("🟢 Conectado a MongoDB"))
  .catch(err => console.error("🔴 Error al conectar a MongoDB:", err));

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Index', 'Login.html'));
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
