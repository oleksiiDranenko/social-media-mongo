import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentInterface } from "@/interfaces/Comment";

interface ListState {
    commentsList: CommentInterface[] | null
}

const initialState: ListState = {
    commentsList: null
}

export const commentsList = createSlice({
    name: 'commentsdList',
    initialState,
    reducers: {
        updateList: (state, action: PayloadAction<CommentInterface[]>) => {
            return {
                commentsList: action.payload
            };
        }
    }
})

export const { updateList } = commentsList.actions
export default commentsList.reducer