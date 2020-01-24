/*
* server.js
* Autor: Lucas Costa
* data: Novembro de 2019
*/
const $Express  = require ( 'express' );                                    // Depedencia Express
const $Path     = require ( 'path' );                                       // Dependencia Path
const $Cors     = require ( 'cors' );                                       // Dependencia CORS

const $app = {                                                              // Init app
    server: null,                                                           // Server node
    port: 80,                                                               // Porta web
    up: ( ) => {                                                            // Subir o servidor
        $app.server = $Express ( );                                         // Iniciar API express
        $app.server.use ( $Cors ( ) );                                      // Usar acesso a origem
        $app.server.use ( $Express.static ( $app.path (  "/public"  ) ) );        // Usar o caminho "/" como padrao
        $app.server.listen ( process.env.PORT || $app.port );               // Ouvir a porta 
    },
    get: ( $uri = "/", $callback ) => {                                     // Obter requisicao
        $app.server.get ( $uri, $callback );                                // Obter requisicao
    },
    resolve: ( $uri = "/", $file = "index.html" ) => {                      // Resolver a URI
        $app.get ( $uri,  ( $req, $res ) => {                               // Obter uma requisicao
            $res.sendFile ( $app.path ( $file ) );                          // Carregar o arquivo de resposta
        } ); 
    },
    path: ( $file = "/" ) => {                                              // transforma em path
        return $Path.join ( __dirname + "/" + $file );                      // retirnart um caminho válido
    },
};

$app.up ( );                                                                // subir o servidor
//$app.resolve ( "/sign", "sign.html" );                                    // resolver uri
