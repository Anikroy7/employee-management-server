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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const employee_service_1 = require("./employee.service");
const pick_1 = __importDefault(require("../../utils/pick"));
const employee_constant_1 = require("./employee.constant");
const createEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeData = req.body;
    const result = yield employee_service_1.EmployeeServices.createEmployeeIntoDB(employeeData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Employee created successfully",
        data: result,
    });
}));
const getAllEmployees = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, employee_constant_1.employeeFilterableFields);
    const options = (0, pick_1.default)(req.query, ['limit', 'page']);
    const result = yield employee_service_1.EmployeeServices.getAllEmployeesFromDB(filters, options);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Employees retrieved successfully",
        data: result,
    });
}));
const updateEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeData = req.body;
    const { id } = req.params;
    const result = yield employee_service_1.EmployeeServices.updateEmployeeIntoDB(id, employeeData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Employee updated successfully",
        data: result,
    });
}));
const getEmployeeById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield employee_service_1.EmployeeServices.getEmployeeByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: "Employee retrieved successfully",
        data: result,
    });
}));
const deleteEmployee = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield employee_service_1.EmployeeServices.deleteEmployeeByIdFromDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Employee deleted successfully",
        data: result,
    });
}));
exports.EmployeeControllers = {
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee
};
