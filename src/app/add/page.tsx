"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, Plus, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AddStockPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setLoading(false);
    }
  };

  const addStock = async (symbol: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol }),
      });

      if (!res.ok) throw new Error("Failed to add stock");

      toast({
        title: "Stock Added",
        description: `${symbol} is now in your watchlist.`,
      });

      router.push("/"); // Redirect back to dashboard
      router.refresh(); 
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not add stock. It might already exist.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Add Stock</h2>
          <p className="text-muted-foreground">Search and add companies to your watchlist.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Ticker</CardTitle>
          <CardDescription>Enter a symbol (e.g. AAPL) or company name.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <Input 
              placeholder="Search markets..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </form>

          <div className="space-y-2">
            {searchResults.map((result) => (
              <div 
                key={result.symbol} 
                className="flex items-center justify-between p-3 rounded-lg border bg-secondary/10 hover:bg-secondary/30 transition-colors"
              >
                <div>
                  <div className="font-bold">{result.symbol}</div>
                  <div className="text-sm text-muted-foreground">{result.shortname || result.longname}</div>
                </div>
                <Button 
                  size="sm" 
                  variant="secondary" 
                  onClick={() => addStock(result.symbol)}
                  disabled={loading}
                >
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            ))}
            {searchResults.length === 0 && query && !loading && (
              <p className="text-center text-sm text-muted-foreground py-4">No results found.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
