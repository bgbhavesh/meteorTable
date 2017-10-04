
template call accept argument

	config->
		collectionsName string
		aggregateQuery  sting
		aggregateFullQuery string
		name    string
		order   [0, 'desc']
		canPrint    boolean
		tabView boolean
		isFilter boolean
		exportCsv boolean
		alphaFilter boolean
		filterFields    array
		defaultImage string
		thumbnailTemplate string
		tableViewConfig object
		    extraFields array
		    columns array
		        data  string
		        Title   string
		        sort    boolean
		        render  function    val, type, doc
		        tmpl    string
		        img boolean
		    exportColumn array
		
		HTML->
		dataReady   boolean
		canPrint    boolean
		isFilter    boolean
		tabView boolean
# meteortable
