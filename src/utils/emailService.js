import emailjs from '@emailjs/browser';

// تكوين EmailJS
const SERVICE_ID = 'service_flh4jre';  // من EmailJS
const TEMPLATE_ID = 'template_wcnw048'; // من EmailJS
const PUBLIC_KEY = '_0xcj1msw7Au_5ebk';   // من EmailJS

export const sendSurveyEmail = async (surveyData) => {
    try {
        const templateParams = {
            name: surveyData.name || 'زائر',
            email: surveyData.email || 'غير متوفر',
            department: surveyData.department || 'غير متوفر',
            services: Object.entries(surveyData.services || {})
                .map(([service, data]) => `${service}: ${data.rating}/5 - ${data.notes || 'لا توجد ملاحظات'}`)
                .join('\n')
        };

        const result = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        return { success: true, result };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
