# TáPronto

Painel de gestão para dark kitchens. Reúne os pedidos de iFood, Rappi e 99Food em uma tela, mostra o tempo de cada etapa e desconta os ingredientes do estoque.

Projeto Integrador de Design Profissional (Universidade Positivo).
Grupo: Paulo Geandre, Fellipe Augusto e Rennan Jackowski.

**Site para teste:** https://paulogeandre.github.io/T-pronto/

## Como funciona

O pedido passa por quatro etapas, nesta ordem: Novo, Em preparo, Pronto e Expedido. Não dá para pular etapa.

- Cada etapa tem um limite de tempo: Novo 2 min, Em preparo 15 min, Pronto 5 min. O cartão fica amarelo a partir de 80% do limite e vermelho depois de 100%.
- Ao iniciar o preparo, o sistema desconta do estoque os ingredientes da ficha técnica do prato. O desconto acontece uma vez só. Se faltar ingrediente, o preparo não começa.
- Quando um ingrediente chega ao saldo mínimo, aparece um alerta na tela de Estoque.
- O mesmo número de pedido na mesma plataforma não é aceito duas vezes.
- O Dashboard mostra os pedidos do dia por canal, o tempo médio até a expedição e os pedidos atrasados.

Os pedidos são simulados com o botão **Pedido de teste**. Não há integração com os apps de delivery, servidor, API nem banco de dados. Os dados ficam no navegador.

## Como usar

1. Abra o site ou o arquivo `dist/index.html` em um navegador. Não precisa instalar nada.
2. Clique em **Pedido de teste** para criar um pedido.
3. Clique em **Iniciar preparo** e veja o desconto na tela **Estoque**.
4. Avance o pedido até **Expedido**.
5. Veja os números em **Dashboard**.
6. **Restaurar demonstração** volta ao estado inicial.

Para rodar as regras de negócio como teste automático, use Node.js:

```bash
node verify.cjs
```

## Pastas

- `dist/`: o sistema (HTML, CSS e JavaScript).
- `baixa-fidelidade/`: wireframes.
- `docs/`: pesquisa de campo, identidade visual, UI/UX, equipe e [relatório final em PDF](docs/relatorio/Relatorio_Final_TaPronto.pdf).
