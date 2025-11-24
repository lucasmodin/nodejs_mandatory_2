<script>
    import { onMount } from 'svelte';
    import { navigate } from 'svelte-routing';
    import { fetchGet } from '../util/fetchUtil';
    import { session } from '../stores/sessionStore.js'

    export let component;

    let loading = true;
    let allowed = false;
    let authError = "";

    onMount(async () => {
        const result = await fetchGet("/auth/me");

        if(result?.data) {
            session.set(result.data);
            allowed = true;
        } else {
            authError = result?.error || "Unauthorized access detected";

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        }

        loading = false;
    })
</script>

{#if loading}
    <div class="loading">Authenticating with the Machine Spirit...</div>
{:else}
    {#if allowed}
        <svelte:component this={component} />
    {:else}
        <div class="terminal-error">
            {authError}
        </div>
    {/if}
{/if}