bookApp.filter('paragraph', function(){
    return function(input){
        return(input) ? input.replace(/[\s]/g, '<br />') : input;
    };
});

bookApp.filter('sub', function(){
    return function(input){
        return(input) ? input.replace(/[\s]/g, '-') : input;
    };
});


bookApp.filter('myTruncate', function () {
    return function (input, limit){
        return (input.length > limit) ? input.substr(0,limit)+'...' : input;
    }
});