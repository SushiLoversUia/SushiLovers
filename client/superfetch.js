function superfetch(url, type, success, fail, settings) {    
    

    fetch(url, settings).then(function(response){
            //1. stage
            
        if (response.ok) {
            
            if (type == "json") {
                return response.json();
            }
            else if (type == "text") {
                return response.text();
            }            
            
        } else {
            throw new Error("something went wrong!");
        }

    }).then(function(data){
        // 2. stage

        success(data);

    }).catch(function(error){

        fail(error);

    }); //end fetch
}