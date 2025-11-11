// src/data/about.ts
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export const team: TeamMember[] = [
  {
    id: 1,
    name: "Alex Rivera",
    role: "Founder & Executive Director",
    avatar: "/avatars/alex.jpg", // put the picture in public/avatars
    bio: "Alex founded the organization in 2018 with a vision to empower communities through education.",
  },
  {
    id: 2,
    name: "Maya Patel",
    role: "Program Manager",
    avatar: "/avatars/maya.jpg",
    bio: "Maya coordinates all on‑the‑ground projects and ensures our volunteers have the tools they need.",
  },
  {
    id: 3,
    name: "Jin‑Ho Lee",
    role: "Head of Development",
    avatar: "/avatars/jin.jpg",
    bio: "Jin leads fundraising, donor relations and the technical infrastructure of our platform.",
  },
];