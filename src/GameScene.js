
var GameLayer = cc.Layer.extend({
    _countdown:0,
    _scoreValue:0,
    _score:null,
    _time:null,
    _birdLayer:null,
    _touchEvent:null,
    _birdList:null,
    _birdRect:[
                 cc.rect(0,0,320,240),
                 cc.rect(320,0,320,240),
                 cc.rect(320,240,320,240),
                 cc.rect(0,240,320,240)
                ],
    ctor:function () {

        this._super();
        this._countdown=10000;
        this._scoreValue=0;
        this._birdList=[];

        var size = cc.winSize;

        //background
        var background = new cc.Sprite(res.scene_jpg);
        background.setPosition(size.width/2,size.height/2);
        this.addChild(background);



        //分数
        this._score = new cc.LabelTTF("0","",50);
        this._score.setAnchorPoint(0,1);
        this._score.setPosition(10,size.height-10);
        this.addChild(this._score);

        //倒计时
        this._time = new cc.LabelTTF(Math.floor(this._countdown/1000)+"'","",50);
        this._time.setAnchorPoint(1,1);
        this._time.setPosition(size.width-10,size.height-10);
        this.addChild(this._time);

        //小鸟层

        this._birdLayer = new cc.Node();
        this.addChild(this._birdLayer);


        return true;
    },
        onEnter:function () {
            this._super();
            this._step=0;
            this.scheduleUpdate();

            //添加鼠标事件
            var me = this;
            this._touchEvent=cc.EventListener.create({
                event:cc.EventListener.TOUCH_ONE_BY_ONE,
                swallowTouches:true,
                onTouchBegan:function(touch,event){
                    for(var i=me._birdList.length-1;i>=0;i--){
                        var bird=me._birdList[i];
                        var box=bird.getBoundingBox();
                        if(cc.rectContainsRect(box,touch.getLocation())){
                            me._scoreValue+=1;
                            me._score.setString(me._scoreValue);
                            me._birdList.splice(i,1);
                            bird.removeFromParent();
                            break;
                        }
                    }
                    return false;
                }
            });
            cc.eventManager.addListener(this._touchEvent,this);
        },
        onExit:function(){
            this._super();
            this.unscheduleUpdate();
            cc.eventManager.removeListener(this._touchEvent);
        },
        update:function(dt){
            this._step++;
            var size=cc.winSize;
            this._countdown-=dt*1000;
            this._time.setString(Math.floor(this._countdown/1000)+"'");
            if(this._countdown<=0){
                //end game
                var gameOver=new OverScene();
                cc.director.runScene(gameOver);
                gameOver.setScore(this._scoreValue);
            }
            if(this._step%20==0){
                //create bird
                var way = Math.random()<0.5?1:-1;
                var startPos = cc.p(way==1?size.width:0,Math.random()*size.height);
                var endPos = cc.p(way==1?0:size.width,Math.random()*size.height);
                var time = Math.floor(1+Math.random()*3);

                var bird = new cc.Sprite(res.bird_png,this._birdRect[Math.floor(Math.random()*4)]);
                bird.setScale(-0.5*way,0.5);
                bird.setAnchorPoint(cc.p(0,0.5));
                bird.setPosition(startPos);
                this._birdLayer.addChild(bird);
                this._birdList.push(bird);
                var me = this;
                bird.runAction(new cc.Sequence(
                    new cc.MoveTo(time,endPos),
                    new cc.CallFunc(function(){
                        for(var i=0;i<me._birdList.length;i++){
                            if(me._birdList[i]==bird){
                                me._birdList.splice(i,1);
                                bird.removeFromParent();
                                break;
                            }
                        }
                    })
                ));
            }

        }
});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

