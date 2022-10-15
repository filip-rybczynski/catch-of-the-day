import { AddFish, DeleteFish, FishMenu, OnEditFormChange } from "../../types";

export interface InventoryProps {
    addFish: AddFish;
    loadSampleFishes: () => void;
    fishMenu: FishMenu;
    onEditFormChange: OnEditFormChange;
    deleteFish: DeleteFish;
    storeId: string;
}