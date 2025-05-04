export const fetchChatbotResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Chat service not found. Please try again later.');
      }
      if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment before trying again.');
      }
      if (response.status >= 500) {
        throw new Error('Server error. Please try again later.');
      }
      throw new Error('Failed to get response from the chatbot service');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
      throw new Error('Unable to connect to the chat service. Please check your connection.');
    }
    throw error;
  }
};