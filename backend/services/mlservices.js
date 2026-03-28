import axios from "axios";

export const callMLService = async (readings) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/predict",
      { readings }
    );

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", error.message);
    throw new Error("Failed to connect to ML service");
  }
};