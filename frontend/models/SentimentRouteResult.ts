import { User } from "./Tweet";

export interface SentimentRouteResult {
    message: string,
    success: boolean,
    result?: User,
}