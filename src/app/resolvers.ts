import { JWTService } from "../services/jwt";
import { PrismaClient } from "@prisma/client"
import axios from "axios";


interface GoogleTokenResult {
    iss?: string;
    nbf?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified: string;
    azp?: string;
    name?: string;
    picture?: string;
    given_name: string;
    family_name?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleToken = token;
    const googleOauthURL = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthURL.searchParams.set("id_token", googleToken);

    const { data } = await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
      responseType: "json",
    });
    const user = await PrismaClient.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      await PrismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });}
    const userInDb = await PrismaClient.user.findUnique({where:{email: data.email},});
    if (!userInDb) throw new Error ("User with email not found");
    const userToken = JWTService.generateTokenUser(user.id);
    return userToken;
  },
};

export const resolvers = { queries };
