function CardList() {
	this._list = new Array() ;

	this.move = function(start, num, target) {
		var ary = this._list.slice(start, num) ;
		for ( var ii = 0; ii < ary.length; ii++) {
			target._list.push(ary[ii]) ;
		}
		this._list.splice(start, num) ;
	}

	this.clone = function() {
		var result = new CardList() ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			result._list.push(this._list[ii].clone()) ;
		}
		return(result) ;
	}
	this.clone_list = function() {
		var result = new Array() ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			result.push(this._list[ii].clone()) ;
		}
		return(result) ;
	}
	
	this.getSumNumber = function() {
		// バースト判定した結果を返す。
		// バーストしていない場合はnumをそのまま返す。
		function getBurstJudgResult(num) {
			if( num <= 21 ) {
				return(num) ;
			}
			return(BURST) ;
		}
		
		var ace_num = 0 ;
		var sum = 0 ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			switch (this._list[ii]._number){
			case 1: // ACEは後で計算する
				ace_num ++ ;
				break ;
			case 2: 
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
				sum += this._list[ii]._number ;
				break ;
			case 11:
			case 12:
			case 13:
				sum += 10 ;
				break ;
			default: // 想定外・・・
				throw new Error('プログラムミスのようです。想定外のカード[' + this._list[ii].toString() + ']です。') ;
			}		
		}
		// ACEがないならここで終了
		if( ace_num <= 0 ) {
			return(getBurstJudgResult(sum)) ;
		}
			
		// 2枚以上ACEがあったら2枚目以降は1点とカウント(11が２つあったらバーストなので)
		sum += (ace_num - 1) ;
			
		// ACEを1とするか11とするか判定してsumに足す。
		if( getBurstJudgResult(sum + 11) <= BURST ) {
			sum += 1 ;
		}
		else {
			sum += 11 ;
		}
		
	    return(getBurstJudgResult(sum)) ;
	}

	this.toString = function() {
		$result = "" ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			$result += this._list[ii].toString() + "\n" ;
		}
		return($result) ;
	}

	this.fromString = function(str) {
		var tmp = str.split('\n') ;
		this._list = new Array() ;
		for ( var ii = 0; ii < tmp.length; ii++) {
			card = new Card('', -1) ;
			card.fromString(tmp[ii]) ;
			if( card._number >= 1 ) {
				this._list.push(card) ;
			}
		}
	}
	
	this.shuffle = function () {
	    var ii = this._list.length;
	    while(ii){
	        var jj = Math.floor(Math.random()*ii);
	        var kk = this._list[--ii];
	        this._list[ii] = this._list[jj];
	        this._list[jj] = kk;
	    }
	}

}

