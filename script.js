const daftarVideoWeb = [
    {
        tipe: "embed",
        kode: '<iframe src="" frameborder=0 width=510 height=400 scrolling=no eborder="0" allowfullscreen></iframe>',
        judul: ",",
        deskripsi: "ini adalah film "
    },
    {
        tipe: "embed",
        kode: '<iframe src="" frameborder="0" allowfullscreen></iframe>',
        judul: "Video Kedua Mantap"
    },
    {
        tipe: "embed",
        kode: '<iframe src="" frameborder="0" allowfullscreen></iframe>',
        judul: "Video Ketiga Bejibun"
    },
    {
        tipe: "embed",
        kode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
        judul: "Test YouTube"
    },
    
    
      {
        tipe: "embed",
        kode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
        judul: "YouTube1"
    },
    
    
    
    
      {
        tipe: "embed",
        kode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>',
        judul: "YouTube2"
    },
    
    
    
    
    
      {
        tipe: "embed",
        kode: '<iframe src="https://www.youtube.com/embed/h3w01galE3QQ" frameborder="0" allowfullscreen></iframe>',
        judul: "YouTube3"
    },  
    
    
    
    
    
    
    
    
    
    
    

   {
       tipe: "embed",
    kode: `<iframe width="100%" height="200" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    judul: "Video Test 1 - Pasti Jalan"
  },
  
  {
    tipe: "embed", 
    kode: `<iframe width="100%" height="200" src="https://www.youtube.com/embed/h3w01galE3QQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`,
    judul: "Video Lu"
  },
    
    
    
    
    
    
    
    
    
    
    
    
    
    {
    tipe: "embed",
    kode: '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1005461628539685%2F&show_text=false&width=500" width="100%" height="476" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
    judul: "dlychan",
    deskripsi: "Video  dari Facebook Reel"
}
    
    
];

function tampilkanSemuaVideo() {
    let wadahVideo = document.getElementById('daftarVideo');
    if (!wadahVideo) return;

    wadahVideo.innerHTML = "<h3>Video Terbaru</h3>";
    daftarVideoWeb.forEach((video) => {
        let boxVideo = document.createElement('div');
        boxVideo.className = 'video-box';
boxVideo.innerHTML = `
    <div class="video-utama">${video.kode}</div>
    <p class="judul-video">${video.judul}</p>
    <p class="deskripsi-video">${video.deskripsi}</p> <!-- INI YG KURANG -->
`;
        wadahVideo.appendChild(boxVideo);
    }); // <-- BENERIN DI SINI, PAKE ; BUKAN,
}

tampilkanSemuaVideo(); // <-- NGGAK PAKE KOMA

/* untuk komenan */

const namaUser = document.getElementById('namaUser');
const isiKomen = document.getElementById('isiKomen');
const fileKomen = document.getElementById('fileKomen');
const btnKirim = document.getElementById('btnKirim');
const btnHapus = document.getElementById('btnHapus');
const daftarKomen = document.getElementById('daftarKomen');

// Load komen pas buka web
tampilKomen();

btnKirim.addEventListener('click', function() {
    if (namaUser.value == '' && isiKomen.value == '' && fileKomen.files.length == 0) {
        alert('Isi nama/komentar atau upload file dulu bro!');
        return;
    }

    let komen = JSON.parse(localStorage.getItem('komen')) || [];
    let fileData = null;

    // Kalo ada file yg diupload
    if (fileKomen.files.length > 0) {
        const file = fileKomen.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            fileData = {
                type: file.type.startsWith('image')? 'img' : 'video',
                src: e.target.result
            };
            simpanKomen(komen, fileData);
        }
        reader.readAsDataURL(file); // Convert file ke base64
    } else {
        simpanKomen(komen, fileData);
    }
});

function simpanKomen(komen, fileData) {
    komen.push({
        id: Date.now(), // ID unik buat hapus 1 komen
        nama: namaUser.value || 'Anonim',
        isi: isiKomen.value,
        file: fileData,
        waktu: new Date().toLocaleString('id-ID')
    });

    localStorage.setItem('komen', JSON.stringify(komen));

    // Reset form
    namaUser.value = '';
    isiKomen.value = '';
    fileKomen.value = '';
    tampilKomen();
}

btnHapus.addEventListener('click', function() {
    if (confirm('Yakin hapus semua komen?')) {
        localStorage.removeItem('komen');
        tampilKomen();
    }
});

// Fungsi hapus 1 komen - INI YG KEPOTONG TADI
function hapusSatuKomen(id) {
    if (confirm('Hapus komen ini?')) {
        let komen = JSON.parse(localStorage.getItem('komen')) || [];
        komen = komen.filter(item => item.id!= id); // Buang yg id-nya sama
        localStorage.setItem('komen', JSON.stringify(komen)); // <-- INI YG KURANG
        tampilKomen(); // <-- INI JUGA KURANG
    }
}

function tampilKomen() {
    let komen = JSON.parse(localStorage.getItem('komen')) || [];
    daftarKomen.innerHTML = '';

    komen.forEach((item) => {
        let fileHTML = '';
        if (item.file) {
            if (item.file.type == 'img') {
                fileHTML = `<img src="${item.file.src}" class="komen-media">`;
            } else {
                fileHTML = `<video src="${item.file.src}" class="komen-media" controls></video>`;
            }
        }

        daftarKomen.innerHTML += `
            <div class="satu-komen">
                <div class="komen-header">
                    <b>${item.nama}</b> <small>${item.waktu}</small>
                    <button onclick="hapusSatuKomen(${item.id})" class="btn-hapus-satu">×</button>
                </div>
                <p>${item.isi}</p>
                ${fileHTML}
                <hr>
            </div>
        `;
    });
}




/* fullscreen media komen*/

if (item.file.type == 'img') {
    fileHTML = `<img src="${item.file.src}" class="komen-media" onclick="window.open(this.src)">`;
} else {
    fileHTML = `<video src="${item.file.src}" class="komen-media" controls></video>`;
}



/* galery*/
