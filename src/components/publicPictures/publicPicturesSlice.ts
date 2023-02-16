import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, child, get } from "firebase/database";
import { PublicPicture, User, UserInfo } from "../../interfaces/index"

const initialState: PublicPicture = {
    pictures: {},
    loadingStatus: false,
    error: null
};

export const getPictures = createAsyncThunk(
    "getPictures/publicPicturesSlice",
    async () => {
        try {
            const dbRef = ref(getDatabase());
            let response = await get(child(dbRef, `users/`))
            let answer: User = await response.val()
            return answer;
        } catch (error) {
            console.log(error)
        }
    }
)

const publicPicturesSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getPictures.pending, state => {
                state.loadingStatus = true
                if (state.error) {
                    state.error = null
                }
            })
            .addCase(getPictures.fulfilled, (state, action) => {
                if (action.payload) {
                    Object.values(action.payload).forEach((item: UserInfo) => {
                        if (item.img) {
                            const user = Object.values(item.img).sort((a, b) => b.createdAt - a.createdAt)
                            state.pictures[item.email] = user;
                        }
                    })
                    state.loadingStatus = false
                }
            })
            .addCase(getPictures.rejected, (state, action) => {
                state.loadingStatus = false
                state.error = (action.payload as string)
            })
    }
});

const { reducer } = publicPicturesSlice;
export default reducer;