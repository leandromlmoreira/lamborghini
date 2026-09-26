# 🏎️ Catálogo Lamborghini — Consumo de API

Desafio de projeto **"Como Consumir API em APPs React Native na Prática"** da trilha
[Formação React Native Developer](https://web.dio.me/track/formacao-react-native-developer)
(DIO). Recriado a partir da referência do instrutor
([digitalinnovationone/trilha-react-native-expo-lamborghini-app](https://github.com/digitalinnovationone/trilha-react-native-expo-lamborghini-app)),
consumindo a mesma API fake.

## O que o projeto faz

Lista carros Lamborghini vindos de uma API real (fake, mas HTTP de verdade):

- `GET https://digitalinnovationone.github.io/fake-data-api-lamborghini/api/lamborghini.json`
- Imagem de cada carro: `.../assets/{id}.png`

Cada card mostra nome, ano, preço, e um **contador de quantidade** (+/-) com
subtotal calculado em tempo real — a melhoria sobre o projeto original, que
só exibia a lista.

## Tecnologias

- React Native + Expo (SDK 57), TypeScript
- **axios** para a chamada HTTP
- `FlatList` com `onRefresh` (puxar para atualizar)

## Como executar

```bash
npm install
npm run web      # mais rápido para testar (sem emulador)
npm run android   # ou ios, com Expo Go / emulador
```

Precisa de internet: o app busca os dados e as imagens ao vivo da API acima.

## Como testei

Rodei `npm run web`, conferi os 10 carros carregando com nome, ano, preço e
imagem corretos, cliquei duas vezes no `+` do primeiro carro e confirmei o
subtotal (2 × $450.000 = $900.000). Não testei o estado de erro (exigiria
derrubar a rede) nem rodei em dispositivo físico Android/iOS.

## Estrutura

```
src/
├── models/Car.ts         # tipo Car + helper de URL da imagem
├── services/api.ts       # chamada axios à API
└── components/CarCard.tsx
App.tsx                   # busca os dados, estados de loading/erro, FlatList
```

## O que aprendi

- **Separar a camada de dados** (`services/api.ts`) do componente visual:
  o componente só chama `fetchCars()` e não sabe que por trás tem axios.
- Estados de UI de uma chamada assíncrona: `loading`, `error` e o dado em si
  — e por que cada um precisa do seu próprio tratamento visual (spinner,
  mensagem de erro com botão de tentar de novo, lista).
- `axios.create({ baseURL })` para configurar uma instância reutilizável
  em vez de repetir a URL completa em cada chamada.
- Cuidado ao interpretar dados de API "suja" (preço vem como string
  `"$450,000"`): escrever uma função só para normalizar isso (`priceToNumber`)
  em vez de espalhar regex pelo código.
