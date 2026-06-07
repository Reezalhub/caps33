import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/logo ipb.png";
import alertIcon from "../assets/logo alert.png";
import normalIcon from "../assets/logo normal.png";

const List = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDate = location.state?.date || "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.thingspeak.com/channels/3279100/feeds.json?results=500"
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.feeds) return;

        const filtered = data.feeds.filter((item) => {
          const feedDate = new Date(item.created_at);
          
          const feedYear = feedDate.getFullYear();
          const feedMonth = String(feedDate.getMonth() + 1).padStart(2, "0");
          const feedDay = String(feedDate.getDate()).padStart(2, "0");
          
          const formattedFeedDate = `${feedYear}-${feedMonth}-${feedDay}`;
          
          return formattedFeedDate === selectedDate;
        });

        setDataList(filtered);
      })
      .catch((err) => console.log(err));
  }, [selectedDate]);

  return (
    <div
      style={{
        width: "393px",
        height: "844px",
        position: "relative",
        overflowY: "auto",
        overflowX: "hidden",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        background: "#ebedf2",
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
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "absolute",
          top: "10px",
          right: "20px",
          color: "white",
          fontSize: "32px",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        ⋮
      </div>

      {/* MENU */}
      {menuOpen && (
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
          <div
            style={{
              background: "#0940a4",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              marginBottom: "10px",
              padding: "5px",
              fontSize: "12px",
              fontWeight: "300",
              width: "60px",
            }}
          >
            List
          </div>

          <div
            onClick={() =>
              navigate("/graph", {
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
            }}
          >
            Graph
          </div>
        </div>
      )}

      {/* CARD */}
      <div
        style={{
          position: "absolute",
          top: "105px",
          left: "18px",
          width: "345px",
          minHeight: "714px",
          background: "white",
          borderRadius: "10px",
          paddingBottom: "30px",
        }}
      >
        <div
          style={{
            paddingTop: "22px",
            paddingLeft: "28px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#484545",
          }}
        >
          DATA MONITORING ({selectedDate})
        </div>

        {dataList.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              marginTop: "60px",
              color: "#777",
              fontSize: "14px",
            }}
          >
            Tidak ada data pada tanggal ini
          </div>
        ) : (
          dataList.map((item, index) => {
            const humidity = Number(item.field2 || 0);

            const isAlert = humidity < 85;

            const time = new Date(item.created_at).toLocaleTimeString(
              "id-ID",
              {
                hour: "2-digit",
                minute: "2-digit",
              }
            );

            return (
              <div
                key={index}
                style={{
                  width: "302px",
                  minHeight: "91px",
                  margin: "18px auto",
                  borderRadius: "10px",
                  background: isAlert ? "#fbe4e4" : "#f7fff8",
                  border: "1.5px solid #e6e6e6",
                  position: "relative",
                  padding: "15px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={isAlert ? alertIcon : normalIcon}
                  alt=""
                  style={{
                    width: "25px",
                    height: "25px",
                    position: "absolute",
                    left: "15px",
                    top: "15px",
                  }}
                />

                <div
                  style={{
                    marginLeft: "50px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  {isAlert ? "Kelembapan Rendah" : "Sistem Normal"}
                </div>

                <div
                  style={{
                    marginLeft: "50px",
                    marginTop: "8px",
                    fontSize: "10px",
                    textAlign: "left",
                  }}
                >
                  {isAlert
                    ? `Kelembapan turun ke ${humidity}%`
                    : "Kondisi kembali normal"}
                </div>

                <div
                  style={{
                    marginLeft: "50px",
                    marginTop: "10px",
                    fontSize: "10px",
                    textAlign: "left",
                  }}
                >
                  {selectedDate} {time}
                </div>

                <div
                  style={{
                    position: "absolute",
                    right: "15px",
                    bottom: "15px",
                    fontSize: "9px",
                    fontWeight: "bold",
                    color: isAlert ? "#0b940b" : "#1d4fa0",
                  }}
                >
                  {isAlert ? "Irigator ON" : "Irigator OFF"}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default List;