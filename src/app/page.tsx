import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="flex max-w-2xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <Badge variant="secondary">Starter Kit</Badge>
          <h1 className="text-4xl font-bold tracking-tight">UltraKit</h1>
          <p className="text-muted-foreground text-lg">
            Next.js 16 + Tailwind v4 + shadcn base-nova + AI Elements
          </p>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Components Ready</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center justify-center gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>

        <p className="text-muted-foreground text-sm">
          30+ UI components in <code className="text-foreground">@/components/ui</code>
          {" "}&middot;{" "}
          21 AI elements in <code className="text-foreground">@/components/ai-elements</code>
        </p>
      </div>
    </div>
  );
}
