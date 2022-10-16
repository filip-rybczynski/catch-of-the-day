import { AddFish } from "../../types";

export interface InventoryProps {
    addFish: AddFish;
    loadSampleFishes: () => void;
    storeId: string;
}