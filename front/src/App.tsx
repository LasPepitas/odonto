import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-slate-800 gap-y-5">
      <header className="flex items-center justify-between w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>
      <SignIn />
    </div>
  );
}

export default App;
