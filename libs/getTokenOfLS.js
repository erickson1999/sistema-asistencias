export const getTokenOfLS = () => {
  if (typeof window === "undefined") {
    return null;
  }

  if (typeof window !== "undefined") {
    return window.localStorage.getItem("token");
  }
};
