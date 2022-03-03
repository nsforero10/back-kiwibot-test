export interface Delivery {
  id: string;
  creatioDate: Date;
  state: "pending" | "assigned" | "in_trasing" | "delivered";
  pickup: {
    pickup_lat: number;
    pickup_lon: number;
  };
  dropoff: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
}
