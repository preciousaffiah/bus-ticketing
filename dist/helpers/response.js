"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = exports.errorResponse = void 0;
function errorResponse(err, res) {
    res.status(500).json({
        error: "An error occured, please try again later.",
    });
}
exports.errorResponse = errorResponse;
function successResponse(data, message, res) {
    res.status(200).json({
        data,
        message
    });
}
exports.successResponse = successResponse;
//# sourceMappingURL=response.js.map