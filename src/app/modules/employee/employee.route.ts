import express from "express";
import { EmployeeControllers } from "./employee.controller";
import { createEmployeeValidationSchema } from "./employee.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();


router.post('/create',
    validateRequest(createEmployeeValidationSchema),
    EmployeeControllers.createEmployee
)

export const EmployeeRoutes = router;
