import type { Metadata } from "next";
import { slugToName } from "@/lib/utils";
import { COUPLE, WEDDING } from "@/shared";
import InvitationExperience from "@/components/public/InvitationExperience";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guestName = slugToName(slug);
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  return {
    title: `${COUPLE.displayName} - Wedding Invitation for ${guestName}`,
    description: `Dear ${guestName}, you are cordially invited to our wedding ceremony - ${COUPLE.displayName} Wedding. ${WEDDING.displayDate}.`,
    openGraph: {
      title: `${COUPLE.displayName} - The Wedding Invitation`,
      description: `Dear ${guestName}, you are cordially invited to our wedding ceremony - ${COUPLE.displayName} Wedding.`,
      type: "website",
      siteName: "Wedding of Jacob & Ghina",
      url: `${baseUrl}/invite/${slug}`,
      locale: "en_US",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `The Wedding of ${COUPLE.displayName} - ${guestName}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${COUPLE.displayName} - Wedding Invitation for ${guestName}`,
      description: `Dear ${guestName}, you are cordially invited to celebrate our wedding on ${WEDDING.displayDate}.`,
      images: [`${baseUrl}/opengraph-image`],
    },
  };
}

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;
  const guestName = slugToName(slug);

  return <InvitationExperience guestName={guestName} slug={slug} />;
}
