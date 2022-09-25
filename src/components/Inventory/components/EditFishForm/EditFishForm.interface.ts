import { ChangeEvent } from "react";
import { FishProperties } from "../../../../types";

export interface EditFishFormProps {
  fishId: string;
  fish: FishProperties;
  onEditFormChange: (
    fishId: string,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  deleteFish: (key: string) => void;
}
