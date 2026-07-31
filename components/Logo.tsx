/* Official Mahindra wordmark, sourced directly from the SVG icon sprite
   served on auto.mahindra.com (path data unmodified, fill swapped to
   currentColor so it follows the `dark` prop like the rest of this
   lockup). Mahindra Modi is an authorised Mahindra dealership, so
   pairing the manufacturer's own mark with the dealer name here follows
   standard dealer-site branding practice. */
import Link from "next/link";

export default function Logo({
  className = "",
  dark = false,
  showSubtitle = true,
  showIcon = true,
  // The icon SVG's viewBox is very wide (131x18), so at its normal height
  // it eats a lot of horizontal space — fine in the navbar (no subtitle
  // to protect), but on narrow phones it can crowd out the footer's
  // "A Unit of Arnav Automobiles Pvt Ltd." subtitle line and truncate it.
  // Only shrink the icon on small screens (sm: reverts to full size) and
  // only where a caller opts in, so the navbar is unaffected.
  compactOnMobile = false,
}: { className?: string; dark?: boolean; showSubtitle?: boolean; showIcon?: boolean; compactOnMobile?: boolean }) {
  // Scale the whole lockup down together on mobile — icon, both text
  // lines, and letter-spacing all shrink by roughly the same proportion
  // (~75%) rather than just shrinking the icon, so it still reads as the
  // same logo at a smaller size instead of a tiny icon next to
  // full-size text. sm: reverts every one of these to the original
  // size; verified to fit down to 360px width (a common Android
  // minimum) without truncating.
  const iconHeight = compactOnMobile ? "h-[18px] sm:h-7" : "h-6 sm:h-7";
  const titleSize = compactOnMobile ? "text-[10.5px] sm:text-sm" : "text-sm";
  const subtitleSize = compactOnMobile ? "text-[6.5px] sm:text-[9px]" : "text-[9px]";
  const subtitleTracking = compactOnMobile ? "tracking-[0.12em] sm:tracking-[0.2em]" : "tracking-[0.2em]";
  return (
    <Link href="/" className={`group flex min-w-0 items-center gap-3 ${className}`}>
      {showIcon && (
        <>
          <svg
            viewBox="0 0 131 18"
            role="img"
            aria-label="Mahindra"
            className={`${iconHeight} ${showSubtitle ? "" : "-translate-y-1 sm:-translate-y-1.5"} w-auto shrink-0 ${dark ? "text-white" : "text-brand"}`}
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0551 7.8459H31.6991C33.4266 7.8459 34.8518 9.23392 34.8518 10.9288V17.9858H23.4217C22.3708 17.9858 21.507 17.1384 21.507 16.101C21.507 15.2828 21.507 14.4646 21.507 13.6464C21.507 12.6821 22.3132 11.8931 23.2921 11.8931H29.6262L28.9496 13.3249H24.2854C24.0839 13.3249 23.8535 13.4857 23.8535 13.7048C23.8535 14.3477 23.8535 14.9906 23.8535 15.6334C23.8535 15.8526 24.0839 16.0133 24.2854 16.0133H32.3757V11.3817C32.3757 10.4904 31.584 9.80374 30.7058 9.80374H23.1194L24.0551 7.8459ZM86.8343 4.16399V18.0004H75.6921C74.6413 18.0004 73.7775 17.153 73.7775 16.1156C73.7775 14.3915 73.7775 12.6675 73.7775 10.9288C73.7775 9.23392 75.2027 7.8459 76.9301 7.8459H83.2786L82.3429 9.81836H77.909C77.0309 9.81836 76.2392 10.5051 76.2392 11.3963C76.2392 12.8136 76.2392 14.2308 76.2392 15.6481C76.2392 15.8672 76.4695 16.0279 76.671 16.0279H84.3583V4.16399H86.8343ZM47.6927 18.0004H50.1543C50.1543 15.6481 50.1543 13.2957 50.1543 10.9434C50.1543 9.24853 48.7291 7.86051 47.0017 7.86051H41.7617L40.826 9.83297H46.0228C46.9009 9.83297 47.6927 10.5197 47.6927 11.4109V18.0004ZM37.4286 4.16399V18.0004H39.8902V4.16399H37.4286ZM16.8573 18.0004H19.3189C19.3189 15.6481 19.3189 13.2957 19.3189 10.9434C19.3189 9.24853 17.8937 7.86051 16.1663 7.86051C11.3006 7.86051 4.86572 7.86051 0 7.86051V18.0004H2.46165V10.1982C2.46165 9.97907 2.69198 9.81836 2.89352 9.81836C4.33308 9.81836 6.55 9.81836 7.98956 9.81836C8.1911 9.81836 8.42143 9.97907 8.42143 10.1982V18.0004H10.8831V10.1982C10.8831 9.97907 11.1134 9.81836 11.315 9.81836C12.337 9.81836 14.1509 9.81836 15.1874 9.81836C16.0655 9.81836 16.8573 10.5051 16.8573 11.3963V18.0004ZM99.704 7.8459H93.5139C91.7864 7.8459 90.3612 9.23392 90.3612 10.9288V17.9858H92.8229C92.8229 15.7942 92.8229 13.5879 92.8229 11.3963C92.8229 10.5051 93.6147 9.81836 94.4928 9.81836H98.7683L99.704 7.8459ZM68.1344 7.8459C69.8619 7.8459 71.2871 9.23392 71.2871 10.9288V17.9858H68.8254C68.8254 15.7942 68.8254 13.5879 68.8254 11.3963C68.8254 10.5051 68.0337 9.81836 67.1555 9.81836H61.2245V18.0004H58.7629V7.86051C61.8723 7.86051 64.9962 7.8459 68.1344 7.8459ZM53.2206 8.48877L55.6822 7.05692V17.9858H53.2206V8.48877ZM55.6966 5.63967V4.13477H53.235V7.05692L55.6966 5.63967ZM101.431 7.8459H109.061C110.789 7.8459 112.214 9.23392 112.214 10.9288V17.9858H100.784C99.7328 17.9858 98.8691 17.1384 98.8691 16.101C98.8691 15.2828 98.8691 14.4646 98.8691 13.6464C98.8691 12.6821 99.6752 11.8931 100.654 11.8931H106.988L106.312 13.3249H101.647C101.446 13.3249 101.216 13.4857 101.216 13.7048C101.216 14.3477 101.216 14.9906 101.216 15.6334C101.216 15.8526 101.446 16.0133 101.647 16.0133H109.738V11.3817C109.738 10.4904 108.946 9.80374 108.068 9.80374H100.481L101.431 7.8459Z"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M128.05 2.35233H128.438C128.971 2.35233 129.331 2.45461 129.23 3.06826C129.144 3.57964 128.87 3.74035 128.525 3.74035H127.013C127.128 2.9952 127.171 2.35233 128.05 2.35233ZM113.553 0.569819H115.367C116.188 0.569819 116.576 0.905866 116.447 1.73868C116.303 2.68838 115.525 2.92215 114.69 2.92215H113.208L113.553 0.569819ZM114.575 3.40431L115.9 6.04885H116.864L115.41 3.30203C116.303 3.19975 117.066 2.93676 117.253 1.73868C117.397 0.745148 116.893 0 115.785 0H112.805C112.502 2.01628 112.2 4.03257 111.912 6.04885H112.776L113.165 3.41892H114.575V3.40431ZM124.883 1.88479L124.58 2.39616C124.076 2.39616 123.486 2.39616 122.982 2.39616C122.752 2.39616 122.45 2.41077 122.306 2.54227C122.162 2.65916 122.09 2.93676 122.147 3.1267C122.219 3.37508 122.522 3.44814 122.795 3.52119L124.148 3.84263C124.796 4.00335 125.156 4.42706 125.027 5.11377C124.883 5.87352 124.364 6.07807 123.659 6.07807H120.895L121.197 5.5667H123.054C123.573 5.5667 124.048 5.55209 124.163 4.93844C124.249 4.4855 123.774 4.32478 123.429 4.23712L122.09 3.91568C121.5 3.76958 121.168 3.3897 121.284 2.77604C121.413 2.07473 121.874 1.88479 122.522 1.88479H124.883ZM119.239 0.482154H120.103L120.017 1.00814L119.081 1.54874L119.239 0.482154ZM118.98 2.26467L119.916 1.72407L119.268 6.03424H118.419L118.98 2.26467ZM126.221 3.74035C126.063 4.83616 125.861 6.06346 127.459 6.06346H129.244L129.547 5.55209H127.978C126.826 5.55209 126.783 5.09915 126.927 4.19329H128.712C129.532 4.19329 129.907 4.00335 130.051 3.05365C130.18 2.27928 129.504 1.81173 128.769 1.81173H128.035C126.74 1.82634 126.408 2.65916 126.221 3.74035Z"
            />
          </svg>
          <span className={`${iconHeight} w-px shrink-0 ${dark ? "bg-white/25" : "bg-border"}`} />
        </>
      )}
      {/* Kept on the original logo font (Sora/Inter), not the site-wide
          Lato/Georama swap. */}
      <span className="min-w-0 font-menu leading-none">
        <span className={`block truncate font-logo ${titleSize} font-extrabold tracking-tight ${dark ? "text-white" : "text-brand"}`}>
          MAHINDRA MODI
        </span>
        {showSubtitle && (
          <span className={`block truncate ${subtitleSize} font-medium uppercase ${subtitleTracking} ${dark ? "text-white/60" : "text-muted"}`}>
            A Unit of Arnav Automobiles Pvt Ltd.
          </span>
        )}
      </span>
    </Link>
  );
}
