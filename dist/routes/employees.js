"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _controllers_1 = require("../controllers");
const express_1 = require("express");
const employeeRoutes = (0, express_1.Router)();
employeeRoutes.get("/", _controllers_1.EmployeeController.test);
employeeRoutes.post("/employee", _controllers_1.EmployeeController.addEmployee);
employeeRoutes.get("/employee/:id", _controllers_1.EmployeeController.getEmployee);
employeeRoutes.get("/employee", _controllers_1.EmployeeController.getEmployees);
employeeRoutes.put("/employee", _controllers_1.EmployeeController.updateEmployee);
employeeRoutes.delete("/employee/:id", _controllers_1.EmployeeController.deleteEmployee);
exports.default = employeeRoutes;
//# sourceMappingURL=employees.js.map