import User from "../interfaces/UserInterface";
// import Album from "../interfaces/AlbumInterface";
// import Track from "../interfaces/TrackInterface";
// import Playlist from "../interfaces/PlaylistInterface";
// import Artist from "../interfaces/ArtistInterface";
import TrackCard from "../components/TrackCard";

import { useData } from "../data/DataContext";

const Dashboard = ({ user }: { user: User }) => {
  const { tracks, albums, playlists, artists } = useData();

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Top Albums</h2>
        <ul>
          {albums?.map((album, index) => (
            <div key={index}>
              <h2>{album.name}</h2>
              <p>{album.artists}</p>
              <p>Released: {album.releaseDate}</p>
              <a
                href={album.albumUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Spotify
              </a>
            </div>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Top Tracks</h2>
        <ul>
          {tracks?.map((track, index) => (
            <div key={index}>
              <TrackCard track={track} />
            </div>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Public Playlists</h2>
        <ul>
          {playlists?.map((playlist, index) => (
            <div key={index}>
              <h2>{playlist.name}</h2>
              <p>{playlist.owner}</p>
              <a
                href={playlist.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Spotify
              </a>
            </div>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Top Artists</h2>
        <ul>
          {artists?.map((artist, index) => (
            <div key={index}>
              <h2>{artist.name}</h2>
              <p>{artist.genre}</p>
              <a
                href={artist.artistUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Spotify
              </a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
