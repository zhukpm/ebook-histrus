var kInteractive = {
    preRender: function (e, t) {
        var n, a = (t = t || {}).singleElem, i = e || document;
        a ? (n = [e], i = document) : n = i.getElementsByClassName("kInteractive"), "undefined" != typeof isKotobee && (kInteractive.absoluteURL = t.chapterUrl ? t.chapterUrl : angular.element(document.body).scope().data.book.chapter.absoluteURL);
        for (var r = n.length; r--;) {
            var o = n[r];
            this.hasClass(o, "gallery") && kInteractive.gallery.preRender(o, i, r), this.hasClass(o, "questions") && kInteractive.questions.preRender(o, i, r), !this.hasClass(o, "image") && "img" != o.nodeName.toLowerCase() || kInteractive.image.preRender(o, i, r), this.hasClass(o, "link") && kInteractive.link.preRender(o, i, r), this.hasClass(o, "container") && kInteractive.container.preRender(o, i, r), this.hasClass(o, "equation") && kInteractive.equation.preRender(o, i, r), this.hasClass(o, "lipsync") && kInteractive.lipsync.preRender(o, i, r)
        }
    }, postRender: function (t, e) {
        var n = (e = e || {}).singleElem;
        "undefined" != typeof isKotobee && (kInteractive.absoluteURL = e.chapterUrl ? e.chapterUrl : angular.element(document.body).scope().data.book.chapter.absoluteURL), kInteractive.videoIsFullscreen = !1, kInteractive.timestamp = new Date, kInteractive.currentVideo = kInteractive.currentAudio = null, kInteractive.clearAudioVideo(t);
        var a, i = t || document;
        n ? (a = [t], i = document) : a = i.getElementsByClassName("kInteractive");
        for (var r = a.length; r--;) {
            var o = a[r], s = r;
            null != e.forcedIndex && (s = e.forcedIndex), this.hasClass(o, "container") ? kInteractive.container.postRender(i, o, s, e) : this.hasClass(o, "questions") ? kInteractive.questions.postRender(i, o, s, e) : this.hasClass(o, "widget") ? kInteractive.widget.postRender(i, o, s, e) : this.hasClass(o, "video") ? kInteractive.video.postRender(i, o, s) : this.hasClass(o, "audio") ? kInteractive.audio.postRender(i, o, s) : this.hasClass(o, "threed") ? kInteractive.threed.postRender(i, o, s, e) : this.hasClass(o, "gallery") ? kInteractive.gallery.postRender(i, o, s) : this.hasClass(o, "image") ? kInteractive.image.postRender(i, o, s) : this.hasClass(o, "equation") ? kInteractive.equation.postRender(i, o, s) : this.hasClass(o, "lipsync") && kInteractive.lipsync.postRender(i, o, s)
        }
        this.firstRun && (window.addEventListener("resize", function (e) {
            kInteractive.resizeEvent(t, n)
        }), this.firstRun = !1), kInteractive.resizeEvent(t, n)
    }, actionEvent: function (e) {
        return kInteractive.action(e.target)
    }, action: function (e, t) {
        if ("undefined" == typeof editorMode || !editorMode) {
            "undefined" != typeof isKotobee && (kInteractive.absoluteURL = angular.element(document.body).scope().data.book.chapter.absoluteURL);
            for (var n = e; !this.hasClass(n, "kInteractive");) {
                if (!n.parentNode) return;
                if ((n = n.parentNode) == document.body) return
            }
            return this.hasClass(n, "questions") ? kInteractive.questions.action(n, e) : this.hasClass(n, "widget") ? kInteractive.widget.action(n) : this.hasClass(e, "link") ? kInteractive.link.action(n, e) : this.hasClass(e, "image") ? kInteractive.image.action(n, e) : this.hasClass(n, "gallery") ? kInteractive.gallery.action(n, e) : this.hasClass(n, "audio") ? kInteractive.audio.action(n, e) : this.hasClass(n, "video") ? kInteractive.video.action(n, e) : this.hasClass(n, "threed") ? kInteractive.threed.action(n, e) : this.hasClass(n, "equation") ? kInteractive.equation.action(n, e) : this.hasClass(n, "lipsync") ? kInteractive.lipsync.action(n, e) : void 0
        }
    }, trigger: function (e, t) {
        this.action(t, e)
    }, resize: function (e, t) {
        kInteractive.resizeEvent(e, t)
    }, resizeEvent: function (e, t) {
        var n = e || document;
        t && (n = document);
        for (var a = n.getElementsByClassName("kInteractive"), i = a.length; i--;) {
            var r = a[i];
            this.hasClass(r, "image") ? kInteractive.image.resize(r) : this.hasClass(r, "gallery") ? kInteractive.gallery.resize(r) : this.hasClass(r, "container") ? kInteractive.container.resize(r) : this.hasClass(r, "video") ? kInteractive.video.resize(r) : this.hasClass(r, "widget") ? kInteractive.widget.resize(r) : this.hasClass(r, "equation") && kInteractive.equation.resize(r)
        }
    }, vQueue: [], youTubeReady: !1, firstRun: !0
};
if ("undefined" == typeof isKotobee) {
    kotobee = {};
    var kotobeeListeners = [];

    function getKotobeeListener(e) {
        if (e) for (var t = kotobeeListeners.length; t--;) if (kotobeeListeners[t].event == e) return kotobeeListeners[t]
    }

    function clearKotobeeListeners(e) {
        for (var t = kotobeeListeners.length; t--;) e && kotobeeListeners[t].event != e || kotobeeListeners.splice(t, 1)
    }

    function dispatchKotobeeEvent() {
    }

    function kInteractionStart() {
        this.log = function (e) {
        }, kInteractive.setDOMParser(), kInteractive.preRender(), kInteractive.postRender()
    }

    function kInteractionStartSingleElem(e, t) {
        kInteractive.setDOMParser(), kInteractive.preRender(e, {singleElem: !0}), kInteractive.postRender(e, {
            singleElem: !0,
            forcedIndex: t
        })
    }

    function renderMathJax() {
        MathJax && MathJax.typeset && MathJax.typeset()
    }

    document.addEventListener("DOMContentLoaded", function (e) {
        "undefined" != typeof kotobeeReady && kotobeeReady(e), document.dispatchEvent(new Event("kotobeeReady")), document.dispatchEvent(new Event("kotobeeChapterLoaded")), kotobee.dispatchEvent("ready"), kotobee.dispatchEvent("chapterLoaded"), document.addEventListener("scroll", function (e) {
            kotobee.dispatchEvent("scrolled", e)
        })
    }), kotobee.addEventListener = function () {
        if (!(arguments.length < 2)) {
            var e, t = arguments[0], n = {};
            e = 2 == arguments.length ? arguments[1] : (n = arguments[1], arguments[2]), n.unique && clearKotobeeListeners(t);
            var a = {event: t, cb: e};
            kotobeeListeners.push(a)
        }
    }, kotobee.dispatchEvent = function (e, t) {
        if (e) {
            var n = getKotobeeListener(e);
            n && n.cb && n.cb.apply(this, [t])
        }
    };
    try {
        document.addEventListener("DOMContentLoaded", kInteractionStart, !1)
    } catch (e) {
        window.addEventListener("load", kInteractionStart, !1)
    }
}
kInteractive.audio = {
    preRender: function (e, t) {
    }, postRender: function (e, t, n) {
        var a = e.createDocumentFragment(), i = kInteractive.readData(t);
        t.setAttribute("id", "ki-audio-" + n), t.innerHTML = "";
        var r = document.createElement("div");
        r.setAttribute("id", "ki-audio-" + n + "-container"), r.className = "container";
        var o = document.createElement("a");
        o.className = "playBtn ki-btn", o.appendChild(document.createElement("span")), "undefined" == typeof isKotobee && o.addEventListener("click", kInteractive.actionEvent);
        var s = document.createElement("div");
        if (i.style && kInteractive.c.addClass(s, i.style), a.appendChild(o), a.appendChild(r), s.appendChild(a), t.appendChild(s), i.autoplay) kInteractive.action(t)
    }, action: function (e) {
        kInteractive.stopCurrentMedia();
        var t = kInteractive.readData(e);
        if (t) {
            t.audioType || (t.audioType = t.type);
            e.getAttribute("id");
            e.getElementsByClassName("playBtn")[0].className = "playBtn ki-btn hide";
            var n = t.src;
            if ("file" == t.audioType && (n = "undefined" == typeof isKotobee ? t.audio : t.relToRoot ? ph.join(bookPath, t.audio) : ph.join(kInteractive.absoluteURL, t.audio)), kInteractive.scorm) {
                var a = {};
                a.id = kInteractive.getScormId(e.getAttribute("id"), n), a.description = "Played audio: " + n, a.type = "other", a.learnerResponses = "Played", a.objective = t.options ? t.options.objective : null, a.timestamp = new Date, kInteractive.scorm.setInteractions([a])
            }
            kInteractive.events && kInteractive.events.add({action: "audioPlayed", param: n, elem: e, data: t});
            var i = document.createElement("audio");
            i.setAttribute("controls", "true"), i.setAttribute("autoplay", "true"), i.setAttribute("data-tap-disabled", "false");
            var r = document.createElement("source");
            r.src = kInteractive.cleanURL(n), i.appendChild(r), i.appendChild(document.createTextNode("Your browser does not support the audio element")), i.className = "ki-noHighlight", i.oncanplay = function () {
                kInteractive.currentAudio == e && kInteractive.tinCan({verb: "played", activity: "Audio: " + n})
            }, e.getElementsByClassName("container")[0].appendChild(i), i.play(), kInteractive.currentAudio = e, kInteractive.c.addClass(kInteractive.currentAudio, "playing")
        }
    }
};
var log = console.log, kInteractiveCommon = {
    checkResponsiveFloat: function (e, t) {
        if (e && e.disableWrapForMobile && "none" != e.float) {
            var n = t.parentNode;
            t.offsetWidth > .6 * n.offsetWidth && .4 * (n.offsetWidth - t.offsetWidth) < 100 ? kInteractive.c.addClass(t, "fullRow") : kInteractive.c.removeClass(t, "fullRow")
        }
    }, openFrame: function (u) {
        var m = document.getElementById("kInteractiveFrame"), p = document.getElementById("kiDarkOverlay"), v = "";
        if (u.dict || (u.dict = {}), u.width && (v += "width:" + u.width + "px;max-width:" + u.width + "px;"), u.height && (v += "height:" + u.height + "px;max-height:" + u.height + "px;"), m || ((p = document.createElement("div")).id = "kiDarkOverlay", document.body.appendChild(p), p.style.display = "none", p.style.position = "fixed", p.addEventListener("click", kInteractive.closeFrame), (m = document.createElement("div")).id = "kInteractiveFrame"), u.pos || (u.pos = "top"), "none" != u.pos) {
            var e = document.createElement("a"), t = "closeBtn";
            u.pos && (t += " " + u.pos), e.className = t;
            var n = u.dict.close ? u.dict.close : "Close";
            try {
                n = angular.element(document.body).scope().translit("close")
            } catch (e) {
            }
            "side" != u.pos && (e.innerHTML = n), e.addEventListener("click", kInteractive.closeFrame), m.appendChild(e)
        }
        var h = u.class ? u.class : "";
        (u.width || u.height) && (h += " fixed"), u.aspectRatio && (h += " aspectRatio"), m.style.display = "block", m.className = h, document.body.appendChild(m), kInteractive.frameIsOpen = !0, kInteractive.frameOb = u;
        try {
            if ("undefined" != typeof isKotobee && !native) {
                var a = window.location.hash.split("#");
                1 < a.length && (window.location.hash += (-1 == a[1].indexOf("?") ? "?" : "&") + "popup", window.addEventListener("hashchange", this.backBtnPressed))
            }
        } catch (e) {
        }

        function i() {
            p.style.display = "block", p.className = "show";
            var e = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName("body")[0].clientHeight,
                t = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName("body")[0].clientWidth;
            e -= 20, t -= 20;
            var n = 1;
            if (u.width && u.height) {
                var a = t / u.width, i = e / u.height;
                1 < (n = a < i ? a : i) && (n = 1)
            }
            var r = "display:block;";
            r += v;
            var o = u.width || u.height ? "-50%,-50%" : "0%,0%";
            r += "-webkit-transform:translate(" + o + ") scale(" + n + ");-moz-transform:translate(" + o + ") scale(" + n + ");transform:translate(" + o + ") scale(" + n + ");", r += "position:fixed;", "undefined" == typeof isKotobee && "-50%,-50%" == o && (r += "top:" + Math.round(window.innerHeight / 2) + "px;", r += "left:" + Math.round(window.innerWidth / 2) + "px;"), -1 != h.indexOf("aspectRatio") && window.innerWidth / window.innerHeight > 16 / 9 && (r += "padding-bottom: " + 95 * window.innerHeight / Math.round(window.innerWidth) + "%"), m.style.cssText = r, m.className = h + " ready";
            var s = m.getElementsByClassName("closeBtn");
            if (s.length) {
                var c = s[0], l = 1 / n, d = "-50%";
                kInteractive.hasClass(c, "side") && (d = "0%"), c.style.cssText = "-webkit-transform: translate(" + d + ",0%) scale(" + l + ");-webkit-transform-origin: 50% 50%;-moz-transform: translate(" + d + ",0%) scale(" + l + ");-moz-transform-origin: 50% 50%;transform: translate(" + d + ",0%) scale(" + l + ");transform-origin: 50% 50%;"
            }
        }

        kInteractive.openFrame.resized = i, window.addEventListener("resize", i), setTimeout(function () {
            i(), u.cb && u.cb(m)
        }, 100)
    }, closeAlert: function (e) {
        e && e.stopPropagation();
        var t = document.getElementById("kiSystemAlertBox"), n = document.getElementById("kiSystemAlertBackdrop");
        t.parentNode.removeChild(t), n.parentNode.removeChild(n), kInteractive.alertIsOpen = !1, window.removeEventListener("resize", kInteractive.alert.resized), kInteractive.alert.resized = null
    }, backBtnPressed: function (e) {
        e.oldURL && e.oldURL.match(/[?&]popup/g) && (window.removeEventListener("hashchange", kInteractive.backBtnPressed), kInteractive.closeFrame())
    }, closeFrame: function () {
        var e = document.getElementById("kInteractiveFrame"), t = document.getElementById("kiDarkOverlay");
        kInteractive.frameIsOpen = !1, window.removeEventListener("resize", kInteractive.openFrame.resized), kInteractive.openFrame.resized = null, kInteractive.c.removeClass(e, "ready");
        var n = kInteractive.frameOb, a = "";
        n.width && (a += "width:" + n.width + "px;max-width:" + n.width + "px;"), n.height && (a += "height:" + n.height + "px;max-height:" + n.height + "px;"), e.style.cssText = a, t.className = "", setTimeout(function () {
            e.innerHTML = "", e.style.display = t.style.display = "none", n.closed && n.closed(), kInteractive.frameOb = null
        }, 300), window.removeEventListener("hashchange", kInteractive.closeFrame), window.location.hash = window.location.hash.replace(/[?&]popup/g, "")
    }, stopCurrentMedia: function () {
        if (kInteractive.currentVideo) {
            var e = kInteractive.currentVideo.getAttribute("id") + "-container";
            if (n = document.getElementById(e)) {
                var t = n.parentNode;
                n.parentNode.removeChild(n), (a = document.createElement("div")).setAttribute("id", e), a.className = "container", (i = kInteractive.currentVideo.getElementsByClassName("playBtn")[0]).className = "playBtn ki-btn", kInteractive.c.removeClass(kInteractive.currentVideo, "playing"), t.appendChild(a)
            }
        }
        var n;
        if (kInteractive.currentAudio) if (e = kInteractive.currentAudio.getAttribute("id")) {
            if (e += "-container", n = document.getElementById(e)) {
                var a, i;
                t = n.parentNode;
                n.parentNode.removeChild(n), (a = document.createElement("div")).setAttribute("id", e), a.className = "container playerContainer", (i = kInteractive.currentAudio.getElementsByClassName("playBtn")[0]) && (i.className = "playBtn ki-btn"), kInteractive.c.removeClass(kInteractive.currentAudio, "playing"), t.appendChild(a)
            }
        } else try {
            var r = kInteractive.currentAudio.getElementsByTagName("audio");
            r.length && (r[0].pause(), r[0].src = ""), kInteractive.currentAudio.pause && (kInteractive.currentAudio.pause(), kInteractive.currentAudio.src = "");
            for (var o = document.getElementsByClassName("kiAudioLoader"), s = o.length; s--;) o[s].parentNode.removeChild(o[s])
        } catch (e) {
        }
    }, hasClass: function (e, t) {
        if (e && e.className) for (var n = e.className.trim().split(" "), a = 0; a < n.length; a++) if (n[a] && n[a].trim() == t) return !0
    }, appendAfterDelay: function (e, t) {
        setTimeout(function () {
            e.appendChild(t)
        }, 30)
    }, replaceHTML: function (e, t) {
        var n = "string" == typeof e ? document.getElementById(e) : e, a = n.cloneNode(!1);
        return a.innerHTML = t, n.parentNode.replaceChild(a, n), a
    }, tinCan: function (e) {
        if ("undefined" != typeof isKotobee) try {
            angular.element(document.body).scope().tinCanShortcut(e)
        } catch (e) {
        }
    }, setDOMParser: function () {
        !function (e) {
            "use strict";
            var t = e.prototype, r = t.parseFromString;
            try {
                if ((new e).parseFromString("", "text/html")) return
            } catch (e) {
            }
            t.parseFromString = function (e, t) {
                if (/^\s*text\/html\s*(?:;|$)/i.test(t)) {
                    var n, a = document.implementation.createHTMLDocument(""), i = a.documentElement;
                    return i.innerHTML = e, n = i.firstElementChild, 1 === i.childElementCount && "html" === n.localName.toLowerCase() && a.replaceChild(n, i), a
                }
                return r.apply(this, arguments)
            }
        }(DOMParser)
    }, compareVersions: function (e, t) {
        if (e == t) return 0;
        if (null == e) return 1;
        if (null == t) return -1;
        var n = e.split("."), a = t.split(".");
        return a.length ? n.length ? Number(n[0]) > Number(a[0]) ? 1 : Number(a[0]) > Number(n[0]) ? -1 : (n.shift(1), a.shift(1), kInteractive.compareVersions(n.join("."), a.join("."))) : -1 : 1
    }, readData: function (e) {
        try {
            var t = e.getAttribute("data-kotobee");
            t = t || e.getAttribute("data");
            var n = 1;
            if (!t) return;
            return JSON.parse(decodeURI(kInteractive.XORCipher(n).decode("kotobee%%author", t)))
        } catch (e) {
            try {
                return JSON.parse(kInteractive.XORCipher(n).decode("kotobee%%author", t))
            } catch (e) {
            }
        }
    }, writeData: function (e, t, n) {
        n = n || 1;
        var a = encodeURI(JSON.stringify(t)), i = e.hasAttribute("data-kotobee") ? "data-kotobee" : "data";
        e.setAttribute(i, kInteractive.XORCipher(n).encode("kotobee%%author", a))
    }, XORCipher: function (e) {
        var u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        return {
            encode: function (e, t) {
                return function (e) {
                    var t, n, a, i, r, o, s, c, l = 0, d = "";
                    if (!e) return e;
                    for (; t = e[l++], n = e[l++], a = e[l++], i = (s = t << 16 | n << 8 | a) >> 12 & 63, r = s >> 6 & 63, o = 63 & s, d += u.charAt(s >> 18 & 63) + u.charAt(i) + u.charAt(r) + u.charAt(o), l < e.length;) ;
                    return ((c = e.length % 3) ? d.slice(0, c - 3) : d) + "===".slice(c || 3)
                }(t = function (n, e) {
                    return i(e, function (e, t) {
                        return e.charCodeAt(0) ^ a(n, t)
                    })
                }(e, t))
            }, decode: function (e, t) {
                return function (n, e) {
                    return i(e, function (e, t) {
                        return String.fromCharCode(e ^ a(n, t))
                    }).join("")
                }(e, t = function (e) {
                    var t, n, a, i, r, o, s, c, l = 0, d = [];
                    if (!e) return e;
                    e += "";
                    for (; i = u.indexOf(e.charAt(l++)), r = u.indexOf(e.charAt(l++)), o = u.indexOf(e.charAt(l++)), s = u.indexOf(e.charAt(l++)), t = (c = i << 18 | r << 12 | o << 6 | s) >> 16 & 255, n = c >> 8 & 255, a = 255 & c, d.push(t), 64 !== o && (d.push(n), 64 !== s && d.push(a)), l < e.length;) ;
                    return d
                }(t))
            }
        };

        function a(e, t) {
            return e.charCodeAt(Math.floor(t % e.length))
        }

        function i(e, t) {
            for (var n = [], a = 0; a < e.length; a++) n[a] = t(e[a], a);
            return n
        }
    }, getScormId: function (e, t) {
        return e + (t = t ? "-" + t.replace(/[^a-zA-Z0-9]/g, "-").substr(0, 80) : "")
    }, confirm: function (e) {
        kInteractive.alert(e)
    }, alert: function (e) {
        if (e) {
            var t = document.createElement("div");
            if (t.setAttribute("id", "kiSystemAlertBox"), e.raw && (t.className = "raw"), t.style.position = "fixed", "undefined" == typeof isKotobee && (t.style.top = Math.round(window.innerHeight / 2) + "px", t.style.left = Math.round(window.innerWidth / 2) + "px"), e.raw) t.innerHTML = e.content.replace("&nbsp;", "&#160;"); else {
                var n = document.createElement("div");
                n.innerHTML = e.content.replace("&nbsp;", "&#160;"), n.className = "content", t.appendChild(n)
            }
            if (e.title) {
                var a = document.createElement("div");
                a.innerHTML = e.title.replace("&nbsp;", "&#160;"), a.className = "header", t.insertBefore(a, t.firstChild)
            }
            kInteractive.alertIsOpen = !0;
            var i = document.createElement("a");
            if (!e.raw) {
                var r = document.createElement("div");
                r.className = "footer";
                var o = "OK";
                try {
                    o = angular.element(document.body).scope().translit("ok")
                } catch (e) {
                }
                if (e.okBtn && (o = e.okBtn), i.innerHTML = o.replace("&nbsp;", "&#160;"), i.className = "okBtn", i.addEventListener("click", kInteractive.closeAlert), e.cb && i.addEventListener("click", e.cb), r.appendChild(i), e.noBtn) {
                    var s = document.createElement("a");
                    s.innerHTML = e.noBtn, s.className = "cancelBtn", s.addEventListener("click", kInteractive.closeAlert), r.appendChild(s)
                }
                t.appendChild(r)
            }
            var c = document.createElement("div");
            e.noBackdrop || (c.setAttribute("id", "kiSystemAlertBackdrop"), c.addEventListener("click", kInteractive.closeAlert), c.style.position = "fixed", document.body.appendChild(c)), document.body.appendChild(t), i.focus(), kInteractive.alert.resized = l, window.addEventListener("resize", l), setTimeout(function () {
                kInteractive.c.addClass(t, "show"), kInteractive.c.addClass(c, "show")
            }, 50)
        }

        function l() {
            "undefined" == typeof isKotobee && (t.style.top = Math.round(window.innerHeight / 2) + "px", t.style.left = Math.round(window.innerWidth / 2) + "px")
        }
    }, c: {
        addClass: function (e, t) {
            var n = e.className.trim();
            if (t instanceof Array) {
                for (var a = !0, i = 0; i < t.length; i++) -1 == n.indexOf(t[i]) && (a = !1, n += ("" == n ? "" : " ") + t[i]);
                if (a) return
            } else {
                if (0 <= n.indexOf(t)) return;
                n += ("" == n ? "" : " ") + t
            }
            e.className = n
        }, toggleClass: function (e, t) {
            this.strHasClass(e.className, t) ? this.removeClass(e, t) : this.addClass(e, t)
        }, hasClass: function (e, t) {
            return this.strHasClass(e.className, t)
        }, strHasClass: function (e, t) {
            for (var n = (e = e || "").trim().split(" "), a = 0; a < n.length; a++) if (n[a] == t) return !0;
            return !1
        }, removeClass: function (e, t) {
            var n = e.className;
            if (t instanceof Array) {
                for (var a = !0, i = 0; i < t.length; i++) 0 <= n.indexOf(t[i]) && (a = !1, n = n.replace(t[i], ""));
                if (a) return
            } else {
                if (-1 == n.indexOf(t)) return;
                n = (n = n.replace(t, "")).replace(/ {2,}?/g, " ")
            }
            "" == (n = n.trim()) ? e.removeAttribute("class") : e.className = n
        }, removeHash: function (e) {
            return -1 == e.indexOf("#") ? e : e.substring(0, e.lastIndexOf("#"))
        }, removeFilename: function (e) {
            var t = kInteractive.c.normalizedArray(e);
            return -1 == t[t.length - 1].indexOf(".") ? e : (t.splice(t.length - 1, 1), t.join("/"))
        }, normalizedArray: function (e) {
            for (var t = (e = e.replace(/\\/g, "/")).split("/"), n = t.length; n--;) t[n] ? ".." == t[n] && 0 < n && ".." != t[n - 1] && (t.splice(n, 1), t.splice(n - 1, 1)) : t.splice(n, 1);
            return t[0].match(/http[s]?:$/g) && (t[0] += "//" + t[1], t.splice(1, 1)), t[0].match(/kotobee:$/g) && (t[0] += "//" + t[1], t.splice(1, 1)), "file:" == t[0] && (t[0] += "///" + t[1], t.splice(1, 1)), t
        }
    }, shuffleArray: function (e) {
        e.sort(function () {
            return Math.random() - .5
        })
    }, allowDrop: function (e) {
        e.preventDefault()
    }, drag: function (e) {
        e.dataTransfer && e.dataTransfer.setData("text", e.target.id), dragged = e.target
    }, drop: function (e) {
        e.preventDefault(), e.target.hasAttribute("ondragover") && e.target.appendChild(e.view.dragged)
    }, escapeHtml: function (e) {
        var t = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"};
        return e.replace(/[&<>"']/g, function (e) {
            return t[e]
        })
    }, getChildIndex: function (e) {
        for (var t = 0; null != (e = e.previousSibling);) t++;
        return t
    }, isAbsolutePath: function (e) {
        if (e) return 0 == e.trim().indexOf("http://") || (0 == e.trim().indexOf("https://") || (0 == e.trim().indexOf("//") || (0 == e.trim().indexOf("data:") || (!!/.\:[\\\/].*/g.test(e.trim()) || void 0))))
    }, isMobile: function (e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return !0;
        try {
            if (0 < window.location.href.indexOf("?preview")) {
                var t = window.location.href.split("?");
                t = t[1].split("&");
                for (var n = {}, a = 0; a < t.length; a++) {
                    var i = t[a].split("=");
                    n[i[0]] = i[1]
                }
                if (n.mobile) return !0
            }
        } catch (e) {
        }
    }, getChildIndex: function (e) {
        for (var t = 0; null != (e = e.previousSibling);) t++;
        return t
    }, closeFullscreenVideo: function () {
        kInteractive.currentVideo && (kInteractive.currentVideo.webkitExitFullscreen ? kInteractive.currentVideo.webkitExitFullscreen() : kInteractive.currentVideo.mozCancelFullScreen ? kInteractive.currentVideo.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen && document.mozCancelFullScreen(), kInteractive.videoIsFullscreen = !1)
    }, getWidgetHome: function (e, t) {
        return {}, e.path ? "undefined" == typeof isKotobee ? e.path : ph.join(angular.element(document.body).scope().data.book.chapter.absoluteURL, e.path) : "undefined" == typeof isKotobee ? "../js/widgets/" : bookPath + "EPUB/js/widgets/"
    }, getWidgetUrl: function (e, t) {
        var n = kInteractive.getWidgetHome(e, t) + "/" + e.name + "/" + e.src;
        if ("undefined" != typeof isKotobee) {
            var a = angular.element(document.body).scope().data.user;
            a && a.email && a.signatures && a.signatures.bookwidgets && e.id && 0 == e.id.indexOf("com.kidimedia") && (n += "?oauth_signature=" + a.signatures.bookwidgets.signature, n += "&oauth_nonce=" + a.signatures.bookwidgets.nonce, n += "&oauth_timestamp=" + a.signatures.bookwidgets.timestamp, n += "&oauth_consumer_key=" + a.signatures.bookwidgets.key, n += "&lti_version=LTI-1p0", n += "&oauth_signature_method=HMAC-SHA1", n += "&oauth_version=1.0", n += "&tool_consumer_info_product_family_code=kotobee", n += "&lis_person_contact_email_primary=" + a.email, n += "&lis_person_name_full=" + (a.name ? a.name : ""), n += "&user_id=" + a.id, n += "&lti_message_type=basic-lti-launch-request", angular.element(document.body).scope().refreshSignatures && angular.element(document.body).scope().refreshSignatures())
        }
        return n = kInteractive.cleanURL(n)
    }, clearAudioVideo: function (e) {
        var t = e || document;
        kInteractive.stopCurrentMedia();
        for (var n = t.getElementsByTagName("audio"), a = n.length; a--;) try {
            if (n[a].hasAttribute("data-dontclose")) continue;
            n[a].pause(), n[a].children.length || (n[a].src = "")
        } catch (e) {
        }
        var i = t.getElementsByTagName("video");
        for (a = i.length; a--;) i[a].pause(), i[a].children.length || (i[a].src = "")
    }, cleanURL: function (e) {
        try {
            native && mobile && (e = window.Ionic.WebView.convertFileSrc(e))
        } catch (e) {
        }
        return e
    }, listenForSwiping: function (o) {
        o.addEventListener("touchstart", function (e) {
            s = e.touches[0].clientX, c = e.touches[0].clientY
        }, !1), o.addEventListener("touchmove", function (e) {
            if (null === s) return;
            if (null === c) return;
            var t = e.touches[0].clientX, n = e.touches[0].clientY, a = s - t, i = c - n;
            5 < a ? (o.dispatchEvent(new Event("swipeleft")), r()) : a < -5 ? (o.dispatchEvent(new Event("swiperight")), r()) : 5 < i ? (o.dispatchEvent(new Event("swipeup")), r()) : i < -5 && (o.dispatchEvent(new Event("swipedown")), r());

            function r() {
                c = s = null
            }

            e.preventDefault()
        }, !1);
        var s = null, c = null
    }
};
for (var item in kInteractiveCommon) kInteractive[item] = kInteractiveCommon[item];
kInteractive.container = {
    preRender: function (e, t) {
        kInteractive.readData(e)
    }, postRender: function (e, t, n) {
        var a = kInteractive.readData(t);
        if (a && (kInteractive.isMobile() && "cScroll" == a.type && "undefined" != typeof isKotobee && angular.element(document.body).scope().applyNativeScroll(t), a.path)) {
            var i = a.path;
            "undefined" != typeof isKotobee && (i = ph.join(kInteractive.absoluteURL, a.path));
            var r = t.getAttribute("style");
            i = kInteractive.cleanURL(i), t.setAttribute("style", r + ' background-image:url("' + i + '");')
        }
    }, action: function (e) {
    }, resize: function (e) {
        var t = kInteractive.readData(e);
        t && kInteractive.checkResponsiveFloat(t, e)
    }
}, kInteractive.equation = {
    preRender: function (e, t) {
        if (("undefined" == typeof editorMode || !editorMode) && "undefined" == typeof MathJax) {
            MathJax = {loader: {load: ["input/asciimath", "input/mml", "input/tex", "output/chtml", "ui/menu"]}};
            var n = document.createElement("script"), a = "";
            a = "undefined" == typeof isKotobee ? "../../js/lib/mathjax/startup.js" : bookPath + "EPUB/js/lib/mathjax/startup.js", n.src = kInteractive.cleanURL(a), n.setAttribute("type", "text/javascript"), document.head.appendChild(n)
        }
    }, postRender: function (e, t, n) {
        var a = e.createDocumentFragment(), i = kInteractive.readData(t);
        if (i) {
            t.setAttribute("id", "ki-equation-" + n), t.innerHTML = "";
            var r = i.content;
            "mathml" == i.type ? r = "<math>" + r + "</math>" : "asciimath" == i.type ? r = "`" + r + "`" : "tex" == i.type && (r = "\\(" + r + "\\)");
            var o = "inline" == i.placement ? "span" : "div", s = document.createElement(o);
            s.setAttribute("id", "ki-equation-" + n + "-container"), s.className = "parsed container", s.innerHTML = r;
            var c = document.createElement(o);
            i.style && kInteractive.c.addClass(c, i.style), a.appendChild(s), c.appendChild(a), t.appendChild(c), "undefined" != typeof editorMode && editorMode || MathJax && MathJax.typeset && MathJax.typeset()
        }
    }, action: function (e) {
        kInteractive.readData(e)
    }, resize: function (e) {
        kInteractive.readData(e)
    }
}, kInteractive.gallery = {
    preRender: function (e, t) {
        var n = t.createDocumentFragment(), a = kInteractive.readData(e);
        if (a) {
            e.innerHTML = "";
            var i = e.getAttribute("data-index");
            i = i || 0;
            var r = document.createElement("div");
            r.className = "imgMask";
            var o = document.createElement("div");
            o.className = "images " + a.scale, r.appendChild(o);
            for (var s = 0; s < a.imgs.length; s++) {
                var c = document.createElement("div");
                c.className = "imgContainer ki-btn";
                var l = "undefined" == typeof isKotobee ? a.imgs[s].path : ph.join(kInteractive.absoluteURL, a.imgs[s].path);
                l = kInteractive.cleanURL(l), c.setAttribute("style", "background-color:" + a.bgColor + ";background-image:url('" + l + "')"), a.imgs[s].caption && c.setAttribute("data-caption", a.imgs[s].caption), "undefined" != typeof isKotobee || kInteractive.c.hasClass(e, "fullscreen") || c.addEventListener("click", kInteractive.actionEvent), o.appendChild(c)
            }
            var d = document.createElement("div");
            d.className = "navBtns";
            var u = document.createElement("a");
            u.className = "next btn ki-btn", d.appendChild(u);
            var m = document.createElement("a");
            m.className = "prev btn ki-btn", d.appendChild(m), n.appendChild(d), "undefined" != typeof isKotobee && !kInteractive.c.hasClass(e, "fullscreen") || (u.addEventListener("click", kInteractive.actionEvent), m.addEventListener("click", kInteractive.actionEvent)), n.appendChild(r);
            var p = document.createElement("div");
            p.className = "kFooter", a.footerShadow && (p.className += " shadow"), n.appendChild(p);
            var v = document.createElement("div");
            v.className = "imgCaption";
            var h = document.createElement("div");
            if (h.className = "inner", h.style.display = "none", a.imgs[0] && a.imgs[0].caption && (h.innerHTML = a.imgs[0].caption, h.style.display = null), v.appendChild(h), p.appendChild(v), a.thumbnails) {
                var f = document.createElement("div");
                f.className = "kThumbs", a.thumbShowOnHover && (f.className += " showOnHover"), "small" == a.thumbSize ? kInteractive.c.addClass(f, "small") : "large" == a.thumbSize ? kInteractive.c.addClass(f, "large") : kInteractive.c.addClass(f, "medium"), p.appendChild(f)
            }
            if (kInteractive.c.hasClass(e, "fullscreen")) {
                var k = document.createElement("div");
                k.className = "fullscreenControls", k.innerHTML = "<a class='closeBtn ki-btn'></a>", e.appendChild(k), k.children[0].addEventListener("click", kInteractive.actionEvent), document.addEventListener("keydown", kInteractive.gallery.detectKey)
            }
            var g = document.createElement("div");
            a.style && kInteractive.c.addClass(g, a.style), g.appendChild(n), e.appendChild(g), kInteractive.gallery.dimBtns(e), kInteractive.gallery.resize(e), this.showImage(e, {
                index: i,
                dontGoFullscreen: !0
            }), setTimeout(function () {
                kInteractive.gallery.showImage(e, {index: i, dontGoFullscreen: !0})
            }, 80)
        }
    }, postRender: function (e, t, n) {
        kInteractive.gallery.resize(t);
        var a = this.getState(t);
        this.showImage(t, {index: a.selectedIndex, dontGoFullscreen: !0})
    }, action: function (e, t) {
        e.getElementsByClassName("images")[0].getElementsByClassName("selected")[0];
        if (kInteractive.hasClass(t, "btn")) kInteractive.hasClass(t, "next") ? kInteractive.gallery.showImage(e, {dir: "next"}) : kInteractive.hasClass(t, "prev") && kInteractive.gallery.showImage(e, {dir: "prev"}); else if (kInteractive.hasClass(t, "closeBtn")) kInteractive.gallery.exitFullscreen(); else {
            if (kInteractive.hasClass(t, "imgContainer")) return kInteractive.gallery.goToFullscreen(e);
            if (kInteractive.hasClass(t, "kMapItem")) {
                var n = kInteractive.getChildIndex(t);
                kInteractive.gallery.goToThumb(e, {windowIndex: n, highlightThumb: !1})
            } else if (kInteractive.hasClass(t, "kThumb")) {
                n = t.getAttribute("data-index");
                kInteractive.gallery.showImage(e, {index: t.getAttribute("data-index")})
            } else if (kInteractive.hasClass(t, "thumbNavBtn")) {
                kInteractive.hasClass(t, "next") ? kInteractive.gallery.goToThumb(e, {
                    dir: "nextWindow",
                    highlightThumb: !1
                }) : kInteractive.hasClass(t, "prev") && kInteractive.gallery.goToThumb(e, {
                    dir: "prevWindow",
                    highlightThumb: !1
                })
            }
        }
        kInteractive.gallery.dimBtns(e)
    }, goToThumb: function (e, t) {
        t = t || {};
        var n, a, i = this.getState(e), r = i.thumbWindows, o = i.activeWindow, s = i.currentIndex, c = i.selectedIndex,
            l = i.currentThumb, d = t.index;
        if (null == d && (null != t.windowIndex ? d = t.windowIndex * r[0].children[0].children.length : ("nextThumb" == t.dir && (d = c + 1), "prevThumb" == t.dir && (d = c - 1), "nextWindow" == t.dir && (d = s + r[0].children[0].children.length), "prevWindow" == t.dir && (d = s - r[0].children[0].children.length))), r.length) for (var u = r[0].getElementsByClassName("kThumb"), m = u.length; m--;) if (u[m].getAttribute("data-index") == d) {
            n = u[m], a = n.parentNode;
            break
        }
        if (a) {
            if (o != a) {
                s < d ? (o.style.left = -e.offsetWidth + "px", a.style.left = e.offsetWidth / 2 + "px") : (o.style.left = e.offsetWidth + "px", a.style.left = -e.offsetWidth / 2 + "px"), a.style.display = "none", setTimeout(function () {
                    a.style.display = "block", setTimeout(function () {
                        a.style.left = 0
                    }, 20)
                }, 20);
                var p = e.getElementsByClassName("kMapItem");
                if (p.length) {
                    var v = (p = p[0]).getElementsByClassName("active");
                    v.length && kInteractive.c.removeClass(v[0], "active"), kInteractive.c.addClass(p.children[kInteractive.getChildIndex(a)], "active")
                }
                kInteractive.c.addClass(a, "active"), kInteractive.c.removeClass(o, "active")
            }
            t.highlightThumb && (kInteractive.c.removeClass(l, "active"), kInteractive.c.addClass(n, "active"))
        }
    }, dimBtns: function (e) {
        for (var t, n = e.getElementsByClassName("kThumbWindow"), a = n.length; a--;) if (kInteractive.c.hasClass(n[a], "active")) {
            t = n[a];
            break
        }
        if (t) {
            var i = e.getElementsByClassName("thumbNavBtn");
            for (a = 0; a < i.length; a++) kInteractive.c.hasClass(i[a], "next") ? t.nextElementSibling ? kInteractive.c.removeClass(i[a], "disable") : kInteractive.c.addClass(i[a], "disable") : kInteractive.c.hasClass(i[a], "prev") && (t.previousElementSibling ? kInteractive.c.removeClass(i[a], "disable") : kInteractive.c.addClass(i[a], "disable"))
        }
        var r = e.getElementsByClassName("imgContainer");
        if (r.length) {
            var o = kInteractive.c.hasClass(r[0], "selected"), s = kInteractive.c.hasClass(r[r.length - 1], "selected"),
                c = e.getElementsByClassName("btn");
            for (a = 0; a < c.length; a++) kInteractive.c.hasClass(c[a], "next") ? s ? kInteractive.c.addClass(c[a], "disable") : kInteractive.c.removeClass(c[a], "disable") : kInteractive.c.hasClass(c[a], "prev") && (o ? kInteractive.c.addClass(c[a], "disable") : kInteractive.c.removeClass(c[a], "disable"))
        }
    }, getState: function (e) {
        var t = {};
        t.images = e.getElementsByClassName("images")[0], t.selectedImg = t.images.getElementsByClassName("selected"), t.imgContainer = e.getElementsByClassName("imgContainer"), t.thumbWindows = e.getElementsByClassName("kThumbWindows");
        for (var n = 0; n < t.imgContainer.length; n++) if (kInteractive.c.hasClass(t.imgContainer[n], "selected")) {
            t.selectedIndex = n;
            break
        }
        if (t.thumbWindows.length) {
            var a = t.thumbWindows[0].getElementsByClassName("active");
            for (n = 0; n < a.length; n++) kInteractive.c.hasClass(a[n], "kThumbWindow") ? (t.activeWindow = a[n], t.currentIndex = Number(t.activeWindow.children[0].getAttribute("data-index"))) : t.currentThumb = a[n]
        }
        return t
    }, goToFullscreen: function (e) {
        if (!kInteractive.c.hasClass(e, "fullscreen")) {
            var t = document.createElement("div");
            t.innerHTML = e.outerHTML;
            var n = t.children[0];
            document.body.appendChild(n);
            var a = this.getState(e), i = e.getBoundingClientRect();
            n.setAttribute("data-index", a.selectedIndex), n.setAttribute("id", "kFullscreenGallery"), n.style.top = i.top + "px", n.style.left = i.left + "px", n.style.width = i.width + "px", n.style.height = i.height + "px", kInteractive.listenForSwiping(n), n.addEventListener("swipeleft", function () {
                kInteractive.gallery.showImage(n, {dir: "next"})
            }), n.addEventListener("swiperight", function () {
                kInteractive.gallery.showImage(n, {dir: "prev"})
            }, !1), "undefined" == typeof isKotobee && (n.style.position = "fixed"), kInteractive.c.addClass(n, "fullscreen"), kInteractive.preRender(n, {singleElem: !0}), kInteractive.postRender(n, {singleElem: !0}), setTimeout(function () {
                kInteractive.c.addClass(n, "in")
            }, 20)
        }
    }, showImage: function (e, t) {
        t = t || {};
        var n = kInteractive.readData(e), a = this.getState(e), i = a.images, r = a.selectedImg, o = a.imgContainer,
            s = t.index;
        if (null == s && r.length && (s = kInteractive.getChildIndex(r[0]) + ("next" == t.dir ? 1 : -1)), s < 0 && (s = 0), null == s && (s = 0), !t.dontGoFullscreen && s == a.selectedIndex) return kInteractive.gallery.goToFullscreen(e);
        r.length && kInteractive.c.removeClass(r[0], "selected"), kInteractive.c.addClass(o[s], "selected"), o[s].style.left = i.offsetWidth * s + "px", o[s].style.display = "block", i.style.left = -i.offsetWidth * s + "px", this.goToThumb(e, {
            index: s,
            highlightThumb: !0
        });
        var c = e.getElementsByClassName("imgCaption");
        if (c.length) {
            var l = (c = c[0]).getElementsByClassName("inner");
            if (l.length && ((l = l[0]).style.display = "none", o[s].hasAttribute("data-caption") && (l.innerHTML = o[s].getAttribute("data-caption"), n.captionFontSize && (l.style.fontSize = n.captionFontSize + "em"), n.captionColor && (l.style.color = n.captionColor), l.style.display = null), !n.footerOverlap)) {
                var d = e.getElementsByClassName("imgMask");
                if (!d.length) return;
                d = d[0];
                var u = e.getElementsByClassName("kFooter")[0];
                d.style.bottom = u.offsetHeight + "px"
            }
        }
    }, detectKey: function (e) {
        kInteractive.gallery.exitFullscreen()
    }, exitFullscreen: function () {
        var e = document.getElementById("kFullscreenGallery");
        e && (kInteractive.c.removeClass(e, "in"), e.style.opacity = 0, setTimeout(function () {
            e.parentNode.removeChild(e), document.removeEventListener("keydown", kInteractive.gallery.detectKey)
        }, 1e3))
    }, resize: function (e) {
        var t = kInteractive.readData(e);
        if (t && (kInteractive.checkResponsiveFloat(t, e), t.thumbnails)) {
            var n = kInteractive.gallery.getState(e).selectedIndex;
            null == n && (e.getAttribute("data-index"), n = n || 0);
            var a = e.getElementsByClassName("kThumbs")[0];
            a.innerHTML = "";
            var i = 50;
            "small" == t.thumbSize ? i = 40 : "large" == t.thumbSize && (i = 60);
            var r, o = Math.floor((e.offsetWidth - 80) / i), s = document.createElement("div");
            s.className = "kThumbWindows";
            for (var c = 0; c < t.imgs.length; c++) if (t.imgs[c].thumbPath) {
                var l = document.createElement("a");
                l.className = "ki-btn kThumb" + (c == n ? " active" : ""), l.setAttribute("data-index", c);
                var d = "undefined" == typeof isKotobee ? t.imgs[c].thumbPath : ph.join(kInteractive.absoluteURL, t.imgs[c].thumbPath);
                d = kInteractive.cleanURL(d), l.setAttribute("style", "background-image:url('" + d + "')"), "undefined" != typeof isKotobee && !kInteractive.c.hasClass(e, "fullscreen") || l.addEventListener("click", kInteractive.actionEvent), c % o == 0 && ((r = document.createElement("div")).className = "kThumbWindow", s.appendChild(r)), c == n && kInteractive.c.addClass(r, "active"), r.appendChild(l)
            }
            if (a.appendChild(s), t.thumbMap) {
                var u = document.createElement("div");
                u.className = "kThumbMap";
                for (c = 0; c < t.imgs.length; c++) if (c % o == 0) {
                    var m = document.createElement("a");
                    m.className = "ki-btn kMapItem" + (c == n ? " active" : ""), u.appendChild(m), "undefined" != typeof isKotobee && !kInteractive.c.hasClass(e, "fullscreen") || m.addEventListener("click", kInteractive.actionEvent)
                }
                a.appendChild(u)
            }
            if (1 < s.children.length) {
                var p = document.createElement("a");
                p.className = "thumbNavBtn next", a.appendChild(p);
                var v = document.createElement("a");
                v.className = "thumbNavBtn prev", a.appendChild(v), "undefined" != typeof isKotobee && !kInteractive.c.hasClass(e, "fullscreen") || (p.addEventListener("click", kInteractive.actionEvent), v.addEventListener("click", kInteractive.actionEvent))
            }
        }
    }
}, kInteractive.image = {
    preRender: function (e, t) {
        var n = kInteractive.readData(e);
        n && (n.style && kInteractive.c.addClass(e, n.style), n.popup && n.splash && (e.src = n.splash), e.parentNode && kInteractive.hasClass(e.parentNode, "link") || "undefined" == typeof isKotobee && e.addEventListener("click", kInteractive.actionEvent))
    }, postRender: function (e, t, n) {
        kInteractive.readData(t)
    }, action: function (e, a, t) {
        if (a.parentNode && kInteractive.hasClass(a.parentNode, "kInteractive") && kInteractive.hasClass(a.parentNode, "link")) kInteractive.action(a.parentNode, event); else {
            var n = kInteractive.readData(a);
            if (n) {
                var i = n.behavior;
                if ("none" != i) s(a, "none"), c(a, "none"), l(a, "none"), setTimeout(function () {
                    "wiggle" == i ? (s(a, "wiggle"), c(a, "0.5s"), l(a, "1")) : "jump" == i ? (s(a, "jump"), c(a, "0.7s"), l(a, "1")) : "scale" == i && (s(a, "scale"), c(a, "0.5s"), l(a, "1"));
                    var n = function () {
                        var e, t = document.createElement("fakeelement"), n = {
                            animation: "animationend",
                            OAnimation: "oAnimationEnd",
                            MozAnimation: "animationend",
                            WebkitAnimation: "webkitAnimationEnd"
                        };
                        for (e in n) if (void 0 !== t.style[e]) return n[e]
                    }();
                    n && a.addEventListener(n, function e(t) {
                        s(a, "none"), c(a, "none"), l(a, "none"), a.removeEventListener(n, e)
                    })
                }), kInteractive.tinCan({
                    verb: "clicked",
                    activity: i + "image: " + a.getAttribute("src")
                }); else if (n.popup) {
                    var r = {class: "image"}, o = document.createElement("img");
                    o.src = n.path, kInteractive.isAbsolutePath(n.path) || "undefined" != typeof isKotobee && (o.src = ph.join(kInteractive.absoluteURL, n.path)), r.width = o.naturalWidth, r.height = o.naturalHeight, r.pos = "side", r.cb = function (e) {
                        e.appendChild(o)
                    }, r.closed = function () {
                    }, kInteractive.openFrame(r)
                }
            }
        }

        function s(e, t) {
            e.style.webkitAnimation = e.style.mozAnimation = e.style.animation = t
        }

        function c(e, t) {
            e.style.webkitAnimationDuration = e.style.mozAnimationDuration = e.style.animationDuration = t
        }

        function l(e, t) {
            e.style.webkitAnimationIterationCount = e.style.mozAnimationIterationCount = e.style.animationIterationCount = t
        }
    }, resize: function (e) {
        var t = kInteractive.readData(e);
        t && kInteractive.checkResponsiveFloat(t, e)
    }
}, kInteractive.link = {
    preRender: function (e, t) {
        var n = kInteractive.readData(e);
        if (n && ("undefined" == typeof editorMode || !editorMode)) {
            if ("#" == e.getAttribute("href") && e.setAttribute("href", ""), "div" == e.nodeName.toLowerCase()) {
                var a = document.createElement("a"), i = e.getAttribute("href") ? e.getAttribute("href") : n.href;
                e.getAttribute("data-href") && (i = e.getAttribute("data-href")), i = i || "", a.setAttribute("href", i), a.setAttribute("target", n.target ? n.target : ""), a.setAttribute("style", e.getAttribute("style")), a.setAttribute("data-kotobee", e.getAttribute("data-kotobee")), a.className = e.className, e.id ? a.id = e.id : n.id && (a.id = n.id), kInteractive.c.addClass(a, "btn"), a.style.opacity = Number(n.transparency) / 100, e.parentNode.replaceChild(a, e), e = a
            }
            "undefined" == typeof isKotobee && ("popup" != n.type && "audio" != n.type && "action" != n.type || e.setAttribute("onclick", "return false;"), e.addEventListener("click", kInteractive.actionEvent))
        }
    }, postRender: function (e, t, n) {
    }, action: function (t, e, n) {
        var a = kInteractive.readData(e);
        if (a) {
            if ("popup" == a.type) {
                var i = "<div class='kbAlertScroll'>" + a.msg + "</div>";
                if (i = i.replace(/src="(.*?)"/g, function () {
                    var e = arguments[1];
                    return "undefined" != typeof isKotobee && (e = ph.join(kInteractive.absoluteURL, e)), 'src="' + e + '"'
                }), "image" == a.popupMode) {
                    var r = a.popupImg;
                    "undefined" != typeof isKotobee && (r = ph.join(kInteractive.absoluteURL, r)), i = "<img src='" + (r = kInteractive.cleanURL(r)) + "'/>"
                }
                kInteractive.alert({content: i}), setTimeout(function () {
                    if (kInteractive.scorm) {
                        var e = {};
                        e.id = kInteractive.getScormId("popup", a.msg), e.description = "Shown popup message: " + a.msg, e.type = "other", e.learnerResponses = "Shown", e.timestamp = new Date, kInteractive.scorm.setInteractions([e])
                    }
                    kInteractive.events && kInteractive.events.add({action: "popup", param: a.msg, elem: t, data: a})
                })
            } else if ("action" == a.type) {
                var o = a.asset, s = a.action;
                if (o.remote) {
                    if ("widget" == o.type) {
                        var c = document.createElement("div");
                        c.className = "kInteractive widget kbHidden", c.setAttribute("data-kotobee", o.data), document.body.appendChild(c), kInteractive.trigger("click", c)
                    }
                    return
                }
                for (var l = document.getElementsByClassName(o.classname), d = 0; d < l.length; d++) if (kInteractive.hasClass(l[d], "kInteractive") && kInteractive.hasClass(l[d], o.type)) if ("activate" == s) if ("gallery" == o.type) {
                    var u = l[d].getElementsByClassName("next");
                    kInteractive.trigger("click", u[0])
                } else if ("questions" == o.type) {
                    for (var m = l[d].getElementsByClassName("ki-btn"), p = 0; p < m.length; p++) if ("submit" == m[p].type) {
                        kInteractive.trigger("click", m[p]);
                        break
                    }
                } else kInteractive.trigger("click", l[d]); else "visibility" == s && kInteractive.c.toggleClass(l[d], "kbHidden")
            } else if ("audio" == a.type) {
                kInteractive.stopCurrentMedia();
                var v, h = document.createElement("audio"), f = a.src;

                function k() {
                    v || (kInteractive.c.addClass(y, "hide"), v = !0)
                }

                "file" == a.audioType && (f = "undefined" == typeof isKotobee ? a.audio : ph.join(kInteractive.absoluteURL, a.audio)), h.setAttribute("src", f);
                var g = document.createElement("div");
                g.className = "kiAudioLoader", g.style.transform = g.style.webkitTransform = g.style.mozTransform = "scale(1)";
                var y = document.createElement("div");
                if (y.className = "kiAudioSpinner", g.appendChild(y), e.parentNode.insertBefore(g, e), h.onplaying = k, setTimeout(k, 5e3), h.play(), kInteractive.currentAudio = h, kInteractive.tinCan({
                    verb: "played",
                    activity: "Audio: " + f
                }), kInteractive.scorm) {
                    var b = {};
                    b.id = kInteractive.getScormId(e.textContent, f), b.description = "Played audio link: " + f, b.type = "other", b.learnerResponses = "Played", b.objective = a.options ? a.options.objective : null, b.timestamp = new Date, kInteractive.scorm.setInteractions([b])
                }
                kInteractive.events && kInteractive.events.add({action: "audioLinkClicked", param: f, elem: t, data: a})
            } else if ("attachment" == a.type) {
                var I = a.file;
                if ("undefined" != typeof isKotobee && (I = ph.join(kInteractive.absoluteURL, a.file)), "undefined" != typeof kotobee && native) return void angular.element(document.body).scope().getService("crdv").mobileDownload(I);
                var C = document.createElement("a");
                document.body.appendChild(C), C.setAttribute("style", "display: none"), C.href = kInteractive.cleanURL(I), C.target = "_blank", C.download = a.file.split("/")[a.file.split("/").length - 1], C.setAttribute("onclick", "");
                var E = document.createEvent("MouseEvents");
                E.initMouseEvent("click"), C.dispatchEvent(E), C.remove()
            }
            return !1
        }
    }
}, kInteractive.lipsync = {
    preRender: function (e, t) {
    }, postRender: function (e, t, n) {
        var a, i = e.createDocumentFragment(), r = kInteractive.readData(t);
        t.setAttribute("id", a = "ki-lipsync-" + n), t.innerHTML = "";
        var o = document.createElement("div");
        if (o.className = "container", r.sync) {
            var s = document.createElement("div");
            s.className = "audioContainer";
            var c = document.createElement("a");
            c.className = "playBtn ki-btn", c.appendChild(document.createElement("span")), "undefined" == typeof isKotobee && c.addEventListener("click", kInteractive.actionEvent), s.appendChild(c);
            var l = document.createElement("div");
            l.setAttribute("id", a + "-container"), l.className = "playerContainer", s.appendChild(l), r.interaction.playBtn ? r.interaction.btnAlignment && kInteractive.c.addClass(s, r.interaction.btnAlignment) : s.style.display = "none", o.appendChild(s)
        }
        var d = document.createElement("div");
        d.className = "contentContainer", d.innerHTML = "undefined" == typeof isKotobee ? function (e) {
            document.createElement("div");
            var t = /(>)([^<\n]*?[^<]+?)(<[^\/])/g;
            e = e.replace(/([< \/][^>]*?>)((\s*[^<\s]+\s+?)+)([^<\s]+\s*)(<)/g, function (e, t) {
                if (0 <= t.indexOf('class="parsed"')) return e;
                if (0 == t.indexOf("<pre")) return e;
                if (0 == t.indexOf("<code")) return e;
                if (0 == t.indexOf("<script")) return e;
                var n = arguments[2].split(" ");
                "" == n[n.length - 1] && n.splice(-1, 1), n.push(arguments[4]);
                for (var a = "", i = 0; i < n.length; i++) {
                    var r = i == n.length - 1 ? "" : " ";
                    a += "<span>" + n[i] + r + "</span>"
                }
                return t + a + "<"
            }), e = e.replace(t, function (e, t) {
                return arguments[2].trim() ? t + ("<span>" + arguments[2] + "</span>") + arguments[3] : e
            });
            return e = (e = e.replace(/(<a [\s\S]*?)(>)/g, '$1 onclick="return false;" $2')).replace("&nbsp;", "&#160;")
        }(r.content) : r.content, o.appendChild(d);
        var u = document.createElement("div");
        r.style && kInteractive.c.addClass(u, r.style), i.appendChild(o), u.appendChild(i), t.appendChild(u);
        var m = document.createElement("style");
        m.className = "parsed";
        var p = "";
        if (p += "#" + a + " .lipSyncCurrentWord {", p += "color:" + r.layout.color + ";", r.layout.underline && (p += "text-decoration:underline;"), r.layout.scale && 1 < Number(r.layout.scale) && (p += "transform:scale(" + r.layout.scale + ");", p += "padding:0 3px;", p += "display:inline-block;"), p += "}", m.innerHTML = p, t.appendChild(m), r.autoplay) kInteractive.action(t)
    }, action: function (i, e) {
        kInteractive.stopCurrentMedia();
        var r = kInteractive.readData(i);
        if (r) {
            r.audioType || (r.audioType = r.type);
            i.getAttribute("id");
            i.getElementsByClassName("playBtn")[0].className = "playBtn ki-btn hide";
            var t = r.src;
            if ("file" == r.audioType && (t = "undefined" == typeof isKotobee ? r.audio : r.relToRoot ? ph.join(bookPath, r.audio) : ph.join(kInteractive.absoluteURL, r.audio)), kInteractive.scorm) {
                var n = {};
                n.id = kInteractive.getScormId(i.getAttribute("id"), t), n.description = "Played audio: " + t, n.type = "other", n.learnerResponses = "Played", n.objective = r.options ? r.options.objective : null, n.timestamp = new Date, kInteractive.scorm.setInteractions([n])
            }
            kInteractive.events && kInteractive.events.add({action: "audioPlayed", param: t, elem: i, data: r});
            var a = document.createElement("audio");
            a.setAttribute("controls", "true"), a.setAttribute("autoplay", "true"), a.setAttribute("data-tap-disabled", "false");
            var o = document.createElement("source");
            o.src = t, a.appendChild(o), a.appendChild(document.createTextNode("Your browser does not support the audio element")), a.className = "ki-noHighlight", a.oncanplay = function () {
                kInteractive.currentAudio == i && kInteractive.tinCan({verb: "played", activity: "Audio: " + t})
            }, a.ontimeupdate = function (e) {
                !function (e) {
                    var t, n = r;
                    for (var a = n.sync.length; a--;) if (e >= n.sync[a]) {
                        t = a;
                        break
                    }
                    if (null == t) return;
                    c != t && (null != c && s[c] && kInteractive.c.removeClass(s[c], "lipSyncCurrentWord"), s[t] && kInteractive.c.addClass(s[t], "lipSyncCurrentWord"), c = t)
                }(a.currentTime)
            }, i.getElementsByClassName("playerContainer")[0].appendChild(a), a.play(), kInteractive.currentAudio = i, kInteractive.c.addClass(kInteractive.currentAudio, "playing");
            var s = function () {
                for (var e = [], t = i.getElementsByClassName("contentContainer")[0], n = t.getElementsByClassName("lipSyncCurrentWord"), a = n.length; a--;) hasClass(n[a], "lipSyncCurrentWord") && removeClass(n[a], "lipSyncCurrentWord");
                for (; t.children && t.children.length;) t = t.children[0];
                e.push(t);
                for (; t;) if (t.nextSibling) {
                    for (t = t.nextSibling; t.children && t.children.length;) t = t.children[0];
                    if (3 == t.nodeType) continue;
                    if ("" == t.textContent) continue;
                    e.push(t)
                } else if ("contentContainer" == (t = t.parentNode).className) break;
                return e
            }(), c = 0;
            kInteractive.c.addClass(s[c], "lipSyncCurrentWord")
        }
    }
}, kInteractive.questions = {
    preRender: function (e, t, n, a) {
        var i = t.createDocumentFragment(), r = kInteractive.readData(e);
        if (r) {
            var o = r.dict, s = r.userDict;
            if (o = o || {}, s = s || o, r.options || (r.options = {}), e.id || (e.id = "ki-qs-" + n + "-" + Math.ceil(1e3 * Math.random())), e.innerHTML = "", r.layout && r.layout.popup && !kInteractive.hasClass(e, "inpopup")) {
                var c = document.createElement("img"), l = r.layout.popupImg;
                return l = kInteractive.cleanURL(l), c.src = l, i.appendChild(c), "undefined" == typeof isKotobee && c.addEventListener("click", kInteractive.actionEvent), void e.appendChild(i)
            }
            if (r.options.randomize) {
                for (var d = 0; d < r.q.length; d++) r.q[d].origin = d;
                for (var u, m, p = r.q.length; 0 !== p;) m = Math.floor(Math.random() * p), p -= 1, u = r.q[p], r.q[p] = r.q[m], r.q[m] = u
            }
            if (r.options.questionsDisplayed) {
                var v = Number(r.options.questionsDisplayed);
                r.q = r.q.slice(0, v)
            }
            if (r.title) {
                var h = document.createElement("span");
                h.innerHTML = "<h4>" + kInteractive.escapeHtml(r.title) + "</h4>", i.appendChild(h)
            }
            var f = null;
            r.options && r.options.emailForm && (f = this.f.createEmailForm(s));
            var k = null;
            "none" != r.action && (k = this.f.createSubmitBtn(s, e));
            var g = null, y = null, b = null;
            r.options && r.options.clearAnswers && (g = this.f.createClearBtn(s)), r.options && r.options.addToNotebook && (b = this.f.createAddToNotebookBtn(s)), r.options && r.options.preserveAnswers && (y = this.f.createPreserveBtn(s, e));
            var I = this.f.createSeparator(), C = document.createElement("div");
            C.className = "qContainer";
            var E = document.createElement("div");
            if (E.className = "btnContainer", "slides" == r.options.displayMode) e.qIndex = 0, C.appendChild(kInteractive.questions.f.createQElem(r, {
                index: 0,
                elem: e,
                rendered: !1
            })), i.appendChild(C), i.appendChild(E), kInteractive.questions.f.showNavBtns(0, i, {
                isFrag: !0,
                userDict: s,
                qsData: r
            }); else {
                for (d = 0; d < r.q.length; d++) C.appendChild(kInteractive.questions.f.createQElem(r, {
                    index: d,
                    elem: e,
                    rendered: !1
                }));
                i.appendChild(C), f && E.appendChild(f), k && E.appendChild(k), E.appendChild(document.createTextNode(" ")), b && E.appendChild(b), g && E.appendChild(g), y && E.appendChild(y), I && i.appendChild(I), i.appendChild(E)
            }
            r.options.rtl ? (e.setAttribute("dir", "rtl"), kInteractive.c.addClass(e, "rtl")) : e.setAttribute("dir", "ltr");
            var w = document.createElement("div");
            r.style && kInteractive.c.addClass(w, r.style), w.appendChild(i), e.appendChild(w)
        }
    }, postRender: function (e, t, n) {
        var a = kInteractive.readData(t);
        if (a) {
            var i = a.dict;
            a.userDict;
            i = i || {}, i;
            for (var r = t.getElementsByClassName("ques"), o = t.getElementsByClassName("explanation"), s = o.length; s--;) o[s].parentNode.removeChild(o[s]);
            var c = t.getElementsByClassName("reference");
            for (s = c.length; s--;) c[s].parentNode.removeChild(c[s]);
            for (var l = 0; l < r.length; l++) {
                var d = r[l].getElementsByClassName("ans"), u = (d.length, l);
                a.options.randomize && (u = Number(r[l].getAttribute("data-o"))), document[t.id] && document[t.id].preserve && document[t.id].q && document[t.id].q[u] && kInteractive.questions.f.showExp(a.userDict, r[l], a.q[u]);
                for (s = 0; s < d.length; s++) if (kInteractive.c.removeClass(d[s].parentNode, "correct"), 0 <= d[s].getAttribute("id").indexOf("ki-tf-")) document[t.id] && document[t.id].preserve && document[t.id].q && document[t.id].q[u] && (document[t.id].q[u][s] ? d[s].setAttribute("checked", !0) : d[s].removeAttribute("checked"), a.options && a.options.highlightCorrect && (0 == s && a.q[u].a || 1 == s && !a.q[u].a) && kInteractive.c.addClass(d[s].parentNode, "correct")); else if (0 <= d[s].getAttribute("id").indexOf("ki-dd-")) {
                    if (document[t.id] && document[t.id].preserve && document[t.id].q && document[t.id].q[u]) for (var m = 0; m < document[t.id].q[u].length; m++) {
                        var p = document[t.id].q[u][m];
                        try {
                            for (var v = document.getElementById(p.id), h = v; !kInteractive.c.hasClass(h, "ques");) h = h.parentNode;
                            h.getElementsByClassName("categoryContainer")[0].children[p.category].appendChild(v)
                        } catch (e) {
                        }
                    }
                } else 0 <= d[s].getAttribute("id").indexOf("ki-sa-") ? document[t.id] && document[t.id].preserve && document[t.id].q && document[t.id].q[u] && (d[s].removeAttribute("value"), document[t.id].q[u] && d[s].setAttribute("value", document[t.id].q[u])) : document[t.id] && document[t.id].preserve && document[t.id].q && document[t.id].q[u] && (document[t.id].q[u][s] ? d[s].setAttribute("checked", !0) : d[s].removeAttribute("checked"), a.options && a.options.highlightCorrect && a.q[u].c[s].a && kInteractive.c.addClass(d[s].parentNode, "correct"));
                if (document[t.id]) {
                    var f = t.getElementsByClassName("questions-preserve");
                    f.length && (document[t.id].preserve ? f[0].setAttribute("checked", !0) : f[0].removeAttribute("checked"))
                }
            }
        }
    }, action: function (f, t, e) {
        var n = kInteractive.readData(f);
        if (n) {
            var a = n.dict, i = n.userDict;
            if (a = a || {}, i = i || a, n.layout && n.layout.popup && !kInteractive.hasClass(f, "inpopup") && "img" == t.nodeName.toLowerCase()) {
                function r(e) {
                    for (var t = 0; e = e.previousSibling;) "#text" != e.nodeName && 8 != e.nodeType && t++;
                    return t
                }

                var o = document.getElementById("epubContent");
                o && f.setAttribute("data-loc", function (e, t) {
                    for (var n = ""; e != t;) {
                        n = r(e) + "." + n, e = e.parentNode
                    }
                    return "" == n ? "" : n.substr(0, n.length - 1)
                }(f, o));
                var k = document.createElement("iframe");
                k.setAttribute("nwdisable", "true"), k.setAttribute("nwfaketop", "true"), k.setAttribute("scrolling", "yes");
                var g = document.createElement("div");
                return g.className = "scroller", g.appendChild(k), n.cb = function (e) {
                    var t, n = document.createElement("head");
                    if ("undefined" == typeof isKotobee) {
                        for (var a = document.getElementsByTagName("link"), i = 0; i < a.length; i++) {
                            var r = a[i];
                            if (0 <= r.getAttribute("href").indexOf("base.css")) {
                                var o = r.getAttribute("href").split("/");
                                delete o[o.length - 1], t = o.join("/");
                                break
                            }
                        }
                        if (!t) return
                    }
                    var s = "undefined" == typeof isKotobee ? kInteractive.c.removeHash(window.location.href) : kInteractive.absoluteURL;
                    s = kInteractive.c.removeFilename(s) + "/", s = kInteractive.cleanURL(s), "undefined" != typeof isKotobee && desktop && !kInteractive.isAbsolutePath(s) && (s = kInteractive.c.removeFilename(kInteractive.c.removeHash(window.location.href)) + "/" + s);
                    for (var c = s.split("EPUB/xhtml")[1].split("/").length - 1, l = "", d = 0; d < c; d++) l += "../";
                    n = "<head>";
                    if (n += '<base href="' + s + '"/>', n += '<link rel="stylesheet" type="text/css" href="' + (l + "css/base.css") + '" />', n += '<link rel="stylesheet" type="text/css" href="' + (l + "css/global.css") + '" />', n += '<link rel="stylesheet" type="text/css" href="' + (l + "css/kotobeeInteractive.css") + '" />', n += '<script type="text/javascript" src="' + (l + "js/kotobeeInteractive.js") + '"><\/script>', n += '<script type="text/javascript" src="' + (l + "js/global.js") + '"><\/script>', "undefined" != typeof isKotobee) {
                        var u = clone(config);
                        u.kotobee.email = angular.element(document.body).scope().data.user.email, n += '<script type="text/javascript">var config=' + JSON.stringify(u) + ";<\/script>"
                    }
                    n += '<meta name="viewport" content="viewport-fit=cover,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,width=device-width">', n += '<meta charset="utf-8" />', n += "</head>";
                    var m = f.outerHTML;
                    m = (m = (m = (m = (m = (m = m.replace("<img", '<img style="display:none"')).replace(/([;\s]*?height:)(.*)?;/i, "$1auto")).replace(/([;\s]*?width:)(.*)?;/i, "$1auto")).replace(/([;\s]*?top:)(.*)?;/i, "$1auto")).replace(/([;\s]*?left:)(.*)?;/i, "$1auto")).replace('class="', 'class="inpopup ');
                    var p = "<html>" + n + "<body>" + (m += '<div class="vSpace20"></div>') + "</body></html>";
                    k.setAttribute("srcdoc", p);
                    var v = "javascript: window.frameElement.getAttribute('srcdoc');";

                    function h() {
                        if ("undefined" != typeof isKotobee) {
                            var e = {};
                            e.root = k.contentDocument.documentElement.ownerDocument.body, e.rootIndex = f.getAttribute("data-loc"), angular.element(document.body).scope().getNotebookShortcut(e, function () {
                            })
                        }
                    }

                    k.setAttribute("src", v), k.contentWindow && (k.contentWindow.location = v), e.appendChild(g), k.addEventListener ? k.addEventListener("load", h, !0) : k.attachEvent && k.attachEvent("onload", h)
                }, n.closed = function () {
                }, n.pos = n.layout.pos, kInteractive.openFrame(n), kInteractive.tinCan({
                    verb: "opened",
                    activity: "Questions: " + n.title
                }), void setTimeout(function () {
                    if (kInteractive.scorm) {
                        var e = {};
                        e.id = kInteractive.getScormId("question", n.title), e.description = "Opened question popup: " + n.title, e.learnerResponses = "Opened", e.type = "other", e.timestamp = new Date, kInteractive.scorm.setInteractions([e])
                    }
                    kInteractive.events && kInteractive.events.add({
                        action: "questionPopup",
                        param: n.title,
                        elem: f,
                        data: n
                    })
                }, 800)
            }
            if (!kInteractive.hasClass(t, "kInteractive")) {
                if (kInteractive.hasClass(t, "questions-next")) {
                    var s = f.qIndex ? f.qIndex : 0;
                    if (++s < 0) return;
                    if (s >= n.q.length) return;
                    var c = (L = f.getElementsByClassName("qContainer")[0]).children[0];
                    if (n.options.strictNav) if (!(H = kInteractive.questions.f.assess(c, n.q[s - 1], n)).correct) return void kInteractive.questions.f.showExp(n.userDict, c, n.q[s - 1]);
                    f.getElementsByClassName("btnContainer")[0];
                    return L.innerHTML = "", L.appendChild(kInteractive.questions.f.createQElem(n, {
                        index: s,
                        elem: f,
                        rendered: !0
                    })), c && (f.questions || (f.questions = []), f.questions.push(c)), kInteractive.questions.f.showNavBtns(s, f, {
                        userDict: i,
                        qsData: n
                    }), void (f.qIndex = s)
                }
                if (kInteractive.hasClass(t, "questions-prev")) {
                    if (!f.questions) return;
                    if (!f.questions.length) return;
                    s = f.qIndex ? f.qIndex : 0;
                    return s--, (L = f.getElementsByClassName("qContainer")[0]).innerHTML = "", L.appendChild(f.questions.pop()), kInteractive.questions.f.showNavBtns(s, f, {
                        userDict: i,
                        qsData: n
                    }), void (f.qIndex = s)
                }
                if (kInteractive.hasClass(t, "questions-clear")) {
                    for (var l = f.getElementsByClassName("ans"), d = [], u = 0; u < l.length; u++) l[u].checked = !1, l[u].value = null, kInteractive.c.removeClass(l[u].parentNode, "correct"), kInteractive.c.removeClass(l[u], "incorrect"), kInteractive.c.hasClass(l[u].parentNode, "dCategory") && d.push(l[u]);
                    for (u = 0; u < d.length; u++) d[u].parentNode.parentNode.parentNode.getElementsByClassName("ki-dd-answers")[0].appendChild(d[u]);
                    var m = f.getElementsByClassName("explanation");
                    for (u = m.length; u--;) m[u].parentNode.removeChild(m[u]);
                    var p = f.getElementsByClassName("reference");
                    for (u = p.length; u--;) p[u].parentNode.removeChild(p[u]);
                    document[f.id] = null
                } else {
                    if (kInteractive.hasClass(t, "questions-notebook")) {
                        var v, h = n.layout && n.layout.popup && kInteractive.hasClass(f, "inpopup");
                        if ("undefined" == typeof isKotobee && !h) return void kInteractive.alert({
                            content: a.kotobeeOnly,
                            title: i.sorry ? i.sorry : "Sorry"
                        });
                        var y = {elem: f};
                        if ("undefined" != typeof isKotobee) v = angular.element(document.body).scope(); else {
                            try {
                                v = window.parent.getGlobal()
                            } catch (e) {
                                return void kInteractive.alert({
                                    content: a.kotobeeOnly,
                                    title: i.sorry ? i.sorry : "Sorry"
                                })
                            }
                            y.rootIndex = f.getAttribute("data-loc"), y.root = f
                        }
                        return kInteractive.c.addClass(t, "busy"), void v.questionsAddToNotebookShortcut(y, function () {
                            kInteractive.c.removeClass(t, "busy"), kInteractive.alert({content: i.savedToNotebook ? i.savedToNotebook : "Saved to notebook!"})
                        })
                    }
                    if (kInteractive.hasClass(t, "questions-preserve")) return document[f.id] || (document[f.id] = {}), void (document[f.id].preserve = t.checked);
                    if (kInteractive.hasClass(t, "questions-submit")) {
                        var b = "Untitled questions", I = f.getElementsByTagName("h4");
                        I.length && (b = I[0].textContent || I[0].data);
                        var C, E = 0, w = "", N = 0, x = 0, A = [];
                        if ("slides" == n.options.displayMode) {
                            C = f.questions.slice(0);
                            var L = f.getElementsByClassName("qContainer")[0];
                            C.push(L.children[0])
                        } else C = f.getElementsByClassName("ques");
                        var T = C.length;
                        for (u = 0; u < C.length; u++) if (!kInteractive.hasClass(C[u], "sp")) {
                            var q = 0 < (l = C[u].getElementsByClassName("ans")).length, R = n.q[u];
                            if (n.options.randomize && (R = n.q[Number(C[u].getAttribute("data-o"))]), R.q || (R.q = ""), R.q = R.q.replace(/<html.*<body>(.*?)<\/body><\/html>/g, "$1"), kInteractive.scorm && n.options && n.options.answerOnce && kInteractive.scorm.interactionExists(kInteractive.getScormId(f.id + "-" + (u + 1), R.q))) {
                                var B = "<p style='text-align:center'>" + (i.alreadySubmitted ? i.alreadySubmitted : "This test has already been submitted!") + "</p>";
                                return void kInteractive.alert({content: B})
                            }
                            var M = {}, S = l[0].getAttribute("id");
                            A.push(M), M.id = kInteractive.getScormId(f.id + "-" + (u + 1), R.q), M.qid = f.id, 0 <= S.indexOf("ki-tf-") ? M.type = "true-false" : 0 <= S.indexOf("ki-mcq-") || S.indexOf("ki-mmcq-") ? M.type = "choice" : 0 <= S.indexOf("ki-dd-") ? M.type = "drag-drop" : 0 <= S.indexOf("ki-sa-") && (M.type = "short-answer"), M.objective = n.options ? n.options.objective : null, M.timestamp = kInteractive.timestamp, M.latency = Math.round(((new Date).getTime() - kInteractive.timestamp.getTime()) / 1e3), M.description = R.q;
                            var H, D = [];
                            (H = kInteractive.questions.f.assess(C[u], R, n)).correctResponses && (M.correctResponses = H.correctResponses), H.learnerResponses && (M.learnerResponses = H.learnerResponses), D = (D = H.ddInteractionOb) || [];
                            q = H.correct;
                            if (D.length) for (var O = 0; O < D.length; O++) M.correctResponses && (M.correctResponses += "; "), M.learnerResponses && (M.learnerResponses += "; "), M.correctResponses += D[O].correct, M.learnerResponses += D[O].learner;
                            M.result = 0, null != R.weight && (N += R.weight, q && (x += R.weight, M.result = R.weight)), M.scoreMax = n.options ? Number(n.options.totalScore) : null, kInteractive.questions.f.showExp(n.userDict, C[u], R);
                            var F = i.question ? i.question.replace("[no]", u + 1) : "Question " + (u + 1);
                            q ? (w += "<span style='border-bottom: dotted 1px #aaa;' title='" + R.q.replace(/'/g, "&#39;") + "'>" + F + ".</span>  <span style='color:#366c20'>" + i.correct + "</span><br/>", E++) : w += "<span style='border-bottom: dotted 1px #aaa;' title='" + R.q.replace(/'/g, "&#39;") + "'>" + F + ".</span>  <span style='color:#7a1818'>" + i.incorrect + "</span><br/>"
                        }
                        for (u = 0; u < A.length; u++) A[u].weighting = Math.round(1e3 * n.options.totalScore / N) / 1e3;

                        function z() {
                            var e = "Questions: " + b + ". Score: " + E + " questions out of " + T;
                            e += ". Action: " + P, "selfAnswerReport" == P && (e += ". Details: " + w), kInteractive.tinCan({
                                verb: "solved",
                                activity: e
                            })
                        }

                        var K, P = n.action;
                        if (n.options.totalScore && N && (K = Math.round(10 * n.options.totalScore * x / N) / 10), "selfAnswer" == P || "selfAnswerReport" == P) {
                            var U = "";
                            "ar" == n.options.language && (U = ' direction="rtl"');
                            B = "";
                            if (i.scoreWeight) {
                                if (null != K) {
                                    var W = "";
                                    n.options.passScore && (K >= n.options.passScore || K == n.options.totalScore ? W += i.pass : W += i.fail), W && (W += ". "), B += "<h3" + U + ">" + (W || "") + i.scoreWeight.replace("[score]", K).replace("[total]", n.options.totalScore) + "</h3>"
                                }
                                B += "<p" + U + ">" + i.score.replace("[correct]", E).replace("[total]", T) + "</p>"
                            } else B = "You scored " + E + " question(s) out of " + T;
                            "selfAnswerReport" == P && (B = "<p" + U + "><strong>" + B + "</strong></p><p><strong>" + (i.details ? i.details : "Details") + "</strong></p><p class='kbAlertScroll'>" + w + "</p>"), kInteractive.alert({content: B}), z()
                        }
                        if ("email" == P || n.options.reportEmail || n.options.emailForm) {
                            var j = "selfAnswer" != P && "selfAnswerReport" != P && "email" != P;
                            try {
                                if (!config.kotobee.cloudid) return void (j && kInteractive.alert({
                                    content: a.cloudOnly,
                                    title: i.sorry ? i.sorry : "Sorry"
                                }))
                            } catch (e) {
                                return void (j && kInteractive.alert({
                                    content: a.cloudOnly,
                                    title: i.sorry ? i.sorry : "Sorry"
                                }))
                            }
                            var _ = {};
                            _.ans = new Array;
                            for (var V = 0; V < C.length; V++) for (l = C[V].getElementsByClassName("ans"), u = 0; u < l.length; u++) l[u].checked && _.ans.push({
                                q: V,
                                index: u,
                                label: l[u].nextSibling.textContent || l[u].nextSibling.data
                            });
                            _.title = b;
                            var Q = {};
                            if (Q.recipient = n.address, n.options.reportEmail && (Q.recipient = n.options.reportEmail), Q.content = JSON.stringify(_), Q.mode = config.kotobee.mode, Q.cloudid = config.kotobee.cloudid, Q.email = config.kotobee.email ? config.kotobee.email : angular.element(document.body).scope().data.user.email, n.options.emailForm) {
                                var J = document.getElementsByName("recipientEmail");
                                J.length && (Q.recipient = Q.recipient ? Q.recipient + "," + J[0].value : J[0].value)
                            }
                            var Y = t.value;
                            t.value = i.submitting ? i.submitting : "Submitting ..", t.setAttribute("disabled", "true");
                            var G = new XMLHttpRequest;
                            G.onreadystatechange = function () {
                                try {
                                    if (4 === G.readyState && 200 === G.status) {
                                        if (t.value = Y, t.removeAttribute("disabled"), !j) return;
                                        JSON.parse(G.responseText).success ? kInteractive.alert({content: i.submitted ? i.submitted : "Answers submitted!"}) : kInteractive.alert({content: i.errorSubmitting ? i.errorSubmitting : "An error has occurred while sending answers to the server"})
                                    }
                                } catch (e) {
                                    if (t.value = Y, t.setAttribute("value", t.value), t.removeAttribute("disabled"), !j) return;
                                    kInteractive.alert({content: i.errorSubmitting ? i.errorSubmitting : "An error has occurred while sending answers to the server"})
                                }
                            };
                            var $ = config.kotobee.liburl ? config.kotobee.liburl : "http://www.kotobee.com/";
                            $ += "library/report/questions", G.open("POST", $), G.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            var X = "a=a";
                            for (var Z in Q) {
                                var ee;
                                null != (ee = Q[Z]) && "object" != typeof ee && ("string" == typeof ee && (ee = encodeURIComponent(ee)), "boolean" == typeof ee && (ee = ee ? 1 : 0), X += "&" + Z + "=" + ee)
                            }
                            G.send(X), z()
                        }
                        document[f.id] || (document[f.id] = {}), document[f.id].q = [];
                        var te = f.getElementsByClassName("ques");
                        for (V = 0; V < te.length; V++) {
                            var ne = V;
                            n.options.randomize && (ne = Number(te[V].getAttribute("data-o"))), document[f.id].q[ne] = [];
                            var ae = te[V].getElementsByClassName("ans");
                            for (u = 0; u < ae.length; u++) kInteractive.hasClass(ae[u], "txtfield") ? document[f.id].q[ne][u] = ae[u].value : ae[u].type && "checkbox" == ae[u].type.toLowerCase() ? document[f.id].q[ne][u] = ae[u].checked : ae[u].type && "radio" == ae[u].type.toLowerCase() ? document[f.id].q[ne][u] = ae[u].checked : kInteractive.c.hasClass(ae[u].parentNode, "dCategory") && (document[f.id].q[ne][u] = {
                                id: ae[u].id,
                                category: kInteractive.getChildIndex(ae[u].parentNode)
                            })
                        }
                        setTimeout(function () {
                            kInteractive.scorm && kInteractive.scorm.setInteractions(A), kInteractive.events && kInteractive.events.add({
                                action: "questionsSubmitted",
                                param: b,
                                elem: f,
                                data: n
                            })
                        }, 500)
                    }
                }
            }
        }
    }, f: {
        showExp: function (e, t, n) {
            if (n.exp && !t.getElementsByClassName("explanation").length) {
                var a = document.createElement("p");
                a.className = "explanation", a.innerHTML = kInteractive.escapeHtml(n.exp), kInteractive.appendAfterDelay(t, a)
            }
            if (n.ref && !t.getElementsByClassName("reference").length) {
                var i = document.createElement("a");
                i.className = "reference", i.innerHTML = e.learnMode ? e.learnMode : "Learn more", i.setAttribute("href", kInteractive.escapeHtml(n.ref)), i.setAttribute("target", "_blank"), kInteractive.appendAfterDelay(t, i)
            }
        }, createQElem: function (e, t) {
            var n = (t = t || {}).index, a = t.elem, i = t.rendered, r = this.getQId(a), o = e.q[n],
                s = document.createElement("div");
            s.className = "ques", null != o.origin && s.setAttribute("data-o", o.origin), o.q || (o.q = "");
            "undefined" != typeof config && config.v;
            var c = e.options.numbering;
            "sp" == o.type && (c = !1), o.q = o.q.replace(/<html.*<body>(.*?)<\/body><\/html>/g, "$1");
            try {
                s.innerHTML = "<div class='questionTxt'><strong>" + (c ? "<span class='no'>" + (n + 1) + "</span>" : "") + "</strong> " + o.q + "</div>"
            } catch (e) {
                s.innerHTML = "<div class='questionTxt'><strong>" + (c ? "<span class='no'>" + (n + 1) + "</span>" : "") + kInteractive.escapeHtml(" " + o.q) + "</strong></div>"
            }
            if (o.path) {
                var l, d = document.createElement("img");
                l = i ? "undefined" == typeof isKotobee ? o.path : ph.join(kInteractive.absoluteURL, o.path) : o.path, d.src = kInteractive.cleanURL(l), d.className = typeof isKotobee, s.appendChild(d)
            }
            if (s.classList.add(o.type), "sp" == o.type && (o.topBorder && kInteractive.c.addClass(s, "topBorder"), o.bottomBorder && kInteractive.c.addClass(s, "bottomBorder"), kInteractive.c.addClass(s, "separator")), "sa" == o.type) {
                var u = o.lines ? o.lines : 1, m = document.createElement(1 < u ? "textarea" : "input"),
                    p = "ki-sa-" + r + "-" + n;
                m.id = p, m.name = "sa-" + r + "-" + n, 1 == u ? m.type = "text" : m.rows = o.lines ? o.lines : 1, m.className = "ki-textfield ans txtfield", document[item.id] && document[item.id].preserve && document[item.id].q && document[item.id].q[n] && (m.value = document[item.id].q[n]), s.appendChild(m)
            } else if ("mcq" == o.type || "mmcq" == o.type) for (var v = o.c, h = 0; h < v.length; h++) {
                p = "ki-mcq-" + r + "-" + n + "-" + h;
                var f = document.createElement("input");
                f.id = p, "mmcq" == o.type ? (f.name = "name", f.type = "checkbox") : (f.name = "mcq-" + r + "-" + n, f.type = "radio"), f.className = "ki-inputbox ans", (k = document.createElement("label")).htmlFor = p, k.innerHTML = " " + kInteractive.escapeHtml(v[h].t), k.className = "ki-noHighlight", (y = document.createElement("div")).className = "answer", document[item.id] && document[item.id].preserve && document[item.id].q && document[item.id].q[n] && (f.checked = document[item.id].q[n][h], e.options && e.options.highlightCorrect && o.c[h].a && kInteractive.c.addClass(y, "correct")), y.appendChild(f), y.appendChild(k), s.appendChild(y)
            } else if ("tf" == o.type) for (h = 0; h < 2; h++) {
                p = "ki-tf-" + r + "-" + n + "-" + h;
                var k, g = document.createElement("input");
                g.type = "radio", g.className = "ki-inputbox ans", g.id = p, g.name = "tf-" + r + "-" + n, (k = document.createElement("label")).htmlFor = p, o.choice1 && o.choice2 ? k.innerHTML = kInteractive.escapeHtml(" " + (0 == h ? o.choice1 : o.choice2)) : k.innerHTML = " " + (0 == h ? "True" : "False"), k.className = "ki-noHighlight";
                var y = document.createElement("div");
                document[item.id] && document[item.id].preserve && document[item.id].q && document[item.id].q[n] && (g.checked = document[item.id].q[n][h], e.options && e.options.highlightCorrect && (0 == h && o.a || 1 == h && !o.a) && kInteractive.c.addClass(y, "correct")), y.appendChild(g), y.appendChild(k), s.appendChild(y)
            } else if ("dd" == o.type) {
                var b = document.createElement("div");
                b.className = "categoryContainer";
                var I = [];
                for (h = 0; h < o.k.length; h++) {
                    var C = o.k[h], E = h, w = document.createElement("div");
                    w.className = "dCategory ki-noHighlight ki-dd-category-" + E, w.setAttribute("ondragover", "kInteractive.allowDrop(event)"), w.setAttribute("ondrop", "kInteractive.drop(event)");
                    var N = document.createElement("div");
                    N.innerHTML = C.category.name, N.className = "qTitle", w.appendChild(N);
                    for (var x = 0; x < C.category.answers.length; x++) I.push(C.category.answers[x].t);
                    b.appendChild(w)
                }
                s.appendChild(b);
                var A = document.createElement("div");
                A.className = "ki-dd-clearfix", s.appendChild(A);
                var L = document.createElement("div");
                L.setAttribute("ondragover", "kInteractive.allowDrop(event)"), L.setAttribute("ondrop", "kInteractive.drop(event)"), L.className = "ki-dd-answers ki-noHighlight";
                var T = [];
                for (h = 0; h < I.length; h++) {
                    E = h, y = I[h];
                    var q = document.createElement("div");
                    p = "ki-dd-" + r + "-" + n + "-" + E;
                    q.id = p, q.innerHTML = "<span></span>", q.children[0].innerText = y, q.className = "ki-draggable ans ki-noHighlight", q.draggable = !0, q.setAttribute("ondragstart", "kInteractive.drag(event)"), T.push(q)
                }
                kInteractive.shuffleArray(T);
                for (h = 0; h < T.length; h++) L.appendChild(T[h]);
                s.appendChild(L)
            }
            var R = document.createElement("p");
            return R.className = "separator", s.appendChild(R), document[item.id] && document[item.id].preserve && document[item.id].q && document[item.id].q[n] && kInteractive.questions.f.showExp(e.userDict, s, o), s
        }, getQId: function (e) {
            return Number(e.id.replace("ki-qs-", ""))
        }, createSubmitBtn: function (e, t) {
            var n = this.getQId(t), a = document.createElement("input"), i = "ki-" + n + "-btn";
            return a.type = "submit", a.value = e.submit ? e.submit : "Submit Answers", a.id = i, a.className = "btn ki-btn questions-submit", "undefined" == typeof isKotobee && a.addEventListener("click", kInteractive.actionEvent), a
        }, createClearBtn: function (e) {
            var t = document.createElement("input");
            return t.type = "submit", t.value = e.clear ? e.clear : "Clear Answers", t.className = "btn ki-btn ki-questions questions-clear", "undefined" == typeof isKotobee && t.addEventListener("click", kInteractive.actionEvent), t
        }, createAddToNotebookBtn: function (e) {
            var t = document.createElement("input");
            return t.type = "submit", t.value = e.notebook ? e.notebook : "Save to Notebook", t.className = "btn ki-btn ki-questions questions-notebook", "undefined" == typeof isKotobee && t.addEventListener("click", kInteractive.actionEvent), t
        }, createPreserveBtn: function (e, t) {
            var n = this.getQId(t), a = document.createElement("div");
            a.style.marginTop = "5px";
            var i = document.createElement("input");
            i.type = "checkbox", i.name = "preserveAnswers", i.className = "ki-btn ki-questions questions-preserve", i.id = "ki-" + n + "-preserveAnswersBtn", document[item.id] && (i.checked = document[item.id].preserve), a.appendChild(i);
            var r = document.createElement("label");
            return r.htmlFor = i.id, r.innerHTML = " " + (e.preserve ? e.preserve : "Preserve submitted answers"), r.className = "ki-noHighlight", a.appendChild(r), "undefined" == typeof isKotobee && i.addEventListener("change", kInteractive.actionEvent), a
        }, createNextBtn: function (e) {
            var t = document.createElement("input");
            return t.type = "submit", t.value = e.next ? e.next : "Next", t.className = "btn ki-btn ki-questions questions-next", "undefined" == typeof isKotobee && t.addEventListener("click", kInteractive.actionEvent), t
        }, createPrevBtn: function (e) {
            var t = document.createElement("input");
            return t.type = "submit", t.value = e.prev ? e.prev : "Previous", t.className = "btn ki-btn ki-questions questions-prev", "undefined" == typeof isKotobee && t.addEventListener("click", kInteractive.actionEvent), t
        }, createSeparator: function () {
            document.createElement("p").className = "separator"
        }, createEmailForm: function (e) {
            var o = document.createElement("div");
            return o.setAttribute("class", "emailForm"), function (e, t, n) {
                var a = document.createElement("div");
                a.className = "address", a.innerHTML = "<p><strong>" + e + "</strong><em>" + t + "</em></p>";
                var i = document.createElement("input");
                i.name = n, i.type = "text", i.className = "txtfield", a.appendChild(i);
                var r = document.createElement("p");
                r.className = "separator", a.appendChild(r), o.appendChild(a)
            }(e.recipientEmail ? e.recipientEmail : "Recipient email", e.separateEmails ? e.separateEmails : "Separate multiple emails with commas", "recipientEmail"), o
        }, showNavBtns: function (e, t, n) {
            var a;
            (a = (n = n || {}).isFrag ? t.lastElementChild : t.getElementsByClassName("btnContainer")[0]).innerHTML = "";
            var i = kInteractive.questions.f.createPrevBtn(n.userDict);
            a.appendChild(i), e <= 0 && i.classList.add("disabled");
            var r = kInteractive.questions.f.createNextBtn(n.userDict);
            if (a.appendChild(r), e >= n.qsData.q.length - 1 && r.classList.add("disabled"), e == n.qsData.q.length - 1) {
                var o = kInteractive.questions.f.createSubmitBtn(n.userDict, t);
                o.classList.add("shift"), a.appendChild(o)
            }
        }, assess: function (e, t, n) {
            for (var a = {ddInteractionOb: []}, i = e.getElementsByClassName("ans"), r = 0 < i.length, o = 0; o < i.length; o++) if (0 <= i[o].getAttribute("id").indexOf("ki-tf-")) 0 == o && t.a ? a.correctResponses = t.choice1 : 1 != o || t.a || (a.correctResponses = t.choice2), i[o].checked ? (a.learnerResponses = o ? t.choice2 : t.choice1, 0 != o || t.a ? 1 == o && t.a && (r = !1) : r = !1) : 0 == o && t.a ? r = !1 : 1 != o || t.a || (r = !1), n.options && n.options.highlightCorrect && (0 == o && t.a || 1 == o && !t.a) && kInteractive.c.addClass(i[o].parentNode, "correct"); else if (0 <= i[o].getAttribute("id").indexOf("ki-sa-")) {
                var s = i[o].value.toLowerCase();
                s = s && s.trim(), r = !0;
                for (var c = "", l = 0; l < t.k.length; l++) {
                    var d = t.k[l].t;
                    if (!d) {
                        r = !1;
                        break
                    }
                    c && (c += "+"), c += d = d.toLowerCase();
                    for (var u = d.split(","), m = !1, p = 0; p < u.length; p++) if (0 <= s.indexOf(u[p].trim())) {
                        m = !0;
                        break
                    }
                    if (!m) {
                        r = !1;
                        break
                    }
                }
                a.correctResponses = c, a.learnerResponses = s
            } else if (0 <= i[o].getAttribute("id").indexOf("ki-dd-")) {
                kInteractive.c.removeClass(i[o], "incorrect");
                for (var v, h = i[o].id.split("-")[4], f = 0, k = 0; k < t.k.length; k++) {
                    if (h < (f += t.k[k].category.answers.length)) {
                        v = k;
                        break
                    }
                }
                var g = e.getElementsByClassName("dCategory")[v], y = {};
                if (y.correct = i[o].innerText + " -> " + g.children[0].innerText, kInteractive.c.hasClass(i[o].parentNode, "ki-dd-answers")) kInteractive.c.addClass(i[o], "incorrect"), r = !1, y.learner = i[o].innerText + " unassigned"; else {
                    var b = i[o].parentNode, I = b.children[0].innerText, C = kInteractive.getChildIndex(b);
                    y.learner = i[o].innerText + " -> " + I, C != v && n.options && n.options.highlightCorrect && (r = !1, kInteractive.c.addClass(i[o], "incorrect"))
                }
                a.ddInteractionOb.push(y)
            } else t.c[o].a && (a.correctResponses = t.c[o].t), i[o].checked && (a.learnerResponses = t.c[o].t), i[o].checked && !t.c[o].a ? r = !1 : !i[o].checked && t.c[o].a && (r = !1), n.options && n.options.highlightCorrect && t.c[o].a && kInteractive.c.addClass(i[o].parentNode, "correct");
            return a.correct = r, a
        }
    }
}, kInteractive.threed = {
    preRender: function (e, t) {
    }, postRender: function (e, t, n, a) {
        var i = e.createDocumentFragment(), r = kInteractive.readData(t);
        if (r) {
            t.innerHTML = "";
            var o = t.getAttribute("style");
            if (r.inter.placeholderPath) {
                var s = "undefined" == typeof isKotobee ? r.inter.placeholderPath : ph.join(kInteractive.absoluteURL, r.inter.placeholderPath);
                o += "background-image:url('" + (s = kInteractive.cleanURL(s)) + "');"
            }
            t.setAttribute("style", o);
            var c = document.createElement("a");
            r.inter.includeMsg ? (c.innerHTML = kInteractive.escapeHtml(r.inter.msg), c.className = "msgBtn ki-btn") : c.className = "invisibleBtn ki-btn", i.appendChild(c), "undefined" == typeof isKotobee && c && c.addEventListener("click", kInteractive.actionEvent), t.appendChild(i)
        }
    }, action: function (f, e, t) {
        var k = kInteractive.readData(f);
        if (k) {
            "inPanel" == k.inter.target ? kInteractive.c.addClass(f, "running") : f.innerHTML = "";
            var g = document.createElement("div");
            if (g.className = "loading", f.appendChild(g), "undefined" == typeof THREE) {
                var n, a = document.getElementsByTagName("head")[0], i = a.getElementsByTagName("script");
                if ("undefined" != typeof isKotobee) n = bookPath + "EPUB/js/kotobeeInteractive3D.js"; else for (var r = 0; r < i.length; r++) if (0 <= i[r].src.indexOf("kotobeeinteractive.js")) {
                    n = i[r].src.replace("kotobeeinteractive.js", "kotobeeinteractive3D.js");
                    break
                }
                if (!n) return;
                var o = document.createElement("script");
                o.type = "text/javascript", o.src = n, o.onload = s, o.onreadystatechange = function () {
                    "complete" == this.readyState && s()
                }, a.appendChild(o)
            } else s()
        }

        function s() {
            var h, e = f;
            if ("inPanel" == k.inter.target) {
                var t = {
                    class: "threed", cb: function (e) {
                        var t = document.createElement("div");
                        t.className = "container", e.appendChild(t), n(t)
                    }, closed: function () {
                        kInteractive.c.removeClass(f, "running")
                    }
                };
                kInteractive.openFrame(t)
            } else n(e);

            function n(t) {
                var n;
                setTimeout(function () {
                    if (kInteractive.scorm) {
                        var e = {};
                        e.id = kInteractive.getScormId("_3D", k.name ? k.name : "Model"), e.description = "Opened 3D model: " + (k.name ? k.name : "No name"), e.learnerResponses = "Viewed", e.type = "other", e.timestamp = new Date, kInteractive.scorm.setInteractions([e])
                    }
                    kInteractive.events && kInteractive.events.add({
                        action: "3dModelViewed",
                        param: k.name ? k.name : "No name",
                        elem: f,
                        data: k
                    })
                }, 800), h && cancelAnimationFrame(h), n = function () {
                    try {
                        var e = document.createElement("canvas");
                        return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
                    } catch (e) {
                        return !1
                    }
                }() ? new THREE.WebGLRenderer({precision: "highp"}) : new THREE.CanvasRenderer;
                var e = t.offsetWidth, a = t.offsetHeight,
                    i = new THREE.PerspectiveCamera(k.camera.viewAngle, e / a, k.camera.near, k.camera.far),
                    c = new THREE.Scene;
                null != k.scene.bgColor && n.setClearColor(k.scene.bgColor, 1), c.add(i), i.position.x = k.camera.x, i.position.y = k.camera.y, i.position.z = k.camera.z, n.setSize(e, a), k.scene.floor && (floor = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 1, 1), new THREE.MeshPhongMaterial({color: k.scene.floorColor ? k.scene.floorColor : 10066329})), floor.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2)), floor.position.y = -80, floor.receiveShadow = !0, c.add(floor));
                var l = new THREE.LoadingManager;
                l.onProgress = function (e, t, n) {
                }, function r(o) {
                    if (!(o >= k.objects.length)) {
                        var s = k.objects[o],
                            e = "undefined" == typeof isKotobee ? s.path : ph.join(kInteractive.absoluteURL, s.path);
                        e = cleanURL(e), new THREE.OBJLoader(l).load(e, function (i) {
                            g && g.parentNode && g.parentNode.removeChild(g), n.domElement.parentNode || t.appendChild(n.domElement), i.position.set(s.x, s.y, s.z), i.traverse(function (n) {
                                if (n instanceof THREE.Mesh) {
                                    var a = n == i.children[i.children.length - 1];
                                    if (s.textPath) {
                                        var e = new THREE.ImageLoader(l),
                                            t = "undefined" == typeof isKotobee ? s.textPath : ph.join(kInteractive.absoluteURL, s.textPath);
                                        e.load(t, function (e) {
                                            var t = new THREE.Texture;
                                            t.image = e, t.needsUpdate = !0, n.material.map = t, a && c.add(i), r(++o)
                                        }, function () {
                                        }, function (e) {
                                        })
                                    } else a && c.add(i), r(++o)
                                }
                            })
                        }, function (e) {
                            e.lengthComputable && (e.loaded, e.total)
                        }, function (e) {
                        })
                    }
                }(0), new THREE.OrbitControls(i, n.domElement).target = new THREE.Vector3(0, 0, 0);
                for (var r = 0; r < k.lights.length; r++) if ("pointLight" == k.lights[r].type) {
                    var o = new THREE.PointLight(k.lights[r].color);
                    o.position.set(k.lights[r].x, k.lights[r].y, k.lights[r].z), c.add(o)
                } else if ("directionalLight" == k.lights[r].type) {
                    var s = new THREE.DirectionalLight(k.lights[r].color, k.lights[r].intensity);
                    s.position.set(k.lights[r].x, k.lights[r].y, k.lights[r].z), c.add(s)
                } else if ("hemisphereLight" == k.lights[r].type) {
                    var d = new THREE.HemisphereLight(k.lights[r].sky, k.lights[r].ground, k.lights[r].intensity);
                    d.position.set(k.lights[r].x, k.lights[r].y, k.lights[r].z), c.add(d)
                } else if ("spotLight" == k.lights[r].type) {
                    var u = new THREE.SpotLight(k.lights[r].color, k.lights[r].intensity, k.lights[r].distance, k.lights[r].angle, k.lights[r].exponent, k.lights[r].decay);
                    u.position.set(k.lights[r].x, k.lights[r].y, k.lights[r].z), c.add(u)
                } else if ("ambientLight" == k.lights[r].type) {
                    var m = new THREE.AmbientLight(k.lights[r].color);
                    c.add(m)
                } else if ("areaLight" == k.lights[r].type) {
                    var p = new THREE.AreaLight(k.lights[r].color, k.lights[r].intensity);
                    c.add(p)
                }
                var v = new THREE.Clock;
                !function e() {
                    try {
                        n.render(c, i)
                    } catch (e) {
                        return
                    }
                    v.getDelta();
                    h = requestAnimFrame(e)
                }()
            }
        }
    }
}, kInteractive.video = {
    preRender: function (e, t) {
    }, postRender: function (e, t, n) {
        var a = e.createDocumentFragment(), i = kInteractive.readData(t);
        if (i) {
            var r = "";
            if (i.splash && (r = "undefined" == typeof isKotobee ? i.splash : ph.join(kInteractive.absoluteURL, i.splash)), r) {
                t.style.backgroundImage = null;
                var o = t.style.cssText;
                r = kInteractive.cleanURL(r), t.setAttribute("style", "background-image:url('" + r + "');" + o)
            }
            t.setAttribute("id", "ki-video-" + n), t.innerHTML = "";
            var s = document.createElement("div");
            s.setAttribute("id", "ki-video-" + n + "-container"), s.className = "container";
            var c = document.createElement("div");
            i.style && kInteractive.c.addClass(c, i.style);
            var l = document.createElement("a");
            l.className = "playBtn ki-btn", l.appendChild(document.createElement("span")), "undefined" == typeof isKotobee && l.addEventListener("click", kInteractive.actionEvent), a.appendChild(l), a.appendChild(s), c.appendChild(a), t.appendChild(c), i.autoplay && kInteractive.action(t)
        }
    }, action: function (r) {
        var o = kInteractive.readData(r);
        if (o) {
            if (o.popup && "kInteractiveFrame" != r.parentNode.id) {
                var e = {
                    pos: "side", aspectRatio: "16:9", cb: function (e) {
                        var t = document.createElement("div");
                        t.innerHTML = r.outerHTML;
                        var n = t.children[0];
                        n.style.width = "100%", n.style.height = "100%", n.style.margin = "0", n.style.position = "absolute", n.style.left = 0, n.style.top = 0, kInteractive.c.removeClass(n, "kbHidden"), e.appendChild(n);
                        var a = r.id.split("ki-video-")[1];
                        kInteractive.postRender(document, n, a), setTimeout(function () {
                            kInteractive.action(n)
                        }, 100)
                    }
                };
                return kInteractive.openFrame(e)
            }
            var t = r.getAttribute("id") + "-container", s = r.getElementsByClassName("playBtn")[0];
            if (!(0 <= s.className.indexOf("loading"))) {
                if (kInteractive.stopCurrentMedia(), s.className = "playBtn ki-btn loading", o.autoplay && (s.className = "playBtn ki-btn hide"), kInteractive.scorm) {
                    var n = {};
                    n.id = kInteractive.getScormId(r.getAttribute("id"), o.src), n.description = "Played video: " + o.src, n.type = "other", n.learnerResponses = "Played", n.objective = o.options ? o.options.objective : null, n.timestamp = new Date, kInteractive.scorm.setInteractions([n])
                }
                if (kInteractive.events && kInteractive.events.add({
                    action: "videoPlayed",
                    param: o.src,
                    elem: r,
                    data: o
                }), "file" == o.type) {
                    u("undefined" == typeof isKotobee ? o.video : ph.join(kInteractive.absoluteURL, o.video))
                } else {
                    var a, i = new URL(o.src);
                    if (i.origin.includes("youtube.com") || i.origin.includes("youtu.be")) {
                        if (!(a = i.origin.includes("youtube.com") ? i.searchParams.get("v") : i.pathname.split("/")[1])) return;
                        if (window && window.iBooks) return setTimeout(function () {
                            s.className = "playBtn ki-btn"
                        }, 1500), void (window.location.href = o.src);
                        var c = {
                            videoId: a, playerVars: {autoplay: 1, rel: "0"}, events: {
                                onReady: function () {
                                }, onStateChange: function (e) {
                                    e.data == YT.PlayerState.PLAYING && kInteractive.tinCan({
                                        verb: "played",
                                        activity: "Video: " + o.src
                                    })
                                }
                            }
                        };
                        if (kInteractive.youTubeStatus) if ("loading" == kInteractive.youTubeStatus) {
                            if (kInteractive.vQueue) return;
                            kInteractive.vQueue = function () {
                                s.className = "playBtn ki-btn hide", new YT.Player(t, c)
                            }
                        } else "ready" == kInteractive.youTubeStatus && (s.className = "playBtn ki-btn hide", new YT.Player(t, c)); else {
                            window.onYouTubePlayerAPIReady = function () {
                                kInteractive.youTubeStatus = "ready", kInteractive.vQueue(), kInteractive.vQueue = null
                            };
                            var l = document.createElement("script");
                            l.src = "https://www.youtube.com/player_api";
                            var d = document.getElementsByTagName("script")[0];
                            d.parentNode.insertBefore(l, d), kInteractive.youTubeStatus = "loading", kInteractive.vQueue = function () {
                                s.className = "playBtn ki-btn hide", new YT.Player(t, c)
                            }
                        }
                    } else u(o.src)
                }
                kInteractive.currentVideo = r, kInteractive.c.addClass(kInteractive.currentVideo, "playing")
            }
        }

        function u(e) {
            var t, n = document.createElement("video");
            n.setAttribute("width", "100%"), n.setAttribute("height", "100%"), n.setAttribute("src", kInteractive.cleanURL(e)), n.setAttribute("autoplay", "true"), n.setAttribute("data-tap-disabled", "false"), 0 != e.indexOf("http://") && 0 != e.indexOf("https://") || (t = !0), t && n.setAttribute("crossorigin", "anonymous");
            var a = !1;
            try {
                a = -1 < navigator.userAgent.toLowerCase().indexOf("android")
            } catch (e) {
            }
            a || n.setAttribute("type", "video/mp4"), n.setAttribute("webkit-playsinline", "true"), n.setAttribute("controls", "true"), n.className = "ki-noHighlight", o.hideDownloadBtn && (n.className += " hideDownloadBtn"), n.innerHTML = "Your browser doesn't support HTML5 video.", t && (n.crossOrigin = "anonymous"), n.oncanplay = function () {
                kInteractive.currentVideo == r && (s.className = "playBtn ki-btn hide", kInteractive.tinCan({
                    verb: "played",
                    activity: "Video: " + e
                }))
            }, n.addEventListener("error", function (e) {
                kInteractive.stopCurrentMedia()
            }), n.addEventListener("webkitfullscreenchange", function (e) {
                var t = null !== document.webkitFullscreenElement;
                kInteractive.videoIsFullscreen = t
            });
            var i = r.getElementsByClassName("container")[0];
            i.setAttribute("data-tap-disabled", "true"), i.appendChild(n)
        }
    }, resize: function (e) {
        var t = kInteractive.readData(e);
        t && (kInteractive.checkResponsiveFloat(t, e), t.maintainRatio && "px" == t.widthUnit && t.height && t.width && "absolute" != e.style.position && (e.style.height = e.offsetWidth * (t.height / t.width) + "px"))
    }
}, kInteractive.widget = {
    preRender: function (e, t) {
    }, postRender: function (e, t, n, a) {
        a = a || {};
        var i = e.createDocumentFragment(), r = kInteractive.readData(t);
        if (r) {
            var o = r.name, s = (r.src, r.width), c = r.height;
            if ("page" == r.mode) {
                if (t.children.length) return;
                var l = document.createElement("div");
                l.className = "cover", i.appendChild(l), r.interaction && (l.style.pointerEvents = "none");
                var d = document.createElement("div");
                d.className = "iframeContainer";
                var u = document.createElement("iframe");
                if (u.setAttribute("nwdisable", "true"), u.setAttribute("nwfaketop", "true"), u.setAttribute("sandbox", "allow-same-origin allow-scripts allow-forms allow-modals"), u.setAttribute("width", t.style.width ? t.style.width : s + r.widthUnit), u.setAttribute("height", t.style.height ? t.style.height : c + "px"), u.src = kInteractive.getWidgetUrl(r, a), "undefined" != typeof kotobee && -1 !== u.src.indexOf(".amazonaws.com")) {
                    var m = document.createElement("a");
                    m.href = u.src, u.addEventListener("load", function (e) {
                        e.target.contentWindow.postMessage({
                            user: {
                                name: kotobee.user.name ? kotobee.user.name : "",
                                email: kotobee.user.email ? kotobee.user.email : "",
                                loggedIn: kotobee.user.loggedIn
                            },
                            book: kotobee.book.meta.dc.identifier,
                            chapter: kotobee.currentChapter.url.split("EPUB/xhtml/")[1]
                        }, m.protocol + "//" + m.hostname)
                    })
                }
                d.appendChild(u), i.appendChild(d);
                var p = t.style.width, v = t.style.height;
                0 <= p.indexOf("px") && (r.widthUnit = "px"), 0 <= p.indexOf("%") && (r.widthUnit = "%");
                try {
                    r.widthUnit ? r.width = Number(p.split(r.widthUnit)[0]) : r.width = Number(p)
                } catch (e) {
                    r.width = Number(p)
                }
                try {
                    r.height = Number(v.split("px")[0])
                } catch (e) {
                    r.height = Number(v)
                }
                kInteractive.writeData(t, r)
            } else {
                if (!t.children.length && !t.innerHTML.trim()) {
                    var h = document.createElement("img");
                    h.src = kInteractive.getWidgetHome(r, a) + "/" + o + "/Icon.png?c=" + Math.round(9999 * Math.random()), h.className = "wdgtIcon", i.appendChild(h)
                }
                "undefined" == typeof isKotobee && t.addEventListener("click", kInteractive.actionEvent)
            }
            t.appendChild(i)
        }
    }, action: function (t) {
        var n = kInteractive.readData(t);
        if (n) {
            var a = kInteractive.getWidgetUrl(n), i = document.createElement("iframe");
            i.setAttribute("nwdisable", "true"), i.setAttribute("nwfaketop", "true"), i.setAttribute("sandbox", "allow-same-origin allow-scripts allow-forms allow-modals"), n.cb = function (e) {
                i.src = a, e.appendChild(i)
            }, n.cb1 = "yes", n.closed = function () {
            }, n.responsive && (n.width = n.height = null), kInteractive.openFrame(n), kInteractive.tinCan({
                verb: "opened",
                activity: "Widget: " + n.name
            }), setTimeout(function () {
                if (kInteractive.scorm) {
                    var e = {};
                    e.id = kInteractive.getScormId("widget", n.name), e.description = "Opened popup widget: " + n.name, e.learnerResponses = "Opened", e.type = "other", e.timestamp = new Date, kInteractive.scorm.setInteractions([e])
                }
                kInteractive.events && kInteractive.events.add({
                    action: "popupWidgetOpened",
                    param: n.name,
                    elem: t,
                    data: n
                })
            }, 800)
        }
    }, resize: function (e) {
        var t = kInteractive.readData(e);
        if (t && "page" == t.mode && "px" == t.widthUnit) {
            var n = t.width, a = t.height, i = e.parentNode;
            if (i) if (n > i.offsetWidth) {
                var r = i.offsetWidth / n, o = e.children.length - 1;
                e.children[o].style.transform = e.children[o].style.webkitTransform = e.children[o].style.mozTransform = "scale(" + r + ")", e.children[o].style.transformOrigin = e.children[o].style.webkitTransformOrigin = e.children[o].style.mozTransformOrigin = "0 0", e.style.maxWidth = e.style.width, e.style.height = Math.round(a * r) + "px"
            } else {
                for (o = 0; o < e.children.length; o++) e.children[o].style.transform = e.children[o].style.webkitTransform = e.children[o].style.mozTransform = e.children[o].style.transformOrigin = e.children[o].style.webkitTransformOrigin = e.children[o].style.mozTransformOrigin = null;
                e.style.maxWidth = null, e.style.height = a + "px"
            }
        }
    }
};