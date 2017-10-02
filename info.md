client 
	HTML
		{{> meteorTable  table=methodConfig.userCreate selector=selector}}//selector can be passed from the helper itslef
	js config
		let methodConfig = {};
		methodConfig.userCreate = function () {
		    return {
		        collectionsName: 'globalCollection.collectionuUser',
		        aggregateQuery: 'selectorQuery',// can apply all the joints here to display
		        aggregateFullQuery:null,//if more joints are requied for export function
		        name: 'userCreate',// unique name to this configration
		        order: [0, "desc"],
		        exportCsv: true,
		        canPrint: true,
		        tabView: false,
		        isFilter: true,
		        filterFields: [// file path can be passed
		            "profile.name",
		            "companiesUser.companyAssignedUserInfo.jobDetails.employeeId"
		        ],
		        tableViewConfig: {
		            extraFields: [// fields which need to be passed to some template
		                //'companiesUser.companyAssignedUserInfo.userId'
		            ],
		            columns: [// table view on app fields and export if exportColumn not given
		                {
		                    data: "companiesUser.companyAssignedUserInfo.jobDetails.employeeId",
		                    Title: "Employee Id",
		                    sort: true

		                },
		                {
		                    data: "profile.name", Title: "User", sort: true

		                },
		                {
		                    data: "location.locationName", Title: "Location", sort: true

		                },
		                {
		                    data: "createdAt", Title: "Created on", sort: true,
		                    render: function (val, type, doc) {
		                        if (doc && doc.createdAt) {
		                            return Blaze._globalHelpers.getFormatedDate(doc.createdAt)

		                        } else {
		                            return "N/A";
		                        }
		                    }
		                },
		                {
		                    data: "isActive", Title: 'Status', sort: true,
		                    render: function (val, type, doc) {
		                        if (doc && doc.isActive) {
		                            return 'Active'
		                        } else {
		                            return 'In Active'
		                        }
		                    }
		                }
		            ],
		            columns: [// export csv fields
		                {
		                    data: "companiesUser.companyAssignedUserInfo.jobDetails.employeeId",
		                    Title: "Employee Id",
		                    sort: true

		                },
		                {
		                    data: "profile.name", Title: "User", sort: true

		                },
		                {
		                    data: "location.locationName", Title: "Location", sort: true

		                },
		                {
		                    data: "createdAt", Title: "Created on", sort: true,
		                    render: function (val, type, doc) {
		                        if (doc && doc.createdAt) {
		                            return Blaze._globalHelpers.getFormatedDate(doc.createdAt)

		                        } else {
		                            return "N/A";
		                        }
		                    }
		                },
		                {
		                    data: "isActive", Title: 'Status', sort: true,
		                    render: function (val, type, doc) {
		                        if (doc && doc.isActive) {
		                            return 'Active'
		                        } else {
		                            return 'In Active'
		                        }
		                    }
		                }
		            ]
		        }
		    }
		};

		Template.registerHelper("methodConfig", methodConfig);
server
	js query fields
		methodQueries = {};
		methodQueries.selectorQuery = function (selector, sort,fields) {
		    return [		       
		        {
		            "$match": selector
		        },
		        {"$sort": sort},
		        {'$project':fields},
		    ]
		};


template call accept argument

	config->
		collectionsName string
		aggregateQuery  sting
		name    string
		order   [1, 'desc']
		canPrint    boolean
		tabView boolean
		isFilter boolean
		alphaFilter boolean
		filterFields    array
		defaultImage string
		thumbnailTemplate string
		tableViewConfig object
		    extraFields array
		    columns object
		        data  string
		        Title   string
		        sort    boolean
		        render  function    val, type, doc
		        tmpl    string
		        img boolean

		HTML->
		dataReady   boolean
		canPrint    boolean
		isFilter    boolean
		tabView boolean
