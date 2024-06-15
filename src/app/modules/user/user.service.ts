import prisma from "../../../shared/prisma";

const userList = async () => {
  const users = await prisma.user.findMany();
  return users;
};
export const UserService = {
    userList
  };