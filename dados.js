/* ============================================================================
   DADOS DO RELATÓRIO
   ----------------------------------------------------------------------------
   Este é o único arquivo que precisa ser editado a cada período.

   O que é CALCULADO automaticamente (não digite):
     · totais das tabelas (investimento, leads/conversas, CPL/CPR, CTR, cliques,
       impressões, alcance)
     · larguras das barras dos gráficos
     · percentuais de distribuição entre plataformas
     · a tabela "Comparativo por Plataforma" da Visão Geral

   O que é EDITORIAL (você escreve):
     · os KPIs (valor de destaque, nota e selo), porque costumam vir arredondados
       e com comparativo contra o período anterior
     · alertas, insights, a tabela de ritmo e as notas técnicas

   Abas sem dado não são renderizadas: um período só com Google não mostra a aba
   de Meta Ads, nem o comparativo entre plataformas.

   Ordem dos períodos: o mais recente primeiro.

   ----------------------------------------------------------------------------
   FONTES
     · "Relatório de campanha" — Google Ads — 25/07/2026 a 23/08/2026
     · "Relatório de campanha" — Google Ads — 17/08/2026 a 23/08/2026

   O recorte 25/07–16/08 usado na tabela de ritmo não foi exportado: vem da
   subtração do período de 7 dias do período de 30 dias (mesma campanha, mesma
   conta, um intervalo contido no outro).
   ========================================================================== */

const RELATORIO = {
  cliente: 'Gabriela',

  meses: [

  /* ══════════════════ 25 DE JULHO A 23 DE AGOSTO DE 2026 ═══════════════════ */
  {
    id: 'jul25-ago23',
    rotulo: '25/07 – 23/08 2026',
    periodo: '25/07 – 23/08 de 2026 · 30 dias',

    geral: {
      eyebrow: 'Consolidado · 25 de julho a 23 de agosto de 2026',
      sub: 'Google Ads · 1 campanha de Pesquisa · 30 dias.',
      alertas: [{
        tipo: 'red', icone: '🚨',
        titulo: 'A campanha praticamente parou de veicular na última semana',
        texto: 'Até 16/08 a campanha rodava a R$ 46,58 por dia, com 120 impressões diárias. De 17/08 a 23/08 caiu para R$ 2,67 por dia e 13 impressões — uma queda de 94% no investimento e de 89% na entrega, sem que o orçamento diário de R$ 55,00 tenha mudado. É o ponto que precisa ser investigado antes de qualquer ajuste de criativo ou de página.'
      }],
      kpis: [
        { label: 'Investimento', valor: 'R$ 1.089,96', pequeno: true, nota: '1 campanha · 30 dias',        badge: { tipo: 'dn',  texto: '66,1% do orçamento disponível' } },
        { label: 'Conversões',   valor: '1',                          nota: '185 cliques · 2.843 impressões', badge: { tipo: 'neu', texto: 'CTR 6,51% · CPC R$ 5,89' } },
        { label: 'Custo / Conv.', valor: 'R$ 1.089,96',               nota: 'Uma única conversão no período', badge: { tipo: 'bad', texto: 'Amostra de 1 — não é um CPL confiável' } }
      ],
      ritmoDiario: {
        titulo: 'Ritmo diário — antes e depois de 17/08',
        chip: 'Google Ads',
        colunas: ['Período', 'Dias', 'Investimento', 'Invest./dia', 'Impressões', 'Impr./dia', 'CTR', '% do orçamento'],
        linhas: [
          { celulas: ['25/07 – 16/08', '23', 'R$ 1.071,27', 'R$ 46,58', '2.751', '119,6', '6,62%', '84,7%'] },
          { celulas: ['17/08 – 23/08', '7', 'R$ 18,69', 'R$ 2,67', '92', '13,1', '3,26%', '4,9%'], aviso: 'Entrega despencou neste recorte' }
        ],
        total: { celulas: ['Período completo', '30', 'R$ 1.089,96', 'R$ 36,33', '2.843', '94,8', '6,51%', '66,1%'] }
      },
      insights: [
        { icone: '🚨', titulo: 'A queda de entrega é o problema do período',
          texto: 'Investimento por dia caiu 94% e impressões por dia caíram 89% a partir de 17/08. Com o orçamento inalterado em R$ 55,00/dia, a causa está em outro lugar: lance, concorrência no leilão, aprovação de anúncio ou alteração de segmentação. Vale checar o histórico de alterações da conta em torno de 16–17/08.' },
        { icone: '📉', titulo: 'O CTR caiu junto, de 6,62% para 3,26%',
          texto: 'A entrega não só encolheu como piorou em qualidade: o clique por impressão caiu pela metade na última semana. Quando as duas coisas caem juntas, costuma ser sinal de perda de posição no leilão, não de fadiga de criativo.' },
        { icone: '🎯', titulo: '1 conversão em 30 dias, a R$ 1.089,96',
          texto: 'Com uma única conversão não há CPL confiável — o valor é o custo total do período, não um custo médio estabilizado. Para ter leitura de custo por lead é preciso primeiro recuperar volume: 185 cliques em 30 dias ainda é pouco para avaliar a taxa de conversão da página.' },
        { icone: '⚙️', titulo: 'Status "limitado pelo orçamento" não bate com o gasto',
          texto: 'A conta marca a campanha como limitada pelo orçamento, mas ela usou 66,1% do teto no período e apenas 4,9% na última semana. Isso, com a pontuação de otimização em 65,78%, aponta para revisão de palavras-chave, lances e segmentação — não para aumento de verba.' }
      ]
    },

    google: {
      sub: '1 campanha ativa · Rede de Pesquisa · 25/07 a 23/08 de 2026.',
      kpis: [
        { label: 'Investimento', valor: 'R$ 1.089,96', pequeno: true, nota: '1 campanha de Pesquisa',        badge: { tipo: 'dn',  texto: 'R$ 36,33 / dia' } },
        { label: 'Cliques',      valor: '185',                        nota: 'CTR de 6,51% · 2.843 impressões', badge: { tipo: 'neu', texto: 'CPC R$ 5,89' } },
        { label: 'Conversões',   valor: '1',                          nota: 'Custo / conv. R$ 1.089,96',     badge: { tipo: 'bad', texto: 'Otimização 65,78%' } }
      ],
      campanhas: [
        { nome: 'Pesquisa | Psicoterapia Online | SP', invest: 1089.96, leads: 1, ctr: 6.51, cliques: 185, impressoes: 2843 }
      ],
      nota: 'Fonte: "Relatório de campanha" exportado do Google Ads, 25/07 a 23/08 de 2026. Status: Ativada · Qualificado (limitado), motivo "limitado pelo orçamento" · orçamento diário de R$ 55,00 · pontuação de otimização de 65,78%. O número de cliques (185) não vem no export e foi derivado de CTR × impressões (6,51% × 2.843); as demais métricas são as do arquivo, sem ajuste. O recorte 25/07–16/08 da tabela de ritmo foi obtido subtraindo o export de 17/08–23/08 deste período.'
    }
  }

  ]
};
