import { Application, Request, Response} from "express";

export const register = (app: Application) => {
    app.get("/bots", (req: Request, res: Response) =>{
        res.send("Bots OK");
    })
}