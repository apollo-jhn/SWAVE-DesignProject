export const postRequest = async (url, requestFields, options = {}) => {
  const requestData = {
    request: requestFields,
  };

  const defaultOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
    ...options, // Override defaults if custom options are provided
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json(); // Return parsed JSON data
  } catch (error) {
    console.error("API request failed:", error);
    throw error; // Re-throw to let the caller handle it
  }
};


export const sendRequest = async (url, requestData) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the parsed JSON data
  } catch (error) {
    console.error("Error in sendRequest:", error);
    throw error; // Re-throw to let the caller handle it
  }
};

