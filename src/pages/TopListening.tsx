import User from "../interfaces/UserInterface";
import Artist from "../interfaces/ArtistInterface";
import Track from "../interfaces/TrackInterface";
import { TrackCarousel } from "../components/Carousels/TrackCarousel";
import { ArtistCarousel } from "../components/Carousels/ArtistCarousel";
import TrackCard from "../components/Cards/TrackCard";
import ArtistCard from "../components/Cards/ArtistCard";
import { useData } from "../data/DataContext";
import {
  fetchArtistSuggestion,
  fetchTrackSuggestion,
} from "../data/DataFetcher";
import { useState } from "react";

const TopListening = ({ user }: { user: User }) => {
  const { tracks, artists } = useData();
  const [trackData, setTrackData] = useState<Track | null>(null);
  const [artistSuggestion, setArtistSuggestion] = useState("");
  const [showTrackData, setShowTrackData] = useState(false);

  const [trackSuggestion, setTrackSuggestion] = useState("");

  const getArtistSuggestion = async () => {
    fetchArtistSuggestion({ artists: artists as Artist[] })
      .then((res) => {
        setArtistSuggestion(res);
        console.log(artistSuggestion);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTrackSuggestion = async () => {
    fetchTrackSuggestion({ tracks: tracks as Track[] })
      .then((res) => {
        console.log(res.name);
        setTrackData(res);
        console.log(trackData);
        setShowTrackData(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCloseTrackSuggestion = () => {
    setShowTrackData(false);
  };

  return (
    <div>
      {/* {showTrackData && trackData && (
        <div
          className="absolute inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50"
          onClick={handleCloseTrackSuggestion}
        >
          <div
            className="relative bg-white p-6 rounded-xl w-full md:w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent the click event from closing the card
          >
            <TrackCard track={trackData} />
            <button
              className="absolute top-0 right-0 p-2 text-red-500"
              onClick={handleCloseTrackSuggestion}
            >
              X
            </button>
          </div>
        </div>
      )} */}
      <div className="flex justify-between bg-gradient-to-r from-red-500 to-yelow-500">
        <div className="p-10 h-full w-full md:w-1/2">
          {tracks ? (
            <div>
              <TrackCarousel tracks={tracks} />
            </div>
          ) : (
            <p>Loading tracks...</p>
          )}
        </div>

        <div className="p-10 h-full w-full md:w-1/2">
          {artists ? (
            <div>
              <ArtistCarousel artists={artists} />
            </div>
          ) : (
            <p>Loading albums...</p>
          )}
        </div>
      </div>
      {/* <div className="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-10">
        <h2 className="flex justify-center text-2xl font-bold mb-4">
          Explore More
        </h2>
        <div className="flex justify-between space-x-4 px-10">
          <button
            onClick={getTrackSuggestion}
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-full"
          >
            Get a track suggestion
          </button>
          <button
            onClick={getArtistSuggestion}
            className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-full"
          >
            Get a artist suggestion
          </button>
        </div>
      </div> */}
    </div>
  );
};

export default TopListening;
