import { setUrl } from "../../lib/redis";

const ShorterFunc = async (req, res) => {
  const url = req.body.url;
  const short = await setUrl(url);
  res.status(200).json({ url, short });
};

export default ShorterFunc;
