import { LoginButton } from "./login-button";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900 dark:text-white mb-8">
          AutoMetrics
        </h1>
        <LoginButton />
      </div>
    </div>
  );
}