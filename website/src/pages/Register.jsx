import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

import logo from "../assets/logo ipb.png";

const Register = () => {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password || !confirmPassword) {
      alert("Semua field harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan ulang password tidak cocok.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      alert("Email tidak valid.");
      return;
    }

    setLoading(true);

    const { data: signUpData, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: {
          username: username.trim(),
          full_name: username.trim(), // Menambahkan full_name agar tampil di "Display name" dashboard Supabase
        },
      },
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    // Insert the username/email pair into a public profile table (e.g., public.users)
    const { error: insertError } = await supabase.from("users").insert({
      user_id: signUpData?.user?.id, // Mengambil ID dari auth.users
      username: username.trim(),
      email: email.trim(),
    });

    if (insertError) {
      console.error("Failed to insert user profile:", insertError);
      alert("Pendaftaran Auth berhasil, tapi gagal menyimpan data ke tabel users: " + insertError.message);
    } else {
      alert("Registrasi berhasil. Silakan periksa email Anda untuk konfirmasi dan kemudian masuk.");
    }

    nav("/login");
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
        onClick={() => nav(-1)}
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
          minHeight: "320px",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "bold" }}>
          REGISTRASI
        </div>

        <input
          type="text"
          placeholder="Username"
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

        <input
          type="password"
          placeholder="Ulang Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          onClick={handleRegister}
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
          disabled={loading}
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

        <button
          onClick={() => nav("/login")}
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
          Sudah punya akun? Login
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

export default Register;
