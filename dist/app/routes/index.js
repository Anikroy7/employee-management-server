"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employee_route_1 = require("../modules/employee/employee.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/employee",
        route: employee_route_1.EmployeeRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
