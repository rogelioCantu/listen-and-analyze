import axios from "axios";
import Artist from "../interfaces/ArtistInterface";
import Track from "../interfaces/TrackInterface";

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

export const fetchTrackSuggestion = async ({ tracks }: { tracks: Track[] }) => {
  const trackList = {
    tra: tracks?.map((track) => track.name).join(", "),
  };
  try {
    const response = await axiosInstance.post(
      "/openai/get-track-suggestion",
      trackList
    );
    console.log(response);
    const item = response.data;
    console.log(item);
    console.log(JSON.stringify(item));
    return {
      name: item.name,
      artists: item.artists,
      trackUrl: item.trackUrl,
      albumImageUrl: item.albumImageUrl,
    };
  } catch (error) {
    console.error("Error getting track suggestion:", error);
    throw error;
  }
};

// const tracks = response.data.items.map((item) => {
//   console.log(item.album.images[0].url);
//   return {
//     name: item.name,
//     artists: item.artists.map((artist) => artist.name).join(", "),
//     trackUrl: item.external_urls.spotify,
//     albumImageUrl: item.album.images[0].url,
//   };
// });
// res.json(tracks);
