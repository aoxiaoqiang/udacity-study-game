"use strict";

// 这是我们的玩家要躲避的敌人
var Enemy = function(i) {
  // 敌人初始化时水平位置
  this.x = -Math.random() * 200 + 200;

  // 敌人初始化时垂直方向上的位置
  this.y = 80 * (i % 3) + 65;

  // 敌人运行活动的速速
  this.speed = Math.random() * 300 + 100;

  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png';
};

/**
 * 此为游戏必须的函数，用来更新敌人的位置
 * @param  {number} dt 表示时间间隙
 */
Enemy.prototype.update = function(dt) {
  // 获取canvas宽度
  var canvas_width = canvas.width;

  // 超出画布最右侧时，从最左侧开始
  if (this.x > canvas_width) {
    this.x = -100;
  } else {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
    this.x += this.speed * dt;
  }
};

/**
 * 此为游戏必须的函数，用来在屏幕上画出敌人
 */
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * 玩家类
 */
var Player = function() {
  // 初始化水平位置
  this.x = Math.floor(Math.random() * 5) * 100;

  // 初始化垂直位置
  this.y = 400;

  // 玩家的图片
  this.sprite = 'images/char-boy.png';

  // 玩家移动次数
  this.moveTime = 0

  // 玩家积分
  this.score = 0

  // 玩家失败次数
  this.deathTime = 0
}

/**
 * 更新玩家统计数据(移动次数, 成功次数, 失败次数)
 */
Player.prototype.updateScore = function() {
  document.querySelector('#moveTime').innerText = this.moveTime
  document.querySelector('#score').innerText = this.score
  document.querySelector('#deathTime').innerText = this.deathTime

  // 积分等级不同显示不同的用户皮肤图片
  switch(this.score){
    case 2:
      this.sprite = 'images/char-cat-girl.png';
      break;
    case 5:
      this.sprite = 'images/char-horn-girl.png';
      break;
    case 9:
      this.sprite = 'images/char-pink-girl.png';
      break;
    case 14:
      this.sprite = 'images/char-princess-girl.png';
      break;
  }
}

/**
 * 更新玩家的位置,处理碰撞事件
 */
Player.prototype.update = function() {
  crashHandle();
}

/**
 * 在屏幕上画出玩家
 */
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * 根据玩家对键盘的操作更改玩家位置
 * @param  {string} direction 玩家方向键(up, right, down, left)
 */
Player.prototype.handleInput = function(direction) {
  var RIGHT_LIMIT = 400,
    LEFT_LEMIT = 100,
    STEP_Y = 82;

  switch (direction) {
    case 'up':
      this.y -= STEP_Y
      if (this.y == -10) {
        log('到达目的地!');
        this.score += 1;
        // 玩家移动次数统计加1
        this.moveTime++;
      } else {
        if (this.y < 72) {
          log('超出上边界!');
          this.y = RIGHT_LIMIT;
          // this.x = Math.floor(Math.random() * 5) * 100
        }else{
          // 玩家移动次数统计加1
          this.moveTime++;
        }
      }
      break;
    case 'right':
      if (this.x >= RIGHT_LIMIT) {
        log('超出右边界!');
      } else {
        this.x += LEFT_LEMIT;
        // 玩家移动次数统计加1
        this.moveTime++;
      }
      break;
    case 'down':
      if (this.y >= RIGHT_LIMIT) {
        log('超出下边界!');
      } else {
        this.y += STEP_Y;
        // 玩家移动次数统计加1
        this.moveTime++;
      }
      break;
    case 'left':
      if (this.x < LEFT_LEMIT) {
        log('超出左边界!');
      } else {
        this.x -= LEFT_LEMIT;
        // 玩家移动次数统计加1
        this.moveTime++;
      }
      break;
  }
  log(this.x, this.y);
  this.updateScore();
}

// 实例化所有(3个)敌人， 放入 allEnemies 数组中。
var allEnemies = [];
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy(i));
}

// 实例化一个玩家对象 player
var player = new Player();

/**
 * 碰撞检测处理：玩家回到起点位置
 */
function crashHandle() {
  for (var i = 0; i < allEnemies.length; i++) {
    if (Math.abs(player.x - allEnemies[i].x) <= 50 && Math.abs(player.y - allEnemies[i].y) <= 20) {
      log('碰撞发生');
      player.y = 400;
      player.deathTime += 1;
      player.updateScore();
    }
  }
}

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput() 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
  log(e.keyCode)

  var allowedKeys = {
    37: 'left',
    65: 'left',
    38: 'up',
    87: 'up',
    39: 'right',
    68: 'right',
    40: 'down',
    83: 'down'
  };
  // 增加键位(w-> up, d-> right, s-> down, a-> left )
  player.handleInput(allowedKeys[e.keyCode]);
})

var isDebug = false;
/**
 * 控制台输出对象
 * @param  {Object} obj 要输出的对象
 */
function log(obj) {
  if (isDebug) {
    console.log(obj);
  }
}





