<script>
import { fetchPost } from '../util/fetchUtil';

let username = "";
let password = "";
let error = "";
let loading = false;

async function login(event) {
    event.preventDefault();
    loading = true;

    const result = await fetchPost("/auth/login", {
        username,
        password
    });

    if (result.error) {
        error = result.error;
        loading = false;
        return;
    }

    loading = false;
}
</script>

<div class="terminal-box login-wrapper">
    <h1>SERVO CRYPT LOGIN</h1>

    <form on:submit={login}>
        <label>Designation</label>
        <input bind:value={username} required>

        <label>Access Phrase</label>
        <input type="password" bind:value={password} required>

        <button type="submit">Login</button>
    </form>

    {#if error}
        <div class="terminal-error">{error}</div>
    {/if}
</div>

<style>
    .login-wrapper {
    max-width: 600px;
    margin: 80px auto;
    padding: 2rem;
}

.login-wrapper form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.login-title {
    text-align: center;
    margin-bottom: 1.5rem;
}
</style>