import logo from "../assets/logo ipb.png";
import suhuIcon from "../assets/logo suhu.png";
import kelembapanIcon from "../assets/logo kelembapan.png";
import irigatorIcon from "../assets/logo irigator.png";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleShowData = () => {
    if (!date) {
      alert("Pilih tanggal dulu!");
      return;
    }

    // kirim ke List
    navigate("/list", {
      state: { date },
    });
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
        }}
      >
        Sistem <br />
        Kontrol <br />
        Kelembapan
      </div>

      {/* CARD: STATUS */}
      <div
        style={{
          position: "absolute",
          top: "237px",
          left: "24px",
          width: "344px",
          height: "170px",
          background: "white",
          borderRadius: "10px",
          padding: "15px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            lineHeight: "2",
          }}
        >
          STATUS REAL-TIME
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              width: "90px",
              height: "95px",
              border: "1px solid #e6e6e6",
              borderRadius: "10px",
              textAlign: "center",
              paddingTop: "8px",
            }}
          >
            <img src={suhuIcon} style={{ width: "50px" }} />
            <div style={{ fontWeight: "bold", marginTop: "6px" }}>
              28.2°C
            </div>
            <div style={{ fontSize: "12px", lineHeight: "1.5" }}>Suhu</div>
          </div>

          <div
            style={{
              width: "90px",
              height: "95px",
              border: "1px solid #e6e6e6",
              borderRadius: "10px",
              textAlign: "center",
              paddingTop: "8px",
            }}
          >
            <img src={kelembapanIcon} style={{ width: "30px" }} />
            <div style={{ fontWeight: "bold", marginTop: "5px" }}>
              85%
            </div>
            <div style={{ fontSize: "12px", lineHeight: "1.5" }}>
              Kelembapan
            </div>
          </div>

          <div
            style={{
              width: "90px",
              height: "95px",
              border: "1px solid #e6e6e6",
              borderRadius: "10px",
              textAlign: "center",
              paddingTop: "8px",
            }}
          >
            <img src={irigatorIcon} style={{ width: "35px" }} />
            <div style={{ fontWeight: "bold", marginTop: "0px" }}>
              OFF
            </div>
            <div
              style={{
                fontSize: "12px",
                marginTop: "0px",
                lineHeight: "1.5",
              }}
            >
              Irigator
            </div>
          </div>
        </div>
      </div>

      {/* CARD: FILTER */}
      <div
        style={{
          position: "absolute",
          top: "425px",
          left: "24px",
          width: "344px",
          height: "190px",
          background: "white",
          borderRadius: "10px",
          padding: "15px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            lineHeight: "1.5",
          }}
        >
          FILTER DATA
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Tanggal
        </div>

        <input
          type="date"
          value={date || ""}
          onChange={(e) => setDate(e.target.value)}
          style={{
            width: "100%",
            height: "35px",
            marginTop: "8px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            paddingLeft: "5px",
          }}
        />

        <button
          onClick={handleShowData}
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
          Tampilkan Data
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          textAlign: "left",
          bottom: "20px",
          left: "12px",
          lineHeight: "1.5",
          fontSize: "12px",
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

export default Home;