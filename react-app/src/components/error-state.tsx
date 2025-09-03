import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const friendlyMessage =
    message.includes("Usuário não encontrado") || message.includes("404")
      ? "Usuário não encontrado. Verifique o ID informado."
      : message;

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-foreground">
          Ocorreu um erro
        </h3>
        <p className="text-xs text-muted-foreground mt-1">{friendlyMessage}</p>
      </div>
      {onRetry && (
        <Button size="sm" variant="outline" onClick={onRetry}>
          Tentar novamente
        </Button>
      )}
    </div>
  );
}
