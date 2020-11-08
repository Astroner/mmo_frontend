import { Button, Form, Input, Typography } from "antd";
import Password from "antd/lib/input/Password";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";

import { login as loginCall } from "@/api/user";
import { useUser } from "@/helpers/hooks/useUser";
import { login } from "@/redux/user/actions";

import cn from "./Login.module.scss";
import PageLayout from "@/layouts/PageLayout";

const Login: NextPage = () => {
    const router = useRouter();

    const { token } = useUser();

    const dispatch = useDispatch();

    const submit = useCallback(
        async (data: { username: string; password: string }) => {
            try {
                const { token } = await loginCall(data.username, data.password);
                dispatch(login(token));
            } catch (e) {
                if (e.isAxiosError) {
                    const err: AxiosError = e;
                    console.log(err);
                }
            }
        },
        [dispatch]
    );

    useEffect(() => {
        if (token) {
            router.push("/");
        }
    }, [token, router]);

    return (
        <PageLayout hideHeader title="Log In">
            <div className={cn.root}>
                <Typography.Title>Log In</Typography.Title>
                <Form
                    onFinish={submit}
                    layout="vertical"
                    requiredMark="optional"
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Input autoComplete="off" placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: "Required" }]}
                    >
                        <Password autoComplete="off" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Log in
                        </Button>{" "}
                        {`or `}
                        <Link href="/register">Register</Link>
                    </Form.Item>
                </Form>
            </div>
        </PageLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default Login;
