
const {html} = require ('./html.js');
const {parse_query} = require ('./query.js');

const get_value = values => ((values || [])[0] || {}).value || '';

exports.handler = async (event, context, callback) => {
    const request = event.Records[0].cf.request;
    const json = JSON.stringify (request, null, 4);
    const host = get_value (request.headers["x-menhera-orig-host"]).trim ();
    const query_string = get_value (request.headers["x-menhera-query-string"]);
    const user_agent = get_value (request.headers["x-menhera-user-agent"]);
    const client_ip = get_value (request.headers["x-menhera-client-ip"]);
    
    const matches = host.match (/^([^.]+)\.h09\.eu$/);
    const name = '' + ((matches || [])[1] || '');
    
    const csp = "sandbox; default-src 'none'; base-uri 'none'; form-action https://*.h09.eu; frame-ancestors 'none'; upgrade-insecure-requests";
    const content_type = 'text/html';
    
    const post_params = parse_query (Buffer.from (request.body.data, 'base64').toString ());
    const query_params = parse_query (request.querystring);
    
    const body = html `<!doctype html>
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
<pre>${JSON.stringify (query_params, null, 4)}</pre>
<pre>${JSON.stringify (post_params, null, 4)}</pre>
<pre>${json}</pre>
<form method='GET' action='/'>
<label>text: <input type='text' name='text'/></label>
<button>Submit (GET)</button>
</form>
<form method='POST' action='/'>
<label>text: <input type='text' name='text'/></label>
<button>Submit (POST)</button>
</form>`;
    
    const response = {
        status: '503',
        statusDescription: 'Service Unavailable',
        headers: {
            "content-security-policy": [{
                key: 'content-security-policy',
                value: csp,
            }],
            "content-type": [{
                key: 'content-type',
                value: content_type,
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
        body: body,
    };
    callback(null, response);
    
    return request;
};
