import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { EmployeeServices } from "./employee.service";
import pick from "../../utils/pick";
import { employeeFilterableFields } from "./employee.constant";

const createEmployee = catchAsync(async (req, res) => {
    const employeeData = req.body;
    const result = await EmployeeServices.createEmployeeIntoDB(employeeData);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Employee created successfully",
        data: result,
    });
});

const getAllEmployees = catchAsync(async (req, res) => {
    const filters = pick(req.query, employeeFilterableFields);
    const options = pick(req.query, ['limit', 'page'])
  
    const result = await EmployeeServices.getAllEmployeesFromDB(filters, options);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Employees retrieved successfully",
      data: result,
    });
  });

export const EmployeeControllers = {
    createEmployee,
    getAllEmployees
};