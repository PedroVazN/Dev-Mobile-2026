# Vizzy Sanca — Negócios Locais

MVP de uma rede mobile para conectar consumidores e estabelecimentos de São Caetano do Sul por meio de promoções, cupons, mensagens e recomendações.

![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat-square&logo=expo&logoColor=fff)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=fff)

## Perfis do aplicativo

- Consumidor
- Loja
- Administrador

## Funcionalidades

- Cadastro e seleção de perfil
- Descoberta de lojas por categoria e bairro
- Promoções e cupons
- Favoritos e recomendações
- Chat entre consumidor e estabelecimento
- Painel da loja
- Publicação de ofertas
- Painel administrativo de usuários, lojas e assinaturas
- Persistência local com AsyncStorage
- Uso de localização no dispositivo

## Tecnologias

- React Native e Expo
- TypeScript
- React Navigation
- React Native Paper
- AsyncStorage
- Expo Location

## Como executar

```bash
git clone https://github.com/PedroVazN/Dev-Mobile-2026.git
cd Dev-Mobile-2026/app1/appum
npm install
npm start
```

Abra o aplicativo no Expo Go escaneando o QR Code ou utilize:

```bash
npm run android
npm run ios
npm run web
```

## Arquitetura atual

O MVP utiliza dados simulados em `data/mockData.ts`, regras em `context/AppContext.tsx` e persistência local em `services/storage.ts`. A proposta de API futura está documentada em `docs/BACKEND.md`.

## Contexto acadêmico

Projeto desenvolvido em 2026 no curso superior de Tecnologia em Análise e Desenvolvimento de Sistemas do SENAI 1.23 — Escola SENAI Armando de Arruda Pereira.

## Autor

Desenvolvido por [Pedro Vaz Nascimento](https://github.com/PedroVazN).
