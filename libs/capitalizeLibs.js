export const capitalize = (str) => {
  const splitStr = str.split(" ");
  let strCapitalize = "";
  if (splitStr.length == 0) return;
  splitStr.forEach((item) => {
    const lowerStr = item.toLowerCase();
    strCapitalize += item.charAt(0).toUpperCase() + lowerStr.slice(1) + " ";
  });

  return strCapitalize.trim();
};
