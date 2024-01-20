import { createPosition } from './Helper'

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins',
    'black' : 'Black wins',
    'stalemate' : 'Game draws due to stalemate',
    'insufficient' : 'Game draws due to insufficient material',
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    candidateMoves : [],
    movesList : [],

    promotionSquare : null,
    //based on status popup will change
    status : Status.ongoing,
    castleDirection : {
        w : 'both',
        b : 'both'
    }, 
}