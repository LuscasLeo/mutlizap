import { Dispatch, SetStateAction, useState } from "react";

export type PersistentState<T> = [T, Dispatch<SetStateAction<T>>, (value: T) => void];

export default <T>(key: string, intialState: T): PersistentState<T> => {
    const [value, setValue] = useState<T>(() => {
        const ls = localStorage.getItem(key);
        if(!ls)
            return intialState;
        return tryParseJson(ls);
    });

    return [value, setValue, (value: T) => localStorage.setItem(key, JSON.stringify(value))];
}

export const tryParseJson = (data: string) => {
    try{
        return JSON.parse(data);
    } catch{
        return null;
    }
}