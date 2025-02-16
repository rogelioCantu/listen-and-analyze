export const trackSuggestionPrompt = (tracks) => {
  return `I am going to provide a list of tracks that I have been listening to recently, please 
    suggest me a new track that is similar to the style of music I have been listening to: ${tracks}
    Provide the response in a json format with the following information: track name, artists performing on the track,
    the url to go the song in spotify, and an image url for the cover of the album the track is on.
    The response format should be in json, as follows: {
      name: string, artists: string, trackUrl: string, albumImageUrl: string
    }
    Return only the json object with no extra text formatting, make sure this is a valid json object that can be used.
    I want it in a format so I can access data by going item.name, item.artists, etc.`;
};

export const artistSuggestionPrompt = (artists) => {
  return `I am going to provide a list of artists that I have been listening to recently, 
  please suggest me a new artist that is similar to the style of music I have been listening to: ${artists}`;
};
