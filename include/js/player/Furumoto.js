var Furumoto = function Furumoto() {

    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '古本' ;

	// ヒットするか判定。
	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 		捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		var count_card = [4, 4, 4, 4, 4, 4, 4, 4, 4, 16] ; //数字毎の枚数カウント
//        var count_card_moto = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 16] ;//数字毎の枚数カウント
//        var last_cnt = localStorage.getItem("last_cnt");
//		if (!last_cnt) { last_cnt = 0;}
//		if (last_cnt < yamahuda_cnt){
//		   	count_card = count_card_moto ;
//		 } else {
//		 	count_card = localStorage.getItem("count_card_hokan");
//		 }
//		 localStorage.setItem("last_cnt",yamahuda_cnt);


		//last_cnt = yamahuda_cnt ;
		// var fake_sum = 0 ;
		// fake_sumはカードの数値をそのまま足している。
		// 絵柄カード(J,Q,K)は10、1は1か11としてカウントしなければ・・・
	//	for ( var ii = 0; ii < tehuda.length; ii++) {
        //                switch ( tehuda[ii] ) {
        //                
		//	fake_sum += tehuda[ii]._number ;
	//	}
                //function CardList(ary) 
　　　　　　　　
		// 誤った計算を元に15以下だったらヒット

//捨札カウント
		for ( var ii = 0; ii < sutehuda.length; ii++) {
//                 console.log( sutehuda[ii] );
			switch ( sutehuda[ii]._number ) {
			case 1:
				count_card[0] -- ;
				break ;
			case 2:
				count_card[1] -- ;
				break ;
			case 3:
				count_card[2] -- ;
				break ;
			case 4:
				count_card[3] -- ;
				break ;
			case 5:
				count_card[4] -- ;
				break ;
			case 6:
				count_card[5] -- ;
				break ;
			case 7:
				count_card[6] -- ;
				break ;
			case 8:
				count_card[7] -- ;
				break ;
			case 9:
				count_card[8] -- ;
				break ;
			case 10:
				count_card[9] -- ;
				break ;
			case 11:
				count_card[9] -- ;
				break ;
			case 12:
				count_card[9] -- ;
				break ;
			case 13:
				count_card[9] -- ;
		       	        break ;
		    	default: // 例外処理
                               break ;
			}
		}
//		localStorage.setItem("count_card_hokan",count_card);
//              console.log( tehuda[0], tehuda[1], count_card[1], count_card[2], count_card[3], count_card[4], count_card[5], count_card[6], count_card[7], count_card[8], count_card[9], count_card[10] );
		// バースト確率を計算
                 var tehuda_goukei = 0 ;
                 for (ii=0; ii < tehuda.length; ii++){
                   if ( tehuda[ii]._number == 11 ) {
                        tehuda[ii]._number = 10 ;
                   }
                   if ( tehuda[ii]._number == 12 ) {
                         tehuda[ii]._number = 10 ;
                   } 
                   if ( tehuda[ii]._number == 13 ) {
                        tehuda[ii]._number = 10 ;
	            }
                     tehuda_goukei += tehuda[ii]._number ;
                 }
                 var notburst_no = 21 - tehuda_goukei ;
                // var tehuda_goukei_2 = tehuda_goukei ;
                 for (ii=0; ii < tehuda.length; ii++){
                     if ( tehuda[ii]._number == 1 && tehuda_goukei <= 11){
                          tehuda_goukei += 10 ;
                         }
                     }                      
//                 }
                 notburst_no = 21 - tehuda_goukei ;
//                  console.log( tehuda_goukei, notburst_no ) ;
                 if ( notburst_no < 10 && notburst_no >= 1 ) { //カード合計9～15
                    var notburst_sum = 0 ;
                     for ( ii = 0; ii < notburst_no; ii++) {
                         notburst_sum += count_card[ii] ;
                     }
                     //手札を捨てカードに含める。
                     var tehuda_n ;
                     for (ii=0; ii < tehuda.length; ii++){
                         if( tehuda[ii]._number > 10 ) {
                           tehuda_n = 10 ;
                         } else{ 
                           tehuda_n = tehuda[ii]._number ; 
                         }
                         
                         if( tehuda_n <= notburst_no ){
                         notburst_sum -- ;
                         }
                     }
                     var notburst_hiritu = notburst_sum / ( 52 - sutehuda.length - tehuda.length ) ;
                     //console.log( notburst_sum, notburst_hiritu );
                     if ( notburst_hiritu >= 0.500 ) {
                     //もう一枚とる。
                     return(true) ;
                        //console.log( notburst_hiritu, sutehuda.length, tehuda_goukei) ;
                     }  else{
                     //もうとらない。
                     return(false) ;
                        //console.log( notburst_hiritu, sutehuda.length, tehuda_goukei) ;
                     }
                   }
                   else if ( notburst_no >= 10 ) { //カード合計～10
                     //もう一枚とる。
                     return(true) ;
                        //console.log( notburst_no ) ;
                   }
                   else if ( notburst_no < 1 ) { //カード合計16～
                     return(false) ;
                   }
                   else {
                     return(false) ;
                   }



		//if( fake_sum <= 15 ) {
		//	return(true) ;
		//}
		//return(false) ;
	}
};
