# Design de interface do TáPronto

## Identidade visual

O logotipo utiliza uma campânula com marca de confirmação, associando a marca ao pedido pronto para expedição. O nome é apresentado em laranja e cinza-escuro, sobre placa branca quando aplicado ao tema escuro.

| Uso | Cor |
| --- | --- |
| Marca e ações principais | #EA580C |
| Nome Pronto no logotipo | #1F2937 |
| Fundo da interface | #0F1115 |
| Painéis | #171A21 |
| Cartões | #222630 |
| No prazo | #2ECC71 |
| Atenção | #F5B82E |
| Atrasado | #E5484D |

A interface usa DM Sans com alternativas Segoe UI e sans-serif; títulos podem usar Outfit com as mesmas alternativas. O logotipo preserva a família tipográfica indicada no SVG. Os estados são comunicados por texto e borda, além da cor. Os cronômetros têm números destacados. Atenção começa em 80% do tempo da etapa; atraso ocorre apenas acima do limite.

## Persona de projeto

**Marcos — responsável pela operação de uma pequena cozinha com delivery.** Perfil representativo elaborado com base nas necessidades identificadas nas entrevistas.

Suas necessidades sintetizam os relatos de 17/10/2026: centralizar pedidos dispersos (E1 e E2), acompanhar filas e atrasos (E1, E2 e E3), reduzir o controle manual de ingredientes (E1 e E2) e conferir pedidos antes da saída (E1 e E3). A pesquisa inclui operações relacionadas a delivery, sem confirmação de atuação exclusiva como dark kitchen.

Objetivos: visualizar a fila em uma tela, identificar o pedido que exige atenção e conhecer os ingredientes próximos do mínimo. Hipóteses de uso, como distância da tela e intensidade do ruído da cozinha, devem ser avaliadas nos testes de interface.

## Jornada proposta

| Etapa | Ação do usuário e do sistema | Necessidade relacionada | Resultado esperado |
| --- | --- | --- | --- |
| Receber | Visualizar o pedido em Novo, com canal e itens | E1 e E2: registros dispersos | Pedido identificado na fila |
| Iniciar preparo | Avançar para Em preparo; descontar ingredientes uma vez | E1 e E2: controle manual | Consumo previsto registrado |
| Acompanhar | Consultar cronômetro e sinalização de atenção ou atraso | E1, E2 e E3: demora e acúmulo | Prioridade visível |
| Conferir e expedir | Marcar Pronto, conferir os itens e confirmar Expedido | E1 e E3: erros de montagem | Saída registrada após conferência |
| Revisar | Consultar indicadores e alertas de estoque | Acompanhamento operacional proposto pelo grupo | Informação disponível para decisão |

Esta jornada representa o uso proposto do produto. Não é um registro de teste já realizado com participantes.

## Demonstração

Abrir `dist/index.html`, inserir um pedido de teste, iniciar o preparo, verificar a baixa em Estoque, avançar para Pronto e Expedido e consultar o Dashboard. O protótipo é local e usa dados de exemplo. Webhooks reais, back-end e banco de dados integram o desenvolvimento posterior.
