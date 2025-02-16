import { Carousel } from "@material-tailwind/react";
import PlaylistCard from "../Cards/PlaylistCard";
import Playlist from "../../interfaces/PlaylistInterface";

export function PlaylistCarousel({
  playlists,
}: {
  playlists: Array<Playlist>;
}) {
  return (
    <div className="flex justify-center items-center">
      <Carousel
        transition={{ duration: 1 }}
        className="rounded-xl "
        loop
        placeholder=""
        onPointerEnterCapture
        onPointerLeaveCapture
      >
        {playlists.map((playlist, index) => (
          <div className="flex justify-center items-center" key={index}>
            <PlaylistCard playlist={playlist} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
