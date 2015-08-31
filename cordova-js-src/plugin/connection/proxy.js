var cordova = require('cordova');
var Connection = require('cordova/plugin/Connection');
var OrsayActiveConnectionType = {
    WIFI : 0,
    ETHERNET : 1
}

module.exports = {
    getConnectionInfo: function(successCallback, errorCallback) {
        var networkType = Connection.NONE;
        webapis.network.getAvailableNetworks(function(networkList){
            for( var i = 0; i < networkList.length; i++ ) {
                if(networkList[i].isActive) {
                    if(networkList[i].interfaceType == OrsayActiveConnectionType.WIFI){
                        networkType = Connection.WIFI
                    } else if(networkList[i].interfaceType == OrsayActiveConnectionType.ETHERNET) {
                        networkType = Connection.ETHERNET
                    } else {
                        networkType = Connection.UNKNOWN
                    }
                    successCallback(networkType);
                }
            }
        },function(){
            networkType = Connection.NONE;
            successCallback(networkType);
        })
    }
};

require("cordova/exec/proxy").add("NetworkStatus", module.exports);