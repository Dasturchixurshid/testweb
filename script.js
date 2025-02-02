// Profile ikonasi bosilganda yoki ustiga sichqoncha olib borilganda menyuni ko'rsatish
document.getElementById('profile-icon').addEventListener('mouseenter', function() {
    var dropdown = document.getElementById('dropdown-menu');
    dropdown.style.display = 'block';  // Menyuni ko'rsatish
    setTimeout(function() {
        dropdown.style.display = 'none';  // 2 soniya o'tgach, menyuni yashirish
    }, 2000);  // 2000 millisekund = 2 soniya
});

// Submenu va sub-submenu ni 2 soniyadan keyin yopish
document.querySelectorAll('#settings-item, #theme-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const submenu = item.querySelector('.submenu, .sub-submenu');
        if (submenu) {
            // Submenuni ko'rsatish
            submenu.style.display = 'block';
            submenu.style.opacity = '1';

            // 2 soniyadan keyin yopish
            setTimeout(() => {
                submenu.style.opacity = '0';
                setTimeout(() => {
                    submenu.style.display = 'none';
                }, 200); // Animatsiya vaqti
            }, 2000); // 2 soniya
        }
    });

    item.addEventListener('mouseleave', () => {
        const submenu = item.querySelector('.submenu, .sub-submenu');
        if (submenu) {
            submenu.style.display = 'none';  // Menyuni tezda yopish
        }
    });
});
