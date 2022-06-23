import { NextApiRequest, NextApiResponse } from "next";
import { signinApi } from "imports/Signin";
import cookie from "cookie";
import parseToken from "helper/parseToken";
import { refreshTokenApi } from "components/api/apis";

interface TokensI {
  access: string;
  refresh: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const cookies = cookie.parse(req.headers.cookie ?? "");
    const refresh = cookies.refresh ?? false;
    console.log(refresh);
    if (refresh) {
      const access = cookies.access ?? false;
      if (access) {
        const userData = parseToken(access);
        return res.status(200).json({
          success: true,
          user: userData,
        });
      } else {
        await refreshTokenApi
          .post<TokensI>("/", { refresh })
          .then((result) => {
            const data = result.data;
            res.setHeader("Set-Cookie", [
              cookie.serialize("access", data.access, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
                maxAge: 60 * 20,
                sameSite: "strict",
                path: "/api/",
              }),
              cookie.serialize("refresh", data.refresh, {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
                maxAge: 60 * 60 * 24 * 14,
                sameSite: "strict",
                path: "/api/",
              }),
            ]);
            const userData = parseToken(data.access);
            return res.status(200).json({
              success: true,
              user: userData,
            });
          })
          .catch((error) => {
            res.setHeader("Set-Cookie", [
              cookie.serialize("access", "", {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
                expires: new Date(0),
                sameSite: "strict",
                path: "/api/",
              }),
              cookie.serialize("refresh", "", {
                httpOnly: true,
                secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
                expires: new Date(0),
                sameSite: "strict",
                path: "/api/",
              }),
            ]);
            if (error.response.status === 401) {
              return res.status(401).json({
                success: false,
                error: "Invalid token",
              });
            } else {
              return res.status(500).json({
                success: false,
                error: "Something went wrong when authenticating",
              });
            }
          });
      }
    } else {
      return res.status(400).json({
        success: false,
        error: "No Token Available",
      });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} now allowed`,
    });
  }
};
