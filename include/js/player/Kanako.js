var Kanako = function Kanako() {
    Player.apply(this, arguments)
	// 作者
	this._author = '西山 かな子' ; 
    
    // ヒットするか判定。 
    // @param tehuda 		手札(CardList)。
    // @param sutefuda 		捨て札(CardList)。他のプレイヤーの持っているカードは含まれません。
	// @retrun 				ヒットする:true ヒットしない:false
	this.isHit = function(tehuda, sutehuda) {
        //初期化
        var card_sum = 0;
        //エースの数
        var a_count = 0;

        var new_tehuda = [];

        var array_count = 0;
        for (var i = 0; i < tehuda.length ; i++){
            if(tehuda[i]._number > 1){
                new_tehuda.push(tehuda[i]._number);
            }else{
                a_count++;
            }
        }

        //TODO 手札をカウント
        for(var j = 0; j < new_tehuda.length; j++){
            if(new_tehuda[j] > 10){
                card_sum += 10; 
            }else{
                card_sum += new_tehuda[j];
            }
        }
        //TODO A（エース）1 or 11のどちらか
        for(var k = 0 ; k < a_count; k++){
           (card_sum + 11) > 21 ? card_sum += 1 : card_sum += 11;
        }

        if(card_sum < 17){
            return (true);
        }

        if((this.getProbability(card_sum, tehuda, sutehuda)) > 75){
           return (true); 
        }
        //TODO 捨て札と手札から山札に残っているカードを洗い出し、洗いだしたカードで21以下にできるカードが半数以上残っていたらヒット。
        return(false) ;
    }

    this.getProbability = function(card_sum, tehuda, sutehuda){
        var myYamahuda = function() {
            var list = new Array();
            for(var i = 1; i <= 13; i++){
                for(var j = 0; j < 4; j++){
                   list.push(i); 
                }
            }
            return list;
        };
        

        var realYamahuda = myYamahuda();
        //手札と捨て札から山札のカードを算出 
        for(var i = 0; i < tehuda.length; i++){
            for(var j = 0; j < realYamahuda.length; j++){
                if(realYamahuda[j] === tehuda[i]._number){
                    realYamahuda.splice(j,1);
                }
            }
        }
        for(var i = 0; i < sutehuda.length; i++){
            for(var j = 0; j < realYamahuda.length; j++){
                if(realYamahuda[j] === sutehuda[i]._number){
                    realYamahuda.splice(j,1);
                    break;
                }
            }
        }
        
        var meet = 0;

        //21以下にできるカードが半数以上残っているかどうか。
        for(var i = 0; i < realYamahuda.length; i++){
            if((realYamahuda[i] < 10 ? realYamahuda[i] : 10) + card_sum <= 21){
                meet++;
            }
        }
        return meet/realYamahuda.length * 100;
    }

}
