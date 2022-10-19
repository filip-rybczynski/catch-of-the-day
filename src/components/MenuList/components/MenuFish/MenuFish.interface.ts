import { AddToOrder, FishData } from "../../../../types";

export interface MenuFishProps {
    addToOrder: AddToOrder,
    index: string,
    details: FishData;
}