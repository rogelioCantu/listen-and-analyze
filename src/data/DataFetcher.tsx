import axios from "axios";
import Artist from "../interfaces/ArtistInterface";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000", // Set a base URL for all requests
  withCredentials: true, // Enable credentials (cookies, etc.) for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchArtistSuggestion = async ({
  artists,
}: {
  artists: Artist[];
}) => {
  const artistList = {
    art: artists.map((artist) => artist.name).join(", "),
  };
  try {
    const response = await axiosInstance.post(
      "/openai/get-artist-suggestion",
      artistList
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};
