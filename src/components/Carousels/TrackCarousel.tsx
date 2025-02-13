import { Carousel } from "@material-tailwind/react";
import TrackCard from "../Cards/TrackCard";
import Track from "../../interfaces/TrackInterface";

export function TrackCarousel({ tracks }: { tracks: Array<Track> }) {
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
        {tracks.map((track, index) => (
          <div className="flex justify-center items-center" key={index}>
            <TrackCard track={track} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}
