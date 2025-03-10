
function clickEffect() {
    let balls = [];
    let longPressed = false;
    let longPress;
    let multiplier = 0;
    let width, height;
    let origin;
    let normal;
    let ctx;
    const colours = ["#F73859", "#14FFEC", "#00E0FF", "#FF99FE", "#FAF15D"];
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.setAttribute("style", "width: 100%; height: 100%; top: 0; left: 0; z-index: 99999; position: fixed; pointer-events: none;");
    const pointer = document.createElement("span");
    pointer.classList.add("pointer");
    document.body.appendChild(pointer);

    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize();
        window.addEventListener('resize', updateSize, false);
        loop();
        window.addEventListener("mousedown", function (e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function () {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener("mouseup", function (e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY);
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function (e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false);
    } else {
        console.log("canvas or addEventListener is unsupported!");
    }


    function updateSize() {
        canvas.width = window.innerWidth * 2;
        canvas.height = window.innerHeight * 2;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.scale(2, 2);
        width = (canvas.width = window.innerWidth);
        height = (canvas.height = window.innerHeight);
        origin = {
            x: width / 2,
            y: height / 2
        };
        normal = {
            x: width / 2,
            y: height / 2
        };
    }
    class Ball {
        constructor(x = origin.x, y = origin.y) {
            this.x = x;
            this.y = y;
            this.angle = Math.PI * 2 * Math.random();
            if (longPressed == true) {
                this.multiplier = randBetween(14 + multiplier, 15 + multiplier);
            } else {
                this.multiplier = randBetween(6, 12);
            }
            this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
            this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
            this.r = randBetween(8, 12) + 3 * Math.random();
            this.color = colours[Math.floor(Math.random() * colours.length)];
        }
        update() {
            this.x += this.vx - normal.x;
            this.y += this.vy - normal.y;
            normal.x = -2 / window.innerWidth * Math.sin(this.angle);
            normal.y = -2 / window.innerHeight * Math.cos(this.angle);
            this.r -= 0.3;
            this.vx *= 0.9;
            this.vy *= 0.9;
        }
    }

    function pushBalls(count = 1, x = origin.x, y = origin.y) {
        for (let i = 0; i < count; i++) {
            balls.push(new Ball(x, y));
        }
    }

    function randBetween(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    function loop() {
        ctx.fillStyle = "rgba(255, 255, 255, 0)";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.r < 0) continue;
            ctx.fillStyle = b.color;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
            ctx.fill();
            b.update();
        }
        if (longPressed == true) {
            multiplier += 0.2;
        } else if (!longPressed && multiplier >= 0) {
            multiplier -= 0.4;
        }
        removeBall();
        requestAnimationFrame(loop);
    }

    function removeBall() {
        for (let i = 0; i < balls.length; i++) {
            let b = balls[i];
            if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
                balls.splice(i, 1);
            }
        }
    }
}
clickEffect();//调用特效函数


// 鼠标跟随粒子特效

"use strict"; var _createClass = function () { function n(t, e) { for (var i = 0; i < e.length; i++) { var n = e[i]; n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n) } } return function (t, e, i) { return e && n(t.prototype, e), i && n(t, i), t } }(); function _classCallCheck(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") } !function (P) { P.extend({ shuicheMouse: function (t) { (new e).init(t) } }); var e = (_createClass(t, [{ key: "init", value: function (t) { !function () { for (var a = 0, t = ["webkit", "moz"], e = 0; e < t.length && !window.requestAnimationFrame; ++e)window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"]; window.requestAnimationFrame || (window.requestAnimationFrame = function (t, e) { var i = (new Date).getTime(), n = Math.max(0, 16.7 - (i - a)), o = window.setTimeout(function () { t(i + n) }, n); return a = i + n, o }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) { clearTimeout(t) }) }(), t && P.extend(!0, this.defaluts, t); var e = P("<canvas id='shuicheCanvas' style='position: fixed; left: 0px; top: 0px; z-index: 2147483647;pointer-events:none;'></canvas>"); P("body").append(e); var i = this.defaluts.type; 1 <= i && i < 11 && this.mouseType1(this.defaluts.type, this.defaluts.color), 11 == i && this.mouseType2(), 12 == i && this.mouseType3() } }, { key: "mouseType1", value: function (t, e) { var n, o, a, h, i = document.getElementById("shuicheCanvas"), s = i.getContext("2d"), r = P("#shuicheCanvas"), l = [], c = { n: 100, c: 222, bc: "#fff", r: .9, o: .05, a: 1, s: 20 }, d = 0, f = 0, u = 0, y = 0, w = 0, p = 0, v = 0; g(); var m, x = 360 * Math.random(); m = e || "hsl(" + x + ",100%,80%)", P(window).resize(function () { g() }); var M = t; function g() { n = window.innerWidth, o = window.innerHeight, i.width = n, i.height = o, a = n / 2, h = o / 2 } P(window).mousemove(function (t) { a = t.pageX - r.offset().left, h = t.pageY - r.offset().top, 4 == M && (Math.random() <= .5 ? (d = Math.random() <= .5 ? -10 : n + 10, f = Math.random() * o) : (f = Math.random() <= .5 ? -10 : o + 10, d = Math.random() * n), u = 8 * (Math.random() - .5), y = 8 * (Math.random() - .5)), 1 == M || 2 == M || 3 == M ? l.push({ x: a, y: h, r: c.r, o: 1, v: 0 }) : 4 == M ? l.push({ x: a, y: h, r: c.r, o: 1, v: 0, wx: d, wy: f, vx2: u, vy2: y }) : 6 == M && l.push({ x: a + 30 * (Math.random() - .5), y: h + 30 * (Math.random() - .5), o: 1, wx: a, wy: h }) }), function t() { if (1 == M) { s.clearRect(0, 0, n, o); for (var e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.fillStyle = m, s.beginPath(), s.arc(l[e].x, l[e].y, l[e].r, 0, 2 * Math.PI), s.closePath(), s.fill(), l[e].r += c.r, l[e].o -= c.o, l[e].o <= 0 && (l.splice(e, 1), e--) } else if (2 == M) for (s.clearRect(0, 0, n, o), e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.fillStyle = m, s.beginPath(), l[e].r = 10, s.shadowBlur = 20, s.shadowColor = m, s.arc(l[e].x, l[e].y, l[e].r, 0, 2 * Math.PI), s.closePath(), s.fill(), s.shadowBlur = 0, l[e].o -= c.o, l[e].v += c.a, l[e].y += l[e].v, (l[e].y >= o + l[e].r || l[e].o <= 0) && (l.splice(e, 1), e--); else if (3 == M) for (w += 5, s.clearRect(0, 0, n, o), e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.fillStyle = m, s.beginPath(), s.shadowBlur = 20, s.shadowColor = m, l[e].r = 20 * (1 - l[e].y / o), s.arc(l[e].x, l[e].y, l[e].r, 0, 2 * Math.PI), s.closePath(), s.fill(), s.shadowBlur = 0, l[e].o = l[e].y / o, l[e].v += c.a, l[e].y -= c.s, l[e].x += 10 * Math.cos((l[e].y + w) / 100), (l[e].y <= 0 - l[e].r || l[e].o <= 0) && (l.splice(e, 1), e--); else if (4 == M) for (s.clearRect(0, 0, n, o), e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.fillStyle = m, s.beginPath(), s.shadowBlur = 20, s.shadowColor = m, l[e].vx2 += (a - l[e].wx) / 1e3, l[e].vy2 += (h - l[e].wy) / 1e3, l[e].wx += l[e].vx2, l[e].wy += l[e].vy2, l[e].o -= c.o / 2, l[e].r = 10, s.arc(l[e].wx, l[e].wy, l[e].r, 0, 2 * Math.PI), s.closePath(), s.fill(), s.shadowBlur = 0, l[e].o <= 0 && (l.splice(e, 1), e--); else if (5 == M) c.c || (m = "hsl(" + (x += .1) + ",100%,80%)"), s.clearRect(0, 0, n, o), p += 10, s.globalAlpha = 1, s.fillStyle = m, s.shadowBlur = 20, s.shadowColor = m, s.beginPath(), s.arc(a + 50 * Math.cos(p * Math.PI / 180), h + 50 * Math.sin(p * Math.PI / 180), 10, 0, 2 * Math.PI), s.closePath(), s.fill(), s.beginPath(), s.arc(a + 50 * Math.cos((p + 180) * Math.PI / 180), h + 50 * Math.sin((p + 180) * Math.PI / 180), 10, 0, 2 * Math.PI), s.closePath(), s.fill(), s.beginPath(), s.arc(a + 50 * Math.cos((p + 90) * Math.PI / 180), h + 50 * Math.sin((p + 90) * Math.PI / 180), 10, 0, 2 * Math.PI), s.closePath(), s.fill(), s.beginPath(), s.arc(a + 50 * Math.cos((p + 270) * Math.PI / 180), h + 50 * Math.sin((p + 270) * Math.PI / 180), 10, 0, 2 * Math.PI), s.closePath(), s.fill(), s.shadowBlur = 0; else if (6 == M) for (s.clearRect(0, 0, n, o), e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.strokeStyle = m, s.beginPath(), s.lineWidth = 2, s.moveTo(l[e].x, l[e].y), s.lineTo((l[e].wx + l[e].x) / 2 + 20 * Math.random(), (l[e].wy + l[e].y) / 2 + 20 * Math.random()), s.lineTo(l[e].wx, l[e].wy), s.closePath(), s.stroke(), l[e].o -= c.o, l[e].o <= 0 && (l.splice(e, 1), e--); else if (7 == M) for (s.clearRect(0, 0, n, o), l.length < 2 * c.n && (v = 2 * Math.random() * Math.PI, l.push({ x: a + 100 * (Math.random() - .5) * Math.cos(v), y: h + 100 * (Math.random() - .5) * Math.cos(v), o: 1, h: v })), e = 0; e < l.length; e++)s.globalAlpha = l[e].o, s.fillStyle = m, s.beginPath(), l[e].x += (a - l[e].x) / 10, l[e].y += (h - l[e].y) / 10, s.arc(l[e].x, l[e].y, 1, 0, 2 * Math.PI), s.closePath(), s.fill(), l[e].o -= c.o, l[e].o <= 0 && (l[e].h = 2 * Math.random() * Math.PI, l[e].x = a + 100 * (Math.random() - .5) * Math.cos(l[e].h), l[e].y = h + 100 * (Math.random() - .5) * Math.sin(l[e].h), l[e].o = 1); else if (8 == M) for (s.clearRect(0, 0, n, o), s.fillStyle = m, a % 4 == 0 ? a += 1 : a % 4 == 2 ? --a : a % 4 == 3 && (a -= 2), h % 4 == 0 ? h += 1 : h % 4 == 2 ? --h : h % 4 == 3 && (h -= 2), e = a - 60; e < a + 60; e += 4)for (var i = h - 60; i < h + 60; i += 4)Math.sqrt(Math.pow(a - e, 2) + Math.pow(h - i, 2)) <= 60 && (s.globalAlpha = 1 - Math.sqrt(Math.pow(a - e, 2) + Math.pow(h - i, 2)) / 60, Math.random() < .2 && s.fillRect(e, i, 3, 3)); else if (9 == M) for (s.clearRect(0, 0, n, o), s.fillStyle = m, a % 4 == 0 ? a += 1 : a % 4 == 2 ? --a : a % 4 == 3 && (a -= 2), h % 4 == 0 ? h += 1 : h % 4 == 2 ? --h : h % 4 == 3 && (h -= 2), l.length < c.n && l.push({ x: a, y: h, xv: 0, yv: 0, o: 1 }), e = 0; e < l.length; e++)0 == l[e].xv && 0 == l[e].yv ? Math.random() < .5 ? Math.random() < .5 ? l[e].xv = 3 : l[e].xv = -3 : Math.random() < .5 ? l[e].yv = 3 : l[e].yv = -3 : 0 == l[e].xv ? Math.random() < .66 && (l[e].yv = 0, Math.random() < .5 ? l[e].xv = 3 : l[e].xv = -3) : 0 == l[e].yv && Math.random() < .66 && (l[e].xv = 0, Math.random() < .5 ? l[e].yv = 3 : l[e].yv = -3), l[e].o -= c.o / 2, s.globalAlpha = l[e].o, l[e].x += l[e].xv, l[e].y += l[e].yv, s.fillRect(l[e].x, l[e].y, 3, 3), l[e].o <= 0 && (l.splice(e, 1), e--); else if (10 == M) for (s.clearRect(0, 0, n, o), s.fillStyle = m, l.push({ x: a, y: h, xv: 2, yv: 1, o: 1 }), e = 0; e < l.length; e++)l[e].o -= c.o / 10, s.globalAlpha = l[e].o, l[e].x += 4 * (Math.random() - .5), --l[e].y, s.fillRect(l[e].x, l[e].y, 2, 2), l[e].o <= 0 && (l.splice(e, 1), e--); window.requestAnimationFrame(t) }() } }, { key: "mouseType2", value: function () { var t, o, a, h = window.innerWidth, s = window.innerHeight, i = 70, r = 1, l = 1, c = 1.5, n = 25, d = .5 * h, f = .5 * s, u = !1; function e(t) { d = t.clientX - .5 * (window.innerWidth - h), f = t.clientY - .5 * (window.innerHeight - s) } function y(t) { u = !0 } function w(t) { u = !1 } function p(t) { 1 == t.touches.length && (t.preventDefault(), d = t.touches[0].pageX - .5 * (window.innerWidth - h), f = t.touches[0].pageY - .5 * (window.innerHeight - s)) } function v(t) { 1 == t.touches.length && (t.preventDefault(), d = t.touches[0].pageX - .5 * (window.innerWidth - h), f = t.touches[0].pageY - .5 * (window.innerHeight - s)) } function m() { h = window.innerWidth, s = window.innerHeight, t.width = h, t.height = s } function x() { u ? r += .02 * (c - r) : r -= .02 * (r - l), r = Math.min(r, c), o.clearRect(0, 0, o.canvas.width, o.canvas.height); for (var t = 0, e = a.length; t < e; t++) { var i = a[t], n = { x: i.position.x, y: i.position.y }; i.offset.x += i.speed, i.offset.y += i.speed, i.shift.x += (d - i.shift.x) * i.speed, i.shift.y += (f - i.shift.y) * i.speed, i.position.x = i.shift.x + Math.cos(t + i.offset.x) * (i.orbit * r), i.position.y = i.shift.y + Math.sin(t + i.offset.y) * (i.orbit * r), i.position.x = Math.max(Math.min(i.position.x, h), 0), i.position.y = Math.max(Math.min(i.position.y, s), 0), i.size += .01 * (i.targetSize - i.size), Math.round(i.size) == Math.round(i.targetSize) && (i.targetSize = 1 + 2 * Math.random()), o.beginPath(), o.fillStyle = i.fillColor, o.strokeStyle = i.fillColor, o.lineWidth = i.size, o.moveTo(n.x, n.y), o.lineTo(i.position.x, i.position.y), o.stroke(), o.arc(i.position.x, i.position.y, i.size / 2, 0, 2 * Math.PI, !0), o.fill() } window.requestAnimationFrame(x) } (t = document.getElementById("shuicheCanvas")) && t.getContext && (o = t.getContext("2d"), window.addEventListener("mousemove", e, !1), window.addEventListener("mousedown", y, !1), window.addEventListener("mouseup", w, !1), document.addEventListener("touchstart", p, !1), document.addEventListener("touchmove", v, !1), window.addEventListener("resize", m, !1), function () { a = []; for (var t = 0; t < n; t++) { var e = { size: 1, position: { x: d, y: f }, offset: { x: 0, y: 0 }, shift: { x: d, y: f }, speed: .01 + .04 * Math.random(), targetSize: 1, fillColor: "#" + (9453632 * Math.random() + 11184810 | 0).toString(16), orbit: .5 * i + .5 * i * Math.random() }; a.push(e) } }(), m(), x()) } }, { key: "mouseType3", value: function () { var t = P("<div id='shuicheDiv' style='position: fixed;width: 100%;height: " + P(window).height() + "px; left: 0px; top: 0px; z-index: 2147483647;pointer-events:none;'></div>"); P("body").append(t), new (function () { function i(t) { return document.getElementById(t) } function t(t, e) { this.config = e || {}, this.obj = i(t), n = this.config.speed || 4, o = this.config.animR || 1, a = { x: .5 * i(t).offsetWidth, y: .5 * i(t).offsetHeight }, this.setXY(), this.start() } var n, o, a, r = [], l = 0; t.prototype = { setXY: function () { var t, e; this.obj, t = "mousemove", e = function (t) { t = t || window.event, a.x = t.clientX, a.y = t.clientY }, window.addEventListener ? window.addEventListener(t, e, !1) : window.attachEvent("on" + t, function () { e.call(window) }) }, start: function () { Math.PI; var t, e, i = this.config.fn; r[l++] = t = new c(null, 0, 0); for (var n = 0; n < 360; n += 20)for (var o = t, a = 10; a < 35; a += 1) { var h = i(n, a).x, s = i(n, a).y; r[l++] = e = new c(o, h, s), o = e } setInterval(function () { for (var t = 0; t < l; t++)r[t].run() }, 16) } }; var c = function (t, e, i) { var n = document.createElement("span"); this.css = n.style, this.css.backgroundColor = "#2D8CF0", this.css.width = "2px", this.css.height = "2px", this.css.position = "absolute", this.css.left = "-1000px", this.css.zIndex = 1e3 - l, document.getElementById("shuicheDiv").appendChild(n), this.ddx = 0, this.ddy = 0, this.PX = 0, this.PY = 0, this.x = 0, this.y = 0, this.x0 = 0, this.y0 = 0, this.cx = e, this.cy = i, this.parent = t }; return c.prototype.run = function () { this.parent ? (this.x0 = this.parent.x, this.y0 = this.parent.y) : (this.x0 = a.x, this.y0 = a.y), this.x = this.PX += (this.ddx += (this.x0 - this.PX - this.ddx + this.cx) / o) / n, this.y = this.PY += (this.ddy += (this.y0 - this.PY - this.ddy + this.cy) / o) / n, this.css.left = Math.round(this.x) + "px", this.css.top = Math.round(this.y) + "px" }, t }())("shuicheDiv", { speed: 4, animR: 2, fn: function (t, e) { return { x: e / 4 * Math.cos(t), y: e / 4 * Math.sin(t) } } }) } }, { key: "cnblogs", get: function () { return { canvase: "#shuicheCanvase" } } }]), t); function t() { _classCallCheck(this, t), this.defaluts = { type: 1, color: !1 }, this.version = "0.0.1" } }(jQuery);

$.shuicheMouse({ type: 11, color: false })