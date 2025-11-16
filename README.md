<div align="center">
  <img src="assets/images/if-logo-colorida.png" alt="Logo da Instituição" width="450"/>
  <h3>Instituto Federal de Educação, Ciência e Tecnologia do Triângulo Mineiro - Campus Ituiutaba</h3>
  <p><em>Gradução em Tecnólogia em <u>Análise e Desenvolvimento de Sistemas</u></em></p>
  <p>Programação para Dispositivos Móveis</p>
</div>

# 🔴 Pokédex Mobile - IFTM

![Expo](https://img.shields.io/badge/Expo-000.svg?style=for-the-badge&logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 📱 Sobre o Projeto

A **Pokédex Mobile** é um aplicativo desenvolvido como trabalho prático da disciplina de **Programação para Dispositivos Móveis** no IFTM. O app permite que os usuários:

- 🔍 Pesquisar um Pokémon por nome
- 🏷️ Filtrar um Pokémon por um ou mais tipos
- 📊 Visualizem informações detalhadas de cada Pokémon
- 🎨 Interagir com a interface moderna com tema claro ou escuro
- ⚡ Experimentem animações suaves e responsivas

## 📥 Download

### ⬇️ Baixar APK Pronto

Clique no botão abaixo para baixar o APK compilado e instalar diretamente no seu Android:

[![Download APK](https://img.shields.io/badge/Download-APK-green?style=for-the-badge&logo=android)](https://expo.dev/accounts/perera2k4/projects/IFTM_DM-pokedex/builds/7599984c-76a6-4901-b1b3-0ed53041bedf)

**Ou acesse diretamente:**
```
https://expo.dev/accounts/perera2k4/projects/IFTM_DM-pokedex/builds/7599984c-76a6-4901-b1b3-0ed53041bedf
```

### 📋 Requisitos para Instalação
- Android 6.0 ou superior
- Espaço livre: ~90 MB
- Permissão para instalar apps de fontes desconhecidas

### 🔧 Como Instalar

1. **Baixe o APK** usando o link acima
2. **Permita instalação** de fontes desconhecidas nas configurações do Android
3. **Abra o arquivo** `.apk` baixado
4. **Clique em "Instalar"**
5. **Pronto!** O app está pronto para usar

## 🚀 Como Começar (Desenvolvimento)

### Pré-requisitos

- Node.js 16+ instalado
- npm ou yarn
- Expo CLI instalado globalmente
- Expo Go (para testar no celular)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/perera2k4/IFTM_DM-pokedex.git

# Navegue até o diretório
cd IFTM_DM-pokedex

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npx expo start --tunnel

# Escaneie o QR Code com o Expo Go para testar no celular
```

### Usando Expo Go

1. Baixe o app **Expo Go** na Play Store ou App Store
2. Escaneie o QR Code que aparecerá no terminal
3. O app será carregado no seu dispositivo em tempo real

## 🛠️ Tecnologias Utilizadas

```json
{
  "Frontend": [
    "React Native 0.81.5",
    "Expo ~54.0.23",
    "React 19.1.0",
    "TypeScript"
  ],
  "Navegação": [
    "Expo Router ~6.0.14",
    "React Navigation ~7.1.8"
  ],
  "Animações": [
    "React Native Reanimated ~4.1.1",
    "React Native Gesture Handler ~2.28.0"
  ],
  "UI": [
    "Expo Image ~3.0.10",
    "Expo Symbols ~1.0.7",
    "@expo/vector-icons ^15.0.3"
  ],
  "API": [
    "PokéAPI (REST)"
  ]
}
```

## 📦 Estrutura do Projeto

```
IFTM_DM-pokedex/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # 🏠 Home
│   │   ├── explore.tsx        # 🔍 Explorador
│   │   ├── about.tsx          # ℹ️ About
│   │   └── _layout.tsx        # Layout das tabs
│   ├── pokemon/
│   │   └── [name].tsx         # 📋 Detalhes do Pokémon
│   └── _layout.tsx            # Layout raiz
├── components/
│   ├── parallax-scroll-view.tsx    # Header paralaxe
│   ├── pokemon-card.tsx            # Card do Pokémon
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
├── services/
│   └── pokemon-api.ts         # Serviço da PokéAPI
├── types/
│   └── pokemon.ts             # Tipos TypeScript
├── constants/
│   └── theme.ts               # Temas
└── assets/
    ├── images/
    └── videos/
```

## 🎮 Como Usar

### 1️⃣ Explorar Pokémon
- Abra a aba **Explore**
- Role para ver mais Pokémon
- Clique em qualquer card para ver detalhes

### 2️⃣ Buscar por Nome
- Clique na **lupa** 🔍 no canto superior direito
- Digite o nome do Pokémon
- A lista será filtrada em tempo real

### 3️⃣ Filtrar por Tipo
- Selecione um ou mais tipos na barra de chips
- Combine múltiplos tipos para resultados específicos
- Clique em **"Limpar Filtros"** para resetar

### 4️⃣ Ver Detalhes
- Clique em qualquer Pokémon
- Veja todas as informações: tipos, stats, habilidades
- Use o botão de **voltar** ← para retornar

## 📊 API Utilizada

### PokéAPI v2
- **Base URL**: `https://pokeapi.co/api/v2/`
- **Endpoints**:
  - `/pokemon` - Lista de Pokémon
  - `/pokemon/{id}` - Detalhes do Pokémon
  - `/type/{type}` - Pokémon por tipo

## 👨‍💻 Desenvolvedor

**Bruno Pereira** - [@perera2k4](https://github.com/perera2k4)

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
