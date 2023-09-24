import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "@/interfaces/User";

interface authState {
    auth: boolean,
    user: UserInterface | null
}

const initialState = {
    value: {
        auth: false,
        user: null
    } as authState
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return {
                value: {
                    auth: false,
                    user: null
                }
            };
        },
        logIn: (state, action: PayloadAction<UserInterface>) => {
            return {
                value: {
                    auth: true,
                    user: action.payload
                }
            }
        }
    }
})

export const { logIn, logOut } = auth.actions;
export default auth.reducer;