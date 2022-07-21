import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export const useProtectedRouteByToken = (forbiddenRole = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("none");
  const [valid, setValid] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
      axios
        .get(`http://localhost:3000/api/token/${token}`)
        .then(function (res) {
          setIsLoading(false);
          setValid(true);

          if (forbiddenRole.length > 0) {
            forbiddenRole.forEach((element) => {
              if (element == res.data.msg.roles[0].name) {
                router.push("/dashboard");
              }
            });
          }

          switch (res.data.msg.roles[0].name) {
            case "admin":
              setRole("admin");
              break;
            case "assistant":
              setRole("assistant");
              break;
            case "practicing":
              setRole("practicing");
              break;
          }
        })
        .catch(function (error) {
          console.error(error);
          router.push("/login");
        });
    }
  }, []);

  return { isLoading, role, valid };
};
