var Yamamoto = function Yamamoto() {
  // 親のコンストラクタを呼び出す
  Player.apply( this, arguments );
  // 作者
  this._author = '山本' ;
  // トランプの数
  const TRUMP_CNT = 52;
  // バーストラインの数
  const BURST_CNT = 21;

  // ヒットするか判定
  // @param tehuda        手札(Cardの配列)。
  // @param sutefuda      捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
  // @param yamahuda_cnt  現在のプレイで残っている山札の枚数(Integer)。
  // @retrun              ヒットする:true ヒットしない:false
  this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
    var probability = 0;

    // 手札の合計値を計算
    var score = calcScore(tehuda);
    
    // 手札が12未満だったら100%バーストしないのでヒット
    if( score < 12) {
      return(true) ;
    }
    // 手札が21だったら100%バーストするのでスタンド	
    if( score  === BURST_CNT ) {	
      return(false) ;
    }
    // バーストしない確率を計算
    probability = calcSafe(score, tehuda, sutehuda, yamahuda_cnt);
    
    // バーストしない確率を元にヒットするか判断
    return answer(score,probability);
  }

  // 手札の点数を計算する。
  // @param tehuda 		        手札(Cardの配列)。
  // @retrun 				点数
  calcScore = function(tehudas) {	
    var score = 0;
    var hasAce = false;
	  
    tehudas.forEach(function(tehuda){
      // 絵柄カード(J,Q,K)は10と判定
      if(tehuda._number >10) {
        tehuda._number = 10;
      }
      // エースを持っているか判定
      if(tehuda._number ===1){
        hasAce = true;
      }
      score += tehuda._number ;  
      });
	
      // エースを持っている場合
      if(hasAce){
        //+10してバーストしなければその値を手札の値とする
        if(score+10 <= BURST_CNT){
	  return score+10;
	}
      }
    return score;
  }

  // バーストしない確率を計算
  // @param score         手札の点数  
  // @param tehuda        手札(Cardの配列)。
  // @param sutefuda      捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
  // @param yamahuda_cnt  現在のプレイで残っている山札の枚数(Integer)。
  // @retrun              バーストしない確率
  calcSafe = function(score, tehudas, sutehudas, yamahuda_cnt) {
    var under_burst_cnt = 0;
    var under_burst_pattern = 0;	
    var probability = 0;
    var mystery;
    var i;
    var trump = [];

    // トランプを配列にする
    for (i = 0; i < 13; i++) {
      trump[i] = 4;
    }

    if(yamahuda_cnt !== 0){
      // 手札をトランプの配列に反映する
      tehudas.forEach(function(tehuda){
        trump[tehuda._number -1] -= 1;
      });

      // 捨て札をトランプの配列に反映する
      sutehudas.forEach(function(sutehuda){
        trump[sutehuda._number -1] -= 1;
      });
    }else{
      yamahuda_cnt = TRUMP_CNT;
    }

    // under_burst_cnt以下だとバーストしない
    under_burst_cnt = BURST_CNT - score;
    // under_burst_cnt以下でまだ捨て札に出ていない手札の数を集計		
    for(i=0; i < under_burst_cnt; i++){
      under_burst_pattern += trump[i];
    }
    // 不確定要素を含めずに確率計算
    probability = under_burst_pattern/yamahuda_cnt;
		
    if(yamahuda_cnt !== TRUMP_CNT){
      // 不確定要素(自分以外のプレイヤーが持っている手札の合計)
      mystery = (TRUMP_CNT - (yamahuda_cnt + sutehudas.length + tehudas.length));
      // 不確定要素がバーストしないパターンにどれぐらい含まれているか推測
      under_burst_pattern -= mystery * probability;
      //  alert(under_burst_pattern);
      // 不確定要素を含めた確率
      probability = under_burst_pattern/yamahuda_cnt;		      
    }
    return probability;
  }

  // 手札とバーストしない確率を元にヒットかスタンドを決断する
  // @param score        手札の点数  
  // @param probability  バーストしない確率
  // @retrun             ヒットする:true ヒットしない:false  
  answer = function(score,probability) {
    var obj = {
      20:1.0,
      19:0.75,
      18:0.7,
      17:0.5,
      16:0.0,
      15:0.0,
      14:0.0,
      13:0.0,
      12:0.0
    };
    var i;
    for (i in obj) {
      if( score  === parseInt(i) ){
        if(probability >= parseFloat(obj[i]) || parseFloat(obj[i]) === 0.0) {
          return true;
        }
      }
    }
    return(false) ; 
  }
};