import { useUser } from "@/helpers/hooks/useUser";
import PageLayout from "@/layouts/PageLayout";
import { GetStaticProps, NextPage } from "next";

const Index: NextPage = () => {
    const { token, profile } = useUser();

    return (
        <PageLayout title="Home">
            {!token
                ? "U are not logged in"
                : !profile
                ? "Ur data are not loaded"
                : `Username: ${profile.username}; ID: ${profile.id}`}
        </PageLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {},
    };
};

export default Index;
