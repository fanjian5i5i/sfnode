import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const BermudaTriangle = (props) => {

    const [graphic, setGraphic] = useState(null);
    const [data, setData] = useState([]);
    const [pids, setPids] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/login').then((response) => {
            return response.json();
          }).then((result) => {
            
            let temp = [];
            result.records.forEach((record,index)=>{
                if(index<2000){
                    // console.log(record);
                    temp.push({
                        pid:record.Parcel__r.ParcelID__c,
                        name:record.Project__r?record.Project__r.Name:"",
                        status:record.Project__r?record.Project__r.ProjectStatus__c:""
                    })
                }
            })
            // console.log(temp)
            setData(temp)
            // setData(data);
          });
    },[])
    useEffect(() => {
        loadModules(['esri/Graphic',"esri/tasks/QueryTask","esri/tasks/support/Query","esri/layers/FeatureLayer","esri/layers/GraphicsLayer"]).then(([Graphic,QueryTask,Query,FeatureLayer,GraphicsLayer]) => {
        let qTask = new QueryTask({
            url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/Parcels2019/FeatureServer/0"
          });
        var params = new Query({
        returnGeometry: true,
        outFields: ["*"],
        
        });
        var layer = new GraphicsLayer({
            id:"gf1"
        });
        props.map.add(layer);
        console.log(data);
        let symbols = {
            "Prefile (Default)":{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [100, 100, 100, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [100, 100, 100],
                    width: 2
                }
            },
            "Under Review":{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [252, 185, 24, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [252, 185, 24],
                    width: 2
                }
            },
            "Board Approved":
            {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [171, 203, 55, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [171, 203, 55],
                    width: 2
                }
            },
            "Permitted / Under Construction":{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [219, 29, 72, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [219, 29, 72],
                    width: 2
                }
            },
            "Construction Complete":{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [123, 1, 101, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [123, 1, 101],
                    width: 2
                }
            },
            "Inactive":{
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [170, 170, 170, 0.5],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [170, 170, 170],
                    width: 2
                }
            }
        }
        if(data.length > 0){

            let graphics = []
            data.forEach(record => {
                    
                    params.where = "PID_LONG = '"+record.pid + "'";
                
                      qTask
                            .execute(params)
                            .then((result) =>{

                              // Create a symbol for rendering the graphic


                              var template = {
                                // NAME and COUNTY are fields in the service containing the Census Tract (NAME) and county of the feature
                                title: "{name} ({pid})",
                                content:"Status : " + record.status 
                                    
                                
                              };
                              let graphic = new Graphic({
                                  geometry: result.features[0].geometry,
                                  symbol: symbols[record.status],
                                  attributes:{
                                      'name':record.name,
                                      'pid':record.pid,
                                      'status':record.status
                                  },
                                  popupTemplate:template
                              });
                
                            //   props.view.graphics.add(graphic);
                            // graphics.push(graphic)
                            props.map.findLayerById("gf1").add(graphic);
                            
                            
                            //   props.view.goTo({target:result.features[0].geometry});
                            })
                            .catch((err)=>{
                            //   console.log(err)
                            });  
                })
                console.log(graphics)

                

                
            
        }
    })
    },[data])
    // useEffect(() => {
    //     if(pids.length > 999){
    //         // console.log(pids.length)   
    //         console.log("("+pids.join(',')+")"); 
    //                 loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
    //                     // Create a polygon geometry
                        
    //                     var simpleRenderer = {
    //                         type: "simple",  // autocasts as new SimpleRenderer()
    //                         symbol: {
    //                           type: "simple-fill", // autocasts as new SimpleFillSymbol()
    //                           color: [0, 166, 180, 0.5],
    //                           outline: { // autocasts as new SimpleLineSymbol()
    //                               color: [0, 60, 80],
    //                               width: 1
    //                           }
    //                         }
    //                       };

    //                     const layer = new FeatureLayer({
    //                         // URL to the service
    //                         url: "https://services.arcgis.com/sFnw0xNflSi8J0uh/ArcGIS/rest/services/Parcels2019/FeatureServer/0",
    //                         outFields: ["*"],
    //                         renderer:simpleRenderer,
    //                         // popupEnabled:true,
    //                         definitionExpression: "PID_LONG  in "+"("+pids.sort().join(',')+")"
    //                     });
                    
    //                     props.map.add(layer)
    //                 }).catch((err) => console.error(err));
    //     }
        


    // }, [pids]);

    return null;

}

export default BermudaTriangle;