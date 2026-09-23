import { useRetrieve } from "../../../hooks/useRetrieve";
import { retriveDoubt } from "../api/doubts";

export function useDoubtDetail(doubtId){
    return useRetrieve(retriveDoubt, "doubt", doubtId)
}