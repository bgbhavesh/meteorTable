// Write your package code here!

// Variables exported by this module can be imported by other packages and
// applications. See meteorTabutiles-tests.js for an example of importing.
export const name = 'meteortable';
import utils from "../client/lib/utils.js"
//import commonTabular from "../lib/_common.js"
Template.meteortable.onCreated(function () {
    Session.set('methodTabularCallReceivedTime', new Date());
    var template = this;
    template.pageLimit = new ReactiveDict();
    template.pageLimit.set("count", PAGE_LIMIT);
    template.skipCount = new ReactiveDict();
    template.skipCount.set("count", 0);
    template.dataReady = new ReactiveVar();
    template.dataReady.set(false);
    template.listView = new ReactiveVar();
    template.listView.set(false);//
    template.csvTabularData = new ReactiveVar();
    template.csvTabularData.set(false);
    template.selector = new ReactiveDict();
    template.sort = new ReactiveDict();
    template.recordsTotal = new ReactiveVar();
    template.records = new ReactiveVar();
    template.searchString = new ReactiveDict();
    var sort = null;
    let table = template.table;
    // let selector;
    template.autorun(function () {
        table = Template.currentData().table;
        let selector = Template.currentData().selector || {};

        template.selector.set("selectorQuery", selector);
    });
    table = Template.currentData().table;
    let fields = {};
    var sort = {};
    let collectionsName = table.collectionsName;
    let aggregateQuery = table.aggregateQuery;
    let requiresJoin = table.requiresJoin;
    /////

    ///////////////
    _.each(table.tableViewConfig.columns, function (col) {
        if (col.data) {
            var cleanFieldName = col.data;//new RsMethodUtils().cleanFieldName(col.data);
            fields[cleanFieldName] = 1;
        }
    });
    _.each(table.tableViewConfig["extraFields"], function (value1, index1) {
        var cleanExtraFieldName = value1;//new RsMethodUtils().cleanFieldName(value1);
        fields[cleanExtraFieldName] = 1;
    })
    _.extend(fields, {_id: 1});
    ////////////////
    template.autorun(function () {
        let paramsQuery = Router.current().params.query
        if (paramsQuery && paramsQuery.sort) {
            let order = paramsQuery.order === "desc" ? -1 : 1;
            sort = {};
            sort[paramsQuery.sort] = order;
            template.sort.set("data", {column: paramsQuery.sort, "order": order});
        }
        else {
            sort = {};
            if (table.order && table.order.length > 0 && table.order[0] <= table.tableViewConfig.columns.length) {
                let order = table.order[1] === "desc" ? -1 : 1;
                sort[table.tableViewConfig.columns[table.order[0]].data] = order;
                template.sort.set("data", {column: table.tableViewConfig.columns[table.order[0]].data, "order": order});
            }
        }
    })

    ////////////////////
    template.autorun(function () {
        Session.get('methodTabularCallReceivedTime');
        template.dataReady.set(false);
        let sort = template.sort.get('data');
        let finalSort = {[sort.column]: sort.order}
        let selector = template.selector.get('selectorQuery')//Template.currentData().selector;
        let limit = template.pageLimit.get("count");
        let skip = template.skipCount.get("count") * limit;
        Meteor.call('meteorTabularCall', collectionsName, fields, selector, skip, limit, aggregateQuery, finalSort, function (err, response) {
            if (response) {
                template.recordsTotal.set(response.recordTotal || 0);
                template.records.set(response.records || []);
            }
            template.dataReady.set(true);
        })
    })
});
Template.meteortable.events({
'click tr.t-row': function (e) {
        $(e.currentTarget).next('tr.tr-accordian').slideToggle().siblings("tr.tr-accordian").hide();
    },

    'click #printTabularDataContent': function (e) {
        let cssPrefix = '<style type="text/css">' +
            '#tabularDataContent{font-size:10px,width:100% }' +
            '</style>'
        let title = 'Smart'
        let ourTable = document.getElementById('tabularDataContent').innerHTML;
        // ourTable = replaceFunction(ourTable,'<div class="generaltable-Head">Action</div>','<div class="generaltable-Head">Active</div>');
        // ourTable = replaceFunction(ourTable,'<span><input type="checkbox" class="all checkedType"','<span');
        // ourTable = replaceFunction(ourTable,'<span> <i class="fa fa-power-off power-color-inactive active-inactive-fare" aria-hidden="true"></i> </span>','In Active');
        // ourTable = replaceFunction(ourTable,'<span> <i class="fa fa-power-off power-color active-inactive-fare" aria-hidden="true"></i> </span>','Active');
        var newWindow = window.open('', 'PRINT', '');
        newWindow.document.write('<html><head><title>' + title + '</title>');
        newWindow.document.write('</head><body >');
        newWindow.document.write(cssPrefix + ourTable);
        newWindow.document.write('</body></html>');
        newWindow.document.close(); // necessary for IE >= 10
        newWindow.focus(); // necessary for IE >= 10*/

        newWindow.print();
        newWindow.close();
        return true;
    },
    'click #changeToListView':function(e,t){
        if(t.listView.get())
            t.listView.set(false);
        else
            t.listView.set(true);
    },
    'click #csvTabularDataContent': function (e, t) {
        let table = t.data.table;
        let configName = table.name;
        let collectionsName = table.collectionsName;
        let selector = t.selector.get('selectorQuery');
        let sort = t.sort.get('data');
        let finalSort = {[sort.column]: sort.order}//t.sort.get('data');
        let skip = 0;
        let limit = 99999;
        let aggregateQuery = table.aggregateFullQuery || table.aggregateQuery;
        let fields = {};
        let columns = table.tableViewConfig.exportColumn || table.tableViewConfig.columns;
        _.each(columns, function (col) {
            if (col.data) {
                var cleanFieldName = col.data;//new RsMethodUtils().cleanFieldName(col.data);
                fields[cleanFieldName] = 1;
            }
        });
        // _.each(table.tableViewConfig["extraFields"], function (value1, index1) {
        //     var cleanExtraFieldName = value1//new RsMethodUtils().cleanFieldName(value1);
        //     fields[cleanExtraFieldName] = 1;
        // })no extra fields
        // let columns = table.tableViewConfig.columns;
        Meteor.call('dataContent', collectionsName, fields, selector, skip, limit, aggregateQuery, finalSort, columns, function (err, response) {
            if (err) {
                console.log(err);
            }
            else {
                let csv = columns.map(e => e.Title || e.data).join(',').concat('\n');
                _.each(response, function (data) {
                    var columnData = [];
                    _.each(columns, function (fieldName) {
                        // if (fieldName.render !== undefined) {
                        //     // columnData.push(fieldName.render(objectPath.get(data,fieldName.data),"display",data));
                        //     columnData.push(fieldName.render(objectPath.get(data, fieldName.data), "display", data))
                        // }
                        // else
                        if (fieldName.data && fieldName.data !== "") {
                            let text = objectPath.get(data, fieldName.data) || '';
                            if (text instanceof Date) {
                                text = moment(text).format('DD-MM-YYYY');
                            }
                            if (text === true || text === false) {
                                return text.toString();
                            } else if (text instanceof Array) {
                                text = text.toString();
                                text = text.replace(/,/g, ':');
                            } else if (!isNaN(text)) {
                                text = text
                            } else {
                                text = text.replace(/,/g, ':');
                                /* text = trunkString(text,50)*/
                            }
                            columnData.push(text);
                        }
                    });
                    csv = csv.concat(columnData.join(','), '\n');
                });
                var a = $("<a />", {
                    href: 'data:application/csv;charset=UTF-8,' + encodeURIComponent(csv),
                    "download": `${configName}.csv`
                });
                $("body").append(a);
                a[0].click();
            }
            // template.csvTabularData.set(true);
        })
    },
    "keyup .searchTextFilter": function (e, t) {
        e.preventDefault();
        var searchString = $(e.currentTarget).val();//this[0];
        if ((e.keyCode === 13 && !e.shiftKey) || searchString === '') {
            var selector = t.data.selector;

            var result = {};
            if (/^\s*$/.test(searchString)) {
                searches = [];
            } else {
                var filterFields = t.data.table.filterFields;
                var searches = [];
                if (_.isArray(filterFields) && filterFields.length > 0) {
                    _.each(filterFields, function (field) {
                        var m1 = {}, m2 = {};
                        // String search
                        m1[field] = {$regex: searchString};
                        m1[field].$options = "i";

                        searches.push(m1);
                    });
                }
            }
            if (searches && searches.length > 0) {
                if (selector) {
                    result = {$and: [selector, {$or: searches}]};
                } else {
                    result = {$or: searches};
                }
            } else {
                if (selector) {
                    result = selector;
                }
            }
            t.searchString.set('searchString', searchString)
            t.selector.set("selectorQuery", result);
            t.pageLimit.set("count", PAGE_LIMIT);
            t.skipCount.set("count", 0);
        }
    },
    "click .alphabetChar": function (e, t) {
        e.preventDefault();
        var searchString = this[0];
        var selector = t.data.selector;
        if (!$(e.currentTarget).hasClass("active")) {
            $(e.currentTarget).closest("ul").find(".active").removeClass("active");
            $(e.currentTarget).addClass("active");
            var filterFields = t.data.table.filterFields;
            var searches = [];
            if (_.isArray(filterFields) && filterFields.length > 0) {
                _.each(filterFields, function (field) {
                    var m1 = {}, m2 = {};

                    // String search
                    m1[field] = {$regex: "^" + searchString};
                    m1[field].$options = "i";

                    searches.push(m1);
                });
            }
        } else {
            $(e.currentTarget).removeClass("active");
        }
        var result = {};
        if (searches && searches.length > 0) {
            if (selector) {
                result = {$and: [selector, {$or: searches}]};
            } else {
                result = {$or: searches};
            }
        } else {
            if (selector) {
                result = selector;
            }
        }
        t.selector.set("selectorQuery", result);
        t.pageLimit.set("count", PAGE_LIMIT);
        t.skipCount.set("count", 0);

    },
    "click #next": function (e, t) {
        e.preventDefault();
        let recordsTotal = Template.instance().recordsTotal.get();
        let skip = Template.instance().skipCount.get('count');
        let limit = Template.instance().skipCount.get('count');
        // var recordsTotal = recordsTotal == null ? RsAdminTabular.getRecord(this.table.name).recordsTotal : Template.instance().recordsTotal.get("count");
        var status = skip * limit < (recordsTotal - limit );
        if (status) {
            var nextPage = t.skipCount.get("count");
            t.skipCount.set("count", nextPage + 1);
        }

    },
    "click #loadMore": function (e, t) {
        e.preventDefault();
        let recordsTotal = Template.instance().recordsTotal.get();
        let limit = Template.instance().pageLimit.get('count');
        if (limit < recordsTotal) {
            t.skipCount.set("count", 0);
            t.pageLimit.set("count", limit + PAGE_LIMIT);
        }

    },
    "click #previous": function (e, t) {
        e.preventDefault();
        let skip = t.skipCount.get("count");
        if (skip !== 0) {
            var nextPage = skip;
            t.skipCount.set("count", nextPage - 1);
        }

    },
    "click #first": function (e, t) {
        e.preventDefault();
        if (t.skipCount.get("count") != 0) {
            var nextPage = t.skipCount.get("count");
            t.skipCount.set("count", 0);
        }
    },
    "click #last": function (e, t) {
        e.preventDefault();


        let recordsTotal = Template.instance().recordsTotal.get();
        // var recordsTotal = Template.instance().recordsTotal.get("count") == null ? records.recordsTotal : Template.instance().recordsTotal.get("count");
        var limit = t.pageLimit.get("count");
        var count = Math.ceil(recordsTotal / limit) - 1;
        if (t.skipCount.get("count") != count) {
            t.skipCount.set("count", count);
        }
    },
    "click .sortColumn": function (e, t) {
        e.preventDefault();
        t.searchString.set('searchString', '');// not settings
        var currentSort = $(e.currentTarget).attr("data-sorted");
        let existingQuery = Router.current().params.query
        if (currentSort === "no") {
            _.extend(existingQuery, {sort: this.data, order: "desc"});
            Router.go(Router.current().route.getName(), {}, {query: existingQuery});
        } else {
            var order = null;
            if (currentSort === "desc") {
                order = "asc";
            } else if (currentSort === "asc") {
                order = "desc";
            }
            _.extend(existingQuery, {sort: this.data, order: order});
            Router.go(Router.current().route.getName(), {}, {query: existingQuery});
        }
    },
    "click .paginationNumber": function (e, t) {
        e.preventDefault();
        var pageNumber = $(e.currentTarget).attr("data-page");
        var finalPageNumber = Number(Number(pageNumber) - 1);
        t.skipCount.set("count", finalPageNumber);
    },
    "change .selectPageLimit": function (e, t) {
        e.preventDefault();
        var value = $(e.currentTarget).val();
        t.pageLimit.set("count", Number(value));
        t.skipCount.set("count", 0);
    }
});

