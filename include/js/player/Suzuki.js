var Suzuki = function Suzuki() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '鈴木' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {

		tehuda.sort(
			function(a,b){
				var a_number = a._number;
				var b_number = b._number;
				if( a_number < b_number ) return 1;
				if( a_number > b_number ) return -1;
				return 0;
    		}
		);

		var tehuda_sum=0;
		for(var i in tehuda){
			var tefuda_one=0;
			tehuda_one=(tehuda[i]._number>10) ? 10:tehuda[i]._number;
			tehuda_one=(tehuda_sum<11 && tehuda[i]._number==1) ? 11:tehuda_one;
			tehuda_sum+=tehuda_one;
		}

		var xx_cnt=0;
		for(var ii in sutehuda){
			if(sutehuda[ii]._number>(21-tehuda_sum)) xx_cnt++;
		}

		var yy_cnt=(13-(21-tehuda_sum))*4;
		var p=(yy_cnt-xx_cnt)/(yamahuda_cnt)*100;
		
		if( tehuda_sum <= 16 ) {
			return(true);
		}else{
			if(p<=16){
				return(true);
			}
		}

		return(false);
		
	}
};