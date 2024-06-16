import { helper } from "../../../shared/helper";
import prisma from "../../../shared/prisma";

const userList = async () => {
  const users = await prisma.user.findMany();
  return users;
};
const getUserFromDB = async (token:string) => {
  const authUser = await helper.authUser(token);
  const user = await prisma.user.findFirst({
    where:{
      id:authUser.id
    },
    include:{
      transaction:true
    }
  });
  return user;
};
export const UserService = {
    userList,
    getUserFromDB
  };