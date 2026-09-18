import type { Metadata } from "next";
import { slugToName } from "@/lib/utils";
import { COUPLE, WEDDING } from "@/lib/dummy-data";
import InvitationExperience from "@/components/public/InvitationExperience";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guestName = slugToName(slug);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  return {
    title: `The Wedding of ${COUPLE.displayName} | Invitation for ${guestName}`,
    description: `${guestName}, you are cordially invited to celebrate the wedding of ${COUPLE.groomName} & ${COUPLE.brideName} on ${WEDDING.displayDate}.`,
    openGraph: {
      title: `💍 ${COUPLE.groomName} & ${COUPLE.brideName}: Wedding Invitation for ${guestName}`,
      description: `We joyfully invite ${guestName} to celebrate our special day. ${WEDDING.displayDate}.`,
      type: "website",
      url: `${baseUrl}/invite/${slug}`,
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

export default async function InvitePage({ params }: Props) {
  const { slug } = await params;
  const guestName = slugToName(slug);

  return <InvitationExperience guestName={guestName} slug={slug} />;
}
