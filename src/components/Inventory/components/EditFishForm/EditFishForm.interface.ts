import { FishData, OnEditFormChange } from "../../../../types";

export interface EditFishFormProps {
  fishId: string;
  fish: FishData;
  onEditFormChange: OnEditFormChange
  deleteFish: (key: string) => void;
}
