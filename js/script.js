/* ==========================================================================
   Agrinho 2026 — Agro Forte, Futuro Sustentável
   Autor: Izaque Closs Scheid da Silva
   1.º Ano C — Col. Est. Cívico Militar Frentino Sackser
   Marechal Cândido Rondon — PR
   Categoria: Programação Front-End (HTML, CSS e JavaScript)
   ========================================================================== */

(function(){

  /* ── REFERÊNCIAS AO DOM ─────────────────────────────────────────────── */
  const body = document.body;
  const gate = document.getElementById('gate');           // tela de entrada
  const heroTag = document.getElementById('heroTag');     // indicador de trilha no hero
  const cultivoTitle = document.getElementById('cultivoTitle'); // título da seção cultivo

  /* ── ESCOLHA DA TRILHA (pílula vermelha ou verde) ───────────────────── */
  // Define o tema de cores e textos conforme a trilha escolhida pelo usuário
  function setPath(path, opts){
    opts = opts || {};

    // Remove classes anteriores e aplica a nova trilha
    body.classList.remove('path-trad', 'path-tech');
    body.classList.add(path === 'trad' ? 'path-trad' : 'path-tech');

    // Atualiza textos dinâmicos conforme a trilha
    if(path === 'trad'){
      heroTag.textContent = '// Trilha selecionada: Cultivo Tradicional';
      cultivoTitle.textContent = 'Duas formas de cultivar — Tradicional em destaque na sua trilha.';
    } else {
      heroTag.textContent = '// Trilha selecionada: Cultivo Tecnológico';
      cultivoTitle.textContent = 'Duas formas de cultivar — Tecnológico em destaque na sua trilha.';
    }

    // Salva a preferência no localStorage para persistir entre visitas
    try{ localStorage.setItem('agrinho-path', path); }catch(e){}

    // Fecha a tela de entrada com animação de fade
    if(!opts.skipClose){
      gate.classList.add('hidden');
      setTimeout(()=>{ gate.style.display = 'none'; }, 650);
      document.body.classList.remove('lock-scroll');
    }
  }

  // Associa o clique em cada pílula à função de escolha de trilha
  document.querySelectorAll('.pill').forEach(p => {
    p.addEventListener('click', () => setPath(p.dataset.path));
  });

  /* ── RESTAURAÇÃO DA TRILHA SALVA ────────────────────────────────────── */
  // Se o usuário já visitou antes, pula a tela de entrada automaticamente
  let saved = null;
  try{ saved = localStorage.getItem('agrinho-path'); }catch(e){}

  if(saved === 'trad' || saved === 'tech'){
    setPath(saved, {skipClose: true});
    gate.classList.add('hidden');
    gate.style.display = 'none';
  } else {
    // Sem escolha salva: já entra direto no tema tecnológico (verde matrix)
    setPath('tech', {skipClose: true});
    gate.classList.add('hidden');
    gate.style.display = 'none';
    try{ localStorage.setItem('agrinho-path', 'tech'); }catch(e){}
  }

  /* ── MENU MOBILE (hambúrguer) ───────────────────────────────────────── */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  // Abre/fecha o menu ao clicar no botão hambúrguer
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // Fecha o menu ao clicar em qualquer link de navegação
  navLinks.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ── BARRA DE NAVEGAÇÃO: comportamento ao rolar ─────────────────────── */
  const nav     = document.getElementById('nav');
  const sections    = document.querySelectorAll('main .section');
  const navLinkEls  = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Adiciona fundo sólido à nav quando o usuário rola para baixo
    nav.classList.toggle('solid', window.scrollY > 40);

    // Destaca o link da seção atualmente visível na tela
    let current = sections[0].id;
    sections.forEach(s => {
      if(window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinkEls.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }, {passive: true}); // passive melhora a performance do scroll

  /* ── JOGO EDUCATIVO: Missão Fazenda Sustentável ─────────────────────── */
  const MAX_PONTOS = 150; // pontuação máxima por métrica (3 fases × ~50pts cada)
  let sustent = 0;        // pontos acumulados em sustentabilidade
  let lucro   = 0;        // pontos acumulados em lucratividade
  let escolhas = {1: null, 2: null, 3: null}; // armazena a escolha de cada fase

  const tabs  = document.querySelectorAll('.game-tab');
  const fases = document.querySelectorAll('.jogo-fase');

  // Exibe a fase/aba selecionada e oculta as demais
  function showFase(id){
    tabs.forEach(t  => t.classList.toggle('active',  t.dataset.fase  === id));
    fases.forEach(f => f.classList.toggle('active',  f.dataset.fase  === id));
  }

  // Permite navegar entre fases clicando nas abas
  tabs.forEach(t => t.addEventListener('click', () => showFase(t.dataset.fase)));

  // Atualiza as barras de progresso e valores numéricos na tela
  function updateBars(){
    const total = sustent + lucro;
    const pctS  = Math.max(0, Math.min(100, Math.round((sustent / MAX_PONTOS) * 100)));
    const pctL  = Math.max(0, Math.min(100, Math.round((lucro   / MAX_PONTOS) * 100)));
    const pctT  = Math.max(0, Math.min(100, Math.round((total   / (MAX_PONTOS * 2)) * 100)));

    document.getElementById('barSustent').style.width = pctS + '%';
    document.getElementById('barLucro').style.width   = pctL + '%';
    document.getElementById('barTotal').style.width   = pctT + '%';
    document.getElementById('valSustent').textContent = sustent;
    document.getElementById('valLucro').textContent   = lucro;
    document.getElementById('valTotal').textContent   = total;
  }

  // Registra a escolha do usuário em cada fase e avança automaticamente
  document.querySelectorAll('.jogo-opcao').forEach(btn => {
    btn.addEventListener('click', () => {
      const fase = btn.dataset.fase;
      const s    = parseInt(btn.dataset.sustent, 10);
      const l    = parseInt(btn.dataset.lucro,   10);

      // Desfaz a escolha anterior da mesma fase (permite rever)
      if(escolhas[fase]){
        sustent -= escolhas[fase].s;
        lucro   -= escolhas[fase].l;
      }

      // Aplica nova pontuação e registra a escolha
      sustent += s;
      lucro   += l;
      escolhas[fase] = {s, l};
      updateBars();

      // Marca visualmente a opção selecionada
      btn.closest('.jogo-opcoes').querySelectorAll('.jogo-opcao').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      // Avança para a próxima fase após 350ms (dá tempo de ver o feedback)
      const next = fase === '1' ? '2' : fase === '2' ? '3' : 'r';
      setTimeout(() => {
        showFase(next);
        if(next === 'r') showResult(); // última fase: exibe resultado
      }, 350);
    });
  });

  // Calcula e exibe o resultado final com mensagem contextualizada
  function showResult(){
    const total = sustent + lucro;
    const pct   = Math.round((total / (MAX_PONTOS * 2)) * 100);
    const box   = document.getElementById('resultadoFinal');
    let title, msg;

    if(pct >= 75){
      title = '🌍 Fazenda exemplar!';
      msg   = 'Suas escolhas equilibraram sustentabilidade e lucratividade — exatamente o tipo de equilíbrio que o tema "Agro forte, futuro sustentável" propõe.';
    } else if(pct >= 50){
      title = '🌱 Bom começo';
      msg   = 'Sua fazenda está no caminho certo, mas ainda há espaço para reduzir impactos ambientais sem perder competitividade.';
    } else {
      title = '⚠️ Fazenda em risco';
      msg   = 'As escolhas priorizaram custo imediato em detrimento do meio ambiente e/ou da produtividade. Tente novamente equilibrando os dois lados.';
    }

    box.innerHTML = `<h3>${title}</h3>
      <p>Pontuação final: <strong>${total} pts</strong>
      (Sustentabilidade: ${sustent}, Lucratividade: ${lucro})</p>
      <p style="margin-top:8px">${msg}</p>`;
  }

  // Reinicia o jogo zerando pontuação e voltando à fase 1
  document.getElementById('btnReiniciar').addEventListener('click', () => {
    sustent  = 0;
    lucro    = 0;
    escolhas = {1: null, 2: null, 3: null};
    updateBars();
    document.querySelectorAll('.jogo-opcao').forEach(b => b.classList.remove('selected'));
    document.getElementById('resultadoFinal').innerHTML =
      '<h3>Pronto para começar?</h3><p>Escolha uma opção em cada fase para ver o resultado final da sua fazenda.</p>';
    showFase('1');
  });

  /* ── FORMULÁRIO DE CONTATO (simulado, sem backend) ──────────────────── */
  document.getElementById('contactForm').addEventListener('submit', e => {
    e.preventDefault(); // impede o recarregamento da página
    document.getElementById('formStatus').textContent =
      '✓ Mensagem registrada localmente (este é um projeto educacional, sem envio real).';
    e.target.reset(); // limpa os campos após o envio
  });

  /* ── CHUVA DE CÓDIGO MATRIX (Canvas API) ────────────────────────────── */
  // Cria e gerencia a animação de binários caindo no canvas de fundo
  function startMatrixRain(canvas, opts){
    opts = opts || {};
    const ctx     = canvas.getContext('2d');
    const chars   = '01'; // apenas binário, tema tecnológico/Matrix
    let cols, drops, fontSize = opts.fontSize || 16;

    // Ajusta o canvas ao tamanho da janela e recalcula as colunas
    function resize(){
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      cols  = Math.floor(canvas.width / fontSize);
      drops = new Array(cols).fill(0).map(() => Math.random() * -canvas.height / fontSize);
    }
    resize();
    window.addEventListener('resize', resize);

    // Retorna a cor de destaque atual (muda com a trilha escolhida)
    function getAccent(){
      if(opts.color) return opts.color;
      return getComputedStyle(document.body).getPropertyValue('--acc').trim() || '#39ff8a';
    }

    // Renderiza um frame da chuva de binários
    function draw(){
      ctx.fillStyle = opts.trail || 'rgba(4,10,6,0.08)'; // rastro transparente cria efeito de fade
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font      = fontSize + 'px monospace';
      ctx.fillStyle = getAccent();

      for(let i = 0; i < drops.length; i++){
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        // Reseta a gota aleatoriamente quando sai da tela
        if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    }

    // Não anima se o usuário preferir menos movimento
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduceMotion) return;

    // Loop de animação com setTimeout para controlar FPS
    function loop(){ draw(); setTimeout(() => requestAnimationFrame(loop), opts.speed || 60); }
    loop();
  }

  // Inicia o canvas principal de fundo
  startMatrixRain(document.getElementById('matrixRain'));

  /* ── SCROLL REVEAL (IntersectionObserver) ───────────────────────────── */
  // Adiciona classe 'reveal' em elementos-chave para animação de entrada
  document.querySelectorAll('.section').forEach(sec => {
    sec.querySelectorAll('h2, .lede, .card, .obj-item, .tl-item, .stat, .ref-item, .compare, .game-shell, .contact-grid')
      .forEach((el, i) => {
        el.classList.add('reveal');
        el.style.setProperty('--i', i % 8); // índice para stagger delay no CSS
      });
  });

  // Observer que aciona a animação quando o elemento entra na viewport
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target); // anima apenas uma vez
      }
    });
  }, {threshold: 0.15, rootMargin: '0px 0px -40px 0px'});

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ── STAGGER NOS ITENS DA LISTA COMPARATIVA ─────────────────────────── */
  // Cada item da lista entra com um pequeno delay em sequência
  document.querySelectorAll('.compare-list li').forEach((li, i) => {
    li.style.setProperty('--i', i);
  });

  const compareObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.compare-list li').forEach(li => li.classList.add('in'));
        compareObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.2});

  document.querySelectorAll('.compare').forEach(el => compareObserver.observe(el));

  /* ── CONTADORES ANIMADOS NAS ESTATÍSTICAS ───────────────────────────── */
  // Quando a seção de stats entra na tela, os números sobem de 0 até o valor real
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10); // valor alvo (ex: 35)
      const dur    = 1200; // duração da animação em ms
      const start  = performance.now();

      function tick(now){
        const p      = Math.min(1, (now - start) / dur);
        const eased  = 1 - Math.pow(1 - p, 3); // ease-out cúbico
        el.textContent = Math.round(eased * target) + '%';
        if(p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, {threshold: 0.4});

  document.querySelectorAll('.stat-v[data-target]').forEach(el => counterObserver.observe(el));

  /* ── ILUSTRAÇÕES SVG: ativar animações no hover/click ───────────────── */
  // As animações SVG ficam pausadas (begin="indefinite") e só rodam
  // quando o usuário interage com a ilustração (hover ou clique)
  (function svgAnims(){
    // Coleta todos os elementos animate e animateTransform do SVG
    function getAnims(svgEl){
      return Array.from(svgEl.querySelectorAll('animate, animateTransform'));
    }

    // Inicia todas as animações do SVG
    function beginAll(anims){ anims.forEach(a => { try{ a.beginElement(); }catch(e){} }); }

    // Interrompe todas as animações do SVG
    function endAll(anims){   anims.forEach(a => { try{ a.endElement();   }catch(e){} }); }

    // Esconde/mostra o texto de dica dentro do SVG
    function hideHint(svg){ const h = svg.querySelector('[id$="Hint"]'); if(h) h.style.opacity = '0'; }
    function showHint(svg){ const h = svg.querySelector('[id$="Hint"]'); if(h) h.style.opacity = '';  }

    function setup(figure){
      const svg   = figure.querySelector('svg');
      if(!svg) return;
      const anims = getAnims(svg);
      let locked  = false; // true = animação travada pelo clique

      // Hover: inicia animações ao entrar com o mouse
      figure.addEventListener('mouseenter', () => { beginAll(anims); hideHint(svg); });

      // Sai com o mouse: para animação (a menos que esteja travada pelo clique)
      figure.addEventListener('mouseleave', () => {
        if(!locked){ endAll(anims); showHint(svg); }
      });

      // Clique: alterna entre travar e destravar a animação
      figure.addEventListener('click', () => {
        locked = !locked;
        if(locked){
          beginAll(anims); hideHint(svg);
          figure.style.boxShadow = '0 0 0 2px var(--acc)';
          figure.setAttribute('title', 'Clique novamente para pausar');
        } else {
          endAll(anims); showHint(svg);
          figure.style.boxShadow = '';
          figure.removeAttribute('title');
        }
      });

      // Acessibilidade: permite ativar pelo teclado (Tab + Enter ou Espaço)
      figure.setAttribute('tabindex', '0');
      figure.setAttribute('role', 'button');
      figure.setAttribute('aria-label', svg.querySelector('title')?.textContent || 'Ilustração animada');
      figure.addEventListener('keydown', e => {
        if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); figure.click(); }
      });
    }

    // Configura cada ilustração da seção hero
    document.querySelectorAll('.hero-visual').forEach(setup);
  })();

  /* ── PAINEL DE ACESSIBILIDADE ───────────────────────────────────────── */
  // Controla tamanho de texto, alto contraste, fonte para dislexia,
  // redução de animações e destaque de foco — tudo salvo em localStorage
  (function a11y(){
    const html        = document.documentElement;
    const panel       = document.getElementById('a11yPanel');
    const toggle      = document.getElementById('a11yToggle');
    const FS_CLASSES  = ['fs-1', 'fs-2', 'fs-3']; // classes de tamanho de fonte
    let fsLevel       = 0; // 0 = padrão, 1-3 = aumentado

    // Aplica o nível de fonte selecionado
    function applyFontSize(){
      html.classList.remove(...FS_CLASSES);
      if(fsLevel > 0) html.classList.add(FS_CLASSES[fsLevel - 1]);
      try{ localStorage.setItem('a11y-fs', fsLevel); }catch(e){}
    }

    // Atualiza o estado visual do botão de alternância
    function setSwitch(btn, on){
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.textContent = on ? 'Ativado' : 'Ativar';
    }

    // Alterna uma classe no body e salva a preferência
    function toggleBodyClass(cls, btn, storeKey){
      const on = !document.body.classList.contains(cls);
      document.body.classList.toggle(cls, on);
      setSwitch(btn, on);
      try{ localStorage.setItem(storeKey, on ? '1' : '0'); }catch(e){}
    }

    // Abre/fecha o painel de acessibilidade
    toggle.addEventListener('click', () => {
      const open = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Fecha o painel ao clicar fora dele
    document.addEventListener('click', e => {
      if(!document.getElementById('a11y').contains(e.target)){
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Botões de tamanho de fonte
    document.getElementById('fontInc').addEventListener('click',   () => { fsLevel = Math.min(3, fsLevel + 1); applyFontSize(); });
    document.getElementById('fontDec').addEventListener('click',   () => { fsLevel = Math.max(0, fsLevel - 1); applyFontSize(); });
    document.getElementById('fontReset').addEventListener('click', () => { fsLevel = 0; applyFontSize(); });

    // Botões de alternância para cada modo de acessibilidade
    const contrastBtn  = document.getElementById('toggleContrast');
    const dyslexicBtn  = document.getElementById('toggleDyslexic');
    const motionBtn    = document.getElementById('toggleMotion');
    const focusBtn     = document.getElementById('toggleFocus');

    contrastBtn.addEventListener('click',  () => toggleBodyClass('high-contrast',  contrastBtn,  'a11y-contrast'));
    dyslexicBtn.addEventListener('click',  () => toggleBodyClass('dyslexic-font',  dyslexicBtn,  'a11y-dyslexic'));
    motionBtn.addEventListener('click',    () => toggleBodyClass('reduce-motion',   motionBtn,    'a11y-motion'));
    focusBtn.addEventListener('click',     () => toggleBodyClass('strong-focus',    focusBtn,     'a11y-focus'));

    // Restaura todas as preferências ao padrão
    document.getElementById('a11yReset').addEventListener('click', () => {
      fsLevel = 0;
      applyFontSize();
      ['high-contrast', 'dyslexic-font', 'reduce-motion', 'strong-focus']
        .forEach(c => document.body.classList.remove(c));
      [contrastBtn, dyslexicBtn, motionBtn, focusBtn]
        .forEach(b => setSwitch(b, false));
      try{
        ['a11y-fs','a11y-contrast','a11y-dyslexic','a11y-motion','a11y-focus']
          .forEach(k => localStorage.removeItem(k));
      }catch(e){}
    });

    // Restaura preferências salvas ao carregar a página
    try{
      const savedFs = parseInt(localStorage.getItem('a11y-fs'), 10);
      if(!isNaN(savedFs) && savedFs > 0){ fsLevel = savedFs; applyFontSize(); }
      if(localStorage.getItem('a11y-contrast') === '1'){ document.body.classList.add('high-contrast');  setSwitch(contrastBtn,  true); }
      if(localStorage.getItem('a11y-dyslexic') === '1'){ document.body.classList.add('dyslexic-font');  setSwitch(dyslexicBtn,  true); }
      if(localStorage.getItem('a11y-motion')   === '1'){ document.body.classList.add('reduce-motion');  setSwitch(motionBtn,    true); }
      if(localStorage.getItem('a11y-focus')    === '1'){ document.body.classList.add('strong-focus');   setSwitch(focusBtn,     true); }
    }catch(e){}
  })();

})();