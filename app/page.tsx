import type { Metadata } from "next";
import { COUPLE, WEDDING } from "@/shared";
import InvitationExperience from "@/components/public/InvitationExperience";

interface Props {
  searchParams: Promise<{ to?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const guestName = params.to || "Honored Guest";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: `The Wedding of ${COUPLE.displayName} | Invitation for ${guestName}`,
    description: `${guestName}, you are cordially invited to celebrate the holy matrimony of ${COUPLE.groomName} & ${COUPLE.brideName} on ${WEDDING.displayDate}.`,
    openGraph: {
      title: `💍 ${COUPLE.groomName} & ${COUPLE.brideName}: Wedding Invitation for ${guestName}`,
      description: `We joyfully invite ${guestName} to celebrate our wedding day. ${WEDDING.displayDate}.`,
      type: "website",
      url: `${baseUrl}/?to=${encodeURIComponent(guestName)}`,
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `The Wedding of ${COUPLE.displayName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `The Wedding of ${COUPLE.displayName}`,
      description: `Dear ${guestName}: You are cordially invited to celebrate with us!`,
    },
  };
}

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;
  const guestName = params.to || "Honored Guest";
  const slug = guestName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  return <InvitationExperience guestName={guestName} slug={slug} />;
}
