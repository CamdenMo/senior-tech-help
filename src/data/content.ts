import {
  Smartphone,
  Laptop,
  MessagesSquare,
  Wifi,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export const services = [
  {
    title: "Smartphones & Tablets",
    icon: Smartphone,
    description:
      "iPhone, Android, apps, settings, and accessibility features, made approachable.",
    detail:
      "From iPhone and Android basics to apps, settings, and accessibility features, we help residents find their way at a comfortable pace.",
    examples: [
      "Make text larger and easier to read",
      "Organize apps and adjust everyday settings",
      "Learn to take, find, and share photos",
    ],
  },
  {
    title: "Computers & Laptops",
    icon: Laptop,
    description:
      "Basic troubleshooting, software, and everyday computer use, explained clearly.",
    detail:
      "Practical help with everyday computer use, software, and basic troubleshooting, explained in familiar language.",
    examples: [
      "Get comfortable with a mouse or trackpad",
      "Find files and organize folders",
      "Understand updates and basic troubleshooting",
    ],
  },
  {
    title: "Email & Communication",
    icon: MessagesSquare,
    description:
      "Email, messaging, FaceTime, and Zoom, for more confident connections.",
    detail:
      "We walk through email, messaging, FaceTime, Zoom, and video calling so staying in touch feels more approachable.",
    examples: [
      "Send an email and add an attachment",
      "Join a family video call",
      "Adjust the camera, microphone, and volume",
    ],
  },
  {
    title: "Internet & Wi-Fi",
    icon: Wifi,
    description:
      "Practical help with Wi-Fi connections, common issues, and basic device setup.",
    detail:
      "Hands-on help with connecting personal devices, basic setup, and common Wi-Fi questions. Building-wide network issues can be referred to your team or provider.",
    examples: [
      "Connect a device to the community Wi-Fi",
      "Understand common connection messages",
      "Work through basic connectivity checks",
    ],
  },
  {
    title: "Online Safety",
    icon: ShieldCheck,
    description:
      "Recognizing suspicious messages, avoiding scams, and building safer browsing habits.",
    detail:
      "Approachable education on recognizing suspicious messages, avoiding common scams, and building safer browsing habits.",
    examples: [
      "Spot warning signs in unexpected messages",
      "Pause before opening unfamiliar links",
      "Understand strong passwords and verification codes",
    ],
  },
  {
    title: "Technology Education",
    icon: BookOpen,
    description:
      "Patient, personalized instruction in practical digital skills, at each resident’s pace.",
    detail:
      "Personalized instruction that starts with what residents want to do. We explain, practice together, and make room for questions.",
    examples: [
      "Practice a new skill step by step",
      "Explore useful accessibility tools",
      "Create simple notes to refer to later",
    ],
  },
] as const;

export const steps = [
  {
    title: "Let’s Connect",
    description:
      "Tell us about your community, your residents, and the kind of support you have in mind.",
  },
  {
    title: "We Visit Your Community",
    description:
      "Together, we coordinate scheduled on-site visits, technology help sessions, or workshops.",
  },
  {
    title: "Residents Get Personalized Help",
    description:
      "Residents receive friendly, one-on-one assistance with their everyday technology questions.",
  },
] as const;

export const partnershipOptions = [
  "Recurring weekly technology help sessions",
  "Monthly community technology visits",
  "Scheduled one-on-one resident assistance",
  "Group technology workshops",
];
