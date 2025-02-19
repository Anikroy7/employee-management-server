import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

export type TEmployeeFilterableFields = {
    searchTerm?: string | undefined;
}

export type IPaginationOptions = {
    page?: number;
    limit?: number;
}
