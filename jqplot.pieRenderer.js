/* jqPlot 1.0.8r1250 | (c) 2009-2013 Chris Leonello | jplot.com
   jsDate | (c) 2010-2013 Chris Leonello
 */
(function(e) {
    e.jqplot.PieRenderer = function() {
        e.jqplot.LineRenderer.call(this)
    }
    ;
    e.jqplot.PieRenderer.prototype = new e.jqplot.LineRenderer();
    e.jqplot.PieRenderer.prototype.constructor = e.jqplot.PieRenderer;
    e.jqplot.PieRenderer.prototype.init = function(q, u) {
        this.diameter = null;
        this.padding = 20;
        this.sliceMargin = 0;
        this.fill = true;
        this.shadowOffset = 2;
        this.shadowAlpha = 0.07;
        this.shadowDepth = 5;
        this.highlightMouseOver = true;
        this.highlightMouseDown = false;
        this.highlightColors = [];
        this.dataLabels = "percent";
        this.showDataLabels = false;
        this.dataLabelFormatString = null;
        this.dataLabelThreshold = 3;
        this.dataLabelPositionFactor = 0.52;
        this.dataLabelNudge = 2;
        this.dataLabelCenterOn = true;
        this.startAngle = 0;
        this.tickRenderer = e.jqplot.PieTickRenderer;
        this._drawData = true;
        this._type = "pie";
        if (q.highlightMouseDown && q.highlightMouseOver == null) {
            q.highlightMouseOver = false
        }
        e.extend(true, this, q);
        if (this.sliceMargin < 0) {
            this.sliceMargin = 0
        }
        this._diameter = null;
        this._radius = null;
        this._sliceAngles = [];
        this._highlightedPoint = null;
        if (this.highlightColors.length == 0) {
            for (var s = 0; s < this.seriesColors.length; s++) {
                var r = e.jqplot.getColorComponents(this.seriesColors[s]);
                var o = [r[0], r[1], r[2]];
                var t = o[0] + o[1] + o[2];
                for (var p = 0; p < 3; p++) {
                    o[p] = (t > 570) ? o[p] * 0.8 : o[p] + 0.3 * (255 - o[p]);
                    o[p] = parseInt(o[p], 10)
                }
                this.highlightColors.push("rgb(" + o[0] + "," + o[1] + "," + o[2] + ")")
            }
        }
        this.highlightColorGenerator = new e.jqplot.ColorGenerator(this.highlightColors);
        u.postParseOptionsHooks.addOnce(m);
        u.postInitHooks.addOnce(g);
        u.eventListenerHooks.addOnce("jqplotMouseMove", b);
        u.eventListenerHooks.addOnce("jqplotMouseDown", a);
        u.eventListenerHooks.addOnce("jqplotMouseUp", l);
        u.eventListenerHooks.addOnce("jqplotClick", f);
        u.eventListenerHooks.addOnce("jqplotRightClick", n);
        u.postDrawHooks.addOnce(i)
    }
    ;
    e.jqplot.PieRenderer.prototype.setGridData = function(t) {
        var p = [];
        var u = [];
        var o = this.startAngle / 180 * Math.PI;
        var s = 0;
        this._drawData = false;
        for (var r = 0; r < this.data.length; r++) {
            if (this.data[r][1] != 0) {
                this._drawData = true
            }
            p.push(this.data[r][1]);
            u.push([this.data[r][0]]);
            if (r > 0) {
                p[r] += p[r - 1]
            }
            s += this.data[r][1]
        }
        var q = Math.PI * 2 / p[p.length - 1];
        for (var r = 0; r < p.length; r++) {
            u[r][1] = p[r] * q;
            u[r][2] = this.data[r][1] / s
        }
        this.gridData = u
    }
    ;
    e.jqplot.PieRenderer.prototype.makeGridData = function(t, u) {
        var p = [];
        var v = [];
        var s = 0;
        var o = this.startAngle / 180 * Math.PI;
        this._drawData = false;
        for (var r = 0; r < t.length; r++) {
            if (this.data[r][1] != 0) {
                this._drawData = true
            }
            p.push(t[r][1]);
            v.push([t[r][0]]);
            if (r > 0) {
                p[r] += p[r - 1]
            }
            s += t[r][1]
        }
        var q = Math.PI * 2 / p[p.length - 1];
        for (var r = 0; r < p.length; r++) {
            v[r][1] = p[r] * q;
            v[r][2] = t[r][1] / s
        }
        return v
    }
    ;
    function h(o) {
        return Math.sin((o - (o - Math.PI) / 8 / Math.PI) / 2)
    }
    function j(u, t, o, v, r) {
        var w = 0;
        var q = t - u;
        var s = Math.abs(q);
        var p = o;
        if (v == false) {
            p += r
        }
        if (p > 0 && s > 0.01 && s < 6.282) {
            w = parseFloat(p) / 2 / h(q)
        }
        return w
    }
    e.jqplot.PieRenderer.prototype.drawSlice = function(B, z, y, u, w) {
        if (this._drawData) {
            var p = this._radius;
            var A = this.fill;
            var x = this.lineWidth;
            var s = this.sliceMargin;
            if (this.fill == false) {
                s += this.lineWidth
            }
            B.save();
            B.translate(this._center[0], this._center[1]);
            var D = j(z, y, this.sliceMargin, this.fill, this.lineWidth);
            var o = D * Math.cos((z + y) / 2);
            var C = D * Math.sin((z + y) / 2);
            if ((y - z) <= Math.PI) {
                p -= D
            } else {
                p += D
            }
            B.translate(o, C);
            if (w) {
                for (var v = 0, t = this.shadowDepth; v < t; v++) {
                    B.save();
                    B.translate(this.shadowOffset * Math.cos(this.shadowAngle / 180 * Math.PI), this.shadowOffset * Math.sin(this.shadowAngle / 180 * Math.PI));
                    q(p)
                }
                for (var v = 0, t = this.shadowDepth; v < t; v++) {
                    B.restore()
                }
            } else {
                q(p)
            }
            B.restore()
        }
        function q(r) {
            if (y > 6.282 + this.startAngle) {
                y = 6.282 + this.startAngle;
                if (z > y) {
                    z = 6.281 + this.startAngle
                }
            }
            if (z >= y) {
                return
            }
            B.beginPath();
            B.fillStyle = u;
            B.strokeStyle = u;
            B.lineWidth = x;
            B.arc(0, 0, r, z, y, false);
            B.lineTo(0, 0);
            B.closePath();
            if (A) {
                B.fill()
            } else {
                B.stroke()
            }
        }
    }
    ;
    e.jqplot.PieRenderer.prototype.draw = function(B, z, E, o) {
        var W;
        var H = (E != undefined) ? E : {};
        var t = 0;
        var s = 0;
        var N = 1;
        var L = new e.jqplot.ColorGenerator(this.seriesColors);
        if (E.legendInfo && E.legendInfo.placement == "insideGrid") {
            var J = E.legendInfo;
            switch (J.location) {
            case "nw":
                t = J.width + J.xoffset;
                break;
            case "w":
                t = J.width + J.xoffset;
                break;
            case "sw":
                t = J.width + J.xoffset;
                break;
            case "ne":
                t = J.width + J.xoffset;
                N = -1;
                break;
            case "e":
                t = J.width + J.xoffset;
                N = -1;
                break;
            case "se":
                t = J.width + J.xoffset;
                N = -1;
                break;
            case "n":
                s = J.height + J.yoffset;
                break;
            case "s":
                s = J.height + J.yoffset;
                N = -1;
                break;
            default:
                break
            }
        }
        var K = (H.shadow != undefined) ? H.shadow : this.shadow;
        var A = (H.fill != undefined) ? H.fill : this.fill;
        var C = B.canvas.width;
        var I = B.canvas.height;
        var Q = C - t - 2 * this.padding;
        var X = I - s - 2 * this.padding;
        var M = Math.min(Q, X);
        var Y = M;
        this._sliceAngles = [];
        var v = this.sliceMargin;
        if (this.fill == false) {
            v += this.lineWidth
        }
        var q;
        var G = 0;
        var R, aa, Z, ab;
        var D = this.startAngle / 180 * Math.PI;
        for (var W = 0, V = z.length; W < V; W++) {
            aa = (W == 0) ? D : z[W - 1][1] + D;
            Z = z[W][1] + D;
            this._sliceAngles.push([aa, Z]);
            q = j(aa, Z, this.sliceMargin, this.fill, this.lineWidth);
            if (Math.abs(Z - aa) > Math.PI) {
                G = Math.max(q, G)
            }
        }
        if (this.diameter != null && this.diameter > 0) {
            this._diameter = this.diameter - 2 * G
        } else {
            this._diameter = Y - 2 * G
        }
        if (this._diameter < 6) {
            e.jqplot.log("Diameter of pie too small, not rendering.");
            return
        }
        var S = this._radius = this._diameter / 2;
        this._center = [(C - N * t) / 2 + N * t + G * Math.cos(D), (I - N * s) / 2 + N * s + G * Math.sin(D)];
        if (this.shadow) {
            for (var W = 0, V = z.length; W < V; W++) {
                ab = "rgba(0,0,0," + this.shadowAlpha + ")";
                this.renderer.drawSlice.call(this, B, this._sliceAngles[W][0], this._sliceAngles[W][1], ab, true)
            }
        }
        for (var W = 0; W < z.length; W++) {
            this.renderer.drawSlice.call(this, B, this._sliceAngles[W][0], this._sliceAngles[W][1], L.next(), false);
            if (this.showDataLabels && z[W][2] * 100 >= this.dataLabelThreshold) {
                var F, U = (this._sliceAngles[W][0] + this._sliceAngles[W][1]) / 2, T;
                if (this.dataLabels == "label") {
                    F = this.dataLabelFormatString || "%s";
                    T = e.jqplot.sprintf(F, z[W][0])
                } else {
                    if (this.dataLabels == "value") {
                        F = this.dataLabelFormatString || "%d";
                        T = e.jqplot.sprintf(F, this.data[W][1])
                    } else {
                        if (this.dataLabels == "percent") {
                            F = this.dataLabelFormatString || "%d%%";
                            T = e.jqplot.sprintf(F, z[W][2] * 100)
                        } else {
                            if (this.dataLabels.constructor == Array) {
                                F = this.dataLabelFormatString || "%s";
                                T = e.jqplot.sprintf(F, this.dataLabels[W])
                            }
                        }
                    }
                }
                var p = (this._radius) * this.dataLabelPositionFactor + this.sliceMargin + this.dataLabelNudge;
                var P = this._center[0] + Math.cos(U) * p + this.canvas._offsets.left;
                var O = this._center[1] + Math.sin(U) * p + this.canvas._offsets.top;
                var u = e('<div class="jqplot-pie-series jqplot-data-label" style="position:absolute;">' + T + "</div>").insertBefore(o.eventCanvas._elem);
                if (this.dataLabelCenterOn) {
                    P -= u.width() / 2;
                    O -= u.height() / 2
                } else {
                    P -= u.width() * Math.sin(U / 2);
                    O -= u.height() / 2
                }
                P = Math.round(P);
                O = Math.round(O);
                u.css({
                    left: P,
                    top: O
                })
            }
        }
    }
    ;
    e.jqplot.PieAxisRenderer = function() {
        e.jqplot.LinearAxisRenderer.call(this)
    }
    ;
    e.jqplot.PieAxisRenderer.prototype = new e.jqplot.LinearAxisRenderer();
    e.jqplot.PieAxisRenderer.prototype.constructor = e.jqplot.PieAxisRenderer;
    e.jqplot.PieAxisRenderer.prototype.init = function(o) {
        this.tickRenderer = e.jqplot.PieTickRenderer;
        e.extend(true, this, o);
        this._dataBounds = {
            min: 0,
            max: 100
        };
        this.min = 0;
        this.max = 100;
        this.showTicks = false;
        this.ticks = [];
        this.showMark = false;
        this.show = false
    }
    ;
    e.jqplot.PieLegendRenderer = function() {
        e.jqplot.TableLegendRenderer.call(this)
    }
    ;
    e.jqplot.PieLegendRenderer.prototype = new e.jqplot.TableLegendRenderer();
    e.jqplot.PieLegendRenderer.prototype.constructor = e.jqplot.PieLegendRenderer;
    e.jqplot.PieLegendRenderer.prototype.init = function(o) {
        this.numberRows = null;
        this.numberColumns = null;
        e.extend(true, this, o)
    }
    ;
    e.jqplot.PieLegendRenderer.prototype.draw = function() {
        var r = this;
        if (this.show) {
            var B = this._series;
            this._elem = e(document.createElement("table"));
            this._elem.addClass("jqplot-table-legend");
            var E = {
                position: "absolute"
            };
            if (this.background) {
                E.background = this.background
            }
            if (this.border) {
                E.border = this.border
            }
            if (this.fontSize) {
                E.fontSize = this.fontSize
            }
            if (this.fontFamily) {
                E.fontFamily = this.fontFamily
            }
            if (this.textColor) {
                E.textColor = this.textColor
            }
            if (this.marginTop != null) {
                E.marginTop = this.marginTop
            }
            if (this.marginBottom != null) {
                E.marginBottom = this.marginBottom
            }
            if (this.marginLeft != null) {
                E.marginLeft = this.marginLeft
            }
            if (this.marginRight != null) {
                E.marginRight = this.marginRight
            }
            this._elem.css(E);
            var I = false, A = false, o, y;
            var C = B[0];
            var p = new e.jqplot.ColorGenerator(C.seriesColors);
            if (C.show) {
                var J = C.data;
                if (this.numberRows) {
                    o = this.numberRows;
                    if (!this.numberColumns) {
                        y = Math.ceil(J.length / o)
                    } else {
                        y = this.numberColumns
                    }
                } else {
                    if (this.numberColumns) {
                        y = this.numberColumns;
                        o = Math.ceil(J.length / this.numberColumns)
                    } else {
                        o = J.length;
                        y = 1
                    }
                }
                var H, G;
                var q, w, v;
                var x, z, F;
                var D = 0;
                var u, t;
                for (H = 0; H < o; H++) {
                    q = e(document.createElement("tr"));
                    q.addClass("jqplot-table-legend");
                    if (A) {
                        q.prependTo(this._elem)
                    } else {
                        q.appendTo(this._elem)
                    }
                    for (G = 0; G < y; G++) {
                        if (D < J.length) {
                            x = this.labels[D] || J[D][0].toString();
                            F = p.next();
                            if (!A) {
                                if (H > 0) {
                                    I = true
                                } else {
                                    I = false
                                }
                            } else {
                                if (H == o - 1) {
                                    I = false
                                } else {
                                    I = true
                                }
                            }
                            z = (I) ? this.rowSpacing : "0";
                            w = e(document.createElement("td"));
                            w.addClass("jqplot-table-legend jqplot-table-legend-swatch");
                            w.css({
                                textAlign: "center",
                                paddingTop: z
                            });
                            u = e(document.createElement("div"));
                            u.addClass("jqplot-table-legend-swatch-outline");
                            t = e(document.createElement("div"));
                            t.addClass("jqplot-table-legend-swatch");
                            t.css({
                                backgroundColor: F,
                                borderColor: F
                            });
                            w.append(u.append(t));
                            v = e(document.createElement("td"));
                            v.addClass("jqplot-table-legend jqplot-table-legend-label");
                            v.css("paddingTop", z);
                            if (this.escapeHtml) {
                                v.text(x)
                            } else {
                                v.html(x)
                            }
                            if (A) {
                                v.prependTo(q);
                                w.prependTo(q)
                            } else {
                                w.appendTo(q);
                                v.appendTo(q)
                            }
                            I = true
                        }
                        D++
                    }
                }
            }
        }
        return this._elem
    }
    ;
    e.jqplot.PieRenderer.prototype.handleMove = function(q, p, t, s, r) {
        if (s) {
            var o = [s.seriesIndex, s.pointIndex, s.data];
            r.target.trigger("jqplotDataMouseOver", o);
            if (r.series[o[0]].highlightMouseOver && !(o[0] == r.plugins.pieRenderer.highlightedSeriesIndex && o[1] == r.series[o[0]]._highlightedPoint)) {
                r.target.trigger("jqplotDataHighlight", o);
                d(r, o[0], o[1])
            }
        } else {
            if (s == null) {
                k(r)
            }
        }
    }
    ;
    function c(s, r, p) {
        p = p || {};
        p.axesDefaults = p.axesDefaults || {};
        p.legend = p.legend || {};
        p.seriesDefaults = p.seriesDefaults || {};
        var o = false;
        if (p.seriesDefaults.renderer == e.jqplot.PieRenderer) {
            o = true
        } else {
            if (p.series) {
                for (var q = 0; q < p.series.length; q++) {
                    if (p.series[q].renderer == e.jqplot.PieRenderer) {
                        o = true
                    }
                }
            }
        }
        if (o) {
            p.axesDefaults.renderer = e.jqplot.PieAxisRenderer;
            p.legend.renderer = e.jqplot.PieLegendRenderer;
            p.legend.preDraw = true;
            p.seriesDefaults.pointLabels = {
                show: false
            }
        }
    }
    function g(r, q, o) {
        for (var p = 0; p < this.series.length; p++) {
            if (this.series[p].renderer.constructor == e.jqplot.PieRenderer) {
                if (this.series[p].highlightMouseOver) {
                    this.series[p].highlightMouseDown = false
                }
            }
        }
    }
    function m(o) {
        for (var p = 0; p < this.series.length; p++) {
            this.series[p].seriesColors = this.seriesColors;
            this.series[p].colorGenerator = e.jqplot.colorGenerator
        }
    }
    function d(t, r, q) {
        var p = t.series[r];
        var o = t.plugins.pieRenderer.highlightCanvas;
        o._ctx.clearRect(0, 0, o._ctx.canvas.width, o._ctx.canvas.height);
        p._highlightedPoint = q;
        t.plugins.pieRenderer.highlightedSeriesIndex = r;
        p.renderer.drawSlice.call(p, o._ctx, p._sliceAngles[q][0], p._sliceAngles[q][1], p.highlightColorGenerator.get(q), false)
    }
    function k(q) {
        var o = q.plugins.pieRenderer.highlightCanvas;
        o._ctx.clearRect(0, 0, o._ctx.canvas.width, o._ctx.canvas.height);
        for (var p = 0; p < q.series.length; p++) {
            q.series[p]._highlightedPoint = null
        }
        q.plugins.pieRenderer.highlightedSeriesIndex = null;
        q.target.trigger("jqplotDataUnhighlight")
    }
    function b(s, r, v, u, t) {
        if (u) {
            var q = [u.seriesIndex, u.pointIndex, u.data];
            var p = jQuery.Event("jqplotDataMouseOver");
            p.pageX = s.pageX;
            p.pageY = s.pageY;
            t.target.trigger(p, q);
            if (t.series[q[0]].highlightMouseOver && !(q[0] == t.plugins.pieRenderer.highlightedSeriesIndex && q[1] == t.series[q[0]]._highlightedPoint)) {
                var o = jQuery.Event("jqplotDataHighlight");
                o.which = s.which;
                o.pageX = s.pageX;
                o.pageY = s.pageY;
                t.target.trigger(o, q);
                d(t, q[0], q[1])
            }
        } else {
            if (u == null) {
                k(t)
            }
        }
    }
    function a(r, q, u, t, s) {
        if (t) {
            var p = [t.seriesIndex, t.pointIndex, t.data];
            if (s.series[p[0]].highlightMouseDown && !(p[0] == s.plugins.pieRenderer.highlightedSeriesIndex && p[1] == s.series[p[0]]._highlightedPoint)) {
                var o = jQuery.Event("jqplotDataHighlight");
                o.which = r.which;
                o.pageX = r.pageX;
                o.pageY = r.pageY;
                s.target.trigger(o, p);
                d(s, p[0], p[1])
            }
        } else {
            if (t == null) {
                k(s)
            }
        }
    }
    function l(q, p, t, s, r) {
        var o = r.plugins.pieRenderer.highlightedSeriesIndex;
        if (o != null && r.series[o].highlightMouseDown) {
            k(r)
        }
    }
    function f(r, q, u, t, s) {
        if (t) {
            var p = [t.seriesIndex, t.pointIndex, t.data];
            var o = jQuery.Event("jqplotDataClick");
            o.which = r.which;
            o.pageX = r.pageX;
            o.pageY = r.pageY;
            s.target.trigger(o, p)
        }
    }
    function n(s, r, v, u, t) {
        if (u) {
            var q = [u.seriesIndex, u.pointIndex, u.data];
            var o = t.plugins.pieRenderer.highlightedSeriesIndex;
            if (o != null && t.series[o].highlightMouseDown) {
                k(t)
            }
            var p = jQuery.Event("jqplotDataRightClick");
            p.which = s.which;
            p.pageX = s.pageX;
            p.pageY = s.pageY;
            t.target.trigger(p, q)
        }
    }
    function i() {
        if (this.plugins.pieRenderer && this.plugins.pieRenderer.highlightCanvas) {
            this.plugins.pieRenderer.highlightCanvas.resetCanvas();
            this.plugins.pieRenderer.highlightCanvas = null
        }
        this.plugins.pieRenderer = {
            highlightedSeriesIndex: null
        };
        this.plugins.pieRenderer.highlightCanvas = new e.jqplot.GenericCanvas();
        var p = e(this.targetId + " .jqplot-data-label");
        if (p.length) {
            e(p[0]).before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-pieRenderer-highlight-canvas", this._plotDimensions, this))
        } else {
            this.eventCanvas._elem.before(this.plugins.pieRenderer.highlightCanvas.createElement(this._gridPadding, "jqplot-pieRenderer-highlight-canvas", this._plotDimensions, this))
        }
        var o = this.plugins.pieRenderer.highlightCanvas.setContext();
        this.eventCanvas._elem.bind("mouseleave", {
            plot: this
        }, function(q) {
            k(q.data.plot)
        })
    }
    e.jqplot.preInitHooks.push(c);
    e.jqplot.PieTickRenderer = function() {
        e.jqplot.AxisTickRenderer.call(this)
    }
    ;
    e.jqplot.PieTickRenderer.prototype = new e.jqplot.AxisTickRenderer();
    e.jqplot.PieTickRenderer.prototype.constructor = e.jqplot.PieTickRenderer
}
)(jQuery);
