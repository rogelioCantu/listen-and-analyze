import OpenAI from "openai";
import dotenv from "dotenv";
import { Router } from "express";

dotenv.config();

import {
  trackSuggestionPrompt,
  artistSuggestionPrompt,
} from "../util/prompts.js";

const router = Router();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

router.post("/get-track-suggestion", async (req, res) => {
  try {
    const tracks = req.body.tra;
    if (req.isAuthenticated()) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "user",
            content: trackSuggestionPrompt(tracks),
          },
        ],
      });
      console.log(completion.choices[0].message);
      res.json(completion.choices[0].message.content);
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).send("Error fetching track suggestion.");
  }
});

router.post("/get-artist-suggestion", async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      const artists = req.body.art;
      console.log(artists);
      const prompt = artistSuggestionPrompt(artists);
      console.log(prompt);
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        store: true,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });
      console.log(completion.choices[0].message);
      res.json(completion.choices[0].message.content);
    } else {
      res.status(401).send("Unathorized");
    }
  } catch (err) {
    console.error(err.response ? err.response.data : err.message);
    res.status(500).send("Error fetching artist suggestion");
  }
});

export default router;
