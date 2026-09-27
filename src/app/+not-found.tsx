import { router, Stack } from "expo-router";
import { ScreenFrame } from "../components/frame/ScreenFrame";
import { EmptyState } from "../components/ui/EmptyState";

export default function NotFoundRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Toro · Página não encontrada" }} />
      <ScreenFrame>
        <EmptyState
          title="Essa vaga não existe"
          message="O endereço que você abriu não leva a nenhuma sala do showroom."
          action="Voltar ao acervo"
          onAction={() => router.replace("/")}
        />
      </ScreenFrame>
    </>
  );
}
