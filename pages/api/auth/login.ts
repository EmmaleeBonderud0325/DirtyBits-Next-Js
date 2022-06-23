import { NextApiRequest, NextApiResponse } from "next";
import { signinApi } from "imports/Signin";
import cookie from "cookie";
import parseToken from "helper/parseToken";

interface TokensI {
  access: string;
  refresh: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, remember_me } = req.body;
    await signinApi
      .post<TokensI>("/", {
        email,
        password,
        remember_me,
      })
      .then((result) => {
        const data = result.data;
        if (remember_me) {
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
        } else {
          res.setHeader("Set-Cookie", [
            cookie.serialize("access", data.access, {
              httpOnly: true,
              secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
              sameSite: "strict",
              path: "/api/",
            }),
            cookie.serialize("refresh", data.refresh, {
              httpOnly: true,
              secure: process.env.NEXT_PUBLIC_BASE_URL !== "development",
              sameSite: "strict",
              path: "/api/",
            }),
          ]);
        }
        const userData = parseToken(data.access);
        return res.status(200).json({
          success: true,
          user: userData,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          return res.status(401).json({
            success: false,
            error: "Invalid email or password",
          });
        } else {
          return res.status(500).json({
            success: false,
            error: "Something went wrong when authenticating",
          });
        }
      });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} now allowed`,
    });
  }
};
