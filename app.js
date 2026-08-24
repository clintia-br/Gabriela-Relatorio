/* ============================================================================
   RENDERIZADOR DO RELATÓRIO
   ----------------------------------------------------------------------------
   Lê a constante RELATORIO de dados.js e monta a página. Nada aqui precisa ser
   editado para publicar um mês novo — só dados.js.
   ========================================================================== */
(function () {
  'use strict';

  /* ── formatação pt-BR ────────────────────────────────────────────────── */
  const fmt = (d) => new Intl.NumberFormat('pt-BR', { minimumFractionDigits: d, maximumFractionDigits: d });
  const num = (v, d = 0) => fmt(d).format(v);
  const brl = (v, d = 2) => 'R$ ' + fmt(d).format(v);
  const pct = (v, d = 2) => fmt(d).format(v) + '%';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  /* Rótulo curto para o gráfico de barras: remove os prefixos de nomenclatura
     da conta ([Alpha], [ENGAJAMENTO], [WPP]) e desembrulha o colchete restante,
     porque o nome completo não cabe em 200px e viraria "[ALPHA][ENGAJ...". */
  const PREFIXOS = ['alpha', 'engajamento', 'wpp'];
  function curto(nome) {
    let s = String(nome).trim(), m;
    const re = /^\[([^\]]*)\]\s*/;
    while ((m = s.match(re)) && PREFIXOS.indexOf(m[1].trim().toLowerCase()) !== -1) s = s.slice(m[0].length);
    const solo = s.match(/^\[([^\]]*)\]\s*(\*?)$/);
    if (solo) s = solo[1] + (solo[2] ? ' ' + solo[2] : '');
    return s;
  }

  /* Uma plataforma só entra no relatório se tiver campanha com veiculação. */
  const temGoogle = (m) => !!(m.google && m.google.campanhas && m.google.campanhas.length);
  const temMeta   = (m) => !!(m.meta   && m.meta.campanhas   && m.meta.campanhas.length);
  const temPalavras = (m) => !!(m.palavras && m.palavras.itens && m.palavras.itens.length);

  const plural = (n, singular, plural_) => num(n) + ' ' + (Math.round(n) === 1 ? singular : plural_);

  const soma = (arr, campo) => arr.reduce((a, c) => a + (Number(c[campo]) || 0), 0);
  const tem = (arr, campo) => arr.some((c) => c[campo] != null);

  /* ── totais calculados ───────────────────────────────────────────────── */
  function totaisGoogle(cs) {
    const invest = soma(cs, 'invest'), leads = soma(cs, 'leads');
    const impressoes = soma(cs, 'impressoes'), cliques = soma(cs, 'cliques');
    let ctr = null;
    if (impressoes > 0) {
      // com cliques reais, CTR = cliques/impressões; senão, média ponderada
      // pelas impressões de cada campanha (mesmo resultado, menos precisão)
      ctr = tem(cs, 'cliques')
        ? (cliques / impressoes) * 100
        : cs.reduce((a, c) => a + (c.ctr || 0) * (c.impressoes || 0), 0) / impressoes;
    }
    // sem conversões o custo por resultado não existe; null vira '—' na tela
    return { invest, resultados: leads, custo: leads ? invest / leads : null, impressoes, cliques, ctr };
  }

  function totaisMeta(cs) {
    const invest = soma(cs, 'invest'), conversas = soma(cs, 'conversas');
    return {
      invest, resultados: conversas, custo: conversas ? invest / conversas : null,
      impressoes: soma(cs, 'impressoes'), alcance: soma(cs, 'alcance')
    };
  }

  /* ── blocos reutilizáveis ────────────────────────────────────────────── */
  function cabecalho(m, dados) {
    return `<div class="ey"${dados.cor ? ` style="color:var(--${dados.cor})"` : ''}>${esc(dados.eyebrow)}</div>
      <h1 class="ttl">${esc(dados.titulo)}</h1>
      <p class="sub">${esc(dados.sub || '')}</p>`;
  }

  function alertasHTML(lista) {
    if (!lista || !lista.length) return '';
    return lista.map((a) => `
      <div class="alert ${a.tipo}">
        <div class="alert-icon">${a.icone || ''}</div>
        <div class="alert-body">
          <div class="alert-title">${esc(a.titulo)}</div>
          <div class="alert-text">${esc(a.texto)}</div>
        </div>
      </div>`).join('');
  }

  function kpisHTML(kpis, cor) {
    if (!kpis || !kpis.length) return '';
    return `<div class="kpi-grid">${kpis.map((k) => `
      <div class="kpi ${cor}">
        <div class="kpi-lbl">${esc(k.label)}</div>
        <div class="kpi-val${k.pequeno ? ' kpi-val-sm' : ''}">${esc(k.valor)}</div>
        ${k.nota ? `<div class="kpi-note">${esc(k.nota)}</div>` : ''}
        ${k.badge ? `<div class="badge ${k.badge.tipo}">${esc(k.badge.texto)}</div>` : ''}
      </div>`).join('')}</div>`;
  }

  function momHTML(mom) {
    if (!mom || !mom.length) return '';
    return `<div class="mom">${mom.map((c) => `
      <div class="mom-cell">
        <div class="mom-lbl">${esc(c.label)}</div>
        <div class="mom-val${c.neutro ? ' neu-c' : ''}">${esc(c.valor)}</div>
        ${c.delta ? `<div class="mom-delta ${c.sinal || 'neu-c'}">${esc(c.delta)}</div>` : ''}
      </div>`).join('')}</div>`;
  }

  function aviso(txt) {
    return txt ? ` <span class="warn-icon" title="${esc(txt)}">⚠</span>` : '';
  }

  /* Gráfico de barras: ordena decrescente e escala a maior barra em 100%. */
  function barrasHTML(titulo, itens, cor, formatar) {
    if (itens.length < 2) return '';  // uma barra sozinha em 100% não compara nada
    const ord = itens.slice().sort((a, b) => b.valor - a.valor);
    const max = ord.length ? ord[0].valor : 0;
    return `<div class="chart-ttl">${esc(titulo)}</div>
      <div class="bars">${ord.map((i) => `
        <div class="bar-row">
          <span class="bar-lbl" title="${esc(i.nome)}">${esc(curto(i.nome))}</span>
          <div class="bar-tr"><div class="bar-fi" style="width:${max ? (i.valor / max) * 100 : 0}%;background:var(--${cor})"></div></div>
          <span class="bar-vl">${esc(formatar(i.valor))}</span>
        </div>`).join('')}</div>`;
  }

  function notaHTML(txt) {
    return txt ? `<div class="card-nota"><p>${esc(txt)}</p></div>` : '';
  }

  /* ── tabelas de campanha ─────────────────────────────────────────────── */
  function tabelaGoogle(cs) {
    const t = totaisGoogle(cs);
    const comCtr = tem(cs, 'ctr'), comCliques = tem(cs, 'cliques'), comImpr = tem(cs, 'impressoes');
    // o Google reporta conversões fracionadas; se alguma campanha tem decimal,
    // a coluna inteira usa 1 casa para não misturar "219" com "247,9"
    const casas = cs.some((c) => !Number.isInteger(c.leads)) ? 1 : 0;
    return `<div class="tbl-scroll"><table>
      <thead><tr>
        <th>Campanha</th><th class="r">Investimento</th><th class="r">Leads</th><th class="r">CPL</th>
        ${comCtr ? '<th class="r">CTR</th>' : ''}
        ${comCliques ? '<th class="r">Cliques</th>' : ''}
        ${comImpr ? '<th class="r">Impressões</th>' : ''}
      </tr></thead>
      <tbody>${cs.map((c) => `<tr>
        <td class="cam">${esc(c.nome)}${c.marca ? ' ' + esc(c.marca) : ''}</td>
        <td class="r">${brl(c.invest)}</td>
        <td class="r">${num(c.leads, casas)}</td>
        <td class="r">${c.leads ? brl(c.invest / c.leads) : '—'}</td>
        ${comCtr ? `<td class="r">${c.ctr != null ? pct(c.ctr) : '—'}</td>` : ''}
        ${comCliques ? `<td class="r">${c.cliques != null ? num(c.cliques) : '—'}</td>` : ''}
        ${comImpr ? `<td class="r">${c.impressoes != null ? num(c.impressoes) : '—'}</td>` : ''}
      </tr>`).join('')}</tbody>
      <tfoot><tr>
        <td>Total Google Ads</td>
        <td class="r">${brl(t.invest)}</td>
        <td class="r">${plural(Math.round(t.resultados), 'lead', 'leads')}</td>
        <td class="r">${t.custo != null ? 'CPL ' + brl(t.custo) : '—'}</td>
        ${comCtr ? `<td class="r">${t.ctr != null ? pct(t.ctr) : '—'}</td>` : ''}
        ${comCliques ? `<td class="r">${num(t.cliques)}</td>` : ''}
        ${comImpr ? `<td class="r">${num(t.impressoes)}</td>` : ''}
      </tr></tfoot>
    </table></div>`;
  }

  function tabelaMeta(cs) {
    const t = totaisMeta(cs);
    const comImpr = tem(cs, 'impressoes'), comAlc = tem(cs, 'alcance');
    return `<div class="tbl-scroll"><table>
      <thead><tr>
        <th>Campanha</th><th class="r">Investimento</th><th class="r">Conversas</th><th class="r">CPR</th>
        ${comImpr ? '<th class="r">Impressões</th>' : ''}
        ${comAlc ? '<th class="r">Alcance</th>' : ''}
      </tr></thead>
      <tbody>${cs.map((c) => `<tr>
        <td class="cam">${esc(c.nome)}</td>
        <td class="r">${brl(c.invest)}</td>
        <td class="r">${num(c.conversas)}</td>
        <td class="r">${c.conversas ? brl(c.invest / c.conversas) : '—'}</td>
        ${comImpr ? `<td class="r">${num(c.impressoes)}</td>` : ''}
        ${comAlc ? `<td class="r">${num(c.alcance)}</td>` : ''}
      </tr>`).join('')}</tbody>
      <tfoot><tr>
        <td>Total Meta Ads</td>
        <td class="r">${brl(t.invest)}</td>
        <td class="r">${plural(t.resultados, 'conversa', 'conversas')}</td>
        <td class="r">${t.custo != null ? 'CPR ' + brl(t.custo) : '—'}</td>
        ${comImpr ? `<td class="r">${num(t.impressoes)}</td>` : ''}
        ${comAlc ? `<td class="r">${num(t.alcance)}</td>` : ''}
      </tr></tfoot>
    </table></div>`;
  }

  /* ── aba: Visão Geral ────────────────────────────────────────────────── */
  function secGeral(m) {
    const g = totaisGoogle(temGoogle(m) ? m.google.campanhas : []);
    const t = totaisMeta(temMeta(m) ? m.meta.campanhas : []);
    const invest = g.invest + t.invest, result = g.resultados + t.resultados;
    const pInvG = invest ? (g.invest / invest) * 100 : 0, pInvM = 100 - pInvG;
    const pResG = result ? (g.resultados / result) * 100 : 0, pResM = 100 - pResG;
    // comparar plataformas só faz sentido com as duas no ar; com uma só, os
    // blocos seriam 100%/0% e não dizem nada
    const duasPlataformas = temGoogle(m) && temMeta(m);
    const d = m.geral;

    /* Tabela de ritmo: colunas livres, definidas nos dados, porque o recorte
       útil muda por conta (resultados/dia, impressões/dia, CTR...). A primeira
       coluna é o rótulo do período; as demais vão alinhadas à direita. */
    const rd = d.ritmoDiario;
    const celulas = (l) => l.celulas
      .map((c, n) => n === 0 ? `<td>${esc(c)}${aviso(l.aviso)}</td>` : `<td class="r">${esc(c)}</td>`)
      .join('');
    // um bloco malformado não pode derrubar a página inteira
    const ritmo = (!rd || !rd.colunas || !rd.linhas) ? '' : `
      <div class="tcard">
        <div class="tcard-hdr">
          <span class="tcard-ttl">${esc(rd.titulo)}</span>
          ${rd.chip ? `<span class="chip">${esc(rd.chip)}</span>` : ''}
        </div>
        <div class="tbl-scroll"><table>
          <thead><tr>${rd.colunas.map((c, n) => n === 0 ? `<th>${esc(c)}</th>` : `<th class="r">${esc(c)}</th>`).join('')}</tr></thead>
          <tbody>${rd.linhas.map((l) => `<tr>${celulas(l)}</tr>`).join('')}</tbody>
          ${rd.total ? `<tfoot><tr>${celulas(rd.total)}</tr></tfoot>` : ''}
        </table></div>
      </div>`;

    const insights = (d.insights && d.insights.length) ? `
      <div class="insights">${d.insights.map((i) => `
        <div class="insight">
          <div class="ins-icon">${i.icone || ''}</div>
          <div class="ins-ttl">${esc(i.titulo)}</div>
          <div class="ins-txt">${esc(i.texto)}</div>
        </div>`).join('')}</div>` : '';

    const comparativo = !duasPlataformas ? '' : `
      <div class="tcard">
        <div class="tcard-hdr"><span class="tcard-ttl">Comparativo por Plataforma</span></div>
        <div class="tbl-scroll"><table>
          <thead><tr><th>Plataforma</th><th class="r">Investimento</th><th class="r">Resultados</th><th class="r">CPL / CPR</th><th class="r">% do Invest.</th></tr></thead>
          <tbody>
            <tr>
              <td><span class="plat-dot" style="background:var(--google)"></span>Google Ads${aviso(d.avisoGoogle)}</td>
              <td class="r">${brl(g.invest)}</td><td class="r">${plural(Math.round(g.resultados), 'lead', 'leads')}</td>
              <td class="r">${brl(g.custo)}</td><td class="r">${pct(pInvG, 1)}</td>
            </tr>
            <tr>
              <td><span class="plat-dot" style="background:var(--meta)"></span>Meta Ads${aviso(d.avisoMeta)}</td>
              <td class="r">${brl(t.invest)}</td><td class="r">${plural(t.resultados, 'conversa', 'conversas')}</td>
              <td class="r">${brl(t.custo)}</td><td class="r">${pct(pInvM, 1)}</td>
            </tr>
          </tbody>
          <tfoot><tr>
            <td>Total Geral</td><td class="r">${brl(invest)}</td>
            <td class="r">${plural(Math.round(result), 'resultado', 'resultados')}</td>
            <td class="r">${brl(invest / result)}</td><td class="r">100%</td>
          </tr></tfoot>
        </table></div>
      </div>

      <div class="dist-grid">
        <div class="dist-card">
          <div class="dist-ttl">Investimento</div>
          <div class="dist-bar"><div class="dist-g" style="width:${pInvG}%"></div><div class="dist-m" style="width:${pInvM}%"></div></div>
          <div class="dist-leg">
            <div class="dl"><div class="dl-dot" style="background:var(--google)"></div><div><div class="dl-lbl">Google Ads</div><div class="dl-val">${brl(g.invest, 0)}</div><div class="dl-pct">${pct(pInvG, 1)}</div></div></div>
            <div class="dl"><div class="dl-dot" style="background:var(--meta)"></div><div><div class="dl-lbl">Meta Ads</div><div class="dl-val">${brl(t.invest, 0)}</div><div class="dl-pct">${pct(pInvM, 1)}</div></div></div>
          </div>
        </div>
        <div class="dist-card">
          <div class="dist-ttl">Resultados</div>
          <div class="dist-bar"><div class="dist-g" style="width:${pResG}%"></div><div class="dist-m" style="width:${pResM}%"></div></div>
          <div class="dist-leg">
            <div class="dl"><div class="dl-dot" style="background:var(--google)"></div><div><div class="dl-lbl">Google Ads</div><div class="dl-val">${num(Math.round(g.resultados))} leads</div><div class="dl-pct">${pct(pResG, 1)}</div></div></div>
            <div class="dl"><div class="dl-dot" style="background:var(--meta)"></div><div><div class="dl-lbl">Meta Ads</div><div class="dl-val">${num(t.resultados)} conv.</div><div class="dl-pct">${pct(pResM, 1)}</div></div></div>
          </div>
        </div>
      </div>
`;

    return `<section id="${m.id}-geral" class="sec on"><div class="wrap">
      ${cabecalho(m, { eyebrow: d.eyebrow, titulo: 'Performance Geral', sub: d.sub })}
      ${alertasHTML(d.alertas)}
      ${kpisHTML(d.kpis, 'tc')}
      ${ritmo}
      ${momHTML(d.mom)}

      ${comparativo}

      ${insights}
    </div></section>`;
  }

  /* ── aba: Google Ads ─────────────────────────────────────────────────── */
  function secGoogle(m) {
    const cs = m.google.campanhas;
    return `<section id="${m.id}-google" class="sec"><div class="wrap">
      ${cabecalho(m, { eyebrow: `Google Ads · ${m.rotulo}`, titulo: 'Campanhas de Pesquisa', sub: m.google.sub, cor: 'google' })}
      ${alertasHTML(m.google.alertas)}
      ${kpisHTML(m.google.kpis, 'go')}
      <div class="tcard">
        <div class="tcard-hdr">
          <span class="tcard-ttl">Detalhamento por Campanha</span>
          <span class="chip">ordenado por leads ↓</span>
        </div>
        ${tabelaGoogle(cs.slice().sort((a, b) => b.leads - a.leads))}
        ${barrasHTML('Investimento por Campanha', cs.map((c) => ({ nome: c.nome + (c.marca || ''), valor: c.invest })), 'google', (v) => brl(v, 0))}
        ${barrasHTML('Leads por Campanha', cs.map((c) => ({ nome: c.nome + (c.marca || ''), valor: c.leads })), 'teal', (v) => plural(Math.round(v), 'lead', 'leads'))}
        ${notaHTML(m.google.nota)}
      </div>
    </div></section>`;
  }

  /* ── aba: Meta Ads ───────────────────────────────────────────────────── */
  function secMeta(m) {
    const cs = m.meta.campanhas;
    return `<section id="${m.id}-meta" class="sec"><div class="wrap">
      ${cabecalho(m, { eyebrow: `Meta Ads · ${m.rotulo}`, titulo: 'Campanhas de Conversas', sub: m.meta.sub, cor: 'meta' })}
      ${alertasHTML(m.meta.alertas)}
      ${kpisHTML(m.meta.kpis, 'mt')}
      <div class="tcard">
        <div class="tcard-hdr">
          <span class="tcard-ttl">Detalhamento por Campanha</span>
          <span class="chip">ordenado por conversas ↓</span>
        </div>
        ${tabelaMeta(cs.slice().sort((a, b) => b.conversas - a.conversas))}
        ${barrasHTML('Investimento por Campanha', cs.map((c) => ({ nome: c.nome, valor: c.invest })), 'meta', (v) => brl(v, 0))}
        ${barrasHTML('Conversas por Campanha', cs.map((c) => ({ nome: c.nome, valor: c.conversas })), 'teal', (v) => num(v) + ' conv.')}
        ${notaHTML(m.meta.nota)}
      </div>
    </div></section>`;
  }

  /* ── aba: Todas as Campanhas ─────────────────────────────────────────── */
  function secTodas(m) {
    const g = m.google.campanhas, t = m.meta.campanhas;
    return `<section id="${m.id}-todas" class="sec"><div class="wrap">
      ${cabecalho(m, { eyebrow: `Google + Meta · ${m.rotulo}`, titulo: 'Todas as Campanhas Ativas', sub: (m.todas && m.todas.sub) || '' })}
      <div class="ey" style="color:var(--google);margin-bottom:12px">Google Ads · ${g.length} campanhas</div>
      <div class="tcard" style="margin-bottom:28px">${tabelaGoogle(g.slice().sort((a, b) => b.leads - a.leads))}</div>
      <div class="ey" style="color:var(--meta);margin-bottom:12px">Meta Ads · ${t.length} campanhas</div>
      <div class="tcard">${tabelaMeta(t.slice().sort((a, b) => b.conversas - a.conversas))}</div>
    </div></section>`;
  }


  /* ── aba: Palavras-chave ────────────────────────────────────────────────
     Só CTR, CPC e custo/conv. são derivados; impressões, cliques, custo e
     conversões vêm do export. */
  function secPalavras(m) {
    const itens = m.palavras.itens.slice().sort((a, b) => (b.custo - a.custo) || (b.impressoes - a.impressoes));
    const t = {
      impressoes: soma(itens, 'impressoes'), cliques: soma(itens, 'cliques'),
      custo: soma(itens, 'custo'), conversoes: soma(itens, 'conversoes')
    };

    const selo = (k) => {
      if (k.estado === 'Pausado') return '<span class="chip warn">Pausado</span>';
      if (/raramente/i.test(k.motivo || '')) return '<span class="chip mut">Raramente exibido</span>';
      return '<span class="chip">Ativa</span>';
    };
    const taxa = (c, cl) => cl ? pct((c / cl) * 100) : '—';

    const linhas = itens.map((k) => `<tr>
      <td class="termo">${esc(k.termo)}</td>
      <td>${selo(k)}</td>
      <td class="r">${num(k.impressoes)}</td>
      <td class="r">${num(k.cliques)}</td>
      <td class="r">${k.impressoes ? pct((k.cliques / k.impressoes) * 100) : '—'}</td>
      <td class="r">${k.cliques ? brl(k.custo / k.cliques) : '—'}</td>
      <td class="r">${brl(k.custo)}</td>
      <td class="r">${num(k.conversoes)}</td>
      <td class="r">${k.conversoes ? brl(k.custo / k.conversoes) : '—'}</td>
    </tr>`).join('');

    const comCusto = itens.filter((k) => k.custo > 0);

    return `<section id="${m.id}-palavras" class="sec"><div class="wrap">
      ${cabecalho(m, { eyebrow: `Palavras-chave · ${m.rotulo}`, titulo: 'Rede de Pesquisa', sub: m.palavras.sub })}
      ${alertasHTML(m.palavras.alertas)}
      ${kpisHTML(m.palavras.kpis, 'go')}
      <div class="tcard">
        <div class="tcard-hdr">
          <span class="tcard-ttl">Detalhamento por Palavra-chave</span>
          <span class="chip">ordenado por custo ↓</span>
        </div>
        <div class="tbl-scroll"><table>
          <thead><tr>
            <th>Palavra-chave</th><th>Status</th><th class="r">Impr.</th><th class="r">Cliques</th>
            <th class="r">CTR</th><th class="r">CPC</th><th class="r">Custo</th>
            <th class="r">Conv.</th><th class="r">Custo / conv.</th>
          </tr></thead>
          <tbody>${linhas}</tbody>
          <tfoot><tr>
            <td>Total · ${plural(itens.length, 'palavra-chave', 'palavras-chave')}</td><td></td>
            <td class="r">${num(t.impressoes)}</td>
            <td class="r">${num(t.cliques)}</td>
            <td class="r">${t.impressoes ? pct((t.cliques / t.impressoes) * 100) : '—'}</td>
            <td class="r">${t.cliques ? brl(t.custo / t.cliques) : '—'}</td>
            <td class="r">${brl(t.custo)}</td>
            <td class="r">${num(t.conversoes)}</td>
            <td class="r">${t.conversoes ? brl(t.custo / t.conversoes) : '—'}</td>
          </tr></tfoot>
        </table></div>
        ${barrasHTML('Custo por Palavra-chave', comCusto.map((k) => ({ nome: k.termo, valor: k.custo })), 'google', (v) => brl(v, 0))}
        ${barrasHTML('Cliques por Palavra-chave', comCusto.map((k) => ({ nome: k.termo, valor: k.cliques })), 'teal', (v) => plural(v, 'clique', 'cliques'))}
        ${notaHTML(m.palavras.nota)}
      </div>
      ${m.palavras.insights ? `<div class="insights">${m.palavras.insights.map((i) => `
        <div class="insight">
          <div class="ins-icon">${i.icone || ''}</div>
          <div class="ins-ttl">${esc(i.titulo)}</div>
          <div class="ins-txt">${esc(i.texto)}</div>
        </div>`).join('')}</div>` : ''}
    </div></section>`;
  }

  /* ── montagem ────────────────────────────────────────────────────────── */
  function mesHTML(m, i) {
    // só entram as abas que têm dado: um período sem Meta não mostra a aba de
    // Meta, e "Todas as Campanhas" só existe quando há as duas plataformas
    const abas = [{ id: 'geral', rotulo: 'Visão Geral', html: secGeral(m) }];
    if (temGoogle(m)) abas.push({ id: 'google', rotulo: 'Google Ads', html: secGoogle(m) });
    if (temMeta(m))   abas.push({ id: 'meta',   rotulo: 'Meta Ads',   html: secMeta(m) });
    if (temPalavras(m)) abas.push({ id: 'palavras', rotulo: 'Palavras-chave', html: secPalavras(m) });
    if (temGoogle(m) && temMeta(m)) abas.push({ id: 'todas', rotulo: 'Todas as Campanhas', html: secTodas(m) });

    return `<div id="report-${m.id}" class="relatorio-mes"${i === 0 ? '' : ' style="display:none"'}>
      <header class="hdr">
        <div class="hdr-row">
          <div class="brand"><div class="brand-dot"></div><span class="brand-name">${esc(RELATORIO.cliente)}</span></div>
          <span class="period-chip">${esc(m.periodo)}</span>
        </div>
        <div class="tabs">${abas.map((a, n) => `<button class="tab${n === 0 ? ' on' : ''}" data-alvo="${m.id}-${a.id}">${esc(a.rotulo)}</button>`).join('')}</div>
      </header>
      ${abas.map((a) => a.html).join('')}
    </div>`;
  }

  function render() {
    document.title = `Relatório de Performance — ${RELATORIO.cliente}`;
    // com um período só, o seletor não tem o que selecionar
    document.querySelector('.rpt-switch').style.display = RELATORIO.meses.length > 1 ? '' : 'none';
    document.getElementById('seletor-meses').innerHTML = RELATORIO.meses
      .map((m, i) => `<button class="rpt-switch-btn${i === 0 ? ' active' : ''}" data-mes="${m.id}">${esc(m.rotulo)}</button>`)
      .join('');
    document.getElementById('relatorios').innerHTML = RELATORIO.meses.map(mesHTML).join('');
  }

  function aoTopo() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  document.addEventListener('click', function (ev) {
    const btnMes = ev.target.closest('.rpt-switch-btn');
    if (btnMes) {
      document.querySelectorAll('.rpt-switch-btn').forEach((b) => b.classList.remove('active'));
      btnMes.classList.add('active');
      RELATORIO.meses.forEach((m) => {
        document.getElementById('report-' + m.id).style.display = (m.id === btnMes.dataset.mes) ? '' : 'none';
      });
      aoTopo();
      return;
    }
    const btnAba = ev.target.closest('.tab');
    if (btnAba) {
      const mes = btnAba.closest('.relatorio-mes');
      mes.querySelectorAll('.sec').forEach((s) => s.classList.remove('on'));
      mes.querySelectorAll('.tab').forEach((t) => t.classList.remove('on'));
      document.getElementById(btnAba.dataset.alvo).classList.add('on');
      btnAba.classList.add('on');
      aoTopo();
    }
  });

  render();
})();
