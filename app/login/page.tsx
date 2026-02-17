import Link from "next/link";

export default function LoginPage() {
  return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-100 p-4">
      <form action="#" className="mx-auto w-full max-w-lg space-y-4 rounded-2xl p-6 shadow-xl border-2 bg-white border-neutral-200">
        <h1 className="text-3xl font-bold text-black font-semibold text-center mb-4">Create Account</h1>
         
        <div>
          <label className="block text-lg font-medium leading-6" htmlFor="email">Email Address</label>
          <input className="mt-1 w-full rounded-full bg-form-bg text-black/40 px-4 py-2.5 focus:border-black focus:outline-none" id="email" type="email" placeholder="sandipbharati07@gmail.com" />
        </div>

        <div>
          <label className="block text-lg font-medium leading-6" htmlFor="password">Password</label>
          <input className="mt-1 w-full rounded-full bg-form-bg text-black/40 px-4 py-2.5 focus:border-black focus:outline-none" id="password" type="password" placeholder="••••••••" />
        </div>

        <button className="block w-full rounded-full bg-black text-white hover:bg-white hover:text-black border border-transparent hover:border-black px-12 py-3 text-base font-semibold" type="submit">
          Sign In
        </button>  
        <span className="text-center text-sm text-gray-600 mt-4 block">
          Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline">Register</Link>
        </span>
      </form>
    </div>
  );
}