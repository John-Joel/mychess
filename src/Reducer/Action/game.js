import actionTypes from "../ActionType"

export const updateCastling = direction => {
    return {
        type : actionTypes.CAN_CASTLE,
        payload : direction
    }
}