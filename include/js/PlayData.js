// プレイ実績などのデータ
function PlayData(player_cnt) {
	// 成績の配列(0:Burst,1:1点だった数・・・)の配列
	this._results = Array() ;
	for(var ii = 0 ; ii <= 21 ; ii++) {
		this._results.push(0) ;
	}
	// 順位の配列(0:一位だった回数,1:二位だった回数・・・)の配列
	this._rank_cnt = Array() ;
	for(var ii = 0 ; ii < player_cnt ; ii++) {
		this._rank_cnt.push(0) ;
	}

	// _resultsに履歴を記録する。
	// @param sum_number 	手札(CardList)の合計点(getSumNumber()の戻り値)。
	this.addResult = function(sum_number) {
		if( sum_number == BURST ) {
			this._results[0]++ ;
		}
		else {
			this._results[sum_number]++ ;
		}
	}

	// 引数で指定された順位のポイントを返す。ポイントは1位=人数-1 2位=人数-2
	// @param rank 	順位。1=1位
	// @return ポイント（Integer）
	this.getRankPoint = function(rank) {
		return(this._rank_cnt[rank - 1] * (this._rank_cnt.length - rank)) ;
	}

	// 引数で指定された順位のポイントを返す。ポイントは1位=人数-1 2位=人数-2
	// @param rank 	順位。1=1位
	// @return ポイント（Integer）
	this.getRankPointAll = function() {
		var all_point = 0 ;
		for(var ii = 0 ; ii < this._rank_cnt.length ; ii++) {
			all_point += this.getRankPoint(ii + 1) ;
		}
		return(all_point) ;
	}
}

