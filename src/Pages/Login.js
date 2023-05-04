export default function Login() {
    return (
        <form className="login">
            <h2>Welcome!</h2>
            <p>Please log in</p>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="submit" defaultValue="Log In" />
        </form>
    );
}