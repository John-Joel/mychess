import { getBishopMoves, getRookMoves, getKnightMoves, getQueenMoves, getKingMoves, getPawnMoves, getPawnCaptures , getCastlingMoves, getPiece, getKingPosition} from "./GetMove";
import { movePawn, movePiece } from "./Move";
const Arbiter = {
    getRegularMoves : function({position, piece, rank, file}) {
        if (piece.endsWith('n')) //if Knight clicked then show Rook moves
        return getKnightMoves({position,rank,file});
        if (piece.endsWith('b')) //if Bishop clicked then show Knight moves
        return getBishopMoves({position, piece, rank, file})
        if (piece.endsWith('r')) //if Rook clicked then show Bishop moves
        return getRookMoves({position, piece, rank, file})
        if (piece.endsWith('q')) //if Queen clicked then show Queen moves 
        return getQueenMoves({position, piece, rank, file})
        if (piece.endsWith('k')) //if King clicked then show King moves
        return getKingMoves({position, piece, rank, file})
        if (piece.endsWith('p')) //if Pawn clicked then show Pawn moves
        return getPawnMoves({position, piece, rank, file})
    },

    getValidMoves : function ({position, castleDirection, prevPosition, piece, rank, file}) {
        let moves = this.getRegularMoves({position, piece, rank, file})
        const notInCheckMoves = []
        if(piece.endsWith('p')){
            moves = [
                ...moves,
                ...getPawnCaptures({position,prevPosition, piece, rank, file})
            ]
        }
        if(piece.endsWith('k'))
            moves = [
                ...moves,
                ...getCastlingMoves({position, castleDirection, piece, rank, file})
            ]
        
        moves.forEach(([x,y]) => {
            const positionAfterMove = this.performMove({position,piece,rank,file,x,y})

            if(!this.isPlayerInCheck({positionAfterMove,position, player : piece[0]}))
                notInCheckMoves.push([x,y])
        })
        return notInCheckMoves
    },

    performMove : function ({position,piece,rank,file,x,y}) {
        if (piece.endsWith('p')) {
            return movePawn({position,piece,rank,file,x,y})
        }
        else {
            return movePiece({position,piece,rank,file,x,y})
        }
    },

    isPlayerInCheck : function ({positionAfterMove,position, player}) {
        const enemy = player.startsWith('w') ? 'b' : 'w'
        let kingPos = getKingPosition(positionAfterMove,player)
        const enemyPieces = getPiece(positionAfterMove,enemy)

        const enemyMoves = enemyPieces.reduce((acc,p) => acc = [
            ...acc,
            ...(p.piece.endsWith('p'))
            ? getPawnCaptures({
                position:positionAfterMove,
                prevPosition: position,
                ...p
            })
            : this.getRegularMoves({
                position : positionAfterMove,
                ...p
            })
        ],[])
        if (enemyMoves.some (([x,y]) => kingPos[0] === x && kingPos[1] === y))
        return true

        else
        return false
    }
}

export default Arbiter;