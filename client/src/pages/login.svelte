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
        return;
    }
}
</script>

<div class="terminal-box">
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