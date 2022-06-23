import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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

    return res.status(200).json({
      success: true,
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
    });
  }
};
