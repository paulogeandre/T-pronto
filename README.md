# TáPronto

Protótipo navegável de alta fidelidade para a disciplina Design Profissional. Grupo: Paulo Geandre, Fellipe Augusto e Rennan Jackowski.

## Teste o site

**Link para visualização: https://paulogeandre.github.io/T-pronto/**

Não precisa instalar nada. Os dados são de exemplo e ficam só no navegador.

## Documentação do projeto

- [Logotipo TáPronto em SVG](docs/identidade-visual/logo-tapronto.svg).
- [Equipe e responsabilidades](docs/equipe.md).
- [Requisitos e protótipos UI/UX em PDF](docs/uiux/TaPronto_Prototipo_UIUX.pdf).
- [Identidade visual, persona e jornada](docs/identidade-visual/design-uiux.md).
- [Pesquisa de campo](docs/pesquisa/pesquisa-de-campo.md): três entrevistas presenciais de 17/10/2026, metodologia, relatos, matriz de dores e requisitos propostos.
- [Wireframes de baixa fidelidade](baixa-fidelidade/index.html): pedidos, estoque e dashboard, com imagens PNG e fontes SVG na mesma pasta.

## Estado atual

Concluído:

- Pesquisa de campo documentada.
- Equipe e responsabilidades definidas.
- Persona, jornada, logotipo, guia de estilo e telas de UI/UX.
- Protótipo navegável com tema escuro e o logotipo da empresa, com painel de pedidos, estoque e dashboard.
- Regras de negócio testadas por script (`verify.cjs`).

Por decisão do grupo e orientação do professor, o projeto não terá back-end, API nem banco de dados. A entrega é o protótipo funcional rodando no navegador.

Repositório do projeto: [paulogeandre/T-pronto](https://github.com/paulogeandre/T-pronto).

## O que ainda falta

- Ativar o GitHub Pages para o link de teste funcionar.
- Relatório final em PDF, com as seções exigidas no enunciado.
- Preparar o pitch e a demonstração ao vivo.
- Testar o protótipo uma última vez antes da apresentação (17/11).

## Abrir

Abra `dist/index.html` em um navegador. Não é necessário instalar dependências. A fonte externa é opcional; sem internet, o navegador usa a fonte local.

## Demonstrar

1. No painel, observe os exemplos em quatro etapas, incluindo cartões em atenção e atrasados.
2. Use **Pedido de teste** para inserir um pedido fictício. Os canais se alternam.
3. Clique em **Iniciar preparo** e consulte **Estoque** para observar a baixa conforme a ficha técnica.
4. Volte ao painel e avance até **Expedido**. O tempo da etapa reinicia; o tempo total permanece registrado.
5. Consulte **Dashboard** para ver os indicadores diários.
6. Use **Restaurar demonstração** para recomeçar. Essa ação exige confirmação.

## Regras implementadas no protótipo

- Etapas sequenciais, sem saltos.
- Limites de 2, 15 e 5 minutos. Atenção a partir de 80%; atraso acima de 100%.
- Atualização visual a cada 3 segundos.
- Identificação única por plataforma e número de pedido.
- Baixa única ao iniciar preparo, usando a quantidade de pratos e a ficha técnica.
- Alerta quando o saldo é igual ou inferior ao mínimo.
- Bloqueio do início do preparo se não houver ingredientes suficientes. Esta é uma decisão do grupo para o protótipo.
- Indicadores por dia local do navegador; média baseada em pedidos expedidos no dia.
- Persistência local no navegador, quando disponível. Não há sincronização entre dispositivos ou abas.

## Limites desta entrega

Esta entrega é um protótipo de interface. Os pedidos e canais são simulados, não há integração oficial com iFood, Rappi ou 99Food, e não existem servidor, API, autenticação ou banco de dados. Os dados ficam apenas no navegador.

## Verificação

O arquivo `verify.cjs` testa as regras de duplicidade por plataforma, fluxo sequencial, baixa única, limites de tempo, estoque insuficiente e indicadores. Execute com Node.js: `node verify.cjs`.
