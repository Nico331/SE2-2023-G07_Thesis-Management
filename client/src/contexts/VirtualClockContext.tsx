import {createContext, Dispatch, SetStateAction} from "react";

export interface VirtualClockContextType {
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean | undefined>>;
}

export const VirtualClockContext = createContext<VirtualClockContextType>({
    refresh: undefined,
    setRefresh: (refresh) => !refresh,
});