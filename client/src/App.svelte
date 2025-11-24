<script>
    import { Router, Link, Route } from "svelte-routing";

    import Login from './pages/login.svelte';

</script>

<div class="crt-scanlines">
    <Router>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
        </nav>

        <div>
            <Route path="/">
                <h1>Welcome to the Mechanicus Terminal</h1>
            </Route>

            <Route path="/login">
                <Login />
            </Route>
        </div>
    </Router>
</div>


