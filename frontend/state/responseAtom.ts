import { atom } from 'jotai';
import { SentimentRouteResult } from '../models/SentimentRouteResult';

export const responseAtom = atom<SentimentRouteResult | null>(null);
