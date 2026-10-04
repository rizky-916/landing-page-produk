/*
 * main.js — interaksi kecil untuk landing page.
 * - Menu lipat di layar kecil (dengan aria-expanded untuk pembaca layar)
 * - Tahun hak cipta otomatis
 * Tidak memakai innerHTML / eval dan tidak memuat skrip pihak ketiga.
 */
(function () {
    'use strict';

    // Tandai bahwa JavaScript aktif (dipakai CSS untuk menu lipat).
    document.documentElement.classList.add('js');

    document.addEventListener('DOMContentLoaded', function () {
        // --- Tahun otomatis di footer ---
        var tahun = document.getElementById('tahun');
        if (tahun) {
            tahun.textContent = String(new Date().getFullYear());
        }

        // --- Menu lipat ---
        var toggle = document.querySelector('.nav-toggle');
        var menu = document.getElementById('menu-utama');
        if (!toggle || !menu) return;

        function setMenu(open) {
            menu.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
        }

        toggle.addEventListener('click', function () {
            setMenu(toggle.getAttribute('aria-expanded') !== 'true');
        });

        // Tutup menu setelah tautan dipilih.
        menu.addEventListener('click', function (e) {
            if (e.target.closest('a')) setMenu(false);
        });

        // Tutup menu dengan tombol Escape.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) {
                setMenu(false);
                toggle.focus();
            }
        });

        // Tutup menu jika layar diperlebar melewati batas mobile.
        window.matchMedia('(min-width: 769px)').addEventListener('change', function (mq) {
            if (mq.matches) setMenu(false);
        });
    });
})();
