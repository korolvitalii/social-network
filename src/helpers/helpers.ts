const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const prepareErrors = (error: string, char: string): string => {
  const result = error.split(char);
  const errorType = result[1].substring(0, result[1].length - 1);
  return capitalizeFirstLetter(errorType);
};
