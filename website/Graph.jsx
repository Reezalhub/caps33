import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo ipb.png";

const Graph = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  const selectedDate = location.state?.date || "2026-05-01";

  // FILTER TANGGAL
  const start = `${selectedDate}%2000:00:00`;
  const end = `${selectedDate}%2023:59:59`;

  return (
    <div
      style={{
        width: "393px",
        minHeight: "844px",
        position: "relative",
        margin: "auto",
        backgroundColor: "#ebedf2",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "393px",
          height: "297px",
          backgroundColor: "#002a79",
        }}
      />

      {/* Logo */}
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

      {/* BACK BUTTON */}
      <div
      onClick={() => navigate(-1)}
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

      {/* TITIK 3 */}
      <div
        onClick={() => setShowMenu(!showMenu)}
        style={{
          position: "absolute",
          top: "15px",
          right: "20px",
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
          cursor: "pointer",
          zIndex: 20,
        }}
      >
        ⋮
      </div>

      {/* MENU */}
      {showMenu && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "20px",
            width: "70px",
            height: "75px",
            background: "white",
            border: "1px solid #757575",
            borderRadius: "8px",
            padding: "10px",
            zIndex: 100,
          }}
        >
          {/* LIST */}
          <div
            onClick={() =>
              navigate("/list", {
                state: { date: selectedDate },
              })
            }
            style={{
              textAlign: "center",
              cursor: "pointer",
              padding: "5px",
              fontSize: "12px",
              fontWeight: "300",
              width: "60px",
              marginBottom: "10px",
              color: "#484545",
            }}
          >
            List
          </div>

          {/* GRAPH ACTIVE */}
          <div
            style={{
              background: "#0940a4",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              padding: "5px",
              fontSize: "12px",
              fontWeight: "300",
              width: "60px",
            }}
          >
            Graph
          </div>
        </div>
      )}

      {/* CARD */}
      <div
        style={{
          position: "relative",
          top: "105px",
          left: "18px",
          width: "345px",
          background: "white",
          borderRadius: "15px",
          paddingBottom: "30px",
          overflow: "hidden",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            paddingTop: "20px",
            textAlign: "center",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#484545",
          }}
        >
          DATA MONITORING ({selectedDate})
        </div>

        {/* GRAPH SUHU */}
        <div
          style={{
            width: "315px",
            height: "260px",
            margin: "30px auto 20px auto",
            borderRadius: "15px",
            border: "2px solid #d9d9d9",
            overflow: "hidden",
            background: "white",
          }}
        >
          <iframe
            title="temperature"
            width="100%"
            height="100%"
            style={{
              border: "none",
            }}
            src={`https://thingspeak.mathworks.com/channels/3279100/charts/1?bgcolor=%23ffffff&color=%23d62020&type=line&width=315&height=260&timezone=Asia%2FJakarta&start=${selectedDate}%2000:00:00&end=${selectedDate}%2023:59:59`}
          />
        </div>

        {/* GRAPH KELEMBAPAN */}
        <div
          style={{
            width: "315px",
            height: "260px",
            margin: "20px auto",
            borderRadius: "15px",
            border: "2px solid #d9d9d9",
            overflow: "hidden",
            background: "white",
          }}
        >
          <iframe
            title="humidity"
            width="100%"
            height="100%"
            style={{
              border: "none",
            }}
            src={`https://thingspeak.mathworks.com/channels/3279100/charts/2?bgcolor=%23ffffff&color=%2300aaff&type=line&width=315&height=260&timezone=Asia%2FJakarta&start=${selectedDate}%2000:00:00&end=${selectedDate}%2023:59:59`}
          />
        </div>

        {/* GRAPH IRIGATOR */}
        <div
          style={{
            width: "315px",
            height: "260px",
            margin: "20px auto",
            borderRadius: "15px",
            border: "2px solid #d9d9d9",
            overflow: "hidden",
            background: "white",
          }}
        >
          <iframe
            title="mist"
            width="100%"
            height="100%"
            style={{
              border: "none",
            }}
            src={`https://thingspeak.mathworks.com/channels/3279100/charts/3?bgcolor=%23ffffff&color=%230940a4&type=line&width=315&height=260&timezone=Asia%2FJakarta&start=${selectedDate}%2000:00:00&end=${selectedDate}%2023:59:59`}
          />
        </div>
      </div>
    </div>
  );
};

export default Graph;