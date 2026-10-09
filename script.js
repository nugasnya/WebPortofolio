
// ========================================
// 1. MENGAMBIL ELEMEN HTML
// ========================================

const video = document.getElementById("background-video");
const audio = document.getElementById("background-audio");
const audioButton = document.getElementById("audioButton");
const glowingLight = document.querySelector(".glowing-light");

// Memastikan elemen tersedia
if (video && audio && audioButton) {

    // ========================================
    // 2. FUNGSI MEMUTAR VIDEO DAN MUSIK
    // ========================================

    async function playPauseMedia() {

        // Jika video atau musik sedang diputar,
        // hentikan keduanya.
        if (!video.paused || !audio.paused) {
            video.pause();
            audio.pause();

            audioButton.innerHTML =
                '<span aria-hidden="true">&#9654;</span> Putar Video & Musik';

            audioButton.setAttribute("aria-pressed", "false");

            video.classList.remove("is-playing");

            return;
        }

        // Ubah tampilan tombol selama proses dimulai
        audioButton.disabled = true;
        audioButton.textContent = "Memuat media...";

        // Mulai video dan audio bersamaan
        const results = await Promise.allSettled([
            video.play(),
            audio.play()
        ]);

        audioButton.disabled = false;

        const videoBerhasil = results[0].status === "fulfilled";
        const audioBerhasil = results[1].status === "fulfilled";

        // Jika video berhasil diputar
        if (videoBerhasil) {
            video.classList.add("is-playing");
        }

        // Atur tulisan tombol sesuai hasil pemutaran
        if (videoBerhasil && audioBerhasil) {

            audioButton.innerHTML =
                '<span aria-hidden="true">&#10074;&#10074;</span> Jeda Video & Musik';

            audioButton.setAttribute("aria-pressed", "true");

        } else if (videoBerhasil && !audioBerhasil) {

            audioButton.innerHTML =
                '<span aria-hidden="true">&#9654;</span> Video Diputar - Musik Gagal';

            audioButton.setAttribute("aria-pressed", "true");

            console.error(
                "Musik gagal diputar. Periksa lokasi file audio dan formatnya.",
                results[1].reason
            );

        } else if (!videoBerhasil && audioBerhasil) {

            audioButton.innerHTML =
                '<span aria-hidden="true">&#10074;&#10074;</span> Musik Diputar - Video Gagal';

            audioButton.setAttribute("aria-pressed", "true");

            console.error(
                "Video gagal diputar. Periksa lokasi file video.",
                results[0].reason
            );

        } else {

            audioButton.innerHTML =
                '<span aria-hidden="true">&#8635;</span> Coba Putar Lagi';

            audioButton.setAttribute("aria-pressed", "false");

            console.error(
                "Video dan musik gagal diputar.",
                results[0].reason,
                results[1].reason
            );
        }
    }

    // ========================================
    // 3. MENGHUBUNGKAN TOMBOL DENGAN FUNGSI
    // ========================================

    audioButton.addEventListener("click", playPauseMedia);

    // ========================================
    // 4. EFEK SAAT VIDEO DIPUTAR
    // ========================================

    video.addEventListener("play", function () {
        video.classList.add("is-playing");
    });

    video.addEventListener("pause", function () {
        video.classList.remove("is-playing");
    });

    // ========================================
    // 5. MENANGANI VIDEO YANG GAGAL DIMUAT
    // ========================================

    video.addEventListener("error", function () {
        console.error(
            "Video tidak dapat dimuat. Periksa folder images dan nama file video."
        );
    });

    audio.addEventListener("error", function () {
        console.error(
            "Audio tidak dapat dimuat. Periksa folder audio dan nama file musik."
        );
    });
}

// ========================================
// 6. EFEK KURSOR BERCAHAYA
// ========================================

if (glowingLight) {

    document.addEventListener("mousemove", function (event) {

        glowingLight.style.left = event.clientX + "px";
        glowingLight.style.top = event.clientY + "px";
        glowingLight.style.opacity = "1";

    });

    document.addEventListener("mouseleave", function () {
        glowingLight.style.opacity = "0";
    });
}

