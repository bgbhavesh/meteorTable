var objectPath = require("object-path");
//var tempTabular = new Mongo.Collection("tempTabular");
Meteor.methods({
    //collectionsName, fields, selector, skip, limit,aggregateQuery, sort
    meteorTabularCall: function (collectionsName, fields, selector, skip, limit, queryName, sort) {
            check(collectionsName,String);
            check(fields,Object);
            check(selector,Object);
            check(queryName,String);
            check(sort,Object);
            check(skip,Number);
            check(limit,Number);

            let finalObject = {
                recordTotal: 0,
                records: []
            };
            let aggregateQuery = leoMethodQuery[queryName](selector, sort, fields);
            let aggregateRsResultsCount = global[collectionsName.split(".")[0]][collectionsName.split(".")[1]].aggregate(aggregateQuery);
            let fullQuery = [];
            _.each(aggregateQuery, function (query) {
                fullQuery.push(query)
            })
            // fullQuery.push({"$sort": sort});
            fullQuery.push({$skip: skip});
            fullQuery.push({$limit: limit});
            let aggregateRsResultsData = global[collectionsName.split(".")[0]][collectionsName.split(".")[1]].aggregate(fullQuery);
            _.extend(finalObject, {recordTotal: aggregateRsResultsCount.length});
            _.extend(finalObject, {records: aggregateRsResultsData});
            return finalObject;
        },
        dataContent: function (collectionsName, fields, selector, skip, limit, queryName, sort,columns) {
            check(collectionsName,String);
            check(fields,Object);
            check(selector,Object);
            check(columns,Array);
            check(queryName,String);
            check(sort,Object);
            check(skip,Number);
            check(limit,Number);
            let aggregateQuery = leoMethodQuery[queryName](selector, sort, fields);
            aggregateQuery.splice(0,0,{"$match": selector},{$skip: skip},{$limit: limit});
            try{
                return global[collectionsName.split(".")[0]][collectionsName.split(".")[1]].aggregate(aggregateQuery);
            }
            catch(e){
                throw new Meteor.Error(e)
            }

        //     aggregateQuery.push({$out:'tempTabular'});
        //     let outCursor = global[collectionsName.split(".")[0]][collectionsName.split(".")[1]].aggregate(aggregateQuery);
        //     let totalResults =  tempTabular.find().fetch();
        //     console.log(totalResults);
        //     return totalResults;
        },
        csvTabularDataContent: function (collectionsName, fields, selector, skip, limit, queryName, sort,columns) {
            check(collectionsName,String);
            check(fields,Object);
            check(selector,Object);
            check(columns,Array);
            check(queryName,String);
            check(sort,Object);
            check(skip,Number);
            check(limit,Number);
            Meteor.call('dataContent', collectionsName, fields, selector, skip, limit, queryName, sort,columns, function (err, response) {
                if(response){
                    let tableData = [];
                    let titleData = [];
                    _.each(columns, function (fieldName) {
                        titleData.push(fieldName.Title||'');
                    });
                    tableData.push({"columnData": titleData});
                    _.each(response, function (data) {

                        let columnData = [];
                        _.each(columns, function (fieldName) {
                            var key = fieldName.data;
                            if (fieldName.render !== undefined) {
                                columnData.push(fieldName.render(objectPath.get(data, key), "display", data))
                            }
                            else if (fieldName.data && fieldName.data !== "") {
                                columnData.push(objectPath.get(data, fieldName.data)||"-");
                            }
                            else{
                                columnData.push("-")
                            }
                        });
                        tableData.push({"columnData": columnData});
                    });
                    return tableData;
                }
            })
        }
    }
);

