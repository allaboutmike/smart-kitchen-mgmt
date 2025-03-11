export interface SelectionObject{
    isCurrentSelection: (selVal: string)=> boolean;
    setCurrentSelection: (passedValue: string)=> void;
    popularName?: string
}
