"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddStockForm() {
	const [symbol, setSymbol] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!symbol.trim()) return;

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/stocks", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ symbol: symbol.trim().toUpperCase() }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to add stock");
			}

			setSymbol("");
			router.refresh();
		} catch (err: any) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="w-full max-w-sm">
			<form onSubmit={handleSubmit} className="relative">
				<div className="flex gap-2">
					<Input
						type="text"
						value={symbol}
						onChange={(e) => setSymbol(e.target.value)}
						placeholder="Enter symbol, e.g. AMD"
						className="flex-1 bg-secondary/50 border-transparent focus:border-input transition-colors"
						disabled={isLoading}
					/>
					<Button
						type="submit"
						disabled={isLoading || !symbol.trim()}
						className="min-w-[80px]"
					>
						{isLoading ? (
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
						) : (
							<>
								<PlusIcon className="w-4 h-4 mr-1" />
								Add
							</>
						)}
					</Button>
				</div>
				{error && <p className="absolute -bottom-6 left-0 text-xs text-red-500 mt-1">{error}</p>}
			</form>
		</div>
	);
}
