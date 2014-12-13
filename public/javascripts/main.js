function parseQueryString(queryString){
      var targetObject = {};
      if(queryString){
        var decodedQueryStringParams = decodeURI(queryString).split(/&/g);
        _.each(
            _.map(decodedQueryStringParams, function(keyValueString){
                var keyAndValue = keyValueString.split('='), yeOldeTempObject = {};
                if(keyAndValue.length >= 1){
                    var val = undefined;
                    if(keyAndValue.length == 2)
                        val = keyAndValue[1].split(',');
                    yeOldeTempObject[keyAndValue[0]] = val;
                }
                return yeOldeTempObject;
            }),
            function(obj){
                _.extend(targetObject, obj);
            }
        );
    }
    return targetObject;
}

$(function(){
    var playerCollection = new PlayerCollection();
    var router;
    router = new Router({
        collection: playerCollection,
        $el: $('.content')
    });

    Backbone.history.start();
});