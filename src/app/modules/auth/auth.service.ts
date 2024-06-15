import { Prisma, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import config from "../../../config";
import bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { createToken } from "./auth.utils";

const loginUser = async (payload: ILoginUser) => {
  const { email, password } = payload;

  //checking exists user by email
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  if (
    isUserExist.password &&
    !(await bcrypt.compare(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
  }

  //create access token & refresh token
  const accessToken = createToken(
    { email: email, id: isUserExist.id },
    config.jwt.secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = createToken(
    { email: email, id: isUserExist?.id },
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
const insertIntoDB = async (data: User): Promise<User> => {
  const { password, ...user } = data;

  //checking exists user by email
  if (user?.email) {
    const existUser = await prisma.user.findUnique({
      where: {
        email: user?.email,
      },
    });
    if (existUser) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Already exists this user. Please try again other email"
      );
    }
  }

  //generate plan password to encrypt password
  const encodedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );

  //user create
  const result = await prisma.user.create({
    data: {
      ...user,
      password: encodedPassword,
    },
  });
  return result;
};
export const AuthService = {
  insertIntoDB,
  loginUser,
};
