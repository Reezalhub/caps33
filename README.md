# CAPSTONE 33: Automatic Mist Sprayer

Proyek Tugas Akhir Mata Kuliah KOM1402 Capstone 1, Program Studi Ilmu Komputer, Sekolah Sains Data, Matematika, dan Informatika, Institut Pertanian Bogor (IPB).

Dosen Mentor Proyek: **Dr. Ir. Sri Wahjuni, M.T.**

Anggota:

- **🛠️ Hardware dan IoT 🔋**: Muhammad Syafiq Romadhon G6401231079
- **💻 UI/UX dan Frontend 🖼️**: Nabila Sayyidatul Aflah G6401231130
- **🌐 Backend dan DevOps 📨**: Rizal Habibi G6401231152

---

## 📋 Deskripsi Proyek

**Automatic Mist Sprayer** adalah sistem kontrol dan pemantauan suhu serta kelembapan terintegrasi yang dirancang untuk lingkungan pertanian/greenhouse. Sistem ini terdiri dari dua komponen utama:

1. **Modul Elektronika** (`/module`) — Rangkaian perangkat keras berbasis mikrokontroler ESP32 yang membaca data sensor dan mengontrol actuator (mist sprayer).
2. **Website Dashboard** (`/website`) — Antarmuka web berbasis React untuk memantau data real-time dan historis secara visual.

---

## 🗂️ Struktur Direktori

```
caps33/
├── module/
│   ├── [Design] systemOverview.png        # Gambar overview sistem
│   ├── [Program] main.ino                # Program Arduino/ESP32
│   ├── [RAB] Aktual_RAB Capstone 33.pdf  # Rincian anggaran
│   ├── [RAB] HPP_RAB Capstone 33.pdf     # HPP proyek
│   ├── [Wokwi Project] simulation.zip   # Proyek simulasi Wokwi
│   └── case/                              # Desain case/perangkat
│
└── website/
    ├── public/
    ├── src/
    │   ├── assets/                        # Logo dan ikon
    │   │   ├── logo ipb.png
    │   │   ├── logo suhu.png
    │   │   ├── logo kelembapan.png
    │   │   ├── logo irigator.png
    │   │   ├── logo alert.png
    │   │   └── logo normal.png
    │   │
    │   ├── pages/                         # Komponen halaman
    │   │   ├── Role.jsx                   # Halaman pemilihan role
    │   │   ├── Login.jsx                 # Halaman login
    │   │   ├── Home.jsx                  # Dashboard utama
    │   │   ├── List.jsx                  # Daftar data historis
    │   │   └── Graph.jsx                 # Grafik monitoring
    │   │
    │   ├── App.jsx                       # Router utama
    │   ├── main.jsx                      # Entry point React
    │   └── index.css                     # Stylesheet global
    │
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## 🔧 Teknologi Website

| Teknologi        | Versi   | Fungsi                     |
| ---------------- | ------- | -------------------------- |
| **React**        | 19.2.5  | Library UI utama           |
| **React Router** | 7.14.2  | Routing antar halaman      |
| **Vite**         | 8.0.10  | Build tool & dev server    |
| **Recharts**     | 3.8.1   | Library visualisasi grafik |
| **@emotion/css** | 11.13.5 | CSS-in-JS styling          |
| **ESLint**       | 10.2.1  | Linting kode               |

---

## 📱 Arsitektur Website Dashboard

Website dashboard dirancang dengan pendekatan **mobile-first** menggunakan viewport 393×844px (mirip tampilan mobile), dengan navigasi 5 halaman utama:

### Alur Navigasi

```
┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
│  Role   │ ──▶ │  Login  │ ──▶│  Home   │ ──▶ │  List  │ ──▶ │  Graph  │
│ (/)     │     │ (/login)│     │ (/home) │     │ (/list) │     │ (/graph)│
└─────────┘     └─────────┘     └─────────┘     └─────────┘     └─────────┘
                     │               │               │               │
                  User/Admin      Dashboard      Data Historis   Visualisasi
                  Selection       Utama          per Tanggal     Grafik
```

### Halaman dan Fungsi

1. **Role (`/`)** — Pemilihan peran pengguna (Admin/User) sebelum login.
2. **Login (`/login`)** — Form autentikasi username dan password.
3. **Home (`/home`)** — Dashboard menampilkan:
   - Status terakhir suhu (°C), kelembapan (%), dan status irigator (ON/OFF)
   - Filter tanggal untuk melihat data historis
4. **List (`/list`)** — Daftar data monitoring per tanggal dengan:
   - Indikator warna (merah = kelembapan rendah, hijau = normal)
   - Status irigator aktif/nonaktif
5. **Graph (`/graph`)** — Visualisasi grafik line untuk:
   - Data suhu (field1) — warna merah
   - Data kelembapan (field2) — warna biru
   - Data irigator (field3) — warna ungu

---

## 🌐 Integrasi ThingSpeak

Website mengambil data dari **ThingSpeak API** (Channel ID: `3279100`):

| Field | Data            | Endpoint                                    |
| ----- | --------------- | ------------------------------------------- |
| 1     | Suhu (°C)       | `api.thingspeak.com/channels/3279100/feeds` |
| 2     | Kelembapan(%)   |                                             |
| 3     | Status Irigator |                                             |

- **Home** — Mengambil 1 data terbaru (`results=1`) untuk status real-time.
- **List** — Mengambil hingga 500 data (`results=500`) lalu difilter berdasarkan tanggal.
- **Graph** — Menampilkan iframe ThingSpeak Charts dengan filter tanggal.

**Logika Kontrol Otomatis:**

- Jika kelembapan < 85% → Irigator ON (mist sprayer aktif)
- Jika kelembapan ≥ 85% → Irigator OFF

---

## ⚙️ Modul Elektronika (Firmware)

Program utama `module/[Program] main.ino` ditulis untuk ESP32/Wokwi Simulator dengan komponen:

| Komponen       | Pin/Parameter             | Fungsi                   |
| -------------- | ------------------------- | ------------------------ |
| **DHT22**      | Pin 33, DHTTYPE DHT22     | Sensor suhu & kelembapan |
| **LCD I2C**    | Alamat 0x27, 16×2         | Tampilan data lokal      |
| **Relay**      | Pin 18                    | Kontrol mist sprayer     |
| **WiFi**       | SSID: Wokwi-GUEST         | Koneksi internet         |
| **ThingSpeak** | API Key: QT2UF9CDFD3Y1OTI | Upload data ke cloud     |

**Threshold:** Kelembapan < 85% → Relay aktif → Mist sprayer menyala.

---

## 🚀 Menjalankan Website

### Prasyarat

- Node.js >= 18.x
- npm

### Instalasi

```bash
cd website
npm install
```
