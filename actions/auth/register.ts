"use server";
import bcrypt from "bcrypt";
import prisma from "../../lib/prisma";

export async function Register({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (existingUser) {
    return { error: "Email already in use!" };
  }
  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  return { success: "User Created!" };
}
