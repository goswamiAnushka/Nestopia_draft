import { PrismaClient } from "@prisma/client";

let prisma;
const MAX_RETRIES = 5;
let retries = 0;

const connectWithRetry = async () => {
  try {
    prisma = new PrismaClient();
    await prisma.$connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Failed to connect to MongoDB, retrying...", error);
    if (retries < MAX_RETRIES) {
      retries += 1;
      setTimeout(connectWithRetry, 5000); // wait 5 seconds before retrying
    } else {
      console.error("Exceeded maximum retry attempts. Please check your connection.");
    }
  }
};

connectWithRetry();

export default prisma;
