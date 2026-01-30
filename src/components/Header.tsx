import { useContent } from "../hooks/useContent";
import { ThemeToggle } from "./ThemeToggle";
import { Avatar } from "./Avatar";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";

export function Header() {
  const { content, loading } = useContent();

  if (loading || !content) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-20 h-20 rounded-full bg-[var(--color-bg-secondary)] animate-pulse" />
            <div className="flex-1">
              <div className="h-10 w-48 bg-[var(--color-bg-secondary)] rounded animate-pulse mb-4"></div>
              <div className="h-6 w-32 bg-[var(--color-bg-secondary)] rounded animate-pulse"></div>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4 sm:gap-6 flex-1">
          <div className="shrink-0">
            <Avatar />
          </div>

          <div className="flex-1 mt-1 sm:mt-2">
            <p className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 sm:mt-3">
              {content.header}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-4">
              <a
                href={`mailto:${content.contact.email}`}
                className="text-[var(--color-text-secondary)] hover:text-[var(--color-link)] transition-colors duration-200"
                aria-label="Email"
                title={content.contact.email}
              >
                <EmailIcon aria-label="Email" aria-hidden={false} />
              </a>
              {content.contact.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-link)] transition-colors duration-200"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.label === "GitHub" ? (
                    <GitHubIcon aria-label={link.label} aria-hidden={false} />
                  ) : link.label === "LinkedIn" ? (
                    <LinkedInIcon aria-label={link.label} aria-hidden={false} />
                  ) : null}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Theme Toggle - Top Right */}
        <div className="ml-2 sm:ml-4">
          <ThemeToggle />
        </div>
      </div>

      {/* Intro */}
      <p className="text-lg text-[var(--color-text-secondary)] whitespace-pre-line">
        {content.intro}
      </p>
    </div>
  );
}
