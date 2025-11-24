import { fetchPost } from "../util/fetchUtil";
import { session } from "../stores/sessionStore";
import { navigate } from "svelte-routing";
import { sanitize } from "./xssSanitizer";

export async function login(username, password) {
    const safeUsername = sanitize(username);
    const result = await fetchPost("/auth/login", {
        username: safeUsername,
        password: password 
    });

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
