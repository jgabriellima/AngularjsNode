angular.module('agendajs', ['ui.directives']).
        config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {
            controller: agendaController,
            templateUrl: 'form'
        }).
                when('/descricao', {
            controller: descricaoController,
            templateUrl: 'desc'
        }).otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }]);

function agendaController($scope, $window, $http) {

    $scope.agendas = [];
    init = function() {
        $http.get('/agendas').success(function(data) {
            $scope.agendas = data;
            console.log($scope.agendas);    
        });
    }();

    $scope.inserir = function() {
        console.log($scope.agenda);
        if (angular.isUndefined($scope.agenda._id)) {
            var agenda = angular.toJson({agenda: $scope.agenda});
            $http.post('agendas', agenda).success(function(data) {
                $scope.agendas.unshift(data);
                reset();
            });
//            $scope.agendas.push($scope.agenda);
        } else {
            $scope.atualizar();
        }
    };

    $scope.atualizar = function() {
        var url = '/agendas/' + $scope.agenda._id;
        var agenda = angular.toJson({agenda: $scope.agenda});
        $http.put(url, agenda).success(function(data) {
            reset();
        });
    };

    $scope.deletar = function(agenda) {
        var confirm = $window.confirm('Deseja remover o contato ' + agenda.nome + '?');
        if (confirm) {
            var url = '/agendas/' + agenda._id;
            $http.delete(url).success(function(data) {
                var index = $scope.agendas.indexOf(agenda);
                $scope.agendas.splice(index, 1);
            });
        }
    };

    $scope.editar = function(agenda) {
        $scope.agenda = agenda;
    };

    var reset = function() {
        $scope.agenda = {id: 0, nome: "", email: "", telefone: "", celular: "", descricao: ""};
    };
}

function descricaoController($scope, $window, $http) {

}