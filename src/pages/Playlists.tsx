import User from "../interfaces/UserInterface";
import { useData } from "../data/DataContext";

const Playlists = ({ user }: { user: User }) => {
  const { playlists } = useData();

  return (
    <div>
      <h2>{user.profile.id}</h2>
      {playlists ? (
        <ul>
          {playlists.map((playlist, index) => (
            <li key={index}>{playlist.name}</li>
          ))}
        </ul>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Playlists;
