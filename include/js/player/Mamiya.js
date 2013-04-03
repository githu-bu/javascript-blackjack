var Mamiya = function Mamiya() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '間宮' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		var fake_sum = 0 ;
		var kari = 0;
		var ichi = 0;
		// fake_sumはカードの数値をそのまま足している。
		// 絵柄カード(J,Q,K)は10、1は1か11としてカウントしなければ・・・
		for ( var ii = 0; ii < tehuda.length; ii++) {
			kari = tehuda[ii]._number;
			if( kari == 11){
				fake_sum += 10;
			}else if( kari == 12){
				fake_sum += 10;
			}else if( kari == 13){
				fake_sum += 10;
			}else if( kari == 1){
				fake_sum += 1;
				ichi = 10;
			}else{
			
			fake_sum += tehuda[ii]._number ;
			}
		}
		if (ichi == 10 && fake_sum <= 11){
			fake_sum += 10;
		}
			
		// 誤った計算を元に16以下だったらヒット
		if( fake_sum <= 16 ) {
			return(true) ;
		}
		
		return(false) ;
	}
};
