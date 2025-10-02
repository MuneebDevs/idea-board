const { PrismaClient } = require("@prisma/client");

async function runSeed() {
	const prisma = new PrismaClient();
	try {
		const existing = await prisma.idea.count();
		if (existing === 0) {
			await prisma.idea.createMany({
				data: [
					{ text: "Lightweight idea board to crowdsource feature requests" },
					{ text: "Dark mode and keyboard shortcuts everywhere" },
					{ text: "Integrate with Slack for notifications" },
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
