# 🌿 Agrinho 2026 — Agro Forte, Futuro Sustentável

> **"Duas trilhas. Um único futuro para o campo."**

---

## 👤 Autor

| Campo | Informação |
|---|---|
| **Nome** | Izaque Closs Scheid da Silva |
| **Turma** | 1.º Ano C |
| **Escola** | Colégio Estadual Cívico Militar Frentino Sackser |
| **Cidade** | Marechal Cândido Rondon — PR |
| **Concurso** | Agrinho 2026 |
| **Categoria** | Programação Front-End (HTML, CSS e JavaScript) |

---

## 🎯 Objetivo do Tema Agrinho

O tema oficial do Agrinho 2026 é **"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"**.

Este projeto responde a esse tema apresentando dois modelos de cultivo agrícola de forma interativa e comparativa, para que estudantes, professores e visitantes entendam que o campo brasileiro é formado por duas forças complementares:

- 🌾 **Cultivo Tradicional** — saberes ancestrais passados entre gerações, manejo manual, relação direta com a terra, sementes crioulas, rotação de culturas e práticas agroecológicas que preservam o solo e a biodiversidade.
- 🛰️ **Cultivo Tecnológico** — sensores de solo, drones, GPS de precisão, agricultura de precisão e modelos de dados que orientam cada decisão na lavoura para produzir mais gastando menos água, energia e insumos.

O site defende que **nenhum dos dois caminhos é superior ao outro**: o futuro sustentável do campo está no equilíbrio entre o conhecimento acumulado e a inovação tecnológica.

---

## 🗂️ Estrutura de Arquivos

```
agrinho2026/
│
├── index.html                    → Estrutura HTML semântica do site
├── README.md                     → Documentação do projeto (este arquivo)
│
├── css/
│   └── style.css                 → Estilos: variáveis, layout, animações, acessibilidade
│
├── js/
│   └── script.js                 → JavaScript: interatividade, jogo, matrix rain, acessibilidade
│
└── img/
    ├── cultivo-tradicional.svg   → Ilustração animada: roça ao amanhecer (sol, plantas, enxada)
    ├── cultivo-tecnologico.svg   → Ilustração animada: lavoura de precisão (drone, sensores, dados)
    └── favicon.svg               → Ícone da aba do navegador
```

> ⚠️ Manter a estrutura de pastas intacta. Abrir o `index.html` diretamente no navegador — não requer servidor.

---

## 🚀 Instruções de Uso

### Abrir localmente
1. Baixe todos os arquivos mantendo a estrutura de pastas acima
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Firefox, Edge ou Safari)
3. Não é necessário servidor web, instalação de programas ou conexão com internet*

> *A conexão com internet é usada apenas para carregar as fontes tipográficas do Google Fonts (JetBrains Mono e Source Serif 4). O site funciona normalmente sem elas, usando fontes do sistema como fallback.

### Navegação no site
1. Use o **menu superior** para navegar entre as seções ou role o mouse
2. **Ilustrações animadas:** passe o mouse ou clique para ativar as animações SVG
3. **Jogo:** acesse a seção "Jogo" e tome decisões em 3 fases para ver sua pontuação de sustentabilidade
4. **Acessibilidade:** clique no botão ♿ (canto inferior direito) para ajustar tamanho de fonte, contraste e animações

---

## 📑 Seções do Site

| # | Seção | Conteúdo |
|---|-------|----------|
| 01 | **Agrinho** | O que é o programa, linha do tempo e proposta do projeto |
| 02 | **Justificativa** | Por que apresentar as duas formas de cultivo juntas |
| 03 | **Objetivos** | Seis objetivos gerais e específicos do site |
| 04 | **Cultivo** | Comparação Tradicional × Tecnológico com fundamentação teórica e estatísticas |
| 05 | **Jogo** | "Missão Fazenda Sustentável" — jogo de decisões em 3 fases com pontuação |
| 06 | **Referências** | Fontes institucionais: Embrapa, MAPA, ANEEL, FAO, Agrinho |
| 07 | **Contato** | Formulário de contato |

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Como foi usada |
|------------|----------------|
| **HTML5 semântico** | Estrutura com tags `<section>`, `<main>`, `<nav>`, `<footer>`, `<figure>`, `<button>`, `<form>`, `<input>`, `<label>` |
| **CSS3 puro** | Grid, Flexbox, Custom Properties (variáveis), Media Queries, `@keyframes`, `animation`, `transition`, `clip-path` |
| **JavaScript puro (ES6+)** | Manipulação do DOM, eventos, `localStorage`, `IntersectionObserver`, `Canvas API`, `requestAnimationFrame` |
| **SVG + SMIL** | Ilustrações vetoriais animadas (`<animate>`, `<animateTransform>`) sem dependências externas |

**Nenhum framework, biblioteca ou dependência JavaScript externa foi utilizada.**

---

## 🎨 Sobre as Mídias e Elementos Visuais

### Ilustrações SVG
As duas ilustrações animadas (Cultivo Tradicional e Cultivo Tecnológico) foram **desenhadas manualmente em código SVG pelo autor**, utilizando:
- **Ferramenta:** Editor de texto (código SVG escrito à mão)
- **Técnica:** Formas geométricas primitivas (`<circle>`, `<rect>`, `<path>`, `<polygon>`, `<line>`) combinadas com animações SMIL nativas do SVG
- Nenhuma imagem externa foi utilizada

### Favicon
- Criado manualmente em SVG pelo autor (`img/favicon.svg`)
- Representa o tema do projeto: campo verde com sol e plantas

### Chuva de Código Matrix
- Gerada em tempo real via **Canvas API** com JavaScript puro
- Caracteres: apenas `0` e `1` (binário), temática tecnológica
- Animação controlada por `requestAnimationFrame`

### Conteúdo Textual
- Todo o conteúdo textual do site foi escrito pelo autor
- As fundamentações teóricas foram baseadas nas referências listadas abaixo
- Alguns textos foram refinados com auxílio de IA (Notebooklm) — **prompt utilizado:** *"Expanda este texto sobre [tema] com base em fontes como Embrapa, MAPA e FAO, mantendo linguagem acessível para estudantes do ensino médio"*

---

### Acessibilidade (botão ♿)
- Tamanho do texto ajustável (4 níveis via classes no `<html>`)
- Alto contraste (fundo preto, texto branco)
- Fonte facilitada para leitura
- Redução de animações
- Destaque de foco para navegação por teclado
- Preferências salvas em `localStorage`

---

## 📚 Referências

- **Embrapa** — Agricultura de Precisão: sensoriamento remoto e geotecnologias. Disponível em: [embrapa.br](https://www.embrapa.br)
- **MAPA** — Ministério da Agricultura, Pecuária e Abastecimento: políticas para agricultura familiar e agroecologia. Disponível em: [gov.br/agricultura](https://www.gov.br/agricultura)
- **ANEEL** — Geração distribuída e fontes renováveis de energia em propriedades rurais. Disponível em: [aneel.gov.br](https://www.aneel.gov.br)
- **FAO** — Sustainable Agriculture: sistemas agroalimentares sustentáveis. Disponível em: [fao.org](https://www.fao.org)
- **Programa Agrinho** — Material educativo sobre agronegócio e meio ambiente. Disponível em: [agrinho.com.br](https://www.agrinho.com.br)
- **Davis, J. H. & Goldberg, R. A.** (1957). *A Concept of Agribusiness*. Harvard University Graduate School of Business Administration, Boston.

---


*Marechal Cândido Rondon — PR · Agrinho 2026*
