export const maskSensitiveInfo = (input) => {
    const formattedString = input.toString();
    return formattedString.replace(/./g, '*');
  };