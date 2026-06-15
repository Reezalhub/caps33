import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import logo from "../assets/logo ipb.png";

const Login = () => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan password harus diisi!");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    nav("/home");
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}${import.meta.env.VITE_BASE_URL}home`,
      },
    });
    setLoading(false);

    if (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        width: "393px",
        height: "844px",
        position: "relative",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Background abu */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#ebedf2",
        }}
      />

      {/* Header biru */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "297px",
          background: "#002a79",
        }}
      />

      {/* Logo */}
      <img
        src={logo}
        alt="logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "150px",
        }}
      />

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: "120px",
          lineHeight: "1.1",
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "33px",
        }}
      >
        Sistem <br />
        Kontrol <br />
        Kelembapan
      </div>

      {/* Card */}
      <div
        style={{
          position: "absolute",
          top: "237px",
          left: "24px",
          width: "344px",
          height: "260px",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          LOGIN
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "12px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            paddingLeft: "10px",
            boxSizing: "border-box",
          }}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "12px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            paddingLeft: "10px",
            boxSizing: "border-box",
          }}
        />

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "15px",
            borderRadius: "10px",
            background: "#1e4fa3",
            color: "white",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "12px",
            borderRadius: "10px",
            background: "white",
            color: "#333",
            border: "1px solid #ccc",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Sign in with Google"}
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          textAlign: "left",
          bottom: "20px",
          left: "12px",
          fontSize: "12px",
          lineHeight: "1.5",
        }}
      >
        Program Studi: Ilmu Komputer <br />
        Mata Kuliah: Capstone <br />
        Nama Kelompok: Capstone-33 <br />
        Dosen Pembimbing: Dr. Ir. Sri Wahjuni, M. T.
      </div>
    </div>
  );
};

export default Login;