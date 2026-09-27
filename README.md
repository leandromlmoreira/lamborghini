# Toro · Showroom

Um showroom de supercarros italianos em React Native: percorra o acervo, abra a ficha de cada modelo e monte a sua garagem com quantidade e valor calculados na hora.

**[Ver ao vivo →](https://leandromlmoreira.github.io/react-native-lamborghini/)**

<p>
  <img src="docs/preview.png" alt="Tela inicial do Toro no desktop" width="72%" />
  <img src="docs/preview-mobile.png" alt="Tela inicial do Toro no celular" width="24%" />
</p>

| Ficha com galeria | Garagem |
| --- | --- |
| ![Ficha do modelo com galeria de cenas](docs/ficha.png) | ![Garagem com quantidades e valor total](docs/garagem.png) |

## Funcionalidades

- **Acervo ao vivo**: os modelos vêm de uma API HTTP real via axios, com busca por nome ou ano, filtro por era (clássicos, lendas, modernos) e quatro ordenações.
- **Grade em mosaico**: cards de moldura dupla, palco com iluminação própria por era e destaque automático para fechar a grade sem buracos.
- **Ficha do modelo**: galeria com três cenas (estúdio, perfil oposto e detalhe), ficha técnica, posição no ranking de preço e sugestões da mesma era.
- **Garagem com quantidade**: coração para guardar, contador de unidades, subtotal por modelo e valor total da coleção. Fica salva no aparelho entre visitas.
- **Estados cuidados**: esqueleto de carregamento, aviso elegante com acervo salvo quando a API falha, busca sem resultado, garagem vazia e rota inexistente.
- **Rotas de verdade**: `/`, `/carro/:id` e `/garagem` com Expo Router, então links diretos e o botão voltar do navegador funcionam.
- **Responsivo**: uma coluna em 375px, duas em tablet e três no desktop, sem rolagem horizontal.

## Stack

- React Native 0.86 + Expo SDK 57 + TypeScript (strict)
- Expo Router para navegação, também exportado para web
- axios para a API, AsyncStorage para a garagem
- react-native-svg para palco, silhuetas, ícones e marca (todos desenhados no projeto)
- Michroma e Manrope via `@expo-google-fonts`
- GitHub Actions + GitHub Pages para o deploy da versão web

## Como rodar

```bash
npm install
npm run web        # abre no navegador
npm run android    # ou npm run ios, com Expo Go ou emulador
```

Checagens e build da web:

```bash
npm run typecheck
npm run build:web  # gera a pasta dist, publicada em /react-native-lamborghini
```

## Estrutura

```
src/
├── app/            # rotas do Expo Router (acervo, ficha, garagem, 404)
├── screens/        # composição de cada tela
├── components/     # ui, carro, acervo, ficha, garagem, arte em SVG
├── domain/         # regras puras: catálogo, filtros, ordenação, garagem
├── hooks/          # dados da API, garagem persistida, layout, animação de entrada
├── services/api.ts # cliente axios
└── theme/tokens.ts # cores, fontes, raios e curvas de animação
```

<sub>Dados e fotos dos carros vêm da API pública de exemplo do desafio "Como consumir API em apps React Native" da trilha React Native da DIO.</sub>
