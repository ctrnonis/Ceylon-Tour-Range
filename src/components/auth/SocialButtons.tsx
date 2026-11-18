"use client";

import { Button } from "@/components/ui/Button";

/** Google / Facebook sign-in buttons. OAuth is connected in the backend phase. */
export default function SocialButtons({ onSelect }: { onSelect: (provider: "google" | "facebook") => void }) {
  return (
    <div className="flex flex-col gap-3">
      <Button variant="ghost" block onClick={() => onSelect("google")}>
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#4285F4"
            d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.4Z"
          />
          <path
            fill="#34A853"
            d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z"
          />
          <path fill="#FBBC05" d="M6.4 14a6 6 0 0 1 0-3.8V7.6H3.1a10 10 0 0 0 0 8.9L6.4 14Z" />
          <path
            fill="#EA4335"
            d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.6l3.3 2.6C7.2 7.7 9.4 5.9 12 5.9Z"
          />
        </svg>
        Continue with Google
      </Button>
      <Button variant="ghost" block onClick={() => onSelect("facebook")}>
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            fill="#1877F2"
            d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"
          />
        </svg>
        Continue with Facebook
      </Button>
    </div>
  );
}
