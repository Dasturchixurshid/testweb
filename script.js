document.addEventListener("DOMContentLoaded", function () {
    const profileIcon = document.getElementById("profile-icon");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const menuItems = document.querySelectorAll(".menu-item");
    let menuTimeout, submenuTimeout;

    // Barcha menyularni yopish
    function closeAllMenus() {
        document.querySelectorAll(".submenu, .sub-submenu").forEach(menu => {
            menu.style.opacity = "0";
            setTimeout(() => {
                menu.style.display = "none";
            }, 200); // Animatsiya uchun kutish
        });
        dropdownMenu.style.display = "none"; // Dropdown menyuni ham yopish
    }

    // Menyuni yopish uchun timeoutni yangilash
    function resetMenuTimeout() {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(closeAllMenus, 10000); // 10 soniya
    }

    // Profil ikonkasi ustiga bosganda dropdownni ochish yoki yopish
    profileIcon.addEventListener("click", function () {
        if (dropdownMenu.style.display === "block") {
            closeAllMenus(); // Ochiq bo‘lsa yopish
        } else {
            closeAllMenus();
            dropdownMenu.style.display = "block";
            dropdownMenu.style.opacity = "1";
            resetMenuTimeout();
        }
    });

    // Dropdown menyusining hover eventlarini boshqarish
    dropdownMenu.addEventListener("mouseenter", () => clearTimeout(menuTimeout));
    dropdownMenu.addEventListener("mouseleave", resetMenuTimeout);

    // Sozlamalar va mavzu menyulari uchun hover eventlarini boshqarish
    document.querySelectorAll("#settings-item, #theme-item").forEach(item => {
        item.addEventListener("mouseenter", function () {
            const submenu = this.querySelector(".submenu, .sub-submenu");
            if (submenu) {
                clearTimeout(submenuTimeout);
                submenu.style.display = "block";
                submenu.style.opacity = "1";
            }
        });

        item.addEventListener("mouseleave", function () {
            const submenu = this.querySelector(".submenu, .sub-submenu");
            if (submenu) {
                submenuTimeout = setTimeout(() => {
                    submenu.style.opacity = "0";
                    setTimeout(() => (submenu.style.display = "none"), 200);
                }, 10000);
            }
        });
    });

    // Dinamik sahifa yuklash funksiyasi
    function loadPage(url) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById("content").innerHTML = data;
            })
            .catch(error => console.error("Sahifa yuklashda xato:", error));
    }

    // Hozirgi sahifani aniqlash
    const currentPage = window.location.pathname.split("/").pop();

    // Menyularni boshqarish va faqat bitta menyuni active qilish
    menuItems.forEach(item => {
        const link = item.querySelector("a");
        const pageUrl = link.getAttribute("href");

        // Hozirgi sahifa bilan mos kelgan menyuni active qilish
        if (pageUrl === currentPage) {
            item.classList.add("active");
        }

        // Menyu bosilganda active klassini yangilash
        item.addEventListener("click", function () {
            // Boshqa menyulardan active klassini olib tashlash
            menuItems.forEach(el => el.classList.remove("active"));

            // Tanlangan menyuga active klassini qo‘shish
            this.classList.add("active");

            // Yangi sahifani yuklash
            const pageUrl = this.getAttribute("data-page-url");
            loadPage(pageUrl); // Agar kerak bo‘lsa, sahifa yuklash
        });
    });

    // Sahifa yuklangandan keyin, bosh menyuni o'z holatiga qaytarish
    window.addEventListener('popstate', resetMenuState);
});
