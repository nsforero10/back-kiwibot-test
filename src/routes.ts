import { Express,  Request, Response} from "express";
import db from "./db/firebase";
export default function(app: Express) {
	// Healthcheck
	app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
	app.get('/firebase', async  (req: Request, res: Response) => {
		const querySnapshot = await db.db.collection('deliveries').get();
		console.log(querySnapshot.docs[0].id)
		res.sendStatus(200)
	});
}