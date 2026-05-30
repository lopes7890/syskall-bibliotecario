const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;

    const email = document.getElementById("email").value;
    const password_user = document.getElementById("password").value;

    btn.innerHTML =
        '<span class="material-symbols-outlined animate-spin">progress_activity</span> Entrando...';
    btn.disabled = true;

    try {
        const response = await fetch("http://localhost:3000/login/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password_user
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);

            // Redireciona somente após login bem-sucedido
            window.location.href = "dashbord.html";
        } else {
            document.getElementById("message").textContent =
                data.message || "Email ou senha inválidos.";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("message").textContent =
            "Erro ao conectar com o servidor.";
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
});