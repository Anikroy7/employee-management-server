"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployeeValidationSchema = exports.createEmployeeValidationSchema = void 0;
const zod_1 = require("zod");
exports.createEmployeeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        imageUrl: zod_1.z.string(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string(),
        address: zod_1.z.string(),
        status: zod_1.z.enum(["ACTIVE", "BLOCKED"]).default('ACTIVE'),
    }),
});
exports.updateEmployeeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        imageUrl: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        status: zod_1.z.enum(["ACTIVE", "BLOCKED"]).optional(),
    }),
});
