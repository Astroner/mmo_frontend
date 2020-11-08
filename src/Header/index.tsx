import { Button, PageHeader } from "antd";
import React, { FC, memo, useCallback } from "react";

import { useUser } from "@/helpers/hooks/useUser";

import cn from "./Header.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/user/actions";

export interface IHeader {
    title: string;
}

const Header: FC<IHeader> = (props) => {
    const { token } = useUser();

    const dispatch = useDispatch();

    const click = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
        <PageHeader
            className={cn.root}
            title={props.title}
            extra={
                token ? (
                    <Button onClick={click}>Log Out</Button>
                ) : (
                    <>
                        <Link href="login">
                            <Button type="primary">Log in</Button>
                        </Link>
                        <Link href="register">
                            <Button>Register</Button>
                        </Link>
                    </>
                )
            }
        />
    );
};

export default memo(Header);
