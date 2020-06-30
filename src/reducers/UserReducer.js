export const initialSate = null;

export const UserReducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload
    }
    if (action.type === 'CLEAR') {
        return null
    }
    return state
}
