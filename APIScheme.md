DataStructure
-------------------

Schema:
{
	"account": {
		"type":"array"
		"items":[
			{
			"ida":{"type":"int"},
			"userId":{"type":"string"},
			"userPassw":{"type":"string"},
			"frstName":{"type":"string"},
			"lstName":{"type":"string"},
			"birthDate":{"type":"date"}
			}
		]
	}
	"presentation": {
		"type":"array"
		"items":[
			{
			 "idp":{"type":"int"},
			 "namePres":{"type":"string"}
			}
		]
	}
	"slide": {
		"type":"array"
		"items":[
			{
			 "ids":{"type":"int"},
			 "nameSlide":{"type":"string"}
			}
		]
	}
}

Example: 
{
    account:[
        {"ida":1, "userId":"userexample", "userPassw":"password", "frstName":"Arnaud", "lstName":"Soler", "birthDate":03-07-1995}
    ]
    presentation:[
    	{"idp":1, "namePres":"My Presentation"}
    ]
    slide[
    	{"ids":1, "nameSlide":"My Slide"}
    ]
}
