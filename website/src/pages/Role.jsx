import { useNavigate } from "react-router-dom";

import logo from "../assets/logo ipb.png";

const Role = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "393px",
        height: "844px",
        position: "relative",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        background: "#ebedf2",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "#ebedf2",
        }}
      />

      {/* Header */}
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
          width: "100%",
          textAlign: "center",
          color: "white",
          fontSize: "33px",
          lineHeight: "1.1",
          fontWeight: "normal",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Sistem <br />
        Kontrol <br />
        Kelembapan
      </div>

      {/* CARD */}
      <div
        style={{
          position: "absolute",
          top: "237px",
          left: "24px",
          width: "344px",
          height: "170px",
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
            color: "#484545",
            marginBottom: "20px",
          }}
        >
          PILIH ROLE
        </div>

        {/* BUTTON ADMIN */}
        <button
          onClick={() => navigate("/admin-login")}
          style={{
            width: "100%",
            height: "35px",
            borderRadius: "10px",
            background: "#1e4fa3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            marginBottom: "15px",
          }}
        >
          Admin
        </button>

        {/* BUTTON USER */}
        <button
          onClick={() => navigate("/login")}
          style={{
            width: "100%",
            height: "35px",
            borderRadius: "10px",
            background: "#1e4fa3",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
          }}
        >
          User
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
          fontFamily: "Arial, sans-serif",
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

export default Role;