import { FishData } from ".";

export interface FishMenu {
    [fishId: string]: FishData | null;
  }