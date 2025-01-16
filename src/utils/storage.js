const STORAGE_KEY = 'satisfaction-surveys';

export const saveSurvey = async (surveyData) => {
    try {
        // Get existing surveys
        const currentData = getAllSurveys();
        
        // Add unique ID and date to the survey
        const newSurvey = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...surveyData
        };
        
        // Add the new survey
        currentData.push(newSurvey);
        
        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
        
        return { success: true, data: newSurvey };
    } catch (error) {
        console.error('Error saving survey:', error);
        return { success: false, error: error.message };
    }
};

export const getAllSurveys = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error reading surveys:', error);
        return [];
    }
};
