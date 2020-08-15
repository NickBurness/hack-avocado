const baseUrl = "https://data.police.uk/api";

// Gets all crimes within 1 mile of location
export const getAllCrimesForLocation = async (latitude, longitude) => {
  const response = await fetch(
    `${baseUrl}/crimes-street/all-crime?lat=${latitude}&lng=${longitude}`
  );
  const data = await response.json();
  const numberOfCrimes = data.length;
  return numberOfCrimes;
};
