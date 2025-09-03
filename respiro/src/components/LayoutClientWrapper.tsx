"use client";

import { useEffect } from "react";
import { useOrientation } from "@/hooks/use-orientation";
import { useDeviceType } from "@/hooks/use-device-type";
import { ThemeProvider } from "@/components/theme-provider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog"
import { useState } from "react";
import { Smartphone } from "lucide-react";

/**
 * Este componente é responsável por renderizar o wrapper principal da aplicação,
 * que é responsável por gerenciar o estado do tema e renderizar o diálogo de alerta
 * para dispositivos móveis em modo retrato.
 *
 * Ele usa os hooks useOrientation e useDeviceType para detectar o tipo de dispositivo
 * e a orienta o do dispositivo.
 *
 * Se o dispositivo for um smartphone em modo retrato, ele renderiza um diálogo de alerta
 * solicitando que o usuário gire o dispositivo.
 *
 * Caso contrário, ele renderiza o conteúdo passado como props.children.
 */

export function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const orientation = useOrientation();
  const deviceType = useDeviceType();

    const [isDismissed, setIsDismissed] = useState(false);

  const isMobileInPortrait = deviceType === "mobile" && orientation === "portrait";

  // Lógica para adicionar/remover a classe do body
  useEffect(() => {
    if (isMobileInPortrait) {
      document.body.classList.add("text-sm");
    } else {
      document.body.classList.remove("text-sm");
    }
  }, [isMobileInPortrait]);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="slate"
      enableSystem
      disableTransitionOnChange
    >
      <AlertDialog open={isMobileInPortrait && !isDismissed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Aviso de Orientação
            </AlertDialogTitle>
            <AlertDialogDescription>
              Parece que você está utilizando um dispositivo móvel na vertical.<br/>Para uma melhor experiência, recomendamos utilizar o modo horizontal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction onClick={() => setIsDismissed(true)}>
            Prosseguir mesmo assim
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </ThemeProvider>
  );
}