const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.npoint.io/99c279bb173a6e28359c/data', true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const suratBody = document.getElementById('surat');

        let htmlContent = '';
        data.forEach(surat => {
            htmlContent += `<tr>
                            <td>
                                <div class="row mt-3 tiapSuratNya">
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div class="col">
                                                        <h5 class="card-title">${surat.nama}</h5>
                                                        <h6 class="card-subtitle mb-2 text-muted">${surat.type}</h6>
                                                    </div>
                                                    <div class="col text-right">
                                                        <h6 class="card-title">Surat Ke-${surat.nomor}</h6>
                                                        <h6 class="card-subtitle mb-2 text-muted">${surat.ayat} Ayat</h6>
                                                    </div>
                                                </div>
                                                <div role="button" class="badge badge-success text-white"
                                                    data-surat="${surat.nomor}" data-toggle="modal"
                                                    data-target="#bacaSuratModal" id="baca"><svg width="14px" height="14px" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>open-external</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon" fill="#000000" transform="translate(85.333333, 64.000000)"> <path d="M128,63.999444 L128,106.666444 L42.6666667,106.666667 L42.6666667,320 L256,320 L256,234.666444 L298.666,234.666444 L298.666667,362.666667 L4.26325641e-14,362.666667 L4.26325641e-14,64 L128,63.999444 Z M362.666667,1.42108547e-14 L362.666667,170.666667 L320,170.666667 L320,72.835 L143.084945,249.751611 L112.915055,219.581722 L289.83,42.666 L192,42.6666667 L192,1.42108547e-14 L362.666667,1.42108547e-14 Z" id="Combined-Shape"> </path> </g> </g> </g></svg> Baca</div>
                                                <div role="button" class="badge badge-info text-white"
                                                    data-surat="${surat.nomor}" data-toggle="modal"
                                                    data-target="#keteranganSuratModal" id="keterangan"><svg fill="#000000" width="14px" height="14px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" class="icon"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M928 161H699.2c-49.1 0-97.1 14.1-138.4 40.7L512 233l-48.8-31.3A255.2 255.2 0 0 0 324.8 161H96c-17.7 0-32 14.3-32 32v568c0 17.7 14.3 32 32 32h228.8c49.1 0 97.1 14.1 138.4 40.7l44.4 28.6c1.3.8 2.8 1.3 4.3 1.3s3-.4 4.3-1.3l44.4-28.6C602 807.1 650.1 793 699.2 793H928c17.7 0 32-14.3 32-32V193c0-17.7-14.3-32-32-32zM324.8 721H136V233h188.8c35.4 0 69.8 10.1 99.5 29.2l48.8 31.3 6.9 4.5v462c-47.6-25.6-100.8-39-155.2-39zm563.2 0H699.2c-54.4 0-107.6 13.4-155.2 39V298l6.9-4.5 48.8-31.3c29.7-19.1 64.1-29.2 99.5-29.2H888v488zM396.9 361H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm223.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c0-4.1-3.2-7.5-7.1-7.5H627.1c-3.9 0-7.1 3.4-7.1 7.5zM396.9 501H211.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5zm416 0H627.1c-3.9 0-7.1 3.4-7.1 7.5v45c0 4.1 3.2 7.5 7.1 7.5h185.7c3.9 0 7.1-3.4 7.1-7.5v-45c.1-4.1-3.1-7.5-7-7.5z"></path> </g></svg> Keterangan</div>
                                                <div role="button" class="badge badge-primary text-white"
                                                    data-surat="${surat.nomor}" data-toggle="modal"
                                                    data-target="#audioModal" id="audio"><svg width="14px" height="14px" version="1.1" id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64px" height="64px" viewBox="0 0 32 32" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> .blueprint_een{fill:#111918;} .st0{fill:#0B1719;} </style> <path class="blueprint_een" d="M30.024,18.126c-1.094-1.128-2.498-1.831-4.024-2.047V12c0-5.514-4.486-10-10-10S6,6.486,6,12 v4.079c-1.526,0.217-2.93,0.919-4.024,2.047c-1.329,1.37-2.03,3.177-1.973,5.089C0.116,26.956,3.367,30,7.252,30H8 c1.103,0,2-0.897,2-2V18c0-1.103-0.897-2-2-2v-4c0-4.411,3.589-8,8-8s8,3.589,8,8v4c-1.103,0-2,0.897-2,2v10c0,1.103,0.897,2,2,2 h0.748c3.885,0,7.136-3.044,7.249-6.785C32.055,21.303,31.354,19.496,30.024,18.126z M2.003,23.154 c-0.042-1.366,0.458-2.657,1.408-3.636C4.124,18.783,5.02,18.297,6,18.099v9.737C3.774,27.305,2.071,25.416,2.003,23.154z M8.002,28 h-0.75C7.166,28,7.085,27.98,7,27.976V18h1L8.002,28z M24,28V18h1v9.976C24.915,27.98,24.834,28,24.748,28H24z M26,27.836v-9.737 c0.98,0.197,1.876,0.684,2.589,1.419c0.95,0.979,1.45,2.27,1.408,3.636C29.929,25.416,28.226,27.305,26,27.836z"></path> </g></svg> Audio</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>`;
        });
        suratBody.innerHTML = htmlContent;


        window.addEventListener('click', function (e) {
            const urutanSurat = e.target.dataset.surat;
            const indexSurat = e.target.dataset.surat - 1;

            if (e.target.id === 'audio') {
                const namaSuratAudio = e.target.previousElementSibling.previousElementSibling.previousElementSibling.children[0].firstElementChild.outerText
                const audioSurat = data[indexSurat].audio;

                const audioCard = document.querySelector('.audioCard');
                const audioPlayer = `<span id="judulAudioSurat">${namaSuratAudio}</span>
                                    <audio controls autoplay>
                                    <source src="${audioSurat}" type="audio/mpeg" id="audioSurat">
                                    </audio>`;
                audioCard.style.bottom = '0';
                audioCard.innerHTML = audioPlayer;
                console.log(audioCard);
            }

            if (e.target.id === 'keterangan') {
                const namaSuratKeterangan = e.target.previousElementSibling.previousElementSibling.children[0].firstElementChild.outerText;
                const keteranganSuratKeN = data[indexSurat].keterangan;
                const modalKeteranganSurat = document.querySelector('.keterangan-surat');
                let keteranganSurat = `<div div class="modal-content" >
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="bacaSuratModalLabel">${namaSuratKeterangan} - ${data[indexSurat].arti}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="container">
                                                ${keteranganSuratKeN}
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        </div>
                                    </div > `;

                modalKeteranganSurat.innerHTML = keteranganSurat;


            }


            if (e.target.id === 'baca') {
                const namaSurat = e.target.previousElementSibling.children[0].firstElementChild.outerText;
                console.log(e)
                const xhr = new XMLHttpRequest();
                xhr.open('GET', `https://api.npoint.io/99c279bb173a6e28359c/surat/${urutanSurat}`, true);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        const detailSurat = `<div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="bacaSuratModalLabel">${namaSurat}</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="container">
                                    ${generateAyatContent(data)}
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>`;

                        // Tampilkan konten modal dengan data surat yang diterima
                        const modalDialog = document.querySelector('.baca-surat');
                        modalDialog.innerHTML = detailSurat;

                        // Panggil fungsi untuk menampilkan konten ayat
                        function generateAyatContent(ayatData) {
                            let ayatContent = '';
                            ayatData.forEach(ayat => {
                                ayatContent += `<h5 class="text-center">
                            <span class="border rounded-circle p-2">${ayat.nomor}</span>${ayat.ar}
                            </h5>
                            <h6 class="text-center text-muted">${ayat.id}</h6>
                            `;
                            });
                            return ayatContent;
                        }

                        // // Tampilkan modal
                        // const bacaSuratModal = new bootstrap.Modal(document.getElementById('bacaSuratModal'));
                        // bacaSuratModal.show();
                    }
                }
                xhr.send();
            }
        });

    }
}
xhr.send();