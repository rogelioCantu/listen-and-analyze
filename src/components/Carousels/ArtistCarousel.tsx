import { Carousel } from "@material-tailwind/react";
import ArtistCard from "../Cards/ArtistCard";
import Artist from "../../interfaces/ArtistInterface";

export function ArtistCarousel({ artists }: { artists: Array<Artist> }) {
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
        {artists.map((artist, index) => (
          <div className="flex justify-center items-center" key={index}>
            <ArtistCard artist={artist} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
