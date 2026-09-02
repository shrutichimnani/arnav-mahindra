/* Logo using the combined lockup image /images/logo-combined.png.
   On dark backgrounds the image is shown as-is (it has a transparent bg);
   on light backgrounds brightness-0 is NOT needed since the image already
   contains the correct dark artwork. */
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  dark = false,
  showSubtitle = true,
  showIcon = true,
  compactOnMobile = false,
}: {
  className?: string;
  dark?: boolean;
  showSubtitle?: boolean;
  showIcon?: boolean;
  compactOnMobile?: boolean;
}) {
  const logoHeight = compactOnMobile ? "h-[64px] sm:h-[80px]" : "h-[80px] sm:h-[90px]";
  const filter = dark ? "brightness-0 invert" : "";

  return (
    <Link href="/" className={`group flex items-center min-w-0 ${className}`}>
      <Image
        src="/images/logo-combined-v2.png"
        alt="Mahindra Modi – A Unit of Arnav Automobiles Pvt. Ltd."
        role="img"
        width={600}
        height={120}
        priority
        className={`block w-auto shrink-0 ${logoHeight} ${filter}`}
      />
    </Link>
  );
}