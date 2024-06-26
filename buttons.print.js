(function(g) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net", "datatables.net-buttons"], function(j) {
        return g(j, window, document)
    }) : "object" === typeof exports ? module.exports = function(j, i, q, r) {
        j || (j = window);
        if (!i || !i.fn.dataTable)
            i = require("datatables.net")(j, i).$;
        i.fn.dataTable.Buttons || require("datatables.net-buttons")(j, i);
        return g(i, j, j.document, q, r)
    }
    : g(jQuery, window, document)
}
)(function(g, j, i, q, r, m) {
    function E(a, b) {
        v === m && (v = -1 === y.serializeToString(g.parseXML(F["xl/worksheets/sheet1.xml"])).indexOf("xmlns:r"));
        g.each(b, function(b, c) {
            if (g.isPlainObject(c)) {
                var e = a.folder(b);
                E(e, c)
            } else {
                if (v) {
                    var e = c.childNodes[0], f, h, n = [];
                    for (f = e.attributes.length - 1; 0 <= f; f--) {
                        h = e.attributes[f].nodeName;
                        var k = e.attributes[f].nodeValue;
                        -1 !== h.indexOf(":") && (n.push({
                            name: h,
                            value: k
                        }),
                        e.removeAttribute(h))
                    }
                    f = 0;
                    for (h = n.length; f < h; f++)
                        k = c.createAttribute(n[f].name.replace(":", "_dt_b_namespace_token_")),
                        k.value = n[f].value,
                        e.setAttributeNode(k)
                }
                e = y.serializeToString(c);
                v && (-1 === e.indexOf("<?xml") && (e = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + e),
                e = e.replace(/_dt_b_namespace_token_/g, ":"));
                e = e.replace(/<row xmlns="" /g, "<row ").replace(/<cols xmlns="">/g, "<cols>");
                a.file(b, e)
            }
        })
    }
    function o(a, b, d) {
        var c = a.createElement(b);
        d && (d.attr && g(c).attr(d.attr),
        d.children && g.each(d.children, function(a, b) {
            c.appendChild(b)
        }),
        d.text && c.appendChild(a.createTextNode(d.text)));
        return c
    }
    function N(a, b) {
        var d = a.header[b].length, c;
        a.footer && a.footer[b].length > d && (d = a.footer[b].length);
        for (var e = 0, f = a.body.length; e < f && !(c = a.body[e][b].toString().length,
        c > d && (d = c),
        40 < d); e++)
            ;
        return 5 < d ? d : 5
    }
    var s = g.fn.dataTable;
    q === m && (q = j.JSZip);
    r === m && (r = j.pdfMake);
    var p;
    var h = "undefined" !== typeof self && self || "undefined" !== typeof j && j || this.content;
    if ("undefined" !== typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))
        p = void 0;
    else {
        var w = h.document.createElementNS("http://www.w3.org/1999/xhtml", "a")
          , O = "download"in w
          , G = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent)
          , z = h.webkitRequestFileSystem
          , H = h.requestFileSystem || z || h.mozRequestFileSystem
          , P = function(a) {
            (h.setImmediate || h.setTimeout)(function() {
                throw a;
            }, 0)
        }
          , A = 0
          , B = function(a) {
            setTimeout(function() {
                typeof a === "string" ? (h.URL || h.webkitURL || h).revokeObjectURL(a) : a.remove()
            }, 4E4)
        }
          , C = function(a, b, d) {
            for (var b = [].concat(b), c = b.length; c--; ) {
                var e = a["on" + b[c]];
                if (typeof e === "function")
                    try {
                        e.call(a, d || a)
                    } catch (f) {
                        P(f)
                    }
            }
        }
          , I = function(a) {
            return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["﻿", a],{
                type: a.type
            }) : a
        }
          , J = function(a, b, d) {
            d || (a = I(a));
            var c = this, d = a.type, e = false, f, g, n = function() {
                C(c, ["writestart", "progress", "write", "writeend"])
            }, k = function() {
                if (g && G && typeof FileReader !== "undefined") {
                    var b = new FileReader;
                    b.onloadend = function() {
                        var a = b.result;
                        g.location.href = "data:attachment/file" + a.slice(a.search(/[,;]/));
                        c.readyState = c.DONE;
                        n()
                    }
                    ;
                    b.readAsDataURL(a);
                    c.readyState = c.INIT
                } else {
                    if (e || !f)
                        f = (h.URL || h.webkitURL || h).createObjectURL(a);
                    if (g)
                        g.location.href = f;
                    else if (h.open(f, "_blank") === m && G)
                        h.location.href = f;
                    c.readyState = c.DONE;
                    n();
                    B(f)
                }
            }, t = function(a) {
                return function() {
                    if (c.readyState !== c.DONE)
                        return a.apply(this, arguments)
                }
            }, j = {
                create: true,
                exclusive: false
            }, u;
            c.readyState = c.INIT;
            b || (b = "download");
            if (O) {
                f = (h.URL || h.webkitURL || h).createObjectURL(a);
                setTimeout(function() {
                    w.href = f;
                    w.download = b;
                    var a = new MouseEvent("click");
                    w.dispatchEvent(a);
                    n();
                    B(f);
                    c.readyState = c.DONE
                })
            } else {
                if (h.chrome && d && d !== "application/octet-stream") {
                    u = a.slice || a.webkitSlice;
                    a = u.call(a, 0, a.size, "application/octet-stream");
                    e = true
                }
                z && b !== "download" && (b = b + ".download");
                if (d === "application/octet-stream" || z)
                    g = h;
                if (H) {
                    A = A + a.size;
                    H(h.TEMPORARY, A, t(function(d) {
                        d.root.getDirectory("saved", j, t(function(d) {
                            var f = function() {
                                d.getFile(b, j, t(function(b) {
                                    b.createWriter(t(function(d) {
                                        d.onwriteend = function(a) {
                                            g.location.href = b.toURL();
                                            c.readyState = c.DONE;
                                            C(c, "writeend", a);
                                            B(b)
                                        }
                                        ;
                                        d.onerror = function() {
                                            var a = d.error;
                                            a.code !== a.ABORT_ERR && k()
                                        }
                                        ;
                                        ["writestart", "progress", "write", "abort"].forEach(function(a) {
                                            d["on" + a] = c["on" + a]
                                        });
                                        d.write(a);
                                        c.abort = function() {
                                            d.abort();
                                            c.readyState = c.DONE
                                        }
                                        ;
                                        c.readyState = c.WRITING
                                    }), k)
                                }), k)
                            };
                            d.getFile(b, {
                                create: false
                            }, t(function(a) {
                                a.remove();
                                f()
                            }), t(function(a) {
                                a.code === a.NOT_FOUND_ERR ? f() : k()
                            }))
                        }), k)
                    }), k)
                } else
                    k()
            }
        }
          , l = J.prototype;
        "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob ? p = function(a, b, d) {
            d || (a = I(a));
            return navigator.msSaveOrOpenBlob(a, b || "download")
        }
        : (l.abort = function() {
            this.readyState = this.DONE;
            C(this, "abort")
        }
        ,
        l.readyState = l.INIT = 0,
        l.WRITING = 1,
        l.DONE = 2,
        l.error = l.onwritestart = l.onprogress = l.onwrite = l.onabort = l.onerror = l.onwriteend = null,
        p = function(a, b, d) {
            return new J(a,b,d)
        }
        )
    }
    s.fileSave = p;
    var x = function(a, b) {
        var d = a.filename === "*" && a.title !== "*" && a.title !== m ? a.title : a.filename;
        typeof d === "function" && (d = d());
        d.indexOf("*") !== -1 && (d = g.trim(d.replace("*", g("title").text())));
        d = d.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g, "");
        return b === m || b === true ? d + a.extension : d
    }
      , Q = function(a) {
        var b = "Sheet1";
        a.sheetName && (b = a.sheetName.replace(/[\[\]\*\/\\\?\:]/g, ""));
        return b
    }
      , R = function(a) {
        a = a.title;
        typeof a === "function" && (a = a());
        return a.indexOf("*") !== -1 ? a.replace("*", g("title").text() || "Exported data") : a
    }
      , K = function(a) {
        return a.newline ? a.newline : navigator.userAgent.match(/Windows/) ? "\r\n" : "\n"
    }
      , L = function(a, b) {
        for (var d = K(b), c = a.buttons.exportData(b.exportOptions), e = b.fieldBoundary, f = b.fieldSeparator, g = RegExp(e, "g"), h = b.escapeChar !== m ? b.escapeChar : "\\", k = function(a) {
            for (var b = "", c = 0, d = a.length; c < d; c++) {
                c > 0 && (b = b + f);
                b = b + (e ? e + ("" + a[c]).replace(g, h + e) + e : a[c])
            }
            return b
        }, j = b.header ? k(c.header) + d : "", i = b.footer && c.footer ? d + k(c.footer) : "", u = [], D = 0, l = c.body.length; D < l; D++)
            u.push(k(c.body[D]));
        return {
            str: j + u.join(d) + i,
            rows: u.length
        }
    }
      , M = function() {
        return navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1 && navigator.userAgent.indexOf("Opera") === -1
    };
    try {
        var y = new XMLSerializer, v
    } catch (S) {}
    var F = {
        "_rels/.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
        "xl/_rels/workbook.xml.rels": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
        "[Content_Types].xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="xml" ContentType="application/xml" /><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" /><Default Extension="jpeg" ContentType="image/jpeg" /><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" /><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" /><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml" /></Types>',
        "xl/workbook.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="24816"/><workbookPr showInkAnnotation="0" autoCompressPictures="0"/><bookViews><workbookView xWindow="0" yWindow="0" windowWidth="25600" windowHeight="19020" tabRatio="500"/></bookViews><sheets><sheet name="" sheetId="1" r:id="rId1"/></sheets></workbook>',
        "xl/worksheets/sheet1.xml": '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><sheetData/></worksheet>',
        "xl/styles.xml": '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" mc:Ignorable="x14ac" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac"><fonts count="5" x14ac:knownFonts="1"><font><sz val="11" /><name val="Calibri" /></font><font><sz val="11" /><name val="Calibri" /><color rgb="FFFFFFFF" /></font><font><sz val="11" /><name val="Calibri" /><b /></font><font><sz val="11" /><name val="Calibri" /><i /></font><font><sz val="11" /><name val="Calibri" /><u /></font></fonts><fills count="6"><fill><patternFill patternType="none" /></fill><fill/><fill><patternFill patternType="solid"><fgColor rgb="FFD9D9D9" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="FFD99795" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6efce" /><bgColor indexed="64" /></patternFill></fill><fill><patternFill patternType="solid"><fgColor rgb="ffc6cfef" /><bgColor indexed="64" /></patternFill></fill></fills><borders count="2"><border><left /><right /><top /><bottom /><diagonal /></border><border diagonalUp="false" diagonalDown="false"><left style="thin"><color auto="1" /></left><right style="thin"><color auto="1" /></right><top style="thin"><color auto="1" /></top><bottom style="thin"><color auto="1" /></bottom><diagonal /></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" /></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="0" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="0" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="2" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="3" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="4" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="0" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="1" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="2" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="3" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/><xf numFmtId="0" fontId="4" fillId="5" borderId="1" applyFont="1" applyFill="1" applyBorder="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0" /></cellStyles><dxfs count="0" /><tableStyles count="0" defaultTableStyle="TableStyleMedium9" defaultPivotStyle="PivotStyleMedium4" /></styleSheet>'
    };
    s.ext.buttons.copyHtml5 = {
        className: "buttons-copy buttons-html5",
        text: function(a) {
            return a.i18n("buttons.copy", "Copy")
        },
        action: function(a, b, d, c) {
            var a = L(b, c)
              , e = a.str
              , d = g("<div/>").css({
                height: 1,
                width: 1,
                overflow: "hidden",
                position: "fixed",
                top: 0,
                left: 0
            });
            c.customize && (e = c.customize(e, c));
            c = g("<textarea readonly/>").val(e).appendTo(d);
            if (i.queryCommandSupported("copy")) {
                d.appendTo(b.table().container());
                c[0].focus();
                c[0].select();
                try {
                    i.execCommand("copy");
                    d.remove();
                    b.buttons.info(b.i18n("buttons.copyTitle", "Copy to clipboard"), b.i18n("buttons.copySuccess", {
                        1: "Copied one row to clipboard",
                        _: "Copied %d rows to clipboard"
                    }, a.rows), 2E3);
                    return
                } catch (f) {}
            }
            a = g("<span>" + b.i18n("buttons.copyKeys", "Press <i>ctrl</i> or <i>⌘</i> + <i>C</i> to copy the table data<br>to your system clipboard.<br><br>To cancel, click this message or press escape.") + "</span>").append(d);
            b.buttons.info(b.i18n("buttons.copyTitle", "Copy to clipboard"), a, 0);
            c[0].focus();
            c[0].select();
            var h = g(a).closest(".dt-button-info")
              , j = function() {
                h.off("click.buttons-copy");
                g(i).off(".buttons-copy");
                b.buttons.info(false)
            };
            h.on("click.buttons-copy", j);
            g(i).on("keydown.buttons-copy", function(a) {
                a.keyCode === 27 && j()
            }).on("copy.buttons-copy cut.buttons-copy", function() {
                j()
            })
        },
        exportOptions: {},
        fieldSeparator: "\t",
        fieldBoundary: "",
        header: !0,
        footer: !1
    };
    s.ext.buttons.csvHtml5 = {
        className: "buttons-csv buttons-html5",
        available: function() {
            return j.FileReader !== m && j.Blob
        },
        text: function(a) {
            return a.i18n("buttons.csv", "CSV")
        },
        action: function(a, b, d, c) {
            a = L(b, c).str;
            b = c.charset;
            c.customize && (a = c.customize(a, c));
            if (b !== false) {
                b || (b = i.characterSet || i.charset);
                b && (b = ";charset=" + b)
            } else
                b = "";
            p(new Blob([a],{
                type: "text/csv" + b
            }), x(c))
        },
        filename: "*",
        extension: ".csv",
        exportOptions: {},
        fieldSeparator: ",",
        fieldBoundary: '"',
        escapeChar: '"',
        charset: null,
        header: !0,
        footer: !1
    };
    s.ext.buttons.excelHtml5 = {
        className: "buttons-excel buttons-html5",
        available: function() {
            return j.FileReader !== m && q !== m && !M() && y
        },
        text: function(a) {
            return a.i18n("buttons.excel", "Excel")
        },
        action: function(a, b, d, c) {
            var e = 0, a = function(a) {
                return g.parseXML(F[a])
            }, f = a("xl/worksheets/sheet1.xml"), h = f.getElementsByTagName("sheetData")[0], a = {
                _rels: {
                    ".rels": a("_rels/.rels")
                },
                xl: {
                    _rels: {
                        "workbook.xml.rels": a("xl/_rels/workbook.xml.rels")
                    },
                    "workbook.xml": a("xl/workbook.xml"),
                    "styles.xml": a("xl/styles.xml"),
                    worksheets: {
                        "sheet1.xml": f
                    }
                },
                "[Content_Types].xml": a("[Content_Types].xml")
            }, b = b.buttons.exportData(c.exportOptions), j, k, d = function(a) {
                j = e + 1;
                k = o(f, "row", {
                    attr: {
                        r: j
                    }
                });
                for (var b = 0, c = a.length; b < c; b++) {
                    for (var d = b, i = ""; d >= 0; ) {
                        i = String.fromCharCode(d % 26 + 65) + i;
                        d = Math.floor(d / 26) - 1
                    }
                    d = i + "" + j;
                    if (a[b] === null || a[b] === m)
                        a[b] = "";
                    if (typeof a[b] === "number" || a[b].match && g.trim(a[b]).match(/^-?\d+(\.\d+)?$/) && !g.trim(a[b]).match(/^0\d+/))
                        d = o(f, "c", {
                            attr: {
                                t: "n",
                                r: d
                            },
                            children: [o(f, "v", {
                                text: a[b]
                            })]
                        });
                    else {
                        i = !a[b].replace ? a[b] : a[b].replace(/&(?!amp;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, "");
                        d = o(f, "c", {
                            attr: {
                                t: "inlineStr",
                                r: d
                            },
                            children: {
                                row: o(f, "is", {
                                    children: {
                                        row: o(f, "t", {
                                            text: i
                                        })
                                    }
                                })
                            }
                        })
                    }
                    k.appendChild(d)
                }
                h.appendChild(k);
                e++
            };
            g("sheets sheet", a.xl["workbook.xml"]).attr("name", Q(c));
            c.customizeData && c.customizeData(b);
            if (c.header) {
                d(b.header, e);
                g("row c", f).attr("s", "2")
            }
            for (var i = 0, l = b.body.length; i < l; i++)
                d(b.body[i], e);
            if (c.footer && b.footer) {
                d(b.footer, e);
                g("row:last c", f).attr("s", "2")
            }
            d = o(f, "cols");
            g("worksheet", f).prepend(d);
            i = 0;
            for (l = b.header.length; i < l; i++)
                d.appendChild(o(f, "col", {
                    attr: {
                        min: i + 1,
                        max: i + 1,
                        width: N(b, i),
                        customWidth: 1
                    }
                }));
            c.customize && c.customize(a);
            b = new q;
            d = {
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            };
            E(b, a);
            b.generateAsync ? b.generateAsync(d).then(function(a) {
                p(a, x(c))
            }) : p(b.generate(d), x(c))
        },
        filename: "*",
        extension: ".xlsx",
        exportOptions: {},
        header: !0,
        footer: !1
    };
    s.ext.buttons.pdfHtml5 = {
        className: "buttons-pdf buttons-html5",
        available: function() {
            return j.FileReader !== m && r
        },
        text: function(a) {
            return a.i18n("buttons.pdf", "PDF")
        },
        action: function(a, b, d, c) {
            K(c);
            a = b.buttons.exportData(c.exportOptions);
            b = [];
            c.header && b.push(g.map(a.header, function(a) {
                return {
                    text: typeof a === "string" ? a : a + "",
                    style: "tableHeader"
                }
            }));
            for (var e = 0, d = a.body.length; e < d; e++)
                b.push(g.map(a.body[e], function(a) {
                    return {
                        text: typeof a === "string" ? a : a + "",
                        style: e % 2 ? "tableBodyEven" : "tableBodyOdd"
                    }
                }));
            c.footer && a.footer && b.push(g.map(a.footer, function(a) {
                return {
                    text: typeof a === "string" ? a : a + "",
                    style: "tableFooter"
                }
            }));
            a = {
                pageSize: c.pageSize,
                pageOrientation: c.orientation,
                content: [{
                    table: {
                        headerRows: 1,
                        body: b
                    },
                    layout: "noBorders"
                }],
                styles: {
                    tableHeader: {
                        bold: true,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154",
                        alignment: "center"
                    },
                    tableBodyEven: {},
                    tableBodyOdd: {
                        fillColor: "#f3f3f3"
                    },
                    tableFooter: {
                        bold: true,
                        fontSize: 11,
                        color: "white",
                        fillColor: "#2d4154"
                    },
                    title: {
                        alignment: "center",
                        fontSize: 15
                    },
                    message: {}
                },
                defaultStyle: {
                    fontSize: 10
                }
            };
            c.message && a.content.unshift({
                text: c.message,
                style: "message",
                margin: [0, 0, 0, 12]
            });
            c.title && a.content.unshift({
                text: R(c, false),
                style: "title",
                margin: [0, 0, 0, 12]
            });
            c.customize && c.customize(a, c);
            a = r.createPdf(a);
            c.download === "open" && !M() ? a.open() : a.getBuffer(function(a) {
                a = new Blob([a],{
                    type: "application/pdf"
                });
                p(a, x(c))
            })
        },
        title: "*",
        filename: "*",
        extension: ".pdf",
        exportOptions: {},
        orientation: "portrait",
        pageSize: "A4",
        header: !0,
        footer: !1,
        message: null,
        customize: null,
        download: "download"
    };
    return s.Buttons
});
