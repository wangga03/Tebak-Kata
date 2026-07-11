document.addEventListener('DOMContentLoaded', () => {
    console.log("WordFlow App Initialized");
});

function selectRole(role) {
    console.log("Role selected:", role);
    if (role === 'Super Admin') {
        window.location.href = 'dashboard.html';
    } else if (role === 'Admin') {
        window.location.href = 'kelola_soal.html';
    } else if (role === 'Partisipan') {
        window.location.href = 'game.html';
    }
}

function goBack() {
    window.history.back();
}
