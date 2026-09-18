/**
 * Shared Wedding Data & Constants
 * Contains wedding configuration, couple lineage, event schedules,
 * timeline history, photo gallery, gift registry, and guestbook dummy data.
 */

export interface EventItem {
  id: string;
  title: string;
  icon: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  mapsUrl: string;
  mapsEmbed: string;
}

export interface LoveStoryItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface GiftRegistryItem {
  id: string;
  bank: string;
  accountNumber: string;
  accountName: string;
  logo: string;
}

export interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  size: "large" | "tall" | "wide" | "small";
  category: "prewedding" | "outdoor" | "adat";
}

export interface DummyWishItem {
  $id: string;
  name: string;
  message: string;
  createdAt: string;
}

export const COUPLE = {
  groomName: "Jacob Manullang",
  brideName: "Ghina Simanjuntak",
  groomFather: "Robert Manullang",
  groomMother: "Marta Situmorang",
  brideFather: "Hamonangan Simanjuntak",
  brideMother: "Ester Pardede",
  displayName: "Jacob & Ghina",
} as const;

export const WEDDING = {
  date: "2026-05-02T08:00:00+07:00",
  displayDate: "Saturday, May 02nd, 2026",
  hashtag: "#withCob",
  events: [
    {
      id: "matrimony",
      title: "Pemberkatan Kudus (Holy Matrimony)",
      icon: "⛪",
      date: "Saturday, May 02nd, 2026",
      time: "08:00 AM – 11:00 AM WIB",
      venue: "Gereja HKBP Menteng",
      address: "Jl. Jambu No. 28, Menteng, Jakarta Pusat",
      mapsUrl: "https://maps.google.com/?q=Gereja+HKBP+Menteng+Jakarta",
      mapsEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.83012!3d-6.18556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnMDguMCJTIDEwNsKwNDknNDguNCJF!5e0!3m2!1sen!2sid!4v1234567890",
    },
    {
      id: "adat_reception",
      title: "Pesta Adat & Resepsi (Pesta Unjuk)",
      icon: "🏛️",
      date: "Saturday, May 02nd, 2026",
      time: "12:00 PM – 05:00 PM WIB",
      venue: "The Grand Ballroom, Gedung Mulia & Raja",
      address: "Jl. Kebon Nanas No. 17, Jatinegara, Jakarta Timur",
      mapsUrl: "https://maps.google.com/?q=Gedung+Mulia+Raja+Jakarta",
      mapsEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.83012!3d-6.18556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTEnMDguMCJTIDEwNsKwNDknNDguNCJF!5e0!3m2!1sen!2sid!4v1234567890",
    },
  ] as EventItem[],
};

export const LOVE_STORY: LoveStoryItem[] = [
  {
    year: "2019",
    title: "The First Meeting",
    description:
      "We crossed paths for the first time during a university gathering in Jakarta. A simple serendipitous hello blossomed into countless late-night conversations.",
    icon: "💫",
  },
  {
    year: "2020",
    title: "Growing Closer",
    description:
      "Through shared dreams, weekend coffee dates, and mutual passions, our bond deepened into an unbreakable companionship.",
    icon: "🌱",
  },
  {
    year: "2022",
    title: "Our Official Beginning",
    description:
      "With the warm blessings of our families, we officially began our journey together, navigating life hand-in-hand.",
    icon: "❤️",
  },
  {
    year: "2024",
    title: "The Proposal",
    description:
      "Under a starlit twilight overlooking the serene waters of Lake Toba, Jacob asked the question of a lifetime, and Ghifa joyfully said Yes!",
    icon: "💍",
  },
  {
    year: "2026",
    title: "Forever Begins",
    description:
      "Surrounded by the ones we love most, we are thrilled to exchange our vows and begin the grandest adventure of all.",
    icon: "🏔️",
  },
];

export const GIFT_REGISTRY: GiftRegistryItem[] = [
  {
    id: "bca",
    bank: "Bank BCA",
    accountNumber: "8415201934",
    accountName: "Jacob MANULLANG",
    logo: "BCA",
  },
  {
    id: "bni",
    bank: "Bank BNI",
    accountNumber: "0721839410",
    accountName: "Ghifa SIMANJUNTAK",
    logo: "BNI",
  },
];

export const QRIS_IMAGE_PATH = "/assets/qris-dummy.png";
export const GONDANG_MUSIC_PATH = "/assets/music/gondang.mp3";

export const GALLERY_IMAGES: GalleryImageItem[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000",
    alt: "Joyful Pre-wedding Moments",
    size: "large",
    category: "prewedding",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000",
    alt: "Outdoor Golden Hour Session",
    size: "tall",
    category: "outdoor",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000",
    alt: "Wedding Rings of Eternity",
    size: "small",
    category: "prewedding",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1000",
    alt: "Laughter in Nature",
    size: "small",
    category: "outdoor",
  },
  {
    id: "5",
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=1000",
    alt: "Heritage & Sacred Gratitude",
    size: "wide",
    category: "adat",
  },
  {
    id: "6",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=1000",
    alt: "A Lifetime of Love",
    size: "small",
    category: "adat",
  },
];

export const DUMMY_WISHES: DummyWishItem[] = [
  {
    $id: "1",
    name: "Hotma Siregar",
    message:
      "Warmest congratulations Jacob & Ghifa! Wishing you a lifetime of happiness, unconditional love, and abundance. Cheers!",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "2",
    name: "Debora Nababan",
    message:
      "May God abundantly bless your holy union and fill your new household with peace and everlasting joy.",
    createdAt: new Date().toISOString(),
  },
  {
    $id: "3",
    name: "Freddy Sitorus",
    message:
      "Happy Wedding Day! May your bond grow stronger with each passing day. Best wishes on this wonderful journey!",
    createdAt: new Date().toISOString(),
  },
];
