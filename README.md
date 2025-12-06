# Gemini AI Chatbot - Hacktiv8 Quiz Session 5

Project ini dibuat untuk memenuhi tugas **Quiz Session 5** pada program **Hacktiv8** dengan topik **"AI Productivity and AI API Integration for Developer"**. Aplikasi ini merupakan implementasi sederhana dari penerapan Gemini API menggunakan model **gemini-2.5-flash** dan integrasi chatbot web-based.

## 📋 Deskripsi Project

Aplikasi chatbot berbasis web yang mengintegrasikan **Google Gemini AI API** dengan arsitektur client-server. Backend dibangun menggunakan **Node.js** dan **Express**, sedangkan frontend menggunakan **Vanilla JavaScript** untuk memberikan pengalaman chat yang responsif dan interaktif.

## ✨ Fitur

- 💬 **Chat Interface Interaktif** - Antarmuka chat yang clean dan user-friendly
- 🤖 **Integrasi Gemini AI** - Menggunakan model gemini-2.5-flash untuk respons AI yang cepat
- 📝 **Conversation History** - Menyimpan konteks percakapan untuk respons yang lebih relevan
- ⚡ **Real-time Response** - Menampilkan indikator "Thinking..." saat menunggu respons
- 🛡️ **Error Handling** - Penanganan error yang komprehensif dengan pesan yang jelas
- 🔄 **CORS Support** - Mendukung cross-origin requests untuk fleksibilitas deployment

## 🛠️ Teknologi yang Digunakan

### Backend

- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **Google Gemini AI** (@google/genai v1.31.0) - AI API integration
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **dotenv** (v17.2.3) - Environment variables management

### Frontend

- **Vanilla JavaScript** - Pure JavaScript tanpa framework
- **HTML5** - Struktur halaman web
- **CSS3** - Styling dan layout

## 📦 Instalasi

### Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- Google Gemini API Key

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd hacktiv8-gemini-chatbot-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   Buat file `.env` di root directory dan tambahkan API key Gemini Anda:

   ```env
   API_KEY=your_gemini_api_key_here
   PORT=3000
   ```

4. **Jalankan aplikasi**

   Development mode (dengan nodemon):

   ```bash
   npm run dev
   ```

   Production mode:

   ```bash
   npm start
   ```

5. **Akses aplikasi**

   Buka browser dan akses: `http://localhost:3000`

## 🚀 Cara Menggunakan

1. Buka aplikasi di browser
2. Ketik pesan Anda di input box
3. Tekan tombol "Send" atau Enter
4. Tunggu respons dari Gemini AI
5. Lanjutkan percakapan - AI akan mengingat konteks percakapan sebelumnya

## 📁 Struktur Project

```
hacktiv8-gemini-chatbot-api/
├── index.js              # Server Express dan endpoint API
├── package.json          # Dependencies dan scripts
├── .env                  # Environment variables (tidak di-commit)
├── README.md            # Dokumentasi project
└── public/              # Frontend files
    ├── index.html       # Struktur HTML
    ├── style.css        # Styling
    └── script.js        # Logic frontend
```

## 🔌 API Endpoint

### POST `/api/chat`

Endpoint untuk mengirim pesan dan menerima respons dari Gemini AI.

**Request Body:**

```json
{
  "conversation": [
    {
      "role": "user",
      "text": "Hello, how are you?"
    }
  ]
}
```

**Response:**

```json
{
  "result": "I'm doing well, thank you for asking! How can I help you today?"
}
```

**Error Response:**

```json
{
  "error": "Error message description"
}
```

## 🎯 Fitur Frontend

- **Form Handling** - Mencegah form submission default dan menangani input user
- **DOM Manipulation** - Menambahkan dan mengupdate pesan di chat box secara dinamis
- **Async/Await** - Menggunakan modern JavaScript untuk API calls
- **Error Handling** - Menangani berbagai jenis error (network, server, no response)
- **UI/UX Enhancement** - Auto-scroll, form disable saat loading, dan focus management

## 🔒 Keamanan

- API key disimpan di environment variables
- CORS dikonfigurasi untuk keamanan cross-origin requests
- Input validation di backend
- Error messages yang informatif tanpa expose sensitive data

## 📝 Catatan Pengembangan

- Model Gemini yang digunakan: **gemini-2.5-flash**
- Port default: **3000** (dapat dikonfigurasi via .env)
- Conversation history disimpan di client-side untuk konteks percakapan

## 🤝 Kontribusi

Project ini dibuat untuk keperluan pembelajaran dan tugas Hacktiv8. Saran dan feedback sangat diterima untuk pengembangan lebih lanjut.

## 📄 Lisensi

ISC

## 👨‍💻 Author

Dibuat sebagai bagian dari Quiz Session 5 - Hacktiv8 Program

---

**Hacktiv8 - AI Productivity and AI API Integration for Developer**
