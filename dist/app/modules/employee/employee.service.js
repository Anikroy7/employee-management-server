"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeServices = void 0;
const global_1 = require("../../types/global");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelper_1 = require("../../utils/paginationHelper");
const employee_constant_1 = require("./employee.constant");
const createEmployeeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield global_1.prisma.employee.findUnique({
        where: {
            email: payload.email
        }
    });
    if (isExists) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Employee already exists with this email.");
    }
    const result = yield global_1.prisma.employee.create({
        data: payload
    });
    return result;
});
const getAllEmployeesFromDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const andCondions = [];
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    console.log(searchTerm, filterData);
    if (searchTerm) {
        andCondions.push({
            OR: employee_constant_1.employeeSearchAbleFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: filterData[key]
                }
            }))
        });
    }
    ;
    const whereConditons = { AND: andCondions };
    const result = yield global_1.prisma.employee.findMany({
        where: whereConditons,
        skip,
        take: limit,
    });
    const total = yield global_1.prisma.employee.count({
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
});
const updateEmployeeIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Employee exists or not
    const isExists = yield global_1.prisma.employee.findUnique({
        where: {
            id: id
        }
    });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!!");
    }
    // Email can't be updated
    if (Object.keys(payload).includes('email')) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Email can't be updated!!");
    }
    const result = yield global_1.prisma.employee.update({
        where: {
            id: id
        },
        data: payload
    });
    return result;
});
const getEmployeeByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Employee exists or not
    const isExists = yield global_1.prisma.employee.findUnique({
        where: {
            id: id
        }
    });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!!");
    }
    return isExists;
});
const deleteEmployeeByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Employee exists or not
    const isExists = yield global_1.prisma.employee.findUnique({
        where: {
            id: id
        }
    });
    if (!isExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Employee not found!!");
    }
    const result = yield global_1.prisma.employee.delete({
        where: {
            id: id
        }
    });
    return result;
});
exports.EmployeeServices = {
    createEmployeeIntoDB,
    getAllEmployeesFromDB,
    updateEmployeeIntoDB,
    deleteEmployeeByIdFromDB,
    getEmployeeByIdFromDB
};
