export interface IUser {
    token: string | null;
    profile: null | {
        id: string;
        username: string;
    };
}
