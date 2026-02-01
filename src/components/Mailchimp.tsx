"use client";

import { mailchimp, newsletter } from "@/resources";
import { useState } from "react";
import { cn } from "@/lib/utils";

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  }) as T;
}

interface MailchimpProps {
  className?: string;
}

export const Mailchimp: React.FC<MailchimpProps> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    if (email === "") {
      return true;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  const debouncedHandleChange = debounce(handleChange, 2000);

  const handleBlur = () => {
    setTouched(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
    }
  };

  if (newsletter.display === false) return null;

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full p-8 rounded-xl flex flex-col items-center text-center",
        "bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 mb-6",
        className,
      )}
    >
      <div className="max-w-md relative z-10">
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
          {newsletter.title}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6 text-balance">
          {newsletter.description}
        </p>
      </div>

      <form
        className="w-full flex justify-center relative z-10"
        action={mailchimp.action}
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
      >
        <div
          id="mc_embed_signup_scroll"
          className="w-full max-w-sm flex flex-col sm:flex-row gap-2"
        >
          <div className="flex-1">
            <input
              id="mce-EMAIL"
              name="EMAIL"
              type="email"
              placeholder="Email"
              required
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                error
                  ? "border-red-500"
                  : "border-zinc-200 dark:border-zinc-700",
              )}
              onChange={(e) => {
                if (error) {
                  handleChange(e);
                } else {
                  debouncedHandleChange(e);
                }
              }}
              onBlur={handleBlur}
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1 text-left">
                {error}
              </p>
            )}
          </div>

          <div style={{ display: "none" }}>
            <input
              type="checkbox"
              readOnly
              name="group[3492][1]"
              id="mce-group[3492]-3492-0"
              value=""
              checked
            />
          </div>
          <div id="mce-responses" className="clearfalse">
            <div
              className="response"
              id="mce-error-response"
              style={{ display: "none" }}
            ></div>
            <div
              className="response"
              id="mce-success-response"
              style={{ display: "none" }}
            ></div>
          </div>
          <div
            aria-hidden="true"
            style={{ position: "absolute", left: "-5000px" }}
          >
            <input
              type="text"
              readOnly
              name="b_c1a5a210340eb6c7bff33b2ba_0462d244aa"
              tabIndex={-1}
              value=""
            />
          </div>

          <button
            type="submit"
            id="mc-embedded-subscribe"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  );
};
