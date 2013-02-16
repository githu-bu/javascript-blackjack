function Player(tehuda, sutehuda, player_num) {
	// 作者
	this._author = '名無しの権兵衛' ;

	// ヒットするか判定。
	// @param tehuda 		手札(CardList)。
	// @param sutefuda 		捨て札(CardList)。他のプレイヤーの持っているカードは含まれません。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda) {
		// 単なるおバカさんです。兎に角ヒットします。ルールが分かっていないようです・・・
		return(true) ;
	}
}

