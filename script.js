window.addEventListener('load', function() {
    let w, h;
    let mouse = {
        x: undefined,
        y: undefined
    };
    const myCanvas = document.getElementById('myCanvas');
    const ctx = myCanvas.getContext('2d');
    const bubbles = [];
    
    class Bubble {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.r = randInit(0, 40);
            this.v = 10;
            this.vx = randInit(-this.v, this.v);
            this.vy = randInit(1, this.v);
            this.color = 'white';
        };
        draw() {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        };
        update(index) {
            this.y += this.vy;
            if(this.r <= 0 ) this.r = 0, bubbles.splice(index, 1);
            else this.r -= this.r/100;
        };
    };

    resizeCanvas();
    animationLoop();
    
    function randInit(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    };

    function resizeCanvas() {
        w = myCanvas.width = window.innerWidth;
        h = myCanvas.height = window.innerHeight;
    };
    
    function animationLoop() {
        ctx.clearRect(0, 0, w, h);
        bubbles.forEach((e) => {
            e.draw();
            e.update(e.index);
        });
        requestAnimationFrame(animationLoop);
    };

    function mouseMove(e) {
        mouse = {
            x: e.x,
            y: e.y
        };
        bubbles.push(new Bubble(mouse.x, mouse.y));
    };

    function mouseOut() {
        mouse = {
            x: undefined,
            y: undefined
        };
    };
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseout', mouseOut);
});
