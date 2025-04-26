export const initialIncidents = [
    { 
      id: 1, 
      title: "Biased Recommendation Algorithm", 
      description: "Algorithm consistently favored certain demographics...", 
      severity: "Medium", 
      reported_at: "2025-03-15T10:00:00Z" 
    },
    { 
      id: 2, 
      title: "LLM Hallucination in Critical Info", 
      description: "LLM provided incorrect safety procedure information...", 
      severity: "High", 
      reported_at: "2025-04-01T14:30:00Z" 
    },
    { 
      id: 3, 
      title: "Minor Data Leak via Chatbot", 
      description: "Chatbot inadvertently exposed non-sensitive user metadata...", 
      severity: "Low", 
      reported_at: "2025-03-20T09:15:00Z" 
    }
  ];
  
  export const addNewIncident = (incidents, newIncident) => {
    const incident = {
      ...newIncident,
      id: incidents.length + 1,
      reported_at: new Date().toISOString()
    };
    return [...incidents, incident];
  };