Template.meteortable.helpers({
    isSelected:function(desiredValue, itemValue){
        if (desiredValue == undefined && itemValue == undefined) {
            return ""
        }
        if (_.isArray(desiredValue)) {
            return desiredValue.indexOf(itemValue) >= 0 ? "selected" : "";
        }
        return desiredValue == itemValue ? "selected" : "";
    },
    dataReady: function () {
        return Template.instance().dataReady.get("count");
    },
    exportCsv: function () {
        return this.table.exportCsv ? this.table.exportCsv : false;
    },
    canPrint: function () {
        return this.table.canPrint ? this.table.canPrint : false;
    },
    getSearchText: function () {
        return Template.instance().searchString.get('searchString') || "";
    },
    getRsTableTitle: function () {
        return this.table.tableViewConfig.columns;
    },
    getCurrentPageLimit: function () {
        return Template.instance().pageLimit.get("count");
    },
    lessResults: function () {
        return Template.instance().skipCount.get("count") != 0 ? "" : "disabled";
    },
    isFilter: function () {
        return this.table.isFilter ? this.table.isFilter : false;
    },
    alphaFilter: function () {
        return this.table.alphaFilter ? this.table.alphaFilter : false;
    },
    listViewText: function () {
        if (Template.instance().listView.get()) {
            return 'Tab'
        }
        else return 'List'
    },
    tabView: function () {
        if (this.table.tabView) {
            if (Template.instance().listView.get()) {
                return false
            }
            return true
        }
        return false;
        // return this.table.tabView&&Template.instance().listView.get("count")
    },
    canClickListView: function () {
        console.log(Template.instance().listView.get("count"))
        return this.table.tabView ? this.table.tabView : false;
    },
    albhabets: function () {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    },
    getRsTemplateName: function () {
        return this.value.templateName
    },
    thumbnailTemplate: function () {
        let thumbTemplate = this.table.thumbTemplate;
        // console.log(thumbTemplate);
        return thumbTemplate
    },
    totalRecords: function () {
        return Template.instance().recordsTotal.get();
    },
    isAccordion: function (data) {
        if (data && data.table.isAccordion) {
            return data.table.accordionTemplate || 'accordionTestTemplate';
        }
        // console.log('isAccordion',data.table.isAccordion);
        // return data.table.isAccordion ? data.table.isAccordion : false;
    },
    getPagination: function () {
        var recordsTotal = Template.instance().recordsTotal.get() || 0;
        var limit = Template.instance().pageLimit.get("count");
        var currentCount = Number(Template.instance().skipCount.get("count") + 1);

        return renderControls(currentCount, Math.ceil(recordsTotal / limit), 3);
    },
    moreResults: function () {
        let recordsTotal = Template.instance().recordsTotal.get() || 0;
        let skip = Template.instance().skipCount.get("count") || 0;
        let limit = Template.instance().pageLimit.get("count") || 10;
        if (skip === 0) {
            return recordsTotal > limit ? "" : "disabled"
        } else {
            return skip * limit < (recordsTotal - limit ) ? "" : "disabled";
        }
        return false;

    },
    startIndex: function () {
        var skipCount = Template.instance().skipCount.get("count");
        var pageLimit = Template.instance().pageLimit.get("count");
        var pageNumber = skipCount + 1;
        var endCount = pageLimit - 1;
        return (pageNumber * pageLimit - endCount);
    },
    endIndex: function () {
        // var records = RsAdminTabular.getRecord(this.table.name);
        let recordTotal = Template.instance().recordsTotal.get();
        // if(_.isEmpty(records)){
        //     return;
        // }
        var skipCount = Template.instance().skipCount.get("count");
        var pageLimit = Template.instance().pageLimit.get("count");
        var pageNumber = skipCount + 1;
        var endIndex = pageNumber * pageLimit;
        if (endIndex > recordTotal) {
            return recordTotal;
        } else {
            return endIndex;
        }
    },
    getTableData: function () {
        let collectionData = Template.instance().records.get();
        let columns = this.table.tableViewConfig.columns;
        if (_.isEmpty(collectionData)) {
            return;
        }
        var tableData = [];
        _.each(collectionData, function (data) {
            var columnData = [];
            _.each(columns, function (fieldName) {
                if (fieldName.render !== undefined) {
                    // columnData.push(fieldName.render(objectPath.get(data,fieldName.data),"display",data));
                    columnData.push({
                        type: 'render',
                        value: fieldName.render(objectPath.get(data, fieldName.data), "display", data)
                    })
                }
                else if (fieldName.img) {
                    columnData.push({
                        type: 'img',
                        value: objectPath.get(data, fieldName.data) || fieldName.defaultImage || ""
                    });
                }
                else if (fieldName.tmpl) {
                    columnData.push({type: 'tmpl', value: {"templateName": fieldName.tmpl, data: data}});
                } else if (fieldName.data && fieldName.data !== "") {
                    let text = objectPath.get(data, fieldName.data)
                    if (typeof text === "string") {
                        text = trunkString(text, 50)
                    }
                    columnData.push({type: 'text', value: text});
                }

            });

            tableData.push({"columnData": columnData, collectionData: data, columnLength: columns.length});
        });
        return tableData;
    },
    searchColumnName: function () {
        var table = Template.instance().data.table;
        let fieldText = "";
        if (table.isFilter && table.name && table.tableViewConfig && table.tableViewConfig.columns) {
            let columns = this.table.tableViewConfig.columns;
            _.each(this.table.filterFields, function (fieldCode, index) {
                if (index !== 0) {
                    fieldText = fieldText + ", "
                }
                let obj = {};
                obj = _.findWhere(columns, {data: fieldCode});
                if (obj) {
                    fieldText = fieldText + obj.Title;
                }
            })
        }
        return fieldText
    },
    checkSortingOfColumnSorted: function (columnData) {
        if (columnData) {
            var sortData = Template.instance().sort.get("data");
            if (sortData) {
                if (sortData.column === columnData.data) {
                    return sortData.order == -1 ? "desc" : "asc";
                }
            }
            return "no";
        }
    },
    currentPageNumberClass: function (pageNumber) {
        var skipCount = Template.instance().skipCount.get("count");
        if (pageNumber === (skipCount + 1)) {
            return "active";
        }
    },
    checkSortingOfColumn: function (columnData) {
        if (columnData) {
            var sortData = Template.instance().sort.get("data");
            if (sortData) {
                // if(sortData.column === new RsMethodUtils().cleanFieldName(columnData.data)){
                if (sortData.column === columnData.data) {
                    return sortData.order === -1 ? "fa-sort-desc" : "fa-sort-asc"
                }
            }
            return "fa-sort";
        }
    },
    getSortColumnStatus: function (columnData, attr) {
        var table = Template.instance().data.table;
        var columnName = columnData;
        if (columnName) {
            var config = table.tableViewConfig.columns;
            if (config && config.length > 0) {
                var indexOfColumn = config.findIndex(function (d) {
                    if (d.data == columnData) {
                        return d;
                    }
                });

            }
            if (attr == "class") {
                if (indexOfColumn != -1) {
                    var configData = config[indexOfColumn];
                    if (configData) {
                        return configData.sort == true ? "sortColumn" : "";
                    }
                }

            } else {
                if (indexOfColumn != -1) {
                    var configData = config[indexOfColumn];
                    if (configData) {
                        return configData.sort;
                    }
                }
            }
        }
    }
});

var renderControls = function (currentPage, numPages, pagesCutoff) {
    var prevPosition = currentPage - pagesCutoff;
    var nextPosition = currentPage + pagesCutoff;
    var pagingControls = [];
    for (var i = 1; i <= numPages; i++) {
        if (i >= prevPosition && i <= nextPosition) {
            pagingControls.push(i);
        }
    }
    return pagingControls;
}
var replaceFunction = function (str, search, replacement) {
    return str.replace(new RegExp(search, 'g'), replacement);
}
var trunkString = function (str, length) {
    if (str) {
        if (str.length <= length)
            return str;
        return str.substring(0, length - 1) + " ..."
    }
    return "";

};
