import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import openAiRoutes from "./routes/openai.js";
import cors from "cors";

var client_id = "c223249c33ba413ca751dd03a6f92498"; // your clientId
var client_secret = "820d895e9a164a68a8583c2f94ec5c22"; // Your secret
var redirect_uri = "http://localhost:5000/auth/callback"; // Your redirect uri

const corsOptions = {
  origin: "http://localhost:5173", // React frontend URL
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

const app = express();

app.use(cors(corsOptions));

// Middleware
app.use(
  session({ secret: "your-secret", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

// Set up routes
app.use("/auth", authRoutes);

app.use("/user", userRoutes);

app.use("/openai", openAiRoutes);

// A route to check if the user is authenticated (you can expand this later)
app.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // User object from passport
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
