import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const createLesson = async (prompt) => {
    try {
        const response = await axios.post(BASE_URL, { prompt });
        return response.data;
    } catch (error) {
        console.error("Error while fetching lesson:", error);
        throw error; // you can re-throw the error to handle it in the calling function or component
    }
};
