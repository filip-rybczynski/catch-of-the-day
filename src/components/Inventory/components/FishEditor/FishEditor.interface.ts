import { DeleteFish, FishMenu, OnEditFormChange } from "../../../../types";

export interface FishEditorProps {
    fishMenu: FishMenu;
    onEditFormChange: OnEditFormChange;
    deleteFish: DeleteFish;
}