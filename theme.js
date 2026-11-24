(() => {
  'use strict';
  const themes=['gold','purple','blue','white'];
  const names={gold:'Gold',purple:'Space Purple',blue:'Royal Blue',white:'Golden White'};
  let previous='';
  try {previous=sessionStorage.getItem('mlzar-last-colour')||'';} catch (_) {}
  const choices=themes.filter(t=>t!==previous);
  const random=new Uint32Array(1);
  if(globalThis.crypto?.getRandomValues)crypto.getRandomValues(random);
  else random[0]=Math.floor(Math.random()*0xffffffff);
  let current=choices[random[0]%choices.length];
  document.documentElement.dataset.theme=current;
  try {sessionStorage.setItem('mlzar-last-colour',current);} catch (_) {}
  function apply(colour){
    if(!themes.includes(colour))return;
    current=colour;document.documentElement.dataset.theme=colour;
    document.querySelectorAll('[data-colour]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.colour===colour)));
    const label=document.getElementById('colour-name');if(label)label.textContent=names[colour];
  }
  document.addEventListener('DOMContentLoaded',()=>{
    apply(current);
    document.querySelectorAll('[data-colour]').forEach(button=>button.addEventListener('click',()=>apply(button.dataset.colour)));
  });
})();
