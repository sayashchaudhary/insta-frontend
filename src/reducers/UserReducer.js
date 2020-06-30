export const initialSate = null;

export const UserReducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload
    }
    return state
}
