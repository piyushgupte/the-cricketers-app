
import * as ReactQuery from 'react-query'
import getPlayers from "../server/get-players";
export function usePlayersQuery(){
    return ReactQuery.useQuery({
        queryKey: ['repoData'],
        queryFn: async () => await getPlayers(),
    })
}