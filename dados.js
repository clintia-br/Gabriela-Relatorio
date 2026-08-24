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
     · "Relatório de palavras-chave da rede de pesquisa" — Google Ads —
       25/07/2026 a 23/08/2026

   O recorte 25/07–16/08 usado na tabela de ritmo não foi exportado: vem da
   subtração do período de 7 dias do período de 30 dias (mesma campanha, mesma
   conta, um intervalo contido no outro).

   O export de palavras-chave confirma os totais do export de campanha —
   2.843 impressões, 185 cliques, R$ 1.089,96 e 1 conversão fecham exatamente.
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
      nota: 'Fonte: "Relatório de campanha" exportado do Google Ads, 25/07 a 23/08 de 2026. Status: Ativada · Qualificado (limitado), motivo "limitado pelo orçamento" · orçamento diário de R$ 55,00 · pontuação de otimização de 65,78%. O número de cliques (185) não vem no export de campanha; veio do export de palavras-chave, que fecha com os mesmos totais. O recorte 25/07–16/08 da tabela de ritmo foi obtido subtraindo o export de 17/08–23/08 deste período.'
    },

    palavras: {
      sub: '16 palavras-chave no grupo de anúncios · todas em correspondência de frase · 25/07 a 23/08 de 2026.',
      alertas: [{
        tipo: 'red', icone: '⏸️',
        titulo: '"apoio emocional online" está pausada — e era 31,5% da verba',
        texto: 'Essa palavra-chave trouxe 73 dos 185 cliques do período (39,5%) com o menor CPC de todos, R$ 4,70 — cerca de 30% mais barato que a média de R$ 5,89. Está pausada. É a candidata mais provável para a queda de entrega a partir de 17/08, mas o export não traz a data em que foi pausada: confirme no histórico de alterações da conta antes de concluir. Se a pausa não foi intencional, reativar é a ação de maior impacto do período.'
      }],
      kpis: [
        { label: 'Palavras-chave', valor: '16',     nota: '5 com veiculação · 3 pausadas',      badge: { tipo: 'dn',  texto: '11 sem nenhum clique' } },
        { label: 'Cliques',        valor: '185',    nota: 'CTR de 6,51% · CPC R$ 5,89',         badge: { tipo: 'neu', texto: '2.843 impressões' } },
        { label: 'Taxa de conv.',  valor: '0,54%',  nota: '1 conversão em 185 cliques',         badge: { tipo: 'bad', texto: '1 única palavra converteu' } }
      ],
      itens: [
        { termo: 'psicólogo particular são paulo',         estado: 'Ativado', motivo: '',                          impressoes: 1513, cliques: 69, custo: 465.68, conversoes: 1 },
        { termo: 'apoio emocional online',                 estado: 'Pausado', motivo: 'pausado',                   impressoes:  642, cliques: 73, custo: 343.14, conversoes: 0 },
        { termo: 'Consultório de Psicologia em São Paulo', estado: 'Ativado', motivo: '',                          impressoes:  580, cliques: 36, custo: 237.44, conversoes: 0 },
        { termo: 'psicanalise online',                     estado: 'Ativado', motivo: '',                          impressoes:   47, cliques:  6, custo:  37.65, conversoes: 0 },
        { termo: 'psicanalista online particular',         estado: 'Ativado', motivo: '',                          impressoes:   23, cliques:  1, custo:   6.05, conversoes: 0 },
        { termo: 'psicanalista para mulheres',             estado: 'Ativado', motivo: '',                          impressoes:   29, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'consulta psicanalista online',           estado: 'Ativado', motivo: '',                          impressoes:    5, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'psicólogo para crise de ansiedade',      estado: 'Ativado', motivo: '',                          impressoes:    4, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'psicólogo para ansiedade',               estado: 'Ativado', motivo: '',                          impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'escuta profissional',                    estado: 'Ativado', motivo: '',                          impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'Psicóloga online em São Paulo',          estado: 'Ativado', motivo: 'raramente exibido',         impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'terapia para universitária',             estado: 'Ativado', motivo: 'raramente exibido',         impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'terapia para ansiedade particular',      estado: 'Ativado', motivo: 'raramente exibido',         impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'analise psicologica são paulo',          estado: 'Ativado', motivo: 'raramente exibido',         impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'acompanhamento emocional são paulo',     estado: 'Pausado', motivo: 'pausado; raramente exibido', impressoes:   0, cliques:  0, custo:   0.00, conversoes: 0 },
        { termo: 'autoconhecimento mulheres',              estado: 'Pausado', motivo: 'pausado',                   impressoes:    0, cliques:  0, custo:   0.00, conversoes: 0 }
      ],
      insights: [
        { icone: '🎯', titulo: 'Uma única palavra-chave sustenta a conversão do período',
          texto: '"psicólogo particular são paulo" levou R$ 465,68 (42,7% da verba), 69 cliques e a única conversão, a uma taxa de 1,45%. É a palavra com intenção mais comercial do grupo — quem busca "particular" já sabe que vai pagar. É por onde começar a reconstruir a campanha.' },
        { icone: '🔥', titulo: 'R$ 624,28 em cliques que não converteram',
          texto: '57,3% da verba foi para quatro palavras que somaram 116 cliques e nenhuma conversão. A mais cara delas, "Consultório de Psicologia em São Paulo" (R$ 237,44, 36 cliques), sugere busca por consultório presencial — desalinhada de uma oferta de psicoterapia online.' },
        { icone: '🔍', titulo: '11 das 16 palavras-chave não geraram um clique sequer',
          texto: '8 nem chegaram a ter impressão. Entre elas está "Psicóloga online em São Paulo", marcada como "raramente exibido" — um termo central para a oferta que nunca apareceu. Com tudo em correspondência de frase, o alcance está estreito demais.' },
        { icone: '💸', titulo: 'O CPC de R$ 5,89 é alto para o volume de conversão atual',
          texto: 'A R$ 5,89 por clique e 0,54% de taxa de conversão, cada lead custa cerca de R$ 1.090. Ou o CPC cai, ou a página precisa converter melhor — 185 cliques ainda é pouco para separar as duas causas, o que reforça a urgência de recuperar volume.' }
      ],
      nota: 'Fonte: "Relatório de palavras-chave da rede de pesquisa" exportado do Google Ads, 25/07 a 23/08 de 2026. Todas em correspondência de frase. Impressões, cliques, custo e conversões são os do arquivo; CTR, CPC e custo por conversão são calculados a partir deles. O status "Raramente exibido" corresponde ao motivo "raramente exibido" do export, em palavras-chave ativas sem qualificação para exibir.'
    }
  }

  ]
};
