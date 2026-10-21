// Add your real contact links here when you are ready to share them.
export const profile = {
  name: "Domingo Ancog",
  role: "Creative Developer",
  email: "domingo.ancog42@gmail.com",
  github: "https://github.com/Domingoancog42",
  linkedin: "https://www.linkedin.com/in/domingoancog42/",
  facebook: "https://www.facebook.com/Domingo.ancog.42",
  instagram: "https://www.instagram.com/dzong_21/",
};

export type Project = {
  id: string;
  title: string;
  category: "Development" | "UI experiments";
  label: string;
  description: string;
  detail: string;
  tags: string[];
  preview: "badge" | "forma" | "orbit" | "hris" | "shopping" | "horror" | "sailing";
  categoryLabel?: string;
  role?: string;
  partner?: string;
  playUrl?: string;
};

const hrisDescription =
  "A Human Resource Information System for managing employees, attendance, leave, payroll, performance, and HR operations.";

export const projects: Project[] = [1, 2, 3].map((number): Project =>
  number === 3
    ? {
        id: "escape-from-peta",
        title: "Escape from PETA: PHINMA COC Nightmare",
        category: "Development",
        categoryLabel: "Unity · Horror Game",
        label: "Escape from PETA: PHINMA COC Nightmare",
        description:
          "A horror escape game set on the PHINMA COC campus, built in Unity. The player has to find a way out of the PETA building while being hunted.",
        detail:
          "A horror escape game set on the PHINMA COC campus, built in Unity. The player has to find a way out of the PETA building while being hunted.",
        tags: ["C#", "Game Development", "UI/UX Design"],
        preview: "horror",
        role: "UI/UX Designer",
        partner: "Developer · Michael Nacaya",
      }
    : number === 2
      ? {
          id: "shopping-list",
          title: "Shopping List Application",
          category: "Development",
          categoryLabel: "Mobile Application",
          label: "Shopping List Application",
          description:
            "A Flutter shopping list app with a simple, friendly interface for organising everyday purchases.",
          detail:
            "A Flutter shopping list app with a simple, friendly interface for organising everyday purchases.",
          tags: ["Flutter", "Dart", "UI/UX Design"],
          preview: "shopping",
          role: "UI/UX Designer",
          partner: "Developer · Michael Nacaya",
        }
      : {
          id: `hris-${number}`,
          title: "Capstone Project: Human Resource Information System (HRIS)",
          category: "Development",
          label: "Capstone Project: Human Resource Information System (HRIS)",
          description: hrisDescription,
          detail: hrisDescription,
          tags: ["React", "JavaScript", "MySQL"],
          preview: "hris",
        },
);

projects.push({
  id: "boat-sailing-open-world",
  playUrl: "https://boat-sailing-open-world.netlify.app/",
  title: "Boat Sailing: Open World",
  category: "Development",
  categoryLabel: "3D Open-World Game",
  label: "Boat Sailing: Open World",
  description:
    "An open-world boat-sailing experience built for the browser with JavaScript, Three.js r186, and TSL.",
  detail:
    "A browser-based open-world boat-sailing project built with JavaScript and Three.js r186, using TSL (Three.js Shading Language) for shaders and HTML and CSS for the interface.",
  tags: ["JavaScript", "Three.js r186", "TSL (Three.js Shading Language)", "HTML", "CSS"],
  preview: "sailing",
});
