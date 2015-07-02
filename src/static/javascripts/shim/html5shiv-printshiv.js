(function (m, j) {
    function q(a, c) {
        var f = a.createElement("p"), b = a.getElementsByTagName("head")[0] || a.documentElement;
        f.innerHTML = "x<style>" + c + "</style>";
        return b.insertBefore(f.lastChild, b.firstChild)
    }

    function n() {
        var a = k.elements;
        return"string" == typeof a ? a.split(" ") : a
    }

    function u(a) {
        var c = {}, f = a.createElement, b = a.createDocumentFragment, d = b();
        a.createElement = function (a) {
            if (!k.shivMethods)return f(a);
            var e;
            e = c[a] ? c[a].cloneNode() : v.test(a) ? (c[a] = f(a)).cloneNode() : f(a);
            return e.canHaveChildren && !w.test(a) ?
                d.appendChild(e) : e
        };
        a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + n().join().replace(/\w+/g, function (a) {
            f(a);
            d.createElement(a);
            return'c("' + a + '")'
        }) + ");return n}")(k, d)
    }

    function r(a) {
        var c;
        if (a.documentShived)return a;
        k.shivCSS && !s && (c = !!q(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}"));
        o || (c = !u(a));
        if (c)a.documentShived = c;
        return a
    }

    function x(a) {
        for (var c, f = a.attributes,
                 b = f.length, d = a.ownerDocument.createElement(l + ":" + a.nodeName); b--;)c = f[b], c.specified && d.setAttribute(c.nodeName, c.nodeValue);
        d.style.cssText = a.style.cssText;
        return d
    }

    function t(a) {
        var c, f, b = a.namespaces, d = a.parentWindow;
        if (!y || a.printShived)return a;
        "undefined" == typeof b[l] && b.add(l);
        d.attachEvent("onbeforeprint", function () {
            var g, e, i;
            i = a.styleSheets;
            for (var b = [], h = i.length, d = Array(h); h--;)d[h] = i[h];
            for (; i = d.pop();)if (!i.disabled && z.test(i.media)) {
                try {
                    g = i.imports, e = g.length
                } catch (j) {
                    e = 0
                }
                for (h = 0; h <
                    e; h++)d.push(g[h]);
                try {
                    b.push(i.cssText)
                } catch (k) {
                }
            }
            g = b.reverse().join("").split("{");
            e = g.length;
            h = RegExp("(^|[\\s,>+~])(" + n().join("|") + ")(?=[[\\s,>+~#.:]|$)", "gi");
            for (d = "$1" + l + "\\:$2"; e--;)b = g[e] = g[e].split("}"), b[b.length - 1] = b[b.length - 1].replace(h, d), g[e] = b.join("}");
            b = g.join("{");
            e = a.getElementsByTagName("*");
            h = e.length;
            d = RegExp("^(?:" + n().join("|") + ")$", "i");
            for (i = []; h--;)g = e[h], d.test(g.nodeName) && i.push(g.applyElement(x(g)));
            f = i;
            c = q(a, b)
        });
        d.attachEvent("onafterprint", function () {
            for (var a =
                f, b = a.length; b--;)a[b].removeNode();
            c.removeNode(!0)
        });
        a.printShived = !0;
        return a
    }

    var p = m.html5 || {}, w = /^<|^(?:button|form|map|select|textarea|object|iframe|option|optgroup)$/i, v = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, s, o;
    (function () {
        var a = j.createElement("a");
        a.innerHTML = "<xyz></xyz>";
        s = "hidden"in a;
        if (!(a = 1 == a.childNodes.length))a:{
            try {
                j.createElement("a")
            } catch (c) {
                a = !0;
                break a
            }
            a = j.createDocumentFragment();
            a = "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
        }
        o = a
    })();
    var k = {elements: p.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: !1 !== p.shivCSS, shivMethods: !1 !== p.shivMethods, type: "default", shivDocument: r};
    m.html5 = k;
    r(j);
    var z = /^$|\b(?:all|print)\b/, l = "html5shiv", y = !o && function () {
        var a =
            j.documentElement;
        return!("undefined" == typeof j.namespaces || "undefined" == typeof j.parentWindow || "undefined" == typeof a.applyElement || "undefined" == typeof a.removeNode || "undefined" == typeof m.attachEvent)
    }();
    k.type += " print";
    k.shivPrint = t;
    t(j)
})(this, document);
