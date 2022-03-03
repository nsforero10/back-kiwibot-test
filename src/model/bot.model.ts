export interface Bot {
  id: string;
  status: "available" | "busy" | "reserved";
  location: {
    dropoff_lat: number;
    dropoff_lon: number;
  };
  zone_id: string;
}
