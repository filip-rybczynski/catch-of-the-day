import { FishData, FishFormChangeEvent } from "../../../../types";

export interface EditFishFormProps {
  fishId: string;
  fish: FishData;
  onEditFormChange: (
    fishId: string,
    e: FishFormChangeEvent
  ) => void;
  deleteFish: (key: string) => void;
}
