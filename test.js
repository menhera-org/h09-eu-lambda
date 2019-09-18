// -*- tab-width: 4; indent-tabs-mode: t -*-
// vim: ts=4 noet ai

const {html} = require ('./html.js');
const {parse_query} = require ('./query.js');

console.log (parse_query ('a=1&b=1&b=2'));

console.log (html `<!doctype html>
<meta charset='utf-8'/>
<title>H09.EU</title>
<p>Generated: ${(new Date).toISOString ()}</p>`);

