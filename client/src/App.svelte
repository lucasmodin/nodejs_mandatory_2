<script>
    import { Router, Link, Route } from "svelte-routing";
    import ProtectedRoutes from "./components/ProtectedRoutes.svelte";
    import { session } from './stores/sessionStore.js';
    import { logout } from './services/authService';

    import Login from './pages/login/login.svelte';
    import Dashboard from "./pages/dashboard/dashboard.svelte";

</script>

<div class="crt-scanlines">
    <Router>
        <nav>
            <Link to="/">Home</Link>

            {#if $session}
                <Link to="/dashboard">Dashboard</Link>
                <button on:click={logout}>Logout</button>
            {:else}
                <Link to="/login">Login</Link>
            {/if}
        </nav>

        <div>
            <Route path="/">
                <h1>Welcome to the Mechanicus Terminal</h1>
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/dashboard">
                <ProtectedRoutes component={Dashboard} />
            </Route>        
        </div>
    </Router>
</div>


