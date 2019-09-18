// -*- tab-width: 4; indent-tabs-mode: t -*-
// vim: ts=4 noet ai

exports.html = (literals, ...vars) => {
  const raw = literals.raw;
  let result = '';
  
  for (let i = 0; i < vars.length; i++) {
    let variable = vars[i] + '';
    variable = variable.replace (/&/g, '&amp;');
    variable = variable.replace (/</g, '&lt;');
    variable = variable.replace (/>/g, '&gt;');
    variable = variable.replace (/"/g, '&quot;');
    variable = variable.replace (/'/g, '&apos;');
    result += raw[i] + variable;
  }
  result += raw[raw.length - 1];
  return result;
};


