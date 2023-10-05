import axios from "axios";

export default async function handler(req, res) {
  console.log("IN api/programme/list");
  const body = req.body;
  console.log("Received Body: ", body);
  const skip = body.skip * 10;
  const take = body.take;
  console.log("skip and take: ", skip, take);
  const url = `http://localhost:3060/programme?skip=${skip}&take=${take}`;
  console.log("url: ", url);

  try {
    const response = await axios.get(url);
    console.log(response.data.results);
    res.status(response.status).json({ data: response.data });
  } catch (error) {
    console.log(error);
  }
}
