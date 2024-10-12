"use server";
import { prisma } from "@/prisma";
import { users } from "@prisma/client";

export async function getUsers(): Promise<users[] | null> {
  try {
    return await prisma.users.findMany();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserByEmail({
  email,
}: {
  email: string;
}): Promise<users | null> {
  try {
    return await prisma.users.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}
