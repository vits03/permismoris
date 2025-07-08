const RandomizeList = (questionListLength,finalListLength) => {
  console.log(questionListLength,finalListLength)
  // Create an array of indices from 0 to list.length - 1
  const indices = Array.from({ length:questionListLength }, (_, i) => i);

  // Fisher-Yates shuffle algorithm to shuffle the indices
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
 // Return the shuffled indices array
  const randomIndices = indices.slice(0, finalListLength);
  return randomIndices;

};

export default RandomizeList;
