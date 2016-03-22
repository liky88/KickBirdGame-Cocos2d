
var HelloWorldLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {

        this._super();


        var size = cc.winSize;

        //background
        var background = new cc.Sprite(res.scene_jpg);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);

        //start button
        var startBtn=new ccui.Button(res.start_png);
        startBtn.setPosition(size.width/2,size.height/2);
        this.addChild(startBtn);

        startBtn.addClickEventListener(function(){
            cc.director.pushScene(new GameScene());
        });



        return true;
    }
});

//load the initial welcome page
var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});