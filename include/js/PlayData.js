// プレイ実績などのデータ
function PlayData() {
	// 成績の配列(0:Burst,1:1点だった数・・・)の配列
	this._results = Array() ;
	for(var ii = 0 ; ii <= 21 ; ii++) {
		this._results.push(0) ;
	}
	// 勝利点
	this._win_point = 0 ;
	// 引分点
	this._draw_point = 0 ;

	// _resultsに合計点を記録する。
	// @param sum_number 	手札(CardList)の合計点(getSumNumber()の戻り値)。
	this.addResult = function(sum_number) {
		if( sum_number == BURST ) {
			this._results[0]++ ;
		}
		else {
			this._results[sum_number]++ ;
		}
	}
}

