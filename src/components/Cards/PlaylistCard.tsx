import Playlist from "../../interfaces/PlaylistInterface";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

const PlaylistCard = ({ playlist }: { playlist: Playlist }) => {
  return (
    <Card
      placeholder=""
      onPointerEnterCapture
      onPointerLeaveCapture
      shadow={false}
      className="relative grid h-[30rem] w-full max-w-[20rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        placeholder=""
        onPointerEnterCapture
        onPointerLeaveCapture
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center"
        style={{
          backgroundImage: `url(${playlist.playlistImageUrl})`,
        }}
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody
        placeholder=""
        onPointerEnterCapture
        onPointerLeaveCapture
        className="relative py-14 px-6 md:px-12"
      >
        <Typography
          placeholder=""
          onPointerEnterCapture
          onPointerLeaveCapture
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          {playlist.name}
        </Typography>
        <Typography
          placeholder=""
          onPointerEnterCapture
          onPointerLeaveCapture
          variant="h5"
          className="mb-4 text-gray-400"
        >
          {playlist.owner}
        </Typography>
        <Typography
          placeholder=""
          onPointerEnterCapture
          onPointerLeaveCapture
          variant="h6"
          className="mb-4 text-gray-400"
        >
          <a
            href={playlist.playlistUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Listen on spotify
          </a>
        </Typography>
      </CardBody>
    </Card>
  );
};

export default PlaylistCard;
