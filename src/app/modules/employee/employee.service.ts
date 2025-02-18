import { Employee } from "@prisma/client"
import { prisma } from "../../types/global"
import AppError from "../../errors/AppError"
import httpStatus from "http-status";

const createEmployeeIntoDB = async (payload: Employee) => {
    const isExists = await prisma.employee.findUnique({
        where: {
            email: payload.email
        }   
    })

    if (isExists) {
        throw new AppError(httpStatus.BAD_REQUEST, "Employee already exists with this email.")
    }

    const result = await prisma.employee.create({
        data: payload
    })

    return result
}



export const EmployeeServices = {
    createEmployeeIntoDB,
};
