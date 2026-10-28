# TáPronto

Protótipo navegável de alta fidelidade para a disciplina Design Profissional. Grupo: Paulo Geandre, Fellipe Augusto e Rennan Jackowski.

## Documentação do projeto

- [Logotipo TáPronto em SVG](docs/identidade-visual/logo-tapronto.svg).
- [Equipe e responsabilidades](docs/equipe.md).
- [Requisitos e protótipos UI/UX em PDF](docs/uiux/TaPronto_Prototipo_UIUX.pdf).
- [Identidade visual, persona e jornada](docs/identidade-visual/design-uiux.md).
- [Pesquisa de campo](docs/pesquisa/pesquisa-de-campo.md): três entrevistas presenciais de 17/10/2026, metodologia, relatos, matriz de dores e requisitos propostos.
- [Wireframes de baixa fidelidade](baixa-fidelidade/index.html): pedidos, estoque e dashboard, com imagens PNG e fontes SVG na mesma pasta.

## Estado atual

Pesquisa documentada e protótipos locais disponíveis. Equipe e responsabilidades definidas. Persona, jornada, logotipo, guia de estilo e telas estão reunidos no documento de UI/UX. O protótipo navegável usa tema escuro e o logotipo da empresa. Back-end, banco de dados e integrações oficiais não estão implementados. A publicação no GitHub ainda não foi confirmada.

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
- Bloqueio do início do preparo se não houver ingredientes suficientes. Esta é uma decisão proposta para o protótipo, sujeita à validação do grupo.
- Indicadores por dia local do navegador; média baseada em pedidos expedidos no dia.
- Persistência local no navegador, quando disponível. Não há sincronização entre dispositivos ou abas.

## Limites desta entrega

Esta entrega é um protótipo de interface. Os pedidos e canais são simulados, não há integração oficial com iFood, Rappi ou 99Food, e não existem endpoints HTTP, servidor, autenticação, banco de dados ou `simular_pedido.py` nesta versão. A integração e a persistência do MVP ainda precisam ser implementadas. Não são resultados de entrevistas.

## Verificação

O arquivo `verify.cjs` testa as regras de duplicidade por plataforma, fluxo sequencial, baixa única, limites de tempo, estoque insuficiente e indicadores. Execute com Node.js: `node verify.cjs`.
