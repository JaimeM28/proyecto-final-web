import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/authService";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(email, password);

      localStorage.setItem("accessToken", response.accessToken);

      if (response.refreshToken) {
        localStorage.setItem("refreshToken", response.refreshToken);
      }

      localStorage.setItem("user", JSON.stringify(response.user));

      if (!response.user.isEmailVerified) {
        navigate("/verify-email");
        return;
      }

      if (!response.user.isOnboardingCompleted) {
        navigate("/onboarding");
        return;
      }

      navigate("/dashboard");
    } catch (error) {
      alert("Error al iniciar sesión");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0f172a",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          background: "#1e293b",
          borderRadius: "12px",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
          Bienvenido de nuevo
        </h1>

        <p
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#cbd5e1",
          }}
        >
          Ingresa tus credenciales
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <label>Correo electrónico</label>
            <input
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              background: "#2563eb",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        <p style={{ marginTop: "16px", textAlign: "center" }}>
          ¿No tienes cuenta? <Link to="/signup">Regístrate</Link>
        </p>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;