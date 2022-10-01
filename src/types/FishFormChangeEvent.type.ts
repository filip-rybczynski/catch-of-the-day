import { ChangeEvent } from "react";

export type FishFormElements = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export type FishFormChangeEvent = ChangeEvent<FishFormElements>