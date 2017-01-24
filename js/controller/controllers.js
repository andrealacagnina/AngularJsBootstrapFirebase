//funziona solo nella parziale ..partials/index.htnl
bookApp.controller('indexCrl', function($scope, $routeParams, /*contact_service*/ myContacts_service, author, Firebase_service)
{
    /*
    $scope.index_contacts = contact_service.get();
    //questo author è un valore scritto dentro services.js ed è un componente value richiamabile ovunque
    $scope.autore = author;      
    
    $scope.delete = function(index){
        contact_service.destroy(index);
    };
    */
   
    //Firebase 
    $scope.allElem = Firebase_service.all();

    $scope.deleteItem = function(id){
        Firebase_service.destroy(id);
        console.log(id);
    }
    
    
    
    //LocalHost
    $scope.autore = author;
    $scope.index_contacts = myContacts_service.get();
    
    $scope.delete = function(index){
        myContacts_service.destroy($scope.index_contacts[index].id);
        $scope.index_contacts.splice(index,1);
        //splice si può usare per rimuovere ed aggiungere elementi in un array
        //splice(index, quanti ne vui eleiminare da index in poi, elemento/i da aggiungere (posoono essere 
        //quanto ne servono...)
    };
    
   
});

//funziona solo nella parziale ..partials/contact.html
bookApp.controller('contactCrl', function($scope, $routeParams, /*contact_service*/ myContacts_service, $timeout, Firebase_service)
{    
    /*
    $scope.id = $routeParams.id;
    $scope.contact = contact_service.find($routeParams.id);
    */
    $scope.id = $routeParams.id;
    $scope.contact = myContacts_service.find($routeParams.id);
    
    //La direttiva 'editable' con $emit emette "saved". Questo viene letto dal listener che credo sia proprio
    //$on. Il listener seguirà il metodo $update sul modello contact. Tuttavia siccome l'evento viene emesso 
    //prima che il modello abbia concluso la'ggiornamento, dobbiamo spingerlo alla fine dello stack e della
    //coda corrente. Per fare ciò utilizzeremo il servizio timeout di angular
    $scope.$on('saved', function(){
        $timeout(function(){
            $scope.contact.$update();
        }, 0);
    });
    
    
    //Firebase
    $scope.contact = Firebase_service.find($routeParams.id);
    //Firebase
    $scope.$on('Firebase_saved', function(){
        $timeout(function(){
            Firebase_service.upadate($scope.contact, $scope.id);
        }, 0);
    });
    

});

//funziona nell'intera app perché richiamato nella radice index.html
bookApp.controller('appCtl', function($scope, $location)
{    
    $scope.startSearch = function(){
        $location.path('/');
    };   
    
    $scope.pageClass = function(path){
        return (path == $location.path()) ? 'active' : '';
    }

});


bookApp.controller('addCtr', function($scope, /*contact_service*/ myContacts_service, Firebase_service)
{    
    /*
    $scope.myTxt = "You have not yet added this contact";
    
    $scope.submit = function(){
        $scope.myTxt = "You added this contact!";
        
        contact_service.create($scope.add_contact);
        $scope.add_contact = null;
        $scope.added = true;
    }
    */
   
   
    //Localhost e Firebase
    $scope.myTxt = "You have not yet added this contact";
    $scope.add_contact = myContacts_service.create();
    
    //Solo Firebase
    var addFirebaseContact = $scope.add_contact;
    
    $scope.submit = function(){
        $scope.myTxt = "You added this contact!";
        
        $scope.add_contact.$save();
        $scope.add_contact = myContacts_service.create();
        
        //Solo Firebase
        Firebase_service.add(addFirebaseContact);
        
    }
   
});

