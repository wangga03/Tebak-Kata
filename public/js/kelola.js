document.addEventListener('DOMContentLoaded', () => {
    const listContainer = document.getElementById('question-list');
    const btnTambah = document.querySelector('button.bg-secondary-container');

    // Memuat soal dari database
    async function loadQuestions() {
        listContainer.innerHTML = '<div class="text-center p-4">Memuat data...</div>';
        const questions = await getQuestions();
        listContainer.innerHTML = '';

        if (questions.length === 0) {
            listContainer.innerHTML = '<div class="text-center p-4">Belum ada soal.</div>';
            return;
        }

        questions.forEach(q => {
            const card = createCard(q.id, q.question, q.answer, q.level, q.levelText);
            listContainer.appendChild(card);
        });
    }

    function createCard(id, questionText, answerText, levelNum, levelText) {
        const div = document.createElement('div');
        div.className = "bg-surface-container-lowest p-5 rounded-xl border border-surface-variant tile-shadow group animate-in fade-in slide-in-from-bottom-4 duration-500";
        
        let colorClass = "bg-tertiary-container text-on-tertiary-container";
        if (levelNum === 2) colorClass = "bg-secondary-container text-on-secondary-container";
        if (levelNum === 3) colorClass = "bg-primary-fixed text-on-primary-fixed-variant";

        div.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-2">
                    <span class="${colorClass} px-3 py-1 rounded-full font-label-sm text-label-sm">Level ${levelNum}</span>
                    <span class="text-[10px] font-bold text-on-surface-variant opacity-60">ID: #${id || 'NEW'}</span>
                </div>
                <div class="flex gap-2">
                    <button class="p-2 text-primary hover:bg-primary-fixed rounded-lg transition-colors squishy-btn btn-save" title="Save Changes">
                        <span class="material-symbols-outlined">save</span>
                    </button>
                    <button class="p-2 text-error hover:bg-error-container rounded-lg transition-colors squishy-btn btn-delete" title="Delete Question">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
            </div>
            <div class="space-y-4">
                <div class="relative">
                    <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1">Pertanyaan</label>
                    <input class="input-q w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-1 py-2 font-body-md text-body-md text-on-surface transition-all outline-none" placeholder="Masukkan pertanyaan..." type="text" value="${questionText || ''}"/>
                </div>
                <div class="relative">
                    <label class="block font-label-sm text-label-sm text-on-surface-variant mb-1 ml-1">Kunci Jawaban</label>
                    <input class="input-a w-full bg-transparent border-b-2 border-outline-variant focus:border-primary focus:ring-0 px-1 py-2 font-tile-text text-tile-text tracking-widest text-primary uppercase transition-all outline-none" placeholder="JAWABAN" type="text" value="${answerText || ''}"/>
                </div>
            </div>
        `;

        const btnSave = div.querySelector('.btn-save');
        const btnDelete = div.querySelector('.btn-delete');
        const inputQ = div.querySelector('.input-q');
        const inputA = div.querySelector('.input-a');

        btnSave.addEventListener('click', async () => {
            const q = inputQ.value;
            const a = inputA.value;
            if (!q || !a) {
                alert("Pertanyaan dan Jawaban tidak boleh kosong");
                return;
            }
            btnSave.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span>';
            try {
                // If it's a new unsaved card (no id), add it.
                // Currently DB doesn't support edit/update easily via API, so we just add new.
                await addQuestion({
                    question: q,
                    answer: a,
                    levelText: levelText || 'Mudah',
                    category: 'General'
                });
                alert("Berhasil disimpan!");
                loadQuestions();
            } catch (err) {
                console.error(err);
                btnSave.innerHTML = '<span class="material-symbols-outlined">save</span>';
            }
        });

        btnDelete.addEventListener('click', async () => {
            if (!id) {
                div.remove(); // Just remove unsaved card
                return;
            }
            if (confirm("Yakin ingin menghapus soal ini?")) {
                btnDelete.innerHTML = '<span class="material-symbols-outlined animate-spin">refresh</span>';
                try {
                    await deleteQuestion(id);
                    div.remove();
                } catch (err) {
                    console.error(err);
                    btnDelete.innerHTML = '<span class="material-symbols-outlined">delete</span>';
                }
            }
        });

        return div;
    }

    // Add button logic moved to HTML directly linking to tambah_soal.html

    loadQuestions();
});
