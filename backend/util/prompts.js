export const trackSuggestionPrompt = (tracks) => {
  return `I am going to provide a list of tracks that I have been listening to recently, please 
    suggest me a new track that is similar to the style of music I have been listening to: ${tracks}`;
};

export const artistSuggestionPrompt = (artists) => {
  return `I am going to provide a list of artists that I have been listening to recently, 
  please suggest me a new artist that is similar to the style of music I have been listening to: ${artists}`;
};
