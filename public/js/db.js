// Fetch API Database Wrapper for Vercel Serverless Functions

async function getQuestions() {
    try {
        const response = await fetch('/api/get-questions');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

async function addQuestion(questionData) {
    let level = 1;
    if (questionData.levelText.toLowerCase() === 'sedang') level = 2;
    if (questionData.levelText.toLowerCase() === 'sulit') level = 3;

    try {
        const response = await fetch('/api/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: questionData.question,
                answer: questionData.answer.toUpperCase(),
                level: level,
                category: questionData.category
            })
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
}

async function deleteQuestion(id) {
    try {
        const response = await fetch(`/api/delete-question?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}
