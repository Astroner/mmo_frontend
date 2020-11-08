import { RootStore } from "@/redux/store";
import { useSelector } from "react-redux";

export const useUser = () => {
    const user = useSelector((store: RootStore) => store.user);

    return user;
};
