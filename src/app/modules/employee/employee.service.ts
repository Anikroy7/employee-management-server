import { Employee, Prisma } from "@prisma/client"
import { IPaginationOptions, prisma, TEmployeeFilterableFields } from "../../types/global"
import AppError from "../../errors/AppError"
import httpStatus from "http-status";
import { paginationHelper } from "../../utils/paginationHelper";
import { employeeSearchAbleFields } from "./employee.constant";

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



const getAllEmployeesFromDB = async (params: TEmployeeFilterableFields, options: IPaginationOptions) => {
    const { searchTerm, ...filterData } = params;
    const andCondions: Prisma.EmployeeWhereInput[] = [];
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
console.log(searchTerm, filterData)
    if (searchTerm) {
        andCondions.push({
            OR: employeeSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    const whereConditons: Prisma.EmployeeWhereInput = { AND: andCondions }

    const result = await prisma.employee.findMany({
        where: whereConditons,
        skip,
        take: limit,
    });


    const total = await prisma.employee.count({
        where: whereConditons
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};


const updateEmployeeIntoDB = async (id: string, payload: Employee) => {

    // Employee exists or not
    const isExists = await prisma.employee.findUnique({
        where: {
            id: id
        }
    })

    if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Employee not found!!")
    }

    // Email can't be updated
    if (Object.keys(payload).includes('email')) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email can't be updated!!")

    }

    const result = await prisma.employee.update({
        where: {
            id: id
        },
        data: payload
    })

    return result
}


const getEmployeeByIdFromDB = async (id: string) => {
    // Employee exists or not
    const isExists = await prisma.employee.findUnique({
        where: {
            id: id
        }
    })

    if (!isExists) {
        throw new AppError(httpStatus.NOT_FOUND, "Employee not found!!")
    }
    return isExists;
};



export const EmployeeServices = {
    createEmployeeIntoDB,
    getAllEmployeesFromDB,
    updateEmployeeIntoDB,
    getEmployeeByIdFromDB
};
