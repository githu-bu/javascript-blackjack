var Nogi = function Nogi() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '野木' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		var sum_number = this.getSumNumber(tehuda) ;
		var safe_per ;
		var is_soft_hand = this.isSoftHand(tehuda) ;
		
		// 11以下なら絶対に引いた方がいい。
		if( sum_number <= 11 ) {
			return(true) ;
		}
		
		
		// 1を11とカウント（ソフトハンド）していて17以下(弱い・・・)なら絶対バーストしないので引く。
		if( (is_soft_hand === true) && (sum_number <= 17) ) {
			return(true) ;
		}

		// safe_perに今の手札から何％安全に引けるか（安全率を）取得（0：完全に安全　100：必ずバースト）
		safe_per = this.getSafePercent(tehuda, sutehuda, 21 - sum_number) ;
		// 引いたら負けるなら引かない
		if( safe_per <= 0.01 ) {
			return(false) ;
		}
		
		// 今の手札と安全率を加味して引くか決める
		switch(sum_number) {
		case 21 :
		case 20 :
			return(false) ;
		case 19 :
			if( safe_per >= 95 ) {
				return(true) ;
			}
			return(false) ;
		case 18 :
			if( safe_per >= 90 ) {
				return(true) ;
			}
			return(false) ;
		case 17 :
			if( safe_per >= 85 ) {
				return(true) ;
			}
			return(false) ;
		case 16 :
			if( safe_per >= 20 ) {
				return(true) ;
			}
			return(false) ;
		case 15 :
			if( safe_per >= 15 ) {
				return(true) ;
			}
			return(false) ;
		default :
			if( safe_per >= 10 ) {
				return(true) ;
			}
			return(false) ;
		}
	}

	this.getSafePercent = function(tehuda, sutehuda, number) {
		var yamahuda_num_cnt_ary = this.getYamahudaNumCntAry(tehuda, sutehuda) ;
		var more_than_cnt = 0 ;
		var less_cnt = 0 ;
		var safe_per ;

		for ( var ii = 0; ii < yamahuda_num_cnt_ary.length; ii++) {
			if( (ii+1) > number ) {
				more_than_cnt += yamahuda_num_cnt_ary[ii] ;
			}
			else {
				less_cnt += yamahuda_num_cnt_ary[ii] ;
			}
		}
		
		if( (less_cnt + more_than_cnt) <= 0 ) {
			return(0) ;
		}
		safe_per = less_cnt / (less_cnt + more_than_cnt) * 100 ;
		return(safe_per) ;
	}

	this.getYamahudaNumCntAry = function(tehuda, sutehuda) {
		var yamahuda_num_cnt_ary = Array() ;

		// 山札（予測）の数字ごとの枚数配列(yamahuda_num_cnt_ary)初期化
		for(var ii = 0 ; ii < 13 ; ii++) {
			yamahuda_num_cnt_ary.push(4) ;
		}

		// yamahuda_num_cnt_aryから手札のカードを除外
		for ( var ii = 0; ii < tehuda.length; ii++) {
			yamahuda_num_cnt_ary[tehuda[ii]._number - 1]-- ;
		}

		// yamahuda_num_cnt_aryから捨て札のカードを除外
		for ( var ii = 0; ii < sutehuda.length; ii++) {
			yamahuda_num_cnt_ary[sutehuda[ii]._number - 1]-- ;
		}

		return(yamahuda_num_cnt_ary) ;
	}
	
	this.getSumNumber = function(card_list) {
		var is_have_ace = false ;
		var sum = 0 ;
		
		for ( var ii = 0; ii < card_list.length; ii++) {
			if( card_list[ii]._number == 1 ) {
				is_have_ace = true ;
			}

			if( card_list[ii]._number <= 10 ) {
				sum += card_list[ii]._number ;
			}
			else {
				sum += 10 ;
			}
		}
		if( is_have_ace == true && sum <= 11 ) {
			sum += 10 ;
		}
	    return(sum) ;
	}

	this.isSoftHand = function(card_list) {
		var is_have_ace = false ;
		var sum = 0 ;
		
		for ( var ii = 0; ii < card_list.length; ii++) {
			if( card_list[ii]._number == 1 ) {
				is_have_ace = true ;
			}

			if( card_list[ii]._number <= 10 ) {
				sum += card_list[ii]._number ;
			}
			else {
				sum += 10 ;
			}
		}
		if( is_have_ace == true && sum <= 11 ) {
			return(true) ;
		}
	    return(false) ;
	}
};
