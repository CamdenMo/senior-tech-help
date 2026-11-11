import { Check } from "lucide-react";

export function PartnershipOption({ children }: { children: string }) {
  return (
    <li className="partnership-option">
      <Check size={19} aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}
