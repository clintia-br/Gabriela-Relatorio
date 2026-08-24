/* ============================================================================
   DADOS DO RELATÓRIO
   ----------------------------------------------------------------------------
   Este é o único arquivo que precisa ser editado a cada mês.

   O que é CALCULADO automaticamente (não digite):
     · totais das tabelas (investimento, leads/conversas, CPL/CPR, CTR, cliques,
       impressões, alcance)
     · larguras das barras dos gráficos
     · percentuais de distribuição entre plataformas
     · a tabela "Comparativo por Plataforma" da Visão Geral

   O que é EDITORIAL (você escreve):
     · os KPIs (valor de destaque, nota e selo), porque costumam vir arredondados
       e com comparativo contra o mês anterior
     · alertas, insights e notas técnicas

   Ordem dos meses: o mais recente primeiro.
   ========================================================================== */

const RELATORIO = {
  cliente: 'Alpha Policlínica',

  meses: [

  /* ══════════════════════════════ AGOSTO 2026 ══════════════════════════════ */
  {
    id: 'agosto',
    rotulo: 'Agosto 2026',
    periodo: 'Agosto 2026 · 01/08 – 20/08 (parcial)',

    geral: {
      eyebrow: 'Consolidado Parcial · Agosto 2026',
      sub: 'Google Ads + Meta Ads · 25 campanhas ativas · 20 dos 31 dias do mês.',
      alertas: [{
        tipo: 'amber', icone: '📅',
        titulo: 'Mês em andamento — dados de 01/08 a 20/08',
        texto: 'Os totais abaixo cobrem 20 dos 31 dias de agosto e não devem ser comparados diretamente com os totais fechados de junho e julho. Para leitura justa entre meses, use o ritmo diário.'
      }],
      kpis: [
        { label: 'Investimento Total',      valor: 'R$ 10.620', pequeno: true, nota: 'Google + Meta Ads · 20 dias', badge: { tipo: 'neu', texto: 'R$ 531,01 / dia' } },
        { label: 'Total de Resultados',     valor: '2.769',                    nota: 'Leads + Conversas',          badge: { tipo: 'neu', texto: '138,4 / dia' } },
        { label: 'CPL / CPR Consolidado',   valor: 'R$ 3,84',                  nota: 'Custo médio por resultado',  badge: { tipo: 'up',  texto: 'Melhor dos 3 meses ✓' } }
      ],
      ritmoDiario: {
        titulo: 'Ritmo Diário — comparação justa entre meses',
        chip: 'Google + Meta',
        linhas: [
          { periodo: 'Junho 2026', dias: 30, investDia: 'R$ 512,13', resultDia: '125,0', cpl: 'R$ 4,10' },
          { periodo: 'Julho 2026', dias: 31, investDia: 'R$ 389,57', resultDia: '83,5',  cpl: 'R$ 4,67', aviso: 'Ressonância pausada para reforma' }
        ],
        total: { periodo: 'Agosto 2026 (parcial)', dias: 20, investDia: 'R$ 531,01', resultDia: '138,4', cpl: 'R$ 3,84' }
      },
      avisoMeta: 'Ressonância sem veiculação no Meta',
      insights: [
        { icone: '🚨', titulo: 'Ressonância voltou no Google, mas não no Meta', texto: 'No Google já são 248 leads em agosto. No Meta, a campanha segue com R$ 0,00 investido desde julho. Em junho ela trouxe 273 conversas a R$ 3,16 — é o ponto mais acionável do mês.' },
        { icone: '✅', titulo: 'Rastreamento normalizado, como previsto',       texto: 'A Endoscopia saiu de R$ 6,36 por lead em julho para R$ 3,45 agora, com 125 leads. O ajuste de tag sinalizado no relatório de julho foi concluído.' },
        { icone: '📈', titulo: 'Melhor eficiência dos três meses',              texto: 'CPL/CPR consolidado de R$ 3,84, contra R$ 4,10 em junho e R$ 4,67 em julho. O ritmo de 138,4 resultados/dia também supera junho (125,0) e julho (83,5).' },
        { icone: '⚠️', titulo: 'Tomografia e Mamografia caras no Google',       texto: 'CPL de R$ 15,48 e R$ 13,73. Juntas consumiram R$ 1.309 (16% da verba do Google) e devolveram 88 leads (4,7%). No Meta, a Tomografia faz o oposto: 298 conversas a R$ 1,96.' }
      ]
    },

    google: {
      sub: '17 campanhas ativas · 01/08 a 20/08 · Ressonância de volta após a reforma.',
      kpis: [
        { label: 'Investimento',   valor: 'R$ 8.171', pequeno: true, nota: '17 campanhas · 20 dias',  badge: { tipo: 'neu', texto: 'R$ 408,53 / dia' } },
        { label: 'Total de Leads', valor: '1.869',                   nota: 'Conversões no período',   badge: { tipo: 'neu', texto: '93,4 leads / dia' } },
        { label: 'CPL Médio',      valor: 'R$ 4,37',                 nota: 'CTR médio de 10,01%',     badge: { tipo: 'up',  texto: '↓ −38,8% vs Julho' } }
      ],
      campanhas: [
        { nome: '[Alpha] [Ressonância]',                 invest: 1723.80, leads: 247.9, ctr: 14.74, impressoes:  9280 },
        { nome: '[Alpha] [Ultrassom]',                   invest: 1099.56, leads: 219.0, ctr:  9.17, impressoes: 11075 },
        { nome: '[Alpha] [Institucional]',               invest:  197.01, leads: 162.8, ctr: 11.24, impressoes:  4173 },
        { nome: '[Alpha] [Endoscopia & Colonoscopia]',   invest:  431.10, leads: 125.0, ctr:  9.62, impressoes:  2754 },
        { nome: '[Alpha] [Ortopedista]',                 invest:  309.26, leads: 117.0, ctr: 10.19, impressoes:  2943 },
        { nome: '[Neuro e NeuroPed]',                    invest:  196.08, leads: 115.0, ctr: 13.39, impressoes:  1732 },
        { nome: '[Alpha] Otorrino',                      invest:  296.15, leads: 110.8, ctr:  5.91, impressoes:  6611 },
        { nome: '[Alpha] Urologista',                    invest:  316.58, leads: 105.0, ctr: 12.51, impressoes:  2047 },
        { nome: '[Alpha] Endocrinologista',              invest:  311.22, leads: 104.5, ctr:  6.71, impressoes:  4989 },
        { nome: '[Alpha] Cardiologia',                   invest:  427.46, leads: 100.0, ctr:  8.75, impressoes:  3370 },
        { nome: '[Alpha] [Ginecologista & Obstetra]',    invest:  315.10, leads:  86.5, ctr:  7.85, impressoes:  4062 },
        { nome: '[Alpha] Psiquiatria',                   invest:  315.06, leads:  80.0, ctr: 11.51, impressoes:  1495 },
        { nome: '[Alpha] Raio x',                        invest:  404.32, leads:  77.0, ctr: 11.21, impressoes:  2364 },
        { nome: '[Alpha] Dermatologia',                  invest:  202.27, leads:  73.0, ctr: 12.60, impressoes:  1325 },
        { nome: '[Alpha][Tomografia Computadorizada]',   invest:  897.55, leads:  58.0, ctr:  6.54, impressoes:  3469 },
        { nome: '[Alpha] [Eletroneuromiografia]',        invest:  316.33, leads:  57.0, ctr: 16.80, impressoes:  1113 },
        { nome: '[Alpha] Mamografia',                    invest:  411.84, leads:  30.0, ctr: 12.49, impressoes:  1001 }
      ]
    },

    meta: {
      sub: '8 campanhas com veiculação · 01/08 a 20/08 · dados puxados direto da conta.',
      alertas: [{
        tipo: 'red', icone: '🚨',
        titulo: 'Ressonância continua sem veicular no Meta',
        texto: 'A campanha [Alpha] [Ressonância] existe na conta, mas registrou R$ 0,00 de investimento em agosto. No Google ela já voltou ao ar após a reforma (248 leads no período). Em junho, essa campanha trouxe 273 conversas a R$ 3,16 no Meta — vale verificar se a reativação foi esquecida deste lado.'
      }],
      kpis: [
        { label: 'Investimento',       valor: 'R$ 2.449', pequeno: true, nota: '8 campanhas · 20 dias', badge: { tipo: 'neu', texto: 'R$ 122,48 / dia' } },
        { label: 'Total de Conversas', valor: '900',                     nota: 'Conversas iniciadas',   badge: { tipo: 'neu', texto: '45,0 conversas / dia' } },
        { label: 'CPR Médio',          valor: 'R$ 2,72',                 nota: 'Custo por conversa',    badge: { tipo: 'up',  texto: 'Melhor dos 3 meses ✓' } }
      ],
      campanhas: [
        { nome: '[ALPHA][ENGAJAMENTO][WPP] Tomografia Computadorizada', invest: 584.35, conversas: 298, impressoes: 73559, alcance: 34380 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Ultrassom',                  invest: 394.65, conversas: 213, impressoes: 64092, alcance: 18659 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Ortopedista',                invest: 383.02, conversas: 122, impressoes: 38144, alcance: 16490 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Ginecologia e obstetrícia',  invest: 256.60, conversas:  72, impressoes: 24075, alcance: 14620 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Urologista',                 invest: 197.89, conversas:  64, impressoes: 22487, alcance: 12599 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Cardiologista',              invest: 250.59, conversas:  56, impressoes: 17795, alcance:  7076 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Raio X e Mamografia',        invest: 190.03, conversas:  38, impressoes: 18688, alcance: 10879 },
        { nome: '[Alpha][ENGAJAMENTO][WPP] Neuro e Neuroped',           invest: 192.45, conversas:  37, impressoes: 15228, alcance:  8385 }
      ],
      nota: 'Resultado = conversas iniciadas por mensagem (janela de atribuição de 7 dias). O alcance é somado por campanha e não é desduplicado entre elas. Campanhas sem veiculação no período ([Alpha] [Ressonância], Odonto, Holter e Mapa, Colonoscopia e Endoscopia) não aparecem na tabela.'
    },

    todas: { sub: '25 campanhas com veiculação entre 01/08 e 20/08.' }
  },

  /* ══════════════════════════════ JULHO 2026 ═══════════════════════════════ */
  {
    id: 'julho',
    rotulo: 'Julho 2026',
    periodo: 'Julho 2026 · 01/07 – 31/07',

    geral: {
      eyebrow: 'Consolidado · Julho 2026',
      sub: 'Google Ads + Meta Ads · 24 campanhas ativas no período.',
      kpis: [
        { label: 'Investimento Total',  valor: 'R$ 12.077', pequeno: true, nota: 'Google + Meta Ads',       badge: { tipo: 'neu', texto: 'Ressonância pausada em julho' } },
        { label: 'Total de Resultados', valor: '2.587',                    nota: 'Leads + Conversas',       badge: { tipo: 'neu', texto: 'Sem campanha de Ressonância' } },
        { label: 'CPL Meta Ads',        valor: 'R$ 2,80',                  nota: 'Custo por conversa · Meta', badge: { tipo: 'up', texto: '↓ R$ 2,80 por conversa ✓' } }
      ],
      avisoGoogle: 'Rastreamento com falha em 2 campanhas',
      insights: [
        { icone: '✅', titulo: 'Meta Ads: melhor eficiência do ano',                   texto: 'Com 34% do orçamento, o Meta entregou 57% dos resultados de julho. CPR de R$ 2,80 por conversa iniciada.' },
        { icone: '📡', titulo: 'Ultrassom e TC: dupla de destaque no Meta',            texto: 'Tomografia com 498 conversas (CPR R$ 1,95) e Ultrassom com 366 (CPR R$ 1,80) — os dois menores custos por resultado de todo o portfólio.' },
        { icone: '💪', titulo: 'Urologista e Cardiologia fortes no Google',            texto: 'Urologista com 81 leads a R$ 3,63 e Cardiologia com 77 leads a R$ 4,74 — ambas bem dentro da meta de eficiência.' },
        { icone: '🔄', titulo: 'Ressonância pausada para reforma — prevista para agosto', texto: 'A campanha de maior volume do portfólio esteve fora em julho. Assim que a sala reabrir, o volume total deve retomar.' }
      ]
    },

    google: {
      sub: '16 campanhas ativas · Ressonância pausada para reforma da sala · Ajuste técnico em andamento em 2 campanhas (*).',
      kpis: [
        { label: 'Investimento',   valor: 'R$ 7.954', pequeno: true, nota: '16 campanhas ativas',        badge: { tipo: 'neu', texto: 'Ressonância pausada em julho' } },
        { label: 'Total de Leads', valor: '1.114',                   nota: 'Conversões registradas *',   badge: { tipo: 'neu', texto: '* 2 camps. com ajuste técnico' } },
        { label: 'CPL Médio',      valor: 'R$ 7,14',                 nota: 'Sem Ressonância · com ajuste *', badge: { tipo: 'neu', texto: 'Em normalização para agosto' } }
      ],
      campanhas: [
        { nome: '[Alpha] [Ultrassom]',                 invest: 1737.93, leads: 173.5, ctr:  9.03, cliques: 1464, impressoes: 16207 },
        { nome: '[Alpha] [Institucional]',             invest:  301.29, leads: 133.5, ctr: 10.66, cliques:  771, impressoes:  7231 },
        { nome: '[Alpha] Urologista',                  invest:  294.33, leads:  81.0, ctr: 11.05, cliques:  305, impressoes:  2761 },
        { nome: '[Alpha] [Endoscopia & Colonoscopia]', invest:  502.18, leads:  79.0, ctr: 10.11, cliques:  268, impressoes:  2651, marca: '*' },
        { nome: '[Alpha] Cardiologia',                 invest:  364.73, leads:  77.0, ctr: 10.63, cliques:  289, impressoes:  2719 },
        { nome: '[Alpha] [Ginecologista & Obstetra]',  invest:  480.13, leads:  71.5, ctr:  8.35, cliques:  534, impressoes:  6394 },
        { nome: '[Alpha] Raio x',                      invest:  424.11, leads:  71.0, ctr: 10.30, cliques:  380, impressoes:  3690 },
        { nome: '[Alpha] Otorrino',                    invest:  304.04, leads:  65.0, ctr:  5.70, cliques:  502, impressoes:  8802 },
        { nome: '[Alpha] Dermatologia',                invest:  270.00, leads:  63.0, ctr: 10.46, cliques:  315, impressoes:  3011 },
        { nome: '[Alpha] [Ortopedista]',               invest:  484.12, leads:  59.0, ctr:  8.87, cliques:  427, impressoes:  4812 },
        { nome: '[Alpha][Tomografia Comp.]',           invest: 1028.21, leads:  53.0, ctr:  7.13, cliques:  265, impressoes:  3718, marca: '*' },
        { nome: '[Alpha] Psiquiatria',                 invest:  284.93, leads:  48.0, ctr: 10.60, cliques:  207, impressoes:  1953 },
        { nome: '[Alpha] Endocrinologista',            invest:  301.83, leads:  41.0, ctr:  7.04, cliques:  390, impressoes:  5542 },
        { nome: '[Neuro e NeuroPed]',                  invest:  299.18, leads:  38.0, ctr: 10.61, cliques:  309, impressoes:  2911 },
        { nome: '[Alpha] [Eletroneuromiografia]',      invest:  488.66, leads:  33.0, ctr: 16.01, cliques:  260, impressoes:  1624 },
        { nome: '[Alpha] Mamografia',                  invest:  388.79, leads:  27.5, ctr: 10.93, cliques:  214, impressoes:  1958 }
      ],
      nota: '* Em decorrência da atualização de domínio do site realizada em julho, as campanhas de Tomografia Computadorizada e Endoscopia & Colonoscopia precisaram de um ajuste técnico na tag de rastreamento. Os resultados dessas campanhas podem estar parcialmente subnotificados no período. O ajuste foi identificado e será normalizado em agosto.'
    },

    meta: {
      sub: '8 campanhas ativas · Ressonância ausente (sala em reforma).',
      kpis: [
        { label: 'Investimento',       valor: 'R$ 4.122', pequeno: true, nota: '8 campanhas ativas',  badge: { tipo: 'neu', texto: '8 campanhas ativas' } },
        { label: 'Total de Conversas', valor: '1.473',                   nota: 'Conversas iniciadas', badge: { tipo: 'neu', texto: 'Sem Ressonância' } },
        { label: 'CPR Médio',          valor: 'R$ 2,80',                 nota: 'Custo por resultado', badge: { tipo: 'up',  texto: 'Melhor do portfólio ✓' } }
      ],
      campanhas: [
        { nome: '[ALPHA] [Tomografia Comp.]',            invest: 973.28, conversas: 498, impressoes: 126328, alcance: 49970 },
        { nome: '[Alpha] [Ultrassom]',                   invest: 659.22, conversas: 366, impressoes: 113617, alcance: 29448 },
        { nome: '[Alpha] [Ortopedista]',                 invest: 649.82, conversas: 178, impressoes:  63243, alcance: 26701 },
        { nome: '[Alpha] [Ginecologia e obstetrícia]',   invest: 423.43, conversas: 142, impressoes:  47064, alcance: 24983 },
        { nome: '[Alpha] [Cardiologista]',               invest: 427.33, conversas:  88, impressoes:  31479, alcance: 11834 },
        { nome: '[Alpha] [Urologista]',                  invest: 326.12, conversas:  87, impressoes:  40272, alcance: 21612 },
        { nome: '[Alpha] [Raio X e Mamografia]',         invest: 327.04, conversas:  60, impressoes:  34683, alcance: 17657 },
        { nome: '[Alpha] [Neuro e Neuroped]',            invest: 335.89, conversas:  54, impressoes:  27117, alcance: 14918 }
      ],
      nota: '* Em decorrência da atualização de domínio do site realizada em julho, o pixel do Meta Ads precisou de reconfiguração. Os eventos de conversão podem estar parcialmente subnotificados no período. O ajuste foi identificado e será normalizado em agosto.'
    },

    todas: { sub: 'Dados completos do período. * = campanhas com ajuste técnico de rastreamento em andamento.' }
  },

  /* ══════════════════════════════ JUNHO 2026 ═══════════════════════════════ */
  {
    id: 'junho',
    rotulo: 'Junho 2026',
    periodo: 'Junho 2026 · 01/06 – 30/06',

    geral: {
      eyebrow: 'Consolidado · Junho 2026',
      sub: 'Google Ads + Meta Ads · 26 campanhas ativas no período.',
      kpis: [
        { label: 'Investimento Total',    valor: 'R$ 15.364', pequeno: true, nota: 'Google + Meta Ads',      badge: { tipo: 'dn',  texto: '↓ −11,5% vs Maio' } },
        { label: 'Total de Resultados',   valor: '3.749',                    nota: 'Leads + Conversas',      badge: { tipo: 'dn',  texto: '↓ −18,0% vs Maio' } },
        { label: 'CPL / CPR Consolidado', valor: 'R$ 4,10',                  nota: 'Custo médio por resultado', badge: { tipo: 'neu', texto: '+7,9% vs Maio' } }
      ],
      mom: [
        { label: 'Invest. Maio',    valor: 'R$ 17.354', neutro: true },
        { label: 'Invest. Junho',   valor: 'R$ 15.364', delta: '−R$ 1.990', sinal: 'neg' },
        { label: 'Resultados Maio', valor: '4.573',     neutro: true },
        { label: 'Resultados Junho',valor: '3.749',     delta: '−824',      sinal: 'neg' }
      ],
      insights: [
        { icone: '🧲', titulo: 'Ressonância domina o mês nas duas plataformas', texto: '521 leads a R$ 5,69 no Google e 273 conversas a R$ 3,16 no Meta. Sozinha, respondeu por 21% de todo o resultado de junho — e foi o último mês antes da pausa para reforma da sala.' },
        { icone: '💰', titulo: 'Institucional é a campanha mais barata',        texto: '224 leads a R$ 1,36 cada, com apenas R$ 306 investidos. O melhor custo por resultado de todo o portfólio no Google.' },
        { icone: '📡', titulo: 'Tomografia: forte no Meta, cara no Google',     texto: 'No Meta, 299 conversas a R$ 1,84. No Google, 121 leads a R$ 13,19 — o CPL mais alto entre as campanhas de pesquisa, mesmo com R$ 1.596 investidos.' },
        { icone: '📉', titulo: 'Redução de verba concentrada no Meta',          texto: 'O Google manteve o patamar de maio (+1,9%), enquanto o Meta caiu 41%. Isso explica a queda de 18% no volume total de resultados do mês.' }
      ]
    },

    google: {
      sub: '17 campanhas ativas · Ressonância ainda no ar (pausada apenas em julho).',
      kpis: [
        { label: 'Investimento',   valor: 'R$ 12.175', pequeno: true, nota: '17 campanhas ativas',   badge: { tipo: 'up',  texto: '↑ +1,9% vs Maio' } },
        { label: 'Total de Leads', valor: '2.694',                    nota: 'Conversões no período', badge: { tipo: 'neu', texto: '−0,4% vs Maio' } },
        { label: 'CPL Médio',      valor: 'R$ 4,52',                  nota: 'Custo por lead',        badge: { tipo: 'neu', texto: '+2,3% vs Maio' } }
      ],
      campanhas: [
        { nome: '[Alpha] [Ressonância]',               invest: 2966.50, leads: 521.5, ctr: 14.11, impressoes: 17502 },
        { nome: '[Alpha] [Ultrassom]',                 invest: 1732.72, leads: 307.8, ctr:  8.04, impressoes: 16069 },
        { nome: '[Alpha] [Institucional]',             invest:  305.83, leads: 224.3, ctr:  9.67, impressoes:  6289 },
        { nome: '[Alpha] Cardiologia',                 invest:  608.19, leads: 191.0, ctr: 11.48, impressoes:  4130 },
        { nome: '[Alpha] [Endoscopia & Colonoscopia]', invest:  749.79, leads: 168.0, ctr:  9.54, impressoes:  4339 },
        { nome: '[Alpha] Urologista',                  invest:  304.10, leads: 155.0, ctr: 11.08, impressoes:  3177 },
        { nome: '[Alpha] Dermatologia',                invest:  306.79, leads: 155.0, ctr: 10.47, impressoes:  3621 },
        { nome: '[Alpha] Raio x',                      invest:  458.78, leads: 131.0, ctr:  9.82, impressoes:  3899 },
        { nome: '[Alpha][Tomografia Comp.]',           invest: 1595.56, leads: 121.0, ctr:  7.36, impressoes:  5540 },
        { nome: '[Alpha] Otorrino',                    invest:  303.74, leads: 109.5, ctr:  5.61, impressoes:  8241 },
        { nome: '[Neuro e NeuroPed]',                  invest:  303.90, leads: 109.3, ctr: 11.52, impressoes:  2761 },
        { nome: '[Alpha] Psiquiatria',                 invest:  304.32, leads: 109.0, ctr: 10.99, impressoes:  2221 },
        { nome: '[Alpha] [Ginecologista & Obstetra]',  invest:  489.34, leads: 102.7, ctr:  7.71, impressoes:  5680 },
        { nome: '[Alpha] [Ortopedista]',               invest:  487.68, leads:  92.0, ctr:  8.45, impressoes:  4509 },
        { nome: '[Alpha] Mamografia',                  invest:  460.10, leads:  66.5, ctr: 10.13, impressoes:  2074 },
        { nome: '[Alpha] Endocrinologista',            invest:  306.13, leads:  66.0, ctr:  5.85, impressoes:  5355 },
        { nome: '[Alpha] [Eletroneuromiografia]',      invest:  491.98, leads:  64.0, ctr: 14.40, impressoes:  1701 }
      ]
    },

    meta: {
      sub: '9 campanhas ativas. Métrica de resultado: conversas iniciadas.',
      kpis: [
        { label: 'Investimento',       valor: 'R$ 3.188', pequeno: true, nota: '9 campanhas ativas',  badge: { tipo: 'dn',  texto: '↓ −41,0% vs Maio' } },
        { label: 'Total de Conversas', valor: '1.055',                   nota: 'Conversas iniciadas', badge: { tipo: 'dn',  texto: '↓ −43,5% vs Maio' } },
        { label: 'CPR Médio',          valor: 'R$ 3,02',                 nota: 'Custo por resultado', badge: { tipo: 'neu', texto: '+4,4% vs Maio' } }
      ],
      campanhas: [
        { nome: '[ALPHA] [Tomografia Comp.]',          invest: 549.86, conversas: 299, impressoes: 88146, alcance: 48489 },
        { nome: '[Alpha] [Ressonância]',               invest: 863.70, conversas: 273, impressoes:114738, alcance: 48219 },
        { nome: '[Alpha] [Ultrassom]',                 invest: 364.23, conversas: 183, impressoes: 61429, alcance: 18826 },
        { nome: '[Alpha] [Ortopedista]',               invest: 374.36, conversas: 105, impressoes: 37465, alcance: 18035 },
        { nome: '[Alpha] [Ginecologia e obstetrícia]', invest: 242.52, conversas:  62, impressoes: 24557, alcance: 14221 },
        { nome: '[Alpha] [Urologista]',                invest: 186.73, conversas:  48, impressoes: 23072, alcance: 14816 },
        { nome: '[Alpha] [Raio X e Mamografia]',       invest: 188.38, conversas:  34, impressoes: 21018, alcance: 12185 },
        { nome: '[Alpha] [Cardiologista]',             invest: 238.59, conversas:  31, impressoes: 18256, alcance:  7100 },
        { nome: '[Alpha] [Neuro e Neuroped]',          invest: 180.00, conversas:  20, impressoes: 14858, alcance:  8797 }
      ]
    },

    todas: { sub: '26 campanhas ativas no período. Dados completos de investimento e resultado.' }
  },

  /* ═══════════════════════════════ MAIO 2026 ═══════════════════════════════ */
  {
    id: 'maio',
    rotulo: 'Maio 2026',
    periodo: 'Maio 2026 · 01/05 – 31/05',

    geral: {
      eyebrow: 'Visão Consolidada · Maio 2026',
      sub: 'Google Ads + Meta Ads — todas as campanhas do período.',
      kpis: [
        { label: 'Investimento Total',    valor: 'R$ 17.354', pequeno: true, nota: 'Google + Meta Ads',        badge: { tipo: 'up', texto: '↑ +34,2% vs Abril' } },
        { label: 'Total de Resultados',   valor: '4.573',                    nota: 'Leads + Conversas',        badge: { tipo: 'up', texto: '↑ +52,4% vs Abril' } },
        { label: 'CPL / CPR Consolidado', valor: 'R$ 3,80',                  nota: 'Custo médio por resultado', badge: { tipo: 'up', texto: '↓ −11,8% vs Abril' } }
      ],
      mom: [
        { label: 'Invest. Abril',    valor: 'R$ 12.928', neutro: true },
        { label: 'Invest. Maio',     valor: 'R$ 17.354', delta: '+R$ 4.426', sinal: 'pos' },
        { label: 'Resultados Abril', valor: '3.000',     neutro: true },
        { label: 'Resultados Maio',  valor: '4.573',     delta: '+1.573',    sinal: 'pos' }
      ]
    },

    google: {
      sub: '17 campanhas ativas. Métrica de conversão: leads gerados.',
      kpis: [
        { label: 'Investimento',   valor: 'R$ 11.949', pequeno: true, nota: '17 campanhas ativas',   badge: { tipo: 'up', texto: '↑ +11,1% vs Abril' } },
        { label: 'Total de Leads', valor: '2.705',                    nota: 'Conversões no período', badge: { tipo: 'up', texto: '↑ +24,7% vs Abril' } },
        { label: 'CPL Médio',      valor: 'R$ 4,42',                  nota: 'Custo por lead',        badge: { tipo: 'up', texto: '↓ −10,9% vs Abril' } }
      ],
      campanhas: [
        { nome: '[Alpha] [Ressonância]',               invest: 2539.28, leads: 529, ctr: 13.48, cliques: 2245, impressoes: 16658 },
        { nome: '[Alpha] [Ultrassom]',                 invest: 1455.58, leads: 290, ctr:  8.42, cliques: 1196, impressoes: 14201 },
        { nome: '[Alpha] [Institucional]',             invest:  248.09, leads: 214, ctr: 10.20, cliques:  637, impressoes:  6246 },
        { nome: '[Alpha] Cardiologia',                 invest:  610.43, leads: 181, ctr: 10.86, cliques:  489, impressoes:  4504 },
        { nome: '[Alpha] [Endoscopia & Colonoscopia]', invest:  775.30, leads: 177, ctr:  9.12, cliques:  413, impressoes:  4530 },
        { nome: '[Alpha][Tomografia Comp.]',           invest: 2430.09, leads: 150, ctr:  8.29, cliques:  684, impressoes:  8251 },
        { nome: '[Alpha] Dermatologia',                invest:  300.25, leads: 144, ctr:  9.87, cliques:  373, impressoes:  3780 },
        { nome: '[Alpha] Psiquiatria',                 invest:  302.97, leads: 140, ctr: 11.93, cliques:  277, impressoes:  2321 },
        { nome: '[Alpha] Urologista',                  invest:  301.60, leads: 140, ctr: 10.37, cliques:  357, impressoes:  3441 },
        { nome: '[Alpha] Raio x',                      invest:  444.23, leads: 126, ctr: 10.37, cliques:  407, impressoes:  3924 },
        { nome: '[Alpha] Otorrino',                    invest:  301.99, leads: 124, ctr:  6.52, cliques:  509, impressoes:  7808 },
        { nome: '[Neuro e NeuroPed]',                  invest:  260.08, leads: 102, ctr:  9.90, cliques:  296, impressoes:  2990 },
        { nome: '[Alpha] [Ginecologista & Obstetra]',  invest:  412.81, leads:  96, ctr:  8.36, cliques:  403, impressoes:  4819 },
        { nome: '[Alpha] [Ortopedista]',               invest:  412.29, leads:  89, ctr:  8.77, cliques:  364, impressoes:  4150 },
        { nome: '[Alpha] [Eletroneuromiografia]',      invest:  404.43, leads:  73, ctr: 15.19, cliques:  252, impressoes:  1659 },
        { nome: '[Alpha] Endocrinologista',            invest:  302.12, leads:  68, ctr:  5.76, cliques:  362, impressoes:  6282 },
        { nome: '[Alpha] Mamografia',                  invest:  447.62, leads:  63, ctr: 10.49, cliques:  212, impressoes:  2021 }
      ]
    },

    meta: {
      sub: '9 campanhas ativas. Métrica de resultado: conversas iniciadas.',
      kpis: [
        { label: 'Investimento',       valor: 'R$ 5.405', pequeno: true, nota: '9 campanhas ativas',  badge: { tipo: 'up', texto: '↑ +149,2% vs Abril' } },
        { label: 'Total de Conversas', valor: '1.868',                   nota: 'Conversas iniciadas', badge: { tipo: 'up', texto: '↑ +125,1% vs Abril' } },
        { label: 'CPR Médio',          valor: 'R$ 2,89',                 nota: 'Custo por resultado', badge: { tipo: 'dn', texto: '↑ +10,7% vs Abril' } }
      ],
      campanhas: [
        { nome: '[ALPHA] [Tomografia Comp.]',          invest:  919.64, conversas: 525, impressoes: 130388, alcance: 56761 },
        { nome: '[Alpha] [Ressonância]',               invest: 1530.91, conversas: 458, impressoes: 212253, alcance: 71725 },
        { nome: '[Alpha] [Ultrassom]',                 invest:  612.29, conversas: 296, impressoes: 109655, alcance: 25906 },
        { nome: '[Alpha] [Ortopedista]',               invest:  615.35, conversas: 151, impressoes:  64447, alcance: 26680 },
        { nome: '[Alpha] [Urologista]',                invest:  308.77, conversas: 126, impressoes:  36515, alcance: 18576 },
        { nome: '[Alpha] [Ginecologia e obstetrícia]', invest:  399.14, conversas: 118, impressoes:  47109, alcance: 24045 },
        { nome: '[Alpha] [Raio X e Mamografia]',       invest:  309.68, conversas:  72, impressoes:  30699, alcance: 14366 },
        { nome: '[Alpha] [Neuro e Neuroped]',          invest:  309.43, conversas:  65, impressoes:  22851, alcance: 10061 },
        { nome: '[Alpha] [Cardiologista]',             invest:  399.89, conversas:  57, impressoes:  29909, alcance: 11080 }
      ]
    },

    todas: { sub: '26 campanhas ativas no período. Dados completos de investimento e resultado.' }
  }

  ]
};
