import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  numero: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model("Usuario", usuarioSchema);

