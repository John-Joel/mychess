import "./Pieces.css"
import Piece from "./Piece";
import {useRef} from "react";
import { clearCandidates, makeNewMove } from "../../Reducer/Action/Move";
import { useAppContext } from "../../Contexts/Context"; 
import { openPromotion } from "../../Reducer/Action/popup";
import Arbiter from "../../Arbiter/Arbiter";
import { getCastleDirection } from "../../Arbiter/GetMove";
import { updateCastling } from "../../Reducer/Action/game";

const Pieces = () => {
    const {appState , dispatch} = useAppContext();
    const currentPosition = appState.position[appState.position.length-1];
    const ref = useRef()

    const calculateCoords = e => {
        const {top,left,width} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size) 
        const x = 7 - Math.floor((e.clientY - top) / size)      
        return {x,y}
    }

    const openPromotionBox = ({rank,file,x,y}) => {
        dispatch(openPromotion({
            rank : Number(rank),
            file : Number(file),
            x,
            y
        }))
    }
    
    const updateCastlingState = ({piece,rank,file}) => {
        const direction = getCastleDirection({
            castleDirection : appState.castleDirection,
            piece,rank,file
        })
        if (direction) {
            dispatch(updateCastling(direction))
        }
    }

    const move = e => {
        const {x,y} = calculateCoords(e)
        const [piece,rank,file] = e.dataTransfer.getData('text').split(',')
    // checking the move is valid move or not
    if(appState.candidateMoves.find(m => m[0] === x && m[1] === y)) {
    
    if((piece ==='wp' && x === 7) || (piece === 'bp' && x === 0)) {
        openPromotionBox({rank,file,x,y})
        return 
    }
    if(piece.endsWith('r') || piece.endsWith('k')) {
        updateCastlingState({piece,file,rank})
    }

    const newPosition = Arbiter.performMove({
        position : currentPosition,
        piece,rank,file,
        x,y
        })
        dispatch(makeNewMove({newPosition}))
        }
        dispatch(clearCandidates())
    }

    const onDrop = e => {
        e.preventDefault()

        move(e)
    }

    const onDragOver = e => {e.preventDefault()}

    return <div 
        className='pieces' 
        ref={ref} 
        onDrop={onDrop} 
        onDragOver={onDragOver} > 
        {currentPosition.map((r,rank) => 
            r.map((f,file) => 
                currentPosition[rank][file]
                ?   <Piece 
                        key={rank+'-'+file} 
                        rank = {rank}
                        file = {file}
                        piece = {currentPosition[rank][file]}
                    />
                :   null
            )   
        )}
    </div>
}

export default Pieces;