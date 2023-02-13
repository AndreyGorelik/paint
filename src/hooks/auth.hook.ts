import { useAppSelector } from "../app/hooks";

const useAuth = () => {
    const {email, id} = useAppSelector(state => state.authSlice)

    return {
        isAuth: !!email,
        email,
        userId: id
    }
}

export default useAuth;