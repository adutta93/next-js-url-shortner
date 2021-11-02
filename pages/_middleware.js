import { NextResponse } from "next/server";
import { getUrl } from "../lib/redis";

const miidleware = async (req) => {
  const path = req.nextUrl.pathname.split("/")[1];

  if (["favicon.ico", "api", ""].includes(path)) {
    return;
  }

  const url = await getUrl(path);
  console.log(url, path);
  if (url) {
    return NextResponse.redirect(url);
  }
};

export default miidleware;
