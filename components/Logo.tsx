/* Logo lockup loaded from /images/logo-mark.png + /images/logo-wordmark.png
   (white-on-transparent). On light backgrounds (`dark` = false) the white
   marks are invisible, so a brightness-0 filter turns them into dark
   silhouettes; the dark footer keeps the white marks as-is. Mahindra Modi
   is an authorised Mahindra dealership, so pairing the manufacturer's own
   mark with the dealer name here follows standard dealer-site branding
   practice. */
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  className = "",
  dark = false,
  showIcon = true,
  compactOnMobile = false,
}: {
  className?: string;
  dark?: boolean;
  showSubtitle?: boolean;
  showIcon?: boolean;
  compactOnMobile?: boolean;
}) {
  // Scale the lockup down together on mobile (~75%), reverting at sm;
  // verified to fit without truncating down to 360px width.
  const iconHeight = compactOnMobile ? "h-[36px] sm:h-16" : "h-14 sm:h-[58px]";
  const wordHeight = compactOnMobile ? "h-[8px] sm:h-[13px]" : "h-[11px] sm:h-[13px]";
  const titleSize = compactOnMobile ? "text-[10.5px] sm:text-sm" : "text-sm";
  const filter = dark ? "" : "brightness-0";
  return (
    <Link href="/" className={`group flex min-w-0 items-center gap-3 ${className}`}>
      {showIcon && (
        <>
          <Image
            src="/images/logo-mark.png"
            alt="Mahindra"
            role="img"
            width={2872}
            height={1224}
            priority
            className={`w-auto shrink-0 ${iconHeight} ${filter}`}
          />
          <Image
            src="/images/logo-wordmark-v3.png"
            alt="Mahindra Modi"
            role="img"
            width={2176}
            height={253}
            priority
            className={`w-auto shrink-0 ${wordHeight} ${filter}`}
          />
        </>
      )}
      {!showIcon && (
        <span className={`truncate font-logo ${titleSize} font-extrabold tracking-tight ${dark ? "text-white" : "text-brand"}`}>
          MAHINDRA MODI
        </span>
      )}
    </Link>
  );
}