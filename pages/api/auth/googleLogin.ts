import { googleLoginApi } from "components/api/apis";
import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import parseToken from "helper/parseToken";

interface TokensI {
  access: string;
  refresh: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { auth_token } = req.body;
    await googleLoginApi
      .post<TokensI>("/", {
        auth_token,
      })
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
        console.log(userData);
        return res.status(200).json({
          success: true,
          user: userData,
        });
      })
      .catch(() => {
        return res.status(500).json({
          success: false,
          error: "Something went wrong when authenticating",
        });
      });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      error: `Method ${req.method} now allowed`,
    });
  }
};
