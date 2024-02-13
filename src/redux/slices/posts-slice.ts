import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostInterface } from "@/interfaces/Post";

interface ListState {
    postsList: PostInterface[] | null;
}

const initialState: ListState = {
    postsList: null,
}

export const list = createSlice({
    name: 'list',
    initialState,
    reducers: {
        updateList: (state, action: PayloadAction<PostInterface[]>) => {
            return {
                postsList: action.payload
            };
        }
    }
})


export const { updateList } = list.actions;
export default list.reducer;