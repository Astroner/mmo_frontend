import React, { FC } from "react";
import Head from "next/head";
import Header from "@/Header";
import cn from "./PageLayout.module.scss";

export interface IPageLayout {
    hideHeader?: boolean;
    title: string;
}

const PageLayout: FC<IPageLayout> = (props) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
            </Head>
            {!props.hideHeader && <Header title={props.title} />}
            <main className={cn.main}>
                <div className={cn.content}>{props.children}</div>
            </main>
        </>
    );
};

export default PageLayout;
