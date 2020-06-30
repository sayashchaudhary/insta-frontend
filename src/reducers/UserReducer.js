export const initialSate = null;

export const UserReducer = (state, action) => {
    if (action === 'USER') {
        return action.payload
    }
    return state
}
