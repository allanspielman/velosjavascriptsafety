/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */
(function(a) {
    a.jqplot.CanvasTextRenderer = function(b) {
        this.fontStyle = "normal";
        this.fontVariant = "normal";
        this.fontWeight = "normal";
        this.fontSize = "10px";
        this.fontFamily = "sans-serif";
        this.fontStretch = 1;
        this.fillStyle = "#666666";
        this.angle = 0;
        this.textAlign = "start";
        this.textBaseline = "alphabetic";
        this.text;
        this.width;
        this.height;
        this.pt2px = 1.28;
        a.extend(true, this, b);
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize);
        this.setHeight()
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.init = function(b) {
        a.extend(true, this, b);
        this.normalizedFontSize = this.normalizeFontSize(this.fontSize);
        this.setHeight()
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.normalizeFontSize = function(b) {
        b = String(b);
        var c = parseFloat(b);
        if (b.indexOf("px") > -1) {
            return c / this.pt2px
        } else {
            if (b.indexOf("pt") > -1) {
                return c
            } else {
                if (b.indexOf("em") > -1) {
                    return c * 12
                } else {
                    if (b.indexOf("%") > -1) {
                        return c * 12 / 100
                    } else {
                        return c / this.pt2px
                    }
                }
            }
        }
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.fontWeight2Float = function(b) {
        if (Number(b)) {
            return b / 400
        } else {
            switch (b) {
            case "normal":
                return 1;
                break;
            case "bold":
                return 1.75;
                break;
            case "bolder":
                return 2.25;
                break;
            case "lighter":
                return 0.75;
                break;
            default:
                return 1;
                break
            }
        }
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.getText = function() {
        return this.text
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.setText = function(c, b) {
        this.text = c;
        this.setWidth(b);
        return this
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.getWidth = function(b) {
        return this.width
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.setWidth = function(c, b) {
        if (!b) {
            this.width = this.measure(c, this.text)
        } else {
            this.width = b
        }
        return this
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.getHeight = function(b) {
        return this.height
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.setHeight = function(b) {
        if (!b) {
            this.height = this.normalizedFontSize * this.pt2px
        } else {
            this.height = b
        }
        return this
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.letter = function(b) {
        return this.letters[b]
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.ascent = function() {
        return this.normalizedFontSize
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.descent = function() {
        return 7 * this.normalizedFontSize / 25
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.measure = function(d, g) {
        var f = 0;
        var b = g.length;
        for (var e = 0; e < b; e++) {
            var h = this.letter(g.charAt(e));
            if (h) {
                f += h.width * this.normalizedFontSize / 25 * this.fontStretch
            }
        }
        return f
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.draw = function(s, n) {
        var r = 0;
        var o = this.height * 0.72;
        var p = 0;
        var l = n.length;
        var k = this.normalizedFontSize / 25;
        s.save();
        var h, f;
        if ((-Math.PI / 2 <= this.angle && this.angle <= 0) || (Math.PI * 3 / 2 <= this.angle && this.angle <= Math.PI * 2)) {
            h = 0;
            f = -Math.sin(this.angle) * this.width
        } else {
            if ((0 < this.angle && this.angle <= Math.PI / 2) || (-Math.PI * 2 <= this.angle && this.angle <= -Math.PI * 3 / 2)) {
                h = Math.sin(this.angle) * this.height;
                f = 0
            } else {
                if ((-Math.PI < this.angle && this.angle < -Math.PI / 2) || (Math.PI <= this.angle && this.angle <= Math.PI * 3 / 2)) {
                    h = -Math.cos(this.angle) * this.width;
                    f = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height
                } else {
                    if ((-Math.PI * 3 / 2 < this.angle && this.angle < Math.PI) || (Math.PI / 2 < this.angle && this.angle < Math.PI)) {
                        h = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width;
                        f = -Math.cos(this.angle) * this.height
                    }
                }
            }
        }
        s.strokeStyle = this.fillStyle;
        s.fillStyle = this.fillStyle;
        s.translate(h, f);
        s.rotate(this.angle);
        s.lineCap = "round";
        var t = (this.normalizedFontSize > 30) ? 2 : 2 + (30 - this.normalizedFontSize) / 20;
        s.lineWidth = t * k * this.fontWeight2Float(this.fontWeight);
        for (var g = 0; g < l; g++) {
            var m = this.letter(n.charAt(g));
            if (!m) {
                continue
            }
            s.beginPath();
            var e = 1;
            var b = 0;
            for (var d = 0; d < m.points.length; d++) {
                var q = m.points[d];
                if (q[0] == -1 && q[1] == -1) {
                    e = 1;
                    continue
                }
                if (e) {
                    s.moveTo(r + q[0] * k * this.fontStretch, o - q[1] * k);
                    e = false
                } else {
                    s.lineTo(r + q[0] * k * this.fontStretch, o - q[1] * k)
                }
            }
            s.stroke();
            r += m.width * k * this.fontStretch
        }
        s.restore();
        return p
    }
    ;
    a.jqplot.CanvasTextRenderer.prototype.letters = {
        " ": {
            width: 16,
            points: []
        },
        "!": {
            width: 10,
            points: [[5, 21], [5, 7], [-1, -1], [5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        '"': {
            width: 16,
            points: [[4, 21], [4, 14], [-1, -1], [12, 21], [12, 14]]
        },
        "#": {
            width: 21,
            points: [[11, 25], [4, -7], [-1, -1], [17, 25], [10, -7], [-1, -1], [4, 12], [18, 12], [-1, -1], [3, 6], [17, 6]]
        },
        "$": {
            width: 20,
            points: [[8, 25], [8, -4], [-1, -1], [12, 25], [12, -4], [-1, -1], [17, 18], [15, 20], [12, 21], [8, 21], [5, 20], [3, 18], [3, 16], [4, 14], [5, 13], [7, 12], [13, 10], [15, 9], [16, 8], [17, 6], [17, 3], [15, 1], [12, 0], [8, 0], [5, 1], [3, 3]]
        },
        "%": {
            width: 24,
            points: [[21, 21], [3, 0], [-1, -1], [8, 21], [10, 19], [10, 17], [9, 15], [7, 14], [5, 14], [3, 16], [3, 18], [4, 20], [6, 21], [8, 21], [10, 20], [13, 19], [16, 19], [19, 20], [21, 21], [-1, -1], [17, 7], [15, 6], [14, 4], [14, 2], [16, 0], [18, 0], [20, 1], [21, 3], [21, 5], [19, 7], [17, 7]]
        },
        "&": {
            width: 26,
            points: [[23, 12], [23, 13], [22, 14], [21, 14], [20, 13], [19, 11], [17, 6], [15, 3], [13, 1], [11, 0], [7, 0], [5, 1], [4, 2], [3, 4], [3, 6], [4, 8], [5, 9], [12, 13], [13, 14], [14, 16], [14, 18], [13, 20], [11, 21], [9, 20], [8, 18], [8, 16], [9, 13], [11, 10], [16, 3], [18, 1], [20, 0], [22, 0], [23, 1], [23, 2]]
        },
        "'": {
            width: 10,
            points: [[5, 19], [4, 20], [5, 21], [6, 20], [6, 18], [5, 16], [4, 15]]
        },
        "(": {
            width: 14,
            points: [[11, 25], [9, 23], [7, 20], [5, 16], [4, 11], [4, 7], [5, 2], [7, -2], [9, -5], [11, -7]]
        },
        ")": {
            width: 14,
            points: [[3, 25], [5, 23], [7, 20], [9, 16], [10, 11], [10, 7], [9, 2], [7, -2], [5, -5], [3, -7]]
        },
        "*": {
            width: 16,
            points: [[8, 21], [8, 9], [-1, -1], [3, 18], [13, 12], [-1, -1], [13, 18], [3, 12]]
        },
        "+": {
            width: 26,
            points: [[13, 18], [13, 0], [-1, -1], [4, 9], [22, 9]]
        },
        ",": {
            width: 10,
            points: [[6, 1], [5, 0], [4, 1], [5, 2], [6, 1], [6, -1], [5, -3], [4, -4]]
        },
        "-": {
            width: 18,
            points: [[6, 9], [12, 9]]
        },
        ".": {
            width: 10,
            points: [[5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        "/": {
            width: 22,
            points: [[20, 25], [2, -7]]
        },
        "0": {
            width: 20,
            points: [[9, 21], [6, 20], [4, 17], [3, 12], [3, 9], [4, 4], [6, 1], [9, 0], [11, 0], [14, 1], [16, 4], [17, 9], [17, 12], [16, 17], [14, 20], [11, 21], [9, 21]]
        },
        "1": {
            width: 20,
            points: [[6, 17], [8, 18], [11, 21], [11, 0]]
        },
        "2": {
            width: 20,
            points: [[4, 16], [4, 17], [5, 19], [6, 20], [8, 21], [12, 21], [14, 20], [15, 19], [16, 17], [16, 15], [15, 13], [13, 10], [3, 0], [17, 0]]
        },
        "3": {
            width: 20,
            points: [[5, 21], [16, 21], [10, 13], [13, 13], [15, 12], [16, 11], [17, 8], [17, 6], [16, 3], [14, 1], [11, 0], [8, 0], [5, 1], [4, 2], [3, 4]]
        },
        "4": {
            width: 20,
            points: [[13, 21], [3, 7], [18, 7], [-1, -1], [13, 21], [13, 0]]
        },
        "5": {
            width: 20,
            points: [[15, 21], [5, 21], [4, 12], [5, 13], [8, 14], [11, 14], [14, 13], [16, 11], [17, 8], [17, 6], [16, 3], [14, 1], [11, 0], [8, 0], [5, 1], [4, 2], [3, 4]]
        },
        "6": {
            width: 20,
            points: [[16, 18], [15, 20], [12, 21], [10, 21], [7, 20], [5, 17], [4, 12], [4, 7], [5, 3], [7, 1], [10, 0], [11, 0], [14, 1], [16, 3], [17, 6], [17, 7], [16, 10], [14, 12], [11, 13], [10, 13], [7, 12], [5, 10], [4, 7]]
        },
        "7": {
            width: 20,
            points: [[17, 21], [7, 0], [-1, -1], [3, 21], [17, 21]]
        },
        "8": {
            width: 20,
            points: [[8, 21], [5, 20], [4, 18], [4, 16], [5, 14], [7, 13], [11, 12], [14, 11], [16, 9], [17, 7], [17, 4], [16, 2], [15, 1], [12, 0], [8, 0], [5, 1], [4, 2], [3, 4], [3, 7], [4, 9], [6, 11], [9, 12], [13, 13], [15, 14], [16, 16], [16, 18], [15, 20], [12, 21], [8, 21]]
        },
        "9": {
            width: 20,
            points: [[16, 14], [15, 11], [13, 9], [10, 8], [9, 8], [6, 9], [4, 11], [3, 14], [3, 15], [4, 18], [6, 20], [9, 21], [10, 21], [13, 20], [15, 18], [16, 14], [16, 9], [15, 4], [13, 1], [10, 0], [8, 0], [5, 1], [4, 3]]
        },
        ":": {
            width: 10,
            points: [[5, 14], [4, 13], [5, 12], [6, 13], [5, 14], [-1, -1], [5, 2], [4, 1], [5, 0], [6, 1], [5, 2]]
        },
        ";": {
            width: 10,
            points: [[5, 14], [4, 13], [5, 12], [6, 13], [5, 14], [-1, -1], [6, 1], [5, 0], [4, 1], [5, 2], [6, 1], [6, -1], [5, -3], [4, -4]]
        },
        "<": {
            width: 24,
            points: [[20, 18], [4, 9], [20, 0]]
        },
        "=": {
            width: 26,
            points: [[4, 12], [22, 12], [-1, -1], [4, 6], [22, 6]]
        },
        ">": {
            width: 24,
            points: [[4, 18], [20, 9], [4, 0]]
        },
        "?": {
            width: 18,
            points: [[3, 16], [3, 17], [4, 19], [5, 20], [7, 21], [11, 21], [13, 20], [14, 19], [15, 17], [15, 15], [14, 13], [13, 12], [9, 10], [9, 7], [-1, -1], [9, 2], [8, 1], [9, 0], [10, 1], [9, 2]]
        },
        "@": {
            width: 27,
            points: [[18, 13], [17, 15], [15, 16], [12, 16], [10, 15], [9, 14], [8, 11], [8, 8], [9, 6], [11, 5], [14, 5], [16, 6], [17, 8], [-1, -1], [12, 16], [10, 14], [9, 11], [9, 8], [10, 6], [11, 5], [-1, -1], [18, 16], [17, 8], [17, 6], [19, 5], [21, 5], [23, 7], [24, 10], [24, 12], [23, 15], [22, 17], [20, 19], [18, 20], [15, 21], [12, 21], [9, 20], [7, 19], [5, 17], [4, 15], [3, 12], [3, 9], [4, 6], [5, 4], [7, 2], [9, 1], [12, 0], [15, 0], [18, 1], [20, 2], [21, 3], [-1, -1], [19, 16], [18, 8], [18, 6], [19, 5]]
        },
        A: {
            width: 18,
            points: [[9, 21], [1, 0], [-1, -1], [9, 21], [17, 0], [-1, -1], [4, 7], [14, 7]]
        },
        B: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 15], [17, 13], [16, 12], [13, 11], [-1, -1], [4, 11], [13, 11], [16, 10], [17, 9], [18, 7], [18, 4], [17, 2], [16, 1], [13, 0], [4, 0]]
        },
        C: {
            width: 21,
            points: [[18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5]]
        },
        D: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [11, 21], [14, 20], [16, 18], [17, 16], [18, 13], [18, 8], [17, 5], [16, 3], [14, 1], [11, 0], [4, 0]]
        },
        E: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [17, 21], [-1, -1], [4, 11], [12, 11], [-1, -1], [4, 0], [17, 0]]
        },
        F: {
            width: 18,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [17, 21], [-1, -1], [4, 11], [12, 11]]
        },
        G: {
            width: 21,
            points: [[18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [18, 8], [-1, -1], [13, 8], [18, 8]]
        },
        H: {
            width: 22,
            points: [[4, 21], [4, 0], [-1, -1], [18, 21], [18, 0], [-1, -1], [4, 11], [18, 11]]
        },
        I: {
            width: 8,
            points: [[4, 21], [4, 0]]
        },
        J: {
            width: 16,
            points: [[12, 21], [12, 5], [11, 2], [10, 1], [8, 0], [6, 0], [4, 1], [3, 2], [2, 5], [2, 7]]
        },
        K: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [18, 21], [4, 7], [-1, -1], [9, 12], [18, 0]]
        },
        L: {
            width: 17,
            points: [[4, 21], [4, 0], [-1, -1], [4, 0], [16, 0]]
        },
        M: {
            width: 24,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [12, 0], [-1, -1], [20, 21], [12, 0], [-1, -1], [20, 21], [20, 0]]
        },
        N: {
            width: 22,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [18, 0], [-1, -1], [18, 21], [18, 0]]
        },
        O: {
            width: 22,
            points: [[9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [19, 8], [19, 13], [18, 16], [17, 18], [15, 20], [13, 21], [9, 21]]
        },
        P: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 14], [17, 12], [16, 11], [13, 10], [4, 10]]
        },
        Q: {
            width: 22,
            points: [[9, 21], [7, 20], [5, 18], [4, 16], [3, 13], [3, 8], [4, 5], [5, 3], [7, 1], [9, 0], [13, 0], [15, 1], [17, 3], [18, 5], [19, 8], [19, 13], [18, 16], [17, 18], [15, 20], [13, 21], [9, 21], [-1, -1], [12, 4], [18, -2]]
        },
        R: {
            width: 21,
            points: [[4, 21], [4, 0], [-1, -1], [4, 21], [13, 21], [16, 20], [17, 19], [18, 17], [18, 15], [17, 13], [16, 12], [13, 11], [4, 11], [-1, -1], [11, 11], [18, 0]]
        },
        S: {
            width: 20,
            points: [[17, 18], [15, 20], [12, 21], [8, 21], [5, 20], [3, 18], [3, 16], [4, 14], [5, 13], [7, 12], [13, 10], [15, 9], [16, 8], [17, 6], [17, 3], [15, 1], [12, 0], [8, 0], [5, 1], [3, 3]]
        },
        T: {
            width: 16,
            points: [[8, 21], [8, 0], [-1, -1], [1, 21], [15, 21]]
        },
        U: {
            width: 22,
            points: [[4, 21], [4, 6], [5, 3], [7, 1], [10, 0], [12, 0], [15, 1], [17, 3], [18, 6], [18, 21]]
        },
        V: {
            width: 18,
            points: [[1, 21], [9, 0], [-1, -1], [17, 21], [9, 0]]
        },
        W: {
            width: 24,
            points: [[2, 21], [7, 0], [-1, -1], [12, 21], [7, 0], [-1, -1], [12, 21], [17, 0], [-1, -1], [22, 21], [17, 0]]
        },
        X: {
            width: 20,
            points: [[3, 21], [17, 0], [-1, -1], [17, 21], [3, 0]]
        },
        Y: {
            width: 18,
            points: [[1, 21], [9, 11], [9, 0], [-1, -1], [17, 21], [9, 11]]
        },
        Z: {
            width: 20,
            points: [[17, 21], [3, 0], [-1, -1], [3, 21], [17, 21], [-1, -1], [3, 0], [17, 0]]
        },
        "[": {
            width: 14,
            points: [[4, 25], [4, -7], [-1, -1], [5, 25], [5, -7], [-1, -1], [4, 25], [11, 25], [-1, -1], [4, -7], [11, -7]]
        },
        "\\": {
            width: 14,
            points: [[0, 21], [14, -3]]
        },
        "]": {
            width: 14,
            points: [[9, 25], [9, -7], [-1, -1], [10, 25], [10, -7], [-1, -1], [3, 25], [10, 25], [-1, -1], [3, -7], [10, -7]]
        },
        "^": {
            width: 16,
            points: [[6, 15], [8, 18], [10, 15], [-1, -1], [3, 12], [8, 17], [13, 12], [-1, -1], [8, 17], [8, 0]]
        },
        _: {
            width: 16,
            points: [[0, -2], [16, -2]]
        },
        "`": {
            width: 10,
            points: [[6, 21], [5, 20], [4, 18], [4, 16], [5, 15], [6, 16], [5, 17]]
        },
        a: {
            width: 19,
            points: [[15, 14], [15, 0], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        b: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 11], [6, 13], [8, 14], [11, 14], [13, 13], [15, 11], [16, 8], [16, 6], [15, 3], [13, 1], [11, 0], [8, 0], [6, 1], [4, 3]]
        },
        c: {
            width: 18,
            points: [[15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        d: {
            width: 19,
            points: [[15, 21], [15, 0], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        e: {
            width: 18,
            points: [[3, 8], [15, 8], [15, 10], [14, 12], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        f: {
            width: 12,
            points: [[10, 21], [8, 21], [6, 20], [5, 17], [5, 0], [-1, -1], [2, 14], [9, 14]]
        },
        g: {
            width: 19,
            points: [[15, 14], [15, -2], [14, -5], [13, -6], [11, -7], [8, -7], [6, -6], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        h: {
            width: 19,
            points: [[4, 21], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0]]
        },
        i: {
            width: 8,
            points: [[3, 21], [4, 20], [5, 21], [4, 22], [3, 21], [-1, -1], [4, 14], [4, 0]]
        },
        j: {
            width: 10,
            points: [[5, 21], [6, 20], [7, 21], [6, 22], [5, 21], [-1, -1], [6, 14], [6, -3], [5, -6], [3, -7], [1, -7]]
        },
        k: {
            width: 17,
            points: [[4, 21], [4, 0], [-1, -1], [14, 14], [4, 4], [-1, -1], [8, 8], [15, 0]]
        },
        l: {
            width: 8,
            points: [[4, 21], [4, 0]]
        },
        m: {
            width: 30,
            points: [[4, 14], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0], [-1, -1], [15, 10], [18, 13], [20, 14], [23, 14], [25, 13], [26, 10], [26, 0]]
        },
        n: {
            width: 19,
            points: [[4, 14], [4, 0], [-1, -1], [4, 10], [7, 13], [9, 14], [12, 14], [14, 13], [15, 10], [15, 0]]
        },
        o: {
            width: 19,
            points: [[8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3], [16, 6], [16, 8], [15, 11], [13, 13], [11, 14], [8, 14]]
        },
        p: {
            width: 19,
            points: [[4, 14], [4, -7], [-1, -1], [4, 11], [6, 13], [8, 14], [11, 14], [13, 13], [15, 11], [16, 8], [16, 6], [15, 3], [13, 1], [11, 0], [8, 0], [6, 1], [4, 3]]
        },
        q: {
            width: 19,
            points: [[15, 14], [15, -7], [-1, -1], [15, 11], [13, 13], [11, 14], [8, 14], [6, 13], [4, 11], [3, 8], [3, 6], [4, 3], [6, 1], [8, 0], [11, 0], [13, 1], [15, 3]]
        },
        r: {
            width: 13,
            points: [[4, 14], [4, 0], [-1, -1], [4, 8], [5, 11], [7, 13], [9, 14], [12, 14]]
        },
        s: {
            width: 17,
            points: [[14, 11], [13, 13], [10, 14], [7, 14], [4, 13], [3, 11], [4, 9], [6, 8], [11, 7], [13, 6], [14, 4], [14, 3], [13, 1], [10, 0], [7, 0], [4, 1], [3, 3]]
        },
        t: {
            width: 12,
            points: [[5, 21], [5, 4], [6, 1], [8, 0], [10, 0], [-1, -1], [2, 14], [9, 14]]
        },
        u: {
            width: 19,
            points: [[4, 14], [4, 4], [5, 1], [7, 0], [10, 0], [12, 1], [15, 4], [-1, -1], [15, 14], [15, 0]]
        },
        v: {
            width: 16,
            points: [[2, 14], [8, 0], [-1, -1], [14, 14], [8, 0]]
        },
        w: {
            width: 22,
            points: [[3, 14], [7, 0], [-1, -1], [11, 14], [7, 0], [-1, -1], [11, 14], [15, 0], [-1, -1], [19, 14], [15, 0]]
        },
        x: {
            width: 17,
            points: [[3, 14], [14, 0], [-1, -1], [14, 14], [3, 0]]
        },
        y: {
            width: 16,
            points: [[2, 14], [8, 0], [-1, -1], [14, 14], [8, 0], [6, -4], [4, -6], [2, -7], [1, -7]]
        },
        z: {
            width: 17,
            points: [[14, 14], [3, 0], [-1, -1], [3, 14], [14, 14], [-1, -1], [3, 0], [14, 0]]
        },
        "{": {
            width: 14,
            points: [[9, 25], [7, 24], [6, 23], [5, 21], [5, 19], [6, 17], [7, 16], [8, 14], [8, 12], [6, 10], [-1, -1], [7, 24], [6, 22], [6, 20], [7, 18], [8, 17], [9, 15], [9, 13], [8, 11], [4, 9], [8, 7], [9, 5], [9, 3], [8, 1], [7, 0], [6, -2], [6, -4], [7, -6], [-1, -1], [6, 8], [8, 6], [8, 4], [7, 2], [6, 1], [5, -1], [5, -3], [6, -5], [7, -6], [9, -7]]
        },
        "|": {
            width: 8,
            points: [[4, 25], [4, -7]]
        },
        "}": {
            width: 14,
            points: [[5, 25], [7, 24], [8, 23], [9, 21], [9, 19], [8, 17], [7, 16], [6, 14], [6, 12], [8, 10], [-1, -1], [7, 24], [8, 22], [8, 20], [7, 18], [6, 17], [5, 15], [5, 13], [6, 11], [10, 9], [6, 7], [5, 5], [5, 3], [6, 1], [7, 0], [8, -2], [8, -4], [7, -6], [-1, -1], [8, 8], [6, 6], [6, 4], [7, 2], [8, 1], [9, -1], [9, -3], [8, -5], [7, -6], [5, -7]]
        },
        "~": {
            width: 24,
            points: [[3, 6], [3, 8], [4, 11], [6, 12], [8, 12], [10, 11], [14, 8], [16, 7], [18, 7], [20, 8], [21, 10], [-1, -1], [3, 8], [4, 10], [6, 11], [8, 11], [10, 10], [14, 7], [16, 6], [18, 6], [20, 7], [21, 10], [21, 12]]
        }
    };
    a.jqplot.CanvasFontRenderer = function(b) {
        b = b || {};
        if (!b.pt2px) {
            b.pt2px = 1.5
        }
        a.jqplot.CanvasTextRenderer.call(this, b)
    }
    ;
    a.jqplot.CanvasFontRenderer.prototype = new a.jqplot.CanvasTextRenderer({});
    a.jqplot.CanvasFontRenderer.prototype.constructor = a.jqplot.CanvasFontRenderer;
    a.jqplot.CanvasFontRenderer.prototype.measure = function(c, e) {
        var d = this.fontSize + " " + this.fontFamily;
        c.save();
        c.font = d;
        var b = c.measureText(e).width;
        c.restore();
        return b
    }
    ;
    a.jqplot.CanvasFontRenderer.prototype.draw = function(e, g) {
        var c = 0;
        var h = this.height * 0.72;
        e.save();
        var d, b;
        if ((-Math.PI / 2 <= this.angle && this.angle <= 0) || (Math.PI * 3 / 2 <= this.angle && this.angle <= Math.PI * 2)) {
            d = 0;
            b = -Math.sin(this.angle) * this.width
        } else {
            if ((0 < this.angle && this.angle <= Math.PI / 2) || (-Math.PI * 2 <= this.angle && this.angle <= -Math.PI * 3 / 2)) {
                d = Math.sin(this.angle) * this.height;
                b = 0
            } else {
                if ((-Math.PI < this.angle && this.angle < -Math.PI / 2) || (Math.PI <= this.angle && this.angle <= Math.PI * 3 / 2)) {
                    d = -Math.cos(this.angle) * this.width;
                    b = -Math.sin(this.angle) * this.width - Math.cos(this.angle) * this.height
                } else {
                    if ((-Math.PI * 3 / 2 < this.angle && this.angle < Math.PI) || (Math.PI / 2 < this.angle && this.angle < Math.PI)) {
                        d = Math.sin(this.angle) * this.height - Math.cos(this.angle) * this.width;
                        b = -Math.cos(this.angle) * this.height
                    }
                }
            }
        }
        e.strokeStyle = this.fillStyle;
        e.fillStyle = this.fillStyle;
        var f = this.fontSize + " " + this.fontFamily;
        e.font = f;
        e.translate(d, b);
        e.rotate(this.angle);
        e.fillText(g, c, h);
        e.restore()
    }
}
)(jQuery);
