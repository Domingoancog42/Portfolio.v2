import { profile } from "@/lib/portfolio";

const socials = [
  {
    name: "GitHub",
    url: profile.github,
    icon: (
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    ),
  },
  {
    name: "LinkedIn",
    url: profile.linkedin,
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="2" />
        <path
          d="M6 10v8m0-12v.1M10 18v-8m0 3c0-4 7-4 7 0v5"
          fill="none"
          stroke="#101526"
          strokeWidth="2.2"
        />
      </>
    ),
  },
  {
    name: "Facebook",
    url: profile.facebook,
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path
          d="M13.5 21v-8h2.7l.4-3h-3.1V8.2c0-.9.3-1.4 1.6-1.4h1.7V4.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.6v8"
          fill="#101526"
        />
      </>
    ),
  },
  {
    name: "Instagram",
    url: profile.instagram,
    icon: (
      <>
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.5" cy="6.5" r="1.1" />
      </>
    ),
  },
];

export default function HomeSocials() {
  return (
    <div className="home-socials" role="group" aria-label="Social profiles">
      {socials.map((social) => {
        const icon = (
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            {social.icon}
          </svg>
        );
        return social.url ? (
          <a
            key={social.name}
            className="home-social-icon"
            href={social.url}
            target="_blank"
            rel="noreferrer"
            aria-label={social.name}
            title={social.name}
          >
            {icon}
          </a>
        ) : (
          <span
            key={social.name}
            className="home-social-icon"
            role="img"
            aria-label={`${social.name} — profile coming soon`}
            title={`${social.name} — profile coming soon`}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
}
