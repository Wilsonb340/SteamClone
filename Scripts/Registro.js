document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();
    const numero = document.getElementById("numero").value.trim();


    try {
      const res = await fetch("http://localhost:3000/api/auth/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, numero, correo, password })

      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error desconocido");

      alert("Usuario registrado con éxito");
      window.location.href = "Login.html"; // redirigir a login
    } catch (err) {
      alert("Error: " + err.message);
    }
  });
});
