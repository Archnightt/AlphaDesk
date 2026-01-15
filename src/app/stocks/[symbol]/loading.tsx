import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 relative">
      {/* Centered Loading Spinner Overlay */}
      <div className="absolute inset-0 flex items-start justify-center pt-20 z-10 pointer-events-none">
        <div className="bg-background/80 backdrop-blur-sm p-4 rounded-full shadow-lg border">
            <Spinner size={32} />
        </div>
      </div>

      {/* Navigation Skeleton */}
      <Skeleton className="h-10 w-32" />

      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      {/* Main Chart Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="space-y-1">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex gap-2">
             <Skeleton className="h-8 w-12" />
             <Skeleton className="h-8 w-12" />
             <Skeleton className="h-8 w-12" />
          </div>
        </CardHeader>
        <CardContent>
           <Skeleton className="h-[400px] w-full mt-4" />
        </CardContent>
      </Card>

      {/* Middle Row: Financials + AI */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
             <CardHeader>
                <Skeleton className="h-6 w-40" />
             </CardHeader>
             <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-6 w-24" />
                        </div>
                    ))}
                </div>
             </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card className="h-full bg-secondary/10 border-blue-100 dark:border-blue-900 shadow-sm">
            <CardHeader>
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent className="space-y-2">
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-3/4" />
               <Skeleton className="h-4 w-full" />
               <Skeleton className="h-4 w-5/6" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Row: Company News */}
      <div className="space-y-4">
         <Skeleton className="h-8 w-48" />
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <Skeleton className="h-48 w-full rounded-t-lg" />
                    <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                    </CardContent>
                </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
