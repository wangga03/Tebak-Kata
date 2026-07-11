const fs = require('fs');
let game = fs.readFileSync('public/game.html', 'utf8');
let benar = fs.readFileSync('public/feedback-benar.html', 'utf8');
let salah = fs.readFileSync('public/feedback-salah.html', 'utf8');

let benarStart = benar.indexOf('<div class="fixed inset-0');
let benarEnd = benar.indexOf('<!-- Scripts for Atmosphere -->');
let benarHTML = benar.substring(benarStart, benarEnd)
    .replace('id="feedback-overlay"', 'id="feedback-benar-modal" style="display:none;"')
    .replace('nextLevel()', 'closeFeedbackBenar()');

let salahStart = salah.indexOf('<div class="fixed inset-0');
let salahEnd = salah.indexOf('<!-- Background Shader');
let salahHTML = salah.substring(salahStart, salahEnd)
    .replace('id="feedbackOverlay"', 'id="feedback-salah-modal" style="display:none;"')
    .replace('onclick="hideOverlay()"', 'onclick="closeFeedbackSalah()"')
    .replace('<button class="w-full py-4 bg-error', '<button onclick="closeFeedbackSalah()" class="w-full py-4 bg-error');

let gameBodyEnd = game.indexOf('</body>');
game = game.substring(0, gameBodyEnd) + '\n<!-- Feedback Modals -->\n' + benarHTML + '\n' + salahHTML + '\n' + game.substring(gameBodyEnd);

game = game.replace('alert(\'Tebakan Anda Benar! 🎉\');\n                loadRandomQuestion();', 'document.getElementById(\'feedback-benar-modal\').style.display = \'flex\';');
game = game.replace('alert(\'Ops, salah. Coba lagi!\');', 'document.getElementById(\'feedback-salah-modal\').style.display = \'flex\';');

let scriptEnd = game.indexOf('</script>', game.indexOf('document.getElementById(\'btn-check\')'));
game = game.substring(0, scriptEnd) + '\n        function closeFeedbackBenar() { document.getElementById(\'feedback-benar-modal\').style.display = \'none\'; loadRandomQuestion(); }\n        function closeFeedbackSalah() { document.getElementById(\'feedback-salah-modal\').style.display = \'none\'; }\n    ' + game.substring(scriptEnd);

fs.writeFileSync('public/game.html', game);
console.log('Injected successfully');
