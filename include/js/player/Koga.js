var Koga = function Koga() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '古賀（ひ）' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		var fake_sum = 0 ;
		// fake_sumはカードの数値をそのまま足している。
		// 絵柄カード(J,Q,K)は10、1は1か11としてカウントしなければ・・・
		for ( var ii = 0; ii < tehuda.length; ii++) {
			if( tehuda[ii]._number ) {
				fake_sum += tehuda[ii]._number ;
			}
		}
		// 誤った計算を元に15以下だったらヒット
		if( fake_sum <= 15 ) {
			return(true) ;
		}
		return(false) ;
	}
};
