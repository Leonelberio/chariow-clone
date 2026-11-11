import { FooterMarketing } from "@/components/marketing/FooterMarketing";
import { HeaderMarketing } from "@/components/marketing/HeaderMarketing";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HeaderMarketing />
      <main className="flex-1">{children}</main>
      <FooterMarketing />
    </>
  );
}
