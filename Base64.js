!function() {
    function t(t) {
        this.message = t
    }
    var r = "undefined" != typeof exports ? exports : self
      , e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    t.prototype = new Error,
    t.prototype.name = "InvalidCharacterError",
    r.btoa || (r.btoa = function(r) {
        for (var o, n, a = String(r), i = 0, c = e, d = ""; a.charAt(0 | i) || (c = "=",
        i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
            if (n = a.charCodeAt(i += .75),
            n > 255)
                throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
            o = o << 8 | n
        }
        return d
    }
    ),
    r.atob || (r.atob = function(r) {
        var o = String(r).replace(/=+$/, "");
        if (o.length % 4 == 1)
            throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
        for (var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a,
        i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0)
            a = e.indexOf(a);
        return d
    }
    )
}();
