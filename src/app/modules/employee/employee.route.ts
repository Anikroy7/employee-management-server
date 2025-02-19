import express from "express";
import { EmployeeControllers } from "./employee.controller";
import { createEmployeeValidationSchema, updateEmployeeValidationSchema } from "./employee.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();


router.post('/create',
    validateRequest(createEmployeeValidationSchema),
    EmployeeControllers.createEmployee
)

router.get('/all', EmployeeControllers.getAllEmployees)

router.patch('/update/:id',
    validateRequest(updateEmployeeValidationSchema),
    EmployeeControllers.updateEmployee
)

router.get('/:id',
    EmployeeControllers.getEmployeeById
)

router.delete('/:id',
    EmployeeControllers.deleteEmployee
)



export const EmployeeRoutes = router;
