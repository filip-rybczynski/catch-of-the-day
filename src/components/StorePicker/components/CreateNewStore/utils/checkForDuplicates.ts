// function which checks if input is found in the provided list of potential duplicates
export const checkForDuplicates = (
  str: string,
  potentialDuplicates: string[]
) => {
  return potentialDuplicates.some(
    (name) => name === str
  )
};
