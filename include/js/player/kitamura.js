var kitamura = function kitamura() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

	// 作者
	this._author = '北村' ;

	// @param tehuda 		手札(Cardの配列)。
	// @param sutefuda 捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
	// @param yamahuda_cnt 	現在のプレイで残っている山札の枚数(Integer)。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
		var fake_sum = 0 ;
		var tasu = 0 ;
		var kijun = 0 ;

		var no_ya1=0;
		var no_ya2=0;
		var no_ya3=0;
		var no_ya4=0;
		var no_ya5=0;
		var no_ya6=0;
		var no_ya7=0;
		var no_ya8=0;
		var no_ya9=0;
		var no_ya10=0;

		var no_su1=0;
		var no_su2=0;
		var no_su3=0;
		var no_su4=0;
		var no_su5=0;
		var no_su6=0;
		var no_su7=0;
		var no_su8=0;
		var no_su9=0;
		var no_su10=0;

		var chuouchi=0;

		for ( var ii = 0; ii < tehuda.length; ii++) {

		if(tehuda[ii]._number>=10) {
      		tasu=10;
     		}
		else if(2<=tehuda[ii]._number<=9) {
    		tasu=tehuda[ii]._number;
   		}
   		else if(tehuda[ii]._number==1 && (fake_sum+11)<=21) {
    		tasu=11;
   		}
		else {
    		tasu=1;
   		}
		
	
		fake_sum +=tasu;

		}


		kijun=18-fake_sum;

	// 捨て札を数える
 		for ( var jj = 0; jj < sutehuda.length; jj++) {
		if(sutehuda[jj]._number==1) {
  		no_su1 +=1;
 		}
		else if(sutehuda[jj]._number==2) {
  		no_su2 +=1;
 		}
		else if(sutehuda[jj]._number==3) {
  		no_su3 +=1;
 		}
		else if(sutehuda[jj]._number==4) {
  		no_su4 +=1;
 		}
		else if(sutehuda[jj]._number==5) {
  		no_su5 +=1;
 		}
		else if(sutehuda[jj]._number==6) {
  		no_su6 +=1;
 		}
		else if(sutehuda[jj]._number==7) {
  		no_su7 +=1;
 		}
		else if(sutehuda[jj]._number==8) {
  		no_su8 +=1;
 		}
		else if(sutehuda[jj]._number==9) {
  		no_su9 +=1;
 		}
 		else{
  		no_su10 +=1;
 		}
 		}

	// 山札の累積枚数を1からカウント　１つの数字につき0～４枚ある。
		no_ya1=4-no_su1;
		no_ya2=4-no_su2+no_ya1;
		no_ya3=4-no_su3+no_ya2;
		no_ya4=4-no_su4+no_ya3;
		no_ya5=4-no_su5+no_ya4;
		no_ya6=4-no_su6+no_ya5;
		no_ya7=4-no_su7+no_ya6;
		no_ya8=4-no_su8+no_ya7;
		no_ya9=4-no_su9+no_ya8;
		no_ya10=16-no_su10+no_ya9;

	// 山札の中央値を求める。
		if(yamahuda_cnt/2<=no_ya1) {
  		chuouchi=1;
 		}
		else if(no_ya1<yamahuda_cnt/2<=no_ya2) {
  		chuouchi=2;
 		}
		else if(no_ya2<yamahuda_cnt/2<=no_ya3) {
  		chuouchi=3;
 		}
		else if(no_ya3<yamahuda_cnt/2<=no_ya4) {
  		chuouchi=4;
 		}
		else if(no_ya4<yamahuda_cnt/2<=no_ya5) {
  		chuouchi=5;
 		}
		else if(no_ya5<yamahuda_cnt/2<=no_ya6) {
  		chuouchi=6;
 		}
		else if(no_ya6<yamahuda_cnt/2<=no_ya7) {
  		chuouchi=7;
 		}
		else if(no_ya7<yamahuda_cnt/2<=no_ya8) {
  		chuouchi=8;
 		}
		else if(no_ya8<yamahuda_cnt/2<=no_ya9) {
  		chuouchi=9;
 		}
		else if(no_ya10<yamahuda_cnt/2) {
  		chuouchi=10;
 		}
 		else{
  	
 		}



	

	// 中央値以下のカードを引く確率が50％～を上回る場合にカードを引く

		if(  chuouchi<=kijun   ) {
			return(true) ;
		}

		return(false) ;
	}


};
