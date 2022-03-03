import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { database } from "./firebase"
import { Delivery } from "../model/delivery.model";
import { Bot } from "../model/bot.model";

// Abstraction to type collection data
const converter = <T>() => ({
    toFirestore: (data: T) => data,
    fromFirestore: (snap: QueryDocumentSnapshot) =>
        snap.data() as T
})
const dataPoint = <T>(collectionPath: string) => database.collection(collectionPath).withConverter(converter<T>());
const db = {
    deliveries: dataPoint<Delivery>('deliveries'),
    bots: dataPoint<Bot>('bots')
}
export { db }