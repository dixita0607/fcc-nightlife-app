export interface Restaurant {
  id: number;
  name: string;
  stats: {
    count: number;
    visiting: boolean;
  }
}
