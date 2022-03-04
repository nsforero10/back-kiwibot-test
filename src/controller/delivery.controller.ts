import { Application, Request, Response } from "express";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { db } from "../db/utils";
import { v4 as uuid4 } from "uuid";

export const register = (app: Application) => {
  app.get("/deliveries", async (req: Request, res: Response) => {
    try {
      const deliveriesQuery = await db.deliveries.get();
      const deliveries = deliveriesQuery.docs.map(
        (delivery: QueryDocumentSnapshot) => {
          const data = delivery.data();
          return { id: delivery.id, ...data };
        }
      );
      res.send(deliveries);
    } catch (err) {
      res.send(err);
    }
  });
  app.post("/deliveries", async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const id = uuid4();
      if (data.state && data.pickup && data.dropoff && data.zone_id) {
        data.creation_date = Date.now();
        data.bot = null;
        await db.deliveries.doc(id).set(data);
      } else {
        res.send(422);
      }
      res.json({ id: id });
    } catch (err) {
      res.send(err);
    }
  });
  app.get("/deliveries/:deliveryId", async (req: Request, res: Response) => {
    try {
      const id = req.params.deliveryId;
      const deliveryQuery = await db.deliveries.doc(id).get();
      if (deliveryQuery.exists) {
        const delivery = { id: deliveryQuery.id, ...deliveryQuery.data() };
        res.send(delivery);
      } else {
        res.send(404);
      }
    } catch (err) {
      res.send(err);
    }
  });
  app.delete("/deliveries/:deliveryId", async (req: Request, res: Response) => {
    try {
      const id = req.params.deliveryId;
      await db.deliveries.doc(id).delete();
      res.send(id);
    } catch (err) {
      res.send(err);
    }
  });
  app.put("/deliveries/:deliveryId", async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const id = req.params.deliveryId;
      await db.deliveries.doc(id).update(data);
      const deliveryQuery = await db.deliveries.doc(id).get();
      if (deliveryQuery.exists) {
        const delivery = { id: deliveryQuery.id, ...deliveryQuery.data() };
        res.send(delivery);
      } else {
        res.send(404);
      }
    } catch (err) {
      res.send(err);
    }
  });
};
