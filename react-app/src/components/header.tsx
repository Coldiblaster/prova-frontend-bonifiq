import type { User } from "@/services/user.service";
import { Button } from "./ui/button";

interface HeaderProps {
  user?: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4 border-b bg-muted/30">
      {user && (
        <div className="flex items-center gap-2 w-full">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <p className="font-medium truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
      )}

      <Button
        size="sm"
        variant="ghost"
        onClick={() => window.parent.postMessage({ close: true }, "*")}
      >
        ✕
      </Button>
    </div>
  );
}
