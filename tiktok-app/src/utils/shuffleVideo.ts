export function shuffleVideo<T>(array: T[]): T[] {
  const shuffledArray = [...array]; // Create a new array to avoid modifying the original array

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1)); // Generate a random index between 0 and i

    // Swap elements at randomIndex and i
    [shuffledArray[randomIndex], shuffledArray[i]] = [
      shuffledArray[i],
      shuffledArray[randomIndex],
    ];
  }

  return shuffledArray;
}
