import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding initial data...");

  // Seed default invitation links
  await prisma.invitation.upsert({
    where: { slug: "tamu-undangan" },
    update: {},
    create: {
      guestName: "Tamu Undangan",
      slug: "tamu-undangan",
    },
  });

  await prisma.invitation.upsert({
    where: { slug: "budi-saputra" },
    update: {},
    create: {
      guestName: "Budi Saputra",
      slug: "budi-saputra",
    },
  });

  await prisma.invitation.upsert({
    where: { slug: "rudi-saputra" },
    update: {},
    create: {
      guestName: "Rudi Saputra",
      slug: "rudi-saputra",
    },
  });

  // Seed dummy wishes
  const wishesCount = await prisma.wish.count();
  if (wishesCount === 0) {
    await prisma.wish.createMany({
      data: [
        {
          name: "Hotma Siregar",
          message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang bahagia dan harmonis. Horas!",
          approved: true,
        },
        {
          name: "Debora Nababan",
          message: "Kiranya Tuhan memberkati pernikahan kalian dan memenuhi rumah tangga kalian dengan sukacita dan damai sejahtera.",
          approved: true,
        },
        {
          name: "Freddy Sitorus",
          message: "Selamat Budi dan Sari! Semoga cinta kalian sekuat Batak dan seindah ulos yang mengikat. Horas 3x!",
          approved: true,
        },
        {
          name: "Maria Pardede",
          message: "Selamat ya untuk kalian berdua! Diberkati selalu dalam setiap langkah perkawinan.",
          approved: false, // pending approval test
        },
      ],
    });
  }

  // Seed dummy RSVPs
  const rsvpCount = await prisma.rsvp.count();
  if (rsvpCount === 0) {
    await prisma.rsvp.createMany({
      data: [
        {
          guestName: "Hotma Siregar",
          slug: "hotma-siregar",
          attending: true,
          session: "both",
          guestCount: 2,
          message: "Horas! Siap hadir bersama istri.",
        },
        {
          guestName: "Debora Nababan",
          slug: "debora-nababan",
          attending: true,
          session: "resepsi",
          guestCount: 1,
          message: "Selamat ya!",
        },
        {
          guestName: "Freddy Sitorus",
          slug: "freddy-sitorus",
          attending: false,
          session: "resepsi",
          guestCount: 0,
          message: "Maaf belum bisa hadir karena luar kota.",
        },
      ],
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
