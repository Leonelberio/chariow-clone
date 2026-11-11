import Image from "next/image";
import Link from "next/link";
import { chariowDesignSystem } from "@/config/design-system";

type LogoChariowProps = {
  href?: string;
  className?: string;
};

export function LogoChariow({
  href = "/",
  className = "h-8 w-auto",
}: LogoChariowProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2">
      <Image
        src={chariowDesignSystem.images.logo}
        alt={chariowDesignSystem.images.logoAlt}
        width={120}
        height={32}
        className={className}
        priority
      />
    </Link>
  );
}
