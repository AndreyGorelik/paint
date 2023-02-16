import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDatabase, ref, set } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from '@firebase/util'
import { Auth } from '../../interfaces';

const initialState: Auth = {
    email: null,
    id: null,
    loadingStatus: false,
    error: null
};

export const login = createAsyncThunk(
    "login/authSlice",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        const auth = getAuth();
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            return { email: response.user.email, id: response.user.uid };
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.code)
                return rejectWithValue(error.code);
            }
        }
    }
)

export const signUp = createAsyncThunk(
    "signUp/authSlice",
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        const auth = getAuth();
        const db = getDatabase();
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            const setId = await set(ref(db, `users/${response.user.uid}`), {
                email: email,
            });
            return setId;
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                return rejectWithValue(error.code);
            }
        }
    }
)

export const restorePassword = createAsyncThunk(
    "restorePassword/authSlice",
    async (email: string, { rejectWithValue }) => {
        const auth = getAuth();
        try {
            return await sendPasswordResetEmail(auth, email)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error.code)
                return rejectWithValue(error.code);
            }
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.id = action.payload.id;
        },
        setLoadingStatus(state, action) {
            state.loadingStatus = action.payload;
        },
        setError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, state => {
                state.loadingStatus = true
                state.error = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loadingStatus = false
                state.error = null
                state.email = action.payload!.email
                state.id = action.payload!.id
            })
            .addCase(login.rejected, (state, action) => {
                state.loadingStatus = false
                state.error = (action.payload as string)
            })
            .addCase(restorePassword.pending, (state) => {
                state.loadingStatus = true
                state.error = null
            })
            .addCase(restorePassword.fulfilled, (state) => {
                state.loadingStatus = false
                state.error = null
            })
            .addCase(restorePassword.rejected, (state, action) => {
                state.loadingStatus = false
                state.error = (action.payload as string)
            })
            .addCase(signUp.pending, state => {
                state.loadingStatus = true
                state.error = null
            })
            .addCase(signUp.fulfilled, state => {
                state.loadingStatus = false
                state.error = null
            })
            .addCase(signUp.rejected, (state, action) => {
                state.loadingStatus = false
                state.error = (action.payload as string)
            })
    }
});

const { reducer, actions } = authSlice;
export const { setUser, setLoadingStatus, setError } = actions;
export default reducer;