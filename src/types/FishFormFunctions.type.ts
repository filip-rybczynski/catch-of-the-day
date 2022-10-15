import { FishData } from "./FishData.interface";
import { FishFormChangeEvent } from "./FishFormChangeEvent.type";

export type AddFish = (fish: FishData) => void;
export type DeleteFish = (key: string) => void;

export type AddToOrder = (key: string) => void;
export type DeleteOrderFish = (key: string) => void;

export type OnEditFormChange = (fishId: string, e: FishFormChangeEvent) => void;
