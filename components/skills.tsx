"use client";

import { useState, type CSSProperties } from "react";
import BorderStar from "@/components/border-star";

const tools = [
  {
    name: "HTML",
    category: "Frontend Web",
    mark: "5",
    color: "#ef5128",
    icon: "shield",
  },
  {
    name: "CSS",
    category: "Frontend Web",
    mark: "CSS",
    color: "#7135ab",
    icon: "tile",
  },
  {
    name: "JavaScript",
    category: "Frontend Web",
    mark: "JS",
    color: "#b49a00",
    icon: "tile",
  },
  {
    name: "React",
    category: "Frontend Web",
    mark: "",
    color: "#00a6cf",
    icon: "react",
  },
  {
    name: "PHP",
    category: "Backend",
    mark: "php",
    color: "#777bb3",
    icon: "oval",
  },
  {
    name: "Supabase",
    category: "Backend",
    mark: "",
    color: "#30bc89",
    icon: "bolt",
  },
  {
    name: "MySQL",
    category: "Backend",
    mark: "MySQL",
    color: "#2476a2",
    icon: "text",
  },
  {
    name: "Flutter",
    category: "Mobile Dev",
    mark: "",
    color: "#0786bc",
    icon: "flutter",
  },
  {
    name: "Dart",
    category: "Mobile Dev",
    mark: "D",
    color: "#007bc3",
    icon: "diamond",
  },
  {
    name: "Java",
    category: "Programming",
    mark: "",
    color: "#ed6a00",
    icon: "code",
  },
  {
    name: "Git",
    category: "Dev Tools",
    mark: "",
    color: "#ed493d",
    icon: "git",
  },
  {
    name: "GitHub",
    category: "Dev Tools",
    mark: "",
    color: "#191919",
    icon: "github",
  },
  {
    name: "VS Code",
    category: "Dev Tools",
    mark: "",
    color: "#007ec4",
    icon: "code",
  },
  {
    name: "Figma",
    category: "Dev Tools",
    mark: "",
    color: "#f35b41",
    icon: "figma",
  },
  {
    name: "OpenAI Codex",
    category: "AI Tools",
    mark: "",
    color: "#5935b4",
    icon: "spark",
  },
  {
    name: "Cursor",
    category: "AI Tools",
    mark: "",
    color: "#151515",
    icon: "cube",
  },
  {
    name: "Claude",
    category: "AI Tools",
    mark: "",
    color: "#d57955",
    icon: "spark",
  },
  {
    name: "Antigravity",
    category: "AI Tools",
    mark: "A",
    color: "#fa4054",
    icon: "circle",
  },
  {
    name: "GitHub Copilot",
    category: "AI Tools",
    mark: "",
    color: "#151515",
    icon: "robot",
  },
];

