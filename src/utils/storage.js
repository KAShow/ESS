const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const saveSurvey = async (surveyData) => {
    try {
        const response = await fetch(`${API_URL}/surveys`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyData)
        });

        if (!response.ok) {
            throw new Error('Failed to save survey');
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error saving survey:', error);
        return { success: false, error: error.message };
    }
};

export const getAllSurveys = async () => {
    try {
        const response = await fetch(`${API_URL}/surveys`);
        if (!response.ok) {
            throw new Error('Failed to fetch surveys');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching surveys:', error);
        return [];
    }
};
