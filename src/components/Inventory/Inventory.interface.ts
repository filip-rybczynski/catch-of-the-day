import { FishData, FishFormChangeEvent } from "../../types";

export interface InventoryProps {
    addFish: (fish: FishData) => void;
    loadSampleFishes: () => void;
    fishMenu: {[x: string]: FishData};
    onEditFormChange: (fishId: string, e: FishFormChangeEvent) => void;
    deleteFish: (key: number) => void;
    storeId: string;
}