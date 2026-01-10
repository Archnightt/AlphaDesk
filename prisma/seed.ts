import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Start seeding...");

	// 1. Cleanup existing data
	await prisma.snapshot.deleteMany();
	await prisma.stock.deleteMany();

	// 2. Define initial stocks
	const stocks = [
		{ symbol: "NVDA", name: "NVIDIA Corp", price: 135.5, change: 2.5, sector: "Technology" },
		{ symbol: "AAPL", name: "Apple Inc.", price: 185.0, change: 1.2, sector: "Technology" },
		{ symbol: "TSLA", name: "Tesla, Inc.", price: 240.0, change: -1.5, sector: "Automotive" },
		{ symbol: "MSFT", name: "Microsoft Corp", price: 420.0, change: 0.5, sector: "Technology" },
	];

	// 3. Insert stocks
	for (const stock of stocks) {
		await prisma.stock.create({
			data: {
				symbol: stock.symbol,
				name: stock.name,
				price: stock.price,
				change: stock.change,
				sector: stock.sector,
				automated: true,
			},
		});
		console.log(`✅ Created stock: ${stock.symbol}`);
	}

	console.log("🏁 Seeding finished.");
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
