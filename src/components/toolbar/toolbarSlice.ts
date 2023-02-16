import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDatabase, ref, set } from "firebase/database";
import { FirebaseError } from '@firebase/util'

import { nanoid } from "nanoid";

export const savePictureToDB = createAsyncThunk(
  "savePicture/toolbarSlice",

  async ({ img, userId }: { img: string, userId: string }, { rejectWithValue }) => {
    const db = getDatabase();
    const i = nanoid()
    try {
      const savePict = await set(ref(db, `users/${userId}/img/${i}`), {
        id: i,
        img: img,
        createdAt: new Date().getTime()
      });

      return savePict;
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.error(error.code)
        return rejectWithValue(error.code);
      }
    }
  }
)

const initialState = {
  saved: false,
  error: false
}

const toolbarSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(savePictureToDB.pending, state => {
        state.saved = false
        state.error = false
      })
      .addCase(savePictureToDB.fulfilled, state => {
        state.saved = true
      })
      .addCase(savePictureToDB.rejected, state => {
        state.error = true
      })
  }

});

const { reducer } = toolbarSlice;
export default reducer;
