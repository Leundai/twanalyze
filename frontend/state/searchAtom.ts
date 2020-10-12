import { atom } from 'jotai';

type SearchInformation = {
    handle: string,
    isLoading: boolean
    error: string
}

export const searchAtom = atom<SearchInformation>({
    handle: '',
    isLoading: false,
    error: ''
});
