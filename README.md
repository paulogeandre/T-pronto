# TáPronto

**Sistema integrado de gestão para dark kitchens**: um painel único que reúne pedidos de vários apps de delivery, controla o tempo de cada etapa e dá baixa automática nos ingredientes.

Projeto Integrador da disciplina **Design Profissional** (Universidade Positivo), orientado pelo Prof. Me. Sedenilso Antonio Machado. Segmento escolhido: *Sistema Integrado de Gestão para Cozinhas Sob Demanda (Dark Kitchens)*.

## Demonstração online

**Acesse o protótipo funcional: https://paulogeandre.github.io/T-pronto/**

Não é preciso instalar nada nem criar conta. Os dados são de exemplo e ficam apenas no navegador de quem acessa.

> Se o link ainda não abrir, o GitHub Pages precisa estar ativado em *Settings → Pages → Source: GitHub Actions*.

## Equipe

| Integrante | Função | Responsabilidades |
| --- | --- | --- |
| Paulo Geandre | Analista de Requisitos e Gestor do Projeto | Pesquisa, requisitos, cronograma, documentação |
| Fellipe Augusto | Designer UI/UX e Desenvolvedor Front-end | Identidade visual, persona, jornada, protótipos, interfaces |
| Rennan Jackowski | Desenvolvedor Back-end e Responsável por Dados | Regras de negócio, pedidos, estoque, banco de dados, instruções de execução |

Detalhes em [docs/equipe.md](docs/equipe.md).

## Andamento do projeto

| Fase | Entrega | Situação |
| --- | --- | --- |
| 1. Pesquisa de campo | 3 entrevistas presenciais (17/10/2026) | Concluída: [pesquisa](docs/pesquisa/pesquisa-de-campo.md) |
| 2. UI/UX | Logo, guia de estilo, persona, jornada, baixa e alta fidelidade | Concluída: [design](docs/identidade-visual/design-uiux.md), [PDF](docs/uiux/TaPronto_Prototipo_UIUX.pdf), [wireframes](baixa-fidelidade/index.html) |
| 3. MVP | Fluxo principal funcionando (front-end com regras de negócio) | Em andamento |
| 4. Engenharia | Back-end e execução local (banco de dados fora do escopo por orientação do professor) | Pendente |

## Funcionalidades já implementadas

- Painel de pedidos em quatro etapas: **Novo → Em preparo → Pronto → Expedido**.
- Filtro por canal (iFood, Rappi, 99Food) e botão para gerar pedido de teste.
- Cronômetro por etapa, com alerta de atenção (80% do limite) e atraso (acima de 100%).
- Controle de estoque com baixa automática pela ficha técnica e alerta de saldo mínimo.
- Dashboard diário: pedidos por canal, tempo médio até a expedição e pedidos atrasados.
- Persistência no navegador e botão para restaurar a demonstração.
- Testes automatizados das regras de negócio (`verify.cjs`).

### Regras de negócio

- Etapas sequenciais, sem saltos.
- Limites por etapa: Novo 2 min, Em preparo 15 min, Pronto 5 min.
- Atualização visual a cada 3 segundos.
- Pedido único por plataforma e número (evita duplicidade).
- Baixa de ingredientes uma única vez, ao iniciar o preparo.
- Início do preparo bloqueado se faltar ingrediente (decisão do grupo para o protótipo).

## Como executar localmente

Requisitos: nenhum para abrir o protótipo; [Node.js](https://nodejs.org) 18 ou superior para testes e servidor local.

```bash
git clone https://github.com/paulogeandre/T-pronto.git
cd T-pronto
```

Opção 1: abrir `dist/index.html` direto no navegador.

Opção 2: servidor local em http://127.0.0.1:4175

```bash
node preview.cjs
```

Rodar os testes das regras:

```bash
node verify.cjs
```

## Estrutura do repositório

```
dist/              Protótipo funcional (HTML, CSS e JavaScript puros)
baixa-fidelidade/  Wireframes (PNG e SVG)
docs/              Pesquisa, identidade visual, UI/UX e equipe
verify.cjs         Testes das regras de negócio
preview.cjs        Servidor local de apoio
```

**Tecnologias atuais:** HTML5, CSS3, JavaScript (sem frameworks) e Node.js para testes. Dados persistidos em `localStorage`.

## O que falta fazer

- [ ] Back-end com endpoints HTTP, incluindo `POST /webhook/<plataforma>` para receber pedidos.
- [ ] Simulador de pedidos de plataformas (script que envia pedidos ao webhook).
- [ ] Conectar o front-end à API.
- [ ] Teste de usabilidade do fluxo principal com usuários.
- [ ] Diagrama de arquitetura e guia de execução completo do back-end.
- [ ] Relatório final em PDF, com as seções exigidas no enunciado (entrega em 17/11).
- [ ] Preparar o pitch e a demonstração ao vivo.

## Limites atuais

Os pedidos e canais são simulados. Não há integração oficial com iFood, Rappi ou 99Food, nem servidor ou autenticação. Por orientação do professor, o banco de dados ficou fora do escopo desta etapa. A pesquisa tem amostra pequena e exploratória, e não deve ser lida como resultado estatístico do mercado.
