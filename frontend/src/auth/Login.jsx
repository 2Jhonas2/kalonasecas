import { useState, useRef, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export function Login({ onClose, setRegisterClick, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Contexto (si existe). En entornos sin provider, puede ser undefined.
  const auth = useAuth?.();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailNorm = (email || "").trim().toLowerCase();
    if (!emailNorm || !password) {
      setLoginError("Invalid credentials. Please try again.");
      return;
    }

    setLoading(true);
    setLoginError("");

    try {
      // 1) Intento vía AuthContext (si existe)
      let token;
      if (auth?.login) {
        const result = await auth.login(emailNorm, password);
        token = typeof result === "string" ? result : result?.token;
      } else {
        // 2) Fallback directo al backend
        // - Usa proxy /api si existe
        // - Si tienes VITE_API_URL, lo respeta
        const url = "/api/auth/login"; // Siempre usar /api para que Vite proxy lo maneje

        const res = await axios.post(url, { email: emailNorm, password });
        token = res.data?.token;
      }

      if (!token) throw new Error("Invalid credentials");
      localStorage.setItem("token", token);

      // Compatibilidad con consumidores externos
      if (typeof setUser === "function") setUser([emailNorm]);

      onClose?.();
      navigate("/"); // Redirigir a Home
    } catch (error) {
      console.error("Error to login:", error);
      const status = error?.response?.status;
      const backendMsg = (error?.response?.data?.message || "").toString();

      if (status === 401) {
        // Nuestro backend usa 401 tanto para credenciales inválidas como para no verificado.
        const notVerified =
          backendMsg.toLowerCase().includes("verifica") ||
          backendMsg.toLowerCase().includes("verificado");
        setLoginError(
          notVerified
            ? "Your account is not verified yet."
            : "Email or password incorrect."
        );
      } else if (status === 403) {
        setLoginError("Your account is not verified yet.");
      } else {
        setLoginError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cerrar al click fuera (salvo iconos que abren el modal)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutside =
        modalRef.current &&
        !modalRef.current.contains(e.target) &&
        !e.target.closest("#userIcon") && // header (desktop)
        !e.target.closest("#mobileUserIcon"); // navbar (móvil)
      if (clickedOutside) onClose?.();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Cerrar con ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Autocierre de mensajes de error
  useEffect(() => {
    if (loginError) {
      const t = setTimeout(() => setLoginError(""), 3000);
      return () => clearTimeout(t);
    }
  }, [loginError]);

  return (
    <section className="login" ref={modalRef} role="dialog" aria-modal="true">
      <h1>Iniciar Sesión</h1>
      <hr />
      {loginError && <div className="errorMessage">{loginError}</div>}

      <form className="formLogin" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="labelLogin">
            Email:
          </label>
          <div>
            <input
              type="email"
              id="email"
              className="inputLogin"
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setLoginError("");
              }}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="labelLogin">
            Password:
          </label>
          <div>
            <input
              type="password"
              id="password"
              className="inputLogin"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setLoginError("");
              }}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <a
            href="#"
            className="aLogin"
            onClick={(e) => {
              e.preventDefault();
              setShowForgotPasswordModal(true);
            }}
          >
            Did you forget your password?
          </a>
        </div>

        <div>
          <button type="submit" className="buttonLogin" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
          <div>
            <button
              type="button"
              className="buttonRegisterForm"
              onClick={setRegisterClick}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </form>

      {showForgotPasswordModal && (
        <ForgotPasswordForm
          defaultEmail={(email || "").trim().toLowerCase()}
          onClose={() => setShowForgotPasswordModal(false)}
        />
      )}
    </section>
  );
}
