//Sentence could be a fact or a rule
var Interpreter = function () {
	this.factsDictionary = {};
	this.rulesDictionary = {};

	this.isAFact = function(sentence){
		return (sentence.indexOf(":-") === -1);
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
    }

    this.checkFact = function(fact){
    	//console.log(this.factsDictionary);
		//console.log(this.rulesDictionary);
    	var key = this.getKeyForSentence(fact);
    	var factsArray = this.factsDictionary[key];
    	console.log(key);
    	console.log(factsArray);
    	console.log(fact);
    	console.log(factsArray.includes(fact));
    	return factsArray.includes(fact);
    }

    this.checkQuery = function (query) {
        if(this.isAFact(query)){
        	return this.checkFact(query + ".");
        }else{
        	return false;
        }
    }

}


module.exports = Interpreter;
