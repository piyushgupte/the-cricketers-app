import {  Drawer, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { TPlayer } from "../../../server/types";
import { calculateAge } from "../../../util/util";
import CloseIcon from '@mui/icons-material/Close';

export type Anchor = 'top' | 'left' | 'bottom' | 'right';

export const PlayerDrawer = ({ anchor, playerId, cricketers, onClose }: { anchor: boolean, playerId: string, cricketers: TPlayer[] | undefined, onClose: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const selectedPlayer = cricketers?.filter((cricketer) => {
        return cricketer.id === playerId
    }) as TPlayer[];
    const filteredPlayers = cricketers?.filter((cric) => {
        return cric.type === selectedPlayer[0]?.type ? selectedPlayer[0]?.type : ''
    }).splice(0, 5) as TPlayer[]

    return (
        <div>

            <Drawer
            
                anchor={'right'}
                open={anchor}
                onClose={() => onClose(false)}
            >
                <div className="player-details-container">
                    <div className="first-row">
                        <IconButton onClick={() => onClose(false)}>
                            <CloseIcon />
                        </IconButton></div>
                    <div className="row">
                        <div className="player-details-heading">Cricketer Details</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Name:</div><div className="player-details-info">{selectedPlayer ? selectedPlayer[0]?.name : ''}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Description:</div><div className="player-details-info">{selectedPlayer ? selectedPlayer[0]?.description : ''}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Type:</div><div className="player-details-info">{selectedPlayer ? selectedPlayer[0]?.type : ''}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Points:</div><div className="player-details-info">{selectedPlayer ? selectedPlayer[0]?.points : ''}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Rank:</div><div className="player-details-info">{selectedPlayer ? selectedPlayer[0]?.rank : ''}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Date of Birth:</div><div className="player-details-info">{new Date(selectedPlayer ? selectedPlayer[0]?.dob as number : 0).toDateString()}</div>
                    </div>
                    <div className="row">
                        <div className="player-details-subheading">Age:</div><div className="player-details-info">{calculateAge(selectedPlayer ? selectedPlayer[0]?.dob as number : 0)}</div>
                    </div>


                    {/* <Button onClick={() => onClose(false)} variant="outlined"> Close </Button> */}

                </div>
                <div className="similar-players-container">
                    <div className="row">
                        <div className="player-details-heading">Similar Players</div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Points</TableCell>
                                    <TableCell align="center">Rank</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPlayers?.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell align="center">{row.name}</TableCell>
                                        <TableCell align="center">{row.points}</TableCell>
                                        <TableCell align="center">{row.rank}</TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>

                </div>

            </Drawer>
        </div>
    )
}