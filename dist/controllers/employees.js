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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const _models_1 = require("../models");
class EmployeeController {
    static test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({
                    message: "API Alive.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
    static addEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = new _models_1.Employee(req.body());
                yield employee.save();
                return res.status(200).json({
                    data: employee,
                    message: "Employee record added.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
    static getEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield _models_1.Employee.findById(req.params.id);
                if (employee) {
                    return res.status(200).json({
                        data: employee,
                        message: "Employee details.",
                    });
                }
                return res.status(404).json({
                    data: employee,
                    message: "Employee record not found.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
    static getEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield _models_1.Employee.find();
                if (employees) {
                    return res.status(200).json({
                        data: employees,
                        message: "Employees.",
                    });
                }
                return res.status(404).json({
                    data: employees,
                    message: "No employees found.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
    static updateEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { id, firstName, lastName, salutation, gender, employeeNum, grossSalary, profileColor, } = req.body;
                const update = {
                    firstName,
                    lastName,
                    salutation,
                    gender,
                    employeeNum,
                    grossSalary,
                    profileColor,
                    updatedAt: new Date(),
                };
                const employee = yield _models_1.Employee.findOneAndUpdate({ _id: id }, update);
                if (employee) {
                    return res.status(200).json({
                        data: employee,
                        message: "Employee details updated.",
                    });
                }
                return res.status(404).json({
                    data: employee,
                    message: "Employee record not found.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
    static deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employee = yield _models_1.Employee.findByIdAndDelete({ id: req.params.id });
                return res.status(200).json({
                    data: employee,
                    message: "Employee deleted.",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "An error occured",
                });
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employees.js.map