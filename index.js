const html = (literals, ...vars) => {
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

exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const json = JSON.stringify(request, null, 4);
    const host = (((request.headers["x-menhera-orig-host"] || [])[0] || {}).value || '').trim ();
    const query_string = ((request.headers["x-menhera-query-string"] || [])[0] || {}).value || '';
    const user_agent = ((request.headers["x-menhera-user-agent"] || [])[0] || {}).value || '';
    const client_ip = ((request.headers["x-menhera-client-ip"] || [])[0] || {}).value || '';
    
    const matches = host.match (/^([^.]+)\.h09\.eu$/);
    const name = '' + ((matches || [])[1] || '');
    
    const response = {
        status: '503',
        statusDescription: 'Service Unavailable',
        headers: {
            "content-security-policy": [{
                key: 'content-security-policy',
                value: "sandbox; default-src 'none'; base-uri 'none'; form-action https://*.h09.eu; frame-ancestors 'none'; upgrade-insecure-requests",
            }],
            "content-type": [{
                key: 'content-type',
                value: 'text/html',
            }],
            "cache-control": [{
                key: 'cache-control',
                value: 'max-age=0, must-revalidate, proxy-revalidate, no-transform',
            }],
            "x-content-type-options": [{
                key: 'x-content-type-options',
                value: 'nosniff',
            }],
            "strict-transport-security": [{
                key: 'strict-transport-security',
                value: 'max-age=63072000; includeSubDomains; preload',
            }],
            "x-xss-protection": [{
                key: 'x-xss-protection',
                value: '0',
            }],
            "referrer-policy": [{
                key: 'referrer-policy',
                value: 'no-referrer',
            }],
            "server": [{
                key: 'server',
                value: 'Warp (Menhera.org)',
            }],
        },
        bodyEncoding: 'text',
        body:
html `<!doctype html>
<meta charset='utf-8'/>
<title>H09.EU</title>
<h1>Service Unavailable</h1>
<p>Generated: ${(new Date).toISOString ()}</p>
<p>Host: ${host}</p>
<p>Hostname: ${name}</p>
<p>User agent: ${user_agent}</p>
<p>REQUEST_URI: ${request.uri}</p>
<p>QUERY_STRING: ${query_string}</p>
<p>REMOTE_ADDR: ${client_ip}</p>
<pre>${json}</pre>`
    };
    callback(null, response);
    
    return request;
};
