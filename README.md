# Toro · Showroom

Um showroom de supercarros italianos em React Native, com cara de configurador: preto brilhante, luz de estúdio, reflexo no piso e verde ácido nos detalhes. Percorra o acervo, abra a ficha de cada modelo com desempenho animado, ouça o motor e monte a sua garagem com quantidade e valor calculados na hora.

**[Ver ao vivo →](https://leandromlmoreira.github.io/toro/)** · [Repositório](https://github.com/leandromlmoreira/toro)

<p>
  <img src="docs/preview.png" alt="Tela inicial do Toro no desktop" width="72%" />
  <img src="docs/preview-mobile.png" alt="Tela inicial do Toro no celular" width="24%" />
</p>

| Ficha com desempenho | Acervo | Garagem |
| --- | --- | --- |
| ![Ficha do modelo com barras de desempenho](docs/ficha.png) | ![Acervo com filtros e cards](docs/acervo.png) | ![Garagem com quantidades e valor total](docs/garagem.png) |

## Funcionalidades

- **Acervo ao vivo**: os modelos vêm de uma API HTTP real via axios, com busca por nome ou ano, filtro por era (clássicos, lendas, modernos) e quatro ordenações.
- **Palco de estúdio**: cada carro fica sob um foco de luz desenhado em SVG, com horizonte, piso brilhante e reflexo espelhado da foto.
- **Cards com tilt**: no desktop o card inclina seguindo o ponteiro (mola física), com um brilho que atravessa a pintura. Cada card já mostra potência, 0–100 e máxima.
- **Ficha técnica animada**: potência, 0–100 km/h e velocidade máxima com números que contam e barras em escala fixa, além de motor, ranking de preço e família.
- **Transições de configurador**: cada tela entra com uma cortina que varre a tela com o nome da seção ou do modelo; as vistas da galeria (estúdio, perfil, detalhe) deslizam como uma câmera.
- **Efeitos sonoros sintetizados**: clique mecânico nos botões, whoosh nas transições e ronco com acelerada e estalos de escape ao abrir um carro, com o giro de pico calculado pela potência do modelo. Tudo gerado por WebAudio, sem arquivos de áudio.
- **Garagem com quantidade**: coração para guardar, contador de unidades, subtotal por modelo e valor total da coleção. Fica salva no aparelho entre visitas.
- **Estados cuidados**: esqueleto de carregamento, aviso com acervo salvo quando a API falha, busca sem resultado, garagem vazia e rota inexistente.
- **Acessível**: foco visível no verde ácido, rótulos em todos os controles e animações desligadas quando o sistema pede menos movimento.

### Som

O som começa **desligado**. O botão "Som" na barra liga e desliga, e a preferência fica salva. Como os navegadores só liberam áudio depois de um gesto, o `AudioContext` só é criado no primeiro clique ou tecla; antes disso nada toca. No app nativo o botão não aparece, porque os efeitos são exclusivos da web.

### Ficha técnica

A API só traz nome, ano e preço. Potência, 0–100 e velocidade máxima vêm de uma tabela de referência aproximada por modelo (`src/domain/performance.ts`); quando o nome não bate, o valor é estimado pela era e a ficha avisa.

## Stack

- React Native 0.86 + Expo SDK 57 + TypeScript (strict)
- Expo Router para navegação, também exportado para web
- axios para a API, AsyncStorage para a garagem e a preferência de som
- react-native-svg para palco, reflexo, ícones e marca (tudo desenhado no projeto)
- WebAudio para os efeitos sonoros (osciladores, ruído, filtros e distorção)
- Syncopate, Chakra Petch e Manrope via `@expo-google-fonts`
- Vitest para as regras de catálogo, garagem, desempenho e síntese do motor
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
npm test
npm run build:web  # gera a pasta dist
```

O caminho base da web vem de `EXPO_BASE_URL` (padrão `/toro`, em `app.config.ts`). No deploy, o workflow usa o nome do repositório, então o Pages continua certo mesmo se o repositório for renomeado.

## Estrutura

```
src/
├── app/            # rotas do Expo Router (acervo, ficha, garagem, 404)
├── screens/        # composição de cada tela
├── components/     # ui, carro, acervo, ficha, garagem, moldura e arte em SVG
├── domain/         # regras puras: catálogo, filtros, ordenação, garagem, desempenho
├── sound/          # síntese WebAudio, parâmetros do ronco e contexto de som
├── hooks/          # dados da API, garagem, layout, entrada, tilt, contagem, menos movimento
├── services/api.ts # cliente axios
└── theme/          # cores, fontes, curvas de animação e estilos globais da web
```

<sub>Toro é uma marca fictícia com identidade própria. Dados e fotos dos carros vêm da API pública de exemplo do desafio "Como consumir API em apps React Native" da trilha React Native da DIO.</sub>
