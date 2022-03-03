import { Application, Request, Response} from "express";
import { FieldValue, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../db/utils"
import { v4 as uuid4 } from "uuid";

export const register = (app: Application) => {
    app.get("/bots", async (req: Request, res: Response) =>{
        try {
            const botsQuery = await db.bots.get()
            const bots = botsQuery.docs.map((delivery: QueryDocumentSnapshot) => {
                const data = delivery.data()
                return { id: delivery.id, ...data}
            });
            res.send(bots);
        } catch (err) {
            res.send(err)
        }
    })
    app.post("/bots", async (req: Request, res: Response) =>{
        try {
            const data = req.body;
            const id = uuid4();
            if (data.location && data.status && data.zone_id) {
                // Use date from server to set date instead using device timestamp
                data.creation_date = FieldValue.serverTimestamp();
                await db.bots.doc(id).set(data);
            } else {
                res.send(422)
            }
            res.json({id: id})
        } catch (err) {
            res.send(err)
        }
    })
    app.get("/bots/:botId", async (req: Request, res: Response) =>{
        try {
            const id = req.params.botId
            const botQuery = await db.bots.doc(id).get()
            if (botQuery.exists){
                const delivery = {id: botQuery.id, ...botQuery.data()}
                res.send(delivery);
            } else {
                res.send(404)
            }
        } catch (err) {
            res.send(err)
        }
    })
    app.delete("/bots/:botId", async (req: Request, res: Response) =>{
        try {
            const id = req.params.botId
            await db.bots.doc(id).delete() 
            res.send(id)
        } catch (err) {
            res.send(err)
        }
    })
    app.put("/bots/:botId", async (req: Request, res: Response) =>{
        try {
            const data = req.body;
            const id = req.params.botId
            await db.bots.doc(id).update(data)
            res.send(id)
        } catch (err) {
            res.send(err)
        }
    })
}