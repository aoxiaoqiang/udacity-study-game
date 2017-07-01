// 这是我们的玩家要躲避的敌人
var Enemy = function(i) {
  // 敌人初始化时水平位置
  this.x = -Math.random() * 200 + 200

  // 敌人初始化时垂直方向上的位置
  this.y = 80 * (i % 3) + 65

  // 敌人运行活动的速速
  this.speed = Math.random() * 300 + 100

  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
  // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
  // 都是以同样的速度运行的

  // 超出画布最右侧时，从最左侧开始
  if (this.x > 500) {
    this.x = -100
  } else {
    this.x += this.speed * dt
  }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * 玩家类
 */
var Player = function() {
  this.x = 100      // 初始化水平位置
  this.y = 400      // 初始化垂直位置
  this.sprite = 'images/char-boy.png';  // 敌人的图片
}

// 更新玩家的位置
Player.prototype.update = function() {
  console.log(this.x, this.y)
}

// 在屏幕上画出玩家
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// 根据玩家对键盘的操作更改玩家位置
Player.prototype.handleInput = function(direction) {
  switch (direction) {
    case 'up':
      if (this.y < 72) {
        console.log('超出上边界!')
        this.y = 400
      } else {
        this.y -= 82
      }
      break;
    case 'right':
      if (this.x >= 400) {
        console.log('超出右边界!')
      } else {
        this.x += 100
      }
      break;
    case 'down':
      if (this.y >= 400) {
        console.log('超出下边界!')
      } else {
        this.y += 82
      }
      break;
    case 'left':
      if (this.x < 100) {
        console.log('超出左边界!')
      } else {
        this.x -= 100
      }
      break;
  }
  console.log(this.x, this.y)
}

// 实例化所有(3个)敌人， 放入 allEnemies 数组中。
var allEnemies = []
for (var i = 0; i < 3; i++) {
  allEnemies.push(new Enemy(i))
}

// 实例化一个玩家对象 player
var player = new Player()


// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
