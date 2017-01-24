bookApp.factory('contact_service',function()
{   
    var contacts = [
        {
            name: 'qwe',
            phone: '1111111',
            email: 'asd@asdasd.it',
            info: 'una parola  ancora'
        },
        {
            name: 'rty',
            phone: '222222',
            email: 'ewq@ewq.it',
            info: 'una parola ancora'
        },
        {
            name: 'asdasd',
            phone: '44444444',
            email: 'uio@ewq.it',
            info: 'una parola ancora'
        },
        {
            name: 'fghfgh',
            phone: '5555555',
            email: 'uyt@ewq.it',
            info: 'una parola ancora'
        },
        {
            name: 'zxczxc',
            phone: '66666666',
            email: 'hg@asdasd.it',
            info: 'una parola ancora'
        }
    ];
    
    return {
        get: function(){
            return contacts;
        },
        find: function(index){
            return contacts[index];
        },
        create: function(contact){
            contacts.push(contact);
        },
        destroy: function(index){
            contacts.splice(index, 1);
        }
    }
    
    
});

bookApp.value('author','andrea');


bookApp.factory('myContacts_service', function($resource){

    var Resource = $resource('http://localhost/public/contacts/:id', {id: '@id'}, {
        
         // questi sono quelli che sono già presenti in $resource
         // get: {method: 'GET'}
         // save: {method: 'POST'}
         // query: {method: 'GET', isArray:true}
         // remove: {method: 'DELETE'}
         // delete: {method: 'DELETE'}
         
        update: {method: 'PUT'}
    });
    
   
    return {
        get: function(){
            return Resource.query();
        },
        find: function(id){
            return Resource.get({id: id});
        },
        create: function(){
            return new Resource();
        },
        destroy: function(id){
            Resource.delete({id: id})
        }
    };
})

bookApp.factory('Firebase_service', function($resource, $firebaseObject, firebase, $firebaseArray){
    
    //##########################################################################
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyDi3qDZ_T6aLiULrfrUengISgHRhY13rcI",
      authDomain: "hello-cee9b.firebaseapp.com",
      databaseURL: "https://hello-cee9b.firebaseio.com/",
      storageBucket: "hello-cee9b.appspot.com",
      messagingSenderId: "54744649217"
    };
    firebase.initializeApp(config);
   

    //const rootRef = firebase.database().ref().child('nome Child');
    //const ref = rootRef.child('object');
    //this.object = $firebaseObject(rootRef);
    const rootRef = firebase.database().ref();
    const newRootRef = firebase.database();
    var sync = $firebaseArray(rootRef);
    

    //##########################################################################
    
   
    return {
        all: function() {
            return sync;
        },
        destroy: function(index){
            sync.$remove(index);
        },
        add: function(element){
            sync.$add({
                name: element.name,
                phone: element.phone,
                email: element.email
            });           
        },
        find: function(id){
            const rootRefFind = firebase.database().ref().child(id);
            sync = $firebaseObject(rootRefFind);
            return sync;

        },
        upadate: function(contatto, id){
            var rootRefUpdate = firebase.database().ref().child(id);
            sync = $firebaseObject(rootRefUpdate);
            sync.name = contatto.name;
            sync.phone = contatto.phone;
            sync.email = contatto.email;
            sync.$save();        
        }
    };
})