"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { iconLibrary } from "@/resources/icons";
import { social } from "@/resources";
import Link from "next/link";

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const SendIcon = iconLibrary["send"] || iconLibrary["arrowRight"];
  const CheckIcon = iconLibrary["check"] || iconLibrary["checkmark"];
  const AlertIcon = iconLibrary["alert"] || iconLibrary["warning"];

  return (
    <div className={cn("w-full max-w-5xl mx-auto", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column: Text & Socials */}
        <div className="flex flex-col justify-center text-left">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
            Have a project in mind or just want to say hi? I'm always open to
            discussing new projects, creative ideas or opportunities to be part
            of your visions.
          </p>

          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider">
              Connect with me
            </h3>
            <div className="flex flex-wrap gap-3">
              {social.map((item) => {
                const Icon = item.icon ? iconLibrary[item.icon] : null;
                if (!item.link) return null;
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="bg-white dark:bg-zinc-900/50 p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="subject"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className={cn(
                "group inline-flex items-center justify-center gap-2 px-6 py-3 mt-2 rounded-full font-medium text-white transition-all",
                status === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : status === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-zinc-900 dark:bg-white dark:text-zinc-900 hover:bg-zinc-700 dark:hover:bg-zinc-200",
              )}
            >
              {status === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  {CheckIcon && <CheckIcon className="w-4 h-4" />}
                  Message Sent
                </>
              ) : status === "error" ? (
                <>
                  {AlertIcon && <AlertIcon className="w-4 h-4" />}
                  Try Again
                </>
              ) : (
                <>
                  Send Message
                  {SendIcon && (
                    <SendIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
