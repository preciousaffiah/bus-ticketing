"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../controllers/index");
const express_1 = require("express");
const linksRoutes = (0, express_1.Router)();
linksRoutes.get("/", index_1.LinksController.test);
linksRoutes.post("/link", index_1.LinksController.createShortURL);
linksRoutes.get("/link/:uniqueid", index_1.LinksController.findShortURL);
exports.default = linksRoutes;
//# sourceMappingURL=links.js.map