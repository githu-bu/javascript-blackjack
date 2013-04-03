var H_koga_s = function H_koga_s() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = 'リアル古賀' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		//引くカードの期待値を求める。
		//ただし、このターンで他人が引いたカード（捨札と山札の差分）は考慮しない。
//		this._yamahuda = new Yamahuda() ;
//		this._yamahuda.init() ;
		
			
		//var card_list = new Array();
		var card_list = this.get_cards();
		//for (var key in sutehuda) {
		for (var i=0; i<sutehuda.length; i++){
			for ( var r in card_list){
				if (card_list[r]['_number'] === sutehuda[i]['_number']
				&& card_list[r]['_suit'] === sutehuda[i]['_suit']){
					card_list.splice(r,1);
					break;
				}
			}
		}

		for (var i=0; i<tehuda.length; i++){
			for ( var r in card_list){
				if (card_list[r]['_number'] === tehuda[i]['_number']
				&& card_list[r]['_suit'] === tehuda[i]['_suit']){
					card_list.splice(r,1);
					break;
				}
			}
		}
		
		var list_count = 1;
		var list_sum = 0;
		for ( var key in card_list){
			list_sum += card_list[key]['_number'];
			list_count++;
		}
		var kitaichi = list_sum / list_count;


		var fake_sum = 0 ;
		var ace_num = 0;
		// fake_sumはカードの数値をそのまま足している。
		// 絵柄カード(J,Q,K)は10、1は1か11としてカウントしなければ・・・
		for ( var ii = 0; ii < tehuda.length; ii++) {
			//fake_sum += tehuda[ii]._number ;
			switch (tehuda[ii]._number){
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
				fake_sum += tehuda[ii]._number ;
				break ;
			case 11:
			case 12:
			case 13:
				fake_sum += 10 ;
				break ;
			default:
			}
			
			// ACEがないならここで終了
			if( ace_num > 0 ) {
				
				// 2枚以上ACEがあったら2枚目以降は1点とカウント(11が２つあったらバーストなので)
				fake_sum += (ace_num - 1) ;
					
				// ACEを1とするか11とするか判定してsumに足す。
				if( fake_sum +11 >20 ) {
					fake_sum += 1 ;
				} else {
					fake_sum += 11 ;
				}
			}
		}
		// 誤った計算を元に15以下だったらヒット
//		if( fake_sum <= 15 ) {
//			return(true) ;
//		}
//		return(false) ;
//
//		var arrow_num = 20 - fake_sum;
//		arrow_num = arrow_num * 0.3;
//		if (arrow_num > kitaichi){
		if (fake_sum <=15){
			return(true);
		}
		return(false);
	}

	this.get_cards = function() {
		var card_list = new Array();
		// 山札は各スートの1～13で52枚。ジョーカーはなし。
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			card_list.push(new Card(SUIT_HEART, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			card_list.push(new Card(SUIT_SPADE, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			card_list.push(new Card(SUIT_DIAMOND, ii)) ;
		}
		for( var ii = 1 ; ii <= 13 ; ii++ ) {
			card_list.push(new Card(SUIT_CLOVER, ii)) ;
		}
		return card_list;
	}

};
