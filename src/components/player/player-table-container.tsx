
import { PlayersTable } from "./player-table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { updatePageSize, updateFilter, updatePageNumber, updateSearchText, updateDrState } from '../../store/cricketer-slice';
import { usePlayersQuery } from "../../util/players-query";

export const PlayerTableContainer = () => {
    const state = useSelector((state: RootState) => state.cricketers);
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading, error, data, refetch } = usePlayersQuery()


    return (
        <PlayersTable
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
            updateDrState={updateDrState}
           

        />
    )

}