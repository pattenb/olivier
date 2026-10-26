import React, { useState, useEffect } from "react";

interface ObfuscatedEmailProps {
  user: string;
  domain: string;
  className?: string;
}

export default function ObfuscatedEmail({ user, domain, className = "" }: ObfuscatedEmailProps) {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    // Reassemble email client-side to protect from static email scrapers
    setEmail(`${user}@${domain}`);
  }, [user, domain]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = `mailto:${user}@${domain}`;
  };

  return (
    <a
      href={email ? `mailto:${email}` : "#"}
      onClick={handleClick}
      className={className}
      rel="nofollow"
    >
      {email ? email : `${user} [at] ${domain}`}
    </a>
  );
}
