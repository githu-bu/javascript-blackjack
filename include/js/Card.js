function Card(suit, number) {
	this._suit = suit ;
	this._number = number ;
	
	this.clone = function() {
		return(new Card(this._suit, this._number)) ;
	}

	this.toString = function() {
		return(this._suit + '\t' + this._number) ;
	}

	this.fromString = function(str) {
		var tmp = str.split('\t') ;
		if( tmp.length < 2 ) {
			return ;
		}
		this._suit = tmp[0] ;
		this._number = parseInt(tmp[1]) ;
	}
}


