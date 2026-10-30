const menu = document.querySelector('.menu');
const navigation = document.getElementById('navigation');
if (menu && navigation) {
  const closeMenu = () => {
    navigation.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  };
  menu.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => {
    if (!navigation.contains(event.target) && !menu.contains(event.target)) closeMenu();
  });
}

const diagnoses = {
  ctr: {
    title: 'Creative & Message Match',
    copy: 'Refine audience hooks and ad formats. Ensure creative promises directly align with the landing page value proposition.',
    test: 'A/B test distinct creative angles (UGC vs. motion graphics) while holding landing page variables constant.',
    tag: '01 / Attention → intent'
  },
  landing: {
    title: 'Landing Experience & Offer Clarity',
    copy: 'Optimize mobile load speeds, simplify UI interactions, and refine CTA clarity to eliminate drop-offs before the partner offer page.',
    test: 'Test an interactive quiz vs. a direct advertorial to shorten the conversion path and boost user engagement.',
    tag: '02 / Intent → action'
  },
  quality: {
    title: 'Offer Terms & Conversion Quality',
    copy: 'Audit traffic quality, demographic targeting, and postback sync with the affiliate manager to resolve rejection causes.',
    test: 'Tighten audience exclusion lists and pre-qualify users via pre-lander copy to deliver higher-grade traffic.',
    tag: '03 / Action → approval'
  }
};
const tabs = Array.from(document.querySelectorAll('[role="tab"][data-signal]'));
function selectSignal(tab) {
  const diagnosis = diagnoses[tab.dataset.signal];
  tabs.forEach(item => {
    const selected = item === tab;
    item.classList.toggle('active', selected);
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.getElementById('diagnosis').setAttribute('aria-labelledby', tab.id);
  document.getElementById('readout-title').textContent = diagnosis.title;
  document.getElementById('readout-copy').textContent = diagnosis.copy;
  document.getElementById('readout-test').textContent = diagnosis.test;
  document.getElementById('readout-tag').textContent = diagnosis.tag;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSignal(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectSignal(tabs[next]);
    tabs[next].focus();
  });
});
