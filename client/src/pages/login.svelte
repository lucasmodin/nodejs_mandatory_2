<script>
import { fetchPost } from '../util/fetchUtil';

let username = "";
let password = "";

async function login() {
    const result = await fetchPost("/auth/login", {
        username,
        password
    });

    if (result.error) {
        return;
    }
}
</script>

<h1>Mechanicus Login</h1>

<form on:submit={login}>

    <input placeholder="Username" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>

    <button type="submit">Login</button>

</form>