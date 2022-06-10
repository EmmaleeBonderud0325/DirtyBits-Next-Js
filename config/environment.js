const env = process.env.NODE_ENV || "development";

let redirectUrl = "";
if (env === "development") {
  redirectUrl = "http://localhost:3000";
} else {
  redirectUrl = "https://dirtybits.vercel.app/";
}
module.exports = redirectUrl;
