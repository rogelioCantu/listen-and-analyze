import Track from "../interfaces/TrackInterface";

const TrackCard = ({ track }: { track: Track }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center pt-16">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          {track.name}
        </h2>
        <p className="text-center text-gray-600 mb-6">{track.artists}</p>
        <div className="flex justify-center">
          <a
            href={track.trackUrl}
            className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Listen on Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default TrackCard;
