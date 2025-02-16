import { Router } from "express";
import axios from "axios";

const router = Router();

router.get("/top-ten-artists", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/artists?limit=10",
        { headers: { Authorization: `Bearer ${req.session.user.accessToken}` } }
      );
      const artists = response.data.items.map((item) => {
        const artist = item;
        return {
          name: artist.name,
          genre: artist.genres.join(),
          artistUrl: artist.external_urls.spotify,
          artistImageUrl: artist.images[0].url,
        };
      });
      res.json(artists);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching top ten artists.");
  }
});

router.get("/public-playlists", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const response = await axios.get(
        `https://api.spotify.com/v1/users/${req.query.userId}/playlists?limit=10`,
        { headers: { Authorization: `Bearer ${req.session.user.accessToken}` } }
      );
      const playlists = response.data.items.map((item) => {
        const playlist = item;
        return {
          name: playlist.name,
          owner: playlist.owner.display_name,
          playlistUrl: playlist.external_urls.spotify,
          playlistImageUrl: playlist.images[0].url,
        };
      });
      res.json(playlists);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching top ten playlists.");
  }
});

router.get("/top-ten-tracks", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/top/tracks?limit=10",
        { headers: { Authorization: `Bearer ${req.session.user.accessToken}` } }
      );
      console.log(response.data);
      const tracks = response.data.items.map((item) => {
        return {
          name: item.name,
          artists: item.artists.map((artist) => artist.name).join(", "),
          trackUrl: item.external_urls.spotify,
          albumImageUrl: item.album.images[0].url,
        };
      });
      res.json(tracks);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching top ten artists.");
  }
});

router.get("/ten-recent-saved-albums", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/albums?limit=10",
        { headers: { Authorization: `Bearer ${req.session.user.accessToken}` } }
      );
      const albums = response.data.items.map((item) => {
        const album = item.album;
        return {
          name: album.name, // Album name
          artists: album.artists.map((artist) => artist.name).join(", "), // Artists' names
          releaseDate: album.release_date, // Release date
          albumUrl: album.external_urls.spotify,
        };
      });

      res.json(albums);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error(error.response ? error.response.data : error.message);
    res.status(500).send("Error fetching top ten albums");
  }
});

export default router;
