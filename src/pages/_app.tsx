import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useEffect, useMemo } from "react";

import { createStore } from "@/redux/store";
import { Storage } from "@/helpers/storage";
import { login } from "@/redux/user/actions";

import "./global.scss";
import "normalize.css";
import "antd/dist/antd.css";

export default function MyApp({ Component, pageProps }: AppProps) {
    const store = useMemo(() => createStore(), []);

    useEffect(() => {
        const userData = Storage<{ token: string }>("user").get();
        if (userData.isRight()) {
            store.dispatch(login(userData.right().token));
        }
    }, [store]);

    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}
