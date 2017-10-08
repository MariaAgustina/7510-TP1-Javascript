//Sentence could be a fact or a rule
var Interpreter = function () {
	this.isDatabaseCorrect = true;

	this.factsDictionary = {};
	this.rulesDictionary = {};

	this.isAFact = function(sentence){
		return (sentence.indexOf(":-") === -1);
	}
	
	this.isQueryAFact = function(query){
		 var key = this.getKeyForSentence(query);
		 return (this.factsDictionary[key]);
	}

	this.getKeyForSentence = function(sentence){
		return sentence.substr(0, sentence.indexOf('(')); 
	}

    this.parseDB = function (database) {

    	this.addSentenceToDictionary = function(sentence,setenceDictionary){
    		var key = this.getKeyForSentence(sentence);
    		if(setenceDictionary[key]){
    			setenceDictionary[key].push(sentence);
    		}else{
    			setenceDictionary[key] = [sentence];
    		}
    	}

    	for (position = 0; position < database.length; position++) {
			var sentence =database[position];

			if(this.isAFact(sentence)){
				this.addSentenceToDictionary(sentence,this.factsDictionary);
			}else{
				this.addSentenceToDictionary(sentence,this.rulesDictionary);
			}
		}

		//console.log(this.factsDictionary);
		//console.log(this.rulesDictionary);
    }

    this.validateDataBase = function(database){
    	for (position = 0; position < database.length; position++) {
			var sentence =database[position];
			var regex = new RegExp(".*\\(.*\\).")
			if(!(regex.test(sentence))){
				console.log("Error al parsear la base de datos en elemento: " + sentence);
				this.isDatabaseCorrect = false;
			}
		}
    }

    this.checkFact = function(fact){
    	var key = this.getKeyForSentence(fact);
    	var factsArray = this.factsDictionary[key];
    	return factsArray.includes(fact);
    }

    this.getRuleParameters = function(rule){
    	var ruleDefinition = rule.substr(0, rule.indexOf(':')) //f(x,y)
		var ruleParametersString = "";
    	var ruleParametersString = ruleDefinition.substr(ruleDefinition.indexOf('(') + 1, ruleDefinition.length);
    	ruleParametersString = ruleParametersString.substr(0, ruleParametersString.indexOf(')'));
    	return ruleParametersString.split(",");
    }

    this.getQueryParameters = function(query){

        var queryParametersString = query.substr(query.indexOf('(') + 1, query.length);
        queryParametersString = queryParametersString.substr(0, queryParametersString.indexOf(')'));
    	return queryParametersString.split(",");	
    }

    this.checkRule = function(query){;
    	var key = this.getKeyForSentence(query);
    	var completeRule = this.rulesDictionary[key] + "";
    	
    	var ruleParametersVector = this.getRuleParameters(completeRule);
    	var queryParametersVector = this.getQueryParameters(query)

    	var completeQuery = completeRule + "";
    	
    	for (position = 0; position < ruleParametersVector.length; position++) {
    		ruleParam = ruleParametersVector[position].trim();
    		queryParam = queryParametersVector[position].trim();
    		completeQuery = completeQuery.replace(new RegExp(ruleParam,"g"), queryParam);
    	}
    	
    	var factsForQuery = completeQuery.substr(completeQuery.indexOf('-')+2,completeQuery.length);
    	factsForQuery = factsForQuery.replace(new RegExp("\\),","g"), "),  ");
    	var factsVector = factsForQuery.split("  ");

    	for (position = 0; position < factsVector.length; position++) {
    		var fact = factsVector[position];
    		fact = fact.trim();
    		fact = fact.substr(0,fact.indexOf(')')+1);
    		fact = fact + "."
    		if(!this.checkFact(fact)){
    			return false;
    		}
    	}
    	return true;

    }

    this.checkQuery = function (query) {
    	if(!this.isDatabaseCorrect){
    		return false;
    	}

        if(this.isQueryAFact(query)){
        	return this.checkFact(query + ".");
        }else{
        	return this.checkRule(query + "");
        }
    }

}


module.exports = Interpreter;
