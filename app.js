"use strict";

var map, layer;
require({
    packages: [{
        name: "sample",
        location: location.pathname.replace(/\/[^/]+$/, "")
    }]
}, [
    "dojo/query",
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/Deferred",
    "dojo/number",
    "dojo/promise/all",
    "dojo/store/Memory",
    "dojo/data/ObjectStore",
    "esri/graphicsUtils",
    "esri/map",
    "esri/tasks/locationproviders/StandardGeographyQueryLocationProvider",
    "esri/layers/DataAdapterFeatureLayer",
    "esri/tasks/geoenrichment/StandardGeographyQueryTask",
    "esri/tasks/QueryTask",
    "esri/urlUtils",
    "esri/renderers/SimpleRenderer",
    "esri/Color",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/IdentityManager",
    "dojo/domReady!"
], function(
    query,
    declare,
    array,
    Deferred,
    number,
    all,
    Memory,
    ObjectStore,
    graphicsUtils,
    Map,
    StandardGeographyQueryLocationProvider,
    DataAdapterFeatureLayer,
    StandardGeographyQueryTask,
    QueryTask,
    urlUtils,
    SimpleRenderer,
    Color,
    SimpleFillSymbol,
    SimpleLineSymbol
) {


    var SEDataAdapter = {
        getTableInfo: function(tableId){
            //Return metadata for table based on the passed tableId
            var deferred = new Deferred();
            if (tableId == "US_States") {
                deferred.resolve({
                    label: "US_States",
                    idField: "OBJECTID",
                    fields: [{"index": 0, "type": "esriFieldTypeOID", "name": "OBJECTID", "label": "OBJECTID"}, {"index": 1, "type": "esriFieldTypeString", "name": "STATE_ABBR", "label": "STATE_ABBR"}, {"index": 2, "type": "esriFieldTypeDouble", "name": "PRIPUBRT", "label": "PRIPUBRT"}]
                });
            } else {
                deferred.error("Table not found!");
            }
            return deferred.promise;
        },

        getTables: function (){
            //return an array of Tables...
            var tables = [{
                id: "US_States",
                label: "US_States"
            }];
            var deferred = new Deferred();
            deferred.resolve(tables);

            return deferred.promise;
        },

        query: function (options) {
            //options Object contains tableId that should queried and outFields that query should return
            // { tableId: "SalesList",
            //   outFields: ["Customer Name", "Address", "Order Qty", "Total Sales"]
            // }
            var deferred = new Deferred();
            if (options.tableId == "US_States"){
                deferred.resolve({
                    features: [{"attributes": {"PRIPUBRT": 0.13076923076923078, "STATE_ABBR": "SC", "OBJECTID": 1}}, {"attributes": {"PRIPUBRT": 0.20714285714285716, "STATE_ABBR": "PA", "OBJECTID": 2}}, {"attributes": {"PRIPUBRT": 0.09443339960238568, "STATE_ABBR": "TX", "OBJECTID": 3}}, {"attributes": {"PRIPUBRT": 0.1, "STATE_ABBR": "VT", "OBJECTID": 4}}, {"attributes": {"PRIPUBRT": 0.12280701754385964, "STATE_ABBR": "UT", "OBJECTID": 5}}, {"attributes": {"PRIPUBRT": 0.12437810945273632, "STATE_ABBR": "NV", "OBJECTID": 6}}, {"attributes": {"PRIPUBRT": 0.1566265060240964, "STATE_ABBR": "WA", "OBJECTID": 7}}, {"attributes": {"PRIPUBRT": 0.10112359550561797, "STATE_ABBR": "MD", "OBJECTID": 8}}, {"attributes": {"PRIPUBRT": 0.0979020979020979, "STATE_ABBR": "MA", "OBJECTID": 9}}, {"attributes": {"PRIPUBRT": 0.21630094043887146, "STATE_ABBR": "MI", "OBJECTID": 10}}, {"attributes": {"PRIPUBRT": 0.09505703422053231, "STATE_ABBR": "AL", "OBJECTID": 11}}, {"attributes": {"PRIPUBRT": 0.1092032967032967, "STATE_ABBR": "CA", "OBJECTID": 12}}, {"attributes": {"PRIPUBRT": 0.1735159817351598, "STATE_ABBR": "KY", "OBJECTID": 13}}, {"attributes": {"PRIPUBRT": 0.22888283378746593, "STATE_ABBR": "LA", "OBJECTID": 14}}, {"attributes": {"PRIPUBRT": 0.08053691275167785, "STATE_ABBR": "ME", "OBJECTID": 15}}, {"attributes": {"PRIPUBRT": 0.11403508771929824, "STATE_ABBR": "SD", "OBJECTID": 16}}, {"attributes": {"PRIPUBRT": 0.12411347517730496, "STATE_ABBR": "TN", "OBJECTID": 17}}, {"attributes": {"PRIPUBRT": 0.06153846153846154, "STATE_ABBR": "RI", "OBJECTID": 18}}, {"attributes": {"PRIPUBRT": 0.20149253731343283, "STATE_ABBR": "CT", "OBJECTID": 19}}, {"attributes": {"PRIPUBRT": 0.11538461538461539, "STATE_ABBR": "MS", "OBJECTID": 20}}, {"attributes": {"PRIPUBRT": 0.12307692307692308, "STATE_ABBR": "MO", "OBJECTID": 21}}, {"attributes": {"PRIPUBRT": 0.08741258741258741, "STATE_ABBR": "OK", "OBJECTID": 22}}, {"attributes": {"PRIPUBRT": 0.11814345991561181, "STATE_ABBR": "OR", "OBJECTID": 23}}, {"attributes": {"PRIPUBRT": 0.14696485623003194, "STATE_ABBR": "VA", "OBJECTID": 24}}, {"attributes": {"PRIPUBRT": 0.055762081784386616, "STATE_ABBR": "AK", "OBJECTID": 25}}, {"attributes": {"PRIPUBRT": 0.10144927536231885, "STATE_ABBR": "WY", "OBJECTID": 26}}, {"attributes": {"PRIPUBRT": 0.15458937198067632, "STATE_ABBR": "OH", "OBJECTID": 27}}, {"attributes": {"PRIPUBRT": 0.10628019323671498, "STATE_ABBR": "MN", "OBJECTID": 28}}, {"attributes": {"PRIPUBRT": 0.12461059190031153, "STATE_ABBR": "MT", "OBJECTID": 29}}, {"attributes": {"PRIPUBRT": 0.13270142180094788, "STATE_ABBR": "KS", "OBJECTID": 30}}, {"attributes": {"PRIPUBRT": 0.18604651162790697, "STATE_ABBR": "ND", "OBJECTID": 31}}, {"attributes": {"PRIPUBRT": 0.17714285714285713, "STATE_ABBR": "DC", "OBJECTID": 32}}, {"attributes": {"PRIPUBRT": 0.13157894736842105, "STATE_ABBR": "DE", "OBJECTID": 33}}, {"attributes": {"PRIPUBRT": 0.11027568922305764, "STATE_ABBR": "GA", "OBJECTID": 34}}, {"attributes": {"PRIPUBRT": 0.1532258064516129, "STATE_ABBR": "FL", "OBJECTID": 35}}, {"attributes": {"PRIPUBRT": 0.19196428571428573, "STATE_ABBR": "HI", "OBJECTID": 36}}, {"attributes": {"PRIPUBRT": 0.09770114942528736, "STATE_ABBR": "AZ", "OBJECTID": 37}}, {"attributes": {"PRIPUBRT": 0.17787418655097614, "STATE_ABBR": "IL", "OBJECTID": 38}}, {"attributes": {"PRIPUBRT": 0.11428571428571428, "STATE_ABBR": "ID", "OBJECTID": 39}}, {"attributes": {"PRIPUBRT": 0.11538461538461539, "STATE_ABBR": "NH", "OBJECTID": 40}}, {"attributes": {"PRIPUBRT": 0.0875, "STATE_ABBR": "WV", "OBJECTID": 41}}, {"attributes": {"PRIPUBRT": 0.1875, "STATE_ABBR": "NE", "OBJECTID": 42}}, {"attributes": {"PRIPUBRT": 0.08163265306122448, "STATE_ABBR": "AR", "OBJECTID": 43}}, {"attributes": {"PRIPUBRT": 0.1396508728179551, "STATE_ABBR": "NC", "OBJECTID": 44}}, {"attributes": {"PRIPUBRT": 0.1925133689839572, "STATE_ABBR": "NY", "OBJECTID": 45}}, {"attributes": {"PRIPUBRT": 0.06756756756756757, "STATE_ABBR": "NM", "OBJECTID": 46}}, {"attributes": {"PRIPUBRT": 0.13043478260869565, "STATE_ABBR": "NJ", "OBJECTID": 47}}, {"attributes": {"PRIPUBRT": 0.09693877551020408, "STATE_ABBR": "IA", "OBJECTID": 48}}, {"attributes": {"PRIPUBRT": 0.1169811320754717, "STATE_ABBR": "WI", "OBJECTID": 49}}, {"attributes": {"PRIPUBRT": 0.18681318681318682, "STATE_ABBR": "IN", "OBJECTID": 50}}, {"attributes": {"PRIPUBRT": 0.1875, "STATE_ABBR": "CO", "OBJECTID": 51}}]
                });
            } else {
                deferred.error ("Table does not exist!")
            }
            return deferred.promise;
        }

    };


    // credentials needed for the StandardGeography examples
    urlUtils.addProxyRule({
        // proxyUrl: "/sproxy/",
        urlPrefix: "geoenrich.arcgis.com"
    });

    map = new Map("map", {
        basemap: "gray",
        center: [-25, 0],
        zoom: 4,
        slider: false
    });

    var dataAdapterQuery, geographyQueryTemplate, queryParameters;
    dataAdapterQuery = {
        tableId: "US_States",
        outFields: ["STATE_ABBR", "PRIPUBRT"]
    };
    geographyQueryTemplate = "MajorSubdivisionAbbr:${STATE_ABBR}";
    queryParameters = {
        countrID: "US",
        geographyLayerIDs: ["US.States"]
    };

    layer = new DataAdapterFeatureLayer(SEDataAdapter, {
            dataAdapterQuery: dataAdapterQuery,
            locationProvider: new StandardGeographyQueryLocationProvider({
                geographyQueryTemplate: geographyQueryTemplate,
                queryParameters: queryParameters,
                standardGeographyQueryTask: new StandardGeographyQueryTask()
            })
        });


    // if (layer) {
    //     layer.on("update-start", function() { console.log("[ update-start ]", layer.id); });
    //     layer.on("update-end", function() { console.log("[ update-end ]", layer.id); });

    //     layer.locationProvider.on("locate-complete", function() {
    //         console.log("[ locate-complete ]", layer.id);

    //         var extent = graphicsUtils.graphicsExtent(array.filter(layer.graphics, function(graphic) {
    //             return graphic.geometry;
    //         }));

    //         if (extent) {
    //             map.centerAt(extent.getCenter());
    //         }
    //     });

    //     map.addLayer(layer);
    // }

    // var legend = new Legend({
    //     map: map,
    //     layerInfos: [{ title: "Percentage of county area used for farming", layer: layer }]
    // }, "legend");

    layer.on("load", function(){
        var renderer = new SimpleRenderer(new SimpleFillSymbol().setOutline(new SimpleLineSymbol().setWidth(0.1).setColor(new Color([128,128,128]))));
        renderer.setColorInfo({
            field: "PRIPUBRT",
            minDataValue: 0,
            maxDataValue: 1,
            colors: [
                new Color([255, 255, 255]),
                new Color([127, 127, 0])
            ]
        });
        layer.setRenderer(renderer);
        map.addLayer(layer);
        // legend.startup();
    });

});

