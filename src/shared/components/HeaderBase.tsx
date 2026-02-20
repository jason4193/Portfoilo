import { content } from "../data/content";
import { ThemeToggle } from "./ThemeToggle";
import { ModeToggle } from "./ModeToggle";
import { Avatar } from "./Avatar";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "./icons";

interface HeaderBaseProps {
  children?: React.ReactNode;
}

export function HeaderBase({ children }: HeaderBaseProps) {
  if (!content) {
    return (
      <div className="container-content py-8">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-20 h-20 rounded-full skeleton" />
            <div className="flex-1">
              <div className="h-10 w-48 skeleton mb-4" />
              <div className="h-6 w-32 skeleton" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-content py-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4 sm:gap-6 flex-1 min-w-0">
          <div className="shrink-0">
            <Avatar />
          </div>

          <div className="flex-1 min-w-0 mt-1 sm:mt-2">
            <p className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 sm:mt-3">
              {content.header}
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mb-4">
              <a
                href={`mailto:${content.contact.email}`}
                className="link-icon"
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
                  className="link-icon"
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

        {/* Theme Toggle and Mode Toggle - Top Right */}
        <div className="ml-2 sm:ml-4 flex items-center gap-2">
          <ModeToggle />
          <ThemeToggle />
        </div>
      </div>

      {/* Children or custom content */}
      {children}
    </div>
  );
}
