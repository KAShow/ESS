import emailjs from '@emailjs/browser';

// تكوين EmailJS
const SERVICE_ID = 'service_xd3osb7';  // من EmailJS
const TEMPLATE_ID = 'template_wcnw048'; // من EmailJS
const PUBLIC_KEY = '_0xcj1msw7Au_5ebk';   // من EmailJS

const formatRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(3 - rating);
};

export const sendSurveyEmail = async (surveyData) => {
    try {
        // تحويل بيانات الاستبيان إلى نص منسق
        const servicesText = Object.entries(surveyData)
            .filter(([key]) => key !== 'id' && key !== 'date')
            .map(([service, data]) => {
                return `${service}:
التقييم: ${formatRating(data.rating)}
الملاحظات: ${data.notes || 'لا توجد ملاحظات'}`
            })
            .join('\n\n');

        const templateParams = {
            survey_date: new Date().toLocaleDateString('ar'),
            survey_details: servicesText,
        };

        const response = await emailjs.send(
            SERVICE_ID,
            TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        return { success: true, response };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
