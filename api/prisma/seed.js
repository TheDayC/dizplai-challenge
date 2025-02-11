import process from "process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear any existing data incase we're re-seeding an existing db.
  await prisma.votes.deleteMany({});
  await prisma.polls.deleteMany({});

  // Create the Superbowl victory poll with options.
  const sbPoll = await prisma.polls.create({
    data: {
      name: "Who will win the Superbowl?",
      date: new Date().toISOString(),
      options: ["Kansas City Chiefs", "Philadelphia Eagles"],
    },
  });

  // Create the NBA #1 draft pick poll with options.
  const nbaPoll = await prisma.polls.create({
    data: {
      name: "Which team will receive the first pick in the 2025 NBA draft?",
      date: new Date().toISOString(),
      options: [
        "Washington Wizards",
        "New Orleans Pelicans",
        "Utah Jazz",
        "Charlotte Hornets",
        "Toronto Raptors",
        "Brooklyn Nets",
      ],
    },
  });

  // Populate the vote data for the superbowl poll and link via object id.
  await prisma.votes.createMany({
    data: [
      {
        pollId: sbPoll.id,
        username: "john",
        optionSelected: "Kansas City Chiefs",
        date: new Date().toISOString(),
      },
      {
        pollId: sbPoll.id,
        username: "jane",
        optionSelected: "Philadelphia Eagles",
        date: new Date().toISOString(),
      },
      {
        pollId: sbPoll.id,
        username: "sam",
        optionSelected: "Philadelphia Eagles",
        date: new Date().toISOString(),
      },
      {
        pollId: sbPoll.id,
        username: "david",
        optionSelected: "Philadelphia Eagles",
        date: new Date().toISOString(),
      },
      {
        pollId: sbPoll.id,
        username: "chris",
        optionSelected: "Kansas City Chiefs",
        date: new Date().toISOString(),
      },
    ],
  });

  // Populate the vote data for the nba poll and link via object id.
  await prisma.votes.createMany({
    data: [
      {
        pollId: nbaPoll.id,
        username: "alice",
        optionSelected: "Washington Wizards",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "bob",
        optionSelected: "Brooklyn Nets",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "jeff",
        optionSelected: "Charlotte Hornets",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "tony",
        optionSelected: "New Orleans Pelicans",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "john",
        optionSelected: "Washington Wizards",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "sam",
        optionSelected: "Washington Wizards",
        date: new Date().toISOString(),
      },
      {
        pollId: nbaPoll.id,
        username: "billy",
        optionSelected: "Utah Jazz",
        date: new Date().toISOString(),
      },
    ],
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
