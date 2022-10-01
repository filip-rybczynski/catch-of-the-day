import { FishMenu } from "../../types";

export interface MenuListProps {
    fishMenu: FishMenu,
    addToOrder: (key: string) => void
}