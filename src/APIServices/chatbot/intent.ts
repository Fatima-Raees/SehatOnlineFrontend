interface IntentRequest {
    userInput: string;
  }
  
  interface IntentResponse {
    intent: string;
    appointmentScore: number;
    symptomScore: number;
  }
  
 
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
        high: [
          'appointment', 'schedule', 'book', 'doctor', 'visit', 'meet',
          'urgent', 'emergency', 'reschedule', 'cancel', 'confirm', 
          'reservation', 'booking', 'consultation', 'checkup', 'follow-up',
          'appointment request', 'see doctor', 'medical visit', 'specialist'
        ],
        medium: [
          'available', 'slot', 'time', 'date', 'calendar', 'consultation',
          'availability', 'opening', 'session', 'appointment time', 
          'appointment date', 'next available', 'earliest', 'upcoming',
          'regular visit', 'routine checkup', 'virtual appointment', 
          'telehealth', 'video call', 'in-person', 'office hours'
        ],
        low: [
          'when', 'need to see', 'hours', 'office', 'clinic', 'hospital',
          'healthcare', 'provider', 'practice', 'medical center', 'facility',
          'reception', 'front desk', 'waiting room', 'patient portal',
          'medical record', 'insurance', 'copay', 'registration',
          'paperwork', 'new patient', 'returning patient', 'walk-in'
        ]
      };
      
      const symptomKeywords = {
        high: [
          'pain', 'hurt', 'sick', 'fever', 'cough', 'symptom', 'emergency', 
          'severe', 'acute', 'intense', 'unbearable', 'excruciating', 
          'shortness of breath', 'chest pain', 'bleeding', 'unconscious', 
          'seizure', 'collapse', 'stroke', 'heart attack', 'trauma', 'critical'
        ],
        medium: [
          'headache', 'nausea', 'vomiting', 'diarrhea', 'rash', 'sore',
          'infection', 'inflammation', 'swelling', 'congestion', 'migraine',
          'cramps', 'persistent', 'discomfort', 'burning', 'joint pain',
          'muscle pain', 'stiffness', 'allergic reaction', 'bruising',
          'moderate', 'recurring', 'sprain', 'strain'
        ],
        low: [
          'feeling', 'tired', 'fatigue', 'dizzy', 'swollen', 'ache',
          'mild', 'occasional', 'tenderness', 'itching', 'tickle', 'sniffle',
          'runny nose', 'stuffy', 'dry skin', 'minor', 'slight', 'temporary',
          'lethargy', 'drowsiness', 'weakness', 'malaise', 'bloating',
          'irritation', 'sensitivity', 'discoloration'
        ]
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
  
 
  export default handler;