/**
 * The registry.
 * This is currently a Singleton, which is not a great pattern. Will 
 * probably refactor this into a standard class.
 */
var Registry = {
	config: {requests:[]}
  ,currentIndex: -1
  ,currentParamName: null
  ,currentRequestName: null
};

Registry.request = function(name){
  this.currentRequestName = name;
  this.config.requests[name] = [];
  this.currentIndex = -1;
  return this;
}

Registry.doesCommand = function(cmd){
  //console.log(this.currentIndex);
	++this.currentIndex
  this.config.requests[this.currentRequestName][this.currentIndex] = {
    name: cmd, 
    params: {},
    command: null,
    params: {}
  };
  return this;
}

Registry.whichInvokes = function(invokes){
	//console.log('Setting command for index ' + this.currentIndex);
  this.config.requests[this.currentRequestName][this.currentIndex].command = invokes;
  return this;
}
Registry.usingParam = function(paramName){
  this.currentParamName = paramName;
  this.config.requests[this.currentRequestName][this.currentIndex].params[this.currentParamName] = {};
  return this;
}
Registry.withValue = function(value){
  this.config.requests[this.currentRequestName][this.currentIndex].params[this.currentParamName].value = value;
  return this;
}
Registry.withDefault = function(value){
  return this.withValue(value);
}
Registry.from = function(fromString){
  this.config.requests[this.currentRequestName][this.currentIndex].params[this.currentParamName].from = fromString;
  return this;
}

/**
 * Given a request name, get the request specification.
 */
Registry.getRequestSpec = function(name) {
	if (this.config.requests[name] == undefined) {
		throw new Error('No such request.');
	}
	return this.config.requests[name];
}

module.exports = Registry;