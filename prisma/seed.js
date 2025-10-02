const { PrismaClient } = require("@prisma/client");

async function runSeed() {
	const prisma = new PrismaClient();
	try {
		const existing = await prisma.idea.count();
		if (existing === 0) {
			await prisma.idea.createMany({
				data: [
					{ text: "Lightweight idea board" },
					{ text: "Dark mode keyboard shortcuts" },
					{ text: "Integrate with Slack" },
				],
			});
		}
	} catch (err) {
		console.error("Seed failed:", err);
		process.exitCode = 1;
	} finally {
		await prisma.$disconnect();
	}
}

if (require.main === module) {
	runSeed();
}
