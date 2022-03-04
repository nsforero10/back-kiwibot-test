export interface Bot {
  id: string;
  number: number;
  status: "available" | "busy" | "reserved";
  location: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
}
