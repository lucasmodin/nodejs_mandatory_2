export async function api(path, options = {}) {
    const res = await fetch(import.meta.env.VITE_API_URL + path, {
        credentials: "include",        
        headers: {
            "Content-Type": "application/json",
        },
        ...options
    });

    const json = await res.json();
    return { status: res.status, ...json };
}
