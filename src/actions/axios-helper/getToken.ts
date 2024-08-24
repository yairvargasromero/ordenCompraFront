import { useUserStore } from "../../store/user/user";


export const getAuthToken = () => {
    const token = useUserStore.getState().token;
    return `Bearer ${token}`;
};