/* =========================
           Nuqthah Learn — SPA Core (Professional)
           Focus:
           - Clean structure & maintainability
           - No design change, keep all features
           - Smoother UX micro-interactions
           - Stronger error handling (esp. iframe preview)
           - No page auto-scroll (except slider auto sideways)
        ========================= */




(function () {
    "use strict";

    // -------------------------
    // DOM Helpers
    // -------------------------
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    const prefersReducedMotion = () =>
        !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const safeJsonParse = (str, fallback) => {
        try { return JSON.parse(str); } catch { return fallback; }
    };

    const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

    const rafThrottle = (fn) => {
        let raf = null;
        return (...args) => {
            if (raf) return;
            raf = requestAnimationFrame(() => {
                raf = null;
                fn(...args);
            });
        };
    };

    const debounce = (fn, wait = 140) => {
        let t = null;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn(...args), wait);
        };
    };




    // Splash / logo animation (run once on first load)
    window.addEventListener("load", () => {
        const splash = document.getElementById("splash");
        if (!splash) return;

        // durasi tampil
        setTimeout(() => {
            splash.classList.add("hide");
        }, 3500);
    });

    if (!sessionStorage.getItem("splashShown")) {
        sessionStorage.setItem("splashShown", "1");
    } else {
        document.getElementById("splash")?.remove();
    }


    // -------------------------
    // Storage (safe)
    // -------------------------
    const storage = {
        get(key, fallback) {
            try {
                const raw = localStorage.getItem(key);
                return raw == null ? fallback : safeJsonParse(raw, fallback);
            } catch {
                return fallback;
            }
        },
        set(key, val) {
            try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore quota */ }
        }
    };

    // -------------------------
    // Toast
    // -------------------------
    const toast = (() => {
        const el = $("#toast");
        const titleEl = $("#toastTitle");
        const msgEl = $("#toastMsg");
        const closeBtn = $("#toastClose");
        let t = null;

        const show = (title, msg, ms = 2600) => {
            titleEl.textContent = title;
            msgEl.textContent = msg;
            el.classList.add("show");
            clearTimeout(t);
            t = setTimeout(hide, ms);
        };

        const hide = () => el.classList.remove("show");

        closeBtn.addEventListener("click", hide, { passive: true });

        return { show, hide };
    })();

    // -------------------------
    // Syariah tk1
    // -------------------------
    const lessons = [
        {
            id: "sulfiqh tk1",
            title: "Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"

        },
        {
            id: "fiqmuq tk1",
            title: "Fiqh Muqoron",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "tafsir tk1",
            title: "Tafsir Ayat Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "qodoya tk1",
            title: "Qodoya Fiqhiyah Mu'ashiroh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "tauhid tk1",
            title: "Tauhid",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        }, {
            id: "tarikh tasyri tk1",
            title: "Tarikh Tasyri'",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "nahwu sya tk1",
            title: "Nahwu & Shorof",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "ulum hadis sya tk1",
            title: "Ulumul Hadits",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "qobah fiqh sya tk1",
            title: "Qo'ah Bahs Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "qobah ushul sya tk1",
            title: "Qo'ah Bahs Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "fiqh madzhab tk1",
            title: "Fiqh Madzhabi",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 1",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },


        // -------------------------
        // Syariah tk2
        // -------------------------

        {
            id: "fiqh madzhab tk2",
            title: "Fiqh Madzhabi",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            previewImage: "assets/images/slide-1.jpg"
        },
        {
            id: "fiqmuq tk2",
            title: "Fiqh Muqoron",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "nahwu sya tk2",
            title: "Nahwu & Shorof",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "qodoya sya tk2",
            title: "Qoqoya",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "tauhid sya tk2",
            title: "Tauhid",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "tafsir sya tk2",
            title: "Tafsir Ayat Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "hadis ahkam sya tk2",
            title: "Haditsul Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "sulfiqh sya tk2",
            title: "Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "qobah fiqh tk2",
            title: "Qo'ah Bahs Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qo'ah Bahs Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Ahwal Syakhsyiah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 2",
            tag: "NEW",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },


        // -------------------------
        // Syariah tk3
        // -------------------------

        {
            id: "kuliah",
            title: "Ahwal Syakhsyiah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Adab Wal Balaghah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Tafsir Ayat Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Manhaj Da'wah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Hadits Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qodoya Fiqhiyah Muashiroh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qo'ah Bahs Qodoya",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qo'ah Bahs Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqh Madzhabi",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqh Muqoron",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 3",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },

        // -------------------------
        // Syariah tk4
        // -------------------------
        {
            id: "kuliah",
            title: "Qowa'id Fiqhiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qo'ah Bahs Qowa'id Fiqhiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Tafsir Ayat Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Adab Wal Balaghah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Hadits Ahkam",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qodoya Fiqhiyah Mu'ashirah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qo'ah Bahs Qodoya Fiqhiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Ushul Fiqh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqh Madzhabi",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqh Muqoron",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Syari'ah",
            level: "Tingkat 4",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },


        // -------------------------
        // ushuluddin tk1
        // -------------------------
        {
            id: "kuliah",
            title: "Nahwu & Shorof",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqih",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Mantiq",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Nuzum Islamiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Tarikh Sunnah Nabawiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Ulumul Qur'an",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 1",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },


        // -------------------------
        // ushuluddin tk2
        // -------------------------
        {
            id: "kuliah",
            title: "Falsafah Ammah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Fiqih",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Mantiq",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Khitobah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,

            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Syubuhat Haulal Hadits",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Ulumul Qur'an",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 2",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },

        // -------------------------
        // ushuluddin tk3 (tafsir)
        // -------------------------

        {
            id: "kuliah",
            title: "Dakhil Fit Tafsir",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Tafsir)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Siroh Tahliliyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Tafsir)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Tauhid",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Tafsir)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Qodoya Fiqhiyah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Tafsir)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Wasail Tabligh",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Tafsir)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },

        // -------------------------
        // ushuluddin tk3 (tafsir)
        // -------------------------

        {
            id: "kuliah",
            title: "Mantiq Hadits",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Hadits Maudu'i",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Milal Wa Nihal",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Wasail Da'wah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Tafsir Maudu'i",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },
        {
            id: "kuliah",
            title: "Akhlak Falsafah",
            desc: "Ringkas, praktis, cocok untuk pemanasan sebelum latihan soal.",
            category: "Bimbel Ushuludin",
            level: "Tingkat 3 (Akidah Filsafat)",
            tag: "Tersedia",
            featured: true,
            url: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo",
            preview: "https://youtu.be/J7mR2-SqUdQ?si=mTv9iHrbqR37Opgo"
        },

        {
            id: "toefl-mini",
            title: "Mini Test: TOEFL Warmup",
            desc: "Latihan ringan buat ngebangun ritme & confidence.",
            category: "Test Prep",
            level: "Intermediate",
            tag: "PREMIUM",
            featured: true,
            url: "https://www.ets.org/toefl",
            preview: "https://www.ets.org/toefl"
        }

    ];



    const categories = ["All", ...Array.from(new Set(lessons.map(l => l.category)))];

    // -------------------------
    // Keys
    // -------------------------
    const LS = {
        theme: "nql_theme",
        route: "nql_route",
        filters: "nql_filters",
        progress: "nql_progress",
        notes: "nql_notes",
        streak: "nql_streak",
        lastStudy: "nql_last_study"
    };

    const defaultFilters = { q: "", cat: "All" };

    // -------------------------
    // State
    // -------------------------
    const progressStored = storage.get(LS.progress, { activeLessonId: lessons[0]?.id || null, doneMap: {} });
    const state = {
        route: storage.get(LS.route, "home"),
        filters: storage.get(LS.filters, defaultFilters),
        activeLessonId: progressStored.activeLessonId || lessons[0]?.id || null,
        doneMap: progressStored.doneMap || {},
        notesMap: storage.get(LS.notes, {}) || {},
        streak: storage.get(LS.streak, 0) || 0,
        lastStudy: storage.get(LS.lastStudy, null)
    };

    // -------------------------
    // Theme
    // -------------------------
    const stateThemeIsDark = () => document.body.classList.contains("dark");

    const applyTheme = (mode) => {
        const isDark = mode === "dark";
        document.body.classList.toggle("dark", isDark);
        storage.set(LS.theme, mode);
        $("#darkToggle").textContent = isDark ? "☀️" : "🌙";
    };

    const initTheme = () => {
        const saved = (() => {
            try { return localStorage.getItem(LS.theme); } catch { return null; }
        })();

        if (saved === "dark" || saved === "light") {
            applyTheme(saved);
            return;
        }
        const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(prefersDark ? "dark" : "light");
    };


    // -------------------------
    // Modal (preview) + robust iframe handling
    // -------------------------
    const modal = (() => {
        const overlay = $("#modalOverlay");
        const frame = $("#modalFrame");
        const img = $("#modalImage");
        const box = $("#modalPreview");
        const placeholder = $("#modalPlaceholder");
        const title = $("#modalTitle");
        const sub = $("#modalSubtitle");
        const desc = $("#modalDesc");
        const badges = $("#modalBadges");
        const btnClose = $("#modalClose");
        const btnCancel = $("#modalCancel");
        const btnExternal = $("#modalOpenExternal");
        const btnUseInFocus = $("#modalUseInFocus");



        let currentLesson = null;
        let loadTimer = null;

        const setBadges = (lesson) => {
            badges.innerHTML = "";
            const arr = [lesson.category, lesson.level, (lesson.tag || "OK")];
            arr.forEach(x => {
                const s = document.createElement("span");
                s.className = "tiny";
                s.textContent = x;
                badges.appendChild(s);
            });
        };

        const setPlaceholder = (text) => {
            if (placeholder) placeholder.textContent = text;
        };

        const resetFrame = () => {
            clearTimeout(loadTimer);
            loadTimer = null;

            frame.onload = null;
            frame.onerror = null;
            frame.src = "";

            // reset image mode
            box.classList.remove("ready");
            box.classList.remove("has-image");
            if (img) {
                img.src = "";
                img.alt = "";
            }

            setPlaceholder("Loading preview…");
        };


        const tryLoad = (url) => {
            resetFrame();
            // if blocked by X-Frame-Options, onload can still fire blank or refuse;
            // we show a helpful message after timeout if not ready.
            loadTimer = setTimeout(() => {
                if (!box.classList.contains("ready")) {
                    setPlaceholder("Preview dibatasi oleh situs (X-Frame-Options). Kamu bisa buka sumber langsung ✅");
                }
            }, prefersReducedMotion() ? 0 : 1400);

            try {
                frame.src = url;
                frame.onload = () => {
                    box.classList.add("ready");
                    clearTimeout(loadTimer);
                    loadTimer = null;
                };
                frame.onerror = () => {
                    clearTimeout(loadTimer);
                    loadTimer = null;
                    setPlaceholder("Preview gagal dimuat. Buka sumber langsung ✅");
                };
            } catch {
                clearTimeout(loadTimer);
                loadTimer = null;
                setPlaceholder("Preview gagal dimuat. Buka sumber langsung ✅");
            }
        };

        const open = (lesson) => {
            if (!lesson) return;
            currentLesson = lesson;

            title.textContent = lesson.title;
            sub.textContent = "Preview aman (tidak otomatis buka link)";
            desc.textContent = lesson.desc;

            setBadges(lesson);



            overlay.classList.add("show");
            overlay.setAttribute("aria-hidden", "false");

            // Load preview
            if (lesson.previewImage) {
                resetFrame();
                box.classList.add("has-image");
                img.src = lesson.previewImage;
                img.alt = lesson.title || "Preview";
            } else {
                tryLoad(lesson.preview || lesson.url);
            }

        };

        const close = (silent = false) => {
            overlay.classList.remove("show");
            overlay.setAttribute("aria-hidden", "true");
            resetFrame();
            currentLesson = null;
            if (!silent) toast.show("Ditutup", "Preview ditutup.");
        };

        // close on outside click
        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) close(true);
        }, { passive: true });

        [btnClose, btnCancel].forEach(b => b.addEventListener("click", () => close(true), { passive: true }));

        btnExternal.addEventListener("click", () => {
            if (!currentLesson?.url) return;
            window.open(currentLesson.url, "_blank", "noopener,noreferrer");
            toast.show("Dibuka", "Sumber dibuka di tab baru.");
        }, { passive: true });

        btnUseInFocus.addEventListener("click", (e) => {


            // ====== CONFIG WA ======




            e.preventDefault();
            e.stopPropagation();

            if (!currentLesson) {
                toast.show("Gagal", "Materi belum dipilih.");
                return;
            }

            // ===============================
            // Mapping nomor WA per CATEGORY
            // ===============================
            const WA_BY_CATEGORY = {
                "Bimbel Ushuludin": "6285185409887",
                "Bimbel Syari'ah": "6285185409887",
                "Bimbel Lughoh": "6285185409887",
                "Bimbel Dirosat": "6285185409887",
            };

            const category = (currentLesson.category || "").trim();
            const phone = WA_BY_CATEGORY[category];

            if (!phone) {
                toast.show("Error", `Nomor admin belum di-set untuk kategori: ${category || "-"}`);
                return;
            }

            // ===============================
            // Pesan WhatsApp
            // ===============================
            const msg =
                `Halo Admin Masisir 👋
Saya ingin mendaftar dengan detail berikut:

• Materi   : ${currentLesson.title}
• Kategori : ${currentLesson.category}
• Level    : ${currentLesson.level}
• email    : (wajib diisi)

Mohon info pendaftaran ya. Terima kasih 🙏`;

            window.open(
                `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
                "_blank",
                "noopener,noreferrer"
            );

            toast.show("Berhasil 🚀", "WhatsApp dibuka untuk pendaftaran.");
            close(true);
        }, { passive: false });






        return { open, close, get current() { return currentLesson; } };
    })();

    // -------------------------
    // Router (clean SPA DOM routing)
    // -------------------------
    // -------------------------
    // Router (SPA + History API)
    // -------------------------
    const router = (() => {
        const routes = $$(".route");
        let locked = false;
        let pending = null;

        const activate = (name) => {
            if (name === "explore") {
                explore.syncInputs();
                explore.render();
                $("#searchInput")?.focus({ preventScroll: true });
            }
            if (name === "belajar") learn.render();
            if (name === "home") home.renderExtras();
        };

        const go = (to, opts = {}) => {
            const target = String(to || "home").toLowerCase();
            const current = state.route;

            if (locked) {
                pending = target;   // simpan request terakhir
                return;
            }
            locked = true;


            // ✅ HISTORY PUSH (kecuali silent)
            if (!opts.silent) {
                history.pushState({ route: target }, "", `#${target}`);
            }

            const currentEl = $(`#route-${current}`);
            const nextEl = $(`#route-${target}`);

            if (!nextEl) {
                locked = false;
                return go("home");
            }

            // Tutup modal jika ada
            modal.close(true);

            if (currentEl) {
                currentEl.classList.remove("enter");
                currentEl.classList.add("leave");
            }

            const duration = (opts.silent || prefersReducedMotion()) ? 0 : 420;


            setTimeout(() => {
                routes.forEach(r => r.classList.remove("active", "enter", "leave"));
                nextEl.classList.add("active");
                requestAnimationFrame(() => nextEl.classList.add("enter"));

                state.route = target;
                storage.set(LS.route, state.route);

                activate(target);
                locked = false;
                const next = pending;
                pending = null;
                if (next && next !== state.route) {
                    go(next);
                }

            }, duration);
        };

        // ✅ TANGKAP TOMBOL BACK / FORWARD HP
        window.addEventListener("popstate", (e) => {
            const route =
                e.state?.route ||
                location.hash.replace("#", "") ||
                "home";

            go(route, { silent: true });
        });

        return { go };
    })();



    // -------------------------
    // Slider (auto-scroll sideways + dots + pause on hover)
    // -------------------------
    const slider = (() => {
        const wrap = $("#featuredSlider");
        const dotsWrap = $("#sliderDots");

        let idx = 0;
        let timer = null;
        let items = [];

        const escapeXml = (str) => String(str || "").replace(/[<>&'"]/g, (c) => ({
            "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;"
        }[c]));



        const build = () => {
            items = lessons.filter(l => l.featured);
            wrap.innerHTML = "";
            dotsWrap.innerHTML = "";

            const frag = document.createDocumentFragment();

            items.forEach((l, i) => {
                const s = document.createElement("div");
                s.className = "slide";
                s.tabIndex = 0;
                s.setAttribute("role", "button");
                s.setAttribute("aria-label", `Buka preview: ${l.title}`);

                const img = document.createElement("img");
                img.alt = l.title;
                img.loading = "lazy";
                img.decoding = "async";
                const cover = (l.cover || "").trim();

                img.onerror = () => {
                    // fallback kalau gambar 404
                    img.src = `data:image/svg+xml,${encodeURIComponent(`...SVG fallback kamu...`)}`;
                };

                if (cover) {
                    img.src = cover;
                } else {
                    img.src = `data:image/svg+xml,${encodeURIComponent(`...SVG fallback kamu...`)}`;
                }



                const tag = document.createElement("div");
                tag.className = "tag";
                tag.textContent = l.category;

                const badge = document.createElement("div");
                badge.className = "badge-right";
                badge.textContent = l.tag === "PREMIUM" ? "PREMIUM" : "Recommended";

                const title = document.createElement("span");
                title.textContent = l.title;

                s.appendChild(img);
                s.appendChild(tag);
                s.appendChild(badge);
                s.appendChild(title);

                const openPreview = () => modal.open(l);

                s.addEventListener("click", openPreview, { passive: true });
                s.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openPreview();
                    }
                });

                frag.appendChild(s);

                const d = document.createElement("div");
                d.className = "dot" + (i === 0 ? " active" : "");
                d.addEventListener("click", () => jump(i), { passive: true });
                dotsWrap.appendChild(d);
            });

            wrap.appendChild(frag);
        };

        const updateDots = () => {
            $$(".dot", dotsWrap).forEach((d, i) => d.classList.toggle("active", i === idx));
        };

        const jump = (i) => {
            idx = clamp(i, 0, items.length - 1);
            const target = wrap.children[idx];
            if (!target) return;

            wrap.scrollTo({
                left: target.offsetLeft,
                behavior: prefersReducedMotion() ? "auto" : "smooth"
            });

            updateDots();
        };


        const start = () => {
            stop();
            if (items.length <= 1) return;
            timer = setInterval(() => {
                idx = (idx + 1) % items.length;
                jump(idx);
            }, 4200);
        };

        const stop = () => {
            if (timer) clearInterval(timer);
            timer = null;
        };

        wrap.addEventListener("mouseenter", stop, { passive: true });
        wrap.addEventListener("mouseleave", start, { passive: true });

        wrap.addEventListener("scroll", rafThrottle(() => {
            const children = Array.from(wrap.children);
            if (!children.length) return;
            const left = wrap.scrollLeft;
            let best = 0, bestDist = Infinity;
            children.forEach((c, i) => {
                const dist = Math.abs(c.offsetLeft - left);
                if (dist < bestDist) { bestDist = dist; best = i; }
            });
            idx = best;
            updateDots();
        }), { passive: true });

        return { build, start, stop, jump };
    })();

    // -------------------------
    // Explore (search + chips + grid + skeleton)
    // -------------------------
    const explore = (() => {
        const grid = $("#classGrid");
        const skeletonGrid = $("#skeletonGrid");
        const chipsWrap = $("#categoryChips");
        const qInput = $("#searchInput");
        const clearBtn = $("#clearSearch");
        const resetBtn = $("#resetFilters");

        const showSkeleton = (on) => {
            skeletonGrid.style.display = on ? "" : "none";
            grid.style.display = on ? "none" : "";
        };

        const buildSkeleton = () => {
            skeletonGrid.innerHTML = "";
            for (let i = 0; i < 6; i++) {
                const sk = document.createElement("div");
                sk.className = "skeleton shimmer";
                skeletonGrid.appendChild(sk);
            }
        };

        const buildChips = () => {
            chipsWrap.innerHTML = "";
            const frag = document.createDocumentFragment();
            categories.forEach(cat => {
                const c = document.createElement("span");
                c.className = "chip" + (state.filters.cat === cat ? " active" : "");
                c.textContent = cat;
                c.addEventListener("click", () => {
                    state.filters.cat = cat;
                    storage.set(LS.filters, state.filters);
                    render();
                }, { passive: true });
                frag.appendChild(c);
            });
            chipsWrap.appendChild(frag);
        };

        const computeFiltered = () => {
            const q = (state.filters.q || "").trim().toLowerCase();
            const cat = state.filters.cat;

            return lessons.filter(l => {
                const okCat = (cat === "All") || (l.category === cat);
                const hay = `${l.title} ${l.desc} ${l.category} ${l.level}`.toLowerCase();
                const okQ = !q || hay.includes(q);
                return okCat && okQ;
            });
        };

        const render = () => {
            buildChips();
            showSkeleton(true);
            clearBtn.style.display = state.filters.q ? "grid" : "none";

            const filtered = computeFiltered();

            setTimeout(() => {
                grid.innerHTML = "";
                const frag = document.createDocumentFragment();

                filtered.forEach(l => {
                    const card = document.createElement("div");
                    card.className = "class-card" + (l.tag === "PREMIUM" ? " elite" : "");
                    card.tabIndex = 0;

                    const badge = document.createElement("div");
                    badge.className = "badge " + (
                        l.tag === "PREMIUM" ? "premium" :
                            l.tag === "POPULAR" ? "popular" : "new"
                    );
                    badge.textContent = l.tag || "NEW";

                    const h = document.createElement("h3");
                    h.textContent = l.title;

                    const p = document.createElement("p");
                    p.textContent = l.desc;

                    const meta = document.createElement("div");
                    meta.className = "meta";
                    meta.textContent = `🏷️ ${l.category} • 〽️ ${l.level}`;

                    card.appendChild(badge);
                    card.appendChild(h);
                    card.appendChild(p);
                    card.appendChild(meta);

                    const openPreview = () => modal.open(l);
                    card.addEventListener("click", openPreview, { passive: true });
                    card.addEventListener("keydown", (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openPreview();
                        }
                    });

                    frag.appendChild(card);
                });

                if (!filtered.length) {
                    const empty = document.createElement("div");
                    empty.className = "class-card";
                    empty.style.gridColumn = "1 / -1";
                    empty.innerHTML = `<h3>Tidak ada hasil</h3><p>Coba kata kunci lain atau ganti kategori.</p><div class="meta">💡 Tip: klik Reset</div>`;
                    frag.appendChild(empty);
                }

                grid.appendChild(frag);
                showSkeleton(false);
            }, prefersReducedMotion() ? 0 : 200);
        };

        const bind = () => {
            buildSkeleton();

            const onInput = debounce(() => {
                state.filters.q = qInput.value;
                storage.set(LS.filters, state.filters);
                render();
            }, prefersReducedMotion() ? 0 : 120);

            qInput.addEventListener("input", onInput, { passive: true });

            clearBtn.addEventListener("click", () => {
                qInput.value = "";
                state.filters.q = "";
                storage.set(LS.filters, state.filters);
                render();
                qInput.focus({ preventScroll: true });
            }, { passive: true });

            resetBtn.addEventListener("click", () => {
                state.filters = { ...defaultFilters };
                storage.set(LS.filters, state.filters);
                qInput.value = "";
                render();
                toast.show("Reset", "Filter dikembalikan ke default.");
            }, { passive: true });
        };

        const syncInputs = () => {
            qInput.value = state.filters.q || "";
            clearBtn.style.display = state.filters.q ? "grid" : "none";
        };

        return { render, bind, syncInputs };
    })();

    // -------------------------
    // Learn (Focus mode)
    // -------------------------
    const learn = (() => {
        const listEl = $("#lessonList");
        const countEl = $("#lessonCount");
        const viewerFrame = $("#viewerFrame");
        const viewerEmpty = $("#viewerEmpty");
        const viewerTitle = $("#viewerTitle");
        const viewerMeta = $("#viewerMeta");
        const notesArea = $("#notesArea");
        const notesStatus = $("#notesStatus");
        const progressFill = $("#progressFill");
        const progressText = $("#progressText");

        const btnMarkDone = $("#markDone");
        const btnResetProgress = $("#resetProgress");
        const btnOpenModal = $("#openPreviewModal");
        const btnOpenExternal = $("#openExternal");

        let saveTimer = null;
        let viewerTimer = null;

        const computeProgress = () => {
            const total = lessons.length;
            const doneCount = lessons.filter(l => state.doneMap[l.id]).length;
            const pct = total ? Math.round((doneCount / total) * 100) : 0;
            return { total, doneCount, pct };
        };

        const renderProgress = () => {
            const { doneCount, total, pct } = computeProgress();
            progressFill.style.width = `${pct}%`;
            progressText.textContent = `${pct}% selesai (${doneCount}/${total})`;
            $("#statProgress").textContent = `${pct}%`;
            $("#statTotal").textContent = `${total}`;
        };

        const lessonBadgeClass = (lesson) => {
            if (state.doneMap[lesson.id]) return "ok";
            if (lesson.tag === "PREMIUM") return "lock";
            return "warn";
        };

        const renderList = () => {
            listEl.innerHTML = "";
            const frag = document.createDocumentFragment();

            lessons.forEach(lesson => {
                const it = document.createElement("div");
                it.className = "lesson-item" + (lesson.id === state.activeLessonId ? " active" : "");
                it.tabIndex = 0;

                const b = document.createElement("b");
                b.textContent = lesson.title;

                const sm = document.createElement("small");
                sm.textContent = lesson.desc;

                const row = document.createElement("div");
                row.className = "row";

                const p1 = document.createElement("span");
                p1.className = "pill-mini";
                p1.textContent = lesson.category;

                const p2 = document.createElement("span");
                p2.className = "pill-mini";
                p2.textContent = lesson.level;

                const p3 = document.createElement("span");
                p3.className = `pill-mini ${lessonBadgeClass(lesson)}`;
                p3.textContent = state.doneMap[lesson.id] ? "Selesai" : (lesson.tag === "PREMIUM" ? "Premium" : "Belum");

                row.appendChild(p1);
                row.appendChild(p2);
                row.appendChild(p3);

                it.appendChild(b);
                it.appendChild(sm);
                it.appendChild(row);

                const act = () => setActiveLesson(lesson.id, { announce: true });
                it.addEventListener("click", act, { passive: true });
                it.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        act();
                    }
                });

                frag.appendChild(it);
            });

            listEl.appendChild(frag);
            countEl.textContent = `${lessons.length} item`;
        };

        const loadViewer = (lesson) => {
            if (!lesson) return;

            viewerTitle.textContent = lesson.title;
            viewerMeta.textContent = `${lesson.category} • ${lesson.level} • ${state.doneMap[lesson.id] ? "Selesai ✅" : "Belum selesai"}`;

            viewerEmpty.style.display = "none";
            viewerFrame.style.display = "block";

            clearTimeout(viewerTimer);
            viewerTimer = null;

            viewerFrame.src = "";
            try {
                // Similar to modal: some sites block iframe. We keep UX stable; viewer is optional.
                viewerFrame.src = lesson.preview || lesson.url;

                viewerTimer = setTimeout(() => {
                    // If iframe content blocked, user can still open external.
                    // We avoid intrusive UI changes to keep design consistent.
                    // (Toast only, soft feedback)
                    toast.show("Info", "Kalau viewer kosong, kemungkinan situs membatasi iframe. Klik “Buka Sumber”.", 3200);
                }, prefersReducedMotion() ? 0 : 1600);
            } catch {
                toast.show("Error", "Gagal memuat viewer. Coba buka sumber.");
            }
        };

        const syncNotes = (lessonId) => {
            const text = state.notesMap[lessonId] || "";
            notesArea.value = text;
            notesStatus.textContent = "Auto-save";
        };

        const queueSaveNotes = () => {
            clearTimeout(saveTimer);
            notesStatus.textContent = "Menyimpan…";
            saveTimer = setTimeout(() => {
                const id = state.activeLessonId;
                if (!id) return;
                state.notesMap[id] = notesArea.value;
                storage.set(LS.notes, state.notesMap);
                notesStatus.textContent = "Tersimpan ✅";
            }, prefersReducedMotion() ? 0 : 360);
        };

        const bumpStreak = () => {
            const today = new Date();
            const ymd = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

            const last = state.lastStudy;
            if (last === ymd) return;

            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            const ymdY = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

            state.streak = (last === ymdY) ? (state.streak + 1) : 1;
            state.lastStudy = ymd;

            storage.set(LS.streak, state.streak);
            storage.set(LS.lastStudy, state.lastStudy);

            $("#statStreak").textContent = `${state.streak}🔥`;
        };

        const markDone = () => {
            const id = state.activeLessonId;
            if (!id) return;
            state.doneMap[id] = true;
            storage.set(LS.progress, { activeLessonId: state.activeLessonId, doneMap: state.doneMap });
            bumpStreak();
            renderList();
            renderProgress();
            toast.show("Nice!", "Materi ditandai selesai. Progres tersimpan.");
        };

        const resetProgress = () => {
            state.doneMap = {};
            storage.set(LS.progress, { activeLessonId: state.activeLessonId, doneMap: state.doneMap });
            renderList();
            renderProgress();
            toast.show("Reset", "Progres direset.");
        };

        const bind = () => {
            notesArea.addEventListener("input", queueSaveNotes, { passive: true });

            btnMarkDone.addEventListener("click", markDone, { passive: true });
            btnResetProgress.addEventListener("click", resetProgress, { passive: true });

            btnOpenModal.addEventListener("click", () => {
                const lesson = lessons.find(l => l.id === state.activeLessonId);
                if (!lesson) return toast.show("Info", "Pilih materi dulu ya.");
                modal.open(lesson);
            }, { passive: true });

            btnOpenExternal.addEventListener("click", () => {
                const lesson = lessons.find(l => l.id === state.activeLessonId);
                if (!lesson?.url) return toast.show("Info", "Pilih materi dulu ya.");
                window.open(lesson.url, "_blank", "noopener,noreferrer");
                toast.show("Dibuka", "Sumber dibuka di tab baru.");
            }, { passive: true });
        };

        const select = (lessonId, { announce = false } = {}) => {
            const lesson = lessons.find(l => l.id === lessonId);
            if (!lesson) return;

            state.activeLessonId = lesson.id;
            storage.set(LS.progress, { activeLessonId: state.activeLessonId, doneMap: state.doneMap });

            renderList();
            renderProgress();
            loadViewer(lesson);
            syncNotes(lesson.id);

            if (announce) toast.show("Siap", `Materi aktif: ${lesson.title}`);
        };

        const render = () => {
            renderList();
            renderProgress();

            // stats (home)
            $("#statTotal").textContent = `${lessons.length}`;
            $("#statStreak").textContent = `${state.streak}🔥`;

            // sync selected
            const active = lessons.find(l => l.id === state.activeLessonId) || lessons[0];
            if (active) {
                state.activeLessonId = active.id;
                storage.set(LS.progress, { activeLessonId: state.activeLessonId, doneMap: state.doneMap });
                loadViewer(active);
                syncNotes(active.id);
            } else {
                viewerTitle.textContent = "Pilih materi dulu";
                viewerMeta.textContent = "Preview aman di dalam viewer";
                viewerEmpty.style.display = "";
            }
        };

        return { render, bind, select };
    })();

    // -------------------------
    // Global: setActiveLesson (used by modal + learn list)
    // -------------------------
    function setActiveLesson(id, opts) {
        learn.select(id, opts);
    }

    // -------------------------
    // Home extras (quick chips + stats)
    // -------------------------
    const home = (() => {
        const quickWrap = $("#homeQuickChips");

        const renderQuickChips = () => {
            if (!quickWrap) return;
            quickWrap.innerHTML = "";
            const tops = categories.filter(c => c !== "All").slice(0, 6);

            tops.forEach(cat => {
                const s = document.createElement("span");
                s.className = "chip";
                s.textContent = cat;
                s.addEventListener("click", () => {
                    state.filters.cat = cat;
                    storage.set(LS.filters, state.filters);
                    router.go("explore");
                    toast.show("Filter", `Kategori: ${cat}`);
                }, { passive: true });
                quickWrap.appendChild(s);
            });
        };

        const renderStats = () => {
            const total = lessons.length;
            const doneCount = lessons.filter(l => state.doneMap[l.id]).length;
            const pct = total ? Math.round((doneCount / total) * 100) : 0;

            $("#statTotal").textContent = `${total}`;
            $("#statProgress").textContent = `${pct}%`;
            $("#statStreak").textContent = `${state.streak}🔥`;
        };

        const renderExtras = () => {
            renderQuickChips();
            renderStats();
            slider.build();
            // slider.start(); // disable

        };

        return { renderExtras };
    })();

    // -------------------------
    // Navbar + global binds
    // -------------------------
    const bindGlobal = () => {
        // year
        $("#year").textContent = new Date().getFullYear();

        // theme init + toggle (FINAL)
        initTheme();

        $("#darkToggle")?.addEventListener("click", () => {
            document.body.classList.add("theme-switching");

            applyTheme(stateThemeIsDark() ? "light" : "dark");

            if (state.route === "home") {
                slider.build();
            }

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    document.body.classList.remove("theme-switching");
                });
            });
        }, { passive: true });

        // data-go routing
        $$("[data-go]").forEach(el => {
            const go = el.getAttribute("data-go");
            if (!go) return;

            const handler = (e) => {
                // allow click on chips inside cards too
                e?.preventDefault?.();
                router.go(go);
            };

            el.addEventListener("click", handler, { passive: false });
            el.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    router.go(go);
                }
            });
        });

        // tips toast button
        $("#tipsToast")?.addEventListener("click", () => {
            toast.show("Reminder", "Target kecil dulu: 10–15 menit. Yang penting konsisten 🔥", 3400);
        }, { passive: true });

        // keyboard shortcuts
        window.addEventListener("keydown", (e) => {
            // Esc closes modal
            if (e.key === "Escape") {
                modal.close(true);
                return;
            }

            // Ignore when typing
            const tag = (document.activeElement?.tagName || "").toLowerCase();
            const typing = tag === "input" || tag === "textarea";
            if (typing) return;

            if (e.key === "e" || e.key === "E") router.go("explore");
            if (e.key === "t" || e.key === "T") router.go("tips");
            if (e.key === "l" || e.key === "L") router.go("belajar");

            if (e.key === "/") {
                e.preventDefault();
                router.go("explore");
                // focus is handled in router.activate("explore")
            }
        });

        // prevent background scroll when modal open (nice UX)
        const overlay = $("#modalOverlay");
        const lockScroll = () => document.body.style.overflow = "hidden";
        const unlockScroll = () => document.body.style.overflow = "";

        const obs = new MutationObserver((mutations) => {
            mutations.forEach(m => {
                if (m.target.classList.contains("open")) {
                    lockScroll();
                } else {
                    unlockScroll();
                }
            });
        });
        obs.observe(overlay, { attributes: true, attributeFilter: ["class"] });

        // init explore + learn binds
        explore.bind();
        learn.bind();
    };

    document.querySelectorAll(".lesson-card").forEach(card => {
        card.addEventListener("click", () => {
            const id = card.dataset.id;
            openLesson(id);
        });
    });

    function openLesson(id) {
        console.log("Buka materi:", id);
    }


    const tpl = document.getElementById("lessonTemplate");
    const grid = document.getElementById("lessonGrid");




    // -------------------------
    // Boot (FINAL)
    // -------------------------
    const boot = () => {
        bindGlobal();
        home.renderExtras();

        const hashRoute = location.hash.replace("#", "").toLowerCase();
        const initialRoute = hashRoute || "home";

        history.replaceState({ route: initialRoute }, "", `#${initialRoute}`);
        router.go(initialRoute, { silent: true });

        toast.show("Siap!", "Aplikasi siap digunakan.", 2000);
    };

    boot();


})();
