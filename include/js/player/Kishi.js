var Kishi = function Kishi() {
    // 親のコンストラクタを呼び出す
    Player.apply( this, arguments );

    // 作者
    this._author = '岸';

    // ヒットするか判定。
    // @param tehuda       手札(Cardの配列)。
    // @param sutefuda     捨て札(Cardの配列)。他のプレイヤーの持っているカードは含まれません。
    // @param yamahuda_cnt 現在のプレイで残っている山札の枚数(Integer)。
    // @retrun             ヒットする:true ヒットしない:false
    this.isHit = function(tehuda, sutehuda, yamahuda_cnt) {
        /*
         * 場の状況は一切見ず，手札のみで状況判断
         * バースト覚悟で高い手を狙うプラン
         */
        // 手札の数字
        var number = 0;
        // 手札の数字合計
        var sum = 0 ;
        // 手札にあるAceがあるかどうか
        var ace = false;
        // hit/stayの分岐点
        // 場を考慮して変動させられればベスト
        var threshold = 17;

        // Jack/Queen/Kingを10として加算
        for (var i = 0; i < tehuda.length; i++) {
            number = tehuda[i]._number;
            switch (number) {
            case 1:
                sum += number;
                ace = true;
                break;
            case 11:
            case 12:
            case 13:
                sum += 10;
                break;
            default:
                sum += number;
            }
        }

        // aceの処理
        if (ace) {
            sum = (sum + 10 <= 21) ? sum + 10 : sum;
        }

// sutehudaがnull?
//window.alert(sutehuda);

        // hit/stayの判断
        if (sum <= threshold) {
            return true;
        }
        return false;
    }
};
