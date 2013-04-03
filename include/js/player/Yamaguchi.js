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
		var sum_number = 0;
		for (var i=0; i<tehuda.length; i++) {
			if (tehuda[i]._number > 10) {
				sum_number += 10;
			} else if (tehuda[i]._number == 1) {
				if ((sum_number + 11) > 21) {
					sum_number += 1;
				} else {
					sum_number += 11;
				}
			} else {
				sum_number += tehuda[i]._number
			}
		}

		if (sum_number >= 17) {
			return false;
		} else {
			return true;
		}
//			var n    = 21 - sum_number;
//			var cnt  = 0;
//			var cnt2 = n * 4;//バーストにならないカードの枚数
//			var cards = sutehuda.concat(tehuda);//捨て札と手札の配列
//			var tmp_cards = this._tmp_cards;

//			for (var i=0; i<cards.length; i++) {
//				for (var ii=0; ii<tmp_cards.length; ii++) {
//					if (cards[i] == tmp_cards[ii]) {
//						tmp_cards.splice(ii,1);
			//	}
		//	}
	//	}
//			if (tmp_cards.length > 0) {
//				for (var i=0; i<tmp_cards.length; i++) {
//					if (tmp_cards[i] <= n) {
//						cnt++;
			//	}
		//	}
		//		if (cnt > 0) {
		//			var p = Math.floor(cnt / yamahuda_cnt * 100);
		//			if (p >= 40) {
		//				return true;
			//	}
		//	}
	//	}
	//		return false;
//	}
	}

	this._tmp_cards = [
		1,1,1,1,
		2,2,2,2,
		3,3,3,3,
		4,4,4,4,
		5,5,5,5,
		6,6,6,6,
		7,7,7,7,
		8,8,8,8,
		9,9,9,9,
		10,10,10,10,
		11,11,11,11,
		12,12,12,12,
		13,13,13,13
	];
};
