export interface NavTabProps {
    index: number,
    activeTab: number,
    tabName: string,
    mainClassName: string,
    clickHandler: (i: number) => void;
}