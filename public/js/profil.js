document.addEventListener('DOMContentLoaded', async () => {
    const inputUsername = document.getElementById('username');
    const inputNewPass = document.getElementById('new_password');
    const inputConfirmPass = document.getElementById('confirm_password');
    const btnSave = document.getElementById('btn-save');

    // Load admin profile
    const profile = await getAdminProfile();
    if (profile && profile.username) {
        inputUsername.value = profile.username;
        // Ganti header username
        const headerName = document.querySelector('h2.font-headline-lg-mobile');
        if(headerName) headerName.textContent = profile.username;
    }

    btnSave.addEventListener('click', async () => {
        const username = inputUsername.value.trim();
        const newPass = inputNewPass.value;
        const confirmPass = inputConfirmPass.value;

        if (!username) {
            alert('Username tidak boleh kosong');
            return;
        }

        if (newPass !== confirmPass) {
            alert('Password dan Konfirmasi Password tidak cocok!');
            return;
        }

        if (!newPass) {
            alert('Silakan masukkan password baru untuk disimpan.');
            return;
        }

        btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span> Menyimpan...';
        btnSave.disabled = true;

        try {
            await updateAdminProfile(username, newPass);
            alert('Profil berhasil diperbarui!');
            inputNewPass.value = '';
            inputConfirmPass.value = '';
            
            const headerName = document.querySelector('h2.font-headline-lg-mobile');
            if(headerName) headerName.textContent = username;

        } catch (err) {
            console.error(err);
            // alert di db.js
        } finally {
            btnSave.innerHTML = `Simpan Perubahan <span class="material-symbols-outlined">save</span>`;
            btnSave.disabled = false;
        }
    });

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            if (confirm("Apakah Anda yakin ingin logout?")) {
                window.location.href = 'index.html';
            }
        });
    }
});
