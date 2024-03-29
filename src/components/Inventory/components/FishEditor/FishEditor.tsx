import React from "react";
import { EditFishForm } from "..";
import { FishEditorProps } from "./FishEditor.interface";

export const FishEditor = ({
  fishMenu,
  onEditFormChange,
  deleteFish,
}: FishEditorProps) => {
  return (
    <>
      {Object.keys(fishMenu).map((key) => (
        <EditFishForm
          key={key}
          fishId={key}
          fish={fishMenu[key]}
          onEditFormChange={onEditFormChange}
          deleteFish={deleteFish}
        />
      ))}
    </>
  );
};
