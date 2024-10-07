"use server";
import { prisma } from "@/prisma";
import { users } from "@prisma/client";

export class UsersActions {
  async getUsers(): Promise<users[] | null> {
    try {
      return await prisma.users.findMany();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserByEmail({ email }: { email: string }): Promise<users | null> {
    try {
      return await prisma.users.findUnique({
        where: { email },
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
