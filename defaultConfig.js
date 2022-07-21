export const defaultConfig = () => {
  const config = {
    defaultRole: "practicing",
    defaultRoles: ["admin", "practicing", "assistant"],
    tokenExpiration: 86400,
    passwordGenRoles: "generateallroles",
  };
  return config;
};
