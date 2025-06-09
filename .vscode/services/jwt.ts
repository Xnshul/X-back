import JWT from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

export const prismaClient = new PrismaClient();

const JWT_SECRET = "$uper@1234.";

class JWTService {
     public static async generateTokenUser(userID: string){
          const user = await prismaClient.user.findUnique({ where: { id: userID } });
          const payload = {
               id: user?.id,
               email: user?.email
          };
          const token = JWT.sign(payload, JWT_SECRET);
          return token; 
     }
}
export default  JWTService;
