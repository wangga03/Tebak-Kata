const fs = require('fs');

const generateNav = (activePage) => `
<nav class="fixed bottom-0 w-full z-50 max-w-[480px] left-1/2 -translate-x-1/2 bg-surface dark:bg-background shadow-[0_-1px_3px_rgba(0,0,0,0.1)] shadow-lg">
<div class="flex justify-around items-center w-full px-2 py-3">
<a class="flex flex-col items-center justify-center ${activePage === 'play' ? 'bg-primary-container text-on-primary-container rounded-xl' : 'text-on-surface-variant hover:bg-surface-container-low'} px-4 py-1 transition-all duration-200 active:scale-90" href="index.html">
<span class="material-symbols-outlined"${activePage === 'play' ? ' style="font-variation-settings: \\'FILL\\' 1;"' : ''}>videogame_asset</span>
<span class="font-label-sm text-label-sm">Play</span>
</a>
<a class="flex flex-col items-center justify-center ${activePage === 'review' ? 'bg-primary-container text-on-primary-container rounded-xl' : 'text-on-surface-variant hover:bg-surface-container-low'} px-4 py-1 transition-all duration-200 active:scale-90" href="analitik.html">
<span class="material-symbols-outlined"${activePage === 'review' ? ' style="font-variation-settings: \\'FILL\\' 1;"' : ''}>fact_check</span>
<span class="font-label-sm text-label-sm">Review</span>
</a>
<a class="flex flex-col items-center justify-center ${activePage === 'manage' ? 'bg-primary-container text-on-primary-container rounded-xl' : 'text-on-surface-variant hover:bg-surface-container-low'} px-4 py-1 transition-all duration-200 active:scale-90" href="kelola_soal.html">
<span class="material-symbols-outlined"${activePage === 'manage' ? ' style="font-variation-settings: \\'FILL\\' 1;"' : ''}>settings_suggest</span>
<span class="font-label-sm text-label-sm">Manage</span>
</a>
<a class="flex flex-col items-center justify-center ${activePage === 'profile' ? 'bg-primary-container text-on-primary-container rounded-xl' : 'text-on-surface-variant hover:bg-surface-container-low'} px-4 py-1 transition-all duration-200 active:scale-90" href="profil.html">
<span class="material-symbols-outlined"${activePage === 'profile' ? ' style="font-variation-settings: \\'FILL\\' 1;"' : ''}>person</span>
<span class="font-label-sm text-label-sm">Profile</span>
</a>
</div>
</nav>
`;

function replaceNav(filePath, activePage) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    const startIdx = content.indexOf('<nav class="fixed bottom-0');
    if (startIdx === -1) return;
    const endIdx = content.indexOf('</nav>', startIdx) + 6;
    
    content = content.substring(0, startIdx) + generateNav(activePage).trim() + content.substring(endIdx);
    fs.writeFileSync(filePath, content);
}

replaceNav('public/analitik.html', 'review');
replaceNav('public/kelola_soal.html', 'manage');
replaceNav('public/profil.html', 'profile');
console.log('Navbars updated');
