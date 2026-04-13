"use client";

import { useState } from "react";

type FooterLink = {
  label: string;
  href?: string;
  download?: boolean;
  copyValue?: string;
};

export function FooterLinks({ links }: { links: FooterLink[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="footer-links">
      {links.map((link) => {
        if (link.copyValue) {
          return (
            <button
              key={link.label}
              type="button"
              className="footer-link-button"
              onClick={() => handleCopy(link.copyValue ?? "")}
            >
              {copied ? "Email copied" : link.label}
            </button>
          );
        }

        return (
          <a
            key={link.label}
            className="footer-link-anchor"
            href={link.href}
            target={link.download ? undefined : "_blank"}
            rel={link.download ? undefined : "noreferrer"}
            download={link.download}
          >
            {link.label}
          </a>
        );
      })}
    </footer>
  );
}
