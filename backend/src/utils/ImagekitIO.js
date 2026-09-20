// ---- where user photos are stored ----
// Images are NOT kept in our database. We send them to
// ImageKit and save only the link they give back.
import ImageKit from "imagekit";
import dotenv from "dotenv";


// load the keys from .env before we use them
dotenv.config({ path: ".env" });
// Connect once here, then every file can import and use it.
// publicKey  - can be seen by anyone
// privateKey - secret, never on GitHub
// urlEndpoint - our folder address on ImageKit
let imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY || process.env.IMAGEKIT_PUBLIC_KEY || "missing_public_key",
  privateKey: process.env.IMAGEKIT_PRIVATEKEY || process.env.IMAGEKIT_PRIVATE_KEY || "missing_private_key",
  urlEndpoint: process.env.IMAGEKIT_URLENDPOINT || process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/missing",
});


// authController uses this as imagekit.upload(...)
export default imagekit;
