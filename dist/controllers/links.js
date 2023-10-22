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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinksController = void 0;
const index_1 = require("../models/index");
const crypto_1 = __importDefault(require("crypto"));
class LinksController {
    static test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).send({
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
    static createShortURL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { longURL } = req.body;
                const linkExists = yield index_1.Links.findOne({ longURL });
                if (linkExists) {
                    return res.status(200).json({
                        data: linkExists.shortURL,
                        message: "Link already exists"
                    });
                }
                const uniqueID = crypto_1.default.randomBytes(2).toString("hex");
                const newLink = new index_1.Links({
                    longURL,
                    shortURL: uniqueID,
                });
                yield newLink.save();
                return res.status(200).json({
                    data: `http://localhost:4000/api/link/${newLink.shortURL}`,
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
    static findShortURL(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { uniqueid } = req.params;
                const found = yield index_1.Links.findOne({ shortURL: uniqueid });
                if (found) {
                    return res.status(302).redirect(found.longURL);
                }
                return res.status(404).json({
                    message: "Link not found",
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
exports.LinksController = LinksController;
//# sourceMappingURL=links.js.map