const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8001';

export const predictPrice = async (formData) => {
  try {
    const response = await fetch(`${API_BASE}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // backend expects a payload shaped as { features: { ... } }
      body: JSON.stringify({ features: formData }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
};
