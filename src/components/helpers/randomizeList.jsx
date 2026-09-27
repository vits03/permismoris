const RandomizeList = (questionListLength, finalListLength) => {
  const maxIndex = questionListLength - 3;

  if (maxIndex < finalListLength) {
    throw new Error("Not enough elements to choose from after excluding last two indices.");
  }

  // Create array from 0 to questionListLength - 3 (excluded last 2)
  const indices = Array.from({ length: maxIndex + 1 }, (_, i) => i);

  // Fisher-Yates shuffle
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  // Return the first `finalListLength` random indices
  return indices.slice(0, finalListLength);
};

export default RandomizeList;
