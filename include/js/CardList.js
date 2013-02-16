function CardList() {
	this._list = new Array() ;

	this.move = function(start, num, target) {
		var ary = this._list.slice(start, num) ;
		for ( var ii = 0; ii < ary.length; ii++) {
			target._list.push(ary[ii]) ;
		}
		this._list.splice(start, num) ;
	}

	this.clone = function() {
		var result = new CardList() ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			result._list.push(this._list[ii].clone()) ;
		}
		return(result) ;
	}
	this.clone_list = function() {
		var result = new Array() ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			result.push(this._list[ii].clone()) ;
		}
		return(result) ;
	}
	
	this.getSumNumber = function() {
		// �o�[�X�g���肵�����ʂ�Ԃ��B
		// �o�[�X�g���Ă��Ȃ��ꍇ��num�����̂܂ܕԂ��B
		function getBurstJudgResult(num) {
			if( num <= 21 ) {
				return(num) ;
			}
			return(BURST) ;
		}
		
		var ace_num = 0 ;
		var sum = 0 ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			switch (this._list[ii]._number){
			case 1: // ACE�͌�Ōv�Z����
				ace_num ++ ;
				break ;
			case 2: 
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			case 10:
				sum += this._list[ii]._number ;
				break ;
			case 11:
			case 12:
			case 13:
				sum += 10 ;
				break ;
			default: // �z��O�E�E�E
				throw new Error('�v���O�����~�X�̂悤�ł��B�z��O�̃J�[�h[' + this._list[ii].toString() + ']�ł��B') ;
			}		
		}
		// ACE���Ȃ��Ȃ炱���ŏI��
		if( ace_num <= 0 ) {
			return(getBurstJudgResult(sum)) ;
		}
			
		// 2���ȏ�ACE����������2���ڈȍ~��1�_�ƃJ�E���g(11���Q��������o�[�X�g�Ȃ̂�)
		sum += (ace_num - 1) ;
			
		// ACE��1�Ƃ��邩11�Ƃ��邩���肵��sum�ɑ����B
		if( getBurstJudgResult(sum + 11) <= BURST ) {
			sum += 1 ;
		}
		else {
			sum += 11 ;
		}
		
	    return(getBurstJudgResult(sum)) ;
	}

	this.toString = function() {
		$result = "" ;
		for ( var ii = 0; ii < this._list.length; ii++) {
			$result += this._list[ii].toString() + "\n" ;
		}
		return($result) ;
	}

	this.fromString = function(str) {
		var tmp = str.split('\n') ;
		this._list = new Array() ;
		for ( var ii = 0; ii < tmp.length; ii++) {
			card = new Card('', -1) ;
			card.fromString(tmp[ii]) ;
			if( card._number >= 1 ) {
				this._list.push(card) ;
			}
		}
	}
	
	this.shuffle = function () {
	    var ii = this._list.length;
	    while(ii){
	        var jj = Math.floor(Math.random()*ii);
	        var kk = this._list[--ii];
	        this._list[ii] = this._list[jj];
	        this._list[jj] = kk;
	    }
	}

}

