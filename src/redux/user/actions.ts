import { createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "@/api/user";
import { Storage } from "@/helpers/storage";

export const login = createAsyncThunk("@user/login", async (token: string) => {
    const profile = await getProfile(token);

    Storage<{ token: string }>("user").set({ token });

    return profile;
});

export const logout = createAsyncThunk("@user/logout", async () => {
    Storage("user").set(null);
});
