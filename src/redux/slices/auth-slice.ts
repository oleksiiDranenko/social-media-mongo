import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface authState {
    auth: boolean
}

const initialState = {
    value: {
        auth: false
    } as authState
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action: PayloadAction) => {
            return {
                value: {
                    auth: true
                }
            }
        }
    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;