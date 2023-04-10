(function(n) {
	"function" == typeof define && define.amd ? define(["jquery"], n) : n(jQuery)
})(function(n) {
	function b(n) {
		for (var t = n.css("visibility");
			"inherit" === t;) n = n.parent(), t = n.css("visibility");
		return "hidden" !== t
	}

	function k(n) {
		for (var t, i; n.length && n[0] !== document;) {
			if (t = n.css("position"), ("absolute" === t || "relative" === t || "fixed" === t) && (i = parseInt(n.css("zIndex"), 10), !isNaN(i) && 0 !== i)) return i;
			n = n.parent()
		}
		return 0
	}

	function c() {
		this._curInst = null;
		this._keyEvent = !1;
		this._disabledInputs = [];
		this._datepickerShowing = !1;
		this._inDialog = !1;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: !1,
			showMonthAfterYear: !1,
			yearSuffix: ""
		};
		this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: !1,
			hideIfNoPrevNext: !1,
			navigationAsDateFormat: !1,
			gotoCurrent: !1,
			changeMonth: !1,
			changeYear: !1,
			yearRange: "c-10:c+10",
			showOtherMonths: !1,
			selectOtherMonths: !1,
			showWeek: !1,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: !0,
			showButtonPanel: !1,
			autoSize: !1,
			disabled: !1
		};
		n.extend(this._defaults, this.regional[""]);
		this.regional.en = n.extend(!0, {}, this.regional[""]);
		this.regional["en-US"] = n.extend(!0, {}, this.regional.en);
		this.dpDiv = l(n("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>"))
	}

	function l(t) {
		var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
		return t.on("mouseout", i, function() {
			n(this).removeClass("ui-state-hover"); - 1 !== this.className.indexOf("ui-datepicker-prev") && n(this).removeClass("ui-datepicker-prev-hover"); - 1 !== this.className.indexOf("ui-datepicker-next") && n(this).removeClass("ui-datepicker-next-hover")
		}).on("mouseover", i, a)
	}

	function a() {
		n.datepicker._isDisabledDatepicker(i.inline ? i.dpDiv.parent()[0] : i.input[0]) || (n(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), n(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && n(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && n(this).addClass("ui-datepicker-next-hover"))
	}

	function u(t, i) {
		n.extend(t, i);
		for (var r in i) null == i[r] && (t[r] = i[r]);
		return t
	}

	function t(n) {
		return function() {
			var t = this.element.val();
			n.apply(this, arguments);
			this._refresh();
			t !== this.element.val() && this._trigger("change")
		}
	}
	var v, o, r, f, y, i, w;
	n.ui = n.ui || {};
	n.ui.version = "1.12.1";
	v = 0;
	o = Array.prototype.slice;
	n.cleanData = function(t) {
		return function(i) {
			for (var r, u, f = 0; null != (u = i[f]); f++) try {
				r = n._data(u, "events");
				r && r.remove && n(u).triggerHandler("remove")
			} catch (e) {}
			t(i)
		}
	}(n.cleanData);
	n.widget = function(t, i, r) {
		var f, u, o, h = {},
			e = t.split(".")[0],
			s;
		return t = t.split(".")[1], s = e + "-" + t, r || (r = i, i = n.Widget), n.isArray(r) && (r = n.extend.apply(null, [{}].concat(r))), n.expr[":"][s.toLowerCase()] = function(t) {
			return !!n.data(t, s)
		}, n[e] = n[e] || {}, f = n[e][t], u = n[e][t] = function(n, t) {
			return this._createWidget ? (arguments.length && this._createWidget(n, t), void 0) : new u(n, t)
		}, n.extend(u, f, {
			version: r.version,
			_proto: n.extend({}, r),
			_childConstructors: []
		}), o = new i, o.options = n.widget.extend({}, o.options), n.each(r, function(t, r) {
			return n.isFunction(r) ? (h[t] = function() {
				function n() {
					return i.prototype[t].apply(this, arguments)
				}

				function u(n) {
					return i.prototype[t].apply(this, n)
				}
				return function() {
					var t, i = this._super,
						f = this._superApply;
					return this._super = n, this._superApply = u, t = r.apply(this, arguments), this._super = i, this._superApply = f, t
				}
			}(), void 0) : (h[t] = r, void 0)
		}), u.prototype = n.widget.extend(o, {
			widgetEventPrefix: f ? o.widgetEventPrefix || t : t
		}, h, {
			constructor: u,
			namespace: e,
			widgetName: t,
			widgetFullName: s
		}), f ? (n.each(f._childConstructors, function(t, i) {
			var r = i.prototype;
			n.widget(r.namespace + "." + r.widgetName, u, i._proto)
		}), delete f._childConstructors) : i._childConstructors.push(u), n.widget.bridge(t, u), u
	};
	n.widget.extend = function(t) {
		for (var i, r, f = o.call(arguments, 1), u = 0, e = f.length; e > u; u++)
			for (i in f[u]) r = f[u][i], f[u].hasOwnProperty(i) && void 0 !== r && (t[i] = n.isPlainObject(r) ? n.isPlainObject(t[i]) ? n.widget.extend({}, t[i], r) : n.widget.extend({}, r) : r);
		return t
	};
	n.widget.bridge = function(t, i) {
		var r = i.prototype.widgetFullName || t;
		n.fn[t] = function(u) {
			var s = "string" == typeof u,
				e = o.call(arguments, 1),
				f = this;
			return s ? this.length || "instance" !== u ? this.each(function() {
				var i, o = n.data(this, r);
				return "instance" === u ? (f = o, !1) : o ? n.isFunction(o[u]) && "_" !== u.charAt(0) ? (i = o[u].apply(o, e), i !== o && void 0 !== i ? (f = i && i.jquery ? f.pushStack(i.get()) : i, !1) : void 0) : n.error("no such method '" + u + "' for " + t + " widget instance") : n.error("cannot call methods on " + t + " prior to initialization; attempted to call method '" + u + "'")
			}) : f = void 0 : (e.length && (u = n.widget.extend.apply(null, [u].concat(e))), this.each(function() {
				var t = n.data(this, r);
				t ? (t.option(u || {}), t._init && t._init()) : n.data(this, r, new i(u, this))
			})), f
		}
	};
	n.Widget = function() {};
	n.Widget._childConstructors = [];
	n.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		defaultElement: "<div>",
		options: {
			classes: {},
			disabled: !1,
			create: null
		},
		_createWidget: function(t, i) {
			i = n(i || this.defaultElement || this)[0];
			this.element = n(i);
			this.uuid = v++;
			this.eventNamespace = "." + this.widgetName + this.uuid;
			this.bindings = n();
			this.hoverable = n();
			this.focusable = n();
			this.classesElementLookup = {};
			i !== this && (n.data(i, this.widgetFullName, this), this._on(!0, this.element, {
				remove: function(n) {
					n.target === i && this.destroy()
				}
			}), this.document = n(i.style ? i.ownerDocument : i.document || i), this.window = n(this.document[0].defaultView || this.document[0].parentWindow));
			this.options = n.widget.extend({}, this.options, this._getCreateOptions(), t);
			this._create();
			this.options.disabled && this._setOptionDisabled(this.options.disabled);
			this._trigger("create", null, this._getCreateEventData());
			this._init()
		},
		_getCreateOptions: function() {
			return {}
		},
		_getCreateEventData: n.noop,
		_create: n.noop,
		_init: n.noop,
		destroy: function() {
			var t = this;
			this._destroy();
			n.each(this.classesElementLookup, function(n, i) {
				t._removeClass(i, n)
			});
			this.element.off(this.eventNamespace).removeData(this.widgetFullName);
			this.widget().off(this.eventNamespace).removeAttr("aria-disabled");
			this.bindings.off(this.eventNamespace)
		},
		_destroy: n.noop,
		widget: function() {
			return this.element
		},
		option: function(t, i) {
			var r, u, f, e = t;
			if (0 === arguments.length) return n.widget.extend({}, this.options);
			if ("string" == typeof t)
				if (e = {}, r = t.split("."), t = r.shift(), r.length) {
					for (u = e[t] = n.widget.extend({}, this.options[t]), f = 0; r.length - 1 > f; f++) u[r[f]] = u[r[f]] || {}, u = u[r[f]];
					if (t = r.pop(), 1 === arguments.length) return void 0 === u[t] ? null : u[t];
					u[t] = i
				} else {
					if (1 === arguments.length) return void 0 === this.options[t] ? null : this.options[t];
					e[t] = i
				}
			return this._setOptions(e), this
		},
		_setOptions: function(n) {
			for (var t in n) this._setOption(t, n[t]);
			return this
		},
		_setOption: function(n, t) {
			return "classes" === n && this._setOptionClasses(t), this.options[n] = t, "disabled" === n && this._setOptionDisabled(t), this
		},
		_setOptionClasses: function(t) {
			var i, u, r;
			for (i in t) r = this.classesElementLookup[i], t[i] !== this.options.classes[i] && r && r.length && (u = n(r.get()), this._removeClass(r, i), u.addClass(this._classes({
				element: u,
				keys: i,
				classes: t,
				add: !0
			})))
		},
		_setOptionDisabled: function(n) {
			this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!n);
			n && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus"))
		},
		enable: function() {
			return this._setOptions({
				disabled: !1
			})
		},
		disable: function() {
			return this._setOptions({
				disabled: !0
			})
		},
		_classes: function(t) {
			function r(r, f) {
				for (var o, e = 0; r.length > e; e++) o = u.classesElementLookup[r[e]] || n(), o = t.add ? n(n.unique(o.get().concat(t.element.get()))) : n(o.not(t.element).get()), u.classesElementLookup[r[e]] = o, i.push(r[e]), f && t.classes[r[e]] && i.push(t.classes[r[e]])
			}
			var i = [],
				u = this;
			return t = n.extend({
				element: this.element,
				classes: this.options.classes || {}
			}, t), this._on(t.element, {
				remove: "_untrackClassesElement"
			}), t.keys && r(t.keys.match(/\S+/g) || [], !0), t.extra && r(t.extra.match(/\S+/g) || []), i.join(" ")
		},
		_untrackClassesElement: function(t) {
			var i = this;
			n.each(i.classesElementLookup, function(r, u) {
				-1 !== n.inArray(t.target, u) && (i.classesElementLookup[r] = n(u.not(t.target).get()))
			})
		},
		_removeClass: function(n, t, i) {
			return this._toggleClass(n, t, i, !1)
		},
		_addClass: function(n, t, i) {
			return this._toggleClass(n, t, i, !0)
		},
		_toggleClass: function(n, t, i, r) {
			r = "boolean" == typeof r ? r : i;
			var u = "string" == typeof n || null === n,
				f = {
					extra: u ? t : i,
					keys: u ? n : t,
					element: u ? this.element : n,
					add: r
				};
			return f.element.toggleClass(this._classes(f), r), this
		},
		_on: function(t, i, r) {
			var f, u = this;
			"boolean" != typeof t && (r = i, i = t, t = !1);
			r ? (i = f = n(i), this.bindings = this.bindings.add(i)) : (r = i, i = this.element, f = this.widget());
			n.each(r, function(r, e) {
				function o() {
					if (t || u.options.disabled !== !0 && !n(this).hasClass("ui-state-disabled")) return ("string" == typeof e ? u[e] : e).apply(u, arguments)
				}
				"string" != typeof e && (o.guid = e.guid = e.guid || o.guid || n.guid++);
				var s = r.match(/^([\w:-]*)\s*(.*)$/),
					h = s[1] + u.eventNamespace,
					c = s[2];
				c ? f.on(h, c, o) : i.on(h, o)
			})
		},
		_off: function(t, i) {
			i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
			t.off(i).off(i);
			this.bindings = n(this.bindings.not(t).get());
			this.focusable = n(this.focusable.not(t).get());
			this.hoverable = n(this.hoverable.not(t).get())
		},
		_delay: function(n, t) {
			function r() {
				return ("string" == typeof n ? i[n] : n).apply(i, arguments)
			}
			var i = this;
			return setTimeout(r, t || 0)
		},
		_hoverable: function(t) {
			this.hoverable = this.hoverable.add(t);
			this._on(t, {
				mouseenter: function(t) {
					this._addClass(n(t.currentTarget), null, "ui-state-hover")
				},
				mouseleave: function(t) {
					this._removeClass(n(t.currentTarget), null, "ui-state-hover")
				}
			})
		},
		_focusable: function(t) {
			this.focusable = this.focusable.add(t);
			this._on(t, {
				focusin: function(t) {
					this._addClass(n(t.currentTarget), null, "ui-state-focus")
				},
				focusout: function(t) {
					this._removeClass(n(t.currentTarget), null, "ui-state-focus")
				}
			})
		},
		_trigger: function(t, i, r) {
			var u, f, e = this.options[t];
			if (r = r || {}, i = n.Event(i), i.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), i.target = this.element[0], f = i.originalEvent)
				for (u in f) u in i || (i[u] = f[u]);
			return this.element.trigger(i, r), !(n.isFunction(e) && e.apply(this.element[0], [i].concat(r)) === !1 || i.isDefaultPrevented())
		}
	};
	n.each({
		show: "fadeIn",
		hide: "fadeOut"
	}, function(t, i) {
		n.Widget.prototype["_" + t] = function(r, u, f) {
			"string" == typeof u && (u = {
				effect: u
			});
			var o, e = u ? u === !0 || "number" == typeof u ? i : u.effect || i : t;
			u = u || {};
			"number" == typeof u && (u = {
				duration: u
			});
			o = !n.isEmptyObject(u);
			u.complete = f;
			u.delay && r.delay(u.delay);
			o && n.effects && n.effects.effect[e] ? r[t](u) : e !== t && r[e] ? r[e](u.duration, u.easing, f) : r.queue(function(i) {
				n(this)[t]();
				f && f.call(r[0]);
				i()
			})
		}
	});
	n.widget,
		function() {
			function f(n, t, i) {
				return [parseFloat(n[0]) * (c.test(n[0]) ? t / 100 : 1), parseFloat(n[1]) * (c.test(n[1]) ? i / 100 : 1)]
			}

			function i(t, i) {
				return parseInt(n.css(t, i), 10) || 0
			}

			function l(t) {
				var i = t[0];
				return 9 === i.nodeType ? {
					width: t.width(),
					height: t.height(),
					offset: {
						top: 0,
						left: 0
					}
				} : n.isWindow(i) ? {
					width: t.width(),
					height: t.height(),
					offset: {
						top: t.scrollTop(),
						left: t.scrollLeft()
					}
				} : i.preventDefault ? {
					width: 0,
					height: 0,
					offset: {
						top: i.pageY,
						left: i.pageX
					}
				} : {
					width: t.outerWidth(),
					height: t.outerHeight(),
					offset: t.offset()
				}
			}
			var u, r = Math.max,
				t = Math.abs,
				e = /left|center|right/,
				o = /top|center|bottom/,
				s = /[\+\-]\d+(\.[\d]+)?%?/,
				h = /^\w+/,
				c = /%$/,
				a = n.fn.position;
			n.position = {
				scrollbarWidth: function() {
					if (void 0 !== u) return u;
					var r, i, t = n("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'><\/div><\/div>"),
						f = t.children()[0];
					return n("body").append(t), r = f.offsetWidth, t.css("overflow", "scroll"), i = f.offsetWidth, r === i && (i = t[0].clientWidth), t.remove(), u = r - i
				},
				getScrollInfo: function(t) {
					var i = t.isWindow || t.isDocument ? "" : t.element.css("overflow-x"),
						r = t.isWindow || t.isDocument ? "" : t.element.css("overflow-y"),
						u = "scroll" === i || "auto" === i && t.width < t.element[0].scrollWidth,
						f = "scroll" === r || "auto" === r && t.height < t.element[0].scrollHeight;
					return {
						width: f ? n.position.scrollbarWidth() : 0,
						height: u ? n.position.scrollbarWidth() : 0
					}
				},
				getWithinInfo: function(t) {
					var i = n(t || window),
						r = n.isWindow(i[0]),
						u = !!i[0] && 9 === i[0].nodeType,
						f = !r && !u;
					return {
						element: i,
						isWindow: r,
						isDocument: u,
						offset: f ? n(t).offset() : {
							left: 0,
							top: 0
						},
						scrollLeft: i.scrollLeft(),
						scrollTop: i.scrollTop(),
						width: i.outerWidth(),
						height: i.outerHeight()
					}
				}
			};
			n.fn.position = function(u) {
				if (!u || !u.of) return a.apply(this, arguments);
				u = n.extend({}, u);
				var w, c, v, p, y, k, d = n(u.of),
					nt = n.position.getWithinInfo(u.within),
					tt = n.position.getScrollInfo(nt),
					b = (u.collision || "flip").split(" "),
					g = {};
				return k = l(d), d[0].preventDefault && (u.at = "left top"), c = k.width, v = k.height, p = k.offset, y = n.extend({}, p), n.each(["my", "at"], function() {
					var t, i, n = (u[this] || "").split(" ");
					1 === n.length && (n = e.test(n[0]) ? n.concat(["center"]) : o.test(n[0]) ? ["center"].concat(n) : ["center", "center"]);
					n[0] = e.test(n[0]) ? n[0] : "center";
					n[1] = o.test(n[1]) ? n[1] : "center";
					t = s.exec(n[0]);
					i = s.exec(n[1]);
					g[this] = [t ? t[0] : 0, i ? i[0] : 0];
					u[this] = [h.exec(n[0])[0], h.exec(n[1])[0]]
				}), 1 === b.length && (b[1] = b[0]), "right" === u.at[0] ? y.left += c : "center" === u.at[0] && (y.left += c / 2), "bottom" === u.at[1] ? y.top += v : "center" === u.at[1] && (y.top += v / 2), w = f(g.at, c, v), y.left += w[0], y.top += w[1], this.each(function() {
					var a, k, o = n(this),
						s = o.outerWidth(),
						h = o.outerHeight(),
						it = i(this, "marginLeft"),
						rt = i(this, "marginTop"),
						ut = s + it + i(this, "marginRight") + tt.width,
						ft = h + rt + i(this, "marginBottom") + tt.height,
						e = n.extend({}, y),
						l = f(g.my, o.outerWidth(), o.outerHeight());
					"right" === u.my[0] ? e.left -= s : "center" === u.my[0] && (e.left -= s / 2);
					"bottom" === u.my[1] ? e.top -= h : "center" === u.my[1] && (e.top -= h / 2);
					e.left += l[0];
					e.top += l[1];
					a = {
						marginLeft: it,
						marginTop: rt
					};
					n.each(["left", "top"], function(t, i) {
						n.ui.position[b[t]] && n.ui.position[b[t]][i](e, {
							targetWidth: c,
							targetHeight: v,
							elemWidth: s,
							elemHeight: h,
							collisionPosition: a,
							collisionWidth: ut,
							collisionHeight: ft,
							offset: [w[0] + l[0], w[1] + l[1]],
							my: u.my,
							at: u.at,
							within: nt,
							elem: o
						})
					});
					u.using && (k = function(n) {
						var i = p.left - e.left,
							a = i + c - s,
							f = p.top - e.top,
							y = f + v - h,
							l = {
								target: {
									element: d,
									left: p.left,
									top: p.top,
									width: c,
									height: v
								},
								element: {
									element: o,
									left: e.left,
									top: e.top,
									width: s,
									height: h
								},
								horizontal: 0 > a ? "left" : i > 0 ? "right" : "center",
								vertical: 0 > y ? "top" : f > 0 ? "bottom" : "middle"
							};
						s > c && c > t(i + a) && (l.horizontal = "center");
						h > v && v > t(f + y) && (l.vertical = "middle");
						l.important = r(t(i), t(a)) > r(t(f), t(y)) ? "horizontal" : "vertical";
						u.using.call(this, n, l)
					});
					o.offset(n.extend(e, {
						using: k
					}))
				})
			};
			n.ui.position = {
				fit: {
					left: function(n, t) {
						var h, e = t.within,
							u = e.isWindow ? e.scrollLeft : e.offset.left,
							o = e.width,
							s = n.left - t.collisionPosition.marginLeft,
							i = u - s,
							f = s + t.collisionWidth - o - u;
						t.collisionWidth > o ? i > 0 && 0 >= f ? (h = n.left + i + t.collisionWidth - o - u, n.left += i - h) : n.left = f > 0 && 0 >= i ? u : i > f ? u + o - t.collisionWidth : u : i > 0 ? n.left += i : f > 0 ? n.left -= f : n.left = r(n.left - s, n.left)
					},
					top: function(n, t) {
						var h, o = t.within,
							u = o.isWindow ? o.scrollTop : o.offset.top,
							e = t.within.height,
							s = n.top - t.collisionPosition.marginTop,
							i = u - s,
							f = s + t.collisionHeight - e - u;
						t.collisionHeight > e ? i > 0 && 0 >= f ? (h = n.top + i + t.collisionHeight - e - u, n.top += i - h) : n.top = f > 0 && 0 >= i ? u : i > f ? u + e - t.collisionHeight : u : i > 0 ? n.top += i : f > 0 ? n.top -= f : n.top = r(n.top - s, n.top)
					}
				},
				flip: {
					left: function(n, i) {
						var o, s, r = i.within,
							y = r.offset.left + r.scrollLeft,
							c = r.width,
							h = r.isWindow ? r.scrollLeft : r.offset.left,
							l = n.left - i.collisionPosition.marginLeft,
							a = l - h,
							v = l + i.collisionWidth - c - h,
							u = "left" === i.my[0] ? -i.elemWidth : "right" === i.my[0] ? i.elemWidth : 0,
							f = "left" === i.at[0] ? i.targetWidth : "right" === i.at[0] ? -i.targetWidth : 0,
							e = -2 * i.offset[0];
						0 > a ? (o = n.left + u + f + e + i.collisionWidth - c - y, (0 > o || t(a) > o) && (n.left += u + f + e)) : v > 0 && (s = n.left - i.collisionPosition.marginLeft + u + f + e - h, (s > 0 || v > t(s)) && (n.left += u + f + e))
					},
					top: function(n, i) {
						var o, s, r = i.within,
							y = r.offset.top + r.scrollTop,
							c = r.height,
							h = r.isWindow ? r.scrollTop : r.offset.top,
							l = n.top - i.collisionPosition.marginTop,
							a = l - h,
							v = l + i.collisionHeight - c - h,
							p = "top" === i.my[1],
							u = p ? -i.elemHeight : "bottom" === i.my[1] ? i.elemHeight : 0,
							f = "top" === i.at[1] ? i.targetHeight : "bottom" === i.at[1] ? -i.targetHeight : 0,
							e = -2 * i.offset[1];
						0 > a ? (s = n.top + u + f + e + i.collisionHeight - c - y, (0 > s || t(a) > s) && (n.top += u + f + e)) : v > 0 && (o = n.top - i.collisionPosition.marginTop + u + f + e - h, (o > 0 || v > t(o)) && (n.top += u + f + e))
					}
				},
				flipfit: {
					left: function() {
						n.ui.position.flip.left.apply(this, arguments);
						n.ui.position.fit.left.apply(this, arguments)
					},
					top: function() {
						n.ui.position.flip.top.apply(this, arguments);
						n.ui.position.fit.top.apply(this, arguments)
					}
				}
			}
		}();
	n.ui.position;
	n.extend(n.expr[":"], {
		data: n.expr.createPseudo ? n.expr.createPseudo(function(t) {
			return function(i) {
				return !!n.data(i, t)
			}
		}) : function(t, i, r) {
			return !!n.data(t, r[3])
		}
	});
	n.fn.extend({
		disableSelection: function() {
			var n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";
			return function() {
				return this.on(n + ".ui-disableSelection", function(n) {
					n.preventDefault()
				})
			}
		}(),
		enableSelection: function() {
			return this.off(".ui-disableSelection")
		}
	});
	n.ui.focusable = function(t, i) {
		var u, f, e, r, o, s = t.nodeName.toLowerCase();
		return "area" === s ? (u = t.parentNode, f = u.name, t.href && f && "map" === u.nodeName.toLowerCase() ? (e = n("img[usemap='#" + f + "']"), e.length > 0 && e.is(":visible")) : !1) : (/^(input|select|textarea|button|object)$/.test(s) ? (r = !t.disabled, r && (o = n(t).closest("fieldset")[0], o && (r = !o.disabled))) : r = "a" === s ? t.href || i : i, r && n(t).is(":visible") && b(n(t)))
	};
	n.extend(n.expr[":"], {
		focusable: function(t) {
			return n.ui.focusable(t, null != n.attr(t, "tabindex"))
		}
	});
	n.ui.focusable;
	n.fn.form = function() {
		return "string" == typeof this[0].form ? this.closest("form") : n(this[0].form)
	};
	n.ui.formResetMixin = {
		_formResetHandler: function() {
			var t = n(this);
			setTimeout(function() {
				var i = t.data("ui-form-reset-instances");
				n.each(i, function() {
					this.refresh()
				})
			})
		},
		_bindFormResetHandler: function() {
			if (this.form = this.element.form(), this.form.length) {
				var n = this.form.data("ui-form-reset-instances") || [];
				n.length || this.form.on("reset.ui-form-reset", this._formResetHandler);
				n.push(this);
				this.form.data("ui-form-reset-instances", n)
			}
		},
		_unbindFormResetHandler: function() {
			if (this.form.length) {
				var t = this.form.data("ui-form-reset-instances");
				t.splice(n.inArray(this, t), 1);
				t.length ? this.form.data("ui-form-reset-instances", t) : this.form.removeData("ui-form-reset-instances").off("reset.ui-form-reset")
			}
		}
	};
	"1.7" === n.fn.jquery.substring(0, 3) && (n.each(["Width", "Height"], function(t, i) {
		function r(t, i, r, u) {
			return n.each(e, function() {
				i -= parseFloat(n.css(t, "padding" + this)) || 0;
				r && (i -= parseFloat(n.css(t, "border" + this + "Width")) || 0);
				u && (i -= parseFloat(n.css(t, "margin" + this)) || 0)
			}), i
		}
		var e = "Width" === i ? ["Left", "Right"] : ["Top", "Bottom"],
			u = i.toLowerCase(),
			f = {
				innerWidth: n.fn.innerWidth,
				innerHeight: n.fn.innerHeight,
				outerWidth: n.fn.outerWidth,
				outerHeight: n.fn.outerHeight
			};
		n.fn["inner" + i] = function(t) {
			return void 0 === t ? f["inner" + i].call(this) : this.each(function() {
				n(this).css(u, r(this, t) + "px")
			})
		};
		n.fn["outer" + i] = function(t, e) {
			return "number" != typeof t ? f["outer" + i].call(this, t) : this.each(function() {
				n(this).css(u, r(this, t, !0, e) + "px")
			})
		}
	}), n.fn.addBack = function(n) {
		return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
	});
	n.ui.keyCode = {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	};
	n.ui.escapeSelector = function() {
		var n = /([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g;
		return function(t) {
			return t.replace(n, "\\$1")
		}
	}();
	n.fn.labels = function() {
		var t, r, u, i, f;
		return this[0].labels && this[0].labels.length ? this.pushStack(this[0].labels) : (i = this.eq(0).parents("label"), u = this.attr("id"), u && (t = this.eq(0).parents().last(), f = t.add(t.length ? t.siblings() : this.siblings()), r = "label[for='" + n.ui.escapeSelector(u) + "']", i = i.add(f.find(r).addBack(r))), this.pushStack(i))
	};
	n.fn.scrollParent = function(t) {
		var i = this.css("position"),
			u = "absolute" === i,
			f = t ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			r = this.parents().filter(function() {
				var t = n(this);
				return u && "static" === t.css("position") ? !1 : f.test(t.css("overflow") + t.css("overflow-y") + t.css("overflow-x"))
			}).eq(0);
		return "fixed" !== i && r.length ? r : n(this[0].ownerDocument || document)
	};
	n.extend(n.expr[":"], {
		tabbable: function(t) {
			var i = n.attr(t, "tabindex"),
				r = null != i;
			return (!r || i >= 0) && n.ui.focusable(t, r)
		}
	});
	n.fn.extend({
		uniqueId: function() {
			var n = 0;
			return function() {
				return this.each(function() {
					this.id || (this.id = "ui-id-" + ++n)
				})
			}
		}(),
		removeUniqueId: function() {
			return this.each(function() {
				/^ui-id-\d+$/.test(this.id) && n(this).removeAttr("id")
			})
		}
	});
	n.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
	r = !1;
	n(document).on("mouseup", function() {
		r = !1
	});
	n.widget("ui.mouse", {
		version: "1.12.1",
		options: {
			cancel: "input, textarea, button, select, option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function() {
			var t = this;
			this.element.on("mousedown." + this.widgetName, function(n) {
				return t._mouseDown(n)
			}).on("click." + this.widgetName, function(i) {
				if (!0 === n.data(i.target, t.widgetName + ".preventClickEvent")) return (n.removeData(i.target, t.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1)
			});
			this.started = !1
		},
		_mouseDestroy: function() {
			this.element.off("." + this.widgetName);
			this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate)
		},
		_mouseDown: function(t) {
			if (!r) {
				this._mouseMoved = !1;
				this._mouseStarted && this._mouseUp(t);
				this._mouseDownEvent = t;
				var i = this,
					u = 1 === t.which,
					f = "string" == typeof this.options.cancel && t.target.nodeName ? n(t.target).closest(this.options.cancel).length : !1;
				return u && !f && this._mouseCapture(t) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
					i.mouseDelayMet = !0
				}, this.options.delay)), this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(t) !== !1, !this._mouseStarted) ? (t.preventDefault(), !0) : (!0 === n.data(t.target, this.widgetName + ".preventClickEvent") && n.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(n) {
					return i._mouseMove(n)
				}, this._mouseUpDelegate = function(n) {
					return i._mouseUp(n)
				}, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), r = !0, !0)) : !0
			}
		},
		_mouseMove: function(t) {
			if (this._mouseMoved) {
				if (n.ui.ie && (!document.documentMode || 9 > document.documentMode) && !t.button) return this._mouseUp(t);
				if (!t.which)
					if (t.originalEvent.altKey || t.originalEvent.ctrlKey || t.originalEvent.metaKey || t.originalEvent.shiftKey) this.ignoreMissingWhich = !0;
					else if (!this.ignoreMissingWhich) return this._mouseUp(t)
			}
			return (t.which || t.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
		},
		_mouseUp: function(t) {
			this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate);
			this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && n.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t));
			this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer);
			this.ignoreMissingWhich = !1;
			r = !1;
			t.preventDefault()
		},
		_mouseDistanceMet: function(n) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - n.pageX), Math.abs(this._mouseDownEvent.pageY - n.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function() {
			return this.mouseDelayMet
		},
		_mouseStart: function() {},
		_mouseDrag: function() {},
		_mouseStop: function() {},
		_mouseCapture: function() {
			return !0
		}
	});
	n.ui.plugin = {
		add: function(t, i, r) {
			var u, f = n.ui[t].prototype;
			for (u in r) f.plugins[u] = f.plugins[u] || [], f.plugins[u].push([i, r[u]])
		},
		call: function(n, t, i, r) {
			var u, f = n.plugins[t];
			if (f && (r || n.element[0].parentNode && 11 !== n.element[0].parentNode.nodeType))
				for (u = 0; f.length > u; u++) n.options[f[u][0]] && f[u][1].apply(n.element, i)
		}
	};
	n.ui.safeActiveElement = function(n) {
		var t;
		try {
			t = n.activeElement
		} catch (i) {
			t = n.body
		}
		return t || (t = n.body), t.nodeName || (t = n.body), t
	};
	n.ui.safeBlur = function(t) {
		t && "body" !== t.nodeName.toLowerCase() && n(t).trigger("blur")
	};
	n.widget("ui.draggable", n.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "drag",
		options: {
			addClasses: !0,
			appendTo: "parent",
			axis: !1,
			connectToSortable: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			iframeFix: !1,
			opacity: !1,
			refreshPositions: !1,
			revert: !1,
			revertDuration: 500,
			scope: "default",
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			snap: !1,
			snapMode: "both",
			snapTolerance: 20,
			stack: !1,
			zIndex: !1,
			drag: null,
			start: null,
			stop: null
		},
		_create: function() {
			"original" === this.options.helper && this._setPositionRelative();
			this.options.addClasses && this._addClass("ui-draggable");
			this._setHandleClassName();
			this._mouseInit()
		},
		_setOption: function(n, t) {
			this._super(n, t);
			"handle" === n && (this._removeHandleClassName(), this._setHandleClassName())
		},
		_destroy: function() {
			return (this.helper || this.element).is(".ui-draggable-dragging") ? (this.destroyOnClear = !0, void 0) : (this._removeHandleClassName(), this._mouseDestroy(), void 0)
		},
		_mouseCapture: function(t) {
			var i = this.options;
			return this.helper || i.disabled || n(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (this._blurActiveElement(t), this._blockFrames(i.iframeFix === !0 ? "iframe" : i.iframeFix), !0) : !1)
		},
		_blockFrames: function(t) {
			this.iframeBlocks = this.document.find(t).map(function() {
				var t = n(this);
				return n("<div>").css("position", "absolute").appendTo(t.parent()).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).offset(t.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_blurActiveElement: function(t) {
			var i = n.ui.safeActiveElement(this.document[0]),
				r = n(t.target);
			r.closest(i).length || n.ui.safeBlur(i)
		},
		_mouseStart: function(t) {
			var i = this.options;
			return this.helper = this._createHelper(t), this._addClass(this.helper, "ui-draggable-dragging"), this._cacheHelperProportions(), n.ui.ddmanager && (n.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(!0), this.offsetParent = this.helper.offsetParent(), this.hasFixedAncestor = this.helper.parents().filter(function() {
				return "fixed" === n(this).css("position")
			}).length > 0, this.positionAbs = this.element.offset(), this._refreshOffsets(t), this.originalPosition = this.position = this._generatePosition(t, !1), this.originalPageX = t.pageX, this.originalPageY = t.pageY, i.cursorAt && this._adjustOffsetFromHelper(i.cursorAt), this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), n.ui.ddmanager && n.ui.ddmanager.dragStart(this, t), !0)
		},
		_refreshOffsets: function(n) {
			this.offset = {
				top: this.positionAbs.top - this.margins.top,
				left: this.positionAbs.left - this.margins.left,
				scroll: !1,
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			};
			this.offset.click = {
				left: n.pageX - this.offset.left,
				top: n.pageY - this.offset.top
			}
		},
		_mouseDrag: function(t, i) {
			if (this.hasFixedAncestor && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(t, !0), this.positionAbs = this._convertPositionTo("absolute"), !i) {
				var r = this._uiHash();
				if (this._trigger("drag", t, r) === !1) return this._mouseUp(new n.Event("mouseup", t)), !1;
				this.position = r.position
			}
			return this.helper[0].style.left = this.position.left + "px", this.helper[0].style.top = this.position.top + "px", n.ui.ddmanager && n.ui.ddmanager.drag(this, t), !1
		},
		_mouseStop: function(t) {
			var r = this,
				i = !1;
			return n.ui.ddmanager && !this.options.dropBehaviour && (i = n.ui.ddmanager.drop(this, t)), this.dropped && (i = this.dropped, this.dropped = !1), "invalid" === this.options.revert && !i || "valid" === this.options.revert && i || this.options.revert === !0 || n.isFunction(this.options.revert) && this.options.revert.call(this.element, i) ? n(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				r._trigger("stop", t) !== !1 && r._clear()
			}) : this._trigger("stop", t) !== !1 && this._clear(), !1
		},
		_mouseUp: function(t) {
			return this._unblockFrames(), n.ui.ddmanager && n.ui.ddmanager.dragStop(this, t), this.handleElement.is(t.target) && this.element.trigger("focus"), n.ui.mouse.prototype._mouseUp.call(this, t)
		},
		cancel: function() {
			return this.helper.is(".ui-draggable-dragging") ? this._mouseUp(new n.Event("mouseup", {
				target: this.element[0]
			})) : this._clear(), this
		},
		_getHandle: function(t) {
			return this.options.handle ? !!n(t.target).closest(this.element.find(this.options.handle)).length : !0
		},
		_setHandleClassName: function() {
			this.handleElement = this.options.handle ? this.element.find(this.options.handle) : this.element;
			this._addClass(this.handleElement, "ui-draggable-handle")
		},
		_removeHandleClassName: function() {
			this._removeClass(this.handleElement, "ui-draggable-handle")
		},
		_createHelper: function(t) {
			var r = this.options,
				u = n.isFunction(r.helper),
				i = u ? n(r.helper.apply(this.element[0], [t])) : "clone" === r.helper ? this.element.clone().removeAttr("id") : this.element;
			return i.parents("body").length || i.appendTo("parent" === r.appendTo ? this.element[0].parentNode : r.appendTo), u && i[0] === this.element[0] && this._setPositionRelative(), i[0] === this.element[0] || /(fixed|absolute)/.test(i.css("position")) || i.css("position", "absolute"), i
		},
		_setPositionRelative: function() {
			/^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative")
		},
		_adjustOffsetFromHelper: function(t) {
			"string" == typeof t && (t = t.split(" "));
			n.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			});
			"left" in t && (this.offset.click.left = t.left + this.margins.left);
			"right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
			"top" in t && (this.offset.click.top = t.top + this.margins.top);
			"bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_isRootNode: function(n) {
			return /(html|body)/i.test(n.tagName) || n === this.document[0]
		},
		_getParentOffset: function() {
			var t = this.offsetParent.offset(),
				i = this.document[0];
			return "absolute" === this.cssPosition && this.scrollParent[0] !== i && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), this._isRootNode(this.offsetParent[0]) && (t = {
				top: 0,
				left: 0
			}), {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" !== this.cssPosition) return {
				top: 0,
				left: 0
			};
			var n = this.element.position(),
				t = this._isRootNode(this.scrollParent[0]);
			return {
				top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + (t ? 0 : this.scrollParent.scrollTop()),
				left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + (t ? 0 : this.scrollParent.scrollLeft())
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.element.css("marginLeft"), 10) || 0,
				top: parseInt(this.element.css("marginTop"), 10) || 0,
				right: parseInt(this.element.css("marginRight"), 10) || 0,
				bottom: parseInt(this.element.css("marginBottom"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var f, t, i, r = this.options,
				u = this.document[0];
			return this.relativeContainer = null, r.containment ? "window" === r.containment ? (this.containment = [n(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, n(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, n(window).scrollLeft() + n(window).width() - this.helperProportions.width - this.margins.left, n(window).scrollTop() + (n(window).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === r.containment ? (this.containment = [0, 0, n(u).width() - this.helperProportions.width - this.margins.left, (n(u).height() || u.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : r.containment.constructor === Array ? (this.containment = r.containment, void 0) : ("parent" === r.containment && (r.containment = this.helper[0].parentNode), t = n(r.containment), i = t[0], i && (f = /(scroll|auto)/.test(t.css("overflow")), this.containment = [(parseInt(t.css("borderLeftWidth"), 10) || 0) + (parseInt(t.css("paddingLeft"), 10) || 0), (parseInt(t.css("borderTopWidth"), 10) || 0) + (parseInt(t.css("paddingTop"), 10) || 0), (f ? Math.max(i.scrollWidth, i.offsetWidth) : i.offsetWidth) - (parseInt(t.css("borderRightWidth"), 10) || 0) - (parseInt(t.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(i.scrollHeight, i.offsetHeight) : i.offsetHeight) - (parseInt(t.css("borderBottomWidth"), 10) || 0) - (parseInt(t.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relativeContainer = t), void 0) : (this.containment = null, void 0)
		},
		_convertPositionTo: function(n, t) {
			t || (t = this.position);
			var i = "absolute" === n ? 1 : -1,
				r = this._isRootNode(this.scrollParent[0]);
			return {
				top: t.top + this.offset.relative.top * i + this.offset.parent.top * i - ("fixed" === this.cssPosition ? -this.offset.scroll.top : r ? 0 : this.offset.scroll.top) * i,
				left: t.left + this.offset.relative.left * i + this.offset.parent.left * i - ("fixed" === this.cssPosition ? -this.offset.scroll.left : r ? 0 : this.offset.scroll.left) * i
			}
		},
		_generatePosition: function(n, t) {
			var i, s, u, f, r = this.options,
				h = this._isRootNode(this.scrollParent[0]),
				e = n.pageX,
				o = n.pageY;
			return h && this.offset.scroll || (this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			}), t && (this.containment && (this.relativeContainer ? (s = this.relativeContainer.offset(), i = [this.containment[0] + s.left, this.containment[1] + s.top, this.containment[2] + s.left, this.containment[3] + s.top]) : i = this.containment, n.pageX - this.offset.click.left < i[0] && (e = i[0] + this.offset.click.left), n.pageY - this.offset.click.top < i[1] && (o = i[1] + this.offset.click.top), n.pageX - this.offset.click.left > i[2] && (e = i[2] + this.offset.click.left), n.pageY - this.offset.click.top > i[3] && (o = i[3] + this.offset.click.top)), r.grid && (u = r.grid[1] ? this.originalPageY + Math.round((o - this.originalPageY) / r.grid[1]) * r.grid[1] : this.originalPageY, o = i ? u - this.offset.click.top >= i[1] || u - this.offset.click.top > i[3] ? u : u - this.offset.click.top >= i[1] ? u - r.grid[1] : u + r.grid[1] : u, f = r.grid[0] ? this.originalPageX + Math.round((e - this.originalPageX) / r.grid[0]) * r.grid[0] : this.originalPageX, e = i ? f - this.offset.click.left >= i[0] || f - this.offset.click.left > i[2] ? f : f - this.offset.click.left >= i[0] ? f - r.grid[0] : f + r.grid[0] : f), "y" === r.axis && (e = this.originalPageX), "x" === r.axis && (o = this.originalPageY)), {
				top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.offset.scroll.top : h ? 0 : this.offset.scroll.top),
				left: e - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.offset.scroll.left : h ? 0 : this.offset.scroll.left)
			}
		},
		_clear: function() {
			this._removeClass(this.helper, "ui-draggable-dragging");
			this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove();
			this.helper = null;
			this.cancelHelperRemoval = !1;
			this.destroyOnClear && this.destroy()
		},
		_trigger: function(t, i, r) {
			return r = r || this._uiHash(), n.ui.plugin.call(this, t, [i, r, this], !0), /^(drag|start|stop)/.test(t) && (this.positionAbs = this._convertPositionTo("absolute"), r.offset = this.positionAbs), n.Widget.prototype._trigger.call(this, t, i, r)
		},
		plugins: {},
		_uiHash: function() {
			return {
				helper: this.helper,
				position: this.position,
				originalPosition: this.originalPosition,
				offset: this.positionAbs
			}
		}
	});
	n.ui.plugin.add("draggable", "connectToSortable", {
		start: function(t, i, r) {
			var u = n.extend({}, i, {
				item: r.element
			});
			r.sortables = [];
			n(r.options.connectToSortable).each(function() {
				var i = n(this).sortable("instance");
				i && !i.options.disabled && (r.sortables.push(i), i.refreshPositions(), i._trigger("activate", t, u))
			})
		},
		stop: function(t, i, r) {
			var u = n.extend({}, i, {
				item: r.element
			});
			r.cancelHelperRemoval = !1;
			n.each(r.sortables, function() {
				var n = this;
				n.isOver ? (n.isOver = 0, r.cancelHelperRemoval = !0, n.cancelHelperRemoval = !1, n._storedCSS = {
					position: n.placeholder.css("position"),
					top: n.placeholder.css("top"),
					left: n.placeholder.css("left")
				}, n._mouseStop(t), n.options.helper = n.options._helper) : (n.cancelHelperRemoval = !0, n._trigger("deactivate", t, u))
			})
		},
		drag: function(t, i, r) {
			n.each(r.sortables, function() {
				var f = !1,
					u = this;
				u.positionAbs = r.positionAbs;
				u.helperProportions = r.helperProportions;
				u.offset.click = r.offset.click;
				u._intersectsWith(u.containerCache) && (f = !0, n.each(r.sortables, function() {
					return this.positionAbs = r.positionAbs, this.helperProportions = r.helperProportions, this.offset.click = r.offset.click, this !== u && this._intersectsWith(this.containerCache) && n.contains(u.element[0], this.element[0]) && (f = !1), f
				}));
				f ? (u.isOver || (u.isOver = 1, r._parent = i.helper.parent(), u.currentItem = i.helper.appendTo(u.element).data("ui-sortable-item", !0), u.options._helper = u.options.helper, u.options.helper = function() {
					return i.helper[0]
				}, t.target = u.currentItem[0], u._mouseCapture(t, !0), u._mouseStart(t, !0, !0), u.offset.click.top = r.offset.click.top, u.offset.click.left = r.offset.click.left, u.offset.parent.left -= r.offset.parent.left - u.offset.parent.left, u.offset.parent.top -= r.offset.parent.top - u.offset.parent.top, r._trigger("toSortable", t), r.dropped = u.element, n.each(r.sortables, function() {
					this.refreshPositions()
				}), r.currentItem = r.element, u.fromOutside = r), u.currentItem && (u._mouseDrag(t), i.position = u.position)) : u.isOver && (u.isOver = 0, u.cancelHelperRemoval = !0, u.options._revert = u.options.revert, u.options.revert = !1, u._trigger("out", t, u._uiHash(u)), u._mouseStop(t, !0), u.options.revert = u.options._revert, u.options.helper = u.options._helper, u.placeholder && u.placeholder.remove(), i.helper.appendTo(r._parent), r._refreshOffsets(t), i.position = r._generatePosition(t, !0), r._trigger("fromSortable", t), r.dropped = !1, n.each(r.sortables, function() {
					this.refreshPositions()
				}))
			})
		}
	});
	n.ui.plugin.add("draggable", "cursor", {
		start: function(t, i, r) {
			var u = n("body"),
				f = r.options;
			u.css("cursor") && (f._cursor = u.css("cursor"));
			u.css("cursor", f.cursor)
		},
		stop: function(t, i, r) {
			var u = r.options;
			u._cursor && n("body").css("cursor", u._cursor)
		}
	});
	n.ui.plugin.add("draggable", "opacity", {
		start: function(t, i, r) {
			var u = n(i.helper),
				f = r.options;
			u.css("opacity") && (f._opacity = u.css("opacity"));
			u.css("opacity", f.opacity)
		},
		stop: function(t, i, r) {
			var u = r.options;
			u._opacity && n(i.helper).css("opacity", u._opacity)
		}
	});
	n.ui.plugin.add("draggable", "scroll", {
		start: function(n, t, i) {
			i.scrollParentNotHidden || (i.scrollParentNotHidden = i.helper.scrollParent(!1));
			i.scrollParentNotHidden[0] !== i.document[0] && "HTML" !== i.scrollParentNotHidden[0].tagName && (i.overflowOffset = i.scrollParentNotHidden.offset())
		},
		drag: function(t, i, r) {
			var u = r.options,
				o = !1,
				e = r.scrollParentNotHidden[0],
				f = r.document[0];
			e !== f && "HTML" !== e.tagName ? (u.axis && "x" === u.axis || (r.overflowOffset.top + e.offsetHeight - t.pageY < u.scrollSensitivity ? e.scrollTop = o = e.scrollTop + u.scrollSpeed : t.pageY - r.overflowOffset.top < u.scrollSensitivity && (e.scrollTop = o = e.scrollTop - u.scrollSpeed)), u.axis && "y" === u.axis || (r.overflowOffset.left + e.offsetWidth - t.pageX < u.scrollSensitivity ? e.scrollLeft = o = e.scrollLeft + u.scrollSpeed : t.pageX - r.overflowOffset.left < u.scrollSensitivity && (e.scrollLeft = o = e.scrollLeft - u.scrollSpeed))) : (u.axis && "x" === u.axis || (t.pageY - n(f).scrollTop() < u.scrollSensitivity ? o = n(f).scrollTop(n(f).scrollTop() - u.scrollSpeed) : n(window).height() - (t.pageY - n(f).scrollTop()) < u.scrollSensitivity && (o = n(f).scrollTop(n(f).scrollTop() + u.scrollSpeed))), u.axis && "y" === u.axis || (t.pageX - n(f).scrollLeft() < u.scrollSensitivity ? o = n(f).scrollLeft(n(f).scrollLeft() - u.scrollSpeed) : n(window).width() - (t.pageX - n(f).scrollLeft()) < u.scrollSensitivity && (o = n(f).scrollLeft(n(f).scrollLeft() + u.scrollSpeed))));
			o !== !1 && n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(r, t)
		}
	});
	n.ui.plugin.add("draggable", "snap", {
		start: function(t, i, r) {
			var u = r.options;
			r.snapElements = [];
			n(u.snap.constructor !== String ? u.snap.items || ":data(ui-draggable)" : u.snap).each(function() {
				var t = n(this),
					i = t.offset();
				this !== r.element[0] && r.snapElements.push({
					item: this,
					width: t.outerWidth(),
					height: t.outerHeight(),
					top: i.top,
					left: i.left
				})
			})
		},
		drag: function(t, i, r) {
			for (var e, o, s, h, c, a, l, v, w, b = r.options, f = b.snapTolerance, y = i.offset.left, k = y + r.helperProportions.width, p = i.offset.top, d = p + r.helperProportions.height, u = r.snapElements.length - 1; u >= 0; u--) c = r.snapElements[u].left - r.margins.left, a = c + r.snapElements[u].width, l = r.snapElements[u].top - r.margins.top, v = l + r.snapElements[u].height, c - f > k || y > a + f || l - f > d || p > v + f || !n.contains(r.snapElements[u].item.ownerDocument, r.snapElements[u].item) ? (r.snapElements[u].snapping && r.options.snap.release && r.options.snap.release.call(r.element, t, n.extend(r._uiHash(), {
				snapItem: r.snapElements[u].item
			})), r.snapElements[u].snapping = !1) : ("inner" !== b.snapMode && (e = f >= Math.abs(l - d), o = f >= Math.abs(v - p), s = f >= Math.abs(c - k), h = f >= Math.abs(a - y), e && (i.position.top = r._convertPositionTo("relative", {
				top: l - r.helperProportions.height,
				left: 0
			}).top), o && (i.position.top = r._convertPositionTo("relative", {
				top: v,
				left: 0
			}).top), s && (i.position.left = r._convertPositionTo("relative", {
				top: 0,
				left: c - r.helperProportions.width
			}).left), h && (i.position.left = r._convertPositionTo("relative", {
				top: 0,
				left: a
			}).left)), w = e || o || s || h, "outer" !== b.snapMode && (e = f >= Math.abs(l - p), o = f >= Math.abs(v - d), s = f >= Math.abs(c - y), h = f >= Math.abs(a - k), e && (i.position.top = r._convertPositionTo("relative", {
				top: l,
				left: 0
			}).top), o && (i.position.top = r._convertPositionTo("relative", {
				top: v - r.helperProportions.height,
				left: 0
			}).top), s && (i.position.left = r._convertPositionTo("relative", {
				top: 0,
				left: c
			}).left), h && (i.position.left = r._convertPositionTo("relative", {
				top: 0,
				left: a - r.helperProportions.width
			}).left)), !r.snapElements[u].snapping && (e || o || s || h || w) && r.options.snap.snap && r.options.snap.snap.call(r.element, t, n.extend(r._uiHash(), {
				snapItem: r.snapElements[u].item
			})), r.snapElements[u].snapping = e || o || s || h || w)
		}
	});
	n.ui.plugin.add("draggable", "stack", {
		start: function(t, i, r) {
			var f, e = r.options,
				u = n.makeArray(n(e.stack)).sort(function(t, i) {
					return (parseInt(n(t).css("zIndex"), 10) || 0) - (parseInt(n(i).css("zIndex"), 10) || 0)
				});
			u.length && (f = parseInt(n(u[0]).css("zIndex"), 10) || 0, n(u).each(function(t) {
				n(this).css("zIndex", f + t)
			}), this.css("zIndex", f + u.length))
		}
	});
	n.ui.plugin.add("draggable", "zIndex", {
		start: function(t, i, r) {
			var u = n(i.helper),
				f = r.options;
			u.css("zIndex") && (f._zIndex = u.css("zIndex"));
			u.css("zIndex", f.zIndex)
		},
		stop: function(t, i, r) {
			var u = r.options;
			u._zIndex && n(i.helper).css("zIndex", u._zIndex)
		}
	});
	n.ui.draggable;
	n.widget("ui.droppable", {
		version: "1.12.1",
		widgetEventPrefix: "drop",
		options: {
			accept: "*",
			addClasses: !0,
			greedy: !1,
			scope: "default",
			tolerance: "intersect",
			activate: null,
			deactivate: null,
			drop: null,
			out: null,
			over: null
		},
		_create: function() {
			var t, i = this.options,
				r = i.accept;
			this.isover = !1;
			this.isout = !0;
			this.accept = n.isFunction(r) ? r : function(n) {
				return n.is(r)
			};
			this.proportions = function() {
				return arguments.length ? (t = arguments[0], void 0) : t ? t : t = {
					width: this.element[0].offsetWidth,
					height: this.element[0].offsetHeight
				}
			};
			this._addToManager(i.scope);
			i.addClasses && this._addClass("ui-droppable")
		},
		_addToManager: function(t) {
			n.ui.ddmanager.droppables[t] = n.ui.ddmanager.droppables[t] || [];
			n.ui.ddmanager.droppables[t].push(this)
		},
		_splice: function(n) {
			for (var t = 0; n.length > t; t++) n[t] === this && n.splice(t, 1)
		},
		_destroy: function() {
			var t = n.ui.ddmanager.droppables[this.options.scope];
			this._splice(t)
		},
		_setOption: function(t, i) {
			if ("accept" === t) this.accept = n.isFunction(i) ? i : function(n) {
				return n.is(i)
			};
			else if ("scope" === t) {
				var r = n.ui.ddmanager.droppables[this.options.scope];
				this._splice(r);
				this._addToManager(i)
			}
			this._super(t, i)
		},
		_activate: function(t) {
			var i = n.ui.ddmanager.current;
			this._addActiveClass();
			i && this._trigger("activate", t, this.ui(i))
		},
		_deactivate: function(t) {
			var i = n.ui.ddmanager.current;
			this._removeActiveClass();
			i && this._trigger("deactivate", t, this.ui(i))
		},
		_over: function(t) {
			var i = n.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._addHoverClass(), this._trigger("over", t, this.ui(i)))
		},
		_out: function(t) {
			var i = n.ui.ddmanager.current;
			i && (i.currentItem || i.element)[0] !== this.element[0] && this.accept.call(this.element[0], i.currentItem || i.element) && (this._removeHoverClass(), this._trigger("out", t, this.ui(i)))
		},
		_drop: function(t, i) {
			var r = i || n.ui.ddmanager.current,
				u = !1;
			return r && (r.currentItem || r.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
				var i = n(this).droppable("instance");
				if (i.options.greedy && !i.options.disabled && i.options.scope === r.options.scope && i.accept.call(i.element[0], r.currentItem || r.element) && f(r, n.extend(i, {
						offset: i.element.offset()
					}), i.options.tolerance, t)) return (u = !0, !1)
			}), u ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this._removeActiveClass(), this._removeHoverClass(), this._trigger("drop", t, this.ui(r)), this.element) : !1) : !1
		},
		ui: function(n) {
			return {
				draggable: n.currentItem || n.element,
				helper: n.helper,
				position: n.position,
				offset: n.positionAbs
			}
		},
		_addHoverClass: function() {
			this._addClass("ui-droppable-hover")
		},
		_removeHoverClass: function() {
			this._removeClass("ui-droppable-hover")
		},
		_addActiveClass: function() {
			this._addClass("ui-droppable-active")
		},
		_removeActiveClass: function() {
			this._removeClass("ui-droppable-active")
		}
	});
	f = n.ui.intersect = function() {
		function n(n, t, i) {
			return n >= t && t + i > n
		}
		return function(t, i, r, u) {
			if (!i.offset) return !1;
			var o = (t.positionAbs || t.position.absolute).left + t.margins.left,
				s = (t.positionAbs || t.position.absolute).top + t.margins.top,
				h = o + t.helperProportions.width,
				c = s + t.helperProportions.height,
				f = i.offset.left,
				e = i.offset.top,
				l = f + i.proportions().width,
				a = e + i.proportions().height;
			switch (r) {
				case "fit":
					return o >= f && l >= h && s >= e && a >= c;
				case "intersect":
					return o + t.helperProportions.width / 2 > f && l > h - t.helperProportions.width / 2 && s + t.helperProportions.height / 2 > e && a > c - t.helperProportions.height / 2;
				case "pointer":
					return n(u.pageY, e, i.proportions().height) && n(u.pageX, f, i.proportions().width);
				case "touch":
					return (s >= e && a >= s || c >= e && a >= c || e > s && c > a) && (o >= f && l >= o || h >= f && l >= h || f > o && h > l);
				default:
					return !1
			}
		}
	}();
	n.ui.ddmanager = {
		current: null,
		droppables: {
			"default": []
		},
		prepareOffsets: function(t, i) {
			var r, f, u = n.ui.ddmanager.droppables[t.options.scope] || [],
				o = i ? i.type : null,
				e = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
			n: for (r = 0; u.length > r; r++)
				if (!(u[r].options.disabled || t && !u[r].accept.call(u[r].element[0], t.currentItem || t.element))) {
					for (f = 0; e.length > f; f++)
						if (e[f] === u[r].element[0]) {
							u[r].proportions().height = 0;
							continue n
						}
					u[r].visible = "none" !== u[r].element.css("display");
					u[r].visible && ("mousedown" === o && u[r]._activate.call(u[r], i), u[r].offset = u[r].element.offset(), u[r].proportions({
						width: u[r].element[0].offsetWidth,
						height: u[r].element[0].offsetHeight
					}))
				}
		},
		drop: function(t, i) {
			var r = !1;
			return n.each((n.ui.ddmanager.droppables[t.options.scope] || []).slice(), function() {
				this.options && (!this.options.disabled && this.visible && f(t, this, this.options.tolerance, i) && (r = this._drop.call(this, i) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, i)))
			}), r
		},
		dragStart: function(t, i) {
			t.element.parentsUntil("body").on("scroll.droppable", function() {
				t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
			})
		},
		drag: function(t, i) {
			t.options.refreshPositions && n.ui.ddmanager.prepareOffsets(t, i);
			n.each(n.ui.ddmanager.droppables[t.options.scope] || [], function() {
				if (!this.options.disabled && !this.greedyChild && this.visible) {
					var r, o, e, s = f(t, this, this.options.tolerance, i),
						u = !s && this.isover ? "isout" : s && !this.isover ? "isover" : null;
					u && (this.options.greedy && (o = this.options.scope, e = this.element.parents(":data(ui-droppable)").filter(function() {
						return n(this).droppable("instance").options.scope === o
					}), e.length && (r = n(e[0]).droppable("instance"), r.greedyChild = "isover" === u)), r && "isover" === u && (r.isover = !1, r.isout = !0, r._out.call(r, i)), this[u] = !0, this["isout" === u ? "isover" : "isout"] = !1, this["isover" === u ? "_over" : "_out"].call(this, i), r && "isout" === u && (r.isout = !1, r.isover = !0, r._over.call(r, i)))
				}
			})
		},
		dragStop: function(t, i) {
			t.element.parentsUntil("body").off("scroll.droppable");
			t.options.refreshPositions || n.ui.ddmanager.prepareOffsets(t, i)
		}
	};
	n.uiBackCompat !== !1 && n.widget("ui.droppable", n.ui.droppable, {
		options: {
			hoverClass: !1,
			activeClass: !1
		},
		_addActiveClass: function() {
			this._super();
			this.options.activeClass && this.element.addClass(this.options.activeClass)
		},
		_removeActiveClass: function() {
			this._super();
			this.options.activeClass && this.element.removeClass(this.options.activeClass)
		},
		_addHoverClass: function() {
			this._super();
			this.options.hoverClass && this.element.addClass(this.options.hoverClass)
		},
		_removeHoverClass: function() {
			this._super();
			this.options.hoverClass && this.element.removeClass(this.options.hoverClass)
		}
	});
	n.ui.droppable;
	n.widget("ui.resizable", n.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "resize",
		options: {
			alsoResize: !1,
			animate: !1,
			animateDuration: "slow",
			animateEasing: "swing",
			aspectRatio: !1,
			autoHide: !1,
			classes: {
				"ui-resizable-se": "ui-icon ui-icon-gripsmall-diagonal-se"
			},
			containment: !1,
			ghost: !1,
			grid: !1,
			handles: "e,s,se",
			helper: !1,
			maxHeight: null,
			maxWidth: null,
			minHeight: 10,
			minWidth: 10,
			zIndex: 90,
			resize: null,
			start: null,
			stop: null
		},
		_num: function(n) {
			return parseFloat(n) || 0
		},
		_isNumber: function(n) {
			return !isNaN(parseFloat(n))
		},
		_hasScroll: function(t, i) {
			if ("hidden" === n(t).css("overflow")) return !1;
			var r = i && "left" === i ? "scrollLeft" : "scrollTop",
				u = !1;
			return t[r] > 0 ? !0 : (t[r] = 1, u = t[r] > 0, t[r] = 0, u)
		},
		_create: function() {
			var r, t = this.options,
				i = this;
			this._addClass("ui-resizable");
			n.extend(this, {
				_aspectRatio: !!t.aspectRatio,
				aspectRatio: t.aspectRatio,
				originalElement: this.element,
				_proportionallyResizeElements: [],
				_helper: t.helper || t.ghost || t.animate ? t.helper || "ui-resizable-helper" : null
			});
			this.element[0].nodeName.match(/^(canvas|textarea|input|select|button|img)$/i) && (this.element.wrap(n("<div class='ui-wrapper' style='overflow: hidden;'><\/div>").css({
				position: this.element.css("position"),
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				top: this.element.css("top"),
				left: this.element.css("left")
			})), this.element = this.element.parent().data("ui-resizable", this.element.resizable("instance")), this.elementIsWrapper = !0, r = {
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom"),
				marginLeft: this.originalElement.css("marginLeft")
			}, this.element.css(r), this.originalElement.css("margin", 0), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			})), this.originalElement.css(r), this._proportionallyResize());
			this._setupHandles();
			t.autoHide && n(this.element).on("mouseenter", function() {
				t.disabled || (i._removeClass("ui-resizable-autohide"), i._handles.show())
			}).on("mouseleave", function() {
				t.disabled || i.resizing || (i._addClass("ui-resizable-autohide"), i._handles.hide())
			});
			this._mouseInit()
		},
		_destroy: function() {
			this._mouseDestroy();
			var t, i = function(t) {
				n(t).removeData("resizable").removeData("ui-resizable").off(".resizable").find(".ui-resizable-handle").remove()
			};
			return this.elementIsWrapper && (i(this.element), t = this.element, this.originalElement.css({
				position: t.css("position"),
				width: t.outerWidth(),
				height: t.outerHeight(),
				top: t.css("top"),
				left: t.css("left")
			}).insertAfter(t), t.remove()), this.originalElement.css("resize", this.originalResizeStyle), i(this.originalElement), this
		},
		_setOption: function(n, t) {
			switch (this._super(n, t), n) {
				case "handles":
					this._removeHandles();
					this._setupHandles()
			}
		},
		_setupHandles: function() {
			var i, r, u, o, t, f = this.options,
				e = this;
			if (this.handles = f.handles || (n(".ui-resizable-handle", this.element).length ? {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} : "e,s,se"), this._handles = n(), this.handles.constructor === String)
				for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), u = this.handles.split(","), this.handles = {}, r = 0; u.length > r; r++) i = n.trim(u[r]), o = "ui-resizable-" + i, t = n("<div>"), this._addClass(t, "ui-resizable-handle " + o), t.css({
					zIndex: f.zIndex
				}), this.handles[i] = ".ui-resizable-" + i, this.element.append(t);
			this._renderAxis = function(t) {
				var i, r, u, f;
				t = t || this.element;
				for (i in this.handles) this.handles[i].constructor === String ? this.handles[i] = this.element.children(this.handles[i]).first().show() : (this.handles[i].jquery || this.handles[i].nodeType) && (this.handles[i] = n(this.handles[i]), this._on(this.handles[i], {
					mousedown: e._mouseDown
				})), this.elementIsWrapper && this.originalElement[0].nodeName.match(/^(textarea|input|select|button)$/i) && (r = n(this.handles[i], this.element), f = /sw|ne|nw|se|n|s/.test(i) ? r.outerHeight() : r.outerWidth(), u = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""), t.css(u, f), this._proportionallyResize()), this._handles = this._handles.add(this.handles[i])
			};
			this._renderAxis(this.element);
			this._handles = this._handles.add(this.element.find(".ui-resizable-handle"));
			this._handles.disableSelection();
			this._handles.on("mouseover", function() {
				e.resizing || (this.className && (t = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), e.axis = t && t[1] ? t[1] : "se")
			});
			f.autoHide && (this._handles.hide(), this._addClass("ui-resizable-autohide"))
		},
		_removeHandles: function() {
			this._handles.remove()
		},
		_mouseCapture: function(t) {
			var r, i, u = !1;
			for (r in this.handles) i = n(this.handles[r])[0], (i === t.target || n.contains(i, t.target)) && (u = !0);
			return !this.options.disabled && u
		},
		_mouseStart: function(t) {
			var u, f, e, r = this.options,
				i = this.element;
			return this.resizing = !0, this._renderProxy(), u = this._num(this.helper.css("left")), f = this._num(this.helper.css("top")), r.containment && (u += n(r.containment).scrollLeft() || 0, f += n(r.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
				left: u,
				top: f
			}, this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: i.width(),
				height: i.height()
			}, this.originalSize = this._helper ? {
				width: i.outerWidth(),
				height: i.outerHeight()
			} : {
				width: i.width(),
				height: i.height()
			}, this.sizeDiff = {
				width: i.outerWidth() - i.width(),
				height: i.outerHeight() - i.height()
			}, this.originalPosition = {
				left: u,
				top: f
			}, this.originalMousePosition = {
				left: t.pageX,
				top: t.pageY
			}, this.aspectRatio = "number" == typeof r.aspectRatio ? r.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = n(".ui-resizable-" + this.axis).css("cursor"), n("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), this._addClass("ui-resizable-resizing"), this._propagate("start", t), !0
		},
		_mouseDrag: function(t) {
			var i, r, u = this.originalMousePosition,
				e = this.axis,
				o = t.pageX - u.left || 0,
				s = t.pageY - u.top || 0,
				f = this._change[e];
			return this._updatePrevProperties(), f ? (i = f.apply(this, [t, o, s]), this._updateVirtualBoundaries(t.shiftKey), (this._aspectRatio || t.shiftKey) && (i = this._updateRatio(i, t)), i = this._respectSize(i, t), this._updateCache(i), this._propagate("resize", t), r = this._applyChanges(), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), n.isEmptyObject(r) || (this._updatePrevProperties(), this._trigger("resize", t, this.ui()), this._applyChanges()), !1) : !1
		},
		_mouseStop: function(t) {
			this.resizing = !1;
			var r, u, f, e, o, s, h, c = this.options,
				i = this;
			return this._helper && (r = this._proportionallyResizeElements, u = r.length && /textarea/i.test(r[0].nodeName), f = u && this._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height, e = u ? 0 : i.sizeDiff.width, o = {
				width: i.helper.width() - e,
				height: i.helper.height() - f
			}, s = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null, h = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null, c.animate || this.element.css(n.extend(o, {
				top: h,
				left: s
			})), i.helper.height(i.size.height), i.helper.width(i.size.width), this._helper && !c.animate && this._proportionallyResize()), n("body").css("cursor", "auto"), this._removeClass("ui-resizable-resizing"), this._propagate("stop", t), this._helper && this.helper.remove(), !1
		},
		_updatePrevProperties: function() {
			this.prevPosition = {
				top: this.position.top,
				left: this.position.left
			};
			this.prevSize = {
				width: this.size.width,
				height: this.size.height
			}
		},
		_applyChanges: function() {
			var n = {};
			return this.position.top !== this.prevPosition.top && (n.top = this.position.top + "px"), this.position.left !== this.prevPosition.left && (n.left = this.position.left + "px"), this.size.width !== this.prevSize.width && (n.width = this.size.width + "px"), this.size.height !== this.prevSize.height && (n.height = this.size.height + "px"), this.helper.css(n), n
		},
		_updateVirtualBoundaries: function(n) {
			var r, u, f, e, t, i = this.options;
			t = {
				minWidth: this._isNumber(i.minWidth) ? i.minWidth : 0,
				maxWidth: this._isNumber(i.maxWidth) ? i.maxWidth : 1 / 0,
				minHeight: this._isNumber(i.minHeight) ? i.minHeight : 0,
				maxHeight: this._isNumber(i.maxHeight) ? i.maxHeight : 1 / 0
			};
			(this._aspectRatio || n) && (r = t.minHeight * this.aspectRatio, f = t.minWidth / this.aspectRatio, u = t.maxHeight * this.aspectRatio, e = t.maxWidth / this.aspectRatio, r > t.minWidth && (t.minWidth = r), f > t.minHeight && (t.minHeight = f), t.maxWidth > u && (t.maxWidth = u), t.maxHeight > e && (t.maxHeight = e));
			this._vBoundaries = t
		},
		_updateCache: function(n) {
			this.offset = this.helper.offset();
			this._isNumber(n.left) && (this.position.left = n.left);
			this._isNumber(n.top) && (this.position.top = n.top);
			this._isNumber(n.height) && (this.size.height = n.height);
			this._isNumber(n.width) && (this.size.width = n.width)
		},
		_updateRatio: function(n) {
			var t = this.position,
				i = this.size,
				r = this.axis;
			return this._isNumber(n.height) ? n.width = n.height * this.aspectRatio : this._isNumber(n.width) && (n.height = n.width / this.aspectRatio), "sw" === r && (n.left = t.left + (i.width - n.width), n.top = null), "nw" === r && (n.top = t.top + (i.height - n.height), n.left = t.left + (i.width - n.width)), n
		},
		_respectSize: function(n) {
			var t = this._vBoundaries,
				i = this.axis,
				r = this._isNumber(n.width) && t.maxWidth && t.maxWidth < n.width,
				u = this._isNumber(n.height) && t.maxHeight && t.maxHeight < n.height,
				f = this._isNumber(n.width) && t.minWidth && t.minWidth > n.width,
				e = this._isNumber(n.height) && t.minHeight && t.minHeight > n.height,
				o = this.originalPosition.left + this.originalSize.width,
				s = this.originalPosition.top + this.originalSize.height,
				h = /sw|nw|w/.test(i),
				c = /nw|ne|n/.test(i);
			return f && (n.width = t.minWidth), e && (n.height = t.minHeight), r && (n.width = t.maxWidth), u && (n.height = t.maxHeight), f && h && (n.left = o - t.minWidth), r && h && (n.left = o - t.maxWidth), e && c && (n.top = s - t.minHeight), u && c && (n.top = s - t.maxHeight), n.width || n.height || n.left || !n.top ? n.width || n.height || n.top || !n.left || (n.left = null) : n.top = null, n
		},
		_getPaddingPlusBorderDimensions: function(n) {
			for (var t = 0, i = [], r = [n.css("borderTopWidth"), n.css("borderRightWidth"), n.css("borderBottomWidth"), n.css("borderLeftWidth")], u = [n.css("paddingTop"), n.css("paddingRight"), n.css("paddingBottom"), n.css("paddingLeft")]; 4 > t; t++) i[t] = parseFloat(r[t]) || 0, i[t] += parseFloat(u[t]) || 0;
			return {
				height: i[0] + i[2],
				width: i[1] + i[3]
			}
		},
		_proportionallyResize: function() {
			if (this._proportionallyResizeElements.length)
				for (var n, t = 0, i = this.helper || this.element; this._proportionallyResizeElements.length > t; t++) n = this._proportionallyResizeElements[t], this.outerDimensions || (this.outerDimensions = this._getPaddingPlusBorderDimensions(n)), n.css({
					height: i.height() - this.outerDimensions.height || 0,
					width: i.width() - this.outerDimensions.width || 0
				})
		},
		_renderProxy: function() {
			var t = this.element,
				i = this.options;
			this.elementOffset = t.offset();
			this._helper ? (this.helper = this.helper || n("<div style='overflow:hidden;'><\/div>"), this._addClass(this.helper, this._helper), this.helper.css({
				width: this.element.outerWidth(),
				height: this.element.outerHeight(),
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++i.zIndex
			}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
		},
		_change: {
			e: function(n, t) {
				return {
					width: this.originalSize.width + t
				}
			},
			w: function(n, t) {
				var i = this.originalSize,
					r = this.originalPosition;
				return {
					left: r.left + t,
					width: i.width - t
				}
			},
			n: function(n, t, i) {
				var r = this.originalSize,
					u = this.originalPosition;
				return {
					top: u.top + i,
					height: r.height - i
				}
			},
			s: function(n, t, i) {
				return {
					height: this.originalSize.height + i
				}
			},
			se: function(t, i, r) {
				return n.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
			},
			sw: function(t, i, r) {
				return n.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
			},
			ne: function(t, i, r) {
				return n.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [t, i, r]))
			},
			nw: function(t, i, r) {
				return n.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [t, i, r]))
			}
		},
		_propagate: function(t, i) {
			n.ui.plugin.call(this, t, [i, this.ui()]);
			"resize" !== t && this._trigger(t, i, this.ui())
		},
		plugins: {},
		ui: function() {
			return {
				originalElement: this.originalElement,
				element: this.element,
				helper: this.helper,
				position: this.position,
				size: this.size,
				originalSize: this.originalSize,
				originalPosition: this.originalPosition
			}
		}
	});
	n.ui.plugin.add("resizable", "animate", {
		stop: function(t) {
			var i = n(this).resizable("instance"),
				u = i.options,
				r = i._proportionallyResizeElements,
				f = r.length && /textarea/i.test(r[0].nodeName),
				s = f && i._hasScroll(r[0], "left") ? 0 : i.sizeDiff.height,
				h = f ? 0 : i.sizeDiff.width,
				c = {
					width: i.size.width - h,
					height: i.size.height - s
				},
				e = parseFloat(i.element.css("left")) + (i.position.left - i.originalPosition.left) || null,
				o = parseFloat(i.element.css("top")) + (i.position.top - i.originalPosition.top) || null;
			i.element.animate(n.extend(c, o && e ? {
				top: o,
				left: e
			} : {}), {
				duration: u.animateDuration,
				easing: u.animateEasing,
				step: function() {
					var u = {
						width: parseFloat(i.element.css("width")),
						height: parseFloat(i.element.css("height")),
						top: parseFloat(i.element.css("top")),
						left: parseFloat(i.element.css("left"))
					};
					r && r.length && n(r[0]).css({
						width: u.width,
						height: u.height
					});
					i._updateCache(u);
					i._propagate("resize", t)
				}
			})
		}
	});
	n.ui.plugin.add("resizable", "containment", {
		start: function() {
			var r, f, e, o, s, h, c, t = n(this).resizable("instance"),
				l = t.options,
				a = t.element,
				u = l.containment,
				i = u instanceof n ? u.get(0) : /parent/.test(u) ? a.parent().get(0) : u;
			i && (t.containerElement = n(i), /document/.test(u) || u === document ? (t.containerOffset = {
				left: 0,
				top: 0
			}, t.containerPosition = {
				left: 0,
				top: 0
			}, t.parentData = {
				element: n(document),
				left: 0,
				top: 0,
				width: n(document).width(),
				height: n(document).height() || document.body.parentNode.scrollHeight
			}) : (r = n(i), f = [], n(["Top", "Right", "Left", "Bottom"]).each(function(n, i) {
				f[n] = t._num(r.css("padding" + i))
			}), t.containerOffset = r.offset(), t.containerPosition = r.position(), t.containerSize = {
				height: r.innerHeight() - f[3],
				width: r.innerWidth() - f[1]
			}, e = t.containerOffset, o = t.containerSize.height, s = t.containerSize.width, h = t._hasScroll(i, "left") ? i.scrollWidth : s, c = t._hasScroll(i) ? i.scrollHeight : o, t.parentData = {
				element: i,
				left: e.left,
				top: e.top,
				width: h,
				height: c
			}))
		},
		resize: function(t) {
			var o, s, h, c, i = n(this).resizable("instance"),
				v = i.options,
				r = i.containerOffset,
				l = i.position,
				f = i._aspectRatio || t.shiftKey,
				e = {
					top: 0,
					left: 0
				},
				a = i.containerElement,
				u = !0;
			a[0] !== document && /static/.test(a.css("position")) && (e = r);
			l.left < (i._helper ? r.left : 0) && (i.size.width = i.size.width + (i._helper ? i.position.left - r.left : i.position.left - e.left), f && (i.size.height = i.size.width / i.aspectRatio, u = !1), i.position.left = v.helper ? r.left : 0);
			l.top < (i._helper ? r.top : 0) && (i.size.height = i.size.height + (i._helper ? i.position.top - r.top : i.position.top), f && (i.size.width = i.size.height * i.aspectRatio, u = !1), i.position.top = i._helper ? r.top : 0);
			h = i.containerElement.get(0) === i.element.parent().get(0);
			c = /relative|absolute/.test(i.containerElement.css("position"));
			h && c ? (i.offset.left = i.parentData.left + i.position.left, i.offset.top = i.parentData.top + i.position.top) : (i.offset.left = i.element.offset().left, i.offset.top = i.element.offset().top);
			o = Math.abs(i.sizeDiff.width + (i._helper ? i.offset.left - e.left : i.offset.left - r.left));
			s = Math.abs(i.sizeDiff.height + (i._helper ? i.offset.top - e.top : i.offset.top - r.top));
			o + i.size.width >= i.parentData.width && (i.size.width = i.parentData.width - o, f && (i.size.height = i.size.width / i.aspectRatio, u = !1));
			s + i.size.height >= i.parentData.height && (i.size.height = i.parentData.height - s, f && (i.size.width = i.size.height * i.aspectRatio, u = !1));
			u || (i.position.left = i.prevPosition.left, i.position.top = i.prevPosition.top, i.size.width = i.prevSize.width, i.size.height = i.prevSize.height)
		},
		stop: function() {
			var t = n(this).resizable("instance"),
				r = t.options,
				u = t.containerOffset,
				f = t.containerPosition,
				e = t.containerElement,
				i = n(t.helper),
				o = i.offset(),
				s = i.outerWidth() - t.sizeDiff.width,
				h = i.outerHeight() - t.sizeDiff.height;
			t._helper && !r.animate && /relative/.test(e.css("position")) && n(this).css({
				left: o.left - f.left - u.left,
				width: s,
				height: h
			});
			t._helper && !r.animate && /static/.test(e.css("position")) && n(this).css({
				left: o.left - f.left - u.left,
				width: s,
				height: h
			})
		}
	});
	n.ui.plugin.add("resizable", "alsoResize", {
		start: function() {
			var t = n(this).resizable("instance"),
				i = t.options;
			n(i.alsoResize).each(function() {
				var t = n(this);
				t.data("ui-resizable-alsoresize", {
					width: parseFloat(t.width()),
					height: parseFloat(t.height()),
					left: parseFloat(t.css("left")),
					top: parseFloat(t.css("top"))
				})
			})
		},
		resize: function(t, i) {
			var r = n(this).resizable("instance"),
				e = r.options,
				u = r.originalSize,
				f = r.originalPosition,
				o = {
					height: r.size.height - u.height || 0,
					width: r.size.width - u.width || 0,
					top: r.position.top - f.top || 0,
					left: r.position.left - f.left || 0
				};
			n(e.alsoResize).each(function() {
				var t = n(this),
					u = n(this).data("ui-resizable-alsoresize"),
					r = {},
					f = t.parents(i.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
				n.each(f, function(n, t) {
					var i = (u[t] || 0) + (o[t] || 0);
					i && i >= 0 && (r[t] = i || null)
				});
				t.css(r)
			})
		},
		stop: function() {
			n(this).removeData("ui-resizable-alsoresize")
		}
	});
	n.ui.plugin.add("resizable", "ghost", {
		start: function() {
			var t = n(this).resizable("instance"),
				i = t.size;
			t.ghost = t.originalElement.clone();
			t.ghost.css({
				opacity: .25,
				display: "block",
				position: "relative",
				height: i.height,
				width: i.width,
				margin: 0,
				left: 0,
				top: 0
			});
			t._addClass(t.ghost, "ui-resizable-ghost");
			n.uiBackCompat !== !1 && "string" == typeof t.options.ghost && t.ghost.addClass(this.options.ghost);
			t.ghost.appendTo(t.helper)
		},
		resize: function() {
			var t = n(this).resizable("instance");
			t.ghost && t.ghost.css({
				position: "relative",
				height: t.size.height,
				width: t.size.width
			})
		},
		stop: function() {
			var t = n(this).resizable("instance");
			t.ghost && t.helper && t.helper.get(0).removeChild(t.ghost.get(0))
		}
	});
	n.ui.plugin.add("resizable", "grid", {
		resize: function() {
			var h, t = n(this).resizable("instance"),
				i = t.options,
				y = t.size,
				o = t.originalSize,
				s = t.originalPosition,
				c = t.axis,
				l = "number" == typeof i.grid ? [i.grid, i.grid] : i.grid,
				f = l[0] || 1,
				e = l[1] || 1,
				a = Math.round((y.width - o.width) / f) * f,
				v = Math.round((y.height - o.height) / e) * e,
				r = o.width + a,
				u = o.height + v,
				p = i.maxWidth && r > i.maxWidth,
				w = i.maxHeight && u > i.maxHeight,
				b = i.minWidth && i.minWidth > r,
				k = i.minHeight && i.minHeight > u;
			i.grid = l;
			b && (r += f);
			k && (u += e);
			p && (r -= f);
			w && (u -= e);
			/^(se|s|e)$/.test(c) ? (t.size.width = r, t.size.height = u) : /^(ne)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.top = s.top - v) : /^(sw)$/.test(c) ? (t.size.width = r, t.size.height = u, t.position.left = s.left - a) : ((0 >= u - e || 0 >= r - f) && (h = t._getPaddingPlusBorderDimensions(this)), u - e > 0 ? (t.size.height = u, t.position.top = s.top - v) : (u = e - h.height, t.size.height = u, t.position.top = s.top + o.height - u), r - f > 0 ? (t.size.width = r, t.position.left = s.left - a) : (r = f - h.width, t.size.width = r, t.position.left = s.left + o.width - r))
		}
	});
	n.ui.resizable;
	n.widget("ui.selectable", n.ui.mouse, {
		version: "1.12.1",
		options: {
			appendTo: "body",
			autoRefresh: !0,
			distance: 0,
			filter: "*",
			tolerance: "touch",
			selected: null,
			selecting: null,
			start: null,
			stop: null,
			unselected: null,
			unselecting: null
		},
		_create: function() {
			var t = this;
			this._addClass("ui-selectable");
			this.dragged = !1;
			this.refresh = function() {
				t.elementPos = n(t.element[0]).offset();
				t.selectees = n(t.options.filter, t.element[0]);
				t._addClass(t.selectees, "ui-selectee");
				t.selectees.each(function() {
					var i = n(this),
						u = i.offset(),
						r = {
							left: u.left - t.elementPos.left,
							top: u.top - t.elementPos.top
						};
					n.data(this, "selectable-item", {
						element: this,
						$element: i,
						left: r.left,
						top: r.top,
						right: r.left + i.outerWidth(),
						bottom: r.top + i.outerHeight(),
						startselected: !1,
						selected: i.hasClass("ui-selected"),
						selecting: i.hasClass("ui-selecting"),
						unselecting: i.hasClass("ui-unselecting")
					})
				})
			};
			this.refresh();
			this._mouseInit();
			this.helper = n("<div>");
			this._addClass(this.helper, "ui-selectable-helper")
		},
		_destroy: function() {
			this.selectees.removeData("selectable-item");
			this._mouseDestroy()
		},
		_mouseStart: function(t) {
			var i = this,
				r = this.options;
			this.opos = [t.pageX, t.pageY];
			this.elementPos = n(this.element[0]).offset();
			this.options.disabled || (this.selectees = n(r.filter, this.element[0]), this._trigger("start", t), n(r.appendTo).append(this.helper), this.helper.css({
				left: t.pageX,
				top: t.pageY,
				width: 0,
				height: 0
			}), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
				var r = n.data(this, "selectable-item");
				r.startselected = !0;
				t.metaKey || t.ctrlKey || (i._removeClass(r.$element, "ui-selected"), r.selected = !1, i._addClass(r.$element, "ui-unselecting"), r.unselecting = !0, i._trigger("unselecting", t, {
					unselecting: r.element
				}))
			}), n(t.target).parents().addBack().each(function() {
				var u, r = n.data(this, "selectable-item");
				if (r) return (u = !t.metaKey && !t.ctrlKey || !r.$element.hasClass("ui-selected"), i._removeClass(r.$element, u ? "ui-unselecting" : "ui-selected")._addClass(r.$element, u ? "ui-selecting" : "ui-unselecting"), r.unselecting = !u, r.selecting = u, r.selected = u, u ? i._trigger("selecting", t, {
					selecting: r.element
				}) : i._trigger("unselecting", t, {
					unselecting: r.element
				}), !1)
			}))
		},
		_mouseDrag: function(t) {
			if (this.dragged = !0, !this.options.disabled) {
				var o, i = this,
					s = this.options,
					r = this.opos[0],
					u = this.opos[1],
					f = t.pageX,
					e = t.pageY;
				return r > f && (o = f, f = r, r = o), u > e && (o = e, e = u, u = o), this.helper.css({
					left: r,
					top: u,
					width: f - r,
					height: e - u
				}), this.selectees.each(function() {
					var o = n.data(this, "selectable-item"),
						c = !1,
						h = {};
					o && o.element !== i.element[0] && (h.left = o.left + i.elementPos.left, h.right = o.right + i.elementPos.left, h.top = o.top + i.elementPos.top, h.bottom = o.bottom + i.elementPos.top, "touch" === s.tolerance ? c = !(h.left > f || r > h.right || h.top > e || u > h.bottom) : "fit" === s.tolerance && (c = h.left > r && f > h.right && h.top > u && e > h.bottom), c ? (o.selected && (i._removeClass(o.$element, "ui-selected"), o.selected = !1), o.unselecting && (i._removeClass(o.$element, "ui-unselecting"), o.unselecting = !1), o.selecting || (i._addClass(o.$element, "ui-selecting"), o.selecting = !0, i._trigger("selecting", t, {
						selecting: o.element
					}))) : (o.selecting && ((t.metaKey || t.ctrlKey) && o.startselected ? (i._removeClass(o.$element, "ui-selecting"), o.selecting = !1, i._addClass(o.$element, "ui-selected"), o.selected = !0) : (i._removeClass(o.$element, "ui-selecting"), o.selecting = !1, o.startselected && (i._addClass(o.$element, "ui-unselecting"), o.unselecting = !0), i._trigger("unselecting", t, {
						unselecting: o.element
					}))), o.selected && (t.metaKey || t.ctrlKey || o.startselected || (i._removeClass(o.$element, "ui-selected"), o.selected = !1, i._addClass(o.$element, "ui-unselecting"), o.unselecting = !0, i._trigger("unselecting", t, {
						unselecting: o.element
					})))))
				}), !1
			}
		},
		_mouseStop: function(t) {
			var i = this;
			return this.dragged = !1, n(".ui-unselecting", this.element[0]).each(function() {
				var r = n.data(this, "selectable-item");
				i._removeClass(r.$element, "ui-unselecting");
				r.unselecting = !1;
				r.startselected = !1;
				i._trigger("unselected", t, {
					unselected: r.element
				})
			}), n(".ui-selecting", this.element[0]).each(function() {
				var r = n.data(this, "selectable-item");
				i._removeClass(r.$element, "ui-selecting")._addClass(r.$element, "ui-selected");
				r.selecting = !1;
				r.selected = !0;
				r.startselected = !0;
				i._trigger("selected", t, {
					selected: r.element
				})
			}), this._trigger("stop", t), this.helper.remove(), !1
		}
	});
	n.widget("ui.sortable", n.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "sort",
		ready: !1,
		options: {
			appendTo: "parent",
			axis: !1,
			connectWith: !1,
			containment: !1,
			cursor: "auto",
			cursorAt: !1,
			dropOnEmpty: !0,
			forcePlaceholderSize: !1,
			forceHelperSize: !1,
			grid: !1,
			handle: !1,
			helper: "original",
			items: "> *",
			opacity: !1,
			placeholder: !1,
			revert: !1,
			scroll: !0,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1e3,
			activate: null,
			beforeStop: null,
			change: null,
			deactivate: null,
			out: null,
			over: null,
			receive: null,
			remove: null,
			sort: null,
			start: null,
			stop: null,
			update: null
		},
		_isOverAxis: function(n, t, i) {
			return n >= t && t + i > n
		},
		_isFloating: function(n) {
			return /left|right/.test(n.css("float")) || /inline|table-cell/.test(n.css("display"))
		},
		_create: function() {
			this.containerCache = {};
			this._addClass("ui-sortable");
			this.refresh();
			this.offset = this.element.offset();
			this._mouseInit();
			this._setHandleClassName();
			this.ready = !0
		},
		_setOption: function(n, t) {
			this._super(n, t);
			"handle" === n && this._setHandleClassName()
		},
		_setHandleClassName: function() {
			var t = this;
			this._removeClass(this.element.find(".ui-sortable-handle"), "ui-sortable-handle");
			n.each(this.items, function() {
				t._addClass(this.instance.options.handle ? this.item.find(this.instance.options.handle) : this.item, "ui-sortable-handle")
			})
		},
		_destroy: function() {
			this._mouseDestroy();
			for (var n = this.items.length - 1; n >= 0; n--) this.items[n].item.removeData(this.widgetName + "-item");
			return this
		},
		_mouseCapture: function(t, i) {
			var r = null,
				f = !1,
				u = this;
			return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(t), n(t.target).parents().each(function() {
				if (n.data(this, u.widgetName + "-item") === u) return (r = n(this), !1)
			}), n.data(t.target, u.widgetName + "-item") === u && (r = n(t.target)), r ? !this.options.handle || i || (n(this.options.handle, r).find("*").addBack().each(function() {
				this === t.target && (f = !0)
			}), f) ? (this.currentItem = r, this._removeCurrentsFromItems(), !0) : !1 : !1)
		},
		_mouseStart: function(t, i, r) {
			var f, e, u = this.options;
			if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
					top: this.offset.top - this.margins.top,
					left: this.offset.left - this.margins.left
				}, n.extend(this.offset, {
					click: {
						left: t.pageX - this.offset.left,
						top: t.pageY - this.offset.top
					},
					parent: this._getParentOffset(),
					relative: this._getRelativeOffset()
				}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, u.cursorAt && this._adjustOffsetFromHelper(u.cursorAt), this.domPosition = {
					prev: this.currentItem.prev()[0],
					parent: this.currentItem.parent()[0]
				}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), u.containment && this._setContainment(), u.cursor && "auto" !== u.cursor && (e = this.document.find("body"), this.storedCursor = e.css("cursor"), e.css("cursor", u.cursor), this.storedStylesheet = n("<style>*{ cursor: " + u.cursor + " !important; }<\/style>").appendTo(e)), u.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", u.opacity)), u.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", u.zIndex)), this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !r)
				for (f = this.containers.length - 1; f >= 0; f--) this.containers[f]._trigger("activate", t, this._uiHash(this));
			return n.ui.ddmanager && (n.ui.ddmanager.current = this), n.ui.ddmanager && !u.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this._addClass(this.helper, "ui-sortable-helper"), this._mouseDrag(t), !0
		},
		_mouseDrag: function(t) {
			var e, u, f, o, i = this.options,
				r = !1;
			for (this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== this.document[0] && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < i.scrollSensitivity ? this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop + i.scrollSpeed : t.pageY - this.overflowOffset.top < i.scrollSensitivity && (this.scrollParent[0].scrollTop = r = this.scrollParent[0].scrollTop - i.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < i.scrollSensitivity ? this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft + i.scrollSpeed : t.pageX - this.overflowOffset.left < i.scrollSensitivity && (this.scrollParent[0].scrollLeft = r = this.scrollParent[0].scrollLeft - i.scrollSpeed)) : (t.pageY - this.document.scrollTop() < i.scrollSensitivity ? r = this.document.scrollTop(this.document.scrollTop() - i.scrollSpeed) : this.window.height() - (t.pageY - this.document.scrollTop()) < i.scrollSensitivity && (r = this.document.scrollTop(this.document.scrollTop() + i.scrollSpeed)), t.pageX - this.document.scrollLeft() < i.scrollSensitivity ? r = this.document.scrollLeft(this.document.scrollLeft() - i.scrollSpeed) : this.window.width() - (t.pageX - this.document.scrollLeft()) < i.scrollSensitivity && (r = this.document.scrollLeft(this.document.scrollLeft() + i.scrollSpeed))), r !== !1 && n.ui.ddmanager && !i.dropBehaviour && n.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), e = this.items.length - 1; e >= 0; e--)
				if (u = this.items[e], f = u.item[0], o = this._intersectsWithPointer(u), o && u.instance === this.currentContainer && f !== this.currentItem[0] && this.placeholder[1 === o ? "next" : "prev"]()[0] !== f && !n.contains(this.placeholder[0], f) && ("semi-dynamic" === this.options.type ? !n.contains(this.element[0], f) : !0)) {
					if (this.direction = 1 === o ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(u)) break;
					this._rearrange(t, u);
					this._trigger("change", t, this._uiHash());
					break
				}
			return this._contactContainers(t), n.ui.ddmanager && n.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
		},
		_mouseStop: function(t, i) {
			if (t) {
				if (n.ui.ddmanager && !this.options.dropBehaviour && n.ui.ddmanager.drop(this, t), this.options.revert) {
					var e = this,
						f = this.placeholder.offset(),
						r = this.options.axis,
						u = {};
					r && "x" !== r || (u.left = f.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollLeft));
					r && "y" !== r || (u.top = f.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === this.document[0].body ? 0 : this.offsetParent[0].scrollTop));
					this.reverting = !0;
					n(this.helper).animate(u, parseInt(this.options.revert, 10) || 500, function() {
						e._clear(t)
					})
				} else this._clear(t, i);
				return !1
			}
		},
		cancel: function() {
			if (this.dragging) {
				this._mouseUp(new n.Event("mouseup", {
					target: null
				}));
				"original" === this.options.helper ? (this.currentItem.css(this._storedCSS), this._removeClass(this.currentItem, "ui-sortable-helper")) : this.currentItem.show();
				for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
			}
			return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), n.extend(this, {
				helper: null,
				dragging: !1,
				reverting: !1,
				_noFinalSort: null
			}), this.domPosition.prev ? n(this.domPosition.prev).after(this.currentItem) : n(this.domPosition.parent).prepend(this.currentItem)), this
		},
		serialize: function(t) {
			var r = this._getItemsAsjQuery(t && t.connected),
				i = [];
			return t = t || {}, n(r).each(function() {
				var r = (n(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
				r && i.push((t.key || r[1] + "[]") + "=" + (t.key && t.expression ? r[1] : r[2]))
			}), !i.length && t.key && i.push(t.key + "="), i.join("&")
		},
		toArray: function(t) {
			var r = this._getItemsAsjQuery(t && t.connected),
				i = [];
			return t = t || {}, r.each(function() {
				i.push(n(t.item || this).attr(t.attribute || "id") || "")
			}), i
		},
		_intersectsWith: function(n) {
			var t = this.positionAbs.left,
				h = t + this.helperProportions.width,
				i = this.positionAbs.top,
				c = i + this.helperProportions.height,
				r = n.left,
				f = r + n.width,
				u = n.top,
				e = u + n.height,
				o = this.offset.click.top,
				s = this.offset.click.left,
				l = "x" === this.options.axis || i + o > u && e > i + o,
				a = "y" === this.options.axis || t + s > r && f > t + s,
				v = l && a;
			return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > n[this.floating ? "width" : "height"] ? v : t + this.helperProportions.width / 2 > r && f > h - this.helperProportions.width / 2 && i + this.helperProportions.height / 2 > u && e > c - this.helperProportions.height / 2
		},
		_intersectsWithPointer: function(n) {
			var t, i, r = "x" === this.options.axis || this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top, n.height),
				u = "y" === this.options.axis || this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left, n.width),
				f = r && u;
			return f ? (t = this._getDragVerticalDirection(), i = this._getDragHorizontalDirection(), this.floating ? "right" === i || "down" === t ? 2 : 1 : t && ("down" === t ? 2 : 1)) : !1
		},
		_intersectsWithSides: function(n) {
			var r = this._isOverAxis(this.positionAbs.top + this.offset.click.top, n.top + n.height / 2, n.height),
				u = this._isOverAxis(this.positionAbs.left + this.offset.click.left, n.left + n.width / 2, n.width),
				t = this._getDragVerticalDirection(),
				i = this._getDragHorizontalDirection();
			return this.floating && i ? "right" === i && u || "left" === i && !u : t && ("down" === t && r || "up" === t && !r)
		},
		_getDragVerticalDirection: function() {
			var n = this.positionAbs.top - this.lastPositionAbs.top;
			return 0 !== n && (n > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function() {
			var n = this.positionAbs.left - this.lastPositionAbs.left;
			return 0 !== n && (n > 0 ? "right" : "left")
		},
		refresh: function(n) {
			return this._refreshItems(n), this._setHandleClassName(), this.refreshPositions(), this
		},
		_connectWith: function() {
			var n = this.options;
			return n.connectWith.constructor === String ? [n.connectWith] : n.connectWith
		},
		_getItemsAsjQuery: function(t) {
			function h() {
				s.push(this)
			}
			var r, u, e, i, s = [],
				f = [],
				o = this._connectWith();
			if (o && t)
				for (r = o.length - 1; r >= 0; r--)
					for (e = n(o[r], this.document[0]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element) : n(i.options.items, i.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), i]);
			for (f.push([n.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
					options: this.options,
					item: this.currentItem
				}) : n(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), r = f.length - 1; r >= 0; r--) f[r][0].each(h);
			return n(s)
		},
		_removeCurrentsFromItems: function() {
			var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
			this.items = n.grep(this.items, function(n) {
				for (var i = 0; t.length > i; i++)
					if (t[i] === n.item[0]) return !1;
				return !0
			})
		},
		_refreshItems: function(t) {
			this.items = [];
			this.containers = [this];
			var r, u, e, i, o, s, h, l, a = this.items,
				f = [
					[n.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
						item: this.currentItem
					}) : n(this.options.items, this.element), this]
				],
				c = this._connectWith();
			if (c && this.ready)
				for (r = c.length - 1; r >= 0; r--)
					for (e = n(c[r], this.document[0]), u = e.length - 1; u >= 0; u--) i = n.data(e[u], this.widgetFullName), i && i !== this && !i.options.disabled && (f.push([n.isFunction(i.options.items) ? i.options.items.call(i.element[0], t, {
						item: this.currentItem
					}) : n(i.options.items, i.element), i]), this.containers.push(i));
			for (r = f.length - 1; r >= 0; r--)
				for (o = f[r][1], s = f[r][0], u = 0, l = s.length; l > u; u++) h = n(s[u]), h.data(this.widgetName + "-item", o), a.push({
					item: h,
					instance: o,
					width: 0,
					height: 0,
					left: 0,
					top: 0
				})
		},
		refreshPositions: function(t) {
			this.floating = this.items.length ? "x" === this.options.axis || this._isFloating(this.items[0].item) : !1;
			this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
			for (var r, f, u, i = this.items.length - 1; i >= 0; i--) r = this.items[i], r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0] || (f = this.options.toleranceElement ? n(this.options.toleranceElement, r.item) : r.item, t || (r.width = f.outerWidth(), r.height = f.outerHeight()), u = f.offset(), r.left = u.left, r.top = u.top);
			if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
			else
				for (i = this.containers.length - 1; i >= 0; i--) u = this.containers[i].element.offset(), this.containers[i].containerCache.left = u.left, this.containers[i].containerCache.top = u.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
			return this
		},
		_createPlaceholder: function(t) {
			t = t || this;
			var r, i = t.options;
			i.placeholder && i.placeholder.constructor !== String || (r = i.placeholder, i.placeholder = {
				element: function() {
					var u = t.currentItem[0].nodeName.toLowerCase(),
						i = n("<" + u + ">", t.document[0]);
					return t._addClass(i, "ui-sortable-placeholder", r || t.currentItem[0].className)._removeClass(i, "ui-sortable-helper"), "tbody" === u ? t._createTrPlaceholder(t.currentItem.find("tr").eq(0), n("<tr>", t.document[0]).appendTo(i)) : "tr" === u ? t._createTrPlaceholder(t.currentItem, i) : "img" === u && i.attr("src", t.currentItem.attr("src")), r || i.css("visibility", "hidden"), i
				},
				update: function(n, u) {
					(!r || i.forcePlaceholderSize) && (u.height() || u.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), u.width() || u.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10)))
				}
			});
			t.placeholder = n(i.placeholder.element.call(t.element, t.currentItem));
			t.currentItem.after(t.placeholder);
			i.placeholder.update(t, t.placeholder)
		},
		_createTrPlaceholder: function(t, i) {
			var r = this;
			t.children().each(function() {
				n("<td>&#160;<\/td>", r.document[0]).attr("colspan", n(this).attr("colspan") || 1).appendTo(i)
			})
		},
		_contactContainers: function(t) {
			for (var u, c, f, a, v, o, l, s, h, e = null, i = null, r = this.containers.length - 1; r >= 0; r--)
				if (!n.contains(this.currentItem[0], this.containers[r].element[0]))
					if (this._intersectsWith(this.containers[r].containerCache)) {
						if (e && n.contains(this.containers[r].element[0], e.element[0])) continue;
						e = this.containers[r];
						i = r
					} else this.containers[r].containerCache.over && (this.containers[r]._trigger("out", t, this._uiHash(this)), this.containers[r].containerCache.over = 0);
			if (e)
				if (1 === this.containers.length) this.containers[i].containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash(this)), this.containers[i].containerCache.over = 1);
				else {
					for (c = 1e4, f = null, s = e.floating || this._isFloating(this.currentItem), a = s ? "left" : "top", v = s ? "width" : "height", h = s ? "pageX" : "pageY", u = this.items.length - 1; u >= 0; u--) n.contains(this.containers[i].element[0], this.items[u].item[0]) && this.items[u].item[0] !== this.currentItem[0] && (o = this.items[u].item.offset()[a], l = !1, t[h] - o > this.items[u][v] / 2 && (l = !0), c > Math.abs(t[h] - o) && (c = Math.abs(t[h] - o), f = this.items[u], this.direction = l ? "up" : "down"));
					if (!f && !this.options.dropOnEmpty) return;
					if (this.currentContainer === this.containers[i]) return this.currentContainer.containerCache.over || (this.containers[i]._trigger("over", t, this._uiHash()), this.currentContainer.containerCache.over = 1), void 0;
					f ? this._rearrange(t, f, null, !0) : this._rearrange(t, null, this.containers[i].element, !0);
					this._trigger("change", t, this._uiHash());
					this.containers[i]._trigger("change", t, this._uiHash(this));
					this.currentContainer = this.containers[i];
					this.options.placeholder.update(this.currentContainer, this.placeholder);
					this.containers[i]._trigger("over", t, this._uiHash(this));
					this.containers[i].containerCache.over = 1
				}
		},
		_createHelper: function(t) {
			var r = this.options,
				i = n.isFunction(r.helper) ? n(r.helper.apply(this.element[0], [t, this.currentItem])) : "clone" === r.helper ? this.currentItem.clone() : this.currentItem;
			return i.parents("body").length || n("parent" !== r.appendTo ? r.appendTo : this.currentItem[0].parentNode)[0].appendChild(i[0]), i[0] === this.currentItem[0] && (this._storedCSS = {
				width: this.currentItem[0].style.width,
				height: this.currentItem[0].style.height,
				position: this.currentItem.css("position"),
				top: this.currentItem.css("top"),
				left: this.currentItem.css("left")
			}), (!i[0].style.width || r.forceHelperSize) && i.width(this.currentItem.width()), (!i[0].style.height || r.forceHelperSize) && i.height(this.currentItem.height()), i
		},
		_adjustOffsetFromHelper: function(t) {
			"string" == typeof t && (t = t.split(" "));
			n.isArray(t) && (t = {
				left: +t[0],
				top: +t[1] || 0
			});
			"left" in t && (this.offset.click.left = t.left + this.margins.left);
			"right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left);
			"top" in t && (this.offset.click.top = t.top + this.margins.top);
			"bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
		},
		_getParentOffset: function() {
			this.offsetParent = this.helper.offsetParent();
			var t = this.offsetParent.offset();
			return "absolute" === this.cssPosition && this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === this.document[0].body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && n.ui.ie) && (t = {
				top: 0,
				left: 0
			}), {
				top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function() {
			if ("relative" === this.cssPosition) {
				var n = this.currentItem.position();
				return {
					top: n.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: n.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			}
			return {
				top: 0,
				left: 0
			}
		},
		_cacheMargins: function() {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function() {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function() {
			var t, r, u, i = this.options;
			"parent" === i.containment && (i.containment = this.helper[0].parentNode);
			("document" === i.containment || "window" === i.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, "document" === i.containment ? this.document.width() : this.window.width() - this.helperProportions.width - this.margins.left, ("document" === i.containment ? this.document.height() || document.body.parentNode.scrollHeight : this.window.height() || this.document[0].body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]);
			/^(document|window|parent)$/.test(i.containment) || (t = n(i.containment)[0], r = n(i.containment).offset(), u = "hidden" !== n(t).css("overflow"), this.containment = [r.left + (parseInt(n(t).css("borderLeftWidth"), 10) || 0) + (parseInt(n(t).css("paddingLeft"), 10) || 0) - this.margins.left, r.top + (parseInt(n(t).css("borderTopWidth"), 10) || 0) + (parseInt(n(t).css("paddingTop"), 10) || 0) - this.margins.top, r.left + (u ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(n(t).css("borderLeftWidth"), 10) || 0) - (parseInt(n(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, r.top + (u ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(n(t).css("borderTopWidth"), 10) || 0) - (parseInt(n(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
		},
		_convertPositionTo: function(t, i) {
			i || (i = this.position);
			var r = "absolute" === t ? 1 : -1,
				u = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				f = /(html|body)/i.test(u[0].tagName);
			return {
				top: i.top + this.offset.relative.top * r + this.offset.parent.top * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : u.scrollTop()) * r,
				left: i.left + this.offset.relative.left * r + this.offset.parent.left * r - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : u.scrollLeft()) * r
			}
		},
		_generatePosition: function(t) {
			var r, u, i = this.options,
				f = t.pageX,
				e = t.pageY,
				o = "absolute" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && n.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
				s = /(html|body)/i.test(o[0].tagName);
			return "relative" !== this.cssPosition || this.scrollParent[0] !== this.document[0] && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (e = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (e = this.containment[3] + this.offset.click.top)), i.grid && (r = this.originalPageY + Math.round((e - this.originalPageY) / i.grid[1]) * i.grid[1], e = this.containment ? r - this.offset.click.top >= this.containment[1] && r - this.offset.click.top <= this.containment[3] ? r : r - this.offset.click.top >= this.containment[1] ? r - i.grid[1] : r + i.grid[1] : r, u = this.originalPageX + Math.round((f - this.originalPageX) / i.grid[0]) * i.grid[0], f = this.containment ? u - this.offset.click.left >= this.containment[0] && u - this.offset.click.left <= this.containment[2] ? u : u - this.offset.click.left >= this.containment[0] ? u - i.grid[0] : u + i.grid[0] : u)), {
				top: e - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()),
				left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft())
			}
		},
		_rearrange: function(n, t, i, r) {
			i ? i[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? t.item[0] : t.item[0].nextSibling);
			this.counter = this.counter ? ++this.counter : 1;
			var u = this.counter;
			this._delay(function() {
				u === this.counter && this.refreshPositions(!r)
			})
		},
		_clear: function(n, t) {
			function u(n, t, i) {
				return function(r) {
					i._trigger(n, r, t._uiHash(t))
				}
			}
			this.reverting = !1;
			var i, r = [];
			if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
				for (i in this._storedCSS)("auto" === this._storedCSS[i] || "static" === this._storedCSS[i]) && (this._storedCSS[i] = "");
				this.currentItem.css(this._storedCSS);
				this._removeClass(this.currentItem, "ui-sortable-helper")
			} else this.currentItem.show();
			for (this.fromOutside && !t && r.push(function(n) {
					this._trigger("receive", n, this._uiHash(this.fromOutside))
				}), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || t || r.push(function(n) {
					this._trigger("update", n, this._uiHash())
				}), this !== this.currentContainer && (t || (r.push(function(n) {
					this._trigger("remove", n, this._uiHash())
				}), r.push(function(n) {
					return function(t) {
						n._trigger("receive", t, this._uiHash(this))
					}
				}.call(this, this.currentContainer)), r.push(function(n) {
					return function(t) {
						n._trigger("update", t, this._uiHash(this))
					}
				}.call(this, this.currentContainer)))), i = this.containers.length - 1; i >= 0; i--) t || r.push(u("deactivate", this, this.containers[i])), this.containers[i].containerCache.over && (r.push(u("out", this, this.containers[i])), this.containers[i].containerCache.over = 0);
			if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, t || this._trigger("beforeStop", n, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.cancelHelperRemoval || (this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null), !t) {
				for (i = 0; r.length > i; i++) r[i].call(this, n);
				this._trigger("stop", n, this._uiHash())
			}
			return this.fromOutside = !1, !this.cancelHelperRemoval
		},
		_trigger: function() {
			n.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
		},
		_uiHash: function(t) {
			var i = t || this;
			return {
				helper: i.helper,
				placeholder: i.placeholder || n([]),
				position: i.position,
				originalPosition: i.originalPosition,
				offset: i.positionAbs,
				item: i.currentItem,
				sender: t ? t.element : null
			}
		}
	});
	n.widget("ui.accordion", {
		version: "1.12.1",
		options: {
			active: 0,
			animate: {},
			classes: {
				"ui-accordion-header": "ui-corner-top",
				"ui-accordion-header-collapsed": "ui-corner-all",
				"ui-accordion-content": "ui-corner-bottom"
			},
			collapsible: !1,
			event: "click",
			header: "> li > :first-child, > :not(li):even",
			heightStyle: "auto",
			icons: {
				activeHeader: "ui-icon-triangle-1-s",
				header: "ui-icon-triangle-1-e"
			},
			activate: null,
			beforeActivate: null
		},
		hideProps: {
			borderTopWidth: "hide",
			borderBottomWidth: "hide",
			paddingTop: "hide",
			paddingBottom: "hide",
			height: "hide"
		},
		showProps: {
			borderTopWidth: "show",
			borderBottomWidth: "show",
			paddingTop: "show",
			paddingBottom: "show",
			height: "show"
		},
		_create: function() {
			var t = this.options;
			this.prevShow = this.prevHide = n();
			this._addClass("ui-accordion", "ui-widget ui-helper-reset");
			this.element.attr("role", "tablist");
			t.collapsible || t.active !== !1 && null != t.active || (t.active = 0);
			this._processPanels();
			0 > t.active && (t.active += this.headers.length);
			this._refresh()
		},
		_getCreateEventData: function() {
			return {
				header: this.active,
				panel: this.active.length ? this.active.next() : n()
			}
		},
		_createIcons: function() {
			var i, r, t = this.options.icons;
			t && (i = n("<span>"), this._addClass(i, "ui-accordion-header-icon", "ui-icon " + t.header), i.prependTo(this.headers), r = this.active.children(".ui-accordion-header-icon"), this._removeClass(r, t.header)._addClass(r, null, t.activeHeader)._addClass(this.headers, "ui-accordion-icons"))
		},
		_destroyIcons: function() {
			this._removeClass(this.headers, "ui-accordion-icons");
			this.headers.children(".ui-accordion-header-icon").remove()
		},
		_destroy: function() {
			var n;
			this.element.removeAttr("role");
			this.headers.removeAttr("role aria-expanded aria-selected aria-controls tabIndex").removeUniqueId();
			this._destroyIcons();
			n = this.headers.next().css("display", "").removeAttr("role aria-hidden aria-labelledby").removeUniqueId();
			"content" !== this.options.heightStyle && n.css("height", "")
		},
		_setOption: function(n, t) {
			return "active" === n ? (this._activate(t), void 0) : ("event" === n && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(t)), this._super(n, t), "collapsible" !== n || t || this.options.active !== !1 || this._activate(0), "icons" === n && (this._destroyIcons(), t && this._createIcons()), void 0)
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this.element.attr("aria-disabled", n);
			this._toggleClass(null, "ui-state-disabled", !!n);
			this._toggleClass(this.headers.add(this.headers.next()), null, "ui-state-disabled", !!n)
		},
		_keydown: function(t) {
			if (!t.altKey && !t.ctrlKey) {
				var i = n.ui.keyCode,
					u = this.headers.length,
					f = this.headers.index(t.target),
					r = !1;
				switch (t.keyCode) {
					case i.RIGHT:
					case i.DOWN:
						r = this.headers[(f + 1) % u];
						break;
					case i.LEFT:
					case i.UP:
						r = this.headers[(f - 1 + u) % u];
						break;
					case i.SPACE:
					case i.ENTER:
						this._eventHandler(t);
						break;
					case i.HOME:
						r = this.headers[0];
						break;
					case i.END:
						r = this.headers[u - 1]
				}
				r && (n(t.target).attr("tabIndex", -1), n(r).attr("tabIndex", 0), n(r).trigger("focus"), t.preventDefault())
			}
		},
		_panelKeyDown: function(t) {
			t.keyCode === n.ui.keyCode.UP && t.ctrlKey && n(t.currentTarget).prev().trigger("focus")
		},
		refresh: function() {
			var t = this.options;
			this._processPanels();
			t.active === !1 && t.collapsible === !0 || !this.headers.length ? (t.active = !1, this.active = n()) : t.active === !1 ? this._activate(0) : this.active.length && !n.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (t.active = !1, this.active = n()) : this._activate(Math.max(0, t.active - 1)) : t.active = this.headers.index(this.active);
			this._destroyIcons();
			this._refresh()
		},
		_processPanels: function() {
			var t = this.headers,
				n = this.panels;
			this.headers = this.element.find(this.options.header);
			this._addClass(this.headers, "ui-accordion-header ui-accordion-header-collapsed", "ui-state-default");
			this.panels = this.headers.next().filter(":not(.ui-accordion-content-active)").hide();
			this._addClass(this.panels, "ui-accordion-content", "ui-helper-reset ui-widget-content");
			n && (this._off(t.not(this.headers)), this._off(n.not(this.panels)))
		},
		_refresh: function() {
			var t, i = this.options,
				r = i.heightStyle,
				u = this.element.parent();
			this.active = this._findActive(i.active);
			this._addClass(this.active, "ui-accordion-header-active", "ui-state-active")._removeClass(this.active, "ui-accordion-header-collapsed");
			this._addClass(this.active.next(), "ui-accordion-content-active");
			this.active.next().show();
			this.headers.attr("role", "tab").each(function() {
				var t = n(this),
					r = t.uniqueId().attr("id"),
					i = t.next(),
					u = i.uniqueId().attr("id");
				t.attr("aria-controls", u);
				i.attr("aria-labelledby", r)
			}).next().attr("role", "tabpanel");
			this.headers.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			}).next().attr({
				"aria-hidden": "true"
			}).hide();
			this.active.length ? this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}).next().attr({
				"aria-hidden": "false"
			}) : this.headers.eq(0).attr("tabIndex", 0);
			this._createIcons();
			this._setupEvents(i.event);
			"fill" === r ? (t = u.height(), this.element.siblings(":visible").each(function() {
				var i = n(this),
					r = i.css("position");
				"absolute" !== r && "fixed" !== r && (t -= i.outerHeight(!0))
			}), this.headers.each(function() {
				t -= n(this).outerHeight(!0)
			}), this.headers.next().each(function() {
				n(this).height(Math.max(0, t - n(this).innerHeight() + n(this).height()))
			}).css("overflow", "auto")) : "auto" === r && (t = 0, this.headers.next().each(function() {
				var i = n(this).is(":visible");
				i || n(this).show();
				t = Math.max(t, n(this).css("height", "").height());
				i || n(this).hide()
			}).height(t))
		},
		_activate: function(t) {
			var i = this._findActive(t)[0];
			i !== this.active[0] && (i = i || this.active[0], this._eventHandler({
				target: i,
				currentTarget: i,
				preventDefault: n.noop
			}))
		},
		_findActive: function(t) {
			return "number" == typeof t ? this.headers.eq(t) : n()
		},
		_setupEvents: function(t) {
			var i = {
				keydown: "_keydown"
			};
			t && n.each(t.split(" "), function(n, t) {
				i[t] = "_eventHandler"
			});
			this._off(this.headers.add(this.headers.next()));
			this._on(this.headers, i);
			this._on(this.headers.next(), {
				keydown: "_panelKeyDown"
			});
			this._hoverable(this.headers);
			this._focusable(this.headers)
		},
		_eventHandler: function(t) {
			var e, o, i = this.options,
				u = this.active,
				r = n(t.currentTarget),
				f = r[0] === u[0],
				s = f && i.collapsible,
				c = s ? n() : r.next(),
				l = u.next(),
				h = {
					oldHeader: u,
					oldPanel: l,
					newHeader: s ? n() : r,
					newPanel: c
				};
			t.preventDefault();
			f && !i.collapsible || this._trigger("beforeActivate", t, h) === !1 || (i.active = s ? !1 : this.headers.index(r), this.active = f ? n() : r, this._toggle(h), this._removeClass(u, "ui-accordion-header-active", "ui-state-active"), i.icons && (e = u.children(".ui-accordion-header-icon"), this._removeClass(e, null, i.icons.activeHeader)._addClass(e, null, i.icons.header)), f || (this._removeClass(r, "ui-accordion-header-collapsed")._addClass(r, "ui-accordion-header-active", "ui-state-active"), i.icons && (o = r.children(".ui-accordion-header-icon"), this._removeClass(o, null, i.icons.header)._addClass(o, null, i.icons.activeHeader)), this._addClass(r.next(), "ui-accordion-content-active")))
		},
		_toggle: function(t) {
			var r = t.newPanel,
				i = this.prevShow.length ? this.prevShow : t.oldPanel;
			this.prevShow.add(this.prevHide).stop(!0, !0);
			this.prevShow = r;
			this.prevHide = i;
			this.options.animate ? this._animate(r, i, t) : (i.hide(), r.show(), this._toggleComplete(t));
			i.attr({
				"aria-hidden": "true"
			});
			i.prev().attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			});
			r.length && i.length ? i.prev().attr({
				tabIndex: -1,
				"aria-expanded": "false"
			}) : r.length && this.headers.filter(function() {
				return 0 === parseInt(n(this).attr("tabIndex"), 10)
			}).attr("tabIndex", -1);
			r.attr("aria-hidden", "false").prev().attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_animate: function(n, t, i) {
			var h, r, u, c = this,
				o = 0,
				l = n.css("box-sizing"),
				a = n.length && (!t.length || n.index() < t.index()),
				e = this.options.animate || {},
				f = a && e.down || e,
				s = function() {
					c._toggleComplete(i)
				};
			return "number" == typeof f && (u = f), "string" == typeof f && (r = f), r = r || f.easing || e.easing, u = u || f.duration || e.duration, t.length ? n.length ? (h = n.show().outerHeight(), t.animate(this.hideProps, {
				duration: u,
				easing: r,
				step: function(n, t) {
					t.now = Math.round(n)
				}
			}), n.hide().animate(this.showProps, {
				duration: u,
				easing: r,
				complete: s,
				step: function(n, i) {
					i.now = Math.round(n);
					"height" !== i.prop ? "content-box" === l && (o += i.now) : "content" !== c.options.heightStyle && (i.now = Math.round(h - t.outerHeight() - o), o = 0)
				}
			}), void 0) : t.animate(this.hideProps, u, r, s) : n.animate(this.showProps, u, r, s)
		},
		_toggleComplete: function(n) {
			var t = n.oldPanel,
				i = t.prev();
			this._removeClass(t, "ui-accordion-content-active");
			this._removeClass(i, "ui-accordion-header-active")._addClass(i, "ui-accordion-header-collapsed");
			t.length && (t.parent()[0].className = t.parent()[0].className);
			this._trigger("activate", null, n)
		}
	});
	n.widget("ui.menu", {
		version: "1.12.1",
		defaultElement: "<ul>",
		delay: 300,
		options: {
			icons: {
				submenu: "ui-icon-caret-1-e"
			},
			items: "> *",
			menus: "ul",
			position: {
				my: "left top",
				at: "right top"
			},
			role: "menu",
			blur: null,
			focus: null,
			select: null
		},
		_create: function() {
			this.activeMenu = this.element;
			this.mouseHandled = !1;
			this.element.uniqueId().attr({
				role: this.options.role,
				tabIndex: 0
			});
			this._addClass("ui-menu", "ui-widget ui-widget-content");
			this._on({
				"mousedown .ui-menu-item": function(n) {
					n.preventDefault()
				},
				"click .ui-menu-item": function(t) {
					var i = n(t.target),
						r = n(n.ui.safeActiveElement(this.document[0]));
					!this.mouseHandled && i.not(".ui-state-disabled").length && (this.select(t), t.isPropagationStopped() || (this.mouseHandled = !0), i.has(".ui-menu").length ? this.expand(t) : !this.element.is(":focus") && r.closest(".ui-menu").length && (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
				},
				"mouseenter .ui-menu-item": function(t) {
					if (!this.previousFilter) {
						var r = n(t.target).closest(".ui-menu-item"),
							i = n(t.currentTarget);
						r[0] === i[0] && (this._removeClass(i.siblings().children(".ui-state-active"), null, "ui-state-active"), this.focus(t, i))
					}
				},
				mouseleave: "collapseAll",
				"mouseleave .ui-menu": "collapseAll",
				focus: function(n, t) {
					var i = this.active || this.element.find(this.options.items).eq(0);
					t || this.focus(n, i)
				},
				blur: function(t) {
					this._delay(function() {
						var i = !n.contains(this.element[0], n.ui.safeActiveElement(this.document[0]));
						i && this.collapseAll(t)
					})
				},
				keydown: "_keydown"
			});
			this.refresh();
			this._on(this.document, {
				click: function(n) {
					this._closeOnDocumentClick(n) && this.collapseAll(n);
					this.mouseHandled = !1
				}
			})
		},
		_destroy: function() {
			var t = this.element.find(".ui-menu-item").removeAttr("role aria-disabled"),
				i = t.children(".ui-menu-item-wrapper").removeUniqueId().removeAttr("tabIndex role aria-haspopup");
			this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeAttr("role aria-labelledby aria-expanded aria-hidden aria-disabled tabIndex").removeUniqueId().show();
			i.children().each(function() {
				var t = n(this);
				t.data("ui-menu-submenu-caret") && t.remove()
			})
		},
		_keydown: function(t) {
			var i, u, r, f, e = !0;
			switch (t.keyCode) {
				case n.ui.keyCode.PAGE_UP:
					this.previousPage(t);
					break;
				case n.ui.keyCode.PAGE_DOWN:
					this.nextPage(t);
					break;
				case n.ui.keyCode.HOME:
					this._move("first", "first", t);
					break;
				case n.ui.keyCode.END:
					this._move("last", "last", t);
					break;
				case n.ui.keyCode.UP:
					this.previous(t);
					break;
				case n.ui.keyCode.DOWN:
					this.next(t);
					break;
				case n.ui.keyCode.LEFT:
					this.collapse(t);
					break;
				case n.ui.keyCode.RIGHT:
					this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
					break;
				case n.ui.keyCode.ENTER:
				case n.ui.keyCode.SPACE:
					this._activate(t);
					break;
				case n.ui.keyCode.ESCAPE:
					this.collapse(t);
					break;
				default:
					e = !1;
					u = this.previousFilter || "";
					f = !1;
					r = t.keyCode >= 96 && 105 >= t.keyCode ? "" + (t.keyCode - 96) : String.fromCharCode(t.keyCode);
					clearTimeout(this.filterTimer);
					r === u ? f = !0 : r = u + r;
					i = this._filterMenuItems(r);
					i = f && -1 !== i.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : i;
					i.length || (r = String.fromCharCode(t.keyCode), i = this._filterMenuItems(r));
					i.length ? (this.focus(t, i), this.previousFilter = r, this.filterTimer = this._delay(function() {
						delete this.previousFilter
					}, 1e3)) : delete this.previousFilter
			}
			e && t.preventDefault()
		},
		_activate: function(n) {
			this.active && !this.active.is(".ui-state-disabled") && (this.active.children("[aria-haspopup='true']").length ? this.expand(n) : this.select(n))
		},
		refresh: function() {
			var u, t, f, i, e, r = this,
				s = this.options.icons.submenu,
				o = this.element.find(this.options.menus);
			this._toggleClass("ui-menu-icons", null, !!this.element.find(".ui-icon").length);
			f = o.filter(":not(.ui-menu)").hide().attr({
				role: this.options.role,
				"aria-hidden": "true",
				"aria-expanded": "false"
			}).each(function() {
				var t = n(this),
					i = t.prev(),
					u = n("<span>").data("ui-menu-submenu-caret", !0);
				r._addClass(u, "ui-menu-icon", "ui-icon " + s);
				i.attr("aria-haspopup", "true").prepend(u);
				t.attr("aria-labelledby", i.attr("id"))
			});
			this._addClass(f, "ui-menu", "ui-widget ui-widget-content ui-front");
			u = o.add(this.element);
			t = u.find(this.options.items);
			t.not(".ui-menu-item").each(function() {
				var t = n(this);
				r._isDivider(t) && r._addClass(t, "ui-menu-divider", "ui-widget-content")
			});
			i = t.not(".ui-menu-item, .ui-menu-divider");
			e = i.children().not(".ui-menu").uniqueId().attr({
				tabIndex: -1,
				role: this._itemRole()
			});
			this._addClass(i, "ui-menu-item")._addClass(e, "ui-menu-item-wrapper");
			t.filter(".ui-state-disabled").attr("aria-disabled", "true");
			this.active && !n.contains(this.element[0], this.active[0]) && this.blur()
		},
		_itemRole: function() {
			return {
				menu: "menuitem",
				listbox: "option"
			}[this.options.role]
		},
		_setOption: function(n, t) {
			if ("icons" === n) {
				var i = this.element.find(".ui-menu-icon");
				this._removeClass(i, null, this.options.icons.submenu)._addClass(i, null, t.submenu)
			}
			this._super(n, t)
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this.element.attr("aria-disabled", n + "");
			this._toggleClass(null, "ui-state-disabled", !!n)
		},
		focus: function(n, t) {
			var i, r, u;
			this.blur(n, n && "focus" === n.type);
			this._scrollIntoView(t);
			this.active = t.first();
			r = this.active.children(".ui-menu-item-wrapper");
			this._addClass(r, null, "ui-state-active");
			this.options.role && this.element.attr("aria-activedescendant", r.attr("id"));
			u = this.active.parent().closest(".ui-menu-item").children(".ui-menu-item-wrapper");
			this._addClass(u, null, "ui-state-active");
			n && "keydown" === n.type ? this._close() : this.timer = this._delay(function() {
				this._close()
			}, this.delay);
			i = t.children(".ui-menu");
			i.length && n && /^mouse/.test(n.type) && this._startOpening(i);
			this.activeMenu = t.parent();
			this._trigger("focus", n, {
				item: t
			})
		},
		_scrollIntoView: function(t) {
			var e, o, i, r, u, f;
			this._hasScroll() && (e = parseFloat(n.css(this.activeMenu[0], "borderTopWidth")) || 0, o = parseFloat(n.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - e - o, r = this.activeMenu.scrollTop(), u = this.activeMenu.height(), f = t.outerHeight(), 0 > i ? this.activeMenu.scrollTop(r + i) : i + f > u && this.activeMenu.scrollTop(r + i - u + f))
		},
		blur: function(n, t) {
			t || clearTimeout(this.timer);
			this.active && (this._removeClass(this.active.children(".ui-menu-item-wrapper"), null, "ui-state-active"), this._trigger("blur", n, {
				item: this.active
			}), this.active = null)
		},
		_startOpening: function(n) {
			clearTimeout(this.timer);
			"true" === n.attr("aria-hidden") && (this.timer = this._delay(function() {
				this._close();
				this._open(n)
			}, this.delay))
		},
		_open: function(t) {
			var i = n.extend({
				of: this.active
			}, this.options.position);
			clearTimeout(this.timer);
			this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true");
			t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(i)
		},
		collapseAll: function(t, i) {
			clearTimeout(this.timer);
			this.timer = this._delay(function() {
				var r = i ? this.element : n(t && t.target).closest(this.element.find(".ui-menu"));
				r.length || (r = this.element);
				this._close(r);
				this.blur(t);
				this._removeClass(r.find(".ui-state-active"), null, "ui-state-active");
				this.activeMenu = r
			}, this.delay)
		},
		_close: function(n) {
			n || (n = this.active ? this.active.parent() : this.element);
			n.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false")
		},
		_closeOnDocumentClick: function(t) {
			return !n(t.target).closest(".ui-menu").length
		},
		_isDivider: function(n) {
			return !/[^\-\u2014\u2013\s]/.test(n.text())
		},
		collapse: function(n) {
			var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
			t && t.length && (this._close(), this.focus(n, t))
		},
		expand: function(n) {
			var t = this.active && this.active.children(".ui-menu ").find(this.options.items).first();
			t && t.length && (this._open(t.parent()), this._delay(function() {
				this.focus(n, t)
			}))
		},
		next: function(n) {
			this._move("next", "first", n)
		},
		previous: function(n) {
			this._move("prev", "last", n)
		},
		isFirstItem: function() {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		isLastItem: function() {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		_move: function(n, t, i) {
			var r;
			this.active && (r = "first" === n || "last" === n ? this.active["first" === n ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[n + "All"](".ui-menu-item").eq(0));
			r && r.length && this.active || (r = this.activeMenu.find(this.options.items)[t]());
			this.focus(i, r)
		},
		nextPage: function(t) {
			var i, r, u;
			return this.active ? (this.isLastItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
				return i = n(this), 0 > i.offset().top - r - u
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items)[this.active ? "last" : "first"]())), void 0) : (this.next(t), void 0)
		},
		previousPage: function(t) {
			var i, r, u;
			return this.active ? (this.isFirstItem() || (this._hasScroll() ? (r = this.active.offset().top, u = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
				return i = n(this), i.offset().top - r + u > 0
			}), this.focus(t, i)) : this.focus(t, this.activeMenu.find(this.options.items).first())), void 0) : (this.next(t), void 0)
		},
		_hasScroll: function() {
			return this.element.outerHeight() < this.element.prop("scrollHeight")
		},
		select: function(t) {
			this.active = this.active || n(t.target).closest(".ui-menu-item");
			var i = {
				item: this.active
			};
			this.active.has(".ui-menu").length || this.collapseAll(t, !0);
			this._trigger("select", t, i)
		},
		_filterMenuItems: function(t) {
			var i = t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&"),
				r = RegExp("^" + i, "i");
			return this.activeMenu.find(this.options.items).filter(".ui-menu-item").filter(function() {
				return r.test(n.trim(n(this).children(".ui-menu-item-wrapper").text()))
			})
		}
	});
	n.widget("ui.autocomplete", {
		version: "1.12.1",
		defaultElement: "<input>",
		options: {
			appendTo: null,
			autoFocus: !1,
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null,
			change: null,
			close: null,
			focus: null,
			open: null,
			response: null,
			search: null,
			select: null
		},
		requestIndex: 0,
		pending: 0,
		_create: function() {
			var t, i, r, u = this.element[0].nodeName.toLowerCase(),
				f = "textarea" === u,
				e = "input" === u;
			this.isMultiLine = f || !e && this._isContentEditable(this.element);
			this.valueMethod = this.element[f || e ? "val" : "text"];
			this.isNewMenu = !0;
			this._addClass("ui-autocomplete-input");
			this.element.attr("autocomplete", "off");
			this._on(this.element, {
				keydown: function(u) {
					if (this.element.prop("readOnly")) return t = !0, r = !0, i = !0, void 0;
					t = !1;
					r = !1;
					i = !1;
					var f = n.ui.keyCode;
					switch (u.keyCode) {
						case f.PAGE_UP:
							t = !0;
							this._move("previousPage", u);
							break;
						case f.PAGE_DOWN:
							t = !0;
							this._move("nextPage", u);
							break;
						case f.UP:
							t = !0;
							this._keyEvent("previous", u);
							break;
						case f.DOWN:
							t = !0;
							this._keyEvent("next", u);
							break;
						case f.ENTER:
							this.menu.active && (t = !0, u.preventDefault(), this.menu.select(u));
							break;
						case f.TAB:
							this.menu.active && this.menu.select(u);
							break;
						case f.ESCAPE:
							this.menu.element.is(":visible") && (this.isMultiLine || this._value(this.term), this.close(u), u.preventDefault());
							break;
						default:
							i = !0;
							this._searchTimeout(u)
					}
				},
				keypress: function(r) {
					if (t) return t = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && r.preventDefault(), void 0;
					if (!i) {
						var u = n.ui.keyCode;
						switch (r.keyCode) {
							case u.PAGE_UP:
								this._move("previousPage", r);
								break;
							case u.PAGE_DOWN:
								this._move("nextPage", r);
								break;
							case u.UP:
								this._keyEvent("previous", r);
								break;
							case u.DOWN:
								this._keyEvent("next", r)
						}
					}
				},
				input: function(n) {
					return r ? (r = !1, n.preventDefault(), void 0) : (this._searchTimeout(n), void 0)
				},
				focus: function() {
					this.selectedItem = null;
					this.previous = this._value()
				},
				blur: function(n) {
					return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(n), this._change(n), void 0)
				}
			});
			this._initSource();
			this.menu = n("<ul>").appendTo(this._appendTo()).menu({
				role: null
			}).hide().menu("instance");
			this._addClass(this.menu.element, "ui-autocomplete", "ui-front");
			this._on(this.menu.element, {
				mousedown: function(t) {
					t.preventDefault();
					this.cancelBlur = !0;
					this._delay(function() {
						delete this.cancelBlur;
						this.element[0] !== n.ui.safeActiveElement(this.document[0]) && this.element.trigger("focus")
					})
				},
				menufocus: function(t, i) {
					var r, u;
					return this.isNewMenu && (this.isNewMenu = !1, t.originalEvent && /^mouse/.test(t.originalEvent.type)) ? (this.menu.blur(), this.document.one("mousemove", function() {
						n(t.target).trigger(t.originalEvent)
					}), void 0) : (u = i.item.data("ui-autocomplete-item"), !1 !== this._trigger("focus", t, {
						item: u
					}) && t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(u.value), r = i.item.attr("aria-label") || u.value, r && n.trim(r).length && (this.liveRegion.children().hide(), n("<div>").text(r).appendTo(this.liveRegion)), void 0)
				},
				menuselect: function(t, i) {
					var r = i.item.data("ui-autocomplete-item"),
						u = this.previous;
					this.element[0] !== n.ui.safeActiveElement(this.document[0]) && (this.element.trigger("focus"), this.previous = u, this._delay(function() {
						this.previous = u;
						this.selectedItem = r
					}));
					!1 !== this._trigger("select", t, {
						item: r
					}) && this._value(r.value);
					this.term = this._value();
					this.close(t);
					this.selectedItem = r
				}
			});
			this.liveRegion = n("<div>", {
				role: "status",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).appendTo(this.document[0].body);
			this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
			this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_destroy: function() {
			clearTimeout(this.searching);
			this.element.removeAttr("autocomplete");
			this.menu.element.remove();
			this.liveRegion.remove()
		},
		_setOption: function(n, t) {
			this._super(n, t);
			"source" === n && this._initSource();
			"appendTo" === n && this.menu.element.appendTo(this._appendTo());
			"disabled" === n && t && this.xhr && this.xhr.abort()
		},
		_isEventTargetInWidget: function(t) {
			var i = this.menu.element[0];
			return t.target === this.element[0] || t.target === i || n.contains(i, t.target)
		},
		_closeOnClickOutside: function(n) {
			this._isEventTargetInWidget(n) || this.close()
		},
		_appendTo: function() {
			var t = this.options.appendTo;
			return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t
		},
		_initSource: function() {
			var i, r, t = this;
			n.isArray(this.options.source) ? (i = this.options.source, this.source = function(t, r) {
				r(n.ui.autocomplete.filter(i, t.term))
			}) : "string" == typeof this.options.source ? (r = this.options.source, this.source = function(i, u) {
				t.xhr && t.xhr.abort();
				t.xhr = n.ajax({
					url: r,
					data: i,
					dataType: "json",
					success: function(n) {
						u(n)
					},
					error: function() {
						u([])
					}
				})
			}) : this.source = this.options.source
		},
		_searchTimeout: function(n) {
			clearTimeout(this.searching);
			this.searching = this._delay(function() {
				var t = this.term === this._value(),
					i = this.menu.element.is(":visible"),
					r = n.altKey || n.ctrlKey || n.metaKey || n.shiftKey;
				t && (!t || i || r) || (this.selectedItem = null, this.search(null, n))
			}, this.options.delay)
		},
		search: function(n, t) {
			return n = null != n ? n : this._value(), this.term = this._value(), n.length < this.options.minLength ? this.close(t) : this._trigger("search", t) !== !1 ? this._search(n) : void 0
		},
		_search: function(n) {
			this.pending++;
			this._addClass("ui-autocomplete-loading");
			this.cancelSearch = !1;
			this.source({
				term: n
			}, this._response())
		},
		_response: function() {
			var t = ++this.requestIndex;
			return n.proxy(function(n) {
				t === this.requestIndex && this.__response(n);
				this.pending--;
				this.pending || this._removeClass("ui-autocomplete-loading")
			}, this)
		},
		__response: function(n) {
			n && (n = this._normalize(n));
			this._trigger("response", null, {
				content: n
			});
			!this.options.disabled && n && n.length && !this.cancelSearch ? (this._suggest(n), this._trigger("open")) : this._close()
		},
		close: function(n) {
			this.cancelSearch = !0;
			this._close(n)
		},
		_close: function(n) {
			this._off(this.document, "mousedown");
			this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", n))
		},
		_change: function(n) {
			this.previous !== this._value() && this._trigger("change", n, {
				item: this.selectedItem
			})
		},
		_normalize: function(t) {
			return t.length && t[0].label && t[0].value ? t : n.map(t, function(t) {
				return "string" == typeof t ? {
					label: t,
					value: t
				} : n.extend({}, t, {
					label: t.label || t.value,
					value: t.value || t.label
				})
			})
		},
		_suggest: function(t) {
			var i = this.menu.element.empty();
			this._renderMenu(i, t);
			this.isNewMenu = !0;
			this.menu.refresh();
			i.show();
			this._resizeMenu();
			i.position(n.extend({
				of: this.element
			}, this.options.position));
			this.options.autoFocus && this.menu.next();
			this._on(this.document, {
				mousedown: "_closeOnClickOutside"
			})
		},
		_resizeMenu: function() {
			var n = this.menu.element;
			n.outerWidth(Math.max(n.width("").outerWidth() + 1, this.element.outerWidth()))
		},
		_renderMenu: function(t, i) {
			var r = this;
			n.each(i, function(n, i) {
				r._renderItemData(t, i)
			})
		},
		_renderItemData: function(n, t) {
			return this._renderItem(n, t).data("ui-autocomplete-item", t)
		},
		_renderItem: function(t, i) {
			return n("<li>").append(n("<div>").text(i.label)).appendTo(t)
		},
		_move: function(n, t) {
			return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(n) || this.menu.isLastItem() && /^next/.test(n) ? (this.isMultiLine || this._value(this.term), this.menu.blur(), void 0) : (this.menu[n](t), void 0) : (this.search(null, t), void 0)
		},
		widget: function() {
			return this.menu.element
		},
		_value: function() {
			return this.valueMethod.apply(this.element, arguments)
		},
		_keyEvent: function(n, t) {
			(!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(n, t), t.preventDefault())
		},
		_isContentEditable: function(n) {
			if (!n.length) return !1;
			var t = n.prop("contentEditable");
			return "inherit" === t ? this._isContentEditable(n.parent()) : "true" === t
		}
	});
	n.extend(n.ui.autocomplete, {
		escapeRegex: function(n) {
			return n.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
		},
		filter: function(t, i) {
			var r = RegExp(n.ui.autocomplete.escapeRegex(i), "i");
			return n.grep(t, function(n) {
				return r.test(n.label || n.value || n)
			})
		}
	});
	n.widget("ui.autocomplete", n.ui.autocomplete, {
		options: {
			messages: {
				noResults: "No search results.",
				results: function(n) {
					return n + (n > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
				}
			}
		},
		__response: function(t) {
			var i;
			this._superApply(arguments);
			this.options.disabled || this.cancelSearch || (i = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.children().hide(), n("<div>").text(i).appendTo(this.liveRegion))
		}
	});
	n.ui.autocomplete;
	y = /ui-corner-([a-z]){2,6}/g;
	n.widget("ui.controlgroup", {
		version: "1.12.1",
		defaultElement: "<div>",
		options: {
			direction: "horizontal",
			disabled: null,
			onlyVisible: !0,
			items: {
				button: "input[type=button], input[type=submit], input[type=reset], button, a",
				controlgroupLabel: ".ui-controlgroup-label",
				checkboxradio: "input[type='checkbox'], input[type='radio']",
				selectmenu: "select",
				spinner: ".ui-spinner-input"
			}
		},
		_create: function() {
			this._enhance()
		},
		_enhance: function() {
			this.element.attr("role", "toolbar");
			this.refresh()
		},
		_destroy: function() {
			this._callChildMethod("destroy");
			this.childWidgets.removeData("ui-controlgroup-data");
			this.element.removeAttr("role");
			this.options.items.controlgroupLabel && this.element.find(this.options.items.controlgroupLabel).find(".ui-controlgroup-label-contents").contents().unwrap()
		},
		_initWidgets: function() {
			var t = this,
				i = [];
			n.each(this.options.items, function(r, u) {
				var f, e = {};
				if (u) return "controlgroupLabel" === r ? (f = t.element.find(u), f.each(function() {
					var t = n(this);
					t.children(".ui-controlgroup-label-contents").length || t.contents().wrapAll("<span class='ui-controlgroup-label-contents'><\/span>")
				}), t._addClass(f, null, "ui-widget ui-widget-content ui-state-default"), i = i.concat(f.get()), void 0) : (n.fn[r] && (e = t["_" + r + "Options"] ? t["_" + r + "Options"]("middle") : {
					classes: {}
				}, t.element.find(u).each(function() {
					var u = n(this),
						f = u[r]("instance"),
						o = n.widget.extend({}, e),
						s;
					"button" === r && u.parent(".ui-spinner").length || (f || (f = u[r]()[r]("instance")), f && (o.classes = t._resolveClassesValues(o.classes, f)), u[r](o), s = u[r]("widget"), n.data(s[0], "ui-controlgroup-data", f ? f : u[r]("instance")), i.push(s[0]))
				})), void 0)
			});
			this.childWidgets = n(n.unique(i));
			this._addClass(this.childWidgets, "ui-controlgroup-item")
		},
		_callChildMethod: function(t) {
			this.childWidgets.each(function() {
				var r = n(this),
					i = r.data("ui-controlgroup-data");
				i && i[t] && i[t]()
			})
		},
		_updateCornerClass: function(n, t) {
			var i = this._buildSimpleOptions(t, "label").classes.label;
			this._removeClass(n, null, "ui-corner-top ui-corner-bottom ui-corner-left ui-corner-right ui-corner-all");
			this._addClass(n, null, i)
		},
		_buildSimpleOptions: function(n, t) {
			var i = "vertical" === this.options.direction,
				r = {
					classes: {}
				};
			return r.classes[t] = {
				middle: "",
				first: "ui-corner-" + (i ? "top" : "left"),
				last: "ui-corner-" + (i ? "bottom" : "right"),
				only: "ui-corner-all"
			}[n], r
		},
		_spinnerOptions: function(n) {
			var t = this._buildSimpleOptions(n, "ui-spinner");
			return t.classes["ui-spinner-up"] = "", t.classes["ui-spinner-down"] = "", t
		},
		_buttonOptions: function(n) {
			return this._buildSimpleOptions(n, "ui-button")
		},
		_checkboxradioOptions: function(n) {
			return this._buildSimpleOptions(n, "ui-checkboxradio-label")
		},
		_selectmenuOptions: function(n) {
			var t = "vertical" === this.options.direction;
			return {
				width: t ? "auto" : !1,
				classes: {
					middle: {
						"ui-selectmenu-button-open": "",
						"ui-selectmenu-button-closed": ""
					},
					first: {
						"ui-selectmenu-button-open": "ui-corner-" + (t ? "top" : "tl"),
						"ui-selectmenu-button-closed": "ui-corner-" + (t ? "top" : "left")
					},
					last: {
						"ui-selectmenu-button-open": t ? "" : "ui-corner-tr",
						"ui-selectmenu-button-closed": "ui-corner-" + (t ? "bottom" : "right")
					},
					only: {
						"ui-selectmenu-button-open": "ui-corner-top",
						"ui-selectmenu-button-closed": "ui-corner-all"
					}
				}[n]
			}
		},
		_resolveClassesValues: function(t, i) {
			var r = {};
			return n.each(t, function(u) {
				var f = i.options.classes[u] || "";
				f = n.trim(f.replace(y, ""));
				r[u] = (f + " " + t[u]).replace(/\s+/g, " ")
			}), r
		},
		_setOption: function(n, t) {
			return "direction" === n && this._removeClass("ui-controlgroup-" + this.options.direction), this._super(n, t), "disabled" === n ? (this._callChildMethod(t ? "disable" : "enable"), void 0) : (this.refresh(), void 0)
		},
		refresh: function() {
			var t, i = this;
			this._addClass("ui-controlgroup ui-controlgroup-" + this.options.direction);
			"horizontal" === this.options.direction && this._addClass(null, "ui-helper-clearfix");
			this._initWidgets();
			t = this.childWidgets;
			this.options.onlyVisible && (t = t.filter(":visible"));
			t.length && (n.each(["first", "last"], function(n, r) {
				var u = t[r]().data("ui-controlgroup-data"),
					f;
				u && i["_" + u.widgetName + "Options"] ? (f = i["_" + u.widgetName + "Options"](1 === t.length ? "only" : r), f.classes = i._resolveClassesValues(f.classes, u), u.element[u.widgetName](f)) : i._updateCornerClass(t[r](), r)
			}), this._callChildMethod("refresh"))
		}
	});
	n.widget("ui.checkboxradio", [n.ui.formResetMixin, {
		version: "1.12.1",
		options: {
			disabled: null,
			label: null,
			icon: !0,
			classes: {
				"ui-checkboxradio-label": "ui-corner-all",
				"ui-checkboxradio-icon": "ui-corner-all"
			}
		},
		_getCreateOptions: function() {
			var t, i, u = this,
				r = this._super() || {};
			return this._readType(), i = this.element.labels(), this.label = n(i[i.length - 1]), this.label.length || n.error("No label found for checkboxradio widget"), this.originalLabel = "", this.label.contents().not(this.element[0]).each(function() {
				u.originalLabel += 3 === this.nodeType ? n(this).text() : this.outerHTML
			}), this.originalLabel && (r.label = this.originalLabel), t = this.element[0].disabled, null != t && (r.disabled = t), r
		},
		_create: function() {
			var n = this.element[0].checked;
			this._bindFormResetHandler();
			null == this.options.disabled && (this.options.disabled = this.element[0].disabled);
			this._setOption("disabled", this.options.disabled);
			this._addClass("ui-checkboxradio", "ui-helper-hidden-accessible");
			this._addClass(this.label, "ui-checkboxradio-label", "ui-button ui-widget");
			"radio" === this.type && this._addClass(this.label, "ui-checkboxradio-radio-label");
			this.options.label && this.options.label !== this.originalLabel ? this._updateLabel() : this.originalLabel && (this.options.label = this.originalLabel);
			this._enhance();
			n && (this._addClass(this.label, "ui-checkboxradio-checked", "ui-state-active"), this.icon && this._addClass(this.icon, null, "ui-state-hover"));
			this._on({
				change: "_toggleClasses",
				focus: function() {
					this._addClass(this.label, null, "ui-state-focus ui-visual-focus")
				},
				blur: function() {
					this._removeClass(this.label, null, "ui-state-focus ui-visual-focus")
				}
			})
		},
		_readType: function() {
			var t = this.element[0].nodeName.toLowerCase();
			this.type = this.element[0].type;
			"input" === t && /radio|checkbox/.test(this.type) || n.error("Can't create checkboxradio on element.nodeName=" + t + " and element.type=" + this.type)
		},
		_enhance: function() {
			this._updateIcon(this.element[0].checked)
		},
		widget: function() {
			return this.label
		},
		_getRadioGroup: function() {
			var t, i = this.element[0].name,
				r = "input[name='" + n.ui.escapeSelector(i) + "']";
			return i ? (t = this.form.length ? n(this.form[0].elements).filter(r) : n(r).filter(function() {
				return 0 === n(this).form().length
			}), t.not(this.element)) : n([])
		},
		_toggleClasses: function() {
			var t = this.element[0].checked;
			this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", t);
			this.options.icon && "checkbox" === this.type && this._toggleClass(this.icon, null, "ui-icon-check ui-state-checked", t)._toggleClass(this.icon, null, "ui-icon-blank", !t);
			"radio" === this.type && this._getRadioGroup().each(function() {
				var t = n(this).checkboxradio("instance");
				t && t._removeClass(t.label, "ui-checkboxradio-checked", "ui-state-active")
			})
		},
		_destroy: function() {
			this._unbindFormResetHandler();
			this.icon && (this.icon.remove(), this.iconSpace.remove())
		},
		_setOption: function(n, t) {
			if ("label" !== n || t) return (this._super(n, t), "disabled" === n ? (this._toggleClass(this.label, null, "ui-state-disabled", t), this.element[0].disabled = t, void 0) : (this.refresh(), void 0))
		},
		_updateIcon: function(t) {
			var i = "ui-icon ui-icon-background ";
			this.options.icon ? (this.icon || (this.icon = n("<span>"), this.iconSpace = n("<span> <\/span>"), this._addClass(this.iconSpace, "ui-checkboxradio-icon-space")), "checkbox" === this.type ? (i += t ? "ui-icon-check ui-state-checked" : "ui-icon-blank", this._removeClass(this.icon, null, t ? "ui-icon-blank" : "ui-icon-check")) : i += "ui-icon-blank", this._addClass(this.icon, "ui-checkboxradio-icon", i), t || this._removeClass(this.icon, null, "ui-icon-check ui-state-checked"), this.icon.prependTo(this.label).after(this.iconSpace)) : void 0 !== this.icon && (this.icon.remove(), this.iconSpace.remove(), delete this.icon)
		},
		_updateLabel: function() {
			var n = this.label.contents().not(this.element[0]);
			this.icon && (n = n.not(this.icon[0]));
			this.iconSpace && (n = n.not(this.iconSpace[0]));
			n.remove();
			this.label.append(this.options.label)
		},
		refresh: function() {
			var n = this.element[0].checked,
				t = this.element[0].disabled;
			this._updateIcon(n);
			this._toggleClass(this.label, "ui-checkboxradio-checked", "ui-state-active", n);
			null !== this.options.label && this._updateLabel();
			t !== this.options.disabled && this._setOptions({
				disabled: t
			})
		}
	}]);
	n.ui.checkboxradio;
	n.widget("ui.button", {
		version: "1.12.1",
		defaultElement: "<button>",
		options: {
			classes: {
				"ui-button": "ui-corner-all"
			},
			disabled: null,
			icon: null,
			iconPosition: "beginning",
			label: null,
			showLabel: !0
		},
		_getCreateOptions: function() {
			var n, t = this._super() || {};
			return this.isInput = this.element.is("input"), n = this.element[0].disabled, null != n && (t.disabled = n), this.originalLabel = this.isInput ? this.element.val() : this.element.html(), this.originalLabel && (t.label = this.originalLabel), t
		},
		_create: function() {
			!this.option.showLabel & !this.options.icon && (this.options.showLabel = !0);
			null == this.options.disabled && (this.options.disabled = this.element[0].disabled || !1);
			this.hasTitle = !!this.element.attr("title");
			this.options.label && this.options.label !== this.originalLabel && (this.isInput ? this.element.val(this.options.label) : this.element.html(this.options.label));
			this._addClass("ui-button", "ui-widget");
			this._setOption("disabled", this.options.disabled);
			this._enhance();
			this.element.is("a") && this._on({
				keyup: function(t) {
					t.keyCode === n.ui.keyCode.SPACE && (t.preventDefault(), this.element[0].click ? this.element[0].click() : this.element.trigger("click"))
				}
			})
		},
		_enhance: function() {
			this.element.is("button") || this.element.attr("role", "button");
			this.options.icon && (this._updateIcon("icon", this.options.icon), this._updateTooltip())
		},
		_updateTooltip: function() {
			this.title = this.element.attr("title");
			this.options.showLabel || this.title || this.element.attr("title", this.options.label)
		},
		_updateIcon: function(t, i) {
			var u = "iconPosition" !== t,
				r = u ? this.options.iconPosition : i,
				f = "top" === r || "bottom" === r;
			this.icon ? u && this._removeClass(this.icon, null, this.options.icon) : (this.icon = n("<span>"), this._addClass(this.icon, "ui-button-icon", "ui-icon"), this.options.showLabel || this._addClass("ui-button-icon-only"));
			u && this._addClass(this.icon, null, i);
			this._attachIcon(r);
			f ? (this._addClass(this.icon, null, "ui-widget-icon-block"), this.iconSpace && this.iconSpace.remove()) : (this.iconSpace || (this.iconSpace = n("<span> <\/span>"), this._addClass(this.iconSpace, "ui-button-icon-space")), this._removeClass(this.icon, null, "ui-wiget-icon-block"), this._attachIconSpace(r))
		},
		_destroy: function() {
			this.element.removeAttr("role");
			this.icon && this.icon.remove();
			this.iconSpace && this.iconSpace.remove();
			this.hasTitle || this.element.removeAttr("title")
		},
		_attachIconSpace: function(n) {
			this.icon[/^(?:end|bottom)/.test(n) ? "before" : "after"](this.iconSpace)
		},
		_attachIcon: function(n) {
			this.element[/^(?:end|bottom)/.test(n) ? "append" : "prepend"](this.icon)
		},
		_setOptions: function(n) {
			var t = void 0 === n.showLabel ? this.options.showLabel : n.showLabel,
				i = void 0 === n.icon ? this.options.icon : n.icon;
			t || i || (n.showLabel = !0);
			this._super(n)
		},
		_setOption: function(n, t) {
			"icon" === n && (t ? this._updateIcon(n, t) : this.icon && (this.icon.remove(), this.iconSpace && this.iconSpace.remove()));
			"iconPosition" === n && this._updateIcon(n, t);
			"showLabel" === n && (this._toggleClass("ui-button-icon-only", null, !t), this._updateTooltip());
			"label" === n && (this.isInput ? this.element.val(t) : (this.element.html(t), this.icon && (this._attachIcon(this.options.iconPosition), this._attachIconSpace(this.options.iconPosition))));
			this._super(n, t);
			"disabled" === n && (this._toggleClass(null, "ui-state-disabled", t), this.element[0].disabled = t, t && this.element.blur())
		},
		refresh: function() {
			var n = this.element.is("input, button") ? this.element[0].disabled : this.element.hasClass("ui-button-disabled");
			n !== this.options.disabled && this._setOptions({
				disabled: n
			});
			this._updateTooltip()
		}
	});
	n.uiBackCompat !== !1 && (n.widget("ui.button", n.ui.button, {
		options: {
			text: !0,
			icons: {
				primary: null,
				secondary: null
			}
		},
		_create: function() {
			this.options.showLabel && !this.options.text && (this.options.showLabel = this.options.text);
			!this.options.showLabel && this.options.text && (this.options.text = this.options.showLabel);
			this.options.icon || !this.options.icons.primary && !this.options.icons.secondary ? this.options.icon && (this.options.icons.primary = this.options.icon) : this.options.icons.primary ? this.options.icon = this.options.icons.primary : (this.options.icon = this.options.icons.secondary, this.options.iconPosition = "end");
			this._super()
		},
		_setOption: function(n, t) {
			return "text" === n ? (this._super("showLabel", t), void 0) : ("showLabel" === n && (this.options.text = t), "icon" === n && (this.options.icons.primary = t), "icons" === n && (t.primary ? (this._super("icon", t.primary), this._super("iconPosition", "beginning")) : t.secondary && (this._super("icon", t.secondary), this._super("iconPosition", "end"))), this._superApply(arguments), void 0)
		}
	}), n.fn.button = function(t) {
		return function() {
			return !this.length || this.length && "INPUT" !== this[0].tagName || this.length && "INPUT" === this[0].tagName && "checkbox" !== this.attr("type") && "radio" !== this.attr("type") ? t.apply(this, arguments) : (n.ui.checkboxradio || n.error("Checkboxradio widget missing"), 0 === arguments.length ? this.checkboxradio({
				icon: !1
			}) : this.checkboxradio.apply(this, arguments))
		}
	}(n.fn.button), n.fn.buttonset = function() {
		return n.ui.controlgroup || n.error("Controlgroup widget missing"), "option" === arguments[0] && "items" === arguments[1] && arguments[2] ? this.controlgroup.apply(this, [arguments[0], "items.button", arguments[2]]) : "option" === arguments[0] && "items" === arguments[1] ? this.controlgroup.apply(this, [arguments[0], "items.button"]) : ("object" == typeof arguments[0] && arguments[0].items && (arguments[0].items = {
			button: arguments[0].items
		}), this.controlgroup.apply(this, arguments))
	});
	n.ui.button;
	n.extend(n.ui, {
		datepicker: {
			version: "1.12.1"
		}
	});
	n.extend(c.prototype, {
		markerClassName: "hasDatepicker",
		maxRows: 4,
		_widgetDatepicker: function() {
			return this.dpDiv
		},
		setDefaults: function(n) {
			return u(this._defaults, n || {}), this
		},
		_attachDatepicker: function(t, i) {
			var r, f, u;
			r = t.nodeName.toLowerCase();
			f = "div" === r || "span" === r;
			t.id || (this.uuid += 1, t.id = "dp" + this.uuid);
			u = this._newInst(n(t), f);
			u.settings = n.extend({}, i || {});
			"input" === r ? this._connectDatepicker(t, u) : f && this._inlineDatepicker(t, u)
		},
		_newInst: function(t, i) {
			var r = t[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
			return {
				id: r,
				input: t,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: i,
				dpDiv: i ? l(n("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'><\/div>")) : this.dpDiv
			}
		},
		_connectDatepicker: function(t, i) {
			var r = n(t);
			i.append = n([]);
			i.trigger = n([]);
			r.hasClass(this.markerClassName) || (this._attachments(r, i), r.addClass(this.markerClassName).on("keydown", this._doKeyDown).on("keypress", this._doKeyPress).on("keyup", this._doKeyUp), this._autoSize(i), n.data(t, "datepicker", i), i.settings.disabled && this._disableDatepicker(t))
		},
		_attachments: function(t, i) {
			var u, r, f, e = this._get(i, "appendText"),
				o = this._get(i, "isRTL");
			i.append && i.append.remove();
			e && (i.append = n("<span class='" + this._appendClass + "'>" + e + "<\/span>"), t[o ? "before" : "after"](i.append));
			t.off("focus", this._showDatepicker);
			i.trigger && i.trigger.remove();
			u = this._get(i, "showOn");
			("focus" === u || "both" === u) && t.on("focus", this._showDatepicker);
			("button" === u || "both" === u) && (r = this._get(i, "buttonText"), f = this._get(i, "buttonImage"), i.trigger = n(this._get(i, "buttonImageOnly") ? n("<img/>").addClass(this._triggerClass).attr({
				src: f,
				alt: r,
				title: r
			}) : n("<button type='button'><\/button>").addClass(this._triggerClass).html(f ? n("<img/>").attr({
				src: f,
				alt: r,
				title: r
			}) : r)), t[o ? "before" : "after"](i.trigger), i.trigger.on("click", function() {
				return n.datepicker._datepickerShowing && n.datepicker._lastInput === t[0] ? n.datepicker._hideDatepicker() : n.datepicker._datepickerShowing && n.datepicker._lastInput !== t[0] ? (n.datepicker._hideDatepicker(), n.datepicker._showDatepicker(t[0])) : n.datepicker._showDatepicker(t[0]), !1
			}))
		},
		_autoSize: function(n) {
			if (this._get(n, "autoSize") && !n.inline) {
				var r, u, f, t, i = new Date(2009, 11, 20),
					e = this._get(n, "dateFormat");
				e.match(/[DM]/) && (r = function(n) {
					for (u = 0, f = 0, t = 0; n.length > t; t++) n[t].length > u && (u = n[t].length, f = t);
					return f
				}, i.setMonth(r(this._get(n, e.match(/MM/) ? "monthNames" : "monthNamesShort"))), i.setDate(r(this._get(n, e.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - i.getDay()));
				n.input.attr("size", this._formatDate(n, i).length)
			}
		},
		_inlineDatepicker: function(t, i) {
			var r = n(t);
			r.hasClass(this.markerClassName) || (r.addClass(this.markerClassName).append(i.dpDiv), n.data(t, "datepicker", i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(t), i.dpDiv.css("display", "block"))
		},
		_dialogDatepicker: function(t, i, r, f, e) {
			var s, h, c, l, a, o = this._dialogInst;
			return o || (this.uuid += 1, s = "dp" + this.uuid, this._dialogInput = n("<input type='text' id='" + s + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.on("keydown", this._doKeyDown), n("body").append(this._dialogInput), o = this._dialogInst = this._newInst(this._dialogInput, !1), o.settings = {}, n.data(this._dialogInput[0], "datepicker", o)), u(o.settings, f || {}), i = i && i.constructor === Date ? this._formatDate(o, i) : i, this._dialogInput.val(i), this._pos = e ? e.length ? e : [e.pageX, e.pageY] : null, this._pos || (h = document.documentElement.clientWidth, c = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, a = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [h / 2 - 100 + l, c / 2 - 150 + a]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), o.settings.onSelect = r, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), n.blockUI && n.blockUI(this.dpDiv), n.data(this._dialogInput[0], "datepicker", o), this
		},
		_destroyDatepicker: function(t) {
			var r, u = n(t),
				f = n.data(t, "datepicker");
			u.hasClass(this.markerClassName) && (r = t.nodeName.toLowerCase(), n.removeData(t, "datepicker"), "input" === r ? (f.append.remove(), f.trigger.remove(), u.removeClass(this.markerClassName).off("focus", this._showDatepicker).off("keydown", this._doKeyDown).off("keypress", this._doKeyPress).off("keyup", this._doKeyUp)) : ("div" === r || "span" === r) && u.removeClass(this.markerClassName).empty(), i === f && (i = null))
		},
		_enableDatepicker: function(t) {
			var i, r, u = n(t),
				f = n.data(t, "datepicker");
			u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !1, f.trigger.filter("button").each(function() {
				this.disabled = !1
			}).end().filter("img").css({
				opacity: "1.0",
				cursor: ""
			})) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().removeClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
				return n === t ? null : n
			}))
		},
		_disableDatepicker: function(t) {
			var i, r, u = n(t),
				f = n.data(t, "datepicker");
			u.hasClass(this.markerClassName) && (i = t.nodeName.toLowerCase(), "input" === i ? (t.disabled = !0, f.trigger.filter("button").each(function() {
				this.disabled = !0
			}).end().filter("img").css({
				opacity: "0.5",
				cursor: "default"
			})) : ("div" === i || "span" === i) && (r = u.children("." + this._inlineClass), r.children().addClass("ui-state-disabled"), r.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = n.map(this._disabledInputs, function(n) {
				return n === t ? null : n
			}), this._disabledInputs[this._disabledInputs.length] = t)
		},
		_isDisabledDatepicker: function(n) {
			if (!n) return !1;
			for (var t = 0; this._disabledInputs.length > t; t++)
				if (this._disabledInputs[t] === n) return !0;
			return !1
		},
		_getInst: function(t) {
			try {
				return n.data(t, "datepicker")
			} catch (i) {
				throw "Missing instance data for this datepicker";
			}
		},
		_optionDatepicker: function(t, i, r) {
			var e, h, o, s, f = this._getInst(t);
			return 2 === arguments.length && "string" == typeof i ? "defaults" === i ? n.extend({}, n.datepicker._defaults) : f ? "all" === i ? n.extend({}, f.settings) : this._get(f, i) : null : (e = i || {}, "string" == typeof i && (e = {}, e[i] = r), f && (this._curInst === f && this._hideDatepicker(), h = this._getDateDatepicker(t, !0), o = this._getMinMaxDate(f, "min"), s = this._getMinMaxDate(f, "max"), u(f.settings, e), null !== o && void 0 !== e.dateFormat && void 0 === e.minDate && (f.settings.minDate = this._formatDate(f, o)), null !== s && void 0 !== e.dateFormat && void 0 === e.maxDate && (f.settings.maxDate = this._formatDate(f, s)), "disabled" in e && (e.disabled ? this._disableDatepicker(t) : this._enableDatepicker(t)), this._attachments(n(t), f), this._autoSize(f), this._setDate(f, h), this._updateAlternate(f), this._updateDatepicker(f)), void 0)
		},
		_changeDatepicker: function(n, t, i) {
			this._optionDatepicker(n, t, i)
		},
		_refreshDatepicker: function(n) {
			var t = this._getInst(n);
			t && this._updateDatepicker(t)
		},
		_setDateDatepicker: function(n, t) {
			var i = this._getInst(n);
			i && (this._setDate(i, t), this._updateDatepicker(i), this._updateAlternate(i))
		},
		_getDateDatepicker: function(n, t) {
			var i = this._getInst(n);
			return i && !i.inline && this._setDateFromField(i, t), i ? this._getDate(i) : null
		},
		_doKeyDown: function(t) {
			var u, e, f, i = n.datepicker._getInst(t.target),
				r = !0,
				o = i.dpDiv.is(".ui-datepicker-rtl");
			if (i._keyEvent = !0, n.datepicker._datepickerShowing) switch (t.keyCode) {
				case 9:
					n.datepicker._hideDatepicker();
					r = !1;
					break;
				case 13:
					return f = n("td." + n.datepicker._dayOverClass + ":not(." + n.datepicker._currentClass + ")", i.dpDiv), f[0] && n.datepicker._selectDay(t.target, i.selectedMonth, i.selectedYear, f[0]), u = n.datepicker._get(i, "onSelect"), u ? (e = n.datepicker._formatDate(i), u.apply(i.input ? i.input[0] : null, [e, i])) : n.datepicker._hideDatepicker(), !1;
				case 27:
					n.datepicker._hideDatepicker();
					break;
				case 33:
					n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
					break;
				case 34:
					n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
					break;
				case 35:
					(t.ctrlKey || t.metaKey) && n.datepicker._clearDate(t.target);
					r = t.ctrlKey || t.metaKey;
					break;
				case 36:
					(t.ctrlKey || t.metaKey) && n.datepicker._gotoToday(t.target);
					r = t.ctrlKey || t.metaKey;
					break;
				case 37:
					(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? 1 : -1, "D");
					r = t.ctrlKey || t.metaKey;
					t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? -n.datepicker._get(i, "stepBigMonths") : -n.datepicker._get(i, "stepMonths"), "M");
					break;
				case 38:
					(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, -7, "D");
					r = t.ctrlKey || t.metaKey;
					break;
				case 39:
					(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, o ? -1 : 1, "D");
					r = t.ctrlKey || t.metaKey;
					t.originalEvent.altKey && n.datepicker._adjustDate(t.target, t.ctrlKey ? +n.datepicker._get(i, "stepBigMonths") : +n.datepicker._get(i, "stepMonths"), "M");
					break;
				case 40:
					(t.ctrlKey || t.metaKey) && n.datepicker._adjustDate(t.target, 7, "D");
					r = t.ctrlKey || t.metaKey;
					break;
				default:
					r = !1
			} else 36 === t.keyCode && t.ctrlKey ? n.datepicker._showDatepicker(this) : r = !1;
			r && (t.preventDefault(), t.stopPropagation())
		},
		_doKeyPress: function(t) {
			var i, r, u = n.datepicker._getInst(t.target);
			if (n.datepicker._get(u, "constrainInput")) return (i = n.datepicker._possibleChars(n.datepicker._get(u, "dateFormat")), r = String.fromCharCode(null == t.charCode ? t.keyCode : t.charCode), t.ctrlKey || t.metaKey || " " > r || !i || i.indexOf(r) > -1)
		},
		_doKeyUp: function(t) {
			var r, i = n.datepicker._getInst(t.target);
			if (i.input.val() !== i.lastVal) try {
				r = n.datepicker.parseDate(n.datepicker._get(i, "dateFormat"), i.input ? i.input.val() : null, n.datepicker._getFormatConfig(i));
				r && (n.datepicker._setDateFromField(i), n.datepicker._updateAlternate(i), n.datepicker._updateDatepicker(i))
			} catch (u) {}
			return !0
		},
		_showDatepicker: function(t) {
			if (t = t.target || t, "input" !== t.nodeName.toLowerCase() && (t = n("input", t.parentNode)[0]), !n.datepicker._isDisabledDatepicker(t) && n.datepicker._lastInput !== t) {
				var i, o, s, r, f, e, h;
				i = n.datepicker._getInst(t);
				n.datepicker._curInst && n.datepicker._curInst !== i && (n.datepicker._curInst.dpDiv.stop(!0, !0), i && n.datepicker._datepickerShowing && n.datepicker._hideDatepicker(n.datepicker._curInst.input[0]));
				o = n.datepicker._get(i, "beforeShow");
				s = o ? o.apply(t, [t, i]) : {};
				s !== !1 && (u(i.settings, s), i.lastVal = null, n.datepicker._lastInput = t, n.datepicker._setDateFromField(i), n.datepicker._inDialog && (t.value = ""), n.datepicker._pos || (n.datepicker._pos = n.datepicker._findPos(t), n.datepicker._pos[1] += t.offsetHeight), r = !1, n(t).parents().each(function() {
					return r |= "fixed" === n(this).css("position"), !r
				}), f = {
					left: n.datepicker._pos[0],
					top: n.datepicker._pos[1]
				}, n.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				}), n.datepicker._updateDatepicker(i), f = n.datepicker._checkOffset(i, f, r), i.dpDiv.css({
					position: n.datepicker._inDialog && n.blockUI ? "static" : r ? "fixed" : "absolute",
					display: "none",
					left: f.left + "px",
					top: f.top + "px"
				}), i.inline || (e = n.datepicker._get(i, "showAnim"), h = n.datepicker._get(i, "duration"), i.dpDiv.css("z-index", k(n(t)) + 1), n.datepicker._datepickerShowing = !0, n.effects && n.effects.effect[e] ? i.dpDiv.show(e, n.datepicker._get(i, "showOptions"), h) : i.dpDiv[e || "show"](e ? h : null), n.datepicker._shouldFocusInput(i) && i.input.trigger("focus"), n.datepicker._curInst = i))
			}
		},
		_updateDatepicker: function(t) {
			this.maxRows = 4;
			i = t;
			t.dpDiv.empty().append(this._generateHTML(t));
			this._attachHandlers(t);
			var r, u = this._getNumberOfMonths(t),
				f = u[1],
				e = t.dpDiv.find("." + this._dayOverClass + " a");
			e.length > 0 && a.apply(e.get(0));
			t.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			f > 1 && t.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", 17 * f + "em");
			t.dpDiv[(1 !== u[0] || 1 !== u[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			t.dpDiv[(this._get(t, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			t === n.datepicker._curInst && n.datepicker._datepickerShowing && n.datepicker._shouldFocusInput(t) && t.input.trigger("focus");
			t.yearshtml && (r = t.yearshtml, setTimeout(function() {
				r === t.yearshtml && t.yearshtml && t.dpDiv.find("select.ui-datepicker-year:first").replaceWith(t.yearshtml);
				r = t.yearshtml = null
			}, 0))
		},
		_shouldFocusInput: function(n) {
			return n.input && n.input.is(":visible") && !n.input.is(":disabled") && !n.input.is(":focus")
		},
		_checkOffset: function(t, i, r) {
			var u = t.dpDiv.outerWidth(),
				f = t.dpDiv.outerHeight(),
				h = t.input ? t.input.outerWidth() : 0,
				o = t.input ? t.input.outerHeight() : 0,
				e = document.documentElement.clientWidth + (r ? 0 : n(document).scrollLeft()),
				s = document.documentElement.clientHeight + (r ? 0 : n(document).scrollTop());
			return i.left -= this._get(t, "isRTL") ? u - h : 0, i.left -= r && i.left === t.input.offset().left ? n(document).scrollLeft() : 0, i.top -= r && i.top === t.input.offset().top + o ? n(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + u > e && e > u ? Math.abs(i.left + u - e) : 0), i.top -= Math.min(i.top, i.top + f > s && s > f ? Math.abs(f + o) : 0), i
		},
		_findPos: function(t) {
			for (var i, r = this._getInst(t), u = this._get(r, "isRTL"); t && ("hidden" === t.type || 1 !== t.nodeType || n.expr.filters.hidden(t));) t = t[u ? "previousSibling" : "nextSibling"];
			return i = n(t).offset(), [i.left, i.top]
		},
		_hideDatepicker: function(t) {
			var r, f, u, e, i = this._curInst;
			!i || t && i !== n.data(t, "datepicker") || this._datepickerShowing && (r = this._get(i, "showAnim"), f = this._get(i, "duration"), u = function() {
				n.datepicker._tidyDialog(i)
			}, n.effects && (n.effects.effect[r] || n.effects[r]) ? i.dpDiv.hide(r, n.datepicker._get(i, "showOptions"), f, u) : i.dpDiv["slideDown" === r ? "slideUp" : "fadeIn" === r ? "fadeOut" : "hide"](r ? f : null, u), r || u(), this._datepickerShowing = !1, e = this._get(i, "onClose"), e && e.apply(i.input ? i.input[0] : null, [i.input ? i.input.val() : "", i]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
				position: "absolute",
				left: "0",
				top: "-100px"
			}), n.blockUI && (n.unblockUI(), n("body").append(this.dpDiv))), this._inDialog = !1)
		},
		_tidyDialog: function(n) {
			n.dpDiv.removeClass(this._dialogClass).off(".ui-datepicker-calendar")
		},
		_checkExternalClick: function(t) {
			if (n.datepicker._curInst) {
				var i = n(t.target),
					r = n.datepicker._getInst(i[0]);
				(i[0].id === n.datepicker._mainDivId || 0 !== i.parents("#" + n.datepicker._mainDivId).length || i.hasClass(n.datepicker.markerClassName) || i.closest("." + n.datepicker._triggerClass).length || !n.datepicker._datepickerShowing || n.datepicker._inDialog && n.blockUI) && (!i.hasClass(n.datepicker.markerClassName) || n.datepicker._curInst === r) || n.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function(t, i, r) {
			var f = n(t),
				u = this._getInst(f[0]);
			this._isDisabledDatepicker(f[0]) || (this._adjustInstDate(u, i + ("M" === r ? this._get(u, "showCurrentAtPos") : 0), r), this._updateDatepicker(u))
		},
		_gotoToday: function(t) {
			var r, u = n(t),
				i = this._getInst(u[0]);
			this._get(i, "gotoCurrent") && i.currentDay ? (i.selectedDay = i.currentDay, i.drawMonth = i.selectedMonth = i.currentMonth, i.drawYear = i.selectedYear = i.currentYear) : (r = new Date, i.selectedDay = r.getDate(), i.drawMonth = i.selectedMonth = r.getMonth(), i.drawYear = i.selectedYear = r.getFullYear());
			this._notifyChange(i);
			this._adjustDate(u)
		},
		_selectMonthYear: function(t, i, r) {
			var f = n(t),
				u = this._getInst(f[0]);
			u["selected" + ("M" === r ? "Month" : "Year")] = u["draw" + ("M" === r ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10);
			this._notifyChange(u);
			this._adjustDate(f)
		},
		_selectDay: function(t, i, r, u) {
			var f, e = n(t);
			n(u).hasClass(this._unselectableClass) || this._isDisabledDatepicker(e[0]) || (f = this._getInst(e[0]), f.selectedDay = f.currentDay = n("a", u).html(), f.selectedMonth = f.currentMonth = i, f.selectedYear = f.currentYear = r, this._selectDate(t, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
		},
		_clearDate: function(t) {
			var i = n(t);
			this._selectDate(i, "")
		},
		_selectDate: function(t, i) {
			var u, f = n(t),
				r = this._getInst(f[0]);
			i = null != i ? i : this._formatDate(r);
			r.input && r.input.val(i);
			this._updateAlternate(r);
			u = this._get(r, "onSelect");
			u ? u.apply(r.input ? r.input[0] : null, [i, r]) : r.input && r.input.trigger("change");
			r.inline ? this._updateDatepicker(r) : (this._hideDatepicker(), this._lastInput = r.input[0], "object" != typeof r.input[0] && r.input.trigger("focus"), this._lastInput = null)
		},
		_updateAlternate: function(t) {
			var i, r, u, f = this._get(t, "altField");
			f && (i = this._get(t, "altFormat") || this._get(t, "dateFormat"), r = this._getDate(t), u = this.formatDate(i, r, this._getFormatConfig(t)), n(f).val(u))
		},
		noWeekends: function(n) {
			var t = n.getDay();
			return [t > 0 && 6 > t, ""]
		},
		iso8601Week: function(n) {
			var i, t = new Date(n.getTime());
			return t.setDate(t.getDate() + 4 - (t.getDay() || 7)), i = t.getTime(), t.setMonth(0), t.setDate(1), Math.floor(Math.round((i - t) / 864e5) / 7) + 1
		},
		parseDate: function(t, i, r) {
			if (null == t || null == i) throw "Invalid arguments";
			if (i = "object" == typeof i ? "" + i : i + "", "" === i) return null;
			for (var a, v, u, f = 0, y = (r ? r.shortYearCutoff : null) || this._defaults.shortYearCutoff, d = "string" != typeof y ? y : (new Date).getFullYear() % 100 + parseInt(y, 10), g = (r ? r.dayNamesShort : null) || this._defaults.dayNamesShort, nt = (r ? r.dayNames : null) || this._defaults.dayNames, tt = (r ? r.monthNamesShort : null) || this._defaults.monthNamesShort, it = (r ? r.monthNames : null) || this._defaults.monthNames, e = -1, s = -1, h = -1, p = -1, w = !1, l = function(n) {
					var i = t.length > o + 1 && t.charAt(o + 1) === n;
					return i && o++, i
				}, c = function(n) {
					var u = l(n),
						r = "@" === n ? 14 : "!" === n ? 20 : "y" === n && u ? 4 : "o" === n ? 3 : 2,
						e = "y" === n ? r : 1,
						o = RegExp("^\\d{" + e + "," + r + "}"),
						t = i.substring(f).match(o);
					if (!t) throw "Missing number at position " + f;
					return f += t[0].length, parseInt(t[0], 10)
				}, k = function(t, r, u) {
					var e = -1,
						o = n.map(l(t) ? u : r, function(n, t) {
							return [
								[t, n]
							]
						}).sort(function(n, t) {
							return -(n[1].length - t[1].length)
						});
					if (n.each(o, function(n, t) {
							var r = t[1];
							if (i.substr(f, r.length).toLowerCase() === r.toLowerCase()) return (e = t[0], f += r.length, !1)
						}), -1 !== e) return e + 1;
					throw "Unknown name at position " + f;
				}, b = function() {
					if (i.charAt(f) !== t.charAt(o)) throw "Unexpected literal at position " + f;
					f++
				}, o = 0; t.length > o; o++)
				if (w) "'" !== t.charAt(o) || l("'") ? b() : w = !1;
				else switch (t.charAt(o)) {
					case "d":
						h = c("d");
						break;
					case "D":
						k("D", g, nt);
						break;
					case "o":
						p = c("o");
						break;
					case "m":
						s = c("m");
						break;
					case "M":
						s = k("M", tt, it);
						break;
					case "y":
						e = c("y");
						break;
					case "@":
						u = new Date(c("@"));
						e = u.getFullYear();
						s = u.getMonth() + 1;
						h = u.getDate();
						break;
					case "!":
						u = new Date((c("!") - this._ticksTo1970) / 1e4);
						e = u.getFullYear();
						s = u.getMonth() + 1;
						h = u.getDate();
						break;
					case "'":
						l("'") ? b() : w = !0;
						break;
					default:
						b()
				}
				if (i.length > f && (v = i.substr(f), !/^\s+/.test(v))) throw "Extra/unparsed characters found in date: " + v;
			if (-1 === e ? e = (new Date).getFullYear() : 100 > e && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (d >= e ? 0 : -100)), p > -1)
				for (s = 1, h = p;;) {
					if (a = this._getDaysInMonth(e, s - 1), a >= h) break;
					s++;
					h -= a
				}
			if (u = this._daylightSavingAdjust(new Date(e, s - 1, h)), u.getFullYear() !== e || u.getMonth() + 1 !== s || u.getDate() !== h) throw "Invalid date";
			return u
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
		formatDate: function(n, t, i) {
			if (!t) return "";
			var u, h = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
				c = (i ? i.dayNames : null) || this._defaults.dayNames,
				l = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
				a = (i ? i.monthNames : null) || this._defaults.monthNames,
				f = function(t) {
					var i = n.length > u + 1 && n.charAt(u + 1) === t;
					return i && u++, i
				},
				e = function(n, t, i) {
					var r = "" + t;
					if (f(n))
						for (; i > r.length;) r = "0" + r;
					return r
				},
				s = function(n, t, i, r) {
					return f(n) ? r[t] : i[t]
				},
				r = "",
				o = !1;
			if (t)
				for (u = 0; n.length > u; u++)
					if (o) "'" !== n.charAt(u) || f("'") ? r += n.charAt(u) : o = !1;
					else switch (n.charAt(u)) {
						case "d":
							r += e("d", t.getDate(), 2);
							break;
						case "D":
							r += s("D", t.getDay(), h, c);
							break;
						case "o":
							r += e("o", Math.round((new Date(t.getFullYear(), t.getMonth(), t.getDate()).getTime() - new Date(t.getFullYear(), 0, 0).getTime()) / 864e5), 3);
							break;
						case "m":
							r += e("m", t.getMonth() + 1, 2);
							break;
						case "M":
							r += s("M", t.getMonth(), l, a);
							break;
						case "y":
							r += f("y") ? t.getFullYear() : (10 > t.getFullYear() % 100 ? "0" : "") + t.getFullYear() % 100;
							break;
						case "@":
							r += t.getTime();
							break;
						case "!":
							r += 1e4 * t.getTime() + this._ticksTo1970;
							break;
						case "'":
							f("'") ? r += "'" : o = !0;
							break;
						default:
							r += n.charAt(u)
					}
					return r
		},
		_possibleChars: function(n) {
			for (var i = "", r = !1, u = function(i) {
					var r = n.length > t + 1 && n.charAt(t + 1) === i;
					return r && t++, r
				}, t = 0; n.length > t; t++)
				if (r) "'" !== n.charAt(t) || u("'") ? i += n.charAt(t) : r = !1;
				else switch (n.charAt(t)) {
					case "d":
					case "m":
					case "y":
					case "@":
						i += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						u("'") ? i += "'" : r = !0;
						break;
					default:
						i += n.charAt(t)
				}
				return i
		},
		_get: function(n, t) {
			return void 0 !== n.settings[t] ? n.settings[t] : this._defaults[t]
		},
		_setDateFromField: function(n, t) {
			if (n.input.val() !== n.lastVal) {
				var f = this._get(n, "dateFormat"),
					r = n.lastVal = n.input ? n.input.val() : null,
					u = this._getDefaultDate(n),
					i = u,
					e = this._getFormatConfig(n);
				try {
					i = this.parseDate(f, r, e) || u
				} catch (o) {
					r = t ? "" : r
				}
				n.selectedDay = i.getDate();
				n.drawMonth = n.selectedMonth = i.getMonth();
				n.drawYear = n.selectedYear = i.getFullYear();
				n.currentDay = r ? i.getDate() : 0;
				n.currentMonth = r ? i.getMonth() : 0;
				n.currentYear = r ? i.getFullYear() : 0;
				this._adjustInstDate(n)
			}
		},
		_getDefaultDate: function(n) {
			return this._restrictMinMax(n, this._determineDate(n, this._get(n, "defaultDate"), new Date))
		},
		_determineDate: function(t, i, r) {
			var f = function(n) {
					var t = new Date;
					return t.setDate(t.getDate() + n), t
				},
				e = function(i) {
					try {
						return n.datepicker.parseDate(n.datepicker._get(t, "dateFormat"), i, n.datepicker._getFormatConfig(t))
					} catch (h) {}
					for (var o = (i.toLowerCase().match(/^c/) ? n.datepicker._getDate(t) : null) || new Date, f = o.getFullYear(), e = o.getMonth(), r = o.getDate(), s = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, u = s.exec(i); u;) {
						switch (u[2] || "d") {
							case "d":
							case "D":
								r += parseInt(u[1], 10);
								break;
							case "w":
							case "W":
								r += 7 * parseInt(u[1], 10);
								break;
							case "m":
							case "M":
								e += parseInt(u[1], 10);
								r = Math.min(r, n.datepicker._getDaysInMonth(f, e));
								break;
							case "y":
							case "Y":
								f += parseInt(u[1], 10);
								r = Math.min(r, n.datepicker._getDaysInMonth(f, e))
						}
						u = s.exec(i)
					}
					return new Date(f, e, r)
				},
				u = null == i || "" === i ? r : "string" == typeof i ? e(i) : "number" == typeof i ? isNaN(i) ? r : f(i) : new Date(i.getTime());
			return u = u && "Invalid Date" == "" + u ? r : u, u && (u.setHours(0), u.setMinutes(0), u.setSeconds(0), u.setMilliseconds(0)), this._daylightSavingAdjust(u)
		},
		_daylightSavingAdjust: function(n) {
			return n ? (n.setHours(n.getHours() > 12 ? n.getHours() + 2 : 0), n) : null
		},
		_setDate: function(n, t, i) {
			var u = !t,
				f = n.selectedMonth,
				e = n.selectedYear,
				r = this._restrictMinMax(n, this._determineDate(n, t, new Date));
			n.selectedDay = n.currentDay = r.getDate();
			n.drawMonth = n.selectedMonth = n.currentMonth = r.getMonth();
			n.drawYear = n.selectedYear = n.currentYear = r.getFullYear();
			f === n.selectedMonth && e === n.selectedYear || i || this._notifyChange(n);
			this._adjustInstDate(n);
			n.input && n.input.val(u ? "" : this._formatDate(n))
		},
		_getDate: function(n) {
			return !n.currentYear || n.input && "" === n.input.val() ? null : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay))
		},
		_attachHandlers: function(t) {
			var r = this._get(t, "stepMonths"),
				i = "#" + t.id.replace(/\\\\/g, "\\");
			t.dpDiv.find("[data-handler]").map(function() {
				var t = {
					prev: function() {
						n.datepicker._adjustDate(i, -r, "M")
					},
					next: function() {
						n.datepicker._adjustDate(i, +r, "M")
					},
					hide: function() {
						n.datepicker._hideDatepicker()
					},
					today: function() {
						n.datepicker._gotoToday(i)
					},
					selectDay: function() {
						return n.datepicker._selectDay(i, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
					},
					selectMonth: function() {
						return n.datepicker._selectMonthYear(i, this, "M"), !1
					},
					selectYear: function() {
						return n.datepicker._selectMonthYear(i, this, "Y"), !1
					}
				};
				n(this).on(this.getAttribute("data-event"), t[this.getAttribute("data-handler")])
			})
		},
		_generateHTML: function(n) {
			var b, s, rt, h, ut, k, ft, et, ri, c, ot, ui, fi, ei, oi, st, g, si, ht, nt, o, y, ct, p, lt, l, u, at, vt, yt, pt, tt, wt, i, bt, kt, d, a, it, dt = new Date,
				gt = this._daylightSavingAdjust(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate())),
				f = this._get(n, "isRTL"),
				li = this._get(n, "showButtonPanel"),
				hi = this._get(n, "hideIfNoPrevNext"),
				ni = this._get(n, "navigationAsDateFormat"),
				e = this._getNumberOfMonths(n),
				ai = this._get(n, "showCurrentAtPos"),
				ci = this._get(n, "stepMonths"),
				ti = 1 !== e[0] || 1 !== e[1],
				ii = this._daylightSavingAdjust(n.currentDay ? new Date(n.currentYear, n.currentMonth, n.currentDay) : new Date(9999, 9, 9)),
				w = this._getMinMaxDate(n, "min"),
				v = this._getMinMaxDate(n, "max"),
				t = n.drawMonth - ai,
				r = n.drawYear;
			if (0 > t && (t += 12, r--), v)
				for (b = this._daylightSavingAdjust(new Date(v.getFullYear(), v.getMonth() - e[0] * e[1] + 1, v.getDate())), b = w && w > b ? w : b; this._daylightSavingAdjust(new Date(r, t, 1)) > b;) t--, 0 > t && (t = 11, r--);
			for (n.drawMonth = t, n.drawYear = r, s = this._get(n, "prevText"), s = ni ? this.formatDate(s, this._daylightSavingAdjust(new Date(r, t - ci, 1)), this._getFormatConfig(n)) : s, rt = this._canAdjustMonth(n, -1, r, t) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + s + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "e" : "w") + "'>" + s + "<\/span><\/a>", h = this._get(n, "nextText"), h = ni ? this.formatDate(h, this._daylightSavingAdjust(new Date(r, t + ci, 1)), this._getFormatConfig(n)) : h, ut = this._canAdjustMonth(n, 1, r, t) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>" : hi ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + h + "'><span class='ui-icon ui-icon-circle-triangle-" + (f ? "w" : "e") + "'>" + h + "<\/span><\/a>", k = this._get(n, "currentText"), ft = this._get(n, "gotoCurrent") && n.currentDay ? ii : gt, k = ni ? this.formatDate(k, ft, this._getFormatConfig(n)) : k, et = n.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(n, "closeText") + "<\/button>", ri = li ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (f ? et : "") + (this._isInRange(n, ft) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + k + "<\/button>" : "") + (f ? "" : et) + "<\/div>" : "", c = parseInt(this._get(n, "firstDay"), 10), c = isNaN(c) ? 0 : c, ot = this._get(n, "showWeek"), ui = this._get(n, "dayNames"), fi = this._get(n, "dayNamesMin"), ei = this._get(n, "monthNames"), oi = this._get(n, "monthNamesShort"), st = this._get(n, "beforeShowDay"), g = this._get(n, "showOtherMonths"), si = this._get(n, "selectOtherMonths"), ht = this._getDefaultDate(n), nt = "", y = 0; e[0] > y; y++) {
				for (ct = "", this.maxRows = 4, p = 0; e[1] > p; p++) {
					if (lt = this._daylightSavingAdjust(new Date(r, t, n.selectedDay)), l = " ui-corner-all", u = "", ti) {
						if (u += "<div class='ui-datepicker-group", e[1] > 1) switch (p) {
							case 0:
								u += " ui-datepicker-group-first";
								l = " ui-corner-" + (f ? "right" : "left");
								break;
							case e[1] - 1:
								u += " ui-datepicker-group-last";
								l = " ui-corner-" + (f ? "left" : "right");
								break;
							default:
								u += " ui-datepicker-group-middle";
								l = ""
						}
						u += "'>"
					}
					for (u += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + l + "'>" + (/all|left/.test(l) && 0 === y ? f ? ut : rt : "") + (/all|right/.test(l) && 0 === y ? f ? rt : ut : "") + this._generateMonthYearHeader(n, t, r, w, v, y > 0 || p > 0, ei, oi) + "<\/div><table class='ui-datepicker-calendar'><thead><tr>", at = ot ? "<th class='ui-datepicker-week-col'>" + this._get(n, "weekHeader") + "<\/th>" : "", o = 0; 7 > o; o++) vt = (o + c) % 7, at += "<th scope='col'" + ((o + c + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + ui[vt] + "'>" + fi[vt] + "<\/span><\/th>";
					for (u += at + "<\/tr><\/thead><tbody>", yt = this._getDaysInMonth(r, t), r === n.selectedYear && t === n.selectedMonth && (n.selectedDay = Math.min(n.selectedDay, yt)), pt = (this._getFirstDayOfMonth(r, t) - c + 7) % 7, tt = Math.ceil((pt + yt) / 7), wt = ti ? this.maxRows > tt ? this.maxRows : tt : tt, this.maxRows = wt, i = this._daylightSavingAdjust(new Date(r, t, 1 - pt)), bt = 0; wt > bt; bt++) {
						for (u += "<tr>", kt = ot ? "<td class='ui-datepicker-week-col'>" + this._get(n, "calculateWeek")(i) + "<\/td>" : "", o = 0; 7 > o; o++) d = st ? st.apply(n.input ? n.input[0] : null, [i]) : [!0, ""], a = i.getMonth() !== t, it = a && !si || !d[0] || w && w > i || v && i > v, kt += "<td class='" + ((o + c + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (a ? " ui-datepicker-other-month" : "") + (i.getTime() === lt.getTime() && t === n.selectedMonth && n._keyEvent || ht.getTime() === i.getTime() && ht.getTime() === lt.getTime() ? " " + this._dayOverClass : "") + (it ? " " + this._unselectableClass + " ui-state-disabled" : "") + (a && !g ? "" : " " + d[1] + (i.getTime() === ii.getTime() ? " " + this._currentClass : "") + (i.getTime() === gt.getTime() ? " ui-datepicker-today" : "")) + "'" + (a && !g || !d[2] ? "" : " title='" + d[2].replace(/'/g, "&#39;") + "'") + (it ? "" : " data-handler='selectDay' data-event='click' data-month='" + i.getMonth() + "' data-year='" + i.getFullYear() + "'") + ">" + (a && !g ? "&#xa0;" : it ? "<span class='ui-state-default'>" + i.getDate() + "<\/span>" : "<a class='ui-state-default" + (i.getTime() === gt.getTime() ? " ui-state-highlight" : "") + (i.getTime() === ii.getTime() ? " ui-state-active" : "") + (a ? " ui-priority-secondary" : "") + "' href='#'>" + i.getDate() + "<\/a>") + "<\/td>", i.setDate(i.getDate() + 1), i = this._daylightSavingAdjust(i);
						u += kt + "<\/tr>"
					}
					t++;
					t > 11 && (t = 0, r++);
					u += "<\/tbody><\/table>" + (ti ? "<\/div>" + (e[0] > 0 && p === e[1] - 1 ? "<div class='ui-datepicker-row-break'><\/div>" : "") : "");
					ct += u
				}
				nt += ct
			}
			return nt += ri, n._keyEvent = !1, nt
		},
		_generateMonthYearHeader: function(n, t, i, r, u, f, e, o) {
			var k, d, h, v, y, p, s, a, w = this._get(n, "changeMonth"),
				b = this._get(n, "changeYear"),
				g = this._get(n, "showMonthAfterYear"),
				c = "<div class='ui-datepicker-title'>",
				l = "";
			if (f || !w) l += "<span class='ui-datepicker-month'>" + e[t] + "<\/span>";
			else {
				for (k = r && r.getFullYear() === i, d = u && u.getFullYear() === i, l += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", h = 0; 12 > h; h++)(!k || h >= r.getMonth()) && (!d || u.getMonth() >= h) && (l += "<option value='" + h + "'" + (h === t ? " selected='selected'" : "") + ">" + o[h] + "<\/option>");
				l += "<\/select>"
			}
			if (g || (c += l + (!f && w && b ? "" : "&#xa0;")), !n.yearshtml)
				if (n.yearshtml = "", f || !b) c += "<span class='ui-datepicker-year'>" + i + "<\/span>";
				else {
					for (v = this._get(n, "yearRange").split(":"), y = (new Date).getFullYear(), p = function(n) {
							var t = n.match(/c[+\-].*/) ? i + parseInt(n.substring(1), 10) : n.match(/[+\-].*/) ? y + parseInt(n, 10) : parseInt(n, 10);
							return isNaN(t) ? y : t
						}, s = p(v[0]), a = Math.max(s, p(v[1] || "")), s = r ? Math.max(s, r.getFullYear()) : s, a = u ? Math.min(a, u.getFullYear()) : a, n.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; a >= s; s++) n.yearshtml += "<option value='" + s + "'" + (s === i ? " selected='selected'" : "") + ">" + s + "<\/option>";
					n.yearshtml += "<\/select>";
					c += n.yearshtml;
					n.yearshtml = null
				}
			return c += this._get(n, "yearSuffix"), g && (c += (!f && w && b ? "" : "&#xa0;") + l), c + "<\/div>"
		},
		_adjustInstDate: function(n, t, i) {
			var u = n.selectedYear + ("Y" === i ? t : 0),
				f = n.selectedMonth + ("M" === i ? t : 0),
				e = Math.min(n.selectedDay, this._getDaysInMonth(u, f)) + ("D" === i ? t : 0),
				r = this._restrictMinMax(n, this._daylightSavingAdjust(new Date(u, f, e)));
			n.selectedDay = r.getDate();
			n.drawMonth = n.selectedMonth = r.getMonth();
			n.drawYear = n.selectedYear = r.getFullYear();
			("M" === i || "Y" === i) && this._notifyChange(n)
		},
		_restrictMinMax: function(n, t) {
			var i = this._getMinMaxDate(n, "min"),
				r = this._getMinMaxDate(n, "max"),
				u = i && i > t ? i : t;
			return r && u > r ? r : u
		},
		_notifyChange: function(n) {
			var t = this._get(n, "onChangeMonthYear");
			t && t.apply(n.input ? n.input[0] : null, [n.selectedYear, n.selectedMonth + 1, n])
		},
		_getNumberOfMonths: function(n) {
			var t = this._get(n, "numberOfMonths");
			return null == t ? [1, 1] : "number" == typeof t ? [1, t] : t
		},
		_getMinMaxDate: function(n, t) {
			return this._determineDate(n, this._get(n, t + "Date"), null)
		},
		_getDaysInMonth: function(n, t) {
			return 32 - this._daylightSavingAdjust(new Date(n, t, 32)).getDate()
		},
		_getFirstDayOfMonth: function(n, t) {
			return new Date(n, t, 1).getDay()
		},
		_canAdjustMonth: function(n, t, i, r) {
			var f = this._getNumberOfMonths(n),
				u = this._daylightSavingAdjust(new Date(i, r + (0 > t ? t : f[0] * f[1]), 1));
			return 0 > t && u.setDate(this._getDaysInMonth(u.getFullYear(), u.getMonth())), this._isInRange(n, u)
		},
		_isInRange: function(n, t) {
			var i, f, e = this._getMinMaxDate(n, "min"),
				o = this._getMinMaxDate(n, "max"),
				r = null,
				u = null,
				s = this._get(n, "yearRange");
			return s && (i = s.split(":"), f = (new Date).getFullYear(), r = parseInt(i[0], 10), u = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += f), i[1].match(/[+\-].*/) && (u += f)), (!e || t.getTime() >= e.getTime()) && (!o || t.getTime() <= o.getTime()) && (!r || t.getFullYear() >= r) && (!u || u >= t.getFullYear())
		},
		_getFormatConfig: function(n) {
			var t = this._get(n, "shortYearCutoff");
			return t = "string" != typeof t ? t : (new Date).getFullYear() % 100 + parseInt(t, 10), {
				shortYearCutoff: t,
				dayNamesShort: this._get(n, "dayNamesShort"),
				dayNames: this._get(n, "dayNames"),
				monthNamesShort: this._get(n, "monthNamesShort"),
				monthNames: this._get(n, "monthNames")
			}
		},
		_formatDate: function(n, t, i, r) {
			t || (n.currentDay = n.selectedDay, n.currentMonth = n.selectedMonth, n.currentYear = n.selectedYear);
			var u = t ? "object" == typeof t ? t : this._daylightSavingAdjust(new Date(r, i, t)) : this._daylightSavingAdjust(new Date(n.currentYear, n.currentMonth, n.currentDay));
			return this.formatDate(this._get(n, "dateFormat"), u, this._getFormatConfig(n))
		}
	});
	n.fn.datepicker = function(t) {
		if (!this.length) return this;
		n.datepicker.initialized || (n(document).on("mousedown", n.datepicker._checkExternalClick), n.datepicker.initialized = !0);
		0 === n("#" + n.datepicker._mainDivId).length && n("body").append(n.datepicker.dpDiv);
		var i = Array.prototype.slice.call(arguments, 1);
		return "string" != typeof t || "isDisabled" !== t && "getDate" !== t && "widget" !== t ? "option" === t && 2 === arguments.length && "string" == typeof arguments[1] ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i)) : this.each(function() {
			"string" == typeof t ? n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this].concat(i)) : n.datepicker._attachDatepicker(this, t)
		}) : n.datepicker["_" + t + "Datepicker"].apply(n.datepicker, [this[0]].concat(i))
	};
	n.datepicker = new c;
	n.datepicker.initialized = !1;
	n.datepicker.uuid = (new Date).getTime();
	n.datepicker.version = "1.12.1";
	n.datepicker;
	n.widget("ui.dialog", {
		version: "1.12.1",
		options: {
			appendTo: "body",
			autoOpen: !0,
			buttons: [],
			classes: {
				"ui-dialog": "ui-corner-all",
				"ui-dialog-titlebar": "ui-corner-all"
			},
			closeOnEscape: !0,
			closeText: "Close",
			draggable: !0,
			hide: null,
			height: "auto",
			maxHeight: null,
			maxWidth: null,
			minHeight: 150,
			minWidth: 150,
			modal: !1,
			position: {
				my: "center",
				at: "center",
				of: window,
				collision: "fit",
				using: function(t) {
					var i = n(this).css(t).offset().top;
					0 > i && n(this).css("top", t.top - i)
				}
			},
			resizable: !0,
			show: null,
			title: null,
			width: 300,
			beforeClose: null,
			close: null,
			drag: null,
			dragStart: null,
			dragStop: null,
			focus: null,
			open: null,
			resize: null,
			resizeStart: null,
			resizeStop: null
		},
		sizeRelatedOptions: {
			buttons: !0,
			height: !0,
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0,
			width: !0
		},
		resizableRelatedOptions: {
			maxHeight: !0,
			maxWidth: !0,
			minHeight: !0,
			minWidth: !0
		},
		_create: function() {
			this.originalCss = {
				display: this.element[0].style.display,
				width: this.element[0].style.width,
				minHeight: this.element[0].style.minHeight,
				maxHeight: this.element[0].style.maxHeight,
				height: this.element[0].style.height
			};
			this.originalPosition = {
				parent: this.element.parent(),
				index: this.element.parent().children().index(this.element)
			};
			this.originalTitle = this.element.attr("title");
			null == this.options.title && null != this.originalTitle && (this.options.title = this.originalTitle);
			this.options.disabled && (this.options.disabled = !1);
			this._createWrapper();
			this.element.show().removeAttr("title").appendTo(this.uiDialog);
			this._addClass("ui-dialog-content", "ui-widget-content");
			this._createTitlebar();
			this._createButtonPane();
			this.options.draggable && n.fn.draggable && this._makeDraggable();
			this.options.resizable && n.fn.resizable && this._makeResizable();
			this._isOpen = !1;
			this._trackFocus()
		},
		_init: function() {
			this.options.autoOpen && this.open()
		},
		_appendTo: function() {
			var t = this.options.appendTo;
			return t && (t.jquery || t.nodeType) ? n(t) : this.document.find(t || "body").eq(0)
		},
		_destroy: function() {
			var n, t = this.originalPosition;
			this._untrackInstance();
			this._destroyOverlay();
			this.element.removeUniqueId().css(this.originalCss).detach();
			this.uiDialog.remove();
			this.originalTitle && this.element.attr("title", this.originalTitle);
			n = t.parent.children().eq(t.index);
			n.length && n[0] !== this.element[0] ? n.before(this.element) : t.parent.append(this.element)
		},
		widget: function() {
			return this.uiDialog
		},
		disable: n.noop,
		enable: n.noop,
		close: function(t) {
			var i = this;
			this._isOpen && this._trigger("beforeClose", t) !== !1 && (this._isOpen = !1, this._focusedElement = null, this._destroyOverlay(), this._untrackInstance(), this.opener.filter(":focusable").trigger("focus").length || n.ui.safeBlur(n.ui.safeActiveElement(this.document[0])), this._hide(this.uiDialog, this.options.hide, function() {
				i._trigger("close", t)
			}))
		},
		isOpen: function() {
			return this._isOpen
		},
		moveToTop: function() {
			this._moveToTop()
		},
		_moveToTop: function(t, i) {
			var r = !1,
				f = this.uiDialog.siblings(".ui-front:visible").map(function() {
					return +n(this).css("z-index")
				}).get(),
				u = Math.max.apply(null, f);
			return u >= +this.uiDialog.css("z-index") && (this.uiDialog.css("z-index", u + 1), r = !0), r && !i && this._trigger("focus", t), r
		},
		open: function() {
			var t = this;
			return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = n(n.ui.safeActiveElement(this.document[0])), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this.overlay && this.overlay.css("z-index", this.uiDialog.css("z-index") - 1), this._show(this.uiDialog, this.options.show, function() {
				t._focusTabbable();
				t._trigger("focus")
			}), this._makeFocusTarget(), this._trigger("open"), void 0)
		},
		_focusTabbable: function() {
			var n = this._focusedElement;
			n || (n = this.element.find("[autofocus]"));
			n.length || (n = this.element.find(":tabbable"));
			n.length || (n = this.uiDialogButtonPane.find(":tabbable"));
			n.length || (n = this.uiDialogTitlebarClose.filter(":tabbable"));
			n.length || (n = this.uiDialog);
			n.eq(0).trigger("focus")
		},
		_keepFocus: function(t) {
			function i() {
				var t = n.ui.safeActiveElement(this.document[0]),
					i = this.uiDialog[0] === t || n.contains(this.uiDialog[0], t);
				i || this._focusTabbable()
			}
			t.preventDefault();
			i.call(this);
			this._delay(i)
		},
		_createWrapper: function() {
			this.uiDialog = n("<div>").hide().attr({
				tabIndex: -1,
				role: "dialog"
			}).appendTo(this._appendTo());
			this._addClass(this.uiDialog, "ui-dialog", "ui-widget ui-widget-content ui-front");
			this._on(this.uiDialog, {
				keydown: function(t) {
					if (this.options.closeOnEscape && !t.isDefaultPrevented() && t.keyCode && t.keyCode === n.ui.keyCode.ESCAPE) return t.preventDefault(), this.close(t), void 0;
					if (t.keyCode === n.ui.keyCode.TAB && !t.isDefaultPrevented()) {
						var i = this.uiDialog.find(":tabbable"),
							r = i.filter(":first"),
							u = i.filter(":last");
						t.target !== u[0] && t.target !== this.uiDialog[0] || t.shiftKey ? t.target !== r[0] && t.target !== this.uiDialog[0] || !t.shiftKey || (this._delay(function() {
							u.trigger("focus")
						}), t.preventDefault()) : (this._delay(function() {
							r.trigger("focus")
						}), t.preventDefault())
					}
				},
				mousedown: function(n) {
					this._moveToTop(n) && this._focusTabbable()
				}
			});
			this.element.find("[aria-describedby]").length || this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr("id")
			})
		},
		_createTitlebar: function() {
			var t;
			this.uiDialogTitlebar = n("<div>");
			this._addClass(this.uiDialogTitlebar, "ui-dialog-titlebar", "ui-widget-header ui-helper-clearfix");
			this._on(this.uiDialogTitlebar, {
				mousedown: function(t) {
					n(t.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.trigger("focus")
				}
			});
			this.uiDialogTitlebarClose = n("<button type='button'><\/button>").button({
				label: n("<a>").text(this.options.closeText).html(),
				icon: "ui-icon-closethick",
				showLabel: !1
			}).appendTo(this.uiDialogTitlebar);
			this._addClass(this.uiDialogTitlebarClose, "ui-dialog-titlebar-close");
			this._on(this.uiDialogTitlebarClose, {
				click: function(n) {
					n.preventDefault();
					this.close(n)
				}
			});
			t = n("<span>").uniqueId().prependTo(this.uiDialogTitlebar);
			this._addClass(t, "ui-dialog-title");
			this._title(t);
			this.uiDialogTitlebar.prependTo(this.uiDialog);
			this.uiDialog.attr({
				"aria-labelledby": t.attr("id")
			})
		},
		_title: function(n) {
			this.options.title ? n.text(this.options.title) : n.html("&#160;")
		},
		_createButtonPane: function() {
			this.uiDialogButtonPane = n("<div>");
			this._addClass(this.uiDialogButtonPane, "ui-dialog-buttonpane", "ui-widget-content ui-helper-clearfix");
			this.uiButtonSet = n("<div>").appendTo(this.uiDialogButtonPane);
			this._addClass(this.uiButtonSet, "ui-dialog-buttonset");
			this._createButtons()
		},
		_createButtons: function() {
			var i = this,
				t = this.options.buttons;
			return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), n.isEmptyObject(t) || n.isArray(t) && !t.length ? (this._removeClass(this.uiDialog, "ui-dialog-buttons"), void 0) : (n.each(t, function(t, r) {
				var u, f;
				r = n.isFunction(r) ? {
					click: r,
					text: t
				} : r;
				r = n.extend({
					type: "button"
				}, r);
				u = r.click;
				f = {
					icon: r.icon,
					iconPosition: r.iconPosition,
					showLabel: r.showLabel,
					icons: r.icons,
					text: r.text
				};
				delete r.click;
				delete r.icon;
				delete r.iconPosition;
				delete r.showLabel;
				delete r.icons;
				"boolean" == typeof r.text && delete r.text;
				n("<button><\/button>", r).button(f).appendTo(i.uiButtonSet).on("click", function() {
					u.apply(i.element[0], arguments)
				})
			}), this._addClass(this.uiDialog, "ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
		},
		_makeDraggable: function() {
			function i(n) {
				return {
					position: n.position,
					offset: n.offset
				}
			}
			var t = this,
				r = this.options;
			this.uiDialog.draggable({
				cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
				handle: ".ui-dialog-titlebar",
				containment: "document",
				start: function(r, u) {
					t._addClass(n(this), "ui-dialog-dragging");
					t._blockFrames();
					t._trigger("dragStart", r, i(u))
				},
				drag: function(n, r) {
					t._trigger("drag", n, i(r))
				},
				stop: function(u, f) {
					var e = f.offset.left - t.document.scrollLeft(),
						o = f.offset.top - t.document.scrollTop();
					r.position = {
						my: "left top",
						at: "left" + (e >= 0 ? "+" : "") + e + " top" + (o >= 0 ? "+" : "") + o,
						of: t.window
					};
					t._removeClass(n(this), "ui-dialog-dragging");
					t._unblockFrames();
					t._trigger("dragStop", u, i(f))
				}
			})
		},
		_makeResizable: function() {
			function r(n) {
				return {
					originalPosition: n.originalPosition,
					originalSize: n.originalSize,
					position: n.position,
					size: n.size
				}
			}
			var t = this,
				i = this.options,
				u = i.resizable,
				f = this.uiDialog.css("position"),
				e = "string" == typeof u ? u : "n,e,s,w,se,sw,ne,nw";
			this.uiDialog.resizable({
				cancel: ".ui-dialog-content",
				containment: "document",
				alsoResize: this.element,
				maxWidth: i.maxWidth,
				maxHeight: i.maxHeight,
				minWidth: i.minWidth,
				minHeight: this._minHeight(),
				handles: e,
				start: function(i, u) {
					t._addClass(n(this), "ui-dialog-resizing");
					t._blockFrames();
					t._trigger("resizeStart", i, r(u))
				},
				resize: function(n, i) {
					t._trigger("resize", n, r(i))
				},
				stop: function(u, f) {
					var e = t.uiDialog.offset(),
						o = e.left - t.document.scrollLeft(),
						s = e.top - t.document.scrollTop();
					i.height = t.uiDialog.height();
					i.width = t.uiDialog.width();
					i.position = {
						my: "left top",
						at: "left" + (o >= 0 ? "+" : "") + o + " top" + (s >= 0 ? "+" : "") + s,
						of: t.window
					};
					t._removeClass(n(this), "ui-dialog-resizing");
					t._unblockFrames();
					t._trigger("resizeStop", u, r(f))
				}
			}).css("position", f)
		},
		_trackFocus: function() {
			this._on(this.widget(), {
				focusin: function(t) {
					this._makeFocusTarget();
					this._focusedElement = n(t.target)
				}
			})
		},
		_makeFocusTarget: function() {
			this._untrackInstance();
			this._trackingInstances().unshift(this)
		},
		_untrackInstance: function() {
			var t = this._trackingInstances(),
				i = n.inArray(this, t); - 1 !== i && t.splice(i, 1)
		},
		_trackingInstances: function() {
			var n = this.document.data("ui-dialog-instances");
			return n || (n = [], this.document.data("ui-dialog-instances", n)), n
		},
		_minHeight: function() {
			var n = this.options;
			return "auto" === n.height ? n.minHeight : Math.min(n.minHeight, n.height)
		},
		_position: function() {
			var n = this.uiDialog.is(":visible");
			n || this.uiDialog.show();
			this.uiDialog.position(this.options.position);
			n || this.uiDialog.hide()
		},
		_setOptions: function(t) {
			var i = this,
				r = !1,
				u = {};
			n.each(t, function(n, t) {
				i._setOption(n, t);
				n in i.sizeRelatedOptions && (r = !0);
				n in i.resizableRelatedOptions && (u[n] = t)
			});
			r && (this._size(), this._position());
			this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", u)
		},
		_setOption: function(t, i) {
			var f, u, r = this.uiDialog;
			"disabled" !== t && (this._super(t, i), "appendTo" === t && this.uiDialog.appendTo(this._appendTo()), "buttons" === t && this._createButtons(), "closeText" === t && this.uiDialogTitlebarClose.button({
				label: n("<a>").text("" + this.options.closeText).html()
			}), "draggable" === t && (f = r.is(":data(ui-draggable)"), f && !i && r.draggable("destroy"), !f && i && this._makeDraggable()), "position" === t && this._position(), "resizable" === t && (u = r.is(":data(ui-resizable)"), u && !i && r.resizable("destroy"), u && "string" == typeof i && r.resizable("option", "handles", i), u || i === !1 || this._makeResizable()), "title" === t && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
		},
		_size: function() {
			var t, i, r, n = this.options;
			this.element.show().css({
				width: "auto",
				minHeight: 0,
				maxHeight: "none",
				height: 0
			});
			n.minWidth > n.width && (n.width = n.minWidth);
			t = this.uiDialog.css({
				height: "auto",
				width: n.width
			}).outerHeight();
			i = Math.max(0, n.minHeight - t);
			r = "number" == typeof n.maxHeight ? Math.max(0, n.maxHeight - t) : "none";
			"auto" === n.height ? this.element.css({
				minHeight: i,
				maxHeight: r,
				height: "auto"
			}) : this.element.height(Math.max(0, n.height - t));
			this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
		},
		_blockFrames: function() {
			this.iframeBlocks = this.document.find("iframe").map(function() {
				var t = n(this);
				return n("<div>").css({
					position: "absolute",
					width: t.outerWidth(),
					height: t.outerHeight()
				}).appendTo(t.parent()).offset(t.offset())[0]
			})
		},
		_unblockFrames: function() {
			this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
		},
		_allowInteraction: function(t) {
			return n(t.target).closest(".ui-dialog").length ? !0 : !!n(t.target).closest(".ui-datepicker").length
		},
		_createOverlay: function() {
			if (this.options.modal) {
				var t = !0;
				this._delay(function() {
					t = !1
				});
				this.document.data("ui-dialog-overlays") || this._on(this.document, {
					focusin: function(n) {
						t || this._allowInteraction(n) || (n.preventDefault(), this._trackingInstances()[0]._focusTabbable())
					}
				});
				this.overlay = n("<div>").appendTo(this._appendTo());
				this._addClass(this.overlay, null, "ui-widget-overlay ui-front");
				this._on(this.overlay, {
					mousedown: "_keepFocus"
				});
				this.document.data("ui-dialog-overlays", (this.document.data("ui-dialog-overlays") || 0) + 1)
			}
		},
		_destroyOverlay: function() {
			if (this.options.modal && this.overlay) {
				var n = this.document.data("ui-dialog-overlays") - 1;
				n ? this.document.data("ui-dialog-overlays", n) : (this._off(this.document, "focusin"), this.document.removeData("ui-dialog-overlays"));
				this.overlay.remove();
				this.overlay = null
			}
		}
	});
	n.uiBackCompat !== !1 && n.widget("ui.dialog", n.ui.dialog, {
		options: {
			dialogClass: ""
		},
		_createWrapper: function() {
			this._super();
			this.uiDialog.addClass(this.options.dialogClass)
		},
		_setOption: function(n, t) {
			"dialogClass" === n && this.uiDialog.removeClass(this.options.dialogClass).addClass(t);
			this._superApply(arguments)
		}
	});
	n.ui.dialog;
	n.widget("ui.progressbar", {
		version: "1.12.1",
		options: {
			classes: {
				"ui-progressbar": "ui-corner-all",
				"ui-progressbar-value": "ui-corner-left",
				"ui-progressbar-complete": "ui-corner-right"
			},
			max: 100,
			value: 0,
			change: null,
			complete: null
		},
		min: 0,
		_create: function() {
			this.oldValue = this.options.value = this._constrainedValue();
			this.element.attr({
				role: "progressbar",
				"aria-valuemin": this.min
			});
			this._addClass("ui-progressbar", "ui-widget ui-widget-content");
			this.valueDiv = n("<div>").appendTo(this.element);
			this._addClass(this.valueDiv, "ui-progressbar-value", "ui-widget-header");
			this._refreshValue()
		},
		_destroy: function() {
			this.element.removeAttr("role aria-valuemin aria-valuemax aria-valuenow");
			this.valueDiv.remove()
		},
		value: function(n) {
			return void 0 === n ? this.options.value : (this.options.value = this._constrainedValue(n), this._refreshValue(), void 0)
		},
		_constrainedValue: function(n) {
			return void 0 === n && (n = this.options.value), this.indeterminate = n === !1, "number" != typeof n && (n = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, n))
		},
		_setOptions: function(n) {
			var t = n.value;
			delete n.value;
			this._super(n);
			this.options.value = this._constrainedValue(t);
			this._refreshValue()
		},
		_setOption: function(n, t) {
			"max" === n && (t = Math.max(this.min, t));
			this._super(n, t)
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this.element.attr("aria-disabled", n);
			this._toggleClass(null, "ui-state-disabled", !!n)
		},
		_percentage: function() {
			return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
		},
		_refreshValue: function() {
			var t = this.options.value,
				i = this._percentage();
			this.valueDiv.toggle(this.indeterminate || t > this.min).width(i.toFixed(0) + "%");
			this._toggleClass(this.valueDiv, "ui-progressbar-complete", null, t === this.options.max)._toggleClass("ui-progressbar-indeterminate", null, this.indeterminate);
			this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = n("<div>").appendTo(this.valueDiv), this._addClass(this.overlayDiv, "ui-progressbar-overlay"))) : (this.element.attr({
				"aria-valuemax": this.options.max,
				"aria-valuenow": t
			}), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
			this.oldValue !== t && (this.oldValue = t, this._trigger("change"));
			t === this.options.max && this._trigger("complete")
		}
	});
	n.widget("ui.selectmenu", [n.ui.formResetMixin, {
		version: "1.12.1",
		defaultElement: "<select>",
		options: {
			appendTo: null,
			classes: {
				"ui-selectmenu-button-open": "ui-corner-top",
				"ui-selectmenu-button-closed": "ui-corner-all"
			},
			disabled: null,
			icons: {
				button: "ui-icon-triangle-1-s"
			},
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			width: !1,
			change: null,
			close: null,
			focus: null,
			open: null,
			select: null
		},
		_create: function() {
			var t = this.element.uniqueId().attr("id");
			this.ids = {
				element: t,
				button: t + "-button",
				menu: t + "-menu"
			};
			this._drawButton();
			this._drawMenu();
			this._bindFormResetHandler();
			this._rendered = !1;
			this.menuItems = n()
		},
		_drawButton: function() {
			var t, i = this,
				r = this._parseOption(this.element.find("option:selected"), this.element[0].selectedIndex);
			this.labels = this.element.labels().attr("for", this.ids.button);
			this._on(this.labels, {
				click: function(n) {
					this.button.focus();
					n.preventDefault()
				}
			});
			this.element.hide();
			this.button = n("<span>", {
				tabindex: this.options.disabled ? -1 : 0,
				id: this.ids.button,
				role: "combobox",
				"aria-expanded": "false",
				"aria-autocomplete": "list",
				"aria-owns": this.ids.menu,
				"aria-haspopup": "true",
				title: this.element.attr("title")
			}).insertAfter(this.element);
			this._addClass(this.button, "ui-selectmenu-button ui-selectmenu-button-closed", "ui-button ui-widget");
			t = n("<span>").appendTo(this.button);
			this._addClass(t, "ui-selectmenu-icon", "ui-icon " + this.options.icons.button);
			this.buttonItem = this._renderButtonItem(r).appendTo(this.button);
			this.options.width !== !1 && this._resizeButton();
			this._on(this.button, this._buttonEvents);
			this.button.one("focusin", function() {
				i._rendered || i._refreshMenu()
			})
		},
		_drawMenu: function() {
			var t = this;
			this.menu = n("<ul>", {
				"aria-hidden": "true",
				"aria-labelledby": this.ids.button,
				id: this.ids.menu
			});
			this.menuWrap = n("<div>").append(this.menu);
			this._addClass(this.menuWrap, "ui-selectmenu-menu", "ui-front");
			this.menuWrap.appendTo(this._appendTo());
			this.menuInstance = this.menu.menu({
				classes: {
					"ui-menu": "ui-corner-bottom"
				},
				role: "listbox",
				select: function(n, i) {
					n.preventDefault();
					t._setSelection();
					t._select(i.item.data("ui-selectmenu-item"), n)
				},
				focus: function(n, i) {
					var r = i.item.data("ui-selectmenu-item");
					null != t.focusIndex && r.index !== t.focusIndex && (t._trigger("focus", n, {
						item: r
					}), t.isOpen || t._select(r, n));
					t.focusIndex = r.index;
					t.button.attr("aria-activedescendant", t.menuItems.eq(r.index).attr("id"))
				}
			}).menu("instance");
			this.menuInstance._off(this.menu, "mouseleave");
			this.menuInstance._closeOnDocumentClick = function() {
				return !1
			};
			this.menuInstance._isDivider = function() {
				return !1
			}
		},
		refresh: function() {
			this._refreshMenu();
			this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(this._getSelectedItem().data("ui-selectmenu-item") || {}));
			null === this.options.width && this._resizeButton()
		},
		_refreshMenu: function() {
			var n, t = this.element.find("option");
			this.menu.empty();
			this._parseOptions(t);
			this._renderMenu(this.menu, this.items);
			this.menuInstance.refresh();
			this.menuItems = this.menu.find("li").not(".ui-selectmenu-optgroup").find(".ui-menu-item-wrapper");
			this._rendered = !0;
			t.length && (n = this._getSelectedItem(), this.menuInstance.focus(null, n), this._setAria(n.data("ui-selectmenu-item")), this._setOption("disabled", this.element.prop("disabled")))
		},
		open: function(n) {
			this.options.disabled || (this._rendered ? (this._removeClass(this.menu.find(".ui-state-active"), null, "ui-state-active"), this.menuInstance.focus(null, this._getSelectedItem())) : this._refreshMenu(), this.menuItems.length && (this.isOpen = !0, this._toggleAttr(), this._resizeMenu(), this._position(), this._on(this.document, this._documentClick), this._trigger("open", n)))
		},
		_position: function() {
			this.menuWrap.position(n.extend({
				of: this.button
			}, this.options.position))
		},
		close: function(n) {
			this.isOpen && (this.isOpen = !1, this._toggleAttr(), this.range = null, this._off(this.document), this._trigger("close", n))
		},
		widget: function() {
			return this.button
		},
		menuWidget: function() {
			return this.menu
		},
		_renderButtonItem: function(t) {
			var i = n("<span>");
			return this._setText(i, t.label), this._addClass(i, "ui-selectmenu-text"), i
		},
		_renderMenu: function(t, i) {
			var r = this,
				u = "";
			n.each(i, function(i, f) {
				var e;
				f.optgroup !== u && (e = n("<li>", {
					text: f.optgroup
				}), r._addClass(e, "ui-selectmenu-optgroup", "ui-menu-divider" + (f.element.parent("optgroup").prop("disabled") ? " ui-state-disabled" : "")), e.appendTo(t), u = f.optgroup);
				r._renderItemData(t, f)
			})
		},
		_renderItemData: function(n, t) {
			return this._renderItem(n, t).data("ui-selectmenu-item", t)
		},
		_renderItem: function(t, i) {
			var r = n("<li>"),
				u = n("<div>", {
					title: i.element.attr("title")
				});
			return i.disabled && this._addClass(r, null, "ui-state-disabled"), this._setText(u, i.label), r.append(u).appendTo(t)
		},
		_setText: function(n, t) {
			t ? n.text(t) : n.html("&#160;")
		},
		_move: function(n, t) {
			var i, r, u = ".ui-menu-item";
			this.isOpen ? i = this.menuItems.eq(this.focusIndex).parent("li") : (i = this.menuItems.eq(this.element[0].selectedIndex).parent("li"), u += ":not(.ui-state-disabled)");
			r = "first" === n || "last" === n ? i["first" === n ? "prevAll" : "nextAll"](u).eq(-1) : i[n + "All"](u).eq(0);
			r.length && this.menuInstance.focus(t, r)
		},
		_getSelectedItem: function() {
			return this.menuItems.eq(this.element[0].selectedIndex).parent("li")
		},
		_toggle: function(n) {
			this[this.isOpen ? "close" : "open"](n)
		},
		_setSelection: function() {
			var n;
			this.range && (window.getSelection ? (n = window.getSelection(), n.removeAllRanges(), n.addRange(this.range)) : this.range.select(), this.button.focus())
		},
		_documentClick: {
			mousedown: function(t) {
				this.isOpen && (n(t.target).closest(".ui-selectmenu-menu, #" + n.ui.escapeSelector(this.ids.button)).length || this.close(t))
			}
		},
		_buttonEvents: {
			mousedown: function() {
				var n;
				window.getSelection ? (n = window.getSelection(), n.rangeCount && (this.range = n.getRangeAt(0))) : this.range = document.selection.createRange()
			},
			click: function(n) {
				this._setSelection();
				this._toggle(n)
			},
			keydown: function(t) {
				var i = !0;
				switch (t.keyCode) {
					case n.ui.keyCode.TAB:
					case n.ui.keyCode.ESCAPE:
						this.close(t);
						i = !1;
						break;
					case n.ui.keyCode.ENTER:
						this.isOpen && this._selectFocusedItem(t);
						break;
					case n.ui.keyCode.UP:
						t.altKey ? this._toggle(t) : this._move("prev", t);
						break;
					case n.ui.keyCode.DOWN:
						t.altKey ? this._toggle(t) : this._move("next", t);
						break;
					case n.ui.keyCode.SPACE:
						this.isOpen ? this._selectFocusedItem(t) : this._toggle(t);
						break;
					case n.ui.keyCode.LEFT:
						this._move("prev", t);
						break;
					case n.ui.keyCode.RIGHT:
						this._move("next", t);
						break;
					case n.ui.keyCode.HOME:
					case n.ui.keyCode.PAGE_UP:
						this._move("first", t);
						break;
					case n.ui.keyCode.END:
					case n.ui.keyCode.PAGE_DOWN:
						this._move("last", t);
						break;
					default:
						this.menu.trigger(t);
						i = !1
				}
				i && t.preventDefault()
			}
		},
		_selectFocusedItem: function(n) {
			var t = this.menuItems.eq(this.focusIndex).parent("li");
			t.hasClass("ui-state-disabled") || this._select(t.data("ui-selectmenu-item"), n)
		},
		_select: function(n, t) {
			var i = this.element[0].selectedIndex;
			this.element[0].selectedIndex = n.index;
			this.buttonItem.replaceWith(this.buttonItem = this._renderButtonItem(n));
			this._setAria(n);
			this._trigger("select", t, {
				item: n
			});
			n.index !== i && this._trigger("change", t, {
				item: n
			});
			this.close(t)
		},
		_setAria: function(n) {
			var t = this.menuItems.eq(n.index).attr("id");
			this.button.attr({
				"aria-labelledby": t,
				"aria-activedescendant": t
			});
			this.menu.attr("aria-activedescendant", t)
		},
		_setOption: function(n, t) {
			if ("icons" === n) {
				var i = this.button.find("span.ui-icon");
				this._removeClass(i, null, this.options.icons.button)._addClass(i, null, t.button)
			}
			this._super(n, t);
			"appendTo" === n && this.menuWrap.appendTo(this._appendTo());
			"width" === n && this._resizeButton()
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this.menuInstance.option("disabled", n);
			this.button.attr("aria-disabled", n);
			this._toggleClass(this.button, null, "ui-state-disabled", n);
			this.element.prop("disabled", n);
			n ? (this.button.attr("tabindex", -1), this.close()) : this.button.attr("tabindex", 0)
		},
		_appendTo: function() {
			var t = this.options.appendTo;
			return t && (t = t.jquery || t.nodeType ? n(t) : this.document.find(t).eq(0)), t && t[0] || (t = this.element.closest(".ui-front, dialog")), t.length || (t = this.document[0].body), t
		},
		_toggleAttr: function() {
			this.button.attr("aria-expanded", this.isOpen);
			this._removeClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "closed" : "open"))._addClass(this.button, "ui-selectmenu-button-" + (this.isOpen ? "open" : "closed"))._toggleClass(this.menuWrap, "ui-selectmenu-open", null, this.isOpen);
			this.menu.attr("aria-hidden", !this.isOpen)
		},
		_resizeButton: function() {
			var n = this.options.width;
			return n === !1 ? (this.button.css("width", ""), void 0) : (null === n && (n = this.element.show().outerWidth(), this.element.hide()), this.button.outerWidth(n), void 0)
		},
		_resizeMenu: function() {
			this.menu.outerWidth(Math.max(this.button.outerWidth(), this.menu.width("").outerWidth() + 1))
		},
		_getCreateOptions: function() {
			var n = this._super();
			return n.disabled = this.element.prop("disabled"), n
		},
		_parseOptions: function(t) {
			var r = this,
				i = [];
			t.each(function(t, u) {
				i.push(r._parseOption(n(u), t))
			});
			this.items = i
		},
		_parseOption: function(n, t) {
			var i = n.parent("optgroup");
			return {
				element: n,
				index: t,
				value: n.val(),
				label: n.text(),
				optgroup: i.attr("label") || "",
				disabled: i.prop("disabled") || n.prop("disabled")
			}
		},
		_destroy: function() {
			this._unbindFormResetHandler();
			this.menuWrap.remove();
			this.button.remove();
			this.element.show();
			this.element.removeUniqueId();
			this.labels.attr("for", this.ids.element)
		}
	}]);
	n.widget("ui.slider", n.ui.mouse, {
		version: "1.12.1",
		widgetEventPrefix: "slide",
		options: {
			animate: !1,
			classes: {
				"ui-slider": "ui-corner-all",
				"ui-slider-handle": "ui-corner-all",
				"ui-slider-range": "ui-corner-all ui-widget-header"
			},
			distance: 0,
			max: 100,
			min: 0,
			orientation: "horizontal",
			range: !1,
			step: 1,
			value: 0,
			values: null,
			change: null,
			slide: null,
			start: null,
			stop: null
		},
		numPages: 5,
		_create: function() {
			this._keySliding = !1;
			this._mouseSliding = !1;
			this._animateOff = !0;
			this._handleIndex = null;
			this._detectOrientation();
			this._mouseInit();
			this._calculateNewMax();
			this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content");
			this._refresh();
			this._animateOff = !1
		},
		_refresh: function() {
			this._createRange();
			this._createHandles();
			this._setupEvents();
			this._refreshValue()
		},
		_createHandles: function() {
			var r, i, u = this.options,
				t = this.element.find(".ui-slider-handle"),
				f = [];
			for (i = u.values && u.values.length || 1, t.length > i && (t.slice(i).remove(), t = t.slice(0, i)), r = t.length; i > r; r++) f.push("<span tabindex='0'><\/span>");
			this.handles = t.add(n(f.join("")).appendTo(this.element));
			this._addClass(this.handles, "ui-slider-handle", "ui-state-default");
			this.handle = this.handles.eq(0);
			this.handles.each(function(t) {
				n(this).data("ui-slider-handle-index", t).attr("tabIndex", 0)
			})
		},
		_createRange: function() {
			var t = this.options;
			t.range ? (t.range === !0 && (t.values ? t.values.length && 2 !== t.values.length ? t.values = [t.values[0], t.values[0]] : n.isArray(t.values) && (t.values = t.values.slice(0)) : t.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({
				left: "",
				bottom: ""
			})) : (this.range = n("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === t.range || "max" === t.range) && this._addClass(this.range, "ui-slider-range-" + t.range)) : (this.range && this.range.remove(), this.range = null)
		},
		_setupEvents: function() {
			this._off(this.handles);
			this._on(this.handles, this._handleEvents);
			this._hoverable(this.handles);
			this._focusable(this.handles)
		},
		_destroy: function() {
			this.handles.remove();
			this.range && this.range.remove();
			this._mouseDestroy()
		},
		_mouseCapture: function(t) {
			var s, f, r, i, u, h, e, c, o = this,
				l = this.options;
			return l.disabled ? !1 : (this.elementSize = {
				width: this.element.outerWidth(),
				height: this.element.outerHeight()
			}, this.elementOffset = this.element.offset(), s = {
				x: t.pageX,
				y: t.pageY
			}, f = this._normValueFromMouse(s), r = this._valueMax() - this._valueMin() + 1, this.handles.each(function(t) {
				var e = Math.abs(f - o.values(t));
				(r > e || r === e && (t === o._lastChangedValue || o.values(t) === l.min)) && (r = e, i = n(this), u = t)
			}), h = this._start(t, u), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = u, this._addClass(i, null, "ui-state-active"), i.trigger("focus"), e = i.offset(), c = !n(t.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = c ? {
				left: 0,
				top: 0
			} : {
				left: t.pageX - e.left - i.width() / 2,
				top: t.pageY - e.top - i.height() / 2 - (parseInt(i.css("borderTopWidth"), 10) || 0) - (parseInt(i.css("borderBottomWidth"), 10) || 0) + (parseInt(i.css("marginTop"), 10) || 0)
			}, this.handles.hasClass("ui-state-hover") || this._slide(t, u, f), this._animateOff = !0, !0))
		},
		_mouseStart: function() {
			return !0
		},
		_mouseDrag: function(n) {
			var t = {
					x: n.pageX,
					y: n.pageY
				},
				i = this._normValueFromMouse(t);
			return this._slide(n, this._handleIndex, i), !1
		},
		_mouseStop: function(n) {
			return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(n, this._handleIndex), this._change(n, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
		},
		_detectOrientation: function() {
			this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
		},
		_normValueFromMouse: function(n) {
			var i, r, t, u, f;
			return "horizontal" === this.orientation ? (i = this.elementSize.width, r = n.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (i = this.elementSize.height, r = n.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), t = r / i, t > 1 && (t = 1), 0 > t && (t = 0), "vertical" === this.orientation && (t = 1 - t), u = this._valueMax() - this._valueMin(), f = this._valueMin() + t * u, this._trimAlignValue(f)
		},
		_uiHash: function(n, t, i) {
			var r = {
				handle: this.handles[n],
				handleIndex: n,
				value: void 0 !== t ? t : this.value()
			};
			return this._hasMultipleValues() && (r.value = void 0 !== t ? t : this.values(n), r.values = i || this.values()), r
		},
		_hasMultipleValues: function() {
			return this.options.values && this.options.values.length
		},
		_start: function(n, t) {
			return this._trigger("start", n, this._uiHash(t))
		},
		_slide: function(n, t, i) {
			var u, r, f = this.value(),
				e = this.values();
			this._hasMultipleValues() && (r = this.values(t ? 0 : 1), f = this.values(t), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === t ? Math.min(r, i) : Math.max(r, i)), e[t] = i);
			i !== f && (u = this._trigger("slide", n, this._uiHash(t, i, e)), u !== !1 && (this._hasMultipleValues() ? this.values(t, i) : this.value(i)))
		},
		_stop: function(n, t) {
			this._trigger("stop", n, this._uiHash(t))
		},
		_change: function(n, t) {
			this._keySliding || this._mouseSliding || (this._lastChangedValue = t, this._trigger("change", n, this._uiHash(t)))
		},
		value: function(n) {
			return arguments.length ? (this.options.value = this._trimAlignValue(n), this._refreshValue(), this._change(null, 0), void 0) : this._value()
		},
		values: function(t, i) {
			var u, f, r;
			if (arguments.length > 1) return this.options.values[t] = this._trimAlignValue(i), this._refreshValue(), this._change(null, t), void 0;
			if (!arguments.length) return this._values();
			if (!n.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(t) : this.value();
			for (u = this.options.values, f = arguments[0], r = 0; u.length > r; r += 1) u[r] = this._trimAlignValue(f[r]), this._change(null, r);
			this._refreshValue()
		},
		_setOption: function(t, i) {
			var r, u = 0;
			switch ("range" === t && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), n.isArray(this.options.values) && (u = this.options.values.length), this._super(t, i), t) {
				case "orientation":
					this._detectOrientation();
					this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation);
					this._refreshValue();
					this.options.range && this._refreshRange(i);
					this.handles.css("horizontal" === i ? "bottom" : "left", "");
					break;
				case "value":
					this._animateOff = !0;
					this._refreshValue();
					this._change(null, 0);
					this._animateOff = !1;
					break;
				case "values":
					for (this._animateOff = !0, this._refreshValue(), r = u - 1; r >= 0; r--) this._change(null, r);
					this._animateOff = !1;
					break;
				case "step":
				case "min":
				case "max":
					this._animateOff = !0;
					this._calculateNewMax();
					this._refreshValue();
					this._animateOff = !1;
					break;
				case "range":
					this._animateOff = !0;
					this._refresh();
					this._animateOff = !1
			}
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this._toggleClass(null, "ui-state-disabled", !!n)
		},
		_value: function() {
			var n = this.options.value;
			return this._trimAlignValue(n)
		},
		_values: function(n) {
			var r, t, i;
			if (arguments.length) return r = this.options.values[n], r = this._trimAlignValue(r);
			if (this._hasMultipleValues()) {
				for (t = this.options.values.slice(), i = 0; t.length > i; i += 1) t[i] = this._trimAlignValue(t[i]);
				return t
			}
			return []
		},
		_trimAlignValue: function(n) {
			if (this._valueMin() >= n) return this._valueMin();
			if (n >= this._valueMax()) return this._valueMax();
			var t = this.options.step > 0 ? this.options.step : 1,
				i = (n - this._valueMin()) % t,
				r = n - i;
			return 2 * Math.abs(i) >= t && (r += i > 0 ? t : -t), parseFloat(r.toFixed(5))
		},
		_calculateNewMax: function() {
			var n = this.options.max,
				i = this._valueMin(),
				t = this.options.step,
				r = Math.round((n - i) / t) * t;
			n = r + i;
			n > this.options.max && (n -= t);
			this.max = parseFloat(n.toFixed(this._precision()))
		},
		_precision: function() {
			var n = this._precisionOf(this.options.step);
			return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
		},
		_precisionOf: function(n) {
			var t = "" + n,
				i = t.indexOf(".");
			return -1 === i ? 0 : t.length - i - 1
		},
		_valueMin: function() {
			return this.options.min
		},
		_valueMax: function() {
			return this.max
		},
		_refreshRange: function(n) {
			"vertical" === n && this.range.css({
				width: "",
				left: ""
			});
			"horizontal" === n && this.range.css({
				height: "",
				bottom: ""
			})
		},
		_refreshValue: function() {
			var s, t, c, f, h, e = this.options.range,
				i = this.options,
				r = this,
				u = this._animateOff ? !1 : i.animate,
				o = {};
			this._hasMultipleValues() ? this.handles.each(function(f) {
				t = 100 * ((r.values(f) - r._valueMin()) / (r._valueMax() - r._valueMin()));
				o["horizontal" === r.orientation ? "left" : "bottom"] = t + "%";
				n(this).stop(1, 1)[u ? "animate" : "css"](o, i.animate);
				r.options.range === !0 && ("horizontal" === r.orientation ? (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
					left: t + "%"
				}, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
					width: t - s + "%"
				}, {
					queue: !1,
					duration: i.animate
				})) : (0 === f && r.range.stop(1, 1)[u ? "animate" : "css"]({
					bottom: t + "%"
				}, i.animate), 1 === f && r.range[u ? "animate" : "css"]({
					height: t - s + "%"
				}, {
					queue: !1,
					duration: i.animate
				})));
				s = t
			}) : (c = this.value(), f = this._valueMin(), h = this._valueMax(), t = h !== f ? 100 * ((c - f) / (h - f)) : 0, o["horizontal" === this.orientation ? "left" : "bottom"] = t + "%", this.handle.stop(1, 1)[u ? "animate" : "css"](o, i.animate), "min" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				width: t + "%"
			}, i.animate), "max" === e && "horizontal" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				width: 100 - t + "%"
			}, i.animate), "min" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				height: t + "%"
			}, i.animate), "max" === e && "vertical" === this.orientation && this.range.stop(1, 1)[u ? "animate" : "css"]({
				height: 100 - t + "%"
			}, i.animate))
		},
		_handleEvents: {
			keydown: function(t) {
				var e, r, i, u, f = n(t.target).data("ui-slider-handle-index");
				switch (t.keyCode) {
					case n.ui.keyCode.HOME:
					case n.ui.keyCode.END:
					case n.ui.keyCode.PAGE_UP:
					case n.ui.keyCode.PAGE_DOWN:
					case n.ui.keyCode.UP:
					case n.ui.keyCode.RIGHT:
					case n.ui.keyCode.DOWN:
					case n.ui.keyCode.LEFT:
						if (t.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(n(t.target), null, "ui-state-active"), e = this._start(t, f), e === !1)) return
				}
				switch (u = this.options.step, r = i = this._hasMultipleValues() ? this.values(f) : this.value(), t.keyCode) {
					case n.ui.keyCode.HOME:
						i = this._valueMin();
						break;
					case n.ui.keyCode.END:
						i = this._valueMax();
						break;
					case n.ui.keyCode.PAGE_UP:
						i = this._trimAlignValue(r + (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case n.ui.keyCode.PAGE_DOWN:
						i = this._trimAlignValue(r - (this._valueMax() - this._valueMin()) / this.numPages);
						break;
					case n.ui.keyCode.UP:
					case n.ui.keyCode.RIGHT:
						if (r === this._valueMax()) return;
						i = this._trimAlignValue(r + u);
						break;
					case n.ui.keyCode.DOWN:
					case n.ui.keyCode.LEFT:
						if (r === this._valueMin()) return;
						i = this._trimAlignValue(r - u)
				}
				this._slide(t, f, i)
			},
			keyup: function(t) {
				var i = n(t.target).data("ui-slider-handle-index");
				this._keySliding && (this._keySliding = !1, this._stop(t, i), this._change(t, i), this._removeClass(n(t.target), null, "ui-state-active"))
			}
		}
	});
	n.widget("ui.spinner", {
		version: "1.12.1",
		defaultElement: "<input>",
		widgetEventPrefix: "spin",
		options: {
			classes: {
				"ui-spinner": "ui-corner-all",
				"ui-spinner-down": "ui-corner-br",
				"ui-spinner-up": "ui-corner-tr"
			},
			culture: null,
			icons: {
				down: "ui-icon-triangle-1-s",
				up: "ui-icon-triangle-1-n"
			},
			incremental: !0,
			max: null,
			min: null,
			numberFormat: null,
			page: 10,
			step: 1,
			change: null,
			spin: null,
			start: null,
			stop: null
		},
		_create: function() {
			this._setOption("max", this.options.max);
			this._setOption("min", this.options.min);
			this._setOption("step", this.options.step);
			"" !== this.value() && this._value(this.element.val(), !0);
			this._draw();
			this._on(this._events);
			this._refresh();
			this._on(this.window, {
				beforeunload: function() {
					this.element.removeAttr("autocomplete")
				}
			})
		},
		_getCreateOptions: function() {
			var t = this._super(),
				i = this.element;
			return n.each(["min", "max", "step"], function(n, r) {
				var u = i.attr(r);
				null != u && u.length && (t[r] = u)
			}), t
		},
		_events: {
			keydown: function(n) {
				this._start(n) && this._keydown(n) && n.preventDefault()
			},
			keyup: "_stop",
			focus: function() {
				this.previous = this.element.val()
			},
			blur: function(n) {
				return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", n), void 0)
			},
			mousewheel: function(n, t) {
				if (t) {
					if (!this.spinning && !this._start(n)) return !1;
					this._spin((t > 0 ? 1 : -1) * this.options.step, n);
					clearTimeout(this.mousewheelTimer);
					this.mousewheelTimer = this._delay(function() {
						this.spinning && this._stop(n)
					}, 100);
					n.preventDefault()
				}
			},
			"mousedown .ui-spinner-button": function(t) {
				function r() {
					var t = this.element[0] === n.ui.safeActiveElement(this.document[0]);
					t || (this.element.trigger("focus"), this.previous = i, this._delay(function() {
						this.previous = i
					}))
				}
				var i;
				i = this.element[0] === n.ui.safeActiveElement(this.document[0]) ? this.previous : this.element.val();
				t.preventDefault();
				r.call(this);
				this.cancelBlur = !0;
				this._delay(function() {
					delete this.cancelBlur;
					r.call(this)
				});
				this._start(t) !== !1 && this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t)
			},
			"mouseup .ui-spinner-button": "_stop",
			"mouseenter .ui-spinner-button": function(t) {
				if (n(t.currentTarget).hasClass("ui-state-active")) return this._start(t) === !1 ? !1 : (this._repeat(null, n(t.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, t), void 0)
			},
			"mouseleave .ui-spinner-button": "_stop"
		},
		_enhance: function() {
			this.uiSpinner = this.element.attr("autocomplete", "off").wrap("<span>").parent().append("<a><\/a><a><\/a>")
		},
		_draw: function() {
			this._enhance();
			this._addClass(this.uiSpinner, "ui-spinner", "ui-widget ui-widget-content");
			this._addClass("ui-spinner-input");
			this.element.attr("role", "spinbutton");
			this.buttons = this.uiSpinner.children("a").attr("tabIndex", -1).attr("aria-hidden", !0).button({
				classes: {
					"ui-button": ""
				}
			});
			this._removeClass(this.buttons, "ui-corner-all");
			this._addClass(this.buttons.first(), "ui-spinner-button ui-spinner-up");
			this._addClass(this.buttons.last(), "ui-spinner-button ui-spinner-down");
			this.buttons.first().button({
				icon: this.options.icons.up,
				showLabel: !1
			});
			this.buttons.last().button({
				icon: this.options.icons.down,
				showLabel: !1
			});
			this.buttons.height() > Math.ceil(.5 * this.uiSpinner.height()) && this.uiSpinner.height() > 0 && this.uiSpinner.height(this.uiSpinner.height())
		},
		_keydown: function(t) {
			var r = this.options,
				i = n.ui.keyCode;
			switch (t.keyCode) {
				case i.UP:
					return this._repeat(null, 1, t), !0;
				case i.DOWN:
					return this._repeat(null, -1, t), !0;
				case i.PAGE_UP:
					return this._repeat(null, r.page, t), !0;
				case i.PAGE_DOWN:
					return this._repeat(null, -r.page, t), !0
			}
			return !1
		},
		_start: function(n) {
			return this.spinning || this._trigger("start", n) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
		},
		_repeat: function(n, t, i) {
			n = n || 500;
			clearTimeout(this.timer);
			this.timer = this._delay(function() {
				this._repeat(40, t, i)
			}, n);
			this._spin(t * this.options.step, i)
		},
		_spin: function(n, t) {
			var i = this.value() || 0;
			this.counter || (this.counter = 1);
			i = this._adjustValue(i + n * this._increment(this.counter));
			this.spinning && this._trigger("spin", t, {
				value: i
			}) === !1 || (this._value(i), this.counter++)
		},
		_increment: function(t) {
			var i = this.options.incremental;
			return i ? n.isFunction(i) ? i(t) : Math.floor(t * t * t / 5e4 - t * t / 500 + 17 * t / 200 + 1) : 1
		},
		_precision: function() {
			var n = this._precisionOf(this.options.step);
			return null !== this.options.min && (n = Math.max(n, this._precisionOf(this.options.min))), n
		},
		_precisionOf: function(n) {
			var t = "" + n,
				i = t.indexOf(".");
			return -1 === i ? 0 : t.length - i - 1
		},
		_adjustValue: function(n) {
			var r, i, t = this.options;
			return r = null !== t.min ? t.min : 0, i = n - r, i = Math.round(i / t.step) * t.step, n = r + i, n = parseFloat(n.toFixed(this._precision())), null !== t.max && n > t.max ? t.max : null !== t.min && t.min > n ? t.min : n
		},
		_stop: function(n) {
			this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", n))
		},
		_setOption: function(n, t) {
			var u, i, r;
			return "culture" === n || "numberFormat" === n ? (u = this._parse(this.element.val()), this.options[n] = t, this.element.val(this._format(u)), void 0) : (("max" === n || "min" === n || "step" === n) && "string" == typeof t && (t = this._parse(t)), "icons" === n && (i = this.buttons.first().find(".ui-icon"), this._removeClass(i, null, this.options.icons.up), this._addClass(i, null, t.up), r = this.buttons.last().find(".ui-icon"), this._removeClass(r, null, this.options.icons.down), this._addClass(r, null, t.down)), this._super(n, t), void 0)
		},
		_setOptionDisabled: function(n) {
			this._super(n);
			this._toggleClass(this.uiSpinner, null, "ui-state-disabled", !!n);
			this.element.prop("disabled", !!n);
			this.buttons.button(n ? "disable" : "enable")
		},
		_setOptions: t(function(n) {
			this._super(n)
		}),
		_parse: function(n) {
			return "string" == typeof n && "" !== n && (n = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(n, 10, this.options.culture) : +n), "" === n || isNaN(n) ? null : n
		},
		_format: function(n) {
			return "" === n ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(n, this.options.numberFormat, this.options.culture) : n
		},
		_refresh: function() {
			this.element.attr({
				"aria-valuemin": this.options.min,
				"aria-valuemax": this.options.max,
				"aria-valuenow": this._parse(this.element.val())
			})
		},
		isValid: function() {
			var n = this.value();
			return null === n ? !1 : n === this._adjustValue(n)
		},
		_value: function(n, t) {
			var i;
			"" !== n && (i = this._parse(n), null !== i && (t || (i = this._adjustValue(i)), n = this._format(i)));
			this.element.val(n);
			this._refresh()
		},
		_destroy: function() {
			this.element.prop("disabled", !1).removeAttr("autocomplete role aria-valuemin aria-valuemax aria-valuenow");
			this.uiSpinner.replaceWith(this.element)
		},
		stepUp: t(function(n) {
			this._stepUp(n)
		}),
		_stepUp: function(n) {
			this._start() && (this._spin((n || 1) * this.options.step), this._stop())
		},
		stepDown: t(function(n) {
			this._stepDown(n)
		}),
		_stepDown: function(n) {
			this._start() && (this._spin((n || 1) * -this.options.step), this._stop())
		},
		pageUp: t(function(n) {
			this._stepUp((n || 1) * this.options.page)
		}),
		pageDown: t(function(n) {
			this._stepDown((n || 1) * this.options.page)
		}),
		value: function(n) {
			return arguments.length ? (t(this._value).call(this, n), void 0) : this._parse(this.element.val())
		},
		widget: function() {
			return this.uiSpinner
		}
	});
	n.uiBackCompat !== !1 && n.widget("ui.spinner", n.ui.spinner, {
		_enhance: function() {
			this.uiSpinner = this.element.attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml())
		},
		_uiSpinnerHtml: function() {
			return "<span>"
		},
		_buttonHtml: function() {
			return "<a><\/a><a><\/a>"
		}
	});
	n.ui.spinner;
	n.widget("ui.tabs", {
		version: "1.12.1",
		delay: 300,
		options: {
			active: null,
			classes: {
				"ui-tabs": "ui-corner-all",
				"ui-tabs-nav": "ui-corner-all",
				"ui-tabs-panel": "ui-corner-bottom",
				"ui-tabs-tab": "ui-corner-top"
			},
			collapsible: !1,
			event: "click",
			heightStyle: "content",
			hide: null,
			show: null,
			activate: null,
			beforeActivate: null,
			beforeLoad: null,
			load: null
		},
		_isLocal: function() {
			var n = /#.*$/;
			return function(t) {
				var i, r;
				i = t.href.replace(n, "");
				r = location.href.replace(n, "");
				try {
					i = decodeURIComponent(i)
				} catch (u) {}
				try {
					r = decodeURIComponent(r)
				} catch (u) {}
				return t.hash.length > 1 && i === r
			}
		}(),
		_create: function() {
			var i = this,
				t = this.options;
			this.running = !1;
			this._addClass("ui-tabs", "ui-widget ui-widget-content");
			this._toggleClass("ui-tabs-collapsible", null, t.collapsible);
			this._processTabs();
			t.active = this._initialActive();
			n.isArray(t.disabled) && (t.disabled = n.unique(t.disabled.concat(n.map(this.tabs.filter(".ui-state-disabled"), function(n) {
				return i.tabs.index(n)
			}))).sort());
			this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(t.active) : n();
			this._refresh();
			this.active.length && this.load(t.active)
		},
		_initialActive: function() {
			var t = this.options.active,
				i = this.options.collapsible,
				r = location.hash.substring(1);
			return null === t && (r && this.tabs.each(function(i, u) {
				if (n(u).attr("aria-controls") === r) return (t = i, !1)
			}), null === t && (t = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === t || -1 === t) && (t = this.tabs.length ? 0 : !1)), t !== !1 && (t = this.tabs.index(this.tabs.eq(t)), -1 === t && (t = i ? !1 : 0)), !i && t === !1 && this.anchors.length && (t = 0), t
		},
		_getCreateEventData: function() {
			return {
				tab: this.active,
				panel: this.active.length ? this._getPanelForTab(this.active) : n()
			}
		},
		_tabKeydown: function(t) {
			var r = n(n.ui.safeActiveElement(this.document[0])).closest("li"),
				i = this.tabs.index(r),
				u = !0;
			if (!this._handlePageNav(t)) {
				switch (t.keyCode) {
					case n.ui.keyCode.RIGHT:
					case n.ui.keyCode.DOWN:
						i++;
						break;
					case n.ui.keyCode.UP:
					case n.ui.keyCode.LEFT:
						u = !1;
						i--;
						break;
					case n.ui.keyCode.END:
						i = this.anchors.length - 1;
						break;
					case n.ui.keyCode.HOME:
						i = 0;
						break;
					case n.ui.keyCode.SPACE:
						return t.preventDefault(), clearTimeout(this.activating), this._activate(i), void 0;
					case n.ui.keyCode.ENTER:
						return t.preventDefault(), clearTimeout(this.activating), this._activate(i === this.options.active ? !1 : i), void 0;
					default:
						return
				}
				t.preventDefault();
				clearTimeout(this.activating);
				i = this._focusNextTab(i, u);
				t.ctrlKey || t.metaKey || (r.attr("aria-selected", "false"), this.tabs.eq(i).attr("aria-selected", "true"), this.activating = this._delay(function() {
					this.option("active", i)
				}, this.delay))
			}
		},
		_panelKeydown: function(t) {
			this._handlePageNav(t) || t.ctrlKey && t.keyCode === n.ui.keyCode.UP && (t.preventDefault(), this.active.trigger("focus"))
		},
		_handlePageNav: function(t) {
			return t.altKey && t.keyCode === n.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : t.altKey && t.keyCode === n.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
		},
		_findNextTab: function(t, i) {
			function u() {
				return t > r && (t = 0), 0 > t && (t = r), t
			}
			for (var r = this.tabs.length - 1; - 1 !== n.inArray(u(), this.options.disabled);) t = i ? t + 1 : t - 1;
			return t
		},
		_focusNextTab: function(n, t) {
			return n = this._findNextTab(n, t), this.tabs.eq(n).trigger("focus"), n
		},
		_setOption: function(n, t) {
			return "active" === n ? (this._activate(t), void 0) : (this._super(n, t), "collapsible" === n && (this._toggleClass("ui-tabs-collapsible", null, t), t || this.options.active !== !1 || this._activate(0)), "event" === n && this._setupEvents(t), "heightStyle" === n && this._setupHeightStyle(t), void 0)
		},
		_sanitizeSelector: function(n) {
			return n ? n.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
		},
		refresh: function() {
			var t = this.options,
				i = this.tablist.children(":has(a[href])");
			t.disabled = n.map(i.filter(".ui-state-disabled"), function(n) {
				return i.index(n)
			});
			this._processTabs();
			t.active !== !1 && this.anchors.length ? this.active.length && !n.contains(this.tablist[0], this.active[0]) ? this.tabs.length === t.disabled.length ? (t.active = !1, this.active = n()) : this._activate(this._findNextTab(Math.max(0, t.active - 1), !1)) : t.active = this.tabs.index(this.active) : (t.active = !1, this.active = n());
			this._refresh()
		},
		_refresh: function() {
			this._setOptionDisabled(this.options.disabled);
			this._setupEvents(this.options.event);
			this._setupHeightStyle(this.options.heightStyle);
			this.tabs.not(this.active).attr({
				"aria-selected": "false",
				"aria-expanded": "false",
				tabIndex: -1
			});
			this.panels.not(this._getPanelForTab(this.active)).hide().attr({
				"aria-hidden": "true"
			});
			this.active.length ? (this.active.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			}), this._addClass(this.active, "ui-tabs-active", "ui-state-active"), this._getPanelForTab(this.active).show().attr({
				"aria-hidden": "false"
			})) : this.tabs.eq(0).attr("tabIndex", 0)
		},
		_processTabs: function() {
			var t = this,
				i = this.tabs,
				r = this.anchors,
				u = this.panels;
			this.tablist = this._getList().attr("role", "tablist");
			this._addClass(this.tablist, "ui-tabs-nav", "ui-helper-reset ui-helper-clearfix ui-widget-header");
			this.tablist.on("mousedown" + this.eventNamespace, "> li", function(t) {
				n(this).is(".ui-state-disabled") && t.preventDefault()
			}).on("focus" + this.eventNamespace, ".ui-tabs-anchor", function() {
				n(this).closest("li").is(".ui-state-disabled") && this.blur()
			});
			this.tabs = this.tablist.find("> li:has(a[href])").attr({
				role: "tab",
				tabIndex: -1
			});
			this._addClass(this.tabs, "ui-tabs-tab", "ui-state-default");
			this.anchors = this.tabs.map(function() {
				return n("a", this)[0]
			}).attr({
				role: "presentation",
				tabIndex: -1
			});
			this._addClass(this.anchors, "ui-tabs-anchor");
			this.panels = n();
			this.anchors.each(function(i, r) {
				var f, u, e, s = n(r).uniqueId().attr("id"),
					o = n(r).closest("li"),
					h = o.attr("aria-controls");
				t._isLocal(r) ? (f = r.hash, e = f.substring(1), u = t.element.find(t._sanitizeSelector(f))) : (e = o.attr("aria-controls") || n({}).uniqueId()[0].id, f = "#" + e, u = t.element.find(f), u.length || (u = t._createPanel(e), u.insertAfter(t.panels[i - 1] || t.tablist)), u.attr("aria-live", "polite"));
				u.length && (t.panels = t.panels.add(u));
				h && o.data("ui-tabs-aria-controls", h);
				o.attr({
					"aria-controls": e,
					"aria-labelledby": s
				});
				u.attr("aria-labelledby", s)
			});
			this.panels.attr("role", "tabpanel");
			this._addClass(this.panels, "ui-tabs-panel", "ui-widget-content");
			i && (this._off(i.not(this.tabs)), this._off(r.not(this.anchors)), this._off(u.not(this.panels)))
		},
		_getList: function() {
			return this.tablist || this.element.find("ol, ul").eq(0)
		},
		_createPanel: function(t) {
			return n("<div>").attr("id", t).data("ui-tabs-destroy", !0)
		},
		_setOptionDisabled: function(t) {
			var i, u, r;
			for (n.isArray(t) && (t.length ? t.length === this.anchors.length && (t = !0) : t = !1), r = 0; u = this.tabs[r]; r++) i = n(u), t === !0 || -1 !== n.inArray(r, t) ? (i.attr("aria-disabled", "true"), this._addClass(i, null, "ui-state-disabled")) : (i.removeAttr("aria-disabled"), this._removeClass(i, null, "ui-state-disabled"));
			this.options.disabled = t;
			this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, t === !0)
		},
		_setupEvents: function(t) {
			var i = {};
			t && n.each(t.split(" "), function(n, t) {
				i[t] = "_eventHandler"
			});
			this._off(this.anchors.add(this.tabs).add(this.panels));
			this._on(!0, this.anchors, {
				click: function(n) {
					n.preventDefault()
				}
			});
			this._on(this.anchors, i);
			this._on(this.tabs, {
				keydown: "_tabKeydown"
			});
			this._on(this.panels, {
				keydown: "_panelKeydown"
			});
			this._focusable(this.tabs);
			this._hoverable(this.tabs)
		},
		_setupHeightStyle: function(t) {
			var i, r = this.element.parent();
			"fill" === t ? (i = r.height(), i -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
				var t = n(this),
					r = t.css("position");
				"absolute" !== r && "fixed" !== r && (i -= t.outerHeight(!0))
			}), this.element.children().not(this.panels).each(function() {
				i -= n(this).outerHeight(!0)
			}), this.panels.each(function() {
				n(this).height(Math.max(0, i - n(this).innerHeight() + n(this).height()))
			}).css("overflow", "auto")) : "auto" === t && (i = 0, this.panels.each(function() {
				i = Math.max(i, n(this).height("").height())
			}).height(i))
		},
		_eventHandler: function(t) {
			var u = this.options,
				r = this.active,
				c = n(t.currentTarget),
				i = c.closest("li"),
				f = i[0] === r[0],
				e = f && u.collapsible,
				o = e ? n() : this._getPanelForTab(i),
				s = r.length ? this._getPanelForTab(r) : n(),
				h = {
					oldTab: r,
					oldPanel: s,
					newTab: e ? n() : i,
					newPanel: o
				};
			t.preventDefault();
			i.hasClass("ui-state-disabled") || i.hasClass("ui-tabs-loading") || this.running || f && !u.collapsible || this._trigger("beforeActivate", t, h) === !1 || (u.active = e ? !1 : this.tabs.index(i), this.active = f ? n() : i, this.xhr && this.xhr.abort(), s.length || o.length || n.error("jQuery UI Tabs: Mismatching fragment identifier."), o.length && this.load(this.tabs.index(i), t), this._toggle(t, h))
		},
		_toggle: function(t, i) {
			function e() {
				r.running = !1;
				r._trigger("activate", t, i)
			}

			function o() {
				r._addClass(i.newTab.closest("li"), "ui-tabs-active", "ui-state-active");
				u.length && r.options.show ? r._show(u, r.options.show, e) : (u.show(), e())
			}
			var r = this,
				u = i.newPanel,
				f = i.oldPanel;
			this.running = !0;
			f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
				r._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active");
				o()
			}) : (this._removeClass(i.oldTab.closest("li"), "ui-tabs-active", "ui-state-active"), f.hide(), o());
			f.attr("aria-hidden", "true");
			i.oldTab.attr({
				"aria-selected": "false",
				"aria-expanded": "false"
			});
			u.length && f.length ? i.oldTab.attr("tabIndex", -1) : u.length && this.tabs.filter(function() {
				return 0 === n(this).attr("tabIndex")
			}).attr("tabIndex", -1);
			u.attr("aria-hidden", "false");
			i.newTab.attr({
				"aria-selected": "true",
				"aria-expanded": "true",
				tabIndex: 0
			})
		},
		_activate: function(t) {
			var r, i = this._findActive(t);
			i[0] !== this.active[0] && (i.length || (i = this.active), r = i.find(".ui-tabs-anchor")[0], this._eventHandler({
				target: r,
				currentTarget: r,
				preventDefault: n.noop
			}))
		},
		_findActive: function(t) {
			return t === !1 ? n() : this.tabs.eq(t)
		},
		_getIndex: function(t) {
			return "string" == typeof t && (t = this.anchors.index(this.anchors.filter("[href$='" + n.ui.escapeSelector(t) + "']"))), t
		},
		_destroy: function() {
			this.xhr && this.xhr.abort();
			this.tablist.removeAttr("role").off(this.eventNamespace);
			this.anchors.removeAttr("role tabIndex").removeUniqueId();
			this.tabs.add(this.panels).each(function() {
				n.data(this, "ui-tabs-destroy") ? n(this).remove() : n(this).removeAttr("role tabIndex aria-live aria-busy aria-selected aria-labelledby aria-hidden aria-expanded")
			});
			this.tabs.each(function() {
				var t = n(this),
					i = t.data("ui-tabs-aria-controls");
				i ? t.attr("aria-controls", i).removeData("ui-tabs-aria-controls") : t.removeAttr("aria-controls")
			});
			this.panels.show();
			"content" !== this.options.heightStyle && this.panels.css("height", "")
		},
		enable: function(t) {
			var i = this.options.disabled;
			i !== !1 && (void 0 === t ? i = !1 : (t = this._getIndex(t), i = n.isArray(i) ? n.map(i, function(n) {
				return n !== t ? n : null
			}) : n.map(this.tabs, function(n, i) {
				return i !== t ? i : null
			})), this._setOptionDisabled(i))
		},
		disable: function(t) {
			var i = this.options.disabled;
			if (i !== !0) {
				if (void 0 === t) i = !0;
				else {
					if (t = this._getIndex(t), -1 !== n.inArray(t, i)) return;
					i = n.isArray(i) ? n.merge([t], i).sort() : [t]
				}
				this._setOptionDisabled(i)
			}
		},
		load: function(t, i) {
			t = this._getIndex(t);
			var r = this,
				u = this.tabs.eq(t),
				e = u.find(".ui-tabs-anchor"),
				f = this._getPanelForTab(u),
				o = {
					tab: u,
					panel: f
				},
				s = function(n, t) {
					"abort" === t && r.panels.stop(!1, !0);
					r._removeClass(u, "ui-tabs-loading");
					f.removeAttr("aria-busy");
					n === r.xhr && delete r.xhr
				};
			this._isLocal(e[0]) || (this.xhr = n.ajax(this._ajaxSettings(e, i, o)), this.xhr && "canceled" !== this.xhr.statusText && (this._addClass(u, "ui-tabs-loading"), f.attr("aria-busy", "true"), this.xhr.done(function(n, t, u) {
				setTimeout(function() {
					f.html(n);
					r._trigger("load", i, o);
					s(u, t)
				}, 1)
			}).fail(function(n, t) {
				setTimeout(function() {
					s(n, t)
				}, 1)
			})))
		},
		_ajaxSettings: function(t, i, r) {
			var u = this;
			return {
				url: t.attr("href").replace(/#.*$/, ""),
				beforeSend: function(t, f) {
					return u._trigger("beforeLoad", i, n.extend({
						jqXHR: t,
						ajaxSettings: f
					}, r))
				}
			}
		},
		_getPanelForTab: function(t) {
			var i = n(t).attr("aria-controls");
			return this.element.find(this._sanitizeSelector("#" + i))
		}
	});
	n.uiBackCompat !== !1 && n.widget("ui.tabs", n.ui.tabs, {
		_processTabs: function() {
			this._superApply(arguments);
			this._addClass(this.tabs, "ui-tab")
		}
	});
	n.ui.tabs;
	n.widget("ui.tooltip", {
		version: "1.12.1",
		options: {
			classes: {
				"ui-tooltip": "ui-corner-all ui-widget-shadow"
			},
			content: function() {
				var t = n(this).attr("title") || "";
				return n("<a>").text(t).html()
			},
			hide: !0,
			items: "[title]:not([disabled])",
			position: {
				my: "left top+15",
				at: "left bottom",
				collision: "flipfit flip"
			},
			show: !0,
			track: !1,
			close: null,
			open: null
		},
		_addDescribedBy: function(t, i) {
			var r = (t.attr("aria-describedby") || "").split(/\s+/);
			r.push(i);
			t.data("ui-tooltip-id", i).attr("aria-describedby", n.trim(r.join(" ")))
		},
		_removeDescribedBy: function(t) {
			var u = t.data("ui-tooltip-id"),
				i = (t.attr("aria-describedby") || "").split(/\s+/),
				r = n.inArray(u, i); - 1 !== r && i.splice(r, 1);
			t.removeData("ui-tooltip-id");
			i = n.trim(i.join(" "));
			i ? t.attr("aria-describedby", i) : t.removeAttr("aria-describedby")
		},
		_create: function() {
			this._on({
				mouseover: "open",
				focusin: "open"
			});
			this.tooltips = {};
			this.parents = {};
			this.liveRegion = n("<div>").attr({
				role: "log",
				"aria-live": "assertive",
				"aria-relevant": "additions"
			}).appendTo(this.document[0].body);
			this._addClass(this.liveRegion, null, "ui-helper-hidden-accessible");
			this.disabledTitles = n([])
		},
		_setOption: function(t, i) {
			var r = this;
			this._super(t, i);
			"content" === t && n.each(this.tooltips, function(n, t) {
				r._updateContent(t.element)
			})
		},
		_setOptionDisabled: function(n) {
			this[n ? "_disable" : "_enable"]()
		},
		_disable: function() {
			var t = this;
			n.each(this.tooltips, function(i, r) {
				var u = n.Event("blur");
				u.target = u.currentTarget = r.element[0];
				t.close(u, !0)
			});
			this.disabledTitles = this.disabledTitles.add(this.element.find(this.options.items).addBack().filter(function() {
				var t = n(this);
				if (t.is("[title]")) return t.data("ui-tooltip-title", t.attr("title")).removeAttr("title")
			}))
		},
		_enable: function() {
			this.disabledTitles.each(function() {
				var t = n(this);
				t.data("ui-tooltip-title") && t.attr("title", t.data("ui-tooltip-title"))
			});
			this.disabledTitles = n([])
		},
		open: function(t) {
			var r = this,
				i = n(t ? t.target : this.element).closest(this.options.items);
			i.length && !i.data("ui-tooltip-id") && (i.attr("title") && i.data("ui-tooltip-title", i.attr("title")), i.data("ui-tooltip-open", !0), t && "mouseover" === t.type && i.parents().each(function() {
				var i, t = n(this);
				t.data("ui-tooltip-open") && (i = n.Event("blur"), i.target = i.currentTarget = this, r.close(i, !0));
				t.attr("title") && (t.uniqueId(), r.parents[this.id] = {
					element: this,
					title: t.attr("title")
				}, t.attr("title", ""))
			}), this._registerCloseHandlers(t, i), this._updateContent(i, t))
		},
		_updateContent: function(n, t) {
			var r, i = this.options.content,
				u = this,
				f = t ? t.type : null;
			return "string" == typeof i || i.nodeType || i.jquery ? this._open(t, n, i) : (r = i.call(n[0], function(i) {
				u._delay(function() {
					n.data("ui-tooltip-open") && (t && (t.type = f), this._open(t, n, i))
				})
			}), r && this._open(t, n, r), void 0)
		},
		_open: function(t, i, r) {
			function o(n) {
				s.of = n;
				u.is(":hidden") || u.position(s)
			}
			var f, u, h, e, s = n.extend({}, this.options.position);
			if (r) {
				if (f = this._find(i)) return f.tooltip.find(".ui-tooltip-content").html(r), void 0;
				i.is("[title]") && (t && "mouseover" === t.type ? i.attr("title", "") : i.removeAttr("title"));
				f = this._tooltip(i);
				u = f.tooltip;
				this._addDescribedBy(i, u.attr("id"));
				u.find(".ui-tooltip-content").html(r);
				this.liveRegion.children().hide();
				e = n("<div>").html(u.find(".ui-tooltip-content").html());
				e.removeAttr("name").find("[name]").removeAttr("name");
				e.removeAttr("id").find("[id]").removeAttr("id");
				e.appendTo(this.liveRegion);
				this.options.track && t && /^mouse/.test(t.type) ? (this._on(this.document, {
					mousemove: o
				}), o(t)) : u.position(n.extend({
					of: i
				}, this.options.position));
				u.hide();
				this._show(u, this.options.show);
				this.options.track && this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
					u.is(":visible") && (o(s.of), clearInterval(h))
				}, n.fx.interval));
				this._trigger("open", t, {
					tooltip: u
				})
			}
		},
		_registerCloseHandlers: function(t, i) {
			var r = {
				keyup: function(t) {
					if (t.keyCode === n.ui.keyCode.ESCAPE) {
						var r = n.Event(t);
						r.currentTarget = i[0];
						this.close(r, !0)
					}
				}
			};
			i[0] !== this.element[0] && (r.remove = function() {
				this._removeTooltip(this._find(i).tooltip)
			});
			t && "mouseover" !== t.type || (r.mouseleave = "close");
			t && "focusin" !== t.type || (r.focusout = "close");
			this._on(!0, i, r)
		},
		close: function(t) {
			var u, f = this,
				i = n(t ? t.currentTarget : this.element),
				r = this._find(i);
			return r ? (u = r.tooltip, r.closing || (clearInterval(this.delayedShow), i.data("ui-tooltip-title") && !i.attr("title") && i.attr("title", i.data("ui-tooltip-title")), this._removeDescribedBy(i), r.hiding = !0, u.stop(!0), this._hide(u, this.options.hide, function() {
				f._removeTooltip(n(this))
			}), i.removeData("ui-tooltip-open"), this._off(i, "mouseleave focusout keyup"), i[0] !== this.element[0] && this._off(i, "remove"), this._off(this.document, "mousemove"), t && "mouseleave" === t.type && n.each(this.parents, function(t, i) {
				n(i.element).attr("title", i.title);
				delete f.parents[t]
			}), r.closing = !0, this._trigger("close", t, {
				tooltip: u
			}), r.hiding || (r.closing = !1)), void 0) : (i.removeData("ui-tooltip-open"), void 0)
		},
		_tooltip: function(t) {
			var i = n("<div>").attr("role", "tooltip"),
				r = n("<div>").appendTo(i),
				u = i.uniqueId().attr("id");
			return this._addClass(r, "ui-tooltip-content"), this._addClass(i, "ui-tooltip", "ui-widget ui-widget-content"), i.appendTo(this._appendTo(t)), this.tooltips[u] = {
				element: t,
				tooltip: i
			}
		},
		_find: function(n) {
			var t = n.data("ui-tooltip-id");
			return t ? this.tooltips[t] : null
		},
		_removeTooltip: function(n) {
			n.remove();
			delete this.tooltips[n.attr("id")]
		},
		_appendTo: function(n) {
			var t = n.closest(".ui-front, dialog");
			return t.length || (t = this.document[0].body), t
		},
		_destroy: function() {
			var t = this;
			n.each(this.tooltips, function(i, r) {
				var f = n.Event("blur"),
					u = r.element;
				f.target = f.currentTarget = u[0];
				t.close(f, !0);
				n("#" + i).remove();
				u.data("ui-tooltip-title") && (u.attr("title") || u.attr("title", u.data("ui-tooltip-title")), u.removeData("ui-tooltip-title"))
			});
			this.liveRegion.remove()
		}
	});
	n.uiBackCompat !== !1 && n.widget("ui.tooltip", n.ui.tooltip, {
		options: {
			tooltipClass: null
		},
		_tooltip: function() {
			var n = this._superApply(arguments);
			return this.options.tooltipClass && n.tooltip.addClass(this.options.tooltipClass), n
		}
	});
	n.ui.tooltip;
	var e = "ui-effects-",
		s = "ui-effects-style",
		h = "ui-effects-animated",
		p = n;
	n.effects = {
			effect: {}
		},
		function(n, t) {
			function f(n, t, i) {
				var r = h[t.type] || {};
				return null == n ? i || !t.def ? null : t.def : (n = r.floor ? ~~n : parseFloat(n), isNaN(n) ? t.def : r.mod ? (n + r.mod) % r.mod : 0 > n ? 0 : n > r.max ? r.max : n)
			}

			function s(f) {
				var o = i(),
					s = o._rgba = [];
				return f = f.toLowerCase(), r(v, function(n, i) {
					var r, h = i.re.exec(f),
						c = h && i.parse(h),
						e = i.space || "rgba";
					return c ? (r = o[e](c), o[u[e].cache] = r[u[e].cache], s = o._rgba = r._rgba, !1) : t
				}), s.length ? ("0,0,0,0" === s.join() && n.extend(s, e.transparent), o) : e[f]
			}

			function o(n, t, i) {
				return i = (i + 1) % 1, 1 > 6 * i ? n + 6 * (t - n) * i : 1 > 2 * i ? t : 2 > 3 * i ? n + 6 * (t - n) * (2 / 3 - i) : n
			}
			var e, a = /^([\-+])=\s*(\d+\.?\d*)/,
				v = [{
					re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(n) {
						return [n[1], n[2], n[3], n[4]]
					}
				}, {
					re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					parse: function(n) {
						return [2.55 * n[1], 2.55 * n[2], 2.55 * n[3], n[4]]
					}
				}, {
					re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
					parse: function(n) {
						return [parseInt(n[1], 16), parseInt(n[2], 16), parseInt(n[3], 16)]
					}
				}, {
					re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
					parse: function(n) {
						return [parseInt(n[1] + n[1], 16), parseInt(n[2] + n[2], 16), parseInt(n[3] + n[3], 16)]
					}
				}, {
					re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
					space: "hsla",
					parse: function(n) {
						return [n[1], n[2] / 100, n[3] / 100, n[4]]
					}
				}],
				i = n.Color = function(t, i, r, u) {
					return new n.Color.fn.parse(t, i, r, u)
				},
				u = {
					rgba: {
						props: {
							red: {
								idx: 0,
								type: "byte"
							},
							green: {
								idx: 1,
								type: "byte"
							},
							blue: {
								idx: 2,
								type: "byte"
							}
						}
					},
					hsla: {
						props: {
							hue: {
								idx: 0,
								type: "degrees"
							},
							saturation: {
								idx: 1,
								type: "percent"
							},
							lightness: {
								idx: 2,
								type: "percent"
							}
						}
					}
				},
				h = {
					byte: {
						floor: !0,
						max: 255
					},
					percent: {
						max: 1
					},
					degrees: {
						mod: 360,
						floor: !0
					}
				},
				c = i.support = {},
				l = n("<p>")[0],
				r = n.each;
			l.style.cssText = "background-color:rgba(1,1,1,.5)";
			c.rgba = l.style.backgroundColor.indexOf("rgba") > -1;
			r(u, function(n, t) {
				t.cache = "_" + n;
				t.props.alpha = {
					idx: 3,
					type: "percent",
					def: 1
				}
			});
			i.fn = n.extend(i.prototype, {
				parse: function(o, h, c, l) {
					if (o === t) return this._rgba = [null, null, null, null], this;
					(o.jquery || o.nodeType) && (o = n(o).css(h), h = t);
					var a = this,
						v = n.type(o),
						y = this._rgba = [];
					return h !== t && (o = [o, h, c, l], v = "array"), "string" === v ? this.parse(s(o) || e._default) : "array" === v ? (r(u.rgba.props, function(n, t) {
						y[t.idx] = f(o[t.idx], t)
					}), this) : "object" === v ? (o instanceof i ? r(u, function(n, t) {
						o[t.cache] && (a[t.cache] = o[t.cache].slice())
					}) : r(u, function(t, i) {
						var u = i.cache;
						r(i.props, function(n, t) {
							if (!a[u] && i.to) {
								if ("alpha" === n || null == o[n]) return;
								a[u] = i.to(a._rgba)
							}
							a[u][t.idx] = f(o[n], t, !0)
						});
						a[u] && 0 > n.inArray(null, a[u].slice(0, 3)) && (a[u][3] = 1, i.from && (a._rgba = i.from(a[u])))
					}), this) : t
				},
				is: function(n) {
					var o = i(n),
						f = !0,
						e = this;
					return r(u, function(n, i) {
						var s, u = o[i.cache];
						return u && (s = e[i.cache] || i.to && i.to(e._rgba) || [], r(i.props, function(n, i) {
							return null != u[i.idx] ? f = u[i.idx] === s[i.idx] : t
						})), f
					}), f
				},
				_space: function() {
					var n = [],
						t = this;
					return r(u, function(i, r) {
						t[r.cache] && n.push(i)
					}), n.pop()
				},
				transition: function(n, t) {
					var e = i(n),
						c = e._space(),
						o = u[c],
						l = 0 === this.alpha() ? i("transparent") : this,
						a = l[o.cache] || o.to(l._rgba),
						s = a.slice();
					return e = e[o.cache], r(o.props, function(n, i) {
						var c = i.idx,
							r = a[c],
							u = e[c],
							o = h[i.type] || {};
						null !== u && (null === r ? s[c] = u : (o.mod && (u - r > o.mod / 2 ? r += o.mod : r - u > o.mod / 2 && (r -= o.mod)), s[c] = f((u - r) * t + r, i)))
					}), this[c](s)
				},
				blend: function(t) {
					if (1 === this._rgba[3]) return this;
					var r = this._rgba.slice(),
						u = r.pop(),
						f = i(t)._rgba;
					return i(n.map(r, function(n, t) {
						return (1 - u) * f[t] + u * n
					}))
				},
				toRgbaString: function() {
					var i = "rgba(",
						t = n.map(this._rgba, function(n, t) {
							return null == n ? t > 2 ? 1 : 0 : n
						});
					return 1 === t[3] && (t.pop(), i = "rgb("), i + t.join() + ")"
				},
				toHslaString: function() {
					var i = "hsla(",
						t = n.map(this.hsla(), function(n, t) {
							return null == n && (n = t > 2 ? 1 : 0), t && 3 > t && (n = Math.round(100 * n) + "%"), n
						});
					return 1 === t[3] && (t.pop(), i = "hsl("), i + t.join() + ")"
				},
				toHexString: function(t) {
					var i = this._rgba.slice(),
						r = i.pop();
					return t && i.push(~~(255 * r)), "#" + n.map(i, function(n) {
						return n = (n || 0).toString(16), 1 === n.length ? "0" + n : n
					}).join("")
				},
				toString: function() {
					return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
				}
			});
			i.fn.parse.prototype = i.fn;
			u.hsla.to = function(n) {
				if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
				var s, h, i = n[0] / 255,
					r = n[1] / 255,
					f = n[2] / 255,
					c = n[3],
					u = Math.max(i, r, f),
					e = Math.min(i, r, f),
					t = u - e,
					o = u + e,
					l = .5 * o;
				return s = e === u ? 0 : i === u ? 60 * (r - f) / t + 360 : r === u ? 60 * (f - i) / t + 120 : 60 * (i - r) / t + 240, h = 0 === t ? 0 : .5 >= l ? t / o : t / (2 - o), [Math.round(s) % 360, h, l, null == c ? 1 : c]
			};
			u.hsla.from = function(n) {
				if (null == n[0] || null == n[1] || null == n[2]) return [null, null, null, n[3]];
				var r = n[0] / 360,
					u = n[1],
					t = n[2],
					e = n[3],
					i = .5 >= t ? t * (1 + u) : t + u - t * u,
					f = 2 * t - i;
				return [Math.round(255 * o(f, i, r + 1 / 3)), Math.round(255 * o(f, i, r)), Math.round(255 * o(f, i, r - 1 / 3)), e]
			};
			r(u, function(u, e) {
				var s = e.props,
					o = e.cache,
					h = e.to,
					c = e.from;
				i.fn[u] = function(u) {
					if (h && !this[o] && (this[o] = h(this._rgba)), u === t) return this[o].slice();
					var l, a = n.type(u),
						v = "array" === a || "object" === a ? u : arguments,
						e = this[o].slice();
					return r(s, function(n, t) {
						var i = v["object" === a ? n : t.idx];
						null == i && (i = e[t.idx]);
						e[t.idx] = f(i, t)
					}), c ? (l = i(c(e)), l[o] = e, l) : i(e)
				};
				r(s, function(t, r) {
					i.fn[t] || (i.fn[t] = function(i) {
						var f, e = n.type(i),
							h = "alpha" === t ? this._hsla ? "hsla" : "rgba" : u,
							o = this[h](),
							s = o[r.idx];
						return "undefined" === e ? s : ("function" === e && (i = i.call(this, s), e = n.type(i)), null == i && r.empty ? this : ("string" === e && (f = a.exec(i), f && (i = s + parseFloat(f[2]) * ("+" === f[1] ? 1 : -1))), o[r.idx] = i, this[h](o)))
					})
				})
			});
			i.hook = function(t) {
				var u = t.split(" ");
				r(u, function(t, r) {
					n.cssHooks[r] = {
						set: function(t, u) {
							var o, f, e = "";
							if ("transparent" !== u && ("string" !== n.type(u) || (o = s(u)))) {
								if (u = i(o || u), !c.rgba && 1 !== u._rgba[3]) {
									for (f = "backgroundColor" === r ? t.parentNode : t;
										("" === e || "transparent" === e) && f && f.style;) try {
										e = n.css(f, "backgroundColor");
										f = f.parentNode
									} catch (h) {}
									u = u.blend(e && "transparent" !== e ? e : "_default")
								}
								u = u.toRgbaString()
							}
							try {
								t.style[r] = u
							} catch (h) {}
						}
					};
					n.fx.step[r] = function(t) {
						t.colorInit || (t.start = i(t.elem, r), t.end = i(t.end), t.colorInit = !0);
						n.cssHooks[r].set(t.elem, t.start.transition(t.end, t.pos))
					}
				})
			};
			i.hook("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor");
			n.cssHooks.borderColor = {
				expand: function(n) {
					var t = {};
					return r(["Top", "Right", "Bottom", "Left"], function(i, r) {
						t["border" + r + "Color"] = n
					}), t
				}
			};
			e = n.Color.names = {
				aqua: "#00ffff",
				black: "#000000",
				blue: "#0000ff",
				fuchsia: "#ff00ff",
				gray: "#808080",
				green: "#008000",
				lime: "#00ff00",
				maroon: "#800000",
				navy: "#000080",
				olive: "#808000",
				purple: "#800080",
				red: "#ff0000",
				silver: "#c0c0c0",
				teal: "#008080",
				white: "#ffffff",
				yellow: "#ffff00",
				transparent: [null, null, null, 0],
				_default: "#ffffff"
			}
		}(p),
		function() {
			function t(t) {
				var r, u, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle,
					f = {};
				if (i && i.length && i[0] && i[i[0]])
					for (u = i.length; u--;) r = i[u], "string" == typeof i[r] && (f[n.camelCase(r)] = i[r]);
				else
					for (r in i) "string" == typeof i[r] && (f[r] = i[r]);
				return f
			}

			function i(t, i) {
				var r, f, e = {};
				for (r in i) f = i[r], t[r] !== f && (u[r] || (n.fx.step[r] || !isNaN(parseFloat(f))) && (e[r] = f));
				return e
			}
			var r = ["add", "remove", "toggle"],
				u = {
					border: 1,
					borderBottom: 1,
					borderColor: 1,
					borderLeft: 1,
					borderRight: 1,
					borderTop: 1,
					borderWidth: 1,
					margin: 1,
					padding: 1
				};
			n.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(t, i) {
				n.fx.step[i] = function(n) {
					("none" === n.end || n.setAttr) && (1 !== n.pos || n.setAttr) || (p.style(n.elem, i, n.end), n.setAttr = !0)
				}
			});
			n.fn.addBack || (n.fn.addBack = function(n) {
				return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
			});
			n.effects.animateClass = function(u, f, e, o) {
				var s = n.speed(f, e, o);
				return this.queue(function() {
					var o, e = n(this),
						h = e.attr("class") || "",
						f = s.children ? e.find("*").addBack() : e;
					f = f.map(function() {
						var i = n(this);
						return {
							el: i,
							start: t(this)
						}
					});
					o = function() {
						n.each(r, function(n, t) {
							u[t] && e[t + "Class"](u[t])
						})
					};
					o();
					f = f.map(function() {
						return this.end = t(this.el[0]), this.diff = i(this.start, this.end), this
					});
					e.attr("class", h);
					f = f.map(function() {
						var i = this,
							t = n.Deferred(),
							r = n.extend({}, s, {
								queue: !1,
								complete: function() {
									t.resolve(i)
								}
							});
						return this.el.animate(this.diff, r), t.promise()
					});
					n.when.apply(n, f.get()).done(function() {
						o();
						n.each(arguments, function() {
							var t = this.el;
							n.each(this.diff, function(n) {
								t.css(n, "")
							})
						});
						s.complete.call(e[0])
					})
				})
			};
			n.fn.extend({
				addClass: function(t) {
					return function(i, r, u, f) {
						return r ? n.effects.animateClass.call(this, {
							add: i
						}, r, u, f) : t.apply(this, arguments)
					}
				}(n.fn.addClass),
				removeClass: function(t) {
					return function(i, r, u, f) {
						return arguments.length > 1 ? n.effects.animateClass.call(this, {
							remove: i
						}, r, u, f) : t.apply(this, arguments)
					}
				}(n.fn.removeClass),
				toggleClass: function(t) {
					return function(i, r, u, f, e) {
						return "boolean" == typeof r || void 0 === r ? u ? n.effects.animateClass.call(this, r ? {
							add: i
						} : {
							remove: i
						}, u, f, e) : t.apply(this, arguments) : n.effects.animateClass.call(this, {
							toggle: i
						}, r, u, f)
					}
				}(n.fn.toggleClass),
				switchClass: function(t, i, r, u, f) {
					return n.effects.animateClass.call(this, {
						add: i,
						remove: t
					}, r, u, f)
				}
			})
		}(),
		function() {
			function t(t, i, r, u) {
				return n.isPlainObject(t) && (i = t, t = t.effect), t = {
					effect: t
				}, null == i && (i = {}), n.isFunction(i) && (u = i, r = null, i = {}), ("number" == typeof i || n.fx.speeds[i]) && (u = r, r = i, i = {}), n.isFunction(r) && (u = r, r = null), i && n.extend(t, i), r = r || i.duration, t.duration = n.fx.off ? 0 : "number" == typeof r ? r : r in n.fx.speeds ? n.fx.speeds[r] : n.fx.speeds._default, t.complete = u || i.complete, t
			}

			function i(t) {
				return !t || "number" == typeof t || n.fx.speeds[t] ? !0 : "string" != typeof t || n.effects.effect[t] ? n.isFunction(t) ? !0 : "object" != typeof t || t.effect ? !1 : !0 : !0
			}

			function r(n, t) {
				var r = t.outerWidth(),
					u = t.outerHeight(),
					i = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(n) || ["", 0, r, u, 0];
				return {
					top: parseFloat(i[1]) || 0,
					right: "auto" === i[2] ? r : parseFloat(i[2]),
					bottom: "auto" === i[3] ? u : parseFloat(i[3]),
					left: parseFloat(i[4]) || 0
				}
			}
			n.expr && n.expr.filters && n.expr.filters.animated && (n.expr.filters.animated = function(t) {
				return function(i) {
					return !!n(i).data(h) || t(i)
				}
			}(n.expr.filters.animated));
			n.uiBackCompat !== !1 && n.extend(n.effects, {
				save: function(n, t) {
					for (var i = 0, r = t.length; r > i; i++) null !== t[i] && n.data(e + t[i], n[0].style[t[i]])
				},
				restore: function(n, t) {
					for (var r, i = 0, u = t.length; u > i; i++) null !== t[i] && (r = n.data(e + t[i]), n.css(t[i], r))
				},
				setMode: function(n, t) {
					return "toggle" === t && (t = n.is(":hidden") ? "show" : "hide"), t
				},
				createWrapper: function(t) {
					if (t.parent().is(".ui-effects-wrapper")) return t.parent();
					var i = {
							width: t.outerWidth(!0),
							height: t.outerHeight(!0),
							float: t.css("float")
						},
						u = n("<div><\/div>").addClass("ui-effects-wrapper").css({
							fontSize: "100%",
							background: "transparent",
							border: "none",
							margin: 0,
							padding: 0
						}),
						f = {
							width: t.width(),
							height: t.height()
						},
						r = document.activeElement;
					try {
						r.id
					} catch (e) {
						r = document.body
					}
					return t.wrap(u), (t[0] === r || n.contains(t[0], r)) && n(r).trigger("focus"), u = t.parent(), "static" === t.css("position") ? (u.css({
						position: "relative"
					}), t.css({
						position: "relative"
					})) : (n.extend(i, {
						position: t.css("position"),
						zIndex: t.css("z-index")
					}), n.each(["top", "left", "bottom", "right"], function(n, r) {
						i[r] = t.css(r);
						isNaN(parseInt(i[r], 10)) && (i[r] = "auto")
					}), t.css({
						position: "relative",
						top: 0,
						left: 0,
						right: "auto",
						bottom: "auto"
					})), t.css(f), u.css(i).show()
				},
				removeWrapper: function(t) {
					var i = document.activeElement;
					return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t), (t[0] === i || n.contains(t[0], i)) && n(i).trigger("focus")), t
				}
			});
			n.extend(n.effects, {
				version: "1.12.1",
				define: function(t, i, r) {
					return r || (r = i, i = "effect"), n.effects.effect[t] = r, n.effects.effect[t].mode = i, r
				},
				scaledDimensions: function(n, t, i) {
					if (0 === t) return {
						height: 0,
						width: 0,
						outerHeight: 0,
						outerWidth: 0
					};
					var r = "horizontal" !== i ? (t || 100) / 100 : 1,
						u = "vertical" !== i ? (t || 100) / 100 : 1;
					return {
						height: n.height() * u,
						width: n.width() * r,
						outerHeight: n.outerHeight() * u,
						outerWidth: n.outerWidth() * r
					}
				},
				clipToBox: function(n) {
					return {
						width: n.clip.right - n.clip.left,
						height: n.clip.bottom - n.clip.top,
						left: n.clip.left,
						top: n.clip.top
					}
				},
				unshift: function(n, t, i) {
					var r = n.queue();
					t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, i)));
					n.dequeue()
				},
				saveStyle: function(n) {
					n.data(s, n[0].style.cssText)
				},
				restoreStyle: function(n) {
					n[0].style.cssText = n.data(s) || "";
					n.removeData(s)
				},
				mode: function(n, t) {
					var i = n.is(":hidden");
					return "toggle" === t && (t = i ? "show" : "hide"), (i ? "hide" === t : "show" === t) && (t = "none"), t
				},
				getBaseline: function(n, t) {
					var i, r;
					switch (n[0]) {
						case "top":
							i = 0;
							break;
						case "middle":
							i = .5;
							break;
						case "bottom":
							i = 1;
							break;
						default:
							i = n[0] / t.height
					}
					switch (n[1]) {
						case "left":
							r = 0;
							break;
						case "center":
							r = .5;
							break;
						case "right":
							r = 1;
							break;
						default:
							r = n[1] / t.width
					}
					return {
						x: r,
						y: i
					}
				},
				createPlaceholder: function(t) {
					var i, r = t.css("position"),
						u = t.position();
					return t.css({
						marginTop: t.css("marginTop"),
						marginBottom: t.css("marginBottom"),
						marginLeft: t.css("marginLeft"),
						marginRight: t.css("marginRight")
					}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()), /^(static|relative)/.test(r) && (r = "absolute", i = n("<" + t[0].nodeName + ">").insertAfter(t).css({
						display: /^(inline|ruby)/.test(t.css("display")) ? "inline-block" : "block",
						visibility: "hidden",
						marginTop: t.css("marginTop"),
						marginBottom: t.css("marginBottom"),
						marginLeft: t.css("marginLeft"),
						marginRight: t.css("marginRight"),
						float: t.css("float")
					}).outerWidth(t.outerWidth()).outerHeight(t.outerHeight()).addClass("ui-effects-placeholder"), t.data(e + "placeholder", i)), t.css({
						position: r,
						left: u.left,
						top: u.top
					}), i
				},
				removePlaceholder: function(n) {
					var t = e + "placeholder",
						i = n.data(t);
					i && (i.remove(), n.removeData(t))
				},
				cleanUp: function(t) {
					n.effects.restoreStyle(t);
					n.effects.removePlaceholder(t)
				},
				setTransition: function(t, i, r, u) {
					return u = u || {}, n.each(i, function(n, i) {
						var f = t.cssUnit(i);
						f[0] > 0 && (u[i] = f[0] * r + f[1])
					}), u
				}
			});
			n.fn.extend({
				effect: function() {
					function o(t) {
						function c() {
							o.removeData(h);
							n.effects.cleanUp(o);
							"hide" === i.mode && o.hide();
							s()
						}

						function s() {
							n.isFunction(f) && f.call(o[0]);
							n.isFunction(t) && t()
						}
						var o = n(this);
						i.mode = l.shift();
						n.uiBackCompat === !1 || u ? "none" === i.mode ? (o[r](), s()) : e.call(o[0], i, c) : (o.is(":hidden") ? "hide" === r : "show" === r) ? (o[r](), s()) : e.call(o[0], i, s)
					}
					var i = t.apply(this, arguments),
						e = n.effects.effect[i.effect],
						u = e.mode,
						s = i.queue,
						c = s || "fx",
						f = i.complete,
						r = i.mode,
						l = [],
						a = function(t) {
							var f = n(this),
								i = n.effects.mode(f, r) || u;
							f.data(h, !0);
							l.push(i);
							u && ("show" === i || i === u && "hide" === i) && f.show();
							u && "none" === i || n.effects.saveStyle(f);
							n.isFunction(t) && t()
						};
					return n.fx.off || !e ? r ? this[r](i.duration, f) : this.each(function() {
						f && f.call(this)
					}) : s === !1 ? this.each(a).each(o) : this.queue(c, a).queue(c, o)
				},
				show: function(n) {
					return function(r) {
						if (i(r)) return n.apply(this, arguments);
						var u = t.apply(this, arguments);
						return u.mode = "show", this.effect.call(this, u)
					}
				}(n.fn.show),
				hide: function(n) {
					return function(r) {
						if (i(r)) return n.apply(this, arguments);
						var u = t.apply(this, arguments);
						return u.mode = "hide", this.effect.call(this, u)
					}
				}(n.fn.hide),
				toggle: function(n) {
					return function(r) {
						if (i(r) || "boolean" == typeof r) return n.apply(this, arguments);
						var u = t.apply(this, arguments);
						return u.mode = "toggle", this.effect.call(this, u)
					}
				}(n.fn.toggle),
				cssUnit: function(t) {
					var i = this.css(t),
						r = [];
					return n.each(["em", "px", "%", "pt"], function(n, t) {
						i.indexOf(t) > 0 && (r = [parseFloat(i), t])
					}), r
				},
				cssClip: function(n) {
					return n ? this.css("clip", "rect(" + n.top + "px " + n.right + "px " + n.bottom + "px " + n.left + "px)") : r(this.css("clip"), this)
				},
				transfer: function(t, i) {
					var u = n(this),
						r = n(t.to),
						f = "fixed" === r.css("position"),
						e = n("body"),
						o = f ? e.scrollTop() : 0,
						s = f ? e.scrollLeft() : 0,
						h = r.offset(),
						l = {
							top: h.top - o,
							left: h.left - s,
							height: r.innerHeight(),
							width: r.innerWidth()
						},
						c = u.offset(),
						a = n("<div class='ui-effects-transfer'><\/div>").appendTo("body").addClass(t.className).css({
							top: c.top - o,
							left: c.left - s,
							height: u.innerHeight(),
							width: u.innerWidth(),
							position: f ? "fixed" : "absolute"
						}).animate(l, t.duration, t.easing, function() {
							a.remove();
							n.isFunction(i) && i()
						})
				}
			});
			n.fx.step.clip = function(t) {
				t.clipInit || (t.start = n(t.elem).cssClip(), "string" == typeof t.end && (t.end = r(t.end, t.elem)), t.clipInit = !0);
				n(t.elem).cssClip({
					top: t.pos * (t.end.top - t.start.top) + t.start.top,
					right: t.pos * (t.end.right - t.start.right) + t.start.right,
					bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
					left: t.pos * (t.end.left - t.start.left) + t.start.left
				})
			}
		}(),
		function() {
			var t = {};
			n.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(n, i) {
				t[i] = function(t) {
					return Math.pow(t, n + 2)
				}
			});
			n.extend(t, {
				Sine: function(n) {
					return 1 - Math.cos(n * Math.PI / 2)
				},
				Circ: function(n) {
					return 1 - Math.sqrt(1 - n * n)
				},
				Elastic: function(n) {
					return 0 === n || 1 === n ? n : -Math.pow(2, 8 * (n - 1)) * Math.sin((80 * (n - 1) - 7.5) * Math.PI / 15)
				},
				Back: function(n) {
					return n * n * (3 * n - 2)
				},
				Bounce: function(n) {
					for (var t, i = 4;
						((t = Math.pow(2, --i)) - 1) / 11 > n;);
					return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * t - 2) / 22 - n, 2)
				}
			});
			n.each(t, function(t, i) {
				n.easing["easeIn" + t] = i;
				n.easing["easeOut" + t] = function(n) {
					return 1 - i(1 - n)
				};
				n.easing["easeInOut" + t] = function(n) {
					return .5 > n ? i(2 * n) / 2 : 1 - i(-2 * n + 2) / 2
				}
			})
		}();
	w = n.effects;
	n.effects.define("blind", "hide", function(t, i) {
		var e = {
				up: ["bottom", "top"],
				vertical: ["bottom", "top"],
				down: ["top", "bottom"],
				left: ["right", "left"],
				horizontal: ["right", "left"],
				right: ["left", "right"]
			},
			u = n(this),
			o = t.direction || "up",
			s = u.cssClip(),
			r = {
				clip: n.extend({}, s)
			},
			f = n.effects.createPlaceholder(u);
		r.clip[e[o][0]] = r.clip[e[o][1]];
		"show" === t.mode && (u.cssClip(r.clip), f && f.css(n.effects.clipToBox(r)), r.clip = s);
		f && f.animate(n.effects.clipToBox(r), t.duration, t.easing);
		u.animate(r, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.effects.define("bounce", function(t, i) {
		var e, o, a, u = n(this),
			p = t.mode,
			s = "hide" === p,
			w = "show" === p,
			h = t.direction || "up",
			r = t.distance,
			v = t.times || 5,
			b = 2 * v + (w || s ? 1 : 0),
			c = t.duration / b,
			l = t.easing,
			f = "up" === h || "down" === h ? "top" : "left",
			y = "up" === h || "left" === h,
			k = 0,
			d = u.queue().length;
		for (n.effects.createPlaceholder(u), a = u.css(f), r || (r = u["top" === f ? "outerHeight" : "outerWidth"]() / 3), w && (o = {
				opacity: 1
			}, o[f] = a, u.css("opacity", 0).css(f, y ? 2 * -r : 2 * r).animate(o, c, l)), s && (r /= Math.pow(2, v - 1)), o = {}, o[f] = a; v > k; k++) e = {}, e[f] = (y ? "-=" : "+=") + r, u.animate(e, c, l).animate(o, c, l), r = s ? 2 * r : r / 2;
		s && (e = {
			opacity: 0
		}, e[f] = (y ? "-=" : "+=") + r, u.animate(e, c, l));
		u.queue(i);
		n.effects.unshift(u, d, b + 1)
	});
	n.effects.define("clip", "hide", function(t, i) {
		var r, u = {},
			f = n(this),
			e = t.direction || "vertical",
			o = "both" === e,
			s = o || "horizontal" === e,
			h = o || "vertical" === e;
		r = f.cssClip();
		u.clip = {
			top: h ? (r.bottom - r.top) / 2 : r.top,
			right: s ? (r.right - r.left) / 2 : r.right,
			bottom: h ? (r.bottom - r.top) / 2 : r.bottom,
			left: s ? (r.right - r.left) / 2 : r.left
		};
		n.effects.createPlaceholder(f);
		"show" === t.mode && (f.cssClip(u.clip), u.clip = r);
		f.animate(u, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.effects.define("drop", "hide", function(t, i) {
		var e, u = n(this),
			h = t.mode,
			c = "show" === h,
			f = t.direction || "left",
			o = "up" === f || "down" === f ? "top" : "left",
			s = "up" === f || "left" === f ? "-=" : "+=",
			l = "+=" === s ? "-=" : "+=",
			r = {
				opacity: 0
			};
		n.effects.createPlaceholder(u);
		e = t.distance || u["top" === o ? "outerHeight" : "outerWidth"](!0) / 2;
		r[o] = s + e;
		c && (u.css(r), r[o] = l + e, r.opacity = 1);
		u.animate(r, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.effects.define("explode", "hide", function(t, i) {
		function b() {
			p.push(this);
			p.length === e * c && k()
		}

		function k() {
			o.css({
				visibility: "visible"
			});
			n(p).remove();
			i()
		}
		for (var u, l, a, v, y, e = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, c = e, o = n(this), d = t.mode, f = "show" === d, w = o.show().css("visibility", "hidden").offset(), s = Math.ceil(o.outerWidth() / c), h = Math.ceil(o.outerHeight() / e), p = [], r = 0; e > r; r++)
			for (a = w.top + r * h, y = r - (e - 1) / 2, u = 0; c > u; u++) l = w.left + u * s, v = u - (c - 1) / 2, o.clone().appendTo("body").wrap("<div><\/div>").css({
				position: "absolute",
				visibility: "visible",
				left: -u * s,
				top: -r * h
			}).parent().addClass("ui-effects-explode").css({
				position: "absolute",
				overflow: "hidden",
				width: s,
				height: h,
				left: l + (f ? v * s : 0),
				top: a + (f ? y * h : 0),
				opacity: f ? 0 : 1
			}).animate({
				left: l + (f ? 0 : v * s),
				top: a + (f ? 0 : y * h),
				opacity: f ? 1 : 0
			}, t.duration || 500, t.easing, b)
	});
	n.effects.define("fade", "toggle", function(t, i) {
		var r = "show" === t.mode;
		n(this).css("opacity", r ? 0 : 1).animate({
			opacity: r ? 1 : 0
		}, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.effects.define("fold", "hide", function(t, i) {
		var u = n(this),
			l = t.mode,
			v = "show" === l,
			y = "hide" === l,
			o = t.size || 15,
			a = /([0-9]+)%/.exec(o),
			p = !!t.horizFirst,
			f = p ? ["right", "bottom"] : ["bottom", "right"],
			s = t.duration / 2,
			h = n.effects.createPlaceholder(u),
			e = u.cssClip(),
			c = {
				clip: n.extend({}, e)
			},
			r = {
				clip: n.extend({}, e)
			},
			w = [e[f[0]], e[f[1]]],
			b = u.queue().length;
		a && (o = parseInt(a[1], 10) / 100 * w[y ? 0 : 1]);
		c.clip[f[0]] = o;
		r.clip[f[0]] = o;
		r.clip[f[1]] = 0;
		v && (u.cssClip(r.clip), h && h.css(n.effects.clipToBox(r)), r.clip = e);
		u.queue(function(i) {
			h && h.animate(n.effects.clipToBox(c), s, t.easing).animate(n.effects.clipToBox(r), s, t.easing);
			i()
		}).animate(c, s, t.easing).animate(r, s, t.easing).queue(i);
		n.effects.unshift(u, b, 4)
	});
	n.effects.define("highlight", "show", function(t, i) {
		var r = n(this),
			u = {
				backgroundColor: r.css("backgroundColor")
			};
		"hide" === t.mode && (u.opacity = 0);
		n.effects.saveStyle(r);
		r.css({
			backgroundImage: "none",
			backgroundColor: t.color || "#ffff99"
		}).animate(u, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.effects.define("size", function(t, i) {
		var l, r, p, u = n(this),
			v = ["fontSize"],
			s = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
			h = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
			w = t.mode,
			y = "effect" !== w,
			c = t.scale || "both",
			b = t.origin || ["middle", "center"],
			k = u.css("position"),
			a = u.position(),
			o = n.effects.scaledDimensions(u),
			f = t.from || o,
			e = t.to || n.effects.scaledDimensions(u, 0);
		n.effects.createPlaceholder(u);
		"show" === w && (p = f, f = e, e = p);
		r = {
			from: {
				y: f.height / o.height,
				x: f.width / o.width
			},
			to: {
				y: e.height / o.height,
				x: e.width / o.width
			}
		};
		("box" === c || "both" === c) && (r.from.y !== r.to.y && (f = n.effects.setTransition(u, s, r.from.y, f), e = n.effects.setTransition(u, s, r.to.y, e)), r.from.x !== r.to.x && (f = n.effects.setTransition(u, h, r.from.x, f), e = n.effects.setTransition(u, h, r.to.x, e)));
		("content" === c || "both" === c) && r.from.y !== r.to.y && (f = n.effects.setTransition(u, v, r.from.y, f), e = n.effects.setTransition(u, v, r.to.y, e));
		b && (l = n.effects.getBaseline(b, o), f.top = (o.outerHeight - f.outerHeight) * l.y + a.top, f.left = (o.outerWidth - f.outerWidth) * l.x + a.left, e.top = (o.outerHeight - e.outerHeight) * l.y + a.top, e.left = (o.outerWidth - e.outerWidth) * l.x + a.left);
		u.css(f);
		("content" === c || "both" === c) && (s = s.concat(["marginTop", "marginBottom"]).concat(v), h = h.concat(["marginLeft", "marginRight"]), u.find("*[width]").each(function() {
			var i = n(this),
				u = n.effects.scaledDimensions(i),
				f = {
					height: u.height * r.from.y,
					width: u.width * r.from.x,
					outerHeight: u.outerHeight * r.from.y,
					outerWidth: u.outerWidth * r.from.x
				},
				e = {
					height: u.height * r.to.y,
					width: u.width * r.to.x,
					outerHeight: u.height * r.to.y,
					outerWidth: u.width * r.to.x
				};
			r.from.y !== r.to.y && (f = n.effects.setTransition(i, s, r.from.y, f), e = n.effects.setTransition(i, s, r.to.y, e));
			r.from.x !== r.to.x && (f = n.effects.setTransition(i, h, r.from.x, f), e = n.effects.setTransition(i, h, r.to.x, e));
			y && n.effects.saveStyle(i);
			i.css(f);
			i.animate(e, t.duration, t.easing, function() {
				y && n.effects.restoreStyle(i)
			})
		}));
		u.animate(e, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: function() {
				var t = u.offset();
				0 === e.opacity && u.css("opacity", f.opacity);
				y || (u.css("position", "static" === k ? "relative" : k).offset(t), n.effects.saveStyle(u));
				i()
			}
		})
	});
	n.effects.define("scale", function(t, i) {
		var u = n(this),
			f = t.mode,
			e = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) ? 0 : "effect" !== f ? 0 : 100),
			r = n.extend(!0, {
				from: n.effects.scaledDimensions(u),
				to: n.effects.scaledDimensions(u, e, t.direction || "both"),
				origin: t.origin || ["middle", "center"]
			}, t);
		t.fade && (r.from.opacity = 1, r.to.opacity = 0);
		n.effects.effect.size.call(this, r, i)
	});
	n.effects.define("puff", "hide", function(t, i) {
		var r = n.extend(!0, {}, t, {
			fade: !0,
			percent: parseInt(t.percent, 10) || 150
		});
		n.effects.effect.scale.call(this, r, i)
	});
	n.effects.define("pulsate", "show", function(t, i) {
		var r = n(this),
			e = t.mode,
			o = "show" === e,
			c = "hide" === e,
			l = o || c,
			f = 2 * (t.times || 5) + (l ? 1 : 0),
			s = t.duration / f,
			u = 0,
			h = 1,
			a = r.queue().length;
		for ((o || !r.is(":visible")) && (r.css("opacity", 0).show(), u = 1); f > h; h++) r.animate({
			opacity: u
		}, s, t.easing), u = 1 - u;
		r.animate({
			opacity: u
		}, s, t.easing);
		r.queue(i);
		n.effects.unshift(r, a, f + 1)
	});
	n.effects.define("shake", function(t, i) {
		var l = 1,
			r = n(this),
			f = t.direction || "left",
			e = t.distance || 20,
			a = t.times || 3,
			v = 2 * a + 1,
			u = Math.round(t.duration / v),
			o = "up" === f || "down" === f ? "top" : "left",
			s = "up" === f || "left" === f,
			h = {},
			c = {},
			y = {},
			p = r.queue().length;
		for (n.effects.createPlaceholder(r), h[o] = (s ? "-=" : "+=") + e, c[o] = (s ? "+=" : "-=") + 2 * e, y[o] = (s ? "-=" : "+=") + 2 * e, r.animate(h, u, t.easing); a > l; l++) r.animate(c, u, t.easing).animate(y, u, t.easing);
		r.animate(c, u, t.easing).animate(h, u / 2, t.easing).queue(i);
		n.effects.unshift(r, p, v + 1)
	});
	n.effects.define("slide", "show", function(t, i) {
		var s, o, u = n(this),
			h = {
				up: ["bottom", "top"],
				down: ["top", "bottom"],
				left: ["right", "left"],
				right: ["left", "right"]
			},
			c = t.mode,
			f = t.direction || "left",
			e = "up" === f || "down" === f ? "top" : "left",
			l = "up" === f || "left" === f,
			a = t.distance || u["top" === e ? "outerHeight" : "outerWidth"](!0),
			r = {};
		n.effects.createPlaceholder(u);
		s = u.cssClip();
		o = u.position()[e];
		r[e] = (l ? -1 : 1) * a + o;
		r.clip = u.cssClip();
		r.clip[h[f][1]] = r.clip[h[f][0]];
		"show" === c && (u.cssClip(r.clip), u.css(e, r[e]), r.clip = s, r[e] = o);
		u.animate(r, {
			queue: !1,
			duration: t.duration,
			easing: t.easing,
			complete: i
		})
	});
	n.uiBackCompat !== !1 && (w = n.effects.define("transfer", function(t, i) {
		n(this).transfer(t, i)
	}))
})