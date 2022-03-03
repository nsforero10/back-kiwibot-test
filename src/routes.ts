import { Express,  Request, Response} from "express";
import * as deliveriesController from "./controller/delivery.controller";
import * as botsController from "./controller/bot.controller";
export default function(app: Express) {
	// Healthcheck
	app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
	// Using bot controller
	deliveriesController.register(app)
	// Using delivery controller
	botsController.register(app)
}