function GameMaster() {
	// 現在のプレイ回数
	this._play_round = 0 ;
	// プレイヤーの配列
	this._players = new Array() ;
	// プレイヤーごとの手札(CardList)の配列
	this._players_card = new Array() ;
	// プレイヤーごとの実績
	this._play_data_list = new Array() ;
	// 山札
	this._yamahuda = new Yamahuda() ;
	// 捨て札
	this._sutehuda = new CardList() ;
	// 対戦結果（ポイント）のグラフ
	this._graph_record = null ;
	// 成績のグラフ
	this._graph_history = null ;
	
	// HTML
	this._html_history = null ;
	this._html_sutehuda = null ;
	this._html_ranking = null ;
	this._html_players_log = new Array() ;
	
	this.init = function() {

		this._yamahuda.init() ;
		// ここに参加プレイヤーを設定して下さい。
		this._players.push(new Nogi()) ;
		this._players.push(new Nogi2()) ;
		this._players.push(new Yamamoto()) ;
		this._players.push(new Yamaguchi()) ;
		this._players.push(new Koga()) ;

		// プレイヤー毎の手札・実績を初期化
		for ( var ii = 0; ii < this._players.length; ii++) {
			this._players_card.push(new CardList()) ;
			this._play_data_list.push(new PlayData()) ;
			this._html_players_log.push(null) ;
			
			// プレイヤー名をHTMLに設定
			document.getElementById("player_"+(ii+1)+"_name").textContent = this._players[ii]._author ;
		}
		this._graph_record = new google.visualization.ColumnChart(document.getElementById('graph_record'));
		this._graph_history = new google.visualization.LineChart(document.getElementById('graph_history'));
		this.drawGraphRecord() ;
		this.drawGraphHistory() ;
	}

	this.drawGraphRecord = function() {
		var record_data ;
		var record_opt ;

		var rec = new Array();
		rec[0] = ['',	'勝利点', '引分点'] ;
		for ( var ii = 0; ii < this._players.length; ii++) {
			var row = new Array() ;
			row.push(this._players[ii]._author) ;
			row.push(this._play_data_list[ii]._win_point) ;
			row.push(this._play_data_list[ii]._draw_point) ;
			rec.push(row) ;
		}
		record_data = google.visualization.arrayToDataTable(rec);

		record_opt = {
			title: 'ポイント',
			hAxis: {title: 'プレイヤー'},
			isStacked: true
		};
		this._graph_record.draw(record_data, record_opt);
	}
	
	this.drawGraphHistory = function() {
		var history_data ;
		var history_opt ;

		var rec = new Array() ;
		var row = new Array() ;
		row.push('') ;
		for ( var ii = 0; ii < this._players.length; ii++) {
			row.push(this._players[ii]._author) ;
		}
		rec[0] = row ;

		for(var ii = 0 ; ii <= 21 ; ii++) {
			var row = new Array() ;
			if( ii === 0 ) {
				row.push('Burst') ;
			}
			else {
				row.push(String(ii)) ;
			}
			for ( var jj = 0; jj < this._players.length; jj++) {
				row.push(this._play_data_list[jj]._results[ii]) ;
			}
			rec.push(row) ;
		}

		history_data = google.visualization.arrayToDataTable(rec);

		history_opt = {
			title: '成績',
			hAxis: {title: '手札合計値'}
		};

		this._graph_history.draw(history_data, history_opt);	

	}
	
	this.setHtml = function() {
		this._html_history = document.getElementById("history") ;
		this._html_sutehuda = document.getElementById("sutehuda") ;
		this._html_ranking = document.getElementById("ranking") ;

		// プレイヤー毎の手札・実績を初期化、HTML要素も取得
		for ( var ii = 0; ii < this._players.length; ii++) {
			this._html_players_log[ii] = document.getElementById("player_"+(ii+1)) ;
		}

	}

	this.play = function(cnt) {
		this.setHtml() ;
		for( var ii = 1 ; ii <= cnt ; ii++ ) {
			this._play_round++ ;

			this.playOne() ;

			this._html_sutehuda.value = this._sutehuda.toString() ;
		}
		this.writeRanking() ;
		this.drawGraphRecord() ;
		this.drawGraphHistory() ;
	}

	this.writeRanking = function() {
		var table = new Array() ;
		for ( var ii = 0; ii < this._players.length; ii++) {
			var row = new Array() ;
			row.push(this._players[ii]._author) ;
			row.push(this._play_data_list[ii]._win_point + this._play_data_list[ii]._draw_point) ;
			table.push(row) ;

		}
		this.twoDimensionSortDesc(table, 1) ;

		this._html_ranking.value = "" ;
		for ( var ii = 0; ii < table.length; ii++) {
			this._html_ranking.value += table[ii][0] + "さん\t[" + String(table[ii][1]) + "]ポイント\n" ;
		}
	}

	this.twoDimensionSortDesc = function(ary , idx) {
	    ary.sort(function(a , b)
	    {
	        return((a[idx] - b[idx]) * -1);
	    });
	    return(ary);
	}
	
	this.playOne = function() {
		var is_continue ;
		var is_end ;
		
		// 手札を配る
		this.dealCards() ;
		
		is_continue = new Array() ;
		for ( var ii = 0; ii < this._players.length; ii++) {
			is_continue.push(true) ;
		}

		////////////////////////////////////
		// 1ゲームプレイ
		////////////////////////////////////
		while(true) {
			////////////////////////////////////
			// 全プレイヤーに対して１回だけ手番を回す
			////////////////////////////////////
			for ( var ii = 0; ii < this._players.length; ii++) {
				// もうカードを配る必要のないプレイヤーならターンを飛ばす
				if( !is_continue[ii] ) {
					continue ;
				}
				// ヒットしないならこれ以上カードを配る必要なし
				if( !this._players[ii].isHit(this._players_card[ii].clone_list(), this._sutehuda.clone_list(), this._yamahuda._list.length) ) {
					is_continue[ii] = false ;
					continue ;
				}
				// ヒットするならカードを配る
				this.supplementCards() ;
				this._yamahuda.move(0, 1, this._players_card[ii]) ;

				// バーストしてしまったらこれ以上カードを配る必要なし
				if( this._players_card[ii].getSumNumber() == BURST ) {
					is_continue[ii] = false ;
					continue ;
				}
			}
			
			////////////////////////////////////
			// ゲームの終了判定
			////////////////////////////////////
			is_end = true ;
			for ( var ii = 0; ii < this._players.length; ii++) {
				// 継続するプレイヤーがいるならまだ終了しない
				if( is_continue[ii] ) {
					is_end = false ;
					break ;
				}
			}
			if( is_end ) {
				break ;
			}
		}
		// 1プレイ後の処理（捨て札回収や得点計算等）
		this.playOneAfter() ;
	}

	this.playOneAfter = function() {
		var sum_number ;
		var max_number ;
		var winner_cnt ;
		var point ;
		var log ;
		
		////////////////////////////////////
		// 1ゲーム終了後処理
		////////////////////////////////////
		max_number = BURST ;
		winner_cnt = 0 ;
		for ( var ii = 0; ii < this._players.length; ii++) {
			sum_number = this._players_card[ii].getSumNumber() ;
			// 最高得点をmax_numberに、勝者数をwinner_cntに取得
			if( sum_number > max_number ) {
				max_number = sum_number ;
				winner_cnt = 1 ;
			} else if( sum_number == max_number ) {
				winner_cnt++ ;
			}
			// 成績を記録する
			this._play_data_list[ii].addResult(sum_number) ;
			// デバッグ用にプレイヤー毎の手札をHTMLに出力
			this._html_players_log[ii].value = '合計点[' + sum_number + ']\n' + this._players_card[ii].toString() ;
		}

		log = "======= 【" + this._play_round + "ゲーム目　開始】 ========\n"
		for ( var ii = 0; ii < this._players_card.length; ii++) {
			if( max_number <= this._players_card[ii].getSumNumber() ) {
				// 勝者が１人なら勝利点に加算
				if( winner_cnt == 1 ) {
					this._play_data_list[ii]._win_point += this._players_card.length ;
					log += this._players[ii]._author + "さんの勝ち！！！！！\n" ;
				}
				// 勝者が複数なら引分点に加算
				else if( winner_cnt > 1 ) {
					this._play_data_list[ii]._draw_point += (this._players_card.length - winner_cnt) ;
					log += this._players[ii]._author + "さん、引分で勝利です・・・\n" ;
				}
			}

			// 手札を捨て札に戻す
			this._players_card[ii].move(0, 52, this._sutehuda) ;
		}
		
		log += "最高点は【" + max_number + "】でした。\n" ;
		this._html_history.value = log + this._html_history.value.substr(0,3000) ;
	}	
	
	this.dealCards = function() {
		// 各プレイヤーに２枚ずつカードを配る
		for( var ii = 0 ; ii < 2 ; ii++ ) {
			for( var jj = 0 ; jj < this._players.length ; jj++ ) {
				this.supplementCards() ;
				// 山札からプレイヤーにカードを１枚配る
				this._yamahuda.move(0, 1, this._players_card[jj]) ;
			}
		}
	}

	// 山札がなくなったら、捨て札から補充する
	this.supplementCards = function() {
		if( this._yamahuda._list.length >= 1 ) {
			// まだ山札があるなら何もしない
			return ;
		}
		
		this._sutehuda.move(0, 52, this._yamahuda) ;
	}
}

