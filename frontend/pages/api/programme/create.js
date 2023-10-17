import axios from "axios";

export default async function handler(req, res) {
  const body = req.body;

  console.log("Received Body: ", body);

  try {
    const response = await axios.post("http://localhost:3060/programme", body);
    res.status(response.status).json({ data: response.body });
  } catch (error) {
    console.log(error);
  }
}
