import axios from 'axios';

const API_URL = 'http://localhost:10000/api';

export const saveSurvey = async (surveyData) => {
  try {
    const response = await axios.post(`${API_URL}/surveys`, {
      services: surveyData
    });
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error saving survey:', error);
    return { success: false, error };
  }
};

export const getAllSurveys = async () => {
  try {
    const response = await axios.get(`${API_URL}/surveys`);
    return response.data;
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error;
  }
};
