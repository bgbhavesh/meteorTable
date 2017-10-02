
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
# meteortable
