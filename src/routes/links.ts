import { LinksController } from "../controllers/index";
import { Router } from "express";

const linksRoutes = Router();

linksRoutes.get("/", LinksController.test);
linksRoutes.post("/link", LinksController.createShortURL);
linksRoutes.get("/link/:uniqueid", LinksController.findShortURL);


export default linksRoutes;