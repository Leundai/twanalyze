import { useAtom } from "jotai";
import { useEffect } from "react";
import { useQuery } from "react-query"
import { SentimentRouteResult } from "../models/SentimentRouteResult";
import { searchAtom } from "../state/searchAtom";
import { responseAtom } from "../state/responseAtom";
import { SENTIMENT_ANALYSIS_URL } from "../util/constants";

export const useMonitorHandleForFetching = () => {
    const [searchInformation, setSearchInformation] = useAtom(searchAtom)
    const [response, setResponse] = useAtom(responseAtom)

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
            setResponse(data)
        }
    }, [data])    
    
}

export default useMonitorHandleForFetching