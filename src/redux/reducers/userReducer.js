const initialState = {
    user: null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: action.payload }
        
        case 'UNSET_USER':
            return { user: null, }
        
        default:
            return state;
    }
}

export default userReducer;