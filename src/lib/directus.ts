import { Directus } from "@directus/sdk";
// import Keycloak from "keycloak-js";
// export const keycloak = new Keycloak({
//   url: `https://dev.sso.hocmai.com/auth`,
//   realm: "hocmai",
//   clientId: "student-portal-backend",
// });

// keycloak.init({});
const config: any = {
  auth: {
    mode: "json", // 'json' in Node.js
    autoRefresh: true,
    msRefreshBeforeExpires: 30000,
  },
};
export const directus = new Directus(process.env.CMS as string, config);
