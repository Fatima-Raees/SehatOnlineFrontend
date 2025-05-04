interface IntentRequest {
    userInput: string;
  }
  
  interface IntentResponse {
    intent: string;
    appointmentScore: number;
    symptomScore: number;
  }
  
  // Export handler function for direct import
  export async function handler(req: { method: string; body: IntentRequest }, res: { status: (code: number) => { json: (data: any) => void } }) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
    
    console.log("Received intent request:", req.body);
    
    try {
      const { userInput } = req.body;
      
      if (!userInput || typeof userInput !== 'string') {
        return res.status(400).json({ message: 'Valid userInput is required' });
      }
      
      const lowercaseInput = userInput.toLowerCase();
      
      // Define keyword sets with weights for more accurate intent detection
      const appointmentKeywords = {
        high: ['appointment', 'schedule', 'book', 'doctor', 'visit', 'meet'],
        medium: ['available', 'slot', 'time', 'date', 'calendar', 'consultation'],
        low: ['when', 'need to see', 'hours', 'office', 'clinic', 'hospital']
      };
      
      const symptomKeywords = {
        high: ['pain', 'hurt', 'sick', 'fever', 'cough', 'symptom'],
        medium: ['headache', 'nausea', 'vomiting', 'diarrhea', 'rash', 'sore'],
        low: ['feeling', 'tired', 'fatigue', 'dizzy', 'swollen', 'ache']
      };
      
      let appointmentScore = 0;
      let symptomScore = 0;
      
      // Calculate score with different weights
      appointmentKeywords.high.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) appointmentScore += 3;
      });
      
      appointmentKeywords.medium.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) appointmentScore += 2;
      });
      
      appointmentKeywords.low.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) appointmentScore += 1;
      });
      
      symptomKeywords.high.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) symptomScore += 3;
      });
      
      symptomKeywords.medium.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) symptomScore += 2;
      });
      
      symptomKeywords.low.forEach(keyword => {
        if (lowercaseInput.includes(keyword)) symptomScore += 1;
      });
      
      let intent: string;
      
      // Check for special case - zero scores
      if (appointmentScore === 0 && symptomScore === 0) {
        // User input contains no keywords we recognize
        intent = 'unknown';
      } else if (appointmentScore > symptomScore) {
        intent = 'appointment';
      } else {
        intent = 'symptom';
      }
      
      console.log(`Intent classified: ${intent} (appointment: ${appointmentScore}, symptom: ${symptomScore})`);
      
      return res.status(200).json({ 
        intent, 
        appointmentScore, 
        symptomScore 
      } as IntentResponse);
    } catch (error: any) {
      console.error('Error classifying intent:', error);
      return res.status(500).json({ 
        message: 'Error processing request',
        error: error.message 
      });
    }
  }
  
  // Default export for Next.js API routes
  export default handler;