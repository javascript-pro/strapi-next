// /src/lib/api.ts
import axios from "axios";

// Create an axios instance pointing to Strapi
const strapi = axios.create({
  baseURL: process.env.STRAPI_URL || "http://localhost:1337/api",
});

// Fetch all content pages
export async function getContentPages() {
  const res = await strapi.get("/content-pages");
  return res.data; // Strapi v4 response: { data: [...] }
}
