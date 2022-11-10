import { DeleteFish, FishMenu, FishOrder } from "../../types";

export interface OrderProps {
    fishMenu: FishMenu,
    order: FishOrder,
    deleteOrderFish: DeleteFish,
}