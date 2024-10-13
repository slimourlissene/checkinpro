"use server";
import { prisma } from "@/prisma";
import { User } from "@prisma/client";

export async function getUsers(): Promise<User[] | null> {
  try {
    return await prisma.user.findMany();
  } catch (error) {
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
  } catch (error) {
    console.error(error);
    return null;
  }
}
