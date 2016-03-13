
var OverLayer = cc.Layer.extend({
    _score:null,
    ctor:function () {

        this._super();


        var size = cc.winSize;

        //background
        var background = new cc.Sprite(res.scene_jpg);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);

        //分数
        this._score = new cc.LabelTTF("0","",50);
        this._score.setPosition(size.width/2,size.height/2+100);
        this.addChild(this._score);

        //continue button
        var continueBtn=new ccui.Button(res.continue_png);
        continueBtn.setPosition(size.width/2,size.height/2-100);
        this.addChild(continueBtn);

        continueBtn.addClickEventListener(function(){
            cc.director.popScene();
        });

        return true;
    },
    setScore:function(value){
        this._score.setString(value);
    }
});

var OverScene = cc.Scene.extend({
    _layer:null,
    ctor:function(){
        this._super();
        this._layer = new OverLayer();
        this.addChild(this._layer);
    },

    onEnter:function () {
        this._super();

    },
    setScore:function(value){
        this._layer.setScore(value);
    }
});

