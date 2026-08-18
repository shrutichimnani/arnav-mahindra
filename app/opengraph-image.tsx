import { ImageResponse } from "next/og";

export const alt =
  "Mahindra Modi, authorised Mahindra dealer across Thane, Airoli and Worli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Branded social-share card, generated at build so we ship no binary
   asset. Replace with real dealership photography for launch if desired. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 55%, #333333 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#000000",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            MM
          </div>
          <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -0.5 }}>
              MAHINDRA MODI
            </span>
            <span
              style={{
                fontSize: 14,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#cccccc",
              }}
            >
              A Unit of Arnav Automobiles Pvt Ltd.
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", color: "#fff" }}>
          <span style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.05, maxWidth: 900 }}>
            New Mahindra Cars, Test Drives &amp; Service
          </span>
          <span style={{ fontSize: 34, color: "#cccccc", marginTop: 12 }}>
            Authorised Mahindra dealer across Thane, Airoli &amp; Worli
          </span>
        </div>

        <div style={{ display: "flex", gap: 40, color: "#d9d9d9", fontSize: 24 }}>
          <span>10,000+ cars sold</span>
          <span>97% customer satisfaction</span>
          <span>Thar Roxx · XUV 7XO · Scorpio-N</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
