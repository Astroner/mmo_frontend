import { Button, Form, Input, Typography } from "antd";
import Password from "antd/lib/input/Password";
import { GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

import { register } from "@/api/user";
import { useUser } from "@/helpers/hooks/useUser";

import cn from "./Register.module.scss";
import { AxiosError } from "axios";
import Link from "next/link";
import PageLayout from "@/layouts/PageLayout";

const Register: NextPage = () => {
    const router = useRouter();

    const { token } = useUser();

    const submit = useCallback(
        async (data: { username: string; password: string }) => {
            try {
                await register(data.username, data.password);
                router.push("/login");
            } catch (e) {
                if (e.isAxiosError) {
                    const err: AxiosError = e;
                    console.log(err);
                }
            }
        },
        [router]
    );

    useEffect(() => {
        if (token) {
            router.push("/");
        }
    }, [token, router]);

    return (
        <PageLayout hideHeader title="Register">
            <div className={cn.root}>
                <Typography.Title>Register</Typography.Title>
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
                    <Form.Item
                        label="Confirm password"
                        name="confirm"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Required" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    } else {
                                        return Promise.reject(
                                            "The two passwords that you entered do not match!"
                                        );
                                    }
                                },
                            }),
                        ]}
                    >
                        <Password autoComplete="off" placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>{" "}
                        {`or `}
                        <Link href="/login">Log in</Link>
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

export default Register;
