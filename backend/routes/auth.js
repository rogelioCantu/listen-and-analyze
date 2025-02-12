import { Router } from "express";
import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";

const router = Router();

passport.use(
  new SpotifyStrategy(
    {
      clientID: "c223249c33ba413ca751dd03a6f92498",
      clientSecret: "820d895e9a164a68a8583c2f94ec5c22",
      callbackURL: "http://localhost:5000/auth/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, { accessToken, profile });
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

router.get(
  "/login",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
    ],
    showDialog: true,
  })
);

router.get(
  "/callback",
  passport.authenticate("spotify", { failureRedirect: "/login" }),
  (req, res) => {
    // On successful login, redirect to the React frontend /dashboard
    req.session.user = req.user;
    res.redirect("http://localhost:5173/dashboard");
  }
);

export default router;
