// -*- tab-width: 4; indent-tabs-mode: t -*-
// vim: ts=4 noet ai

const {html} = require ('./html.js');

console.log (html `<!doctype html>
<meta charset='utf-8'/>
<title>H09.EU</title>
<p>Generated: ${(new Date).toISOString ()}</p>`);

