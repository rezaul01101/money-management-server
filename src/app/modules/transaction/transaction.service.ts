import { helper } from "../../../shared/helper";
import prisma from "../../../shared/prisma";

const transactionList = async (token: string) => {
  const user = await helper.authUser(token);
  const transactions = await prisma.transaction.findMany({
    where: {
      user_id: user?.id,
    },
  });
  return transactions;
};
const transactionCreate = async (data: any, token: string) => {
  const { amount, remarks, transactionDate, type } = data;
  const user = await helper.authUser(token);
  const storeData = {
    user_id: user.id,
    amount: amount,
    remarks: remarks,
    date: transactionDate,
    type: type,
  };
  const response = await prisma.transaction.create({
    data: storeData,
  });
  return response;
};
const deleteFromDB = async (id: number, token: string) => {
  const user = await helper.authUser(token);
  // const response = await prisma.transaction.update({
  //   where:{
  //     id:id
  //   },
  //   data:{
  //     deletedAt:''
  //   }
  // })
  const response = await prisma.transaction.deleteMany({
    where: {
      AND: [
        {
          user_id: user?.id,
        },
        {
          id: id,
        },
      ],
    },
  });
  return response;
};
export const TransactionService = {
  transactionList,
  transactionCreate,
  deleteFromDB,
};
