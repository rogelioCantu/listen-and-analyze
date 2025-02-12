import User from "../interfaces/UserInterface";
import Artist from "../interfaces/ArtistInterface";
import { useData } from "../data/DataContext";
import { fetchArtistSuggestion } from "../data/DataFetcher";
import { useState } from "react";
import axios from "axios";

const TopListening = ({ user }: { user: User }) => {
  const { tracks, artists } = useData();
  const [artistSuggestion, setArtistSuggestion] = useState("");

  const [trackSuggestion, setTrackSuggestion] = useState("");

  const getArtistSuggestion = async () => {
    fetchArtistSuggestion({ artists: artists as Artist[] })
      .then((res) => {
        setArtistSuggestion(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getArtistSuggestion = async () => {
  //   const artistList = {
  //     art: artists?.map((artist) => artist.name).join(", "),
  //   };
  //   axios
  //     .post("http://localhost:5000/openai/get-artist-suggestion", artistList, {
  //       withCredentials: true,
  //       headers: { "Content-Type": "application/json" },
  //     })
  //     .then((res) => {
  //       setArtistSuggestion(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const getTrackSuggestion = async () => {
    const trackList = {
      tra: tracks?.map((track) => track.name).join(", "),
    };
    axios
      .post("http://localhost:5000/openai/get-track-suggestion", trackList, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        setTrackSuggestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>{user.profile.id}</h1>
      <div>
        <h2>Top Tracks</h2>
        {tracks ? (
          <div>
            <ul>
              {tracks.map((track, index) => (
                <li key={index}>{track.name}</li> // Render your track data
              ))}
            </ul>
            <button onClick={getTrackSuggestion}>Get Track Suggestion</button>
            {trackSuggestion == "" ? <p></p> : <p>{trackSuggestion}</p>}
          </div>
        ) : (
          <p>Loading tracks...</p>
        )}
      </div>

      <div>
        <h2>Top Artists</h2>
        {artists ? (
          <div>
            <ul>
              {artists.map((artist, index) => (
                <li key={index}>{artist.name}</li> // Render your album data
              ))}
            </ul>
            <button onClick={getArtistSuggestion}>Get Artist Suggestion</button>
            {artistSuggestion == "" ? <p></p> : <p>{artistSuggestion}</p>}
          </div>
        ) : (
          <p>Loading albums...</p>
        )}
      </div>
    </div>
  );
};

export default TopListening;
