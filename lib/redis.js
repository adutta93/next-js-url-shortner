import upstash from "@upstash/redis";

const redis = upstash(
  process.env.UPSTASH_REDIS_REST_URL,
  process.env.UPSTASH_REDIS_REST_TOKEN
);

const setUrl = async (url) => {
  const short = getShort();
  await redis.set(`short/${short}`, url);
  return short;
};

const getUrl = async (short) => {
  const { data } = await redis.get(`short/${short}`);
  return data;
};

const getShort = () => {
  const alpha = "abcdefghijklmnopqrstuvwxyz".split("");
  const randomStr = [...new Array(6)]
    .map((_) => alpha[Math.floor(Math.random() * alpha.length)])
    .join("");
  return randomStr;
};
export { setUrl, getUrl };
