"use server";
import { prisma } from "@/prisma";
import { saltAndHashPasword } from "@/utils/user/password";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[] | null> {
  try {
    return await prisma.user.findMany();
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function getUserByEmail({
  email,
}: {
  email: string;
}): Promise<User | null> {
  try {
    return await prisma.user.findFirst({
      where: { email },
    });
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}

export async function resetPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User | null> {
  try {
    const hashedPassword = await saltAndHashPasword({ password });
    return await prisma.user.update({
      where: { email },
      data: { password: hashedPassword, isPasswordSet: true },
    });
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