function ToolIcon({ tool }: { tool: (typeof tools)[number] }) {
  const base = {
    width: 30,
    height: 30,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  let drawing;
  switch (tool.icon) {
    case "shield":
      drawing = (
        <>
          <path
            d="M5 3h22l-2 23-9 3-9-3L5 3Z"
            fill="currentColor"
            stroke="none"
          />
          <path
            d="M22 9H11l1 6h9l-1 6-4 1-4-1-.3-3"
            stroke="white"
            strokeWidth="2.5"
          />
        </>
      );
      break;
    case "react":
      drawing = (
        <>
          <ellipse cx="16" cy="16" rx="14" ry="5.5" />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.5"
            transform="rotate(60 16 16)"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="14"
            ry="5.5"
            transform="rotate(120 16 16)"
          />
          <circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" />
        </>
      );
      break;
    case "bolt":
      drawing = (
        <path
          d="M18 2 3 19h12l-1 11 15-18H17l1-10Z"
          fill="currentColor"
          stroke="none"
        />
      );
      break;
    case "flutter":
      drawing = (
        <>
          <path
            d="M19 2h10L10 21l-5-5L19 2Zm0 14h10L19 26l-5-5 5-5Z"
            fill="currentColor"
            stroke="none"
          />
          <path
            d="m19 26 5 5H14l-5-5 5-5 5 5Z"
            fill="currentColor"
            opacity=".7"
            stroke="none"
          />
        </>
      );
      break;
    case "code":
      drawing = (
        <>
          <path d="m10 7-8 9 8 9m12-18 8 9-8 9m-3-21-6 24" strokeWidth="3" />
        </>
      );
      break;
    case "git":
      drawing = (
        <>
          <rect
            x="5"
            y="5"
            width="22"
            height="22"
            rx="2"
            transform="rotate(45 16 16)"
            fill="currentColor"
            stroke="none"
          />
          <path d="M12 8v14m0-12 9 8" stroke="white" />
          <circle cx="12" cy="10" r="2" fill="white" stroke="none" />
          <circle cx="12" cy="23" r="2" fill="white" stroke="none" />
          <circle cx="21" cy="18" r="2" fill="white" stroke="none" />
        </>
      );
      break;
    case "github":
      drawing = (
        <>
          <path
            d="M16 2a14 14 0 0 0-4 27v-5c-4 1-5-2-5-2-1-2-2-2-2-2-1-1 1-1 1-1 2 0 3 3 5 2 0-1 0-2 1-2-4-1-7-2-7-7 0-2 1-3 2-4 0-1-1-3 0-4 0 0 2 0 5 2a17 17 0 0 1 8 0c3-2 5-2 5-2 1 1 0 3 0 4 1 1 2 2 2 4 0 5-3 6-7 7 1 1 1 2 1 3v7A14 14 0 0 0 16 2Z"
            fill="currentColor"
            stroke="none"
          />
        </>
      );
      break;
    case "figma":
      drawing = (
        <>
          <path d="M16 16H11a5 5 0 1 1 5-5V6a5 5 0 1 0-5 5h10a5 5 0 1 1-5 5v10a5 5 0 1 1-5-5h5" />
        </>
      );
      break;
    case "spark":
      drawing = (
        <>
          <path d="M16 2v28M2 16h28M6 6l20 20M6 26 26 6M10 3l12 26M3 10l26 12M3 22 29 10M10 29 22 3" />
        </>
      );
      break;
    case "cube":
      drawing = (
        <>
          <path
            d="m16 2 13 7v15l-13 7-13-7V9l13-7Z"
            fill="currentColor"
            stroke="none"
          />
          <path d="m4 9 12 7 12-7M16 16v14" stroke="white" />
        </>
      );
      break;
    case "robot":
      drawing = (
        <>
          <rect x="5" y="9" width="22" height="18" rx="6" />
          <rect x="8" y="7" width="7" height="9" rx="3" />
          <rect x="17" y="7" width="7" height="9" rx="3" />
          <path d="M16 3v4M2 16v7m28-7v7M12 22h8" />
        </>
      );
      break;
    default:
      return (
        <span
          className={`tool-mark tool-mark-${tool.icon}`}
          style={{ color: tool.color }}
          aria-hidden="true"
        >
          {tool.mark}
        </span>
      );
  }
  return (
    <svg {...base} style={{ color: tool.color }}>
      {drawing}
    </svg>
  );
}

function ToolCard({
  tool,
  index = 0,
}: {
  tool: (typeof tools)[number];
  index?: number;
}) {
  return (
    <li
      className="tool-card"
      style={{ "--reveal-index": index } as CSSProperties}
    >
      <BorderStar />
      <span className="tool-card-icon">
        <ToolIcon tool={tool} />
      </span>
      <div>
        <h3>{tool.name}</h3>
        <span className="tool-category">{tool.category}</span>
      </div>
    </li>
  );
}

export default function Skills() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section
      id="skills"
      className="section container tool-section"
      aria-labelledby="skills-heading"
    >
      <header className="tool-heading">
        <p>TOOLS</p>
        <h2 id="skills-heading">Tools I work with.</h2>
      </header>
      <ul className="tool-card-grid">
        {tools.slice(0, 12).map((tool) => (
          <ToolCard key={tool.name} tool={tool} />
        ))}
      </ul>
      <div
        id="tool-card-list"
        className={`tool-extra${expanded ? " is-expanded" : ""}`}
        inert={!expanded}
        aria-hidden={!expanded}
      >
        <div className="tool-extra-clip">
          <ul className="tool-card-grid tool-extra-list">
            {tools.slice(12).map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </ul>
        </div>
      </div>
      <div className="tool-toggle-row">
        <button
          type="button"
          className="tool-toggle"
          aria-expanded={expanded}
          aria-controls="tool-card-list"
          onClick={() => setExpanded((value) => !value)}
        >
          <span aria-hidden="true">◇</span>
          {expanded ? "Show less" : "Show more"}
          <span aria-hidden="true">◇</span>
        </button>
      </div>
    </section>
  );
}
