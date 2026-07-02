import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import logo from "../assets/logo ipb.png";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      alert("Username dan password harus diisi!");
      return;
    }

    navigate("/home", { replace: true });
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/caps33/`,
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
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#ebedf2",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "297px",
          background: "#002a79",
        }}
      />

      <img
        src={logo}
        alt="logo"
        style={{
          position: "absolute",
          top: "20px",
          left: "50px",
          width: "150px",
        }}
      />

      <div
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "25px",
          left: "20px",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 10,
          fontWeight: "bold",
        }}
      >
        ←
      </div>

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
          ADMIN LOGIN
        </div>

        <input
          type="text"
          placeholder="Username/Email (email direkomendasikan)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "15px",
            borderRadius: "10px",
            background: "#1e4fa3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Login Sebagai Admin
        </button>

        <button
          onClick={handleGoogleSignIn}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "10px",
            borderRadius: "10px",
            background: "white",
            color: "#1e4fa3",
            border: "1px solid #1e4fa3",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {loading ? "Loading..." : "Masuk dengan Google"}
        </button>
      </div>

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

export default AdminLogin;
