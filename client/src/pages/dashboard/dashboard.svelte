<script>
    import { onMount } from "svelte";
    import { fetchGet } from "../../util/fetchUtil.js";
    import { session } from "../../stores/sessionStore.js";

    let me = null;
    let consoleOutput = "";

    function formatOutput(data) {
        if (!data) return "> No data recieved";

        let lines = [];

        if (typeof data === "string") {
            lines = [data];
        }
        
        else if (Array.isArray(data)) {
            lines = data;
        }

        else if (typeof data === "object") {
            lines = Object.entries(data).map(([key, value]) => {
                if (Array.isArray(value)) {
                    return `${key}:\n ${value.join("\n  ")}`;
                }
            return `${key}: ${value}`;
            });
        }

        return lines.map(line => `> ${line}`).join("\n");
    }
    
    onMount(async () => {
        const result = await fetchGet("/auth/me");

        if (result.data) {
            me = result.data;
            session.set(result.data);
        } else {
            
        }
    })

    async function run(endpoint) {
        consoleOutput = "Contaction data vault...";

        const result = await fetchGet(endpoint);

        if (result.error) {
            consoleOutput = "Error: " + result.error;
        } else {
            consoleOutput = formatOutput(result.data);
        }
    }
</script>

{#if me} 
<div class="terminal-box">
    <h1>OMNISSIAH ACCESS PANEL</h1>

    <div>
        <p><strong>User:</strong> {me.username}</p>
        <p><strong>Role:</strong> {me.role}</p>
        <p><strong>Status:</strong> Blessed by the Machine Spirit</p>
    </div>

    <h2>Servitor Access (User)</h2>
    <button on:click={() => run("/api/status")}>System Status</button>
    <button on:click={() => run("/api/logs")}>Audit Logs</button>

    {#if me.role === "ADMIN"}
        <h2>High Clearance - Requires Arch Magos (Classified Admin)</h2>
        <button on:click={() => run("/api/classified-archives")}>Archives</button>
        <button on:click={() => run("/api/vaults")}>Vaults</button>
    {/if}

    <pre class="terminal-output">{consoleOutput}</pre>

</div>
{/if}

<style>
    .terminal-output {
    margin-top: 2rem;
    padding: 1rem 1.5rem;
    background: #000;
    border: var(--crt-border);
    color: var(--crt-green);
    white-space: pre-wrap;
    min-height: 200px;
    font-family: var(--crt-font);
    box-shadow: var(--crt-glow);
    line-height: 1.4rem;
    animation: crtFlicker 0.15s infinite;
}

</style>