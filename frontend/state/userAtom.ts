import { atom } from 'jotai';
import { User } from '../models/Tweet';

export const userAtom = atom<User | null>(null);
