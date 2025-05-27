# 🎮 Steam Clone - Registro e Inicio de Sesión de Usuarios

Este proyecto es una aplicación web básica tipo *Steam* que permite a los usuarios **registrarse**, **iniciar sesión** y gestionar su perfil. Está construido utilizando tecnologías web modernas como **Node.js**, **Express**, **MongoDB**, **HTML**, **CSS** y **JavaScript**.

---

## 📌 Características

- Registro de nuevos usuarios con validación.
- Inicio de sesión con autenticación mediante JWT.
- Encriptación de contraseñas usando bcryptjs.
- Almacenamiento de datos en MongoDB.
- Interfaz web amigable y moderna para usuarios.
- Backend desarrollado como una API REST.

---

## ⚙️ Tecnologías Usadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express.js
- **Base de datos:** MongoDB + Mongoose
- **Autenticación:** Bcryptjs, JSON Web Tokens (JWT)

---

## 🛠️ Instalación del Proyecto

1. **Clonar el repositorio:**

```bash
git clone https://github.com/Wilsonb340/SteamClone.git
cd steamClone
```

2. **Instalar dependencias del servidor:**

```bash
npm install
```

3. **Crear archivo `.env`:**

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/Steam
JWT_SECRET=secreto
```

4. **Iniciar el servidor:**

```bash
npm run dev
```

5. **Abrir la aplicación:**

Ir a `http://localhost:3000/Registro.html` para comenzar.

---

## 📁 Estructura del Proyecto

```
steam-clone/
├── models/
│   └── Usuario.js
├── routes/
│   └── authRoutes.js
├── public/
│   ├── Styles/
│   │   └── Registro.css
│   ├── Scripts/
│   │   └── Registro.js
│   ├── Imagenes/
│   │   └── Logo.png
│   ├── Registro.html
│   └── Login.html
├── .env
├── server.js
└── README.md
```

---

## 🌐 Rutas API REST

| Método | Ruta                      | Descripción                  |
|--------|---------------------------|------------------------------|
| POST   | /api/auth/registro        | Registrar nuevo usuario      |
| POST   | /api/auth/login           | Iniciar sesión               |

---

## 🧪 Prueba en MongoDB

Puedes ver los registros en MongoDB ejecutando:

```bash
mongosh
use Steam
db.usuarios.find().pretty()
```

---

## 🧑 Autor

Desarrollado por: **Wilson Barrera, Gerson Chamorro, Joseph Vanegas**  
Fecha: Mayo 2025  
Licencia: MIT

---
