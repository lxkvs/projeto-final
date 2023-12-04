
var app = angular.module('blog', ['ngRoute'])
var Carregado = false


app.directive("popevent",function(){
  return {
    template:`
    <div class="pop-over">
        <h1>{{PopOverAlert[0]}}</h1>
        <p>{{PopOverAlert[1]}}</p>
        <button id='FecharPopOver'>Fechar</button>
    </div>
    `
  }
})


//Criação de suas controllers
app.controller("home", function ($scope) {
    $scope.nome = "artigos";
});

app.controller("leitura", function ($scope, $http, $route) {
    //Variaveis importantes
    $scope.ArtigoAtual = $route.current.params.art;
    $scope.ArtigoCarregado = "";
    $scope.Sugeridos = [];

    //Lendo o arquivo para carregar o Artigo
    var Artigo_Carregdo = $http
        .get("../data/artigos.json")
        .then(function (response) {
            response.data.forEach((element) => {
                if (element.id == $scope.ArtigoAtual) {
                    $scope.ArtigoCarregado = element;
                }
            });
        });

    //Lendo o Arquivo para carregar Artigos Sugeridos
    var Artigo_Carregdo = $http
        .get("../data/artigos.json")
        .then(function (response) {
            response.data.forEach((element) => {
                //Identificar quais artigos tem assuntos semelhantes e fazer o seu retorno
                if ($scope.ArtigoCarregado.Assunto == element.Assunto) {
                    $scope.Sugeridos.push(element);
                }
            });
        });
});

app.controller("artigo", function ($scope, $http) {
    //Funcao de clique
    $scope.teste = function (TituloArtigo) {
        alert(TituloArtigo);
    };

    // Lista para armazenar o Json
    $scope.Lista_Add = [];
    // Ler o Json criado
    var Lista_ler = $http.get("../data/artigos.json").then(function (response) {
        response.data.forEach((element) => {
            //Adicionando os elementos do Json para a Lista
            $scope.Lista_Add.push(element);
        });
    });
});
  //Lendo o Arquivo para carregar Artigos Sugeridos
  var Artigo_Carregdo = $http.get("../data/artigos.json")
  .then(function(response){   
    response.data.forEach(element =>{
      //Identificar quais artigos tem assuntos semelhantes e fazer o seu retorno 
      if($scope.ArtigoCarregado.Assunto == element.Assunto){
        $scope.Sugeridos.push(element)
      }
    })
  })
})


app.controller('artigo', function ($scope, $http) {
  $scope.PopOverAlert =["Artigos arquivados","Posts com mais de 1 ano sem atividade foram arquivados!"]
  //Funcao de clique
  $scope.teste = function (TituloArtigo) {
    alert(TituloArtigo)
  }
  document.getElementById('FecharPopOver').addEventListener("click",()=>{
    document.getElementsByClassName("pop-over")[0].classList+=" move_pop"
    let a = setInterval(() => {
      document.getElementsByClassName("pop-over")[0].remove()
      clearInterval(a)
    }, 2000);
})

  // Lista para armazenar o Json
  $scope.Lista_Add = []
  // Ler o Json criado
  var Lista_ler = $http.get("../data/artigos.json")
    .then(function (response) {
      response.data.forEach(element => {
        //Adicionando os elementos do Json para a Lista
        $scope.Lista_Add.push(element)
      });

    })

})

//Criação de suas controllers
app.controller("artigos_base", function ($scope, $http) {
    $scope.ListaArtigos = [];

  var Artigo_Carregdo = $http.get("../data/artigos.json")
  .then(function(response){
    response.data.forEach(element =>{
      $scope.ListaArtigos.push(element)
      console.log(element)
    })
  })

  //Remover o Anuncio inicial no Blog
  if(Carregado == true){
    document.getElementsByClassName("mini_screen")[0].remove()
    document.getElementsByClassName("Black_screen")[0].remove()
  }
  $scope.CloseFunc = function () {
    document.getElementsByClassName("mini_screen")[0].remove()
    document.getElementsByClassName("Black_screen")[0].remove()
    Carregado = true
  }
  document.addEventListener("keydown",(e)=>{
    if(e.key == 'Escape'){
      document.getElementsByClassName("mini_screen")[0].remove()
      document.getElementsByClassName("Black_screen")[0].remove()
      Carregado = true
    }
  })
});

//Configuração de criação de Rotas
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./templates/main.html",
            controller: "artigos_base",
        })
        .when("/artigos", {
            templateUrl: "./templates/artigos.html",
            controller: "artigo",
        })
        .when("/leitura/:art", {
            templateUrl: "./templates/leitura.html",
            controller: "leitura",
        })
        .when("/sobre", {
            templateUrl: "./templates/sobre.html"
        });
});

const nome = document.getElementById('nome');

nome.addEventListener('mouseenter', ()=> {
nome.textContent = 'LFootball';
});

nome.addEventListener('mouseleave',()=>{
    nome.textContent = 'LF';
});