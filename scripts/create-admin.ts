import { prisma } from "@/lib/prisma";

async function main() {
  try {
    const email = process.argv[2];

    if (!email) {
      throw new Error("❌ Please provide an email. Example: npm run make-admin user@email.com");
    }

    console.log("🔍 Looking for user:", email);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("❌ User not found in database");
    }

    if (user.role === "ADMIN") {
      console.log("⚠️ User is already an admin");
      return;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" },
    });

    console.log("✅ User promoted to ADMIN successfully");
  } catch (error: any) {
    console.error("❌ Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();