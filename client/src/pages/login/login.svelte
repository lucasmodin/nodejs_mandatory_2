<script>
import { login } from '../../services/authService'
import { toastSuccess, toastError } from '../../services/toastService';
import { sendEmail } from '../../services/emailService';

let username = "";
let password = "";
let error = "";
let loading = false;

async function handleLogin(event) {
    event.preventDefault();
    loading = true;
    
    const result = await login(username, password);

    if (result.error) {
        loading = false;
        toastError(result.error);
        error = result.error;
        return;
    }

    toastSuccess("Authenticated: Machine Spirit acknowledges your presence");
    loading = false;

    await sendEmail(
        username + "@adeptus-arstetes.com",
        "Omnissiah Login Verification",
        `
            <h1>+++ BINARY AUTH CONFIRMATION +++</h1>
            <p>Adept ${username},</p>
            <p>Your presence within the sacred system has been detected.</p>
            <p>Status: <b>DIVINE MACHINE SPIRIT - SATISFIED</b></p>
            <hr />
            <p>Glory to the Omnissiah.</p>
        `
    );
}

</script>

<div class="terminal-box login-wrapper">
    <h1>SERVO CRYPT LOGIN</h1>

    <form on:submit={handleLogin}>
        <label>Designation</label>
        <input bind:value={username} required>

        <label>Access Phrase</label>
        <input type="password" bind:value={password} required>

        <button type="submit">Login</button>
    </form>

    {#if loading} 
        <div class="loading">Connecting to the Machine Spirit...</div>
    {/if}

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

.loading {
    margin-top: 1rem;
    padding: 1rem 1.5rem;
    border: 1px solid #00ff66aa;
    background: #001900;
    color: #00ff66;
    font-family: 'Courier New', monospace;
    text-shadow: 0 0 8px #00ff66aa;
    box-shadow: 0 0 10px #00ff6699;
    letter-spacing: 1px;
    display: inline-block;
    animation: loadingBlink 0.8s infinite alternate,
               crtFlicker 0.15s infinite;
}

/* Slow blink effect */
@keyframes loadingBlink {
    from { opacity: 0.4; }
    to   { opacity: 1; }
}

/* CRT flicker noise for extra immersion */
@keyframes crtFlicker {
    0%   { text-shadow: 0 0 7px #00ff66; }
    50%  { text-shadow: 0 0 4px #00ff66aa; }
    100% { text-shadow: 0 0 9px #00ff66; }
}
</style>