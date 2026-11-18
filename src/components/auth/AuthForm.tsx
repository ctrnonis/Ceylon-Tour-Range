"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Input } from "@/components/ui/Field";
import { notify } from "@/components/ui/Toaster";
import { demoTraveller } from "@/lib/data/demo-account";
import { nameFromEmail, signIn, type Role } from "@/lib/store/session-store";
import { cn } from "@/lib/cn";
import SocialButtons from "./SocialButtons";

type Mode = "login" | "signup" | "reset";
type Errors = Partial<Record<"name" | "email" | "password" | "confirm" | "terms", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

const copy: Record<Mode, { eyebrow: string; title: string; lede: string; submit: string }> = {
  login: {
    eyebrow: "Welcome back",
    title: "Log in to your trips",
    lede: "Pick up right where you left off.",
    submit: "Log in",
  },
  signup: {
    eyebrow: "Join the Range",
    title: "Create your account",
    lede: "Save trips, book stays and share plans with your group.",
    submit: "Create account",
  },
  reset: {
    eyebrow: "Forgot password",
    title: "Reset your password",
    lede: "Enter your email and we'll send you a reset link.",
    submit: "Send reset link",
  },
};

/**
 * Login, sign-up and password-reset form.
 *
 * Authentication is mocked until the backend exists: any valid email and a
 * password of 8+ characters signs in (stored in session-store). The
 * validation rules are the ones the real API will enforce.
 */
export default function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("traveller");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [resetSent, setResetSent] = useState(false);
  const text = copy[mode];

  function validate(): Errors {
    const next: Errors = {};
    if (mode === "signup" && name.trim().length < 2) next.name = "Enter your name.";
    if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";
    if (mode !== "reset" && password.length < MIN_PASSWORD) next.password = `Use at least ${MIN_PASSWORD} characters.`;
    if (mode === "signup" && confirm !== password) next.confirm = "Passwords don't match.";
    if (mode === "signup" && !agreed) next.terms = "Please accept the terms.";
    return next;
  }

  function finish(session: { name: string; email: string; role: Role }) {
    signIn(session);
    notify(`Welcome, ${session.name.split(" ")[0]}!`);
    router.push(session.role === "guide" ? "/guide" : "/dashboard");
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length) return;

    if (mode === "reset") {
      setResetSent(true);
      return;
    }
    finish({ name: mode === "signup" ? name.trim() : nameFromEmail(email), email: email.trim().toLowerCase(), role });
  }

  function social(provider: "google" | "facebook") {
    notify(
      `${provider === "google" ? "Google" : "Facebook"} sign-in connects with the backend. Using the demo account for now.`,
    );
    finish({ name: demoTraveller.name, email: demoTraveller.email, role: "traveller" });
  }

  if (mode === "reset" && resetSent) {
    return (
      <div>
        <span className="eyebrow">Check your inbox</span>
        <h2>Reset link sent</h2>
        <p className="lede">
          If an account exists for <strong>{email}</strong>, you&apos;ll get an email with a link to choose a new
          password.
        </p>
        <Link href="/login" className="btn btn-primary btn-lg mt-8 w-full">
          Back to log in
        </Link>
      </div>
    );
  }

  return (
    <div>
      <span className="eyebrow">{text.eyebrow}</span>
      <h2 className="!text-[2rem]">{text.title}</h2>
      <p className="mt-2 mb-6 text-ink-400">{text.lede}</p>

      {mode !== "reset" ? (
        <>
          <div className="tabs mb-6" role="tablist" aria-label="Account">
            <Link href="/login" role="tab" aria-selected={mode === "login"} className="tab">
              Log in
            </Link>
            <Link href="/signup" role="tab" aria-selected={mode === "signup"} className="tab">
              Create account
            </Link>
          </div>
          <SocialButtons onSelect={social} />
          <div className="my-6 flex items-center gap-4 text-sm text-ink-400 before:h-px before:flex-1 before:bg-sand-100 after:h-px after:flex-1 after:bg-sand-100">
            or use your email
          </div>
        </>
      ) : null}

      <form onSubmit={submit} noValidate className="flex flex-col gap-4">
        {mode === "signup" ? (
          <>
            <fieldset>
              <legend className="field-label mb-2">I&apos;m joining as</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["traveller", "guide"] as const).map((option) => (
                  <label
                    key={option}
                    className={cn(
                      "cursor-pointer rounded-[var(--radius-md)] border-[1.5px] px-4 py-3 text-sm font-bold capitalize transition",
                      role === option
                        ? "border-ocean-500 bg-ocean-100 text-ocean-900"
                        : "border-ocean-700/15 text-ink-600",
                    )}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option}
                      checked={role === option}
                      onChange={() => setRole(option)}
                      className="sr-only"
                    />
                    {option === "guide" ? "Tour guide" : "Traveller"}
                  </label>
                ))}
              </div>
            </fieldset>
            <Field label="Full name" error={errors.name}>
              {(p) => <Input {...p} autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />}
            </Field>
          </>
        ) : null}

        <Field label="Email address" error={errors.email}>
          {(p) => (
            <Input
              {...p}
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </Field>

        {mode !== "reset" ? (
          <Field
            label="Password"
            error={errors.password}
            hint={mode === "signup" ? `At least ${MIN_PASSWORD} characters` : undefined}
          >
            {(p) => (
              <Input
                {...p}
                type="password"
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </Field>
        ) : null}

        {mode === "signup" ? (
          <>
            <Field label="Confirm password" error={errors.confirm}>
              {(p) => (
                <Input
                  {...p}
                  type="password"
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              )}
            </Field>
            <Checkbox
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label={
                <>
                  I agree to the{" "}
                  <Link href="/legal#terms" className="underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/legal#privacy" className="underline">
                    Privacy Policy
                  </Link>
                </>
              }
            />
            {errors.terms ? <p className="field-error -mt-2">{errors.terms}</p> : null}
          </>
        ) : null}

        {mode === "login" ? (
          <div className="flex items-center justify-between">
            <Checkbox defaultChecked label="Keep me signed in" />
            <Link href="/forgot-password" className="text-sm font-semibold text-ocean-700 hover:underline">
              Forgot password?
            </Link>
          </div>
        ) : null}

        <Button type="submit" size="lg" block className="mt-2">
          {text.submit}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-400">
        {mode === "login" ? (
          <>
            New to Ceylon Tour Range?{" "}
            <Link href="/signup" className="font-semibold text-ocean-700">
              Create a free account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-ocean-700">
              Log in
            </Link>
          </>
        )}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-5 border-t border-sand-100 pt-5 text-xs font-semibold text-ink-400">
        <span className="flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" aria-hidden /> Secured with SSL
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> We never share your data
        </span>
      </div>
    </div>
  );
}
