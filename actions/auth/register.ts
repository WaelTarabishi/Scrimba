"use server";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export async function RegisterFn({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  let hashedPassword;
  hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(existingUser);
  if (existingUser) {
    throw new Error("Email already in use!");
    // return { error: "Email already in use!" };
    // console.log
  }
  const createdUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return createdUser;
}
