import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) {
      alert("Please enter Username and Password");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #2563eb 100%)",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "430px",
          background: "rgba(255,255,255,0.18)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "20px",
          padding: "45px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          border: "1px solid rgba(255,255,255,0.2)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#ffffff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "38px",
          }}
        >
          🏢
        </div>

        <h1
          style={{
            color: "#ffffff",
            marginBottom: "8px",
            fontSize: "32px",
          }}
        >
          Mini ERP CRM
        </h1>

        <p
          style={{
            color: "#e2e8f0",
            marginBottom: "30px",
          }}
        >
          Welcome Back
        </p>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "18px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
            background: "#ffffff",
            color: "#000000",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginBottom: "25px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            outline: "none",
            fontSize: "15px",
            background: "#ffffff",
            color: "#000000",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#ffffff",
            fontSize: "17px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "25px",
            color: "#f8fafc",
            fontSize: "13px",
          }}
        >
          © 2026 Mini ERP CRM | Inventory & Customer Management System
        </p>
      </div>
    </div>
  );
}