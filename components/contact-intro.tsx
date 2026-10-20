import { profile } from "@/lib/portfolio";

const contacts = [
  {
    label: "Gmail",
    name: profile.email,
    url: `mailto:${profile.email}`,
    icon: (
      <>
        <path d="M3 6v12h4v-8l5 4 5-4v8h4V6l-9 7-9-7Z" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
  },
  {
    label: "GitHub",
    name: "Domingoancog42",
    url: profile.github,
    icon: (
      <path d="M12 2a10 10 0 0 0-3 19.5v-3c-3 .6-3.5-1.3-3.5-1.3-.5-1-1.2-1.3-1.2-1.3 1-.5 1.8 1 1.8 1 1 1.4 2.4.9 3 .6.1-.7.4-1.1.7-1.4-2.5-.3-4.7-1.2-4.7-5 0-1 .4-2 1.1-2.7-.2-.6-.5-1.6.1-2.8 1-.2 2.2.6 2.8 1a10 10 0 0 1 5.8 0c.6-.4 1.8-1.2 2.8-1 .6 1.2.3 2.2.1 2.8.7.7 1.1 1.7 1.1 2.7 0 3.8-2.2 4.7-4.7 5 .5.5.8 1.2.8 2.1v3.3A10 10 0 0 0 12 2Z" />
    ),
  },
  {
    label: "LinkedIn",
    name: "Domingo Ancog",
    url: profile.linkedin,
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 10v7m0-10v.1M11 17v-7m0 3c0-4 6-4 6 0v4" />
      </>
    ),
  },
];

export default function ContactIntro() {
  return (
    <div className="contact-intro">
      <p className="contact-intro-eyebrow">CONTACT</p>
      <h3>
        LET&apos;S BUILD
        <br />
        <em>SOMETHING TOGETHER</em>
      </h3>
      <p className="contact-intro-description">
        Have a project in mind, an opportunity to discuss, or just want to
        connect? Send me a message or find me on social media!
      </p>
      <div className="contact-methods">
        {contacts.map((contact) => (
          <a
            key={contact.label}
            className="contact-method"
            href={contact.url}
            {...(contact.label !== "Gmail"
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
          >
            <span className="contact-method-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {contact.icon}
              </svg>
            </span>
            <span className="contact-method-text">
              <span>{contact.label}</span>
              <strong>{contact.name}</strong>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
