import { useQuery } from "react-query";
import getPlayers from "../../../server/get-players";
import { PlayersTable } from "./player-table";

export const PlayerTableContainer = (props:any)=>{

    const { isFetching, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () =>  await getPlayers(),
    })

    return(
        <PlayersTable {... props } refetchPlayersInfo={()=>{refetch()}} isLoading={isFetching} error={error} data={data}/>
    )

}