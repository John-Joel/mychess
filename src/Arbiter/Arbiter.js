import { GetRookMoves } from "./GetMove";
const arbiter = {
    getRegularMoves : function({position, piece, rank, file}) {
        return GetRookMoves({position, piece, rank, file})
    }
}

export default arbiter;