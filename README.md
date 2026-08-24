# Relatório de Performance

Relatório mensal de mídia paga (Google Ads + Meta Ads) em página única, no mesmo
formato de [alpha-relatorio.vercel.app](https://alpha-relatorio.vercel.app/).

Site estático, sem build e sem dependências. Abrir o `index.html` no navegador
já funciona.

## Arquivos

| Arquivo      | O que é                                                        |
|--------------|----------------------------------------------------------------|
| `index.html` | Estrutura da página e todo o CSS (design system, tema escuro).  |
| `dados.js`   | **Os dados.** É o único arquivo que muda a cada mês.            |
| `app.js`     | Monta a página a partir de `dados.js`. Não precisa ser editado. |

## Estrutura

Um seletor de períodos no topo troca entre os relatórios (fica escondido
enquanto houver só um). Cada período tem até quatro abas:

- **Visão Geral** — KPIs consolidados, ritmo diário, comparativo entre
  plataformas, distribuição de verba e resultados, e os destaques do mês
- **Google Ads** — KPIs, tabela de campanhas e gráficos de investimento e leads
- **Meta Ads** — KPIs, tabela de campanhas e gráficos de investimento e conversas
- **Todas as Campanhas** — as duas tabelas completas, lado a lado

Abas sem dado não são renderizadas: um período só com Google não mostra a aba de
Meta Ads, nem o comparativo entre plataformas nem a distribuição — que seriam
100%/0% e não diriam nada. Os gráficos de barra só aparecem a partir de duas
campanhas.

## O que é calculado e o que é escrito

Isso é o que diferencia esta versão do relatório original, em que tudo era
digitado à mão.

**Calculado a partir das campanhas** (não digite, não pode divergir):

- totais de investimento, leads/conversas, CPL/CPR, CTR, cliques, impressões e
  alcance
- larguras das barras dos gráficos e a ordenação decrescente
- percentuais de distribuição entre Google e Meta
- a tabela "Comparativo por Plataforma" inteira

**Escrito por você** (é conteúdo editorial):

- os KPIs — valor de destaque, nota e selo — porque vêm arredondados e com
  comparativo contra o mês anterior
- alertas, insights e notas técnicas

## Como publicar um mês novo

Abra `dados.js` e acrescente um objeto no **início** do array `meses` (o mais
recente vem primeiro). O molde mínimo:

```js
{
  id: 'setembro',                              // sem acento e sem espaço
  rotulo: 'Setembro 2026',                     // texto do botão do seletor
  periodo: 'Setembro 2026 · 01/09 – 30/09',    // selo no canto do cabeçalho

  geral: {
    eyebrow: 'Consolidado · Setembro 2026',
    sub: 'Google Ads + Meta Ads · 25 campanhas ativas no período.',
    kpis: [
      { label: 'Investimento Total',    valor: 'R$ 00.000', pequeno: true, nota: 'Google + Meta Ads',        badge: { tipo: 'up', texto: '↑ +0,0% vs Agosto' } },
      { label: 'Total de Resultados',   valor: '0.000',                    nota: 'Leads + Conversas',        badge: { tipo: 'up', texto: '↑ +0,0% vs Agosto' } },
      { label: 'CPL / CPR Consolidado', valor: 'R$ 0,00',                  nota: 'Custo médio por resultado', badge: { tipo: 'neu', texto: '+0,0% vs Agosto' } }
    ],
    insights: [
      { icone: '✅', titulo: 'Título do destaque', texto: 'Uma ou duas frases.' }
    ]
  },

  google: {
    sub: '17 campanhas ativas.',
    kpis: [ /* três KPIs, mesmo formato */ ],
    campanhas: [
      { nome: '[Cliente] [Campanha]', invest: 1000.00, leads: 100, ctr: 10.00, impressoes: 5000 }
    ]
  },

  meta: {
    sub: '8 campanhas ativas.',
    kpis: [ /* três KPIs */ ],
    campanhas: [
      { nome: '[Cliente][WPP] Campanha', invest: 500.00, conversas: 200, impressoes: 50000, alcance: 20000 }
    ]
  },

  todas: { sub: '25 campanhas com veiculação no período.' }
}
```

### Campos de campanha

Google — `nome` e `invest` e `leads` são obrigatórios; `ctr`, `cliques` e
`impressoes` são opcionais (a coluna só aparece se ao menos uma campanha tiver o
dado). `marca: '*'` marca a campanha com asterisco, para amarrar a uma nota
técnica.

Meta — `nome`, `invest` e `conversas` são obrigatórios; `impressoes` e `alcance`
são opcionais.

Use **ponto** como separador decimal (`1723.80`), não vírgula. A formatação
pt-BR é aplicada na hora de exibir.

Campanha com zero conversões mostra `—` no CPL/CPR, em vez de `R$ 0,00` — que
seria uma divisão por zero disfarçada de bom resultado.

### Blocos opcionais

Todos podem ser omitidos:

- `geral.alertas` / `google.alertas` / `meta.alertas` — faixa colorida no topo
  da aba. `{ tipo: 'amber' | 'red' | 'green', icone: '📅', titulo, texto }`
- `geral.mom` — faixa de quatro células comparando com o mês anterior
- `geral.ritmoDiario` — tabela de ritmo com colunas livres, útil para comparar
  sub-períodos ou meses de tamanhos diferentes. A primeira coluna é o rótulo do
  período; as demais vão alinhadas à direita:

  ```js
  ritmoDiario: {
    titulo: 'Ritmo diário', chip: 'Google Ads',
    colunas: ['Período', 'Dias', 'Invest./dia', 'Impr./dia', 'CTR'],
    linhas: [
      { celulas: ['25/07 – 16/08', '23', 'R$ 46,58', '119,6', '6,62%'] },
      { celulas: ['17/08 – 23/08', '7', 'R$ 2,67', '13,1', '3,26%'], aviso: 'texto do ⚠' }
    ],
    total: { celulas: ['Período completo', '30', 'R$ 36,33', '94,8', '6,51%'] }
  }
  ```
- `geral.avisoGoogle` / `geral.avisoMeta` — texto do ⚠ ao lado da plataforma no
  comparativo
- `google.nota` / `meta.nota` — nota técnica no rodapé do card
- `badge.tipo` — `up` (verde), `dn` (âmbar), `bad` (vermelho), `neu` (cinza)

### Trocar de cliente

Altere `RELATORIO.cliente` no topo de `dados.js`. O nome aparece no cabeçalho e
no título da aba do navegador.

Os rótulos dos gráficos de barra encurtam os nomes das campanhas removendo os
prefixos de nomenclatura da conta. Se o seu cliente usa outros prefixos, ajuste
a lista `PREFIXOS` no topo de `app.js`.

## Publicar

Site estático — qualquer host serve. Na Vercel, basta apontar para o
repositório: sem framework, sem build, sem configuração.
