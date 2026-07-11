// Fetch API Database Wrapper for Vercel Serverless Functions

async function getQuestions() {
    try {
        const response = await fetch('/api/questions');
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
        const response = await fetch('/api/questions', {
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
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.details || data.error || 'Network response was not ok');
        }
        return data;
    } catch (error) {
        console.error('Error adding question:', error);
        alert('Error Server: ' + error.message);
        throw error;
    }
}

async function deleteQuestion(id) {
    try {
        const response = await fetch(`/api/questions?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

async function getAdminProfile() {
    try {
        const response = await fetch('/api/get-admin');
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching admin:', error);
        return { username: '' };
    }
}

async function updateAdminProfile(username, password) {
    try {
        const response = await fetch('/api/update-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.details || data.error || 'Network response was not ok');
        }
        return data;
    } catch (error) {
        console.error('Error updating admin:', error);
        alert('Error Server: ' + error.message);
        throw error;
    }
}

async function loginAdmin(username, password) {
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        return data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
}
