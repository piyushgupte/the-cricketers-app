

import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TPlayer } from "../../../server/types";
import './Styles.scss';
import UnstyledInput from "../../Input";



type PlayersTableProps = {
    isLoading: boolean,
    error: unknown,
    data: TPlayer[] | undefined,
    refetchPlayersInfo:  ()=>void,
}


export const PlayersTable = ({ isLoading, error, data, refetchPlayersInfo }: PlayersTableProps) => {
    const rows = data as TPlayer[];
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error || data === undefined) {
        return <div>Error: {error?.toString()}</div>;
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

    return (
        <div style={{ height: '70%', width: '100%' }}>
            <div>
                Search by Player Type / Name
            </div>
            <div className="player-search">
                <UnstyledInput/>
                <IconButton onClick={(event)=>{
                    event.stopPropagation();
                    refetchPlayersInfo();
                    }}  aria-label="delete" className="player-refresh-btn">
                    <RefreshIcon/>
                </IconButton>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Name<ArrowDropDownIcon fontSize="small" /><ArrowDropUpIcon fontSize="small"/></TableCell>
                            <TableCell align="center">Points<ArrowDropDownIcon fontSize="small" /><ArrowDropUpIcon fontSize="small"/></TableCell>
                            <TableCell align="center">Type<ArrowDropDownIcon fontSize="small" /><ArrowDropUpIcon fontSize="small"/></TableCell>
                            <TableCell align="center">Rank<ArrowDropDownIcon fontSize="small" /><ArrowDropUpIcon fontSize="small"/></TableCell>
                            <TableCell align="center">Age<ArrowDropDownIcon fontSize="small" /><ArrowDropUpIcon fontSize="small"/></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.points}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.rank}</TableCell>
                                <TableCell align="center">{calculateAge(row.dob as number)}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow key={'footer'} >
                            <TableCell colSpan={5}>

                            <div className="player-tabel-footer" >
                                <div>Rows per page:</div>
                                <div>
                                    <select id="pageSize" name="pageSize">
                                        <option value="volvo">10</option>
                                        <option value="saab">5</option>
                                    </select>
                                </div>
                                
                               <NavigateBeforeIcon/>
                                <SkipPreviousIcon/>
                                <span>page 1 of 1</span>
                                <SkipNextIcon/>
                                <NavigateNextIcon/>
                            </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    )


}