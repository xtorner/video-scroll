import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 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`,
  },
});

export default instance;
