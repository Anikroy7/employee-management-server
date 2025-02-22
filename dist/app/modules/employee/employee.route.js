"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const employee_controller_1 = require("./employee.controller");
const employee_validation_1 = require("./employee.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(employee_validation_1.createEmployeeValidationSchema), employee_controller_1.EmployeeControllers.createEmployee);
router.get('/all', employee_controller_1.EmployeeControllers.getAllEmployees);
router.patch('/update/:id', (0, validateRequest_1.default)(employee_validation_1.updateEmployeeValidationSchema), employee_controller_1.EmployeeControllers.updateEmployee);
router.get('/:id', employee_controller_1.EmployeeControllers.getEmployeeById);
router.delete('/:id', employee_controller_1.EmployeeControllers.deleteEmployee);
exports.EmployeeRoutes = router;
