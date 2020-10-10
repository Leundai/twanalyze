import { atom } from 'jotai';

type SearchInformation = {
    handle: string,
    isLoading: boolean
}

export const searchAtom = atom<SearchInformation>({
    handle: '',
    isLoading: false
});
