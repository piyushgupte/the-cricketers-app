

import { useState } from "react";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import {  PlayerDrawer } from "./player-drawer";
import Input from "../../Input";
import { AppDispatch } from "../../../store";
import { PlayerFilter, cricketerSliceType, updatePageSize } from "../../../store/cricketer-slice";

import { TPlayer, TPlayerType } from "../../../server/types";

import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RefreshIcon from '@mui/icons-material/Refresh';
import './Styles.scss';


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
    updateDrState : ActionCreatorWithPayload<cricketerSliceType, "cricketers/updateDrState">,
    dispatch: AppDispatch
}
type Player ={
    id: string;
    name: string;
    description:string;
    type:TPlayerType;
    points:number;
    rank:number;
    dob:number;
}

export const PlayersTable = ({ isLoading, error, data, refetchPlayersInfo, dispatch, updateFilter, updatePageNumber, updateSearchText,updateDrState, state }: PlayersTableProps) => {
   
    const { filter, pageNumber, pageSize, searchText, isDrOpen } = state;
    const [drState, setDrState] = useState(false);
    const [selectedPlayerId, setSelectedPlayerId] = useState('_1');

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || data === undefined) {
        return <div>Error: {error?.toString()}</div>;
    }


  // function declarations

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
        if (filterValue.trim() === '') {
            // Return all elements if filterValue is an empty string
            const startIndex = (pageNumber) * pageSize;
            const endIndex = startIndex + pageSize;
            //  setTotalFilteredRows(array.length);
            return { filterdPlayers: sortedArray.slice(startIndex, endIndex), totalFilteredPages: sortedArray.length }
        }
        const filteredPlayers = sortedArray.filter(player => {
            const lowerFilterValue = filterValue.toLowerCase();
           
            return player?.name?.toLowerCase().includes(lowerFilterValue) || player?.type?.toLowerCase().includes(lowerFilterValue);
        });
        const startIndex = (pageNumber) * pageSize;
        const endIndex = startIndex + pageSize;

        return { filterdPlayers: filteredPlayers.slice(startIndex, endIndex), totalFilteredPages: filteredPlayers.length }
    }
   
    const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
       
        dispatch(updateSearchText({ ...state,pageNumber:0, searchText: input }));
        dispatch(updatePageNumber({ ...state,pageNumber:0 }));
       
    }
    
    const calculateAge = (dobEpoch: number) => {
        // Get the current date in epoch time (in seconds)
        const currentDateEpoch = Math.floor(Date.now() / 1000);
        // Convert the DOB epoch time to milliseconds
        const dobMillis = dobEpoch;
        // Calculate the time difference in milliseconds
        const timeDiffMillis = currentDateEpoch * 1000 - dobMillis;
        // Convert milliseconds to years
        const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Account for leap years
        const age = Math.floor(timeDiffMillis / millisecondsPerYear);
        return age;
    }

    // local constants

    const rows = data as TPlayer[];
    const filteredRows = filterAndPaginatePlayers(rows,searchText,pageSize,pageNumber,filter);
    const minIndex = pageNumber * pageSize;
    const maxIndex = minIndex + pageSize;
    const totalPages = Number(filteredRows.totalFilteredPages % pageSize) === 0 ? Number(filteredRows.totalFilteredPages / pageSize) : Math.trunc(Number(filteredRows.totalFilteredPages / pageSize));

    return (
        <div style={{ height: '70%', width: '100%' }}>
            <div className="player-table-serch-lable">
                Search by Player Type / Name
            </div>
            <div className="player-search">
                <Input value={searchText} onChange={handleSearchTextChange} />
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
                            <TableCell className="tabel-cell" align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="name_asc"?"name_dec":"name_asc"}))}}>Name{filter==="name_dec"&&<ArrowDropDownIcon fontSize="small" />}{ filter==="name_asc" &&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                            <TableCell align="center">Points</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell className="tabel-cell" align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="rank_asc"?"rank_dec":"rank_asc"}))}}>Rank{filter==="rank_dec"&&<ArrowDropDownIcon fontSize="small" />}{filter==="rank_asc"&&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                            <TableCell className="tabel-cell" align="center" onClick={()=>{dispatch(updateFilter({...state,filter:filter==="age_asc"?"age_dec":"age_asc"}))}}>Age {filter==="age_dec"&&<ArrowDropDownIcon fontSize="small" />}{filter==="age_asc"&&<ArrowDropUpIcon fontSize="small" />}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRows.filterdPlayers?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell onClick={() => {
                                   // setDrState(() => true)
                                    setSelectedPlayerId(() => row.id || '')
                                    dispatch( updateDrState({...state,isDrOpen:true}))
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
                                        }} value={pageSize} name="pageSize">
                                            <option value="10">10</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: 0 }))
                                    }} disabled={minIndex <= 0} >
                                        <SkipPreviousIcon />
                                    </IconButton>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: pageNumber - 1 }))
                                    }} disabled={minIndex <= 0}>
                                        <NavigateBeforeIcon />
                                    </IconButton>
                                    <span>{minIndex} - {maxIndex > rows.length ? rows.length : maxIndex} of {filteredRows.totalFilteredPages}</span>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: pageNumber + 1 }))
                                    }} disabled={pageNumber == totalPages}>
                                        <NavigateNextIcon />
                                    </IconButton>
                                    <IconButton onClick={(e) => {
                                        e.stopPropagation();
                                        dispatch(updatePageNumber({ ...state, pageNumber: totalPages }))
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
                <PlayerDrawer cricketers={rows} playerId={selectedPlayerId} anchor={isDrOpen} onClose={()=>{dispatch( updateDrState({...state,isDrOpen:false}))}} />
            }
        </div>
    )


}