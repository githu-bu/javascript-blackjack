var Yamahuda = function Yamahuda() {
    // 親のコンストラクタを呼び出す
    CardList.apply( this, arguments );

	this.init = function() {
		// 山札は各スートの1～13で52枚。ジョーカーはなし。
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			this._list.push(new Card(SUIT_HEART, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			this._list.push(new Card(SUIT_SPADE, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			this._list.push(new Card(SUIT_DIAMOND, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			this._list.push(new Card(SUIT_CLOVER, ii)) ;
		}
		// 山札をシャッフル
		this.shuffle() ;
	}

}
