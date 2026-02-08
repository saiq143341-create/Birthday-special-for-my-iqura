var canvas;
var stage;
var container;
var captureContainers;
var captureIndex;

function init() {
    // Canvas setup
    canvas = document.getElementById("testCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    stage = new createjs.Stage(canvas);
    canvas.style.backgroundColor = "#ffeef2"; // Background color match

    container = new createjs.Container();
    stage.addChild(container);

    captureContainers = [];
    captureIndex = 0;

    // Heart shape create karna
    var heart = new createjs.Shape();
    heart.graphics.beginFill(createjs.Graphics.getRGB(255, 45, 85, 0.7)); // Heart color
    heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
    heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);

    for (var i = 0; i < 100; i++) {
        var heartClone = heart.clone();
        heartClone.set({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            scaleX: Math.random() * 0.5 + 0.5,
            scaleY: Math.random() * 0.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.2
        });
        
        // Random movement properties
        heartClone.velX = (Math.random() - 0.5) * 2;
        heartClone.velY = -Math.random() * 2 - 1; // Upar ki taraf udna
        
        container.addChild(heartClone);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);
}

function tick(event) {
    var l = container.numChildren;
    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i);
        heart.y += heart.velY;
        heart.x += heart.velX;

        // Agar heart screen ke upar nikal jaye toh niche wapas aa jaye
        if (heart.y < -20) {
            heart.y = canvas.height + 20;
            heart.x = Math.random() * canvas.width;
        }
    }
    stage.update(event);
}

// Window resize handle karne ke liye
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start the animation
init();
