import axios from "axios";

const BASE_URL = "http://xunqinji.top:9007/api/v1";
const TOKEN =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Inhpbmd3ZW5qdSIsImVtYWlsIjoieGluZ3dlbmp1QGdtYWlsLmNvbSJ9.auCidFeJ7foumlVGCws7Aqlzk-RpqLlhO9NcHmzXpbI";

const instance = axios.create({
  baseURL: BASE_URL
});
instance.defaults.headers.common["Authorization"] = TOKEN;

export default instance;
