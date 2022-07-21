import { useState, useEffect } from "react";

export const useGetTokenByLS = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenOfLS = localStorage.getItem("token");
    if (tokenOfLS) {
      setToken(tokenOfLS);
    }
  }, []);
  return { token };
};
