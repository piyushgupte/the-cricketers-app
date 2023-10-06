import { useQuery } from "react-query";
import getPlayers from "../../../server/get-players";
import { PlayersTable } from "./player-table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { updatePageSize, updateFilter, updatePageNumber, updateSearchText } from './../../../store/cricketer-slice';

export const PlayerTableContainer = (props: any) => {
    const state = useSelector((state: RootState) => state.cricketers);
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading,isFetching, error, data, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: async () => await getPlayers(),
    })

    return (
        <PlayersTable {...props}
            refetchPlayersInfo={() => { refetch() }}
            isLoading={isLoading}
            error={error}
            data={data}
            state={state}
            dispatch={dispatch}
            updatePageSize={updatePageSize}
            updateFilter={updateFilter}
            updatePageNumber={updatePageNumber}
            updateSearchText={updateSearchText}
           

        />
    )

}