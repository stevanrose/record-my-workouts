const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function formatDate(date = new Date()) {
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", {
    month: "2-digit",
  });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

const programmes = [
  {
    name: "Getting started full body programme",
    description: "A full body programme incorporting knee rehab work",
    startDate: new Date(),
    endDate: new Date(),
    trainer: "Anita Hegarty",
  },
  {
    name: "Low impact cardio programme",
    description: "A low impact cardio programme",
    startDate: new Date(),
    endDate: new Date(),
    trainer: "Steve Rose",
  },
];

const exercises = [
  {
    name: "Warm up - Bike Erg",
    description: "Moderate warm up at a medium RPE",
  },
  {
    name: "Crab walk with booty band",
    description: "15-20 steps each way",
  },

];

async function main() {
  console.log(`Start seeding ...`);
  for (const p of programmes) {
    const programme = await prisma.programme.create({
      data: p,
    });
    console.log(`Created programme with id: ${programme.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
