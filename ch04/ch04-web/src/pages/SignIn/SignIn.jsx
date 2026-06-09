import { useState } from "react";
import { Link } from "react-router";
import { useSignIn } from "../../hooks/useAuth";
import * as s from "../styles";

function SignIn() {
    const signInMutation = useSignIn();
    const [signInData, setSignInData] = useState({
        username: "",
        password: "",
    });

    const handleSignInDataChange = (e) => {
        setSignInData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        await signInMutation.mutateAsync(signInData);
    };

    return (
        <div css={s.container}>
            <form css={s.card} onSubmit={handleSignInSubmit}>
                <h1 css={s.title}>Sign In</h1>
                <div css={s.linkContainer}>
                    <span>No account? </span>
                    <Link to="/auth/signup">Sign up</Link>
                </div>

                <div css={s.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={signInData.username}
                        onChange={handleSignInDataChange}
                    />
                </div>

                <div css={s.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={signInData.password}
                        onChange={handleSignInDataChange}
                    />
                </div>

                <button css={s.button} type="submit" disabled={signInMutation.isPending}>
                    Sign In
                </button>
            </form>
        </div>
    );
}

export default SignIn;
