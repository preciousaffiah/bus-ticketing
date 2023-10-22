"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const employeeSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    salutation: { type: String, enum: ["Dr.", "Mr.", "Ms.", "Mrs.", "Mx."], required: true },
    gender: { type: String, enum: ["Male", "Female", "Unspecified"], required: true },
    employeeNum: { type: Number, required: true },
    profileColor: { type: String, enum: ["Male", "Female", "Unspecified"], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: null },
});
const Employee = mongoose_1.default.model("Employee", employeeSchema);
exports.default = Employee;
//# sourceMappingURL=employees.js.map