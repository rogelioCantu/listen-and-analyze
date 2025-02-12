// this is to access the data fetched across routes

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import User from "../interfaces/UserInterface";
import Track from "../interfaces/TrackInterface";
import Album from "../interfaces/AlbumInterface";
import Playlist from "../interfaces/PlaylistInterface";
import Artist from "../interfaces/ArtistInterface";

import axios from "axios";

interface DataContextType {
  tracks: Track[] | null;
  setTracks: React.Dispatch<React.SetStateAction<Track[] | null>>;
  albums: Album[] | null;
  setAlbums: React.Dispatch<React.SetStateAction<Album[] | null>>;
  playlists: Playlist[] | null;
  setPlaylists: React.Dispatch<React.SetStateAction<Playlist[] | null>>;
  artists: Artist[] | null;
  setArtists: React.Dispatch<React.SetStateAction<Artist[] | null>>;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

interface DataProviderProps {
  auth: User | null;
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({
  auth,
  children,
}) => {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [playlists, setPlaylists] = useState<Playlist[] | null>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          const responses = await Promise.all([
            axios.get<Album[]>(
              "http://localhost:5000/user/ten-recent-saved-albums",
              { withCredentials: true }
            ),
            axios.get<Track[]>("http://localhost:5000/user/top-ten-tracks", {
              withCredentials: true,
            }),
            axios.get<Playlist[]>(
              `http://localhost:5000/user/public-playlists?userId=${auth.profile.id}`,
              { withCredentials: true }
            ),
            axios.get<Artist[]>("http://localhost:5000/user/top-ten-artists", {
              withCredentials: true,
            }),
          ]);

          setAlbums(responses[0].data);
          setTracks(responses[1].data);
          setPlaylists(responses[2].data);
          setArtists(responses[3].data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };
      fetchData();
    }
  }, [auth]);

  return (
    <DataContext.Provider
      value={{
        tracks,
        setTracks,
        albums,
        setAlbums,
        playlists,
        setPlaylists,
        artists,
        setArtists,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
