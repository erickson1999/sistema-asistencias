export const capitalize = (str) => {
  console.log(str);
  const splitStr = str.split(" ");
  console.log(splitStr);
  let strCapitalize = "";
  if (splitStr.length == 0) return;
  splitStr.forEach((item) => {
    const lowerStr = item.toLowerCase();
    strCapitalize += item.charAt(0).toUpperCase() + lowerStr.slice(1) + " ";
  });

  return strCapitalize.trim();
};
