const Fastify = require('fastify');
const fastify_http_proxy = require('fastify-http-proxy')
const path = require('path')
//const server = Fastify();

// server.register(require('fastify-cors'), { origin: '*' });
// server2.register(require('fastify-cors'), { origin: '*' });

// server.register(require('fastify-cors'), {
//    origin: /\*/,
//    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
//    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
// })

// server2.register(require('fastify-cors'), {
//    origin: /\*/,
//    allowedHeaders: ['Origin', 'X-Requested-With', 'Accept', 'Content-Type', 'Authorization'],
//    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE']
// })


// server.register(require('fastify-static'), {
//   root: path.join(__dirname, 'public'),
//   prefix: '/public', // optional: default '/'
// })

// server.register(require('fastify-http-proxy'), {
//   upstream: 'https://www.google.com/',
//   prefix: '/', // optional
//   http2: false, // optional
//   replyOptions: {
//     rewriteHeaders: (headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*', 'X-Frame-Options': 'allow-from http://localhost:3333/'}),
//     //rewriteRequestHeaders: (originalReq, headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*', 'X-Frame-Options': 'allow-from http://localhost:3333/'})
//   }
// });

// server.register(require('fastify-http-proxy'), {
//   upstream: 'https://papago.naver.com',
//   prefix: '/papago', // optional
//   http2: false // optional
// });

//server.listen(3333);

var servers_to_proxy = [
  ['https://translate.google.com', 3334],
  ['https://www.google.com', 3333],
  ['https://www.linguee.com/', 3336],
  ['https://fanyi.sogou.com/', 3337],
  ['https://fanyi.baidu.com/', 3338],
  ['https://papago.naver.com/', 3339],
  ['https://www.deepl.com/', 3340],
  ['https://www.bing.com/', 3341],
  ['https://translate.yandex.com/', 3342],
];

for (var [upstream_url, target_port] of servers_to_proxy) {
  var server_to_proxy = Fastify();

  server_to_proxy.register(fastify_http_proxy, {
    upstream: upstream_url,
    //upstream: 'https://www.deepl.com/translator',
    prefix: '/', // optional
    http2: false, // optional
    replyOptions: {
    //  rewriteHeaders: (headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*'}),
      rewriteHeaders: (headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*', 'X-Frame-Options': 'allow-from http://localhost:8880/'}),
    //  rewriteRequestHeaders: (originalReq, headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*'}),
      //rewriteRequestHeaders: (originalReq, headers) => ({...headers, 'Access-Control-Allow-Methods': 'GET, HEAD', 'Access-Control-Allow-Origin': '*', 'X-Frame-Options': 'allow-from http://localhost:3333/'})
    }
  });

  server_to_proxy.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public', // optional: default '/'
  })

  server_to_proxy.listen(target_port);
}
