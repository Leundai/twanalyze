import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query"
import { SentimentRouteResult } from "../models/SentimentRouteResult";
import { searchAtom } from "../state/searchAtom";
import { userAtom } from "../state/userAtom";
import { SENTIMENT_ANALYSIS_URL } from "../util/constants";

export const useMonitorHandleForFetching = () => {
    const [searchInformation, setSearchInformation] = useAtom(searchAtom)
    const [user, setUser] = useAtom(userAtom)

    const variable = searchInformation.handle !== '' ? `?username=${searchInformation.handle}` : '';
    const url = SENTIMENT_ANALYSIS_URL + variable

    const { isLoading, error, data } = useQuery(url, () =>
        fetch(url).then(async (res) => await res.json() as SentimentRouteResult),
        { enabled: searchInformation.handle }
    )
   
    useEffect(() => {
        setSearchInformation({
            ...searchInformation,
            isLoading
        })
    }, [isLoading])

    useEffect(() => {
        if (data) {
            setUser(data?.result)
            console.log(data);
        }
    }, [data])
}

export default useMonitorHandleForFetching