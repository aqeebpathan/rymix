import { useState } from "react";
import { Link } from "react-router-dom";

import useAuthStore from "../../stores/useAuthStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <section>
      <div className="max-w-7xl mx-auto h-screen w-screen flex justify-center items-center">
        <div className="p-4 w-[320px] rounded-sm">
          <h1 className="text-4xl mb-12 text-center">Welcome back</h1>
          <form
            className="w-full flex flex-col gap-5"
            onSubmit={handleSubmit}
            method="POST"
          >
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-sm border border-[#a9a9a9] px-3 py-2 text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-sm border border-[#a9a9a9] px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full rounded-sm bg-[#fafafa] text-[#0a0a0a] px-3 py-2 text-sm font-semibold cursor-pointer mt-2 hover:opacity-90 transition-colors"
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-neutral-400">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="hover:text-[#fafafa] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
