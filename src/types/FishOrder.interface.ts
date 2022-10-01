import { FishMenu } from ".";

export interface FishOrder {
    [key: keyof FishMenu]: number;
  }