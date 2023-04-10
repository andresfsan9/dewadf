! function(n) {
	"function" == typeof define && define.amd ? define(["jquery"], n) : "object" == typeof module && module.exports ? module.exports = n(require("jquery")) : n(jQuery)
}(function(n) {
	n.extend(n.fn, {
		validate: function(t) {
			if (!this.length) return void(t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
			var i = n.data(this[0], "validator");
			return i ? i : (this.attr("novalidate", "novalidate"), i = new n.validator(t, this[0]), n.data(this[0], "validator", i), i.settings.onsubmit && (this.on("click.validate", ":submit", function(t) {
				i.submitButton = t.currentTarget;
				n(this).hasClass("cancel") && (i.cancelSubmit = !0);
				void 0 !== n(this).attr("formnovalidate") && (i.cancelSubmit = !0)
			}), this.on("submit.validate", function(t) {
				function r() {
					var r, u;
					return i.submitButton && (i.settings.submitHandler || i.formSubmitted) && (r = n("<input type='hidden'/>").attr("name", i.submitButton.name).val(n(i.submitButton).val()).appendTo(i.currentForm)), !(i.settings.submitHandler && !i.settings.debug) || (u = i.settings.submitHandler.call(i, i.currentForm, t), r && r.remove(), void 0 !== u && u)
				}
				return i.settings.debug && t.preventDefault(), i.cancelSubmit ? (i.cancelSubmit = !1, r()) : i.form() ? i.pendingRequest ? (i.formSubmitted = !0, !1) : r() : (i.focusInvalid(), !1)
			})), i)
		},
		valid: function() {
			var t, i, r;
			return n(this[0]).is("form") ? t = this.validate().form() : (r = [], t = !0, i = n(this[0].form).validate(), this.each(function() {
				t = i.element(this) && t;
				t || (r = r.concat(i.errorList))
			}), i.errorList = r), t
		},
		rules: function(t, i) {
			var e, s, f, u, o, h, r = this[0],
				c = "undefined" != typeof this.attr("contenteditable") && "false" !== this.attr("contenteditable");
			if (null != r && (!r.form && c && (r.form = this.closest("form")[0], r.name = this.attr("name")), null != r.form)) {
				if (t) switch (e = n.data(r.form, "validator").settings, s = e.rules, f = n.validator.staticRules(r), t) {
					case "add":
						n.extend(f, n.validator.normalizeRule(i));
						delete f.messages;
						s[r.name] = f;
						i.messages && (e.messages[r.name] = n.extend(e.messages[r.name], i.messages));
						break;
					case "remove":
						return i ? (h = {}, n.each(i.split(/\s/), function(n, t) {
							h[t] = f[t];
							delete f[t]
						}), h) : (delete s[r.name], f)
				}
				return u = n.validator.normalizeRules(n.extend({}, n.validator.classRules(r), n.validator.attributeRules(r), n.validator.dataRules(r), n.validator.staticRules(r)), r), u.required && (o = u.required, delete u.required, u = n.extend({
					required: o
				}, u)), u.remote && (o = u.remote, delete u.remote, u = n.extend(u, {
					remote: o
				})), u
			}
		}
	});
	n.extend(n.expr.pseudos || n.expr[":"], {
		blank: function(t) {
			return !n.trim("" + n(t).val())
		},
		filled: function(t) {
			var i = n(t).val();
			return null !== i && !!n.trim("" + i)
		},
		unchecked: function(t) {
			return !n(t).prop("checked")
		}
	});
	n.validator = function(t, i) {
		this.settings = n.extend(!0, {}, n.validator.defaults, t);
		this.currentForm = i;
		this.init()
	};
	n.validator.format = function(t, i) {
		return 1 === arguments.length ? function() {
			var i = n.makeArray(arguments);
			return i.unshift(t), n.validator.format.apply(this, i)
		} : void 0 === i ? t : (arguments.length > 2 && i.constructor !== Array && (i = n.makeArray(arguments).slice(1)), i.constructor !== Array && (i = [i]), n.each(i, function(n, i) {
			t = t.replace(new RegExp("\\{" + n + "\\}", "g"), function() {
				return i
			})
		}), t)
	};
	n.extend(n.validator, {
		defaults: {
			messages: {},
			groups: {},
			rules: {},
			errorClass: "error",
			pendingClass: "pending",
			validClass: "valid",
			errorElement: "label",
			focusCleanup: !1,
			focusInvalid: !0,
			errorContainer: n([]),
			errorLabelContainer: n([]),
			onsubmit: !0,
			ignore: ":hidden:not('.validateThisField')",
			ignoreTitle: !1,
			onfocusin: function(n) {
				this.lastActive = n;
				this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, n, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(n)))
			},
			onfocusout: function(n) {
				!this.checkable(n) && (n.name in this.submitted || !this.optional(n)) && this.element(n)
			},
			onkeyup: function(t, i) {
				9 === i.which && "" === this.elementValue(t) || n.inArray(i.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) !== -1 || (t.name in this.submitted || t.name in this.invalid) && this.element(t)
			},
			onclick: function(n) {
				n.name in this.submitted ? this.element(n) : n.parentNode.name in this.submitted && this.element(n.parentNode)
			},
			highlight: function(t, i, r) {
				"radio" === t.type ? this.findByName(t.name).addClass(i).removeClass(r) : n(t).addClass(i).removeClass(r)
			},
			unhighlight: function(t, i, r) {
				"radio" === t.type ? this.findByName(t.name).removeClass(i).addClass(r) : n(t).removeClass(i).addClass(r)
			}
		},
		setDefaults: function(t) {
			n.extend(n.validator.defaults, t)
		},
		messages: {
			required: "This field is required.",
			remote: "Please fix this field.",
			email: "Please enter a valid email address.",
			url: "Please enter a valid URL.",
			date: "Please enter a valid date.",
			dateISO: "Please enter a valid date (ISO).",
			number: "Please enter a valid number.",
			digits: "Please enter only digits.",
			equalTo: "Please enter the same value again.",
			maxlength: n.validator.format("Please enter no more than {0} characters."),
			minlength: n.validator.format("Please enter at least {0} characters."),
			rangelength: n.validator.format("Please enter a value between {0} and {1} characters long."),
			range: n.validator.format("Please enter a value between {0} and {1}."),
			max: n.validator.format("Please enter a value less than or equal to {0}."),
			min: n.validator.format("Please enter a value greater than or equal to {0}."),
			step: n.validator.format("Please enter a multiple of {0}.")
		},
		autoCreateRanges: !1,
		prototype: {
			init: function() {
				function i(t) {
					var e = "undefined" != typeof n(this).attr("contenteditable") && "false" !== n(this).attr("contenteditable");
					if (!this.form && e && (this.form = n(this).closest("form")[0], this.name = n(this).attr("name")), r === this.form) {
						var u = n.data(this.form, "validator"),
							f = "on" + t.type.replace(/^validate/, ""),
							i = u.settings;
						i[f] && !n(this).is(i.ignore) && i[f].call(u, this, t)
					}
				}
				this.labelContainer = n(this.settings.errorLabelContainer);
				this.errorContext = this.labelContainer.length && this.labelContainer || n(this.currentForm);
				this.containers = n(this.settings.errorContainer).add(this.settings.errorLabelContainer);
				this.submitted = {};
				this.valueCache = {};
				this.pendingRequest = 0;
				this.pending = {};
				this.invalid = {};
				this.reset();
				var t, r = this.currentForm,
					u = this.groups = {};
				n.each(this.settings.groups, function(t, i) {
					"string" == typeof i && (i = i.split(/\s/));
					n.each(i, function(n, i) {
						u[i] = t
					})
				});
				t = this.settings.rules;
				n.each(t, function(i, r) {
					t[i] = n.validator.normalizeRule(r)
				});
				n(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox'], [contenteditable], [type='button']", i).on("click.validate", "select, option, [type='radio'], [type='checkbox']", i);
				this.settings.invalidHandler && n(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler)
			},
			form: function() {
				return this.checkForm(), n.extend(this.submitted, this.errorMap), this.invalid = n.extend({}, this.errorMap), this.valid() || n(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
			},
			checkForm: function() {
				this.prepareForm();
				for (var n = 0, t = this.currentElements = this.elements(); t[n]; n++) this.check(t[n]);
				return this.valid()
			},
			element: function(t) {
				var e, o, i = this.clean(t),
					r = this.validationTargetFor(i),
					u = this,
					f = !0;
				return void 0 === r ? delete this.invalid[i.name] : (this.prepareElement(r), this.currentElements = n(r), o = this.groups[r.name], o && n.each(this.groups, function(n, t) {
					t === o && n !== r.name && (i = u.validationTargetFor(u.clean(u.findByName(n))), i && i.name in u.invalid && (u.currentElements.push(i), f = u.check(i) && f))
				}), e = this.check(r) !== !1, f = f && e, this.invalid[r.name] = e ? !1 : !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), n(t).attr("aria-invalid", !e)), f
			},
			showErrors: function(t) {
				if (t) {
					var i = this;
					n.extend(this.errorMap, t);
					this.errorList = n.map(this.errorMap, function(n, t) {
						return {
							message: n,
							element: i.findByName(t)[0]
						}
					});
					this.successList = n.grep(this.successList, function(n) {
						return !(n.name in t)
					})
				}
				this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
			},
			resetForm: function() {
				n.fn.resetForm && n(this.currentForm).resetForm();
				this.invalid = {};
				this.submitted = {};
				this.prepareForm();
				this.hideErrors();
				var t = this.elements().removeData("previousValue").removeAttr("aria-invalid");
				this.resetElements(t)
			},
			resetElements: function(n) {
				var t;
				if (this.settings.unhighlight)
					for (t = 0; n[t]; t++) this.settings.unhighlight.call(this, n[t], this.settings.errorClass, ""), this.findByName(n[t].name).removeClass(this.settings.validClass);
				else n.removeClass(this.settings.errorClass).removeClass(this.settings.validClass)
			},
			numberOfInvalids: function() {
				return this.objectLength(this.invalid)
			},
			objectLength: function(n) {
				var t, i = 0;
				for (t in n) void 0 !== n[t] && null !== n[t] && n[t] !== !1 && i++;
				return i
			},
			hideErrors: function() {
				this.hideThese(this.toHide)
			},
			hideThese: function(n) {
				n.not(this.containers).text("");
				this.addWrapper(n).hide()
			},
			valid: function() {
				return 0 === this.size()
			},
			size: function() {
				return this.errorList.length
			},
			focusInvalid: function() {
				if (this.settings.focusInvalid) try {
					n(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").trigger("focus").trigger("focusin")
				} catch (t) {}
			},
			findLastActive: function() {
				var t = this.lastActive;
				return t && 1 === n.grep(this.errorList, function(n) {
					return n.element.name === t.name
				}).length && t
			},
			elements: function() {
				var t = this,
					i = {};
				return n(this.currentForm).find("input, select, textarea, [contenteditable]").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function() {
					var r = this.name || n(this).attr("name"),
						u = "undefined" != typeof n(this).attr("contenteditable") && "false" !== n(this).attr("contenteditable");
					return !r && t.settings.debug && window.console && console.error("%o has no name assigned", this), u && (this.form = n(this).closest("form")[0], this.name = r), this.form === t.currentForm && !(r in i || !t.objectLength(n(this).rules())) && (i[r] = !0, !0)
				})
			},
			clean: function(t) {
				return n(t)[0]
			},
			errors: function() {
				var t = this.settings.errorClass.split(" ").join(".");
				return n(this.settings.errorElement + "." + t, this.errorContext)
			},
			resetInternals: function() {
				this.successList = [];
				this.errorList = [];
				this.errorMap = {};
				this.toShow = n([]);
				this.toHide = n([])
			},
			reset: function() {
				this.resetInternals();
				this.currentElements = n([])
			},
			prepareForm: function() {
				this.reset();
				this.toHide = this.errors().add(this.containers)
			},
			prepareElement: function(n) {
				this.reset();
				this.toHide = this.errorsFor(n)
			},
			elementValue: function(t) {
				var i, r, u = n(t),
					f = t.type,
					e = "undefined" != typeof u.attr("contenteditable") && "false" !== u.attr("contenteditable");
				return "radio" === f || "checkbox" === f ? this.findByName(t.name).filter(":checked").val() : "number" === f && "undefined" != typeof t.validity ? t.validity.badInput ? "NaN" : u.val() : (i = e ? u.text() : u.val(), "file" === f ? "C:\\fakepath\\" === i.substr(0, 12) ? i.substr(12) : (r = i.lastIndexOf("/"), r >= 0 ? i.substr(r + 1) : (r = i.lastIndexOf("\\"), r >= 0 ? i.substr(r + 1) : i)) : "string" == typeof i ? i.replace(/\r/g, "") : i)
			},
			check: function(t) {
				t = this.validationTargetFor(this.clean(t));
				var u, f, r, e, i = n(t).rules(),
					c = n.map(i, function(n, t) {
						return t
					}).length,
					s = !1,
					h = this.elementValue(t);
				"function" == typeof i.normalizer ? e = i.normalizer : "function" == typeof this.settings.normalizer && (e = this.settings.normalizer);
				e && (h = e.call(t, h), delete i.normalizer);
				for (f in i) {
					r = {
						method: f,
						parameters: i[f]
					};
					try {
						if (u = n.validator.methods[f].call(this, h, t, r.parameters), "dependency-mismatch" === u && 1 === c) {
							s = !0;
							continue
						}
						if (s = !1, "pending" === u) return void(this.toHide = this.toHide.not(this.errorsFor(t)));
						if (!u) return this.formatAndAdd(t, r), !1
					} catch (o) {
						throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method.", o), o instanceof TypeError && (o.message += ".  Exception occurred when checking element " + t.id + ", check the '" + r.method + "' method."), o;
					}
				}
				if (!s) return this.objectLength(i) && this.successList.push(t), !0
			},
			customDataMessage: function(t, i) {
				return n(t).data("msg" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()) || n(t).data("msg")
			},
			customMessage: function(n, t) {
				var i = this.settings.messages[n];
				return i && (i.constructor === String ? i : i[t])
			},
			findDefined: function() {
				for (var n = 0; n < arguments.length; n++)
					if (void 0 !== arguments[n]) return arguments[n]
			},
			defaultMessage: function(t, i) {
				"string" == typeof i && (i = {
					method: i
				});
				var r = this.findDefined(this.customMessage(t.name, i.method), this.customDataMessage(t, i.method), !this.settings.ignoreTitle && t.title || void 0, n.validator.messages[i.method], "<strong>Warning: No message defined for " + t.name + "<\/strong>"),
					u = /\$?\{(\d+)\}/g;
				return "function" == typeof r ? r = r.call(this, i.parameters, t) : u.test(r) && (r = n.validator.format(r.replace(u, "{$1}"), i.parameters)), r
			},
			formatAndAdd: function(n, t) {
				var i = this.defaultMessage(n, t);
				this.errorList.push({
					message: i,
					element: n,
					method: t.method
				});
				this.errorMap[n.name] = i;
				this.submitted[n.name] = i
			},
			addWrapper: function(n) {
				return this.settings.wrapper && (n = n.add(n.parent(this.settings.wrapper))), n
			},
			defaultShowErrors: function() {
				for (var i, t, n = 0; this.errorList[n]; n++) t = this.errorList[n], this.settings.highlight && this.settings.highlight.call(this, t.element, this.settings.errorClass, this.settings.validClass), this.showLabel(t.element, t.message);
				if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
					for (n = 0; this.successList[n]; n++) this.showLabel(this.successList[n]);
				if (this.settings.unhighlight)
					for (n = 0, i = this.validElements(); i[n]; n++) this.settings.unhighlight.call(this, i[n], this.settings.errorClass, this.settings.validClass);
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show()
			},
			validElements: function() {
				return this.currentElements.not(this.invalidElements())
			},
			invalidElements: function() {
				return n(this.errorList).map(function() {
					return this.element
				})
			},
			showLabel: function(t, i) {
				var u, s, e, o, r = this.errorsFor(t),
					h = this.idOrName(t),
					f = n(t).attr("aria-describedby");
				r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass), r.html(i)) : (r = n("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(i || ""), u = r, this.settings.wrapper && (u = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(u) : this.settings.errorPlacement ? this.settings.errorPlacement.call(this, u, n(t)) : u.insertAfter(t), r.is("label") ? r.attr("for", h) : 0 === r.parents("label[for='" + this.escapeCssMeta(h) + "']").length && (e = r.attr("id"), f ? f.match(new RegExp("\\b" + this.escapeCssMeta(e) + "\\b")) || (f += " " + e) : f = e, n(t).attr("aria-describedby", f), s = this.groups[t.name], s && (o = this, n.each(o.groups, function(t, i) {
					i === s && n("[name='" + o.escapeCssMeta(t) + "']", o.currentForm).attr("aria-describedby", r.attr("id"))
				}))));
				!i && this.settings.success && (r.text(""), "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t));
				this.toShow = this.toShow.add(r)
			},
			errorsFor: function(t) {
				var r = this.escapeCssMeta(this.idOrName(t)),
					u = n(t).attr("aria-describedby"),
					i = "label[for='" + r + "'], label[for='" + r + "'] *";
				return u && (i = i + ", #" + this.escapeCssMeta(u).replace(/\s+/g, ", #")), this.errors().filter(i)
			},
			escapeCssMeta: function(n) {
				return n.replace(/([\\!"#$%&'()*+,.\/:;<=>?@\[\]^`{|}~])/g, "\\$1")
			},
			idOrName: function(n) {
				return this.groups[n.name] || (this.checkable(n) ? n.name : n.id || n.name)
			},
			validationTargetFor: function(t) {
				return this.checkable(t) && (t = this.findByName(t.name)), n(t).not(this.settings.ignore)[0]
			},
			checkable: function(n) {
				return /radio|checkbox/i.test(n.type)
			},
			findByName: function(t) {
				return n(this.currentForm).find("[name='" + this.escapeCssMeta(t) + "']")
			},
			getLength: function(t, i) {
				switch (i.nodeName.toLowerCase()) {
					case "select":
						return n("option:selected", i).length;
					case "input":
						if (this.checkable(i)) return this.findByName(i.name).filter(":checked").length
				}
				return t.length
			},
			depend: function(n, t) {
				return !this.dependTypes[typeof n] || this.dependTypes[typeof n](n, t)
			},
			dependTypes: {
				boolean: function(n) {
					return n
				},
				string: function(t, i) {
					return !!n(t, i.form).length
				},
				"function": function(n, t) {
					return n(t)
				}
			},
			optional: function(t) {
				var i = this.elementValue(t);
				return !n.validator.methods.required.call(this, i, t) && "dependency-mismatch"
			},
			startRequest: function(t) {
				this.pending[t.name] || (this.pendingRequest++, n(t).addClass(this.settings.pendingClass), this.pending[t.name] = !0)
			},
			stopRequest: function(t, i) {
				this.pendingRequest--;
				this.pendingRequest < 0 && (this.pendingRequest = 0);
				delete this.pending[t.name];
				n(t).removeClass(this.settings.pendingClass);
				i && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (n(this.currentForm).submit(), this.submitButton && n("input:hidden[name='" + this.submitButton.name + "']", this.currentForm).remove(), this.formSubmitted = !1) : !i && 0 === this.pendingRequest && this.formSubmitted && (n(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
			},
			previousValue: function(t, i) {
				return i = "string" == typeof i && i || "remote", n.data(t, "previousValue") || n.data(t, "previousValue", {
					old: null,
					valid: !0,
					message: this.defaultMessage(t, {
						method: i
					})
				})
			},
			destroy: function() {
				this.resetForm();
				n(this.currentForm).off(".validate").removeData("validator").find(".validate-equalTo-blur").off(".validate-equalTo").removeClass("validate-equalTo-blur").find(".validate-lessThan-blur").off(".validate-lessThan").removeClass("validate-lessThan-blur").find(".validate-lessThanEqual-blur").off(".validate-lessThanEqual").removeClass("validate-lessThanEqual-blur").find(".validate-greaterThanEqual-blur").off(".validate-greaterThanEqual").removeClass("validate-greaterThanEqual-blur").find(".validate-greaterThan-blur").off(".validate-greaterThan").removeClass("validate-greaterThan-blur")
			}
		},
		classRuleSettings: {
			required: {
				required: !0
			},
			email: {
				email: !0
			},
			url: {
				url: !0
			},
			date: {
				date: !0
			},
			dateISO: {
				dateISO: !0
			},
			number: {
				number: !0
			},
			digits: {
				digits: !0
			},
			creditcard: {
				creditcard: !0
			}
		},
		addClassRules: function(t, i) {
			t.constructor === String ? this.classRuleSettings[t] = i : n.extend(this.classRuleSettings, t)
		},
		classRules: function(t) {
			var i = {},
				r = n(t).attr("class");
			return r && n.each(r.split(" "), function() {
				this in n.validator.classRuleSettings && n.extend(i, n.validator.classRuleSettings[this])
			}), i
		},
		normalizeAttributeRule: function(n, t, i, r) {
			/min|max|step/.test(i) && (null === t || /number|range|text/.test(t)) && (r = Number(r), isNaN(r) && (r = void 0));
			r || 0 === r ? n[i] = r : t === i && "range" !== t && (n[i] = !0)
		},
		attributeRules: function(t) {
			var r, i, u = {},
				f = n(t),
				e = t.getAttribute("type");
			for (r in n.validator.methods) "required" === r ? (i = t.getAttribute(r), "" === i && (i = !0), i = !!i) : i = f.attr(r), this.normalizeAttributeRule(u, e, r, i);
			return u.maxlength && /-1|2147483647|524288/.test(u.maxlength) && delete u.maxlength, u
		},
		dataRules: function(t) {
			var i, r, u = {},
				f = n(t),
				e = t.getAttribute("type");
			for (i in n.validator.methods) r = f.data("rule" + i.charAt(0).toUpperCase() + i.substring(1).toLowerCase()), "" === r && (r = !0), this.normalizeAttributeRule(u, e, i, r);
			return u
		},
		staticRules: function(t) {
			var i = {},
				r = n.data(t.form, "validator");
			return r.settings.rules && (i = n.validator.normalizeRule(r.settings.rules[t.name]) || {}), i
		},
		normalizeRules: function(t, i) {
			return n.each(t, function(r, u) {
				if (u === !1) return void delete t[r];
				if (u.param || u.depends) {
					var f = !0;
					switch (typeof u.depends) {
						case "string":
							f = !!n(u.depends, i.form).length;
							break;
						case "function":
							f = u.depends.call(i, i)
					}
					f ? t[r] = void 0 === u.param || u.param : (n.data(i.form, "validator").resetElements(n(i)), delete t[r])
				}
			}), n.each(t, function(r, u) {
				t[r] = n.isFunction(u) && "normalizer" !== r ? u(i) : u
			}), n.each(["minlength", "maxlength"], function() {
				t[this] && (t[this] = Number(t[this]))
			}), n.each(["rangelength", "range"], function() {
				var i;
				t[this] && (n.isArray(t[this]) ? t[this] = [Number(t[this][0]), Number(t[this][1])] : "string" == typeof t[this] && (i = t[this].replace(/[\[\]]/g, "").split(/[\s,]+/), t[this] = [Number(i[0]), Number(i[1])]))
			}), n.validator.autoCreateRanges && (null != t.min && null != t.max && (t.range = [t.min, t.max], delete t.min, delete t.max), null != t.minlength && null != t.maxlength && (t.rangelength = [t.minlength, t.maxlength], delete t.minlength, delete t.maxlength)), t
		},
		normalizeRule: function(t) {
			if ("string" == typeof t) {
				var i = {};
				n.each(t.split(/\s/), function() {
					i[this] = !0
				});
				t = i
			}
			return t
		},
		addMethod: function(t, i, r) {
			n.validator.methods[t] = i;
			n.validator.messages[t] = void 0 !== r ? r : n.validator.messages[t];
			i.length < 3 && n.validator.addClassRules(t, n.validator.normalizeRule(t))
		},
		methods: {
			required: function(t, i, r) {
				if (!this.depend(r, i)) return "dependency-mismatch";
				if ("select" === i.nodeName.toLowerCase()) {
					var u = n(i).val();
					return u && u.length > 0
				}
				return this.checkable(i) ? this.getLength(t, i) > 0 : void 0 !== t && null !== t && t.length > 0
			},
			email: function(n, t) {
				return this.optional(t) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(n)
			},
			url: function(n, t) {
				return this.optional(t) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[\/?#]\S*)?$/i.test(n)
			},
			date: function() {
				var n = !1;
				return function(t, i) {
					return n || (n = !0, this.settings.debug && window.console && console.warn("The `date` method is deprecated and will be removed in version '2.0.0'.\nPlease don't use it, since it relies on the Date constructor, which\nbehaves very differently across browsers and locales. Use `dateISO`\ninstead or one of the locale specific methods in `localizations/`\nand `additional-methods.js`.")), this.optional(i) || !/Invalid|NaN/.test(new Date(t).toString())
				}
			}(),
			dateISO: function(n, t) {
				return this.optional(t) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(n)
			},
			number: function(n, t) {
				return this.optional(t) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(n)
			},
			digits: function(n, t) {
				return this.optional(t) || /^\d+$/.test(n)
			},
			minlength: function(t, i, r) {
				var u = n.isArray(t) ? t.length : this.getLength(t, i);
				return this.optional(i) || u >= r
			},
			maxlength: function(t, i, r) {
				var u = n.isArray(t) ? t.length : this.getLength(t, i);
				return this.optional(i) || u <= r
			},
			rangelength: function(t, i, r) {
				var u = n.isArray(t) ? t.length : this.getLength(t, i);
				return this.optional(i) || u >= r[0] && u <= r[1]
			},
			min: function(n, t, i) {
				return this.optional(t) || n >= i
			},
			max: function(n, t, i) {
				return this.optional(t) || n <= i
			},
			range: function(n, t, i) {
				return this.optional(t) || n >= i[0] && n <= i[1]
			},
			step: function(t, i, r) {
				var u, f = n(i).attr("type"),
					h = "Step attribute on input type " + f + " is not supported.",
					c = new RegExp("\\b" + f + "\\b"),
					l = f && !c.test("text,number,range"),
					e = function(n) {
						var t = ("" + n).match(/(?:\.(\d+))?$/);
						return t && t[1] ? t[1].length : 0
					},
					o = function(n) {
						return Math.round(n * Math.pow(10, u))
					},
					s = !0;
				if (l) throw new Error(h);
				return u = e(r), (e(t) > u || o(t) % o(r) != 0) && (s = !1), this.optional(i) || s
			},
			equalTo: function(t, i, r) {
				var u = n(r);
				return this.settings.onfocusout && u.not(".validate-equalTo-blur").length && u.addClass("validate-equalTo-blur").on("blur.validate-equalTo", function() {
					n(i).valid()
				}), t === u.val()
			},
			remote: function(t, i, r, u) {
				if (this.optional(i)) return "dependency-mismatch";
				u = "string" == typeof u && u || "remote";
				var f, o, s, e = this.previousValue(i, u);
				return this.settings.messages[i.name] || (this.settings.messages[i.name] = {}), e.originalMessage = e.originalMessage || this.settings.messages[i.name][u], this.settings.messages[i.name][u] = e.message, r = "string" == typeof r && {
					url: r
				} || r, s = n.param(n.extend({
					data: t
				}, r.data)), e.old === s ? e.valid : (e.old = s, f = this, this.startRequest(i), o = {}, o[i.name] = t, n.ajax(n.extend(!0, {
					mode: "abort",
					port: "validate" + i.name,
					dataType: "json",
					data: o,
					context: f.currentForm,
					success: function(n) {
						var r, s, h, o = n === !0 || "true" === n;
						f.settings.messages[i.name][u] = e.originalMessage;
						o ? (h = f.formSubmitted, f.resetInternals(), f.toHide = f.errorsFor(i), f.formSubmitted = h, f.successList.push(i), f.invalid[i.name] = !1, f.showErrors()) : (r = {}, s = n || f.defaultMessage(i, {
							method: u,
							parameters: t
						}), r[i.name] = e.message = s, f.invalid[i.name] = !0, f.showErrors(r));
						e.valid = o;
						f.stopRequest(i, o)
					}
				}, r)), "pending")
			}
		}
	});
	var i, t = {};
	return n.ajaxPrefilter ? n.ajaxPrefilter(function(n, i, r) {
		var u = n.port;
		"abort" === n.mode && (t[u] && t[u].abort(), t[u] = r)
	}) : (i = n.ajax, n.ajax = function(r) {
		var f = ("mode" in r ? r : n.ajaxSettings).mode,
			u = ("port" in r ? r : n.ajaxSettings).port;
		return "abort" === f ? (t[u] && t[u].abort(), t[u] = i.apply(this, arguments), t[u]) : i.apply(this, arguments)
	}), n
})