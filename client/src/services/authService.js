import { fetchPost } from "../util/fetchUtil";
import { session } from "../stores/sessionStore";
import { navigate } from "svelte-routing";

export async function login(username, password) {
    const result = await fetchPost("/auth/login", { username, password });

    if (!result.error) {
        session.set(result.data.user);
        navigate("/dashboard");
    }

    return result;
}

export async function logout() {
    await fetchPost("/auth/logout", {});
    session.set(null);
    navigate("/login");
}
