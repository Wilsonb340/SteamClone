document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password })  // ojo que en el backend usas email y contraseña (según tu authRoutes)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || data.msg);

      alert(data.mensaje || "Login exitoso");
      window.location.href = "home.html";
    } catch (err) {
      alert(err.message);
    }
  });
});
