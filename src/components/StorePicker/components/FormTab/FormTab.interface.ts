import { ReactNode } from "react";

export interface FormTabProps {
    index: number,
    activeTab: number,
    render: (isActive: boolean) => ReactNode;
}