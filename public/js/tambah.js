document.addEventListener('DOMContentLoaded', () => {
    const btnSave = document.getElementById('btn-save-new');
    const inputQuestion = document.getElementById('question');
    const inputAnswer = document.getElementById('answer');

    btnSave.addEventListener('click', async () => {
        const questionText = inputQuestion.value.trim();
        const answerText = inputAnswer.value.trim().toUpperCase();

        if (!questionText || !answerText) {
            alert('Pertanyaan dan jawaban tidak boleh kosong!');
            return;
        }

        // Find active difficulty
        const diffButtons = document.querySelectorAll('.difficulty-btn');
        let selectedDiff = 'mudah';
        diffButtons.forEach(btn => {
            if (btn.classList.contains('bg-primary')) {
                selectedDiff = btn.dataset.diff;
            }
        });

        let levelNum = 1;
        if (selectedDiff === 'sedang') levelNum = 2;
        if (selectedDiff === 'sulit') levelNum = 3;

        btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin" data-weight="fill">refresh</span> Menyimpan...';
        btnSave.disabled = true;

        try {
            await addQuestion({
                question: questionText,
                answer: answerText,
                levelText: selectedDiff,
                category: 'General'
            });
            // Go back
            window.location.href = 'kelola_soal.html';
        } catch (err) {
            console.error(err);
            alert('Gagal menyimpan soal: ' + err.message);
            btnSave.innerHTML = `<span class="material-symbols-outlined" data-weight="fill">save</span><span>Simpan Soal</span>`;
            btnSave.disabled = false;
        }
    });
});
