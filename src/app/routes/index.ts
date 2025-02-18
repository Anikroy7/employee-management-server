import { Router } from "express";
import { EmployeeRoutes } from "../modules/employee/employee.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/employee",
    route: EmployeeRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
  