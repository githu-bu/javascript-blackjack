var Yamaguchi = function Yamaguchi() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '山口' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		// 手札を見ずにとにかく3枚までヒットしようとします。
		if( tehuda.length < 3 ) {
			return(true) ;
		}
		else {
			return(false) ;
		}
	}
};
