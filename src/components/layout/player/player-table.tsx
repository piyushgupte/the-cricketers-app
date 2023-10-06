

import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TPlayer, TPlayerType } from "../../../server/types";
import './Styles.scss';
import Input from "../../Input";
import { AppDispatch } from "../../../store";
import { PlayerFilter, cricketerSliceType, updatePageSize } from "../../../store/cricketer-slice";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useState } from "react";
import { Anchor, PlayerDrawer } from "./player-drawer";
import { Link } from "react-router-dom";
import { calculateAge } from "../../../util/util";



type PlayersTableProps = {
    isLoading: boolean,
    error: unknown,
    data: TPlayer[] | undefined,
    refetchPlayersInfo: () => void,
    state: cricketerSliceType,
    updatePageSize: ActionCreatorWithPayload<cricketerSliceType, "cricketers/updatePageSize">,
    updateFilter: ActionCreatorWithPayload<cricketerSliceType, "cricketers/updateFilter">,
    updatePageNumber: ActionCreatorWithPayload<cricketerSliceType, "cricketers/updatePageNumber">,
    updateSearchText: ActionCreatorWithPayload<cricketerSliceType, "cricketers/updateSearchText">,
    dispatch: AppDispatch
}

export const PlayersTable = ({ isLoading, error, data, refetchPlayersInfo, dispatch, updateFilter, updatePageNumber, updateSearchText, state }: PlayersTableProps) => {
    const { filter, pageNumber, pageSize, searchText } = state;
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || data === undefined) {
        return <div>Error: {error?.toString()}</div>;
    }


    //     setTotalFilteredRows(()=>{
    //         const temp = data.filter(player => {
    //         const lowerFilterValue = searchText.toLowerCase();
    //         return player?.name?.toLowerCase().includes(lowerFilterValue) || player?.type?.toLowerCase() === lowerFilterValue;
    //     })
    //     return temp.length
    // })
    const [drState, setDrState] = useState(false);
    const [selectedPlayerId, setSelectedPlayerId] = useState('');

    type FilteredRowsInfo = {
        filterdPlayers: TPlayer[];
        totalFilteredPages: number;
    };

    type Player ={
        id: string;
        name: string;
        description:string;
        type:TPlayerType;
        points:number;
        rank:number;
        dob:number;
    }
    const filterPlayers = (filterName:string,filterType:string,players: TPlayer[])=>{
        if( players){
            const tempPlayers = players as Player[]

           return tempPlayers.slice().sort((a , b) => {
                if (filterName === "name") {
                    return filterType === "asc" ? a.name.localeCompare(b.name) : b?.name?.localeCompare(a.name);
                } else if (filterName === "age") {
                    return filterType === "asc" ?  b.dob - a.dob  :a.dob - b.dob;
                } else if (filterName === "rank") {
                    return filterType === "asc" ? a.rank - b.rank : b.rank - a.rank;
                }
                return 0; // No sorting, return the original order
            });
        }
        return players;
    }
    const filterAndPaginatePlayers = (array: TPlayer[], filterValue: string, pageSize: number, pageNumber: number, playerFilter:PlayerFilter) => {

        const [filterName,filterType] = playerFilter?.split("_");
        const sortedArray = filterPlayers(filterName,filterType,array);
        // if (searchText.trim().length !== 0) {
        //     setCurrentPage(pageNumber);
        //     dispatch(updatePageNumber({ ...state, pageNumber: 0 }));
        // } else {
        //     dispatch(updatePageNumber({ ...state, pageNumber: currentPage }))
        // }
        if (filterValue.trim() === '') {
            // Return all elements if filterValue is an empty string
            const startIndex = (pageNumber) * pageSize;
            const endIndex = startIndex + pageSize;
            //  setTotalFilteredRows(array.length);
            return { filterdPlayers: sortedArray.slice(startIndex, endIndex), totalFilteredPages: sortedArray.length }
        }

        const filteredPlayers = sortedArray.filter(player => {
            const lowerFilterValue = filterValue.toLowerCase();
            return player?.name?.toLowerCase().includes(lowerFilterValue) || player?.type?.toLowerCase() === lowerFilterValue;
        });
        // setTotalFilteredRows(filteredPlayers.length);

        const startIndex = (pageNumber) * pageSize;
        const endIndex = startIndex + pageSize;

        return { filterdPlayers: filteredPlayers.slice(startIndex, endIndex), totalFilteredPages: filteredPlayers.length }
    }

    const [filteredRows, setfilteredRows] = useState<FilteredRowsInfo>(filterAndPaginatePlayers(data, '', pageSize, pageNumber,filter))


    const rows = data as TPlayer[];
    console.log("data:", rows);


    //const filterdPlayers = filterAndPaginatePlayers(rows,searchText,pageSize,pageNumber);


    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // if (input.trim().length !== 0) {
        //     setCurrentPage(pageNumber);
        //     dispatch(updatePageNumber({ ...state, pageNumber: 0 }));
        // } else {
        //     dispatch(updatePageNumber({ ...state, pageNumber: currentPage }))
        // }
        dispatch(updateSearchText({ ...state, searchText: input }));
        // setLocalSearchText(e.target.value);
    }





    const minIndex = pageNumber * pageSize;
    const maxIndex = minIndex + pageSize;
    // const filteredRows = rows.slice(minIndex,maxIndex)
    //  setfilteredRows( filterAndPaginatePlayers(rows, '', pageSize, pageNumber));
    console.log("filtered data:", filteredRows);
    const totalPages = Number(filteredRows.totalFilteredPages % pageSize) === 0 ? Number(filteredRows.totalFilteredPages / pageSize) : Math.trunc(Number(filteredRows.totalFilteredPages / pageSize));

    return (
        <div style={{ height: '70%', width: '100%' }}>
            <div className="player-table-serch-lable">
                Search by Player Type / Name
            </div>
            <div className="player-search">
                <Input value={searchText} onChange={handleSearchTextChange} />
                <Button variant="outlined" onClick={(e) => {
                    e.preventDefault();
                    setfilteredRows(filterAndPaginatePlayers(rows, searchText, pageSize, pageNumber,filter));
                    // dispatch(updateSearchText({ ...state, searchText: localSearchText }));
                    // dispatch(updatePageNumber({...state,pageNumber:0}));


                }} href="#outlined-buttons">
                    Apply filter
                </Button>
                <IconButton onClick={(event) => {
                    event.stopPropagation();
                    refetchPlayersInfo();
                }} aria-label="delete" className="player-refresh-btn">
                    <RefreshIcon />
                </IconButton>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="name_asc"?"name_dec":"name_asc"}))}}>Name{filter==="name_dec"&&<ArrowDropDownIcon fontSize="small" />}{ filter==="name_asc" &&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                            <TableCell align="center">Points</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="rank_asc"?"rank_dec":"rank_asc"}))}}>Rank{filter==="rank_dec"&&<ArrowDropDownIcon fontSize="small" />}{filter==="rank_asc"&&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                            <TableCell align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="age_asc"?"age_dec":"age_asc"}))}}>Age {filter==="age_dec"&&<ArrowDropDownIcon fontSize="small" />}{filter==="age_asc"&&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.filterdPlayers?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell onClick={() => {
                                    setDrState(() => true)
                                    setSelectedPlayerId(() => row.id || '')
                                }} align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.points}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.rank}</TableCell>
                                <TableCell align="center">{calculateAge(row.dob as number)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow key={'footer'} >
                            <TableCell colSpan={5}>

                                <div className="player-tabel-footer" >
                                    <div>Total records: {rows.length}</div>
                                    <div>Total pages:{totalPages}</div>
                                    <div>current page:{pageNumber}</div>
                                    <div className="mr1">Rows per page:</div>
                                    <div>
                                        <select id="pageSize" onChange={(e) => {
                                            dispatch(updatePageSize({ ...state, pageSize: Number(e.target.value) }))
                                            setfilteredRows(filterAndPaginatePlayers(rows, searchText, Number(e.target.value), pageNumber,filter));
                                        }} value={pageSize} name="pageSize">
                                            <option value="10">10</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: 0 }))
                                        setfilteredRows(filterAndPaginatePlayers(rows, searchText, pageSize, 0,filter));
                                    }} disabled={minIndex <= 0} >
                                        <SkipPreviousIcon />
                                    </IconButton>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: pageNumber - 1 }))
                                        setfilteredRows(filterAndPaginatePlayers(rows, searchText, pageSize, pageNumber - 1,filter));
                                    }} disabled={minIndex <= 0}>
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    <span>{minIndex} - {maxIndex > rows.length ? rows.length : maxIndex} of {filteredRows.totalFilteredPages}</span>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: pageNumber + 1 }))
                                        setfilteredRows(filterAndPaginatePlayers(rows, searchText, pageSize, pageNumber + 1,filter));
                                    }} disabled={pageNumber == totalPages}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: totalPages }))
                                        setfilteredRows(filterAndPaginatePlayers(rows, searchText, pageSize, totalPages,filter));
                                    }} disabled={pageNumber == totalPages}>
                                        <SkipNextIcon />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {rows &&
                <PlayerDrawer cricketers={rows} playerId={selectedPlayerId} anchor={drState} onClose={setDrState} />
            }
        </div>
    )


}