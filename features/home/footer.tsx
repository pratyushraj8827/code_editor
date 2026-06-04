import Link from "next/link";
import React from "react";

// Manually define the Github icon since it's missing from Lucide
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function Footer() {
  const socialLinks = [
    {
      href: "https://github.com/devesh041/code-editor", // Added your repo link
      icon: (
        <GithubIcon className="w-5 h-5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors" />
      ),
    },
  ];

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Copyright Notice */}
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Codesnippet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}