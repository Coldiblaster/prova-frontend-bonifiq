import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserCardProps {
  name: string;
  email: string;
}

export function UserCard({ name, email }: UserCardProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{email}</p>
      </CardContent>
    </Card>
  );
}
