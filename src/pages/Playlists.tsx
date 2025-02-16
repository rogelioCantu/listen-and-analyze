import User from "../interfaces/UserInterface";
import { useData } from "../data/DataContext";
import { PlaylistCarousel } from "../components/Carousels/PlaylistCarousel";

const Playlists = ({ user }: { user: User }) => {
  const { playlists } = useData();

  return (
    <div className="flex justify-center bg-gradient-to-r from-red-500 to-yelow-500 h-screen">
      <div className="p-10 h-full w-full ">
        {playlists ? (
          <div>
            <PlaylistCarousel playlists={playlists} />
          </div>
        ) : (
          <p>Loading tracks...</p>
        )}
      </div>
    </div>
  );
};

export default Playlists;
