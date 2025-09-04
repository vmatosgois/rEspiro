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
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

const COOKIE_NAME = "orientation-warning-dismissed";

// Função para criar cookie
export function createCookie(cookieName: string, data: string, expirationMinutes: number) {
  const expires = new Date(Date.now() + expirationMinutes * 60 * 1000).toUTCString();
  document.cookie = `${cookieName}=${data}; expires=${expires}; path=/`;
}

// Função para ler cookie
export function getCookie(cookieName: string) {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    const c = ca[i].trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}

export function LayoutClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const orientation = useOrientation();
  const deviceType = useDeviceType();
  const [isDismissed, setIsDismissed] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    const cookieValue = getCookie(COOKIE_NAME);
    if (cookieValue === "true") {
      setIsDismissed(true);
    } else {
      setIsDismissed(false);
    }
  }, []);

  const isMobileInPortrait =
    deviceType === "mobile" && orientation === "portrait";

  useEffect(() => {
    if (isMobileInPortrait) {
      document.body.classList.add("text-xs");
      document.querySelector("h1")?.classList.replace("text-3xl", "text-lg");
    }
  }, [isMobileInPortrait]);

  const shouldOpenDialog = isMobileInPortrait && !isDismissed;

  const handleProceed = () => {
    if (dontShowAgain) {
      createCookie(COOKIE_NAME, "true", 648000);
      setIsDismissed(true);
    }
    setIsDismissed(true);
  };

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="slate"
      enableSystem
      disableTransitionOnChange
    >
      <AlertDialog open={shouldOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Aviso de Orientação
            </AlertDialogTitle>
            <AlertDialogDescription>
              Parece que você está utilizando um dispositivo móvel na vertical.
              <br />
              Para uma melhor experiência, recomendamos utilizar o modo
              horizontal.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="dont-show-again"
              checked={dontShowAgain}
              onCheckedChange={(checked) => setDontShowAgain(Boolean(checked))}
            />
            <Label htmlFor="dont-show-again" className="cursor-pointer">
              Não exibir novamente
            </Label>
          </div>

          <AlertDialogAction onClick={handleProceed}>
            Prosseguir mesmo assim
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      {children}
    </ThemeProvider>
  );
}
