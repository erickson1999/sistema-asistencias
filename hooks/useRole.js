import { useEffect,useState } from "react";

const useVerifyRole = (redirectTo) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) return router.push(redirectTo);
      axios
        .post(
          "/api/dashboard",
          {},
          {
            headers: {
              "x-access-token": token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then(function (res) {
          switch (res.data.data.roles[0].name) {
            case "admin":
              setViewRender("admin");
              break;
            case "assitant":
              setViewRender("assitant");
              break;
            case "practicing":
              setViewRender("practicing");
              break;
          }
        })
        .catch(function (error) {
          console.error(error);
          router.push(redirectTo);
        });
    }
  }, []);

  return {  };
};
