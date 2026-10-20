// Add real certificates here. File URLs can point to files in public/certificates/.
export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  issued: string;
  url: string;
  image?: string;
};

export const certificates: Certificate[] = [
  {
    id: "programming-second-runner-up",
    title: "Programming Competition — 2nd Runner Up",
    issuer: "I.T. Days 2024",
    issued: "2024",
    url: "/assets/images/Certificate1.jpg",
    image: "/assets/images/Certificate1.jpg",
  },
  {
    id: "computer-hardware-basics",
    title: "Computer Hardware Basics",
    issuer: "Cisco Networking Academy",
    issued: "2026",
    url: "/assets/images/Certificate2.pdf",
    image: "/assets/images/Certificate2-preview.png",
  },
  {
    id: "cisco-packet-tracer",
    title: "Getting Started with Cisco Packet Tracer",
    issuer: "Cisco Networking Academy",
    issued: "2026",
    url: "/assets/images/Certificate3.pdf",
    image: "/assets/images/Certificate3-preview.png",
  },
  {
    id: "introduction-to-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    issued: "2026",
    url: "/assets/images/Certificate4.pdf",
    image: "/assets/images/Certificate4-preview.png",
  },
  {
    id: "python-essentials-1",
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy · Python Institute",
    issued: "2026",
    url: "/assets/images/Certificate5.pdf",
    image: "/assets/images/Certificate5-preview.png",
  },
];
