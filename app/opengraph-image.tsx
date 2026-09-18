import { ImageResponse } from "next/og";
import { COUPLE, WEDDING } from "@/shared";

export const runtime = "nodejs";
export const alt = `The Wedding of ${COUPLE.displayName}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#FAF7F2",
          backgroundImage: "radial-gradient(circle at 50% 50%, #FAF5EE 0%, #EFE4D6 100%)",
          padding: "40px",
          position: "relative",
          fontFamily: "serif",
        }}
      >
        {/* Double Gold Decorative Border */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "2px solid #7A5E24",
            borderRadius: "20px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 32,
            left: 32,
            right: 32,
            bottom: 32,
            border: "1px solid rgba(122, 94, 36, 0.4)",
            borderRadius: "16px",
            display: "flex",
          }}
        />

        {/* Content Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          {/* Left Text Column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              maxWidth: "600px",
            }}
          >
            {/* Cultural Badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(139, 26, 26, 0.12)",
                border: "1px solid rgba(139, 26, 26, 0.35)",
                padding: "6px 16px",
                borderRadius: "50px",
                color: "#8B1E2A",
                fontSize: 16,
                fontWeight: "bold",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 20,
              }}
            >
              * Horas Ma Di Hita Saluhutna *
            </div>

            <p
              style={{
                fontSize: 20,
                color: "#594E3F",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                margin: 0,
                marginBottom: 10,
              }}
            >
              The Wedding Celebration of
            </p>

            <h1
              style={{
                fontSize: 64,
                color: "#7A5E24",
                fontWeight: "bold",
                margin: 0,
                lineHeight: 1.1,
                marginBottom: 12,
              }}
            >
              {COUPLE.displayName}
            </h1>

            <p
              style={{
                fontSize: 18,
                color: "#594E3F",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                margin: 0,
                marginBottom: 24,
                fontWeight: 600,
              }}
            >
              Manullang &bull; Simanjuntak &bull; {WEDDING.hashtag}
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid rgba(122, 94, 36, 0.3)",
                borderRadius: "30px",
                padding: "10px 24px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <span style={{ fontSize: 18, color: "#2C251E", fontWeight: "bold" }}>
                📅 {WEDDING.displayDate}
              </span>
            </div>
          </div>

          {/* Right Arch Photo Frame */}
          <div
            style={{
              display: "flex",
              width: 340,
              height: 440,
              borderRadius: "170px 170px 24px 24px",
              border: "4px solid #7A5E24",
              overflow: "hidden",
              boxShadow: "0 16px 32px rgba(44, 37, 30, 0.15)",
              backgroundColor: "#FAF7F2",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800"
              alt="Couple Wedding Portrait"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
