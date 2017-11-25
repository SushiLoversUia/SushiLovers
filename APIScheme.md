DataStructure
-------------------

```json
Schema for presentation:
{
	"presentation": {
		"type":"array",
		"items":[
			{
			 "idp":{"type":"int"},
			 "namePres":{"type":"string"},
			 "owner":{"type":"string"},
			 "creationDate":{"type":"date"}
			}
		]
	},
	"slides": {
		"type":"array",
		"items":[
			{
			 "ids":{"type":"int"},
			 "index":{"type":"int"},
			 "content":{"type":"string"},
			 "notes":{"type":"string"}
			}
		]
	}
}

Example: 
{
    presentation:[
    	{"idp":1, "namePres":"My Presentation", "owner":"Arnaud"}
    ],
    slide:[
    	{"ids":1, "index":1, "content":"There is something in this slide", "notes":"Here is my notes"}
    ]
}

Schema for account:
{
	"account": {
		"type":"array",
		"items":[
			{
			"ida":{"type":"int"},
			"userId":{"type":"string"},
			"userPassw":{"type":"string"},
			"frstName":{"type":"string"},
			"lstName":{"type":"string"},
			"birthday":{"type":"date"}
			}
		]
	}
}

Example: 
{
    account:[
        {"ida":1, "userId":"userexample", "userPassw":"password", "frstName":"Arnaud", "lstName":"Soler", "birthDate":03-07-1995}
    ]
}
```
