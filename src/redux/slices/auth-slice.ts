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
        },
        updateAvatar: (state, action: PayloadAction<number>) => {
            if (state.value.user) {
                state.value.user.avatar = action.payload;
            }
        },
        updateAbout: (state, action: PayloadAction<string>) => {
            if (state.value.user) {
                state.value.user.about = action.payload;
            }
        }
    }
})

export const { logIn, logOut, updateAvatar, updateAbout } = auth.actions;
export default auth.reducer;