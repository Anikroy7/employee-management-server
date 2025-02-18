import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { EmployeeServices } from "./employee.service";

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

export const EmployeeControllers = {
    createEmployee,
};