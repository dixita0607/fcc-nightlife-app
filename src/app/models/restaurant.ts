export interface Restaurant {
  id: number;
  name: string;
  cuisines: string;
  average_cost_for_two: number;
  currency: string;
  thumb: string;
  url: string;
  stats: {
    count: number;
    visiting: boolean;
  }
}
