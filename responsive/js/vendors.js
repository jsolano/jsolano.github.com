/* $Rev: 12807 $ */
/* ------------------------------------------ JQUERY PLUGINS (BEGIN) ------------------------------------------ */

if (jQuery) (function($) {
	$.extend($.fn, {
		scrollEvent:function(p) {
			var obj = {
				init:function(items, fun) {
					items.each(function() {
						var visibleAtTop = $(this).offset().top + $(this).height() >= window.scrollY;
						var visibleAtBottom = $(this).offset().top <= window.scrollY + $(window).height();
						if (visibleAtTop && visibleAtBottom) {
							fun($(this).attr('id'), true, null);
						} else {
							fun($(this).attr('id'), false, (visibleAtTop ? 'bottom' : 'top'));
						}
					});
				}
			};
			this.unbind('scroll');
			var items = $(p.eclass);
			this.scroll(function() {
				obj.init(items, p.fun);
			});
			if (('undefined' != typeof p.autostart) && (p.autostart)) {
				obj.init(items, p.fun);
			}
			return false;
		}
	});
})(jQuery);

if (jQuery) (function($) {
	$.countryState = function(c, s) {
		var country = $(c);
		var state = $(s);
		if ((0 == country.length) || (0 == state.length)) {
			return false;
		}
		state.find('option=[value="Outside U.S./Canada"]:first').attr('disabled', true);
		country.change(function() {
			var country_name = country.val();
			if (('' == country_name) || ('UNITED STATES' == country_name) || ('CANADA' == country_name) || ('US' == country_name) ||('CA' == country_name)) {
				state.val('').attr('disabled', false);
			} else {
				state.val('Outside U.S./Canada').attr('disabled', true);
			}
		});
		return true;
	};
})(jQuery);


/* --- Jajax jQuery plugin (begin) --- */

if (jQuery) (function($) {

	$.jajax = function(c, p) {
		if ('string' != typeof c) {
			alert('JAJAX url not set');
			return false;
		}
		if ('undefined' == typeof p) {
			p = {};
		}
		if ('undefined' == typeof p.fun) {
			p.fun = null;
		}
		if ('undefined' == typeof p.funParams) {
			p.funParams = null;
		}
		if ('undefined' == typeof p.error) {
			p.error = null;
		}
		if ('undefined' == typeof p.datatype) {
			p.datatype = 'json';
		}
		if ('undefined' == typeof p.post) {
			p.post = '';
		}
		if ('undefined' == typeof p.async) {
			p.async = true;
		}
		if ('undefined' != typeof p.formid) {
			var a = $('#' + p.formid).serialize();
			if (('' != a) && ('' != p.post)) {
				a += '&';
			}
			if (('boolean' == typeof p.clearform) && (p.clearform)) {
				$('#' + p.formid).each(function() {
					this.reset();
				});
			}
			p.post = a + p.post;
		}
		$.ajax({
			type:'POST',
			url:c,
			data:p.post,
			cache:false,
			async:p.async,
			dataType:p.datatype,
			processData:false,
			scriptCharset:'UTF-8',
			beforeSend:function(xmlHttpRequest) {
				xmlHttpRequest.setRequestHeader('X-JAJAX-Version', '0.2');
			},
			success:function(response) {
				if (null != p.fun) {
					if (null != p.funParams) {
						p.fun(response, p.funParams);
					} else {
						p.fun(response);
					}
				}
			},
			error:function(response) {
				if (null != p.error) {
					p.error(response);
				}
			}
		});
	};

	$.jajaxparse = function(r) {
		if (null == r) {
			return false;
		}
		if ('undefined' != typeof r.innerhtml) {
			for (var i in r.innerhtml) {
				$('#' + r.innerhtml[i].id).html(r.innerhtml[i].html);
			}
		}
		if ('undefined' != typeof r.appendhtml) {
			for (var i in r.appendhtml) {
				$('#' + r.appendhtml[i].id).append(r.appendhtml[i].html);
			}
		}
		if ('undefined' != typeof r.prependhtml) {
			for (var i in r.prependhtml) {
				$('#' + r.prependhtml[i].id).prepend(r.prependhtml[i].html);
			}
		}
		if ('undefined' != typeof r.eval) {
			for (var i in r.eval) {
				eval(r.eval[i]);
			}
		}
		if ('undefined' != typeof r.addclass) {
			for (var i in r.addclass) {
				$('#' + r.addclass[i].id).addClass(r.addclass[i].classes);
			}
		}
		if ('undefined' != typeof r.removeclass) {
			for (var i in r.removeclass) {
				$('#' + r.removeclass[i].id).removeClass(r.removeclass[i].classes);
			}
		}
		if ('undefined' != typeof r.loadjs) {
			for (var i in r.loadjs) {
				$('head:first').prepend('<script type="text/javascript" src="' + r.loadjs[i] + '"></script>');
			}
		}
		if ('undefined' != typeof r.loadcss) {
			for (var i in r.loadcss) {
				$('head:first').prepend('<link rel="stylesheet" type="text/css" href="' + r.loadcss[i] + '"/>');
			}
		}
		if ('undefined' != typeof r.redirect) {
			window.location = r.redirect[0];
		}
		if ('undefined' != typeof r.focusId) {
			// setTimeout need for IE browsers
			setTimeout(function() {$('#' + r.focusId[0]).focus();}, 10);
		}
	};

})(jQuery);

/* --- Jajax jQuery plugin (end) --- */

/* --- Base 64 jQuery plugin (begin) --- */

if (jQuery) (function($) {
	var keyString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var uTF8Encode = function(string) {
		string = string.replace(/\x0d\x0a/g, "\x0a");
		var output = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				output += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				output += String.fromCharCode((c >> 6) | 192);
				output += String.fromCharCode((c & 63) | 128);
			} else {
				output += String.fromCharCode((c >> 12) | 224);
				output += String.fromCharCode(((c >> 6) & 63) | 128);
				output += String.fromCharCode((c & 63) | 128);
			}
		}
		return output;
	};
	var uTF8Decode = function(input) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < input.length ) {
			c = input.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = input.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = input.charCodeAt(i+1);
				c3 = input.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
	$.extend({
		base64Encode: function(input) {
			var output = "";
			var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
			var i = 0;
			input = uTF8Encode(input);
			while (i < input.length) {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);
				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;
				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}
				output = output + keyString.charAt(enc1) + keyString.charAt(enc2) + keyString.charAt(enc3) + keyString.charAt(enc4);
			}
			return output;
		},
		base64Decode: function(input) {
			var output = "";
			var chr1, chr2, chr3;
			var enc1, enc2, enc3, enc4;
			var i = 0;
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
			while (i < input.length) {
				enc1 = keyString.indexOf(input.charAt(i++));
				enc2 = keyString.indexOf(input.charAt(i++));
				enc3 = keyString.indexOf(input.charAt(i++));
				enc4 = keyString.indexOf(input.charAt(i++));
				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;
				output = output + String.fromCharCode(chr1);
				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}
			}
			output = uTF8Decode(output);
			return output;
		}
	});
})(jQuery);

/* --- Base 64 jQuery plugin (end) --- */

/* --- Altitle jQuery plugin (begin) --- */

if (jQuery) (function($) {
	$.alttitle = {
		setItem:function(item, el) {
			$.alttitle.listItems[$.alttitle.listItems.length] = {
				item:item,
				el:el,
				visible:false
			};
		},
		getItemIdex:function(item) {
			for (var i = 0; i<$.alttitle.listItems.length; i++) {
				if (item == $.alttitle.listItems[i].item) {
					return i;
				}
			}
			return -1;
		},
		getWidthDocument:function() {
			var width = 0;
			if ($.browser.msie && $.browser.version < 7) {
				var scrollWidth = Math.max(
					document.documentElement.scrollWidth,
					document.body.scrollWidth
				);
				var offsetWidth = Math.max(
					document.documentElement.offsetWidth,
					document.body.offsetWidth
				);
				if (scrollWidth < offsetWidth) {
					width = $(window).width();
				} else {
					width = scrollWidth;
				}
			} else {
				width = $(document).width();
			}
			return width;
		},
		showAlt:function(itemIndex, clientX, clientY) {
			if (-1 == itemIndex) {
				return false;
			}
			var item = $.alttitle.listItems[itemIndex].item;
			var el = $.alttitle.listItems[itemIndex].el;
			var propeties = $(item).data('alttitle_propeties');
			var posX = clientX + propeties.xShift;
			var posY = clientY + propeties.yShift;
			posX += self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
			posY += self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
			var docWidth = this.getWidthDocument();
			if (posX + el.outerWidth() > docWidth) {
				posX = docWidth - propeties.xStep - el.outerWidth();
				posY += propeties.yStep;
			}
			var asif = $('#alttitle-substrate:first');
			if (0 == asif.length) {
				asif = $('<iframe id="alttitle-substrate"></iframe>').css('display', 'none').appendTo('body');
			}
			asif.css({
				'position':'absolute',
				'top':posY + 'px',
				'left':posX + 'px',
				'width':el.outerWidth() + 'px',
				'height':el.outerHeight() + 'px',
				'border':'none',
				'z-index':1000,
				'display':'block'
			});
			el.css({
				'display':'block',
				'left':posX + 'px',
				'top':posY + 'px'
			});
			$.alttitle.listItems[itemIndex].visible = true;
		},
		initAlt:function(item, event, delay) {
			return setTimeout(function() {
				$.alttitle.showAlt($.alttitle.getItemIdex(item), event.clientX, event.clientY);
			}, delay);
		}
	},
		$.alttitle.listItems = [],
		$.extend($.fn, {
			alttitle:function(s, p) {
				var propeties = this.data('alttitle_propeties');
				if ((null == propeties) || ('undefined' == typeof propeties)) {
					propeties = {
						delay:300,
						xShift:15,
						yShift:5,
						xStep:15,
						yStep:15
					};
				}
				if ('object' == typeof p) {
					$.extend(propeties, p);
				}
				this.data('alttitle_propeties', propeties);
				var el = $(s);
				if (0 == el.length) {
					return false;
				}
				this.css({
					'position':'relative'
				});
				el.css({
					'position':'absolute',
					'z-index':1001
				});
				var itemTimeout = null;
				this.each(function() {
					$.alttitle.setItem(this, el);
				});
				this.mouseenter(function(event) {
					clearTimeout(itemTimeout);
					itemTimeout = $.alttitle.initAlt(this, event, propeties.delay);
				}).mouseleave(function() {
						clearTimeout(itemTimeout);
						$.alttitle.listItems[$.alttitle.getItemIdex(this)].visible = false;
						$('#alttitle-substrate:first').css('display', 'none');
						el.css('display', 'none');
					}).mousemove(function(event) {
						if (!$.alttitle.listItems[$.alttitle.getItemIdex(this)].visible) {
							clearTimeout(itemTimeout);
							itemTimeout = $.alttitle.initAlt(this, event, propeties.delay);
						}
					});
			}
		});
})(jQuery);

/* --- Altitle jQuery plugin (end) --- */

/* --- Popup jQuery plugin (begin) --- */

if (jQuery) (function($) {
	$.extend($.fn, {
		popup:function(c, p) {
			var popupobj = {
				openPopup:function() {
					if (!propeties.scroll) {
						popupobj._hiddenBodyScroll();
					}
					if (propeties.modal) {
						popupobj._lockScreen();
					}
					if (propeties.closeESC) {
						popupobj._setCloseKeyUpESC();
					}
					if (propeties.closeOutClick) {
						popupobj._setCloseOutClick();
					}
					popupobj._showPopup();
				},
				closePopup:function() {
					if (!propeties.scroll) {
						popupobj._showBodyScroll();
					}
					if (propeties.modal) {
						popupobj._unLockScreen();
					}
					if (propeties.closeESC) {
						popupobj._unSetCloseKeyUpESC();
					}
					if (propeties.closeOutClick) {
						popupobj._unSetCloseOutClick();
					}
					popupobj._hiddenPopup();
				},
				_hiddenBodyScroll:function() {
					$(window).bind('DOMMouseScroll', popupobj.__blockScroll);
					$(window).bind('mousewheel', popupobj.__blockScroll);
					$(document).bind('mousewheel', popupobj.__blockScroll);
					$(document).bind('keypress', popupobj.__blockScroll);
					$('html').css('overflow', 'hidden');
				},
				_showBodyScroll:function() {
					$(window).unbind('DOMMouseScroll', popupobj.__blockScroll);
					$(window).unbind('mousewheel', popupobj.__blockScroll);
					$(document).unbind('mousewheel', popupobj.__blockScroll);
					$(document).unbind('keypress', popupobj.__blockScroll);
					$('html').css('overflow', 'auto');
				},
				_lockScreen:function() {
					var screenHeight = popupobj._getDocumentHeight();
					var screenWidth = popupobj._getDocumentWidth();
					var lw1 = $('#popup-lockscreen');
					if (0 == lw1.length) {
						lw1 = $('<div id="popup-lockscreen"></div>').css(popupobj._getCSSLock(screenHeight, screenWidth, propeties.color, propeties.zIndex + 5, propeties.opacity * 100)).appendTo('body');
					}
					var lw2 = $('#popup-ilockscreen');
					if (0 == lw2.length) {
						lw2 = $('<iframe id="popup-ilockscreen"></iframe>').css(popupobj._getCSSLock(screenHeight, screenWidth, propeties.color, propeties.zIndex, 0)).appendTo('body');
					}
					if (!$.browser.msie) {
						lw1.css('opacity', '0');
						lw2.css('opacity', '0');
						lw1.css('display', 'block').fadeTo(propeties.speed, propeties.opacity);
					} else {
						lw1.css('display', 'block');
					}
					lw2.css('display', 'block');
					$(window).bind('resize', popupobj.__resizeLockScreen);
				},
				_unLockScreen:function() {
					$(window).unbind('resize', popupobj.__resizeLockScreen);
					$('#popup-lockscreen, #popup-ilockscreen').remove();
				},
				_setCloseKeyUpESC:function() {
					$(document).bind('keyup', popupobj.__closeESC);
				},
				_unSetCloseKeyUpESC:function() {
					$(document).unbind('keyup', popupobj.__closeESC);
				},
				_setCloseOutClick:function() {
					$('#popup-lockscreen').bind('mouseup', popupobj.closePopup);
				},
				_unSetCloseOutClick:function() {
					$('#popup-lockscreen').unbind('mouseup', popupobj.closePopup);
				},
				_showPopup:function() {
					var elwidth = elobj.width();
					var wnd = $(window), doc = $(document);
					var postype = 'fixed';
					var top, left;
					if(propeties.customPosition){
						top = propeties.customPosition.top;
						left = propeties.customPosition.left;
					}else{
						top = ((wnd.height() - elobj.height()) / 2);
						if (($.browser.msie && $.browser.version < 7) || (('boolean' == typeof propeties.absolutePosition) && (true == propeties.absolutePosition))) {
							postype = 'absolute';
							top = top + doc.scrollTop();
						}
						left = ((wnd.width() - elwidth) / 2);
						top  += 'px';
						left += 'px';
					}
					elobj.css({
						'position': postype,
						'top': top,
						'left': left,
						'z-index': propeties.zIndex + 10,
						'display': 'block'
					});
				},
				_hiddenPopup:function() {
					elobj.css('display', 'none');
				},
				_getDocumentHeight:function() {
					if ($.browser.msie && $.browser.version < 7) {
						var scrollHeight, offsetHeight;
						scrollHeight = Math.max(
							document.documentElement.scrollHeight,
							document.body.scrollHeight
						);
						offsetHeight = Math.max(
							document.documentElement.offsetHeight,
							document.body.offsetHeight
						);
						if (scrollHeight < offsetHeight) {
							return $(window).height() + 'px';
						} else {
							return scrollHeight + 'px';
						}
					}
					return $(document).height() + 'px';
				},
				_getDocumentWidth:function() {
					var scrollWidth, offsetWidth;
					if ($.browser.msie) {

						scrollWidth = Math.max(
							document.documentElement.scrollWidth,
							document.body.scrollWidth
						);
						offsetWidth = Math.max(
							document.documentElement.offsetWidth,
							document.body.offsetWidth
						);
						if (scrollWidth < offsetWidth) {
							return $(window).width() + 'px';
						}else {
							return scrollWidth + 'px';
						}
					}
					return $(document).width() + 'px';
				},
				_getCSSLock:function(height, width, color, zindex, opacity) {
					return {
						'position':'absolute',
						'top':'0',
						'left':'0',
						'right':'0',
						'display':'none',
						'bottom':'0',
						'border':'none',
						'width':width,
						'height':height,
						'background-color':color,
						'-ms-filter':'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + opacity + ')',
						'filter':'progid:DXImageTransform.Microsoft.Alpha(opacity = ' + opacity + ')',
						'filter':'alpha(opacity=' + opacity + ')',
						'moz-opacity':'0',
						'-khtml-opacity':'0',
						'z-index':zindex
					};
				},
				__blockScroll:function(event) {
					event = event || window.event;
					var target = $(event.target);
					var elid = elobj.attr('id');
					if ((target.attr('id') == elid) || (target.parents('#' + elid).length != 0)) {
						event.returnValue = false;
						return true;
					}
					if (event.preventDefault) {
						event.preventDefault();
					}
					event.returnValue = false;
					return false;
				},
				__closeESC:function(event) {
					var keycode;
					if (window.event) {
						keycode = window.event.keyCode;
					} else if (event) {
						keycode = event.which;
					} else {
						keycode = false;
					}
					if (27 == keycode) {
						popupobj.closePopup();
					}
				},
				__resizeLockScreen:function() {
					$('#popup-lockscreen, #popup-ilockscreen').css('width', 0).css('width', popupobj._getDocumentWidth());
				}
			}
			if ('string' != typeof c) {
				return true;
			}
			var propeties = this.data('popup_propeties');
			if (('undefined' == typeof propeties) || (null == propeties)) {
				propeties = {
					modal:true,
					color:'#000000',
					opacity:0.5,
					speed:'fast',
					scroll:true,
					zIndex:1000,
					closeESC:true,
					closeOutClick:true,
					absolutePosition:true,
					customPosition:false
				};
			}
			if ('object' == typeof p) {
				$.extend(propeties, p);
			}
			this.data('popup_propeties', propeties);
			elobj = this;
			switch (c) {
				case 'open':
					popupobj.openPopup();
					break;
				case 'close':
					popupobj.closePopup();
					break;
			}
			return false;
		}
	});
})(jQuery);


/*! jQuery JSON plugin 2.4.0 | code.google.com/p/jquery-json */
(function($){'use strict';var escape=/["\\\x00-\x1f\x7f-\x9f]/g,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},hasOwn=Object.prototype.hasOwnProperty;$.toJSON=typeof JSON==='object'&&JSON.stringify?JSON.stringify:function(o){if(o===null){return'null';}
	var pairs,k,name,val,type=$.type(o);if(type==='undefined'){return undefined;}
	if(type==='number'||type==='boolean'){return String(o);}
	if(type==='string'){return $.quoteString(o);}
	if(typeof o.toJSON==='function'){return $.toJSON(o.toJSON());}
	if(type==='date'){var month=o.getUTCMonth()+1,day=o.getUTCDate(),year=o.getUTCFullYear(),hours=o.getUTCHours(),minutes=o.getUTCMinutes(),seconds=o.getUTCSeconds(),milli=o.getUTCMilliseconds();if(month<10){month='0'+month;}
		if(day<10){day='0'+day;}
		if(hours<10){hours='0'+hours;}
		if(minutes<10){minutes='0'+minutes;}
		if(seconds<10){seconds='0'+seconds;}
		if(milli<100){milli='0'+milli;}
		if(milli<10){milli='0'+milli;}
		return'"'+year+'-'+month+'-'+day+'T'+
			hours+':'+minutes+':'+seconds+'.'+milli+'Z"';}
	pairs=[];if($.isArray(o)){for(k=0;k<o.length;k++){pairs.push($.toJSON(o[k])||'null');}
		return'['+pairs.join(',')+']';}
	if(typeof o==='object'){for(k in o){if(hasOwn.call(o,k)){type=typeof k;if(type==='number'){name='"'+k+'"';}else if(type==='string'){name=$.quoteString(k);}else{continue;}
		type=typeof o[k];if(type!=='function'&&type!=='undefined'){val=$.toJSON(o[k]);pairs.push(name+':'+val);}}}
		return'{'+pairs.join(',')+'}';}};$.evalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){return eval('('+str+')');};$.secureEvalJSON=typeof JSON==='object'&&JSON.parse?JSON.parse:function(str){var filtered=str.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,'');if(/^[\],:{}\s]*$/.test(filtered)){return eval('('+str+')');}
	throw new SyntaxError('Error parsing JSON, source is not valid.');};$.quoteString=function(str){if(str.match(escape)){return'"'+str.replace(escape,function(a){var c=meta[a];if(typeof c==='string'){return c;}
	c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+(c%16).toString(16);})+'"';}
	return'"'+str+'"';};}(jQuery));

/* * * * * * * * * * * */

/* --- Popup jQuery plugin (end) --- */

function clearEmailTimeoutError() {
	clearTimeout(this.checkEmailTimeoutError);
}

if (jQuery) (function($) {
	$.extend($.fn, {
		uitabs:function() {
			var ids = '';
			var all_li = this.find('ul li');
			all_li.find('a').each(function() {
				ids += ('' == ids ? '' : ',') + '#profile-tab-' + $(this).attr('href').substr(1);
			}).click(function() {
					$(ids).css('display', 'none');
					all_li.removeClass('active');
					$(this).parent().addClass('active');
					$('#profile-tab-' + $(this).attr('href').substr(1)).css('display','block');
					$(this).blur();
					return false;
				});

		}
	});
})(jQuery);

if (jQuery) (function($) {
	$.screen = function(c, p) {
		if (typeof p == 'undefined') {
			p = {};
		}
		var fullScreenDiv = $('#fullScreenDiv:first');
		if ($.browser.msie) {
			var fullScreenIframe = $('#fullScreenIframe:first');
		}
		if (fullScreenDiv.size() == 0) {
			fullScreenDiv = $('<div id="fullScreenDiv"></div>').css('display', 'none').appendTo('body');
			if ($.browser.msie) {
				fullScreenIframe = $('<iframe id="fullScreenIframe"></iframe>').css('display', 'none').appendTo('body');
			}
		}
		switch (c) {
			case 'lock':
				if (typeof p['opacity'] != 'undefined') {
					$.screen.prototype.propeties['opacity'] = p['opacity'];
				}
				if (typeof p['background-color'] != 'undefined') {
					$.screen.prototype.propeties['background-color'] = p['background-color'];
				}
				if (typeof p['z-index'] != 'undefined') {
					$.screen.prototype.propeties['z-index'] = p['z-index'];
				}
				var height = 0;
				if ($.browser.msie && $.browser.version < 7) {
					var scrollHeight = Math.max(
						document.documentElement.scrollHeight,
						document.body.scrollHeight
					);
					var offsetHeight = Math.max(
						document.documentElement.offsetHeight,
						document.body.offsetHeight
					);
					if (scrollHeight < offsetHeight) {
						height = $(window).height();
					} else {
						height = scrollHeight;
					}
				} else {
					height = $(document).height();
				}
				$.screen.prototype.css['height'] = height + 'px';
				$.screen.prototype.css['background-color'] = $.screen.prototype.propeties['background-color'];
				$.screen.prototype.css['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=' + ($.screen.prototype.propeties['opacity'] * 100) + ')';
				$.screen.prototype.css['filter'] = 'alpha(opacity=' + ($.screen.prototype.propeties['opacity'] * 100) + ')';
				$.screen.prototype.css['z-index'] = $.screen.prototype.propeties['z-index'];
				fullScreenDiv.css($.screen.prototype.css);
				if (!$.browser.msie) {
					fullScreenDiv.css('opacity', $.screen.prototype.propeties['opacity']);
				} else {
					$.screen.prototype.css['-ms-filter'] = 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
					$.screen.prototype.css['filter'] = 'alpha(opacity=0)';
					$.screen.prototype.css['z-index'] = $.screen.prototype.propeties['z-index'] - 2;
					fullScreenIframe.css($.screen.prototype.css);
				}
				fullScreenDiv.css('display', 'block');
				if ($.browser.msie) {
					fullScreenIframe.css('display', 'block');
				}
				break;
			case 'unlock':
				if (fullScreenDiv.size() != 0 ) {
					fullScreenDiv.css('display', 'none');
					if ($.browser.msie) {
						fullScreenIframe.css('display', 'none');
					}
				}
				break;
		}
		return false;
	};
	$.extend($.screen.prototype, {
		propeties: {
			'opacity':0.5,
			'background-color':'#000000',
			'z-index':1000
		},
		css: {
			'position':'absolute',
			'top':'0',
			'left':'0',
			'right':'0',
			'bottom':'0',
			'border':'none',
			'width':'100%',
			'moz-opacity':'0',
			'-khtml-opacity':'0'
		}
	});
})(jQuery);

/* ------------------------------------------ JQUERY PLUGINS (END) ------------------------------------------ */

/* ------------------------------------------ Common.js (begin) ------------------------------------------ */

function offIframe() {
	if ((window != top) || (self != top)) {
		var ref = document.referrer;
		if (!ref || ref.indexOf("socialproof.it") == -1) {
			top.location.href = location.href;
		}
	}
}

$(document).ready(function() {
	if ('undefined' == typeof __ignoreIframes || !__ignoreIframes)
	{
		offIframe();
	}
});

var hr = escape(window.location.href);
var popups = new Array();

function MM_preloadImages() { //v3.0
	var d=document;
	if (d.images) {
		if (!d.MM_p) {d.MM_p = new Array();}
		var i,j=d.MM_p.length,
			a=MM_preloadImages.arguments;
		for(i=0; i<a.length; i++) {
			if (a[i].indexOf("#")!=0){
				d.MM_p[j]=new Image;d.MM_p[j++].src=a[i];
			}
		}
	}
}

function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr;
	for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) {x.src=x.oSrc;}
}

function MM_findObj(n, d) { //v4.0
	var p,i,x;
	if (!d) {d=document;}
	if ((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document;n=n.substring(0,p);
	}
	if (!(x=d[n])&&d.all) {x=d.all[n];}
	for (i=0;!x&&i<d.forms.length;i++) {x=d.forms[i][n];}
	for (i=0;!x&&d.layers&&i<d.layers.length;i++) {x=MM_findObj(n,d.layers[i].document);}
	if (!x && document.getElementById) {x=document.getElementById(n);}
	return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments;
	document.MM_sr=new Array;
	for(i=0;i<(a.length-2);i+=3) {
		if ((x=MM_findObj(a[i]))!=null){
			document.MM_sr[j++]=x;
			if(!x.oSrc) {x.oSrc=x.src;}
			x.src=a[i+2];
		}
	}
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
	window.open(theURL,winName,features);
}

function Popup(url,width,height,target,status){
	if(!target) target = '_blank';
	if(!width)  width  = '430';
	if(!height) height = '250';
	if(!status) status = 'no';
	popups[popups.lenght] = window.open(url, target, "width="+width+", height="+height+", scrollbars=yes, status="+status+", resizable=yes");
}

function Replay(id,url){
	document.getElementById(id).src=url;
}


function submit_tell_friend(form, type, templ){
	real_action = '/tell_friend.php';
	target = "_tell_friend";
	if (type != 3) {
		email = form.friendsemail.value;
		arr = email.match("^[0-9a-zA-Z]([0-9a-zA-Z\._\-]*)@(([0-9a-zA-Z\-]+\.)+)([0-9a-zA-Z\-]+)$");
		if (!arr) {
			alert("Please enter valid email");
			return;
		}
	}
	if (type == 2) {
		window.open(real_action + "?type=2&friend_email=" + escape(email), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
	} else if (type == 3) {
		window.open(real_action + "?type=3&templ=" + escape(templ), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
	} else {
		window.open(real_action + "?friend_email=" + escape(email), target, "width=580, height=400, location=0, menubar=0, status=0, resizable=1");
	}
}

function wopen2(url){
	window.open(url, 'ww', 'width=600, height=450, location=no,resizable=yes,scrollbars=yes');
}

function wopen(url){
	window.open(url, 'ww', 'width=550, height=450, location=no,resizable=yes,scrollbars=yes');
}
function wopen3(url) {
	window.open(url, 'ww', 'width=575, height=385, location=no,resizable=yes,scrollbars=no');
}

/******************POPUP*******************/

function getClientCenterX() {
	return parseInt(getClientWidth()/2)+getBodyScrollLeft();
}

function getClientCenterY() {
	return parseInt(getClientHeight()/2)+getBodyScrollTop();
}

function getClientWidth() {
	return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientWidth:document.body.clientWidth;
}

function getClientHeight() {
	return document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
}

function getBodyScrollTop() {
	return self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
}

function getBodyScrollLeft() {
	return self.pageXOffset || (document.documentElement && document.documentElement.scrollLeft) || (document.body && document.body.scrollLeft);
}

function hidden(id) {
	document.getElementById('price').value = '';
	document.getElementById('info').innerHTML = '';
	document.getElementById(id).style.display = 'none';
	document.getElementById('iframe').style.display = 'none';
}


function showpopup(id,tml_id) {
	template_id = tml_id;
	document.getElementById(id).style.top = getBodyScrollTop()+(getClientHeight()/4);
	document.getElementById('iframe').style.top = getBodyScrollTop()+(getClientHeight()/4);
	document.getElementById('iframe').style.display = 'block';
	document.getElementById(id).style.display = 'block';
	document.getElementById('price').focus();
}

function checkPrice() {
	var price = document.getElementById('price').value;
	if (price >= 5) {
		add_link = "javascript: cartWithYourPrice('"+template_id+"', '"+price+"')";
		document.getElementById('buy').href = add_link;
		document.getElementById('add').href = add_link;
	} else {
		document.getElementById('info').innerHTML = "We are sorry but you cannot set the price that is lower than $5.";
	}
}

/*********************************************************/

function tell_a_friend(e) {
	var f = $(e).closest('form');
	var dataToSend=f.serialize();
	var urlToRequest=f.attr('action')+'?';
	$.ajax({
		url: urlToRequest,
		data: dataToSend,
		dataType:'json',
		success: function(json) {
			if (json && json.type) {
				switch(json.type) {
					case "error":
						var v='';
						for (i=0;json.data.length>i;i++) {v=v+(json.data[i])+'<br />';}
						$("#tell-a-friend-errors").html('<label style="color: red; font-weght: normal;">' + v + '<br></label>');
						break;
					case "ok":
						$("#tell-a-friend-errors").html('<label style="color: #3F89C3;">' + json.data + '<br><br></label>');
						$('input[name="friend_email"]',f).val('');
						$('input[name="friend_name"]',f).val('');
						break;
				}
			}
		}
	});
}

function ga_track_banner(banner_code){
	try {
		if (_gaq) {
			_gaq.push(['b._trackEvent', 'OutLinks', banner_code.bid, banner_code.data]);
		}
	}
	catch(err) {}
}

/*
 * Google Analytics support
 */
(function () {
	Tm = {};

	Tm.Debug = {
		log: function () {
			if (this.isLocal()) {
				if (typeof console != 'undefined' ) {
					//console.log.apply (console, arguments);
				}
			}
		},
		isLocal: function () {
			return window.location.hostname.substr (-3) == 'dev';
		}
	};

	Tm.GA = function (account) {
		var impressed_already = {};
		var impressive = {};

		var internalMethods = {
			account: account,
			fire: function (method, params) {
				arguments[0] = this.method (arguments[0]);

				if (Tm.Debug.isLocal ()) {
					Tm.Debug.log (arguments);
				}

				try {
					if (_gaq) {
						var args = Array.prototype.slice.call(arguments);
						_gaq.push (args);
					}
				}
				catch(err) {}
			},
			method: function (name) {
				if (this.account) {
					return this.account + '.' + name;
				}
				return name;
			}
		};

		return 	{
			event: function (evt) {
				if (typeof (evt.category) == 'undefined') {
					evt.category = 'Unknown';
				}
				if (typeof (evt.action) == 'undefined') {
					evt.action = 'Unknown';
				}
				if (typeof (evt.label) == 'undefined') {
					evt.label = 'Unknown';
				}
				if (typeof (evt.value) == 'undefined') {
					evt.value = 0;
				}

				if (evt.label instanceof Array) {
					evt.label = evt.label.join ('|');
				}

				internalMethods.fire ('_trackEvent', evt.category, evt.action, evt.label, evt.value);
			},
			impression: function (target, evt) {
				impressive [target] = evt;

				var keys = [];
				for (var k in impressive) {
					keys.push (k);
				}

				var that = this;

				var callback = function (id, is_visible, position) {
					if (is_visible !== true) {
						return;
					}
					if (impressed_already [id]) {
						return;
					}
					impressed_already [id] = 1;
					that.event (impressive ['#'+id]);
				};
				$(document).scrollEvent ({
					'eclass': keys.join (','),
					'fun': callback,
					'autostart': true
				});
			}
		};
	};

}) ();


function trim(text) {
	return (text || "").replace(/^\s+|\s+$/g, "");
}

/* ------------------------------------------ Common.js (end) ------------------------------------------ */

/* ------------------------------------------ Absolute-div.js (begin) ------------------------------------------ */

var IE = 0;
if (navigator.userAgent.indexOf("MSIE")!=-1) IE = 1;
var IE70 = 0;
if (navigator.userAgent.indexOf("MSIE 7.0")!=-1) IE70 = 1;
var konqueror = 0;
if (navigator.userAgent.indexOf("Konqueror") !=-1) konqueror = 1;
var opera = 0;
if (navigator.userAgent.indexOf("Opera")!=-1) opera = 1;
var FF20 = 0;
if (navigator.userAgent.indexOf("Firefox/2.0")!=-1) FF20 = 1;
var FF15 = 0;
if (navigator.userAgent.indexOf("Firefox/1.5")!=-1) FF15 = 1;
var safari419_3 = 0;
if (navigator.userAgent.indexOf("Safari/419")!=-1) safari419_3 = 1;


function show_hide_block(block,id) {
	var div_block=document.getElementById(current_popuppeds[block][1]+id);
	if(div_block.style.display != 'none' && (!current_popuppeds[block][2] || current_popuppeds[block][4])) {
		div_block.style.display = 'none';
		removeBodyClickListener();
	}else if(div_block != null) {
		auto_hide_blocks();
		div_block.style.display = '';
		addBodyClickListener();
	}

	if((current_popuppeds[block][0]!="") && (current_popuppeds[block][0]!=id)){
		var div_block=document.getElementById(current_popuppeds[block][1]+current_popuppeds[block][0]);
		div_block.style.display = 'hidden';
		removeBodyClickListener();
	}

	//change_visibility(current_popuppeds[block][1]);

	current_popuppeds[block][0]=id;
}

function auto_hide_blocks() {
	var i=0;
	for(i=0;i<current_popuppeds.length;i++) {
		if(current_popuppeds[i][3] && current_popuppeds[i][0] != "") {
			var div_block=document.getElementById(current_popuppeds[i][1]+current_popuppeds[i][0]);
			if(div_block!=null) {
				div_block.style.display = 'none';
				//change_visibility(current_popuppeds[i][1]);
			}
		}
	}
	removeBodyClickListener();
}

function hide_all_blocks(event) {
	if((event.type=='mousedown'&&event.button==0) || event == 'mousedown') {
		var i=0;
		for (i=0;i<current_popuppeds.length;i++) {
			if (current_popuppeds[i][2] &&  current_popuppeds[i][0] != "") {
				var div_block=document.getElementById(current_popuppeds[i][1]+current_popuppeds[i][0]);
				if (div_block!=null) div_block.style.display = 'none';
				//change_visibility(current_popuppeds[i][1]);
			}
		}
		removeBodyClickListener();
	}
	return(true);
}

function hide_all_blocks_listener() {
	hide_all_blocks('mousedown');
}

function cancelBubbleEvent(elementObject, event) {
	event.cancelBubble=true;
	if (event.stopImmediatePropagation) {
		event.stopImmediatePropagation();
	}
	if (event.stopPropagation) {
		event.stopPropagation();
	}
	if (elementObject.stopPropagation) {
		elementObject.stopPropagation();
	}
	return false;
}


function addBodyClickListener() {
	AttachEvent(document.body, 'mousedown', hide_all_blocks_listener, false);
}

function removeBodyClickListener() {
	if (document.body.removeEventListener) { //Mozilla
		document.body.removeEventListener("mousedown", hide_all_blocks_listener, false);
	} else if (document.detachEvent) { //IE
		document.body.detachEvent('mousedown', hide_all_blocks_listener);
	}
}

function AttachEvent(obj,evt,fnc,useCapture) {
	if (!useCapture) {useCapture=false;}
	if (obj.addEventListener) {
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) {
		return obj.attachEvent("on"+evt,fnc);
	} else {
		MyAttachEvent(obj,evt,fnc);
		obj['on'+evt]=function(){MyFireEvent(obj,evt)};
	}
}

//The following are for browsers like NS4 or IE5Mac which don't support either
//attachEvent or addEventListener

function MyAttachEvent(obj,evt,fnc){
	if (!obj.myEvents) obj.myEvents={};
	if (!obj.myEvents[evt]) obj.myEvents[evt]=[];
	var evts = obj.myEvents[evt];
	evts[evts.length]=fnc;
}
function MyFireEvent(obj,evt){
	if (!obj || !obj.myEvents || !obj.myEvents[evt]) return;
	var evts = obj.myEvents[evt];
	for (var i=0,len=evts.length;i<len;i++) evts[i]();
}

/* ------------------------------------------ Absolute-div.js (end) ------------------------------------------ */

/* ------------------------------------------ Formsubmit.js (begin) ------------------------------------------ */

function isEnterPressed(e){
	var keycode;
	if (window.event)
		keycode = window.event.keyCode;
	else if (e)
		keycode = e.which;
	else
		return false;
	return (keycode == 13);
}

var cssFix = function(){
	var u = navigator.userAgent.toLowerCase(),
		addClass = function(el,val){
			if(!el.className) {
				el.className = val;
			} else {
				var newCl = el.className;
				newCl+=(" "+val);
				el.className = newCl;
			}
		},
		is = function(t){return (u.indexOf(t)!=-1)};
	addClass(document.getElementsByTagName('html')[0],[
		(!(/opera|webtv/i.test(u))&&/msie (\d)/.test(u))?('ie ie'+RegExp.$1)
			:is('firefox/2')?'gecko ff2'
			:is('firefox/3')?'gecko ff3'
			:is('gecko/')?'gecko'
			:is('opera/9')?'opera opera9':/opera (\d)/.test(u)?'opera opera'+RegExp.$1
			:is('konqueror')?'konqueror'
			:is('safari/')?'webkit safari'
			:is('mozilla/')?'gecko':'',
		(is('x11')||is('linux'))?' linux'
			:is('mac')?' mac'
			:is('win')?' win':''
	].join(" "));
}();

function checkFormSubmitEnter(event) {
	if ((event.keyCode==10) || (event.keyCode==13)) {
		return true
	}
	return false;
}

function formSubmitEnter(event) {
	if (checkFormSubmitEnter(event)) {
		event.target.form.submit();
	}
}

/* ------------------------------------------ Formsubmit.js (end) ------------------------------------------ */

/* ------------------------------------------ Cart functions (begin) ------------------------------------------ */

var isFocused = 0;

function updateInfo(result) {
        if (typeof result.location == 'undefined') {
            $('#shopping-cart-2 #merchant-system-page .primary_action').each(function() {
                $(this).attr('onclick', $(this).data('oldOnClick')).removeClass("btn-checkout");
            });
        }
   	if (typeof result.location != 'undefined') {
		if (typeof result.gaCode != 'undefined') {
			eval(result.gaCode);
		}
		var error = '';
		if (typeof result.update != 'undefined') {
			if (typeof result.update[0] != 'undefined') {
				error = result.update[0].html;
			}
		}
		window.location = result.location + ('' != error ? '&error='+escape(error) : '');
	}
	if (typeof result.ga != 'undefined') {
		for (var index in result.ga) {
			_gaq.push(['b._trackEvent', 'BillingDetailsFormError', result.ga[index].field_name, result.ga[index].field_value]);
		}
	}
	if (typeof result.update != 'undefined') {
		for (var index in result.update) {
			if ($('#' + result.update[index].id).length > 0) {
				$('#' + result.update[index].id).html(result.update[index].html);
			}
		}
	}
	if (typeof result.style != 'undefined') {
		for (var index1 in result.style) {
			switch (result.style[index1].action) {
				case 'add':
					$('#' + result.style[index1].id).addClass(result.style[index1]._class);
					break;
				case 'del':
					$('#' + result.style[index1].id).removeClass(result.style[index1]._class);
					break;
			}
		}
	}
	if (typeof result.focusId != 'undefined') {
		isFocused = 1;
		$('#' + result.focusId[0]).focus();
		isFocused = 0;
	}
	if (typeof result.value != 'undefined') {
		for (var index in result.value) {
			if ($('#' + result.value[index].id).length > 0) {
				$('#' + result.value[index].id).val(result.value[index].value);
			}
		}
	}
	if (typeof result.eval != 'undefined') {
		eval(result.eval);
	}
}

function errorCheckFormDetails(a, b)
{
	var formid = $('form').serialize();
	var status = 'Status '+a.status;
	if (_gaq)
	{
		_gaq.push(['b._trackEvent', 'errorCheckFormDetails', status, formid]);
	}
	alert('Sorry for inconvinience. Connection with our servers has been broken. '+status+'. Try again later please.');
	return true;
}

function verify_email_info(postData, youSure) {
	if (
		($('body').hasClass('second-step')) &&
		(!$('#billing-details-new-customer-email').hasClass('field_none'))
	)
	{
		if (!$('#billing-details-new-customer-email').hasClass('field_none'))
		{
			billingDetailsEmailProceed($('#new-customer-email-proceed'));
			return false;
		}
	}
	var isYouSure = true;
	if ('boolean' == typeof youSure) {
		isYouSure = youSure;
	}
	if (isFocused == 0 && isYouSure) {
            $('#shopping-cart-2 #merchant-system-page .primary_action').each(function() {
                $(this).data('oldOnClick', $(this).attr('onclick')).attr('onclick', 'return false').addClass("btn-checkout");
            });
              $.jajax('/jajaxserver.php?app=SystemCart&controller=CheckFormDetails&action=checkDetails', {
			fun:updateInfo,
			formid:'form',
			error:errorCheckFormDetails,
			post:postData
		});
	}
	return false;
}

function verify_alternative_checkout_info(postData) {
	$.jajax('/jajaxserver.php?app=SystemCart&controller=CheckFormDetails&action=checkAlternativeCheckout', {
		fun:$.jajaxparse,
		post:postData
	});
	return false;
}

function getPopupContent(tab) {
	$.jajax('/jajaxserver.php?app=SystemCart&controller=Popups&action=content', {
		fun:function(result) {
			$('#listTabsPopup li a').blur();
			$('#listTabsPopup li').removeClass('active');
			$('#listTabsPopup li.' + result.tab).addClass('active');
			$('#ajax-email-popup-content').html(result.html);
		},
		post:'name=' + tab
	});
	return false;
}

function showDiscount(id) {
	// Author: Ujeen
	var targetContainerId = 'discountPopup';
	if (document.getElementById(targetContainerId) == null) {$('body').append('<div id='+targetContainerId+'></div>');}
	$('#'+targetContainerId).html($('#'+id).html()).css({'visibility':'hidden','display':'block'});
}

function showPreviewOfferDiscountPopup(text) {
	$('#discountPopup').html(text).css({'visibility':'hidden','display':'block'});
}

function moveDiscount(e,width) {
	var popup=$('#discountPopup');
	var offsetX=e.pageX-popup.width()/2;
	var offsetY=e.pageY-popup.height()-20;
	popup.css({'top' : offsetY,'left': offsetX,'visibility' : 'visible','width':width});
}

function hideDiscount() {
	document.getElementById('discountPopup').style.display = 'none';
}

/* ------------------------------------------ Cart functions (end) ------------------------------------------ */

/* ------------------------------------------ INIT AFTER DOM READY (BEGIN) ------------------------------------------ */


$(function () {

	/* --- Align today's thumbnails (begin) --- */

	if ($('#featured_cell_0').length > 0) {

		function align_todays_thumbnails(first_cell_arg, second_cell_arg) {
			var first_cell = $('#featured_cell_' + first_cell_arg);
			var first_cell_meta = first_cell.children('.template_meta');
			var first_cell_price = first_cell.children('.product-price');
			var second_cell = $('#featured_cell_' + second_cell_arg);
			var second_cell_meta = second_cell.children('.template_meta');
			var second_cell_price = second_cell.children('.product-price');
			if (first_cell_meta.height() > second_cell_meta.height()) {
				second_cell_meta.css('height', first_cell_meta.height());
			} else {
				first_cell_meta.css('height', second_cell_meta.height());
			}
			if (first_cell_price.height() > second_cell_price.height()) {
				second_cell_price.css('height', first_cell_price.height());
			}else {
				first_cell_price.css('height', second_cell_price.height());
			}
		}

		if ($('body').hasClass('isIE') || $('body').hasClass('isIE6')) {
			$(function () {
				align_todays_thumbnails(0,1);
				align_todays_thumbnails(2,3);
			});
		} else {
			align_todays_thumbnails(0,1);
			align_todays_thumbnails(2,3);
		}

	}

	/* --- Align today's thumbnails (end) --- */

	/* --- Align thumbnails -> category page (begin) --- */

	if ($('#template_row_0').length > 0) {

		function align_thumbnails() {
			var i=0;
			while (document.getElementById('template_row_'+i)!=null) {
				var meta_max_height=0;
				var price_max_height=0;
				$('#template_row_'+i+' .template_meta').each(function(index) {
					if ($(this).height()>meta_max_height) {
						meta_max_height=$(this).height();
					}
				}).css('height',meta_max_height);
				$('#template_row_'+i+' .product-price').each(function(index) {
					if ($(this).height()>price_max_height) {
						price_max_height=$(this).height();
					}
				}).css('height',price_max_height);
				i++;
			}
		}
		if ($('body').hasClass('isIE') || $('body').hasClass('isIE6')) {
			$(function () {align_thumbnails();});
		} else {
			align_thumbnails();
		}

	}

	/* --- Align thumbnails -> category page (end) --- */

	/* --- Thumbnails links events (begin) --- */

	if ($('.picture_menu').length > 0) {

		$('.picture_menu a').each(function() {
			$(this).click(function() {
				_gaq.push(['b._trackEvent', 'SiteUsage', 'smallPreview', $(this).text()]);
			});
		});

	}

	/* --- Thumbnails links events (end) --- */

	/* --- Shopping cart link event (begin) --- */

	$('#shopping_cart').click(function() {
		cart('');
		return false;
	});

	/* --- Shopping cart link event (end) --- */

	/* --- Accounts popup (begin) --- */

	var accountsPopup = new function() {

		var wac_popup = new Object();

		var getVerticalOffset = function(iframe_height) {
			if(iframe_height == 0 || iframe_height == undefined) {
				return ($(window).height() - wac_popup.front.height())/2;
			} else {
				return ($(window).height() - iframe_height)/2;
			}
		}

		var getHorizontalOffset = function() {
			return ($(window).width() - wac_popup.front.width())/2;
		}

		var beforeShowWacPopup = function(iframe_width, iframe_height, class_name) {
			$.screen('lock', {
				opacity:'0.6'
			});
			$('#account_back_popup').css('display', 'block');
			$('body').addClass(wac_popup.meta.body_class);
			wac_popup.front.css('visibility','visible');
			wac_popup.content.addClass(class_name);
			wac_popup.content.children("#beforeSignInPopup").remove();

			var beforeSignInDiv = $("#beforeSignInPopup").clone(true);

			if ('undefined' !== typeof wac_popup.iframe) {
				wac_popup.iframe.hide();
			}
			wac_popup.content.append(beforeSignInDiv);

			$(beforeSignInDiv).css({
				'height' : iframe_height + 'px',
				'width' : iframe_width + 'px',
				'display' : 'block'
			});

			wac_popup.front.css({
				'top' : getVerticalOffset(iframe_height),
				'left' : getHorizontalOffset(),
				'display' : 'block'
			});
		}

		var showWacPopup = function(iframe_src, iframe_width, iframe_height, class_name) {
			$.screen('lock', {
				opacity:'0.6'
			});
			$('#account_back_popup').css('display', 'block');
			$('body').addClass(wac_popup.meta.body_class)
			wac_popup.front.css('visibility','visible');
			wac_popup.content.addClass(class_name);
			wac_popup.content.children("#beforeSignInPopup").remove();

			if ('undefined' === typeof wac_popup.iframe) {
				wac_popup.iframe = $('<iframe src="' + iframe_src + '" width="' + iframe_width + '" height="' + iframe_height + '" frameborder="0" scrolling="no"></iframe>');
				wac_popup.iframe.load(function() {
					if ($(this).attr('src') != wac_popup.meta.blank_iframe) {
						wac_popup.front.addClass(wac_popup.meta.loaded_iframe_class);
					}
				});
				wac_popup.content.append(wac_popup.iframe);
			} else {
				wac_popup.iframe.attr({
					width : iframe_width,
					height : iframe_height,
					src : iframe_src
				});
				wac_popup.iframe.show();
			}

			wac_popup.front.css({
				'top' : getVerticalOffset(iframe_height),
				'left' : getHorizontalOffset(),
				'display' : 'block'
			});
		}

		var hideWacPopup = function() {
			$.screen('unlock');
			$('#account_back_popup').css('display', 'none');
			wac_popup.front.css('display','none');
			replaceFlashContent(false);
			wac_popup.front.css({
				'visibility' : 'hidden',
				'display' : 'none'
			});
			if ('undefined' !== typeof wac_popup.iframe) {
				wac_popup.iframe.attr('src',wac_popup.meta.blank_iframe);
			}
			wac_popup.content.removeAttr('class');
			wac_popup.content.children("#beforeSignInPopup").remove();
			$('body').removeClass(wac_popup.meta.body_class);
		}

		var prepareWacPopup = function(authState, params) {
			switch (params.thisObject.attr('id')) {
				case 'edit_billing_details':
					iframe_width = 324;
					iframe_height = 450;
					class_name = 'billing';
					if (authState[0]) {
						break;
					}
				case 'sign_in':
				case 'acc_exist':
				case 'sign_in_button':
				case 'change_password':
				case 'change_login':
					iframe_width = 324;
					iframe_height = 218;
					class_name = 'sign';
					break;
				default:
					return false;
					break;
			}
			beforeShowWacPopup(iframe_width, iframe_height, class_name);
			showWacPopup(params.thisObject.attr('href'), iframe_width, iframe_height, class_name);
			$("#account_front_popup").height(iframe_height-4);
		}


		this.init = function() {
			if ($("#account_front_popup").length > 0) {
				return;
			}
			wac_popup.front = $('<div id="account_front_popup"><div id="account_popup_content"><a href="#" id="close_account_popup"></a></div></div>');
			wac_popup.back = $('<div id="account_back_popup"></div>');
			wac_popup.meta = {
				blank_iframe : 'about:blank',
				loaded_iframe_class : 'loaded_iframe',
				body_class : 'popup_related'
			}
			$('body').append(wac_popup.front,wac_popup.back);
			wac_popup.content = $('#account_popup_content',wac_popup.front);
			wac_popup.hideTrigger = $('#close_account_popup,#account_back_popup');

			$('#sign_in,#sign_in_button,#edit_billing_details,#change_password,#acc_exist,#change_login').click(function() {
				var email;
				var emailValue ='';
				email = document.getElementById('billing-email');
				emailAlert = document.getElementById('billing-email-alert');
				if(email != null )
				{
					if("" == trim(emailAlert.innerHTML))
						emailValue = '&login='+email.value;
					else
						emailValue = '';
					var obj = $(this);
					var href = obj.attr('href');
					if (-1 == href.indexOf('&login=') )
					{
						href = href +emailValue ;
					}
					else
					{
						href = href.replace(/&login=(.*)$/, emailValue);
					}
					obj.attr('href',href);
					obj = null;
					href = null;
				}
				$.jajax('/jajaxserver.php?app=Accounts&controller=wac&action=isCustomerAuthorised', {
					fun:prepareWacPopup,
					funParams:{thisObject : $(this)}
				});
				return false;
			}).removeAttr('onclick');

			$('.before_sign_in').click(function() {
				iframe_width = 324;
				iframe_height = 212;
				class_name = 'sign';
				beforeShowWacPopup(iframe_width, iframe_height, class_name);
				return false;
			}).removeAttr('onclick');

			wac_popup.hideTrigger.click(function() {
				hideWacPopup();
				return false;
			});

			$(window).resize(function() {
				if (wac_popup.front.is(':visible')) {
					wac_popup.front.css({
						'top' : getVerticalOffset(),
						'left' : getHorizontalOffset()
					});
				}
			});

		}
	}

	accountsPopup.init();

	/* --- Accounts popup (end) --- */

	/* --- Price options -> preview page (begin) --- */

	if ($('#price_options').length > 0) {

		var price_options_form = $('#priceVariantsForm');
		var regular_price_input = $('#regular_price');
		var regular_install_price_input = $('#regular_install_price');
		var regular2_price_input = $('#regular2_price');
		var preview_page_offers = $('#preview_page_offers');
		var installation_offer = $('input[regularInstallation="on"]',preview_page_offers);
		var regular2_offer = $('input[regular2="on"]',preview_page_offers);
		var total_amount_tag = $('#total_order_amount_bottom .order_amount');
		var points = $('#total_order_amount_bottom span.points strong');

		function toggleSelectPriceClass() {
			if ($('.selected input:checked',price_options_form).length == 0) {
				$('.selected',price_options_form).removeClass('selected');
				$('input:checked',price_options_form).closest('.price_block').addClass('selected');
			}
		}

		function offerCheck(obj, state) {
			if (state) {
				if (!obj.is(':checked')) {
					obj.attr('checked',true);
				}
			} else {
				if (obj.is(':checked')) {
					obj.removeAttr('checked');
				}
			}
		}

		function calculatePreviewTempaltePrice() {
			var total_price_option_amount = 0;
			var total_offer_amount = 0;
			var total_order_amount = 0;
			total_price_option_amount = parseInt($('input:checked',price_options_form).attr('price'));
			$('input:checked',preview_page_offers).each(function(index) {
				var bundleSelectPrice = $(this).parent().find('.checklist-widget-bundle-prices:first input[type="hidden"]:first');
				if (1 == bundleSelectPrice.length)
				{
					var selectedPrice = $(this).parent().find('.checklist-widget-bundle-prices:first li[val="' + bundleSelectPrice.val() + '"]:first');
					total_offer_amount += parseInt(selectedPrice.attr('price'));
				}
				else
				{
					total_offer_amount += parseInt($(this).attr('price'));
				}
			});
			total_order_amount = total_price_option_amount + total_offer_amount;
			total_amount_tag.html(total_order_amount);
			points.html(total_order_amount);
		}

		$('input',price_options_form).each(function() {
			var button=$(this);
			var blockHeight=button.closest('.price_content').height()/2;
			var inputHeight=button.height()/2;
			button.css('margin-top',blockHeight-inputHeight+'px');
		}).change(function() {
				if($(this).get(0) === regular_price_input.get(0)) {
					if ($(this).is(':checked')) {
						offerCheck(installation_offer, false);
						offerCheck(regular2_offer, false);
					}
				} else if ($(this).get(0) === regular_install_price_input.get(0)) {
					if ($(this).is(':checked')) {
						offerCheck(installation_offer, true);
						offerCheck(regular2_offer, false);
					}
				} else if ($(this).get(0) === regular2_price_input.get(0)) {
					if ($(this).is(':checked')) {
						offerCheck(installation_offer, false);
						offerCheck(regular2_offer, true);
					}
				} else {
					if ($(this).is(':checked')) {
						offerCheck(installation_offer, false);
						offerCheck(regular2_offer, false);
					}
				}
				toggleSelectPriceClass();
				calculatePreviewTempaltePrice();
			}).click(function(event) {
				event.stopPropagation();
			});
		$('.price_block').click(function() {
			$(this).find('input').click().change();
		});

		if ($('input:checked',price_options_form).length == 0) {
			if ($('.recommended input',price_options_form).length > 0) {
				$('.recommended input',price_options_form).attr('checked',true);
			} else {
				regular_price_input.attr('checked',true);
			}
		} else {
			if (regular_price_input.is(':checked') && installation_offer.is(':checked')) {
				regular_install_price_input.attr('checked',true);
			}
			if (regular_price_input.is(':checked') && regular2_offer.is(':checked')) {
				regular2_price_input.attr('checked',true);
			}
		}

		toggleSelectPriceClass();
		calculatePreviewTempaltePrice();

		$('#preview_page_offers input, #preview_page_offers_oncart input').change(function() {
			if ($(this).get(0) === installation_offer.get(0)) {
				if ($(this).is(':checked')) {
					if (regular_price_input.is(':checked')) {
						regular_install_price_input.attr('checked',true);
						toggleSelectPriceClass();
					}
				} else {
					if (regular_install_price_input.is(':checked')) {
						regular_price_input.attr('checked',true);
						toggleSelectPriceClass();
					}
				}
			}
			if ($(this).get(0) === regular2_offer.get(0)) {
				if ($(this).is(':checked')) {
					if (regular_price_input.is(':checked')) {
						regular2_price_input.attr('checked',true);
						toggleSelectPriceClass();
					}
				} else {
					if (regular2_price_input.is(':checked')) {
						regular_price_input.attr('checked',true);
						toggleSelectPriceClass();
					}
				}
			}
			calculatePreviewTempaltePrice();
		});

		var preview_offer_toggle_switchers = $('#preview_page_offers .toggle_switcher');

		preview_offer_toggle_switchers.each(function(index) {
			$(this).click(function() {
				$('.offer_description',$(this).closest('li')).toggle();
				$(this).toggleClass('active');
				return false;
			});
			$(this).removeAttr('onclick');
		});

		var preview_offer_discount_labels = $('#preview_page_offers .price_text del');
		if (preview_offer_discount_labels.length > 0) {
			var discount_label_title_text = '';
			if (!($('#discountPopup').length > 0)) {
				$('body').append('<div id="discountPopup"></div>');
			}
			preview_offer_discount_labels.each(function(index) {
				discount_label_title_text = $(this).prop('title');
				$(this).data('title',discount_label_title_text);
				$(this).removeAttr('title');
				initOfferPopupDiscount($(this));
			});
		}

		/* --- Preview page offers (end) --- */
	}

	/* --- Price options -> preview page (end) --- */

	/* --- Price options -> live demo page (begin) --- */

	if ($('#price_choice_form').length > 0) {

		$('#price_choice_form .recommended input').attr('checked','true');

		$('#price_choice_form input').change(function() {
			$('#price_choice_form .recommended').removeClass('recommended');
			$(this).parent().addClass('recommended');
		});

	}

	/* --- Price options -> live demo page (end) --- */

	/* --- Main banner switch (begin) --- */

	if ($('#banners_list li').length > 1) {

		var banners_list = $('#banners_list');
		var banners_list_items = $('li',banners_list);
		var banner_buttons = $('#banner_buttons');

		var switchBannerTimeout;
		function switch_banner(control_button) {
			var active_banner = $('.active_banner', banners_list);
			var active_button = $('.active_button', banner_buttons);
			if (control_button.index() !== active_banner.index()) {
				banners_list_items.not('.active_banner').css('display','none');
				var banner_to_activate = banners_list_items.eq(control_button.index());
				active_banner.removeClass('active_banner');
				banner_to_activate.addClass('active_banner');
				active_banner.fadeOut(500, function() {
					active_button.removeClass('active_button');
					control_button.addClass('active_button');
					banner_to_activate.fadeIn(500);
				});
				return true;
			} else {
				return false;
			}
		}
		function auto_switch_banner() {
			var current_button = $('.active_button', banner_buttons);
			switchBannerTimeout = setTimeout(function() {
				if ($('li', banner_buttons).length > current_button.index() + 1) {
					switch_banner(current_button.next());
				} else {
					switch_banner($('li', banner_buttons).eq(0));
				}
				auto_switch_banner();
			}, 10000);
		}
		$(window).load(function() {
			var banner_list_html = '';
			banners_list_items.not('.active_banner').each(function() {
				banner_list_html = $.base64Decode($(this).attr('id'));
				$(this).html(banner_list_html).removeAttr('id');
			});
			var not_active_banners_img = $('img',banners_list_items.not('.active_banner'));
			var not_active_banners_img_count = not_active_banners_img.length;
			var counter = 0;
			not_active_banners_img.load(function() {
				counter++;
				if (not_active_banners_img_count == counter) {
					$('li', banner_buttons).click(function() {
						clearTimeout(switchBannerTimeout)
						switch_banner($(this));
					});
					auto_switch_banner();
				}
			});
		});

	}

	/* --- Main banner switch (end) --- */

	/* --- Wide preview align -> preview page (begin) --- */

	if ($('#page .flash_preview_box .flashbox iframe').length > 0) {

		var originalIframeWidth = parseInt($('#page .flash_preview_box .flashbox iframe').css('width'));

		if (originalIframeWidth>980) {

			var previewCenterTag = $('#page .flash_preview_box .flashbox center');

			function alignPreview(windowWidth) {
				if (windowWidth>originalIframeWidth+18) {
					previewCenterTag.css('width','auto');
				} else {
					if (windowWidth>1000) {
						previewCenterTag.css('width',windowWidth-18);
					} else {
						previewCenterTag.css('width','980px');
					}
				}
			}

			alignPreview($(window).width());

			$(window).resize(function() {alignPreview($(this).width())});

		}

	}

	/* --- Wide preview align -> preview page (end) --- */

	/* --- Search form (begin) --- */

	if ($('#search-form').length > 0) {

		/* non particles ver 1996 */
		var mouseOverChecklist=true;
		var spanNodeAppendix='-options-container';
		var inputDefaultValue='- Any -';

		function selectClickEventHandler (checklistObj,event,arrayChecklist) {
			if (checklistObj.visible==false) {
				$.each(arrayChecklist,function(i,v) {
					if (checklistObj.checklist!=v.checklist && v.visible==true) {
						hideChecklist(v);
					}
				});
				if (checklistObj.spanCheckboxContainerJQ==null) {
					checklistBlockJQ=ajaxFormRequest(checklistObj);
					showChecklist(checklistObj,checklistObj.spanCheckboxContainerJQ,event,arrayChecklist);
				}
				else {
					showChecklist(checklistObj,checklistObj.spanCheckboxContainerJQ,event,arrayChecklist);
				}
			}
			else {
				hideChecklist(checklistObj)
			}
		}

		function ajaxFormRequest(checklistObj) {
			var dataToSend="mode=ajax-search&id="+checklistObj.id;
			var spanNodeID=checklistObj.spanCheckboxContainerId;
			var spanNode='<span style="display:none;" id="'+spanNodeID+'"></span>';
			checklistObj.checklist.append(spanNode);
			var jqSpanNode=checklistObj.spanCheckboxContainerJQ=$('#'+spanNodeID);
			var html = search_from_options[checklistObj.id];
			jqSpanNode.html(html);
			var checklistName=checklistObj.inputId;
			if (checklistName=='type') {
				var multiul1 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(0).outerWidth();
				var multiul2 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(1).outerWidth();
				var multiul3 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(2).outerWidth();
				var multiul4 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(3).outerWidth();
				multiul = multiul1 + multiul2 + multiul3 + multiul4;
				$('#productTypeChecklist-options-container .checklist-options').css({
					'width': multiul + 10  + 'px'
				});
			}
			if (jQuery.browser.mozilla && jQuery.browser.version < '1.9') {
				if (checklistName=='cat' || checklistName=='author') {
					jqSpanNode.children('.checklist-options').css('width',checklistObj.ff2width+'px');
				}
			}
			addEventListeners(checklistObj);
			return jqSpanNode
				;
		}

		function addEventListeners(checklistObj) {
			$('.small_button.checkAll').live('click',function() {
				checklistObj.isChanged = true;
				changeCheckbox(checklistObj, $(this).parents('.checklist-widget'), true);
			});

			$('.small_button.uncheckAll').live('click',function() {
				checklistObj.isChanged = true;
				changeCheckbox(checklistObj, $(this).parents('.checklist-widget'), false);
			});

			$('.small_button.btn-apply').live('click',function() {
				mouseOverChecklist=false;
				$('body').trigger('click');
			});

			var isProductType = (checklistObj.id == 'productTypeChecklist');
			var inputRange ='';
			if (isProductType) {
				inputRange='.multilevel >li ul li input:checkbox';
			}
			else {
				inputRange='input:checkbox';
			}
			{
				$(inputRange,checklistObj.checklist).live('click',function() {
					var currentCheckboxValue=$.trim($(this).parent().text());
					var currentSelectValue=$.trim(checklistObj.valueKeeper.text());
					var tempValue='';
					checklistObj.isChanged = true;
					if ($(this).is(':checked')) {
						if (currentSelectValue==checklistObj.defaultValue
							|| ('categoryChecklist'==checklistObj.id && 0==$(this).closest('ul').siblings().find(':checked').length
							&& 0==$(this).closest('li').siblings().find(':checked').length)
							)
						{
							tempValue=currentCheckboxValue;
						}
						else {
							tempValue=currentSelectValue+', '+currentCheckboxValue;
						}
					}
					else {
						currrentStringPosition=currentSelectValue.indexOf(currentCheckboxValue, 0);
						if (currrentStringPosition==0) {
							if (currentCheckboxValue.length==currentSelectValue.length) {
								tempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length);
							}
							else {
								tempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length+2);
							}
						} else if (-1 == currrentStringPosition) {
							tempValue='';
						} else {
							firstPartTempValue=currentSelectValue.substr(0,currrentStringPosition-2);
							secondPartTempValue=currentSelectValue.substr(currrentStringPosition+currentCheckboxValue.length);
							tempValue=firstPartTempValue+secondPartTempValue;
						}
					}
					if (tempValue=='') {
						tempValue=checklistObj.defaultValue;
					}
					checklistObj.valueKeeper.text(tempValue);
				});

			}
			if (isProductType)
			{

				$('.checklist-options .multilevel >li input:first-child').live('click',function(){
					checklistObj.isChanged = true;
					currentCheckbox=$(this);
					if (currentCheckbox.is(':checked')) {
						changeCheckbox(checklistObj,currentCheckbox.parents('li:first'),true);
					}
					else {
						changeCheckbox(checklistObj,currentCheckbox.parents('li:first'),false);
					}
				});
				$('.checklist-options .multilevel >li ul li input[type=checkbox]').live('click', function(){
					//checklistObj.isChanged = true;
					var element=$(this).parent().parent().parent().parent().find('input[type=checkbox]:first');
					var currentSelectValue=checklistObj.valueKeeper;
					var tempValue='';
					if ($(this).parents('ul:first').find('li input[type=checkbox]').size()==$(this).parents('ul:first').find('li input[type=checkbox]:checked').size()) {
						if (!element.is(':checked')) {
							element.attr('checked',true);
							tempValue=$.trim(element.parent().text())+', '+currentSelectValue.text();
							currentSelectValue.text(tempValue);
						}
					} else {
						if (element.is(':checked')) {
							element.attr('checked',false);
							if ($('input[type=checkbox]:checked',checklistObj.checklist).size()==0) {
								currentSelectValue.text(checklistObj.defaultValue);
							}
							else {
								var values='';
								$('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
									if (values=='') {
										values=$.trim($(this).parent().text());
									}
									else {
										values=values+', '+$.trim($(this).parent().text());
									}
									currentSelectValue.text(values);
								});
							}
						}
					}
				});

			}
		}

		function showChecklist(checklistObj,checklistJqObj,event,arrayChecklist) {
			animateScroll();
			var checklistName=checklistObj.inputId;
			if (checklistName=='type') {
				checklistJqObj.css('display','block');
				var multiul1 = $('ul.multilevel').outerWidth();
				var multiul2 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(1).outerWidth();
				var multiul3 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(2).outerWidth();
				var multiul4 = $('#productTypeChecklist-options-container .checklist-options ul.multilevel').eq(3).outerWidth();
				var multiul = multiul1 + multiul2 + multiul3 + multiul4;
				if (multiul < '400') {
					if ($.browser.msie && $.browser.version==6 || $.browser.msie && $.browser.version==7) {
						$('#productTypeChecklist-options-container .checklist-options').css({
							'width': multiul + 425  + 'px'
						});
					} else {
						$('#productTypeChecklist-options-container .checklist-options').css({
							'width': multiul + 394  + 'px'
						});
					}
				} else {
					$('#productTypeChecklist-options-container .checklist-options').css({
						'width': multiul + 10  + 'px'
					});
				}

			} else {
				checklistJqObj.css('display','block');
			}
			checklistObj.checklist.bind('mouseenter',function() {
				mouseOverChecklist=true;
			});
			checklistObj.checklist.bind('mouseleave',function() {
				mouseOverChecklist=false;
			});
			checklistObj.visible=true;
			mouseOverChecklist=true;
			waitForChecklistBlur(event,arrayChecklist);
		}

		function hideChecklist(checklistObj) {
			checklistObj.checklist.unbind('mouseenter');
			checklistObj.checklist.unbind('mouseleave');
			checklistObj.spanCheckboxContainerJQ.css('display','none');
			checklistObj.visible=false;
			$('body').unbind('click');
		}

		function waitForChecklistBlur(event,arrayChecklist) {
			event.stopPropagation();
			$('body').bind('click',function() {
				if (mouseOverChecklist==false) {
					hideAllChecklist(arrayChecklist);
				}
			});
		}

		function hideAllChecklist(arrayChecklist) {
			$('#searchFormResetButton').css('display','none');
			$.each(arrayChecklist,function(i,v) {
				if (v.visible==true) {
					v.spanCheckboxContainerJQ.css('display','none');
					v.visible=false;
				}
				if ($('input[type=checkbox]:checked',v.checklist).size()>0
					||(('categoryChecklist' == v.id) && ('' != $('#'+v.inputId).val()) && (v.defaultValue != trim(v.valueKeeper.html())))) {
					$('#searchFormResetButton').css('display','block');
				}
				else {
					$('#'+v.inputId).val('');
				}
			});
			$('body').unbind('click');
			checkResetButtonShow();
		}

		function changeCheckbox(checklistObj,checkboxRange,status) {
			checklistGroup=$('input[type=checkbox]',checkboxRange);
			checklistGroup.attr('checked',status);
			var values='';
			if (status) {
				if (checkboxRange==checklistObj.checklist) {
					$('#'+checklistObj.id+' ul li label').each(function() {
						if (values=='') {
							values=$.trim($(this).text());
						}
						else {
							values=values+', '+$.trim($(this).text());
						}
					});

				}
				else {
					$('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
						if (values=='') {
							values=$.trim($(this).parent().text());
						}
						else {
							values=values+', '+$.trim($(this).parent().text());
						}
					});
				}
				checklistObj.valueKeeper.text(values);
			}
			else {
				$('input[type=checkbox]:checked',checklistObj.checklist).each(function() {
					if (values=='') {
						values=$.trim($(this).parent().text());
					}
					else {
						values=values+', '+$.trim($(this).parent().text());
					}
				});
				checklistObj.valueKeeper.text(values);
			}
			if ($('input[type=checkbox]:checked',checklistObj.checklist).size()==0) {
				checklistObj.valueKeeper.text(checklistObj.defaultValue);
			}
		}

		function checkResetButtonShow() {
			var resetButtonVisible = false;
			if (
				('- Any Product -' != trim($('#productTypeChecklist .checklist-select-value:first').html())) ||
					('- Any Category -' != trim($('#categoryChecklist .checklist-select-value:first').html())) ||
					('- Any Author -' != trim($('#authorChecklist .checklist-select-value:first').html())) ||
					('- Any -' != trim($('#tid_field').val())) ||
					('- Any -' != trim($('#search_words_field').val())) ||
					(0 != $('#colour-selector li.checked:first').length)
				) {
				resetButtonVisible = true;
			}
			$('#searchFormResetButton').css('display', (resetButtonVisible ? 'block' : 'none'));
		}

		function animateScroll() {
			var headerOffset=$('#search-form').offset().top;
			if ($.browser.webkit) {
				$('body').animate({
					scrollTop: headerOffset
				}, 1300);
			} else {
				$('html').animate({
					scrollTop: headerOffset
				}, 1300);
			}
		}

		function collectCheckboxValues(checklistObj) {
			if (checklistObj.spanCheckboxContainerJQ!=null && checklistObj.isChanged) {
				checkboxes=$('input[type=checkbox]:checked',checklistObj.spanCheckboxContainerJQ)
				if (checkboxes.size()>0) {
					values='';
					checkboxes.each(function(){
						if (values.length==0) {
							values=values+$(this).val();
						}
						else {
							values=values+','+$(this).val();
						}
					});
					document.getElementById(checklistObj.inputId).value=values;
				}
			}
		}

		var formContainer=$('#sform_container');
		var productType=new Object();
		productType.checklist=$('#productTypeChecklist');
		productType.id=productType.checklist.attr('id');
		productType.valueKeeper=$('#'+productType.id+' .checklist-select-value');
		productType.defaultValue='- Any Product -';
		productType.visible=false;
		productType.spanCheckboxContainerId=productType.id+spanNodeAppendix;
		productType.spanCheckboxContainerJQ=null;
		productType.inputId='type';
		productType.ff2width=400;
		productType.isChanged=false;
		var productCategory=new Object();
		productCategory.checklist=$('#categoryChecklist');
		productCategory.id=productCategory.checklist.attr('id');
		productCategory.valueKeeper=$('#'+productCategory.id+' .checklist-select-value');
		productCategory.defaultValue='- Any Category -';
		productCategory.visible=false;
		productCategory.spanCheckboxContainerId=productCategory.id+spanNodeAppendix;
		productCategory.spanCheckboxContainerJQ=null;
		productCategory.inputId='category';
		productCategory.ff2width=755;
		productCategory.isChanged=false;
		var productAuthor=new Object();
		productAuthor.checklist=$('#authorChecklist');
		productAuthor.id=productAuthor.checklist.attr('id');
		productAuthor.valueKeeper=$('#'+productAuthor.id+' .checklist-select-value');
		productAuthor.defaultValue='- Any Author -';
		productAuthor.visible=false;
		productAuthor.spanCheckboxContainerId=productAuthor.id+spanNodeAppendix;
		productAuthor.spanCheckboxContainerJQ=null;
		productAuthor.inputId='author';
		productAuthor.ff2width=620;
		productAuthor.isChanged=false;

		var ajaxChecklistGroup=new Array(productType,productCategory,productAuthor);


		var tid_field=$('#tid_field');
		var search_words_field=$('#search_words_field');
		//var from_field=$('#from_field');
		//var to_field=$('#to_field');
		var inputsGroup=new Array(tid_field,search_words_field/*,from_field,to_field*/);

		var searchFormSubmit=$('#searchFormSubmit');
		var searchFormResetButton=$('#searchFormResetButton');
		var colorSearch=$('#colour-selector');
		var searchForm=$('#searchForm');

		searchFormSubmit.click(function() {
			searchForm.submit();
		});

		searchForm.submit(function() {
			$.each(ajaxChecklistGroup,function(index,value) {
				collectCheckboxValues(value);
			});
		});

		searchFormResetButton.click(function(){
			$('#colour-selector li').removeClass('checked');
			$('#colour-selector input[type=checkbox]:checked').attr('checked', false);
			$.each(ajaxChecklistGroup,function(i,v) {
				$('input[type=checkbox]:checked',v.checklist).attr('checked', false);
				v.valueKeeper.text(v.defaultValue);
				$('#'+v.inputId).val('');
			});
			$.each(inputsGroup,function(i,v) {
				v.val(inputDefaultValue).css('text-align','center');
			});
			checkResetButtonShow();
		});

		$.each(ajaxChecklistGroup, function(index,value) {
			value.checklist.children().click(function(event) {
				selectClickEventHandler(value,event,ajaxChecklistGroup)
			});
			if ($('#'+value.inputId).val()!='') {
				var tempArray=$('#'+value.inputId).val().split(',');
				ajaxFormRequest(value);
				$('input[type=checkbox]',value.checklist).ready(function() {
					$.each(tempArray,function(i,v) {
						$('input[value="'+v+'"]',value.checklist).attr('checked',true);
					});
				});
				if (('categoryChecklist' == value.id) && 0 == $('input:checked', value.checklist).length && $('#cat').val())
				{
					$('input[value="'+$('#cat').val()+'"]',value.checklist).attr('checked',true);
				}
			}
		});

		checkResetButtonShow();

		$.each(inputsGroup, function(index,value) {
			value.focus(function() {
				if ($(this).val()==inputDefaultValue) {
					value.val('').css('text-align','left');
				}
			});
			value.blur(function() {
				if ($(this).val()=='') {
					value.val(inputDefaultValue).css('text-align','center');
				}
				else if ($(this).val()==inputDefaultValue) {
					value.css('text-align','center');
				}
				checkResetButtonShow();
			}).keypress(function(e) {
					var code = e.keyCode || e.which;
					if(code == 13) {
						searchForm.submit();
					}
				});
		});

		$('#colour-selector li span').click(function(event){
			var checked = $(this).parent().hasClass('checked');
			if (!checked && $('#colour-selector input[type=checkbox]:checked').size()>=3) {
				alert('You may not use more colors for search!');
			}
			else {
				$(this).parent().toggleClass('checked');
				$(this).next().attr('checked', $(this).parent().hasClass('checked'));
				checkResetButtonShow();
			}
		});

	}

	/* --- Search form (end) --- */

	/* --- Template preview (begin) --- */

	if ($('.product-thumbnail').length > 0) {

		var previewTimeout;

		function showPreview(wrapper,heading,title,src,width,height) {
			var previewHTML='<img id="templatePreviewImage" height="'+height+'" width="'+width+'" src="'+src+'" alt=""/><div id="templatePreviewProgressBar">Loading template preview...</div>';
			heading.innerHTML=title;
			document.getElementById('templatePreviewBody').innerHTML=previewHTML;
			previewProgress = document.getElementById('templatePreviewProgressBar');
			previewImage = document.getElementById('templatePreviewImage');
			previewImage.onload=function() {
				previewProgress.style.display='none';
			}
			previewTimeout = setTimeout(function (){
				wrapper.display='block'
			},250);
		}

		function showFLVPreview(wrapper,heading,title,src,width,height) {
			var flvBlock = '' +
				'<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" style="display:block" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="' + width + '" height="' + height + '">' +
				'<param name="allowScriptAccess" value="sameDomain" />' +
				'<param name="allowFullScreen" value="true" />' +
				'<param name="quality" value="high">' +
				'<param name="menu" value="false">' +
				'<param id="nameValueFLV" name="movie" value="/images/popup-player.swf?titleVideo=' + src + '" />' +
				'<param name="quality" value="high" />' +
				'<param name="bgcolor" value="#010101" />' +
				'<embed src="/images/popup-player.swf?titleVideo=' + src + '" quality="high" menu="false" bgcolor="#010101" width="' + width + '" height="' + height + '" name="video" align="middle" allowScriptAccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></embed>' +
				'</object>';
			$('#templatePreviewBody').prepend(flvBlock);
			$('#templatePreviewProgressBar').css('display', 'none');
			heading.innerHTML=title;
			previewTimeout = setTimeout(function (){
				wrapper.display='block'
			},250);
		}

		function hidePreview(wrapper,heading,image) {
			clearTimeout(previewTimeout);
			$('#templatePreviewBody').empty();
			wrapper.display='none';
		}

		function previewMouseFollow(event,wrapper,width,height,winWidth,winHeight,topOffset) {
			pageX=event.pageX;
			pageY=event.pageY;
			previewOffsetTop=(winHeight-height)/2;
			previewOffsetLeft=(winWidth-width)/2;
			correctedTopOffset=previewOffsetTop+topOffset;
			offset=30;
			centered=false;
			if (winHeight > height) {
				if (pageY<correctedTopOffset-offset) {
					pageY=pageY+offset;
				}
				else if (pageY>correctedTopOffset+height+offset) {
					pageY=pageY-offset-height;
				}
				else {
					pageY=correctedTopOffset;
					centered=true;
				}
			}
			else {
				pageY=topOffset;
				centered=true;
			}
			if (centered) {
				if (pageX<winWidth/2) {
					pageX+=offset;
				}
				else {
					pageX=pageX-width-offset;
				}
			}
			else {
				if (pageX<previewOffsetLeft-offset) {
					pageX=pageX+offset;
				}
				else if (pageX>previewOffsetLeft+width+offset) {
					pageX=pageX-width-offset;
				}
				else {
					pageX=previewOffsetLeft;
				}
			}
			wrapper.left=pageX+'px';
			wrapper.top=pageY+'px';
		}

		var currentWindow=$(window);
		var windowObj = new Object();
		windowObj.width = currentWindow.width();
		windowObj.height = currentWindow.height();
		windowObj.scrollTop = currentWindow.scrollTop();
		var previewWrapper=document.getElementById('templatePreviewWrapper').style;
		var previewHeading=document.getElementById('templatePreviewHeading');
		var previewProgress;
		var previewImage;

		currentWindow.resize(function(){
			windowObj.width=$(this).width();
			windowObj.height=$(this).height();
		}).scroll(function(){
				windowObj.scrollTop=$(this).scrollTop();
			});

		$('.product-thumbnail').each(function() {
			var currentTemplate = $(this);
			if (typeof currentTemplate.attr('id') !=="undefined"){
				var previewInfo = currentTemplate.attr('id').split('_');
			} else {
				var previewInfo = currentTemplate.find('img:first').attr('id').split('_');
			}
			var widthOffset = 32;
			var heightOffset = 53;
			var display;

			eval('var previewObject = ' + $.base64Decode(previewInfo[2]));

			if (previewObject.width > 0) {
				previewObject.id = previewInfo[1];
				currentTemplate.hover(
					function() {
						var fileExt = previewObject.img.substr(previewObject.img.length-4, 4).toLowerCase();
						switch (fileExt) {
							case '.flv':
								$('#templatePreviewBody').html('<div id="templatePreviewProgressBar">Loading template preview...</div>');
								previewProgress = document.getElementById('templatePreviewProgressBar');
								break;
							default:
								$('#templatePreviewBody').html('<img id="templatePreviewImage" height="" width="" src="" alt=""/><div id="templatePreviewProgressBar">Loading template preview...</div>');
								previewProgress = document.getElementById('templatePreviewProgressBar');
								previewImage = document.getElementById('templatePreviewImage');
								previewImage.onload=function() {
									previewProgress.style.display='none';
								}
								break;
						}
						previewProgress.style.display="block";
						previewWidth=previewObject.width+widthOffset;
						previewHeight=previewObject.height+heightOffset;
						if (windowObj.width > previewWidth) {
							display = true;
						} else {
							display = false;
						}
						if (display) {
							var description = currentTemplate.attr('alt');
							if ('string' !== typeof description)
								description = 'Template ' + previewObject.id;
							switch (fileExt) {
								case '.flv':
									showFLVPreview(previewWrapper,previewHeading,description,'http://scr.templatemonster.com/' + Math.floor(previewObject.id / 100) + '00/' + previewObject.img,previewObject.width,previewObject.height);
									break;
								default:

									showPreview(previewWrapper,previewHeading,description,'http://scr.templatemonster.com/' + Math.floor(previewObject.id / 100) + '00/' + previewObject.img,previewObject.width,previewObject.height);
									break;
							}
						}
					},
					function() {
						var fileExt = previewObject.img.substr(previewObject.img.length-4, 4).toLowerCase();
						hidePreview(previewWrapper,previewHeading);
					}
				).mousemove(function(event) {
						if (display) {
							previewMouseFollow(event,previewWrapper,previewWidth,previewHeight,windowObj.width,windowObj.height,windowObj.scrollTop);
						}
					});
			}
		});

	}

	/* --- Template preview (end) --- */

	/* --- Price hints (begin) --- */

	if ($('.altTitle').length > 0) {

		var hintTimeout;
		var priceHint=document.getElementById('altDiv');
		var hint = new Object();

		function showPriceHint(hint,currentElement,hintType) {
			var hintValue='';
			if (hintType=='price') {
				var elemId=currentElement.data('id');
				var priceTitle=document.getElementById(elemId);
				hintValue=priceTitle.innerHTML;
			}
			else if (hintType=='type') {
				hintValue='<p>'+currentElement.data('alt')+'</p>';
			}
			hint.innerHTML=hintValue;
			hint.style.display='block';
			hintTimeout = setTimeout(function (){hint.style.visibility='visible';},250);
		}

		function hidePriceHint (hint) {
			hint.style.display='none';
			hint.style.visibility='hidden';
			clearTimeout(hintTimeout);
		}

		function hintMouseFollow(event,priceHint,windowHeight,windowWidth,hintHeight,hintWidth,topOffset) {
			var x=event.pageX+15;
			var y=event.pageY;
			var correctedY=windowHeight-10-hintHeight+topOffset
			var correctedX=windowWidth-10-hintWidth;
			if (correctedY<y) {y=correctedY;}
			if (correctedX<x) {x=x-hintWidth-30}
			priceHint.style.left=x+'px';
			priceHint.style.top=y+'px';
		}

		$("span.price-label.altTitle, a.last.altTitle").each(function() {
			var currentElement=$(this);
			currentElement.data('id',currentElement.prop('title')).prop('title','');
		}).hover(function() {
				showPriceHint(priceHint,$(this),'price');
				hint.height=priceHint.clientHeight;
				hint.width=priceHint.clientWidth;
			}, function() {
				hidePriceHint(priceHint);
			}).mousemove(function(event) {
				hintMouseFollow(event,priceHint,$(window).height(),$(window).width(),hint.height,hint.width,$(window).scrollTop());
			});

		$("a.productType.altTitle").each(function() {
			currentElement=$(this);
			currentElement.data('alt',currentElement.prop('title')).prop('title','');
		}).hover(function() {
				if ($(this).data('alt')!='') {
					showPriceHint(priceHint,$(this),'type');
					hint.height=priceHint.clientHeight;
					hint.width=priceHint.clientWidth;
				}
			}, function() {
				hidePriceHint(priceHint);
			}).mousemove(function(event) {
				hintMouseFollow(event,priceHint,$(window).height(),$(window).width(),hint.height,hint.width,$(window).scrollTop());
			});

	}

	/* --- Price hints (end) --- */

	/* --- Properties tooltips (begin) --- */
	if ($('.propertyTitle').length > 0)
	{
		var hintTimeout;
		var propertyTooltip = document.getElementById('altDiv');
		var hint = new Object();

		function showPropertyTooltip(hint,currentElement) {
			var hintValue='';
			var elemId=currentElement.data('id');
			var priceTitle=document.getElementById(elemId);
			hintValue=priceTitle.innerHTML;
			hint.innerHTML=hintValue;
			hint.style.display='block';
			hintTimeout = setTimeout(function (){hint.style.visibility='visible';},250);
		}

		function hidePropertyTooltip (hint) {
			hint.style.display='none';
			hint.style.visibility='hidden';
			clearTimeout(hintTimeout);
		}

		function hintMouseFollow(event,propertyTooltip,windowHeight,windowWidth,hintHeight,hintWidth,topOffset) {
			var x=event.pageX+15;
			var y=event.pageY;
			var correctedY=windowHeight-10-hintHeight+topOffset
			var correctedX=windowWidth-10-hintWidth;
			if (correctedY<y) {y=correctedY;}
			if (correctedX<x) {x=x-hintWidth-30}
			propertyTooltip.style.left=x+'px';
			propertyTooltip.style.top=y+'px';
		}

		$("a.property.propertyTitle").each(function() {
			var currentElement=$(this);
			currentElement.data('id',currentElement.prop('title')).prop('title','');
		}).hover(function() {
				showPropertyTooltip(propertyTooltip,$(this));
				hint.height=propertyTooltip.clientHeight;
				hint.width=propertyTooltip.clientWidth;
			}, function() {
				hidePropertyTooltip(propertyTooltip);
			}).mousemove(function(event) {
				hintMouseFollow(event,propertyTooltip,$(window).height(),$(window).width(),hint.height,hint.width,$(window).scrollTop());
			});
	}

	/* --- Properties tooltips (end) --- */

	/* --- Discount hints (begin) --- */

	if ($('.prThTempl').length > 0) {

		var DISCOUNT_HINT_CLASS = 'popupAltTitleDiscountPrice';
		VERTICAL_OFFSET = 15;
		var discountPopup = $('#altDiv');
		var discountHintTimeout;

		if ($('#livedemo').length > 0) {
			VERTICAL_OFFSET = -25;
		}

		function getDiscountText(element) {
			var prthtempl = element.prev('.popupAltTitleDiscountPrice');
			if (prthtempl.length > 0) {
				return prthtempl.html();
			} else if ($('#livedemo').length > 0) {
				return $('.' + DISCOUNT_HINT_CLASS).html();
			} else {
				return element.closest('td').find('.' + DISCOUNT_HINT_CLASS).html();
			}
		}

		function showDiscountHint(text) {
			discountPopup.html(text).addClass(DISCOUNT_HINT_CLASS).css({'display':'block','left':'-100px','top':'-100px'});
			discountHintTimeout = setTimeout(function() {
				discountPopup.css('visibility','visible');
			},250);
		}

		function followMouseHint(event) {
			var correctX = event.pageX - discountPopup.width() / 2;
			var correctY = event.pageY - discountPopup.height() - VERTICAL_OFFSET;
			discountPopup.css({'left':correctX+'px', 'top':correctY+'px'});
		}

		function hideDiscountHint() {
			discountPopup.html('').css({'visibility':'hidden','display':'none'}).removeClass(DISCOUNT_HINT_CLASS);
			clearTimeout(discountHintTimeout);
		}

		$('.prThTempl').hover(function() {
				showDiscountHint(getDiscountText($(this)));
			},
			function() {
				hideDiscountHint();
			}).mousemove(function(event) {
				followMouseHint(event);
			});

	}

	if ($('#delicious_social_icon').length > 0) {
			function initCorrectUrlForDelicious() {
			var delicious_icon = document.getElementById('delicious_social_icon');
			var title_cont = document.getElementsByTagName('title')[0].innerHTML;
			try {
				var meta = document.getElementsByName('description')[0].content;
			} catch(e) {
				meta = '';
			}
			delicious_icon.href += '?url='+location.href+'&title='+title_cont+'&notes='+meta;
		}


		initCorrectUrlForDelicious();

	}

	/* --- Delicious url (end) --- */
	/* --- Text testimonials switch (begin) --- */

	if ($('#testimonials').length > 0) {

	var testimonials = document.getElementById('testimonials').getElementsByTagName('li');
	var testimonials_count = testimonials.length;
	for (i=0; i<testimonials_count; i++) {
		var id_number = i + 1;
		testimonials[i].setAttribute('id', 'testimonial_' + id_number);
	}

	var testimonials_list = $('#testimonials ul');

		var PAUSED_SWITCH_CLASS = 'paused_testimonial_switch';
		var ACTIVE_CLASS = 'active_testimonial';
		if (!$.browser.msie) {
			$('li',testimonials_list).filter(function(){
				return !$(this).hasClass(ACTIVE_CLASS);
			}).css('display','none');
		}
		var switchTestimonialTimeout;
		var paused_testimonial_switch = false;
		function switch_testimonial(slide_direction) {
			var current_testimonial = $('.' + ACTIVE_CLASS ,testimonials_list);
			if (slide_direction == 'prev') {
				if (current_testimonial.prev().length > 0) {
					testimonial_to_activate = current_testimonial.prev();
				} else {
					testimonial_to_activate = $('#testimonial_' + testimonials_count);
				}
			} else {
				if (current_testimonial.next().length > 0) {
					testimonial_to_activate = current_testimonial.next();
				} else {
					testimonial_to_activate = $('#testimonial_' + 1);
				}
			}
			current_testimonial.removeClass(ACTIVE_CLASS);
			testimonial_to_activate.addClass(ACTIVE_CLASS);
			if (!$.browser.msie) {
				current_testimonial.fadeOut();
				testimonial_to_activate.fadeIn();
			}
		}
		function auto_switch_testimonial() {
			switchTestimonialTimeout = setTimeout(function() {
				if (!$.browser.msie) {
					if (1 == testimonials_list.find('li:visible').length) {
						switch_testimonial('next');
					}
				}
				else { switch_testimonial('next'); }
					auto_switch_testimonial();
			}, 10000);
		}
		$('#next_testimonial').click(function() {
			if (!paused_testimonial_switch) {
				clearTimeout(switchTestimonialTimeout);
				auto_switch_testimonial();
			}
			switch_testimonial('next');
			return false;
		});
		$('#previous_testimonial').click(function() {
			if (!paused_testimonial_switch) {
				clearTimeout(switchTestimonialTimeout);
				auto_switch_testimonial();
			}
			switch_testimonial('prev');
			return false;
		});
		$('#stop_play_testimonial').click(function() {
			if ($(this).hasClass(PAUSED_SWITCH_CLASS)) {
				paused_testimonial_switch = false;
				$(this).removeClass(PAUSED_SWITCH_CLASS);
				auto_switch_testimonial();
			} else {
				paused_testimonial_switch = true;
				clearTimeout(switchTestimonialTimeout);
				$(this).addClass(PAUSED_SWITCH_CLASS);
			}
			return false;
		});
		auto_switch_testimonial();
	}

	/* --- Text testimonials switch (end) --- */

	/* --- Video testimonial popup (begin) --- */

	if ($('#video_testimonial_thumbnail').length > 0) {

		var testimonial_popup = new Object();

		testimonial_popup.current_window = $(window);
		testimonial_popup.good_browser = true;
		testimonial_popup.show_node = $('#video_testimonial_thumbnail');
		testimonial_popup.hide_node = $('#close_testimonial_popup');
		testimonial_popup.popup_node = $('#testimonial_popup');
		testimonial_popup.layout_node = $('<div id="popup_back_layout"></div>');
		testimonial_popup.video_container = $('#video_wrapper');
		testimonial_popup.video_object = '';
		testimonial_popup.calculate_vertical_offset = function() {
			var vertical_offset = (this.current_window.height() - this.popup_node.height())/2;
			if (!this.good_browser) {
				vertical_offset = vertical_offset + this.current_window.scrollTop();
			}
			if (vertical_offset < 0) {
				vertical_offset = 0;
			}
			return vertical_offset;
		}
		testimonial_popup.show_popup = function() {
			var popup_obj = this;
			popup_obj.video_container.html(popup_obj.video_object);
			$('body').addClass('popup_related');
			var popup = popup_obj.popup_node;
			popup.css('display','block');
			var vertical_offset = popup_obj.calculate_vertical_offset();
			var popup_width = popup.width();
			var horizontal_offset = popup_width/2 - popup_width;
			if (popup_obj.good_browser) {
				popup_obj.layout_node.css('display','block');
			} else {
				popup_obj.layout_node.css({
					'display':'block',
					'height':$('body').outerHeight()
				});
			}
			popup.css({
				'top' : vertical_offset,
				'margin-left' : horizontal_offset,
				'visibility' : 'visible',
				'width':popup_width
			});
		}
		testimonial_popup.hide_popup = function() {
			var popup_obj = this;
			$('body').removeClass('popup_related');
			popup_obj.popup_node.css({
				'display':'none',
				'visibility':'hidden'
			});
			popup_obj.video_container.html('');
			popup_obj.layout_node.css('display','none');
		}
		testimonial_popup.init = function(video) {
			$('body').append(this.layout_node);
			var popup_obj = this;
			popup_obj.video_object = video;
			if ($('body').hasClass('isIE6')) {
				popup_obj.good_browser = false;
			}
			popup_obj.show_node.click(function() {
				popup_obj.show_popup();
				return false;
			});
			popup_obj.layout_node.click(function() {
				popup_obj.hide_popup();
			});
			popup_obj.hide_node.click(function() {
				popup_obj.hide_popup();
				return false;
			});
			popup_obj.current_window.resize(function() {
				popup_obj.popup_node.css('top',popup_obj.calculate_vertical_offset());
			});
			if (!popup_obj.good_browser) {
				popup_obj.current_window.scroll(function() {
					popup_obj.popup_node.stop().animate({
						top:popup_obj.calculate_vertical_offset()
					},500);
				}).resize(function() {
						popup_obj.layout_node.css('height',$('body').outerHeight());
					});
			}
		}
		testimonial_popup.init('<object style="height: 390px; width: 640px"><param name="movie" value="http://www.youtube.com/v/1YMxpeIkxbA?version=3"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/1YMxpeIkxbA?version=3" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="640" height="390"></object>');

	}

	/* --- Video testimonial popup (end) --- */

	/* --- Search properties dropdown menu (begin) --- */

	if ($('#search_properties').length > 0) {

		$(document).click(function(event) {
			if ((event.target.className != 'ajax-checklist-select-value') && (event.target.className != 'ajax-checklist-select-control')) {
				var list1 = $('#ShowResultsList');
				var list2 = $('#ShowResultsList2');
				list1.hide();
				list2.hide();
			}
		});
		$('#ShowResultsLabel').click(function() {
			var list = $('#ShowResultsList');
			var tmplist = $('#ShowResultsList2');
			tmplist.hide();
			if (list.css('display')!='none') {
				list.hide();
			} else {
				list.show();
			}
		});
		$('#ShowResultsLabel2').click(function() {
			var list = $('#ShowResultsList2');
			var tmplist = $('#ShowResultsList');
			tmplist.hide();
			if (list.css('display')!='none') {
				list.hide();
			} else {
				list.show();
			}
		});
		$('#ShowResultsList ul li').each(function(){
			$(this).css('cursor','pointer').mouseover(function() {
				$(this).css('background-color','#B6D7F0');
			}).mouseout(function(){
					$(this).css('background-color','');
				}).click(function(){
					$('#sp_srb').val($(this).attr('val'));
					document.forms.researchform.submit();
				});
		});
		$('#ShowResultsList2 ul li').each(function(){
			$(this).css('cursor','pointer').mouseover(function() {
				$(this).css('background-color','#B6D7F0');
			}).mouseout(function(){
					$(this).css('background-color','');
				}).click(function(){
					$('#sp_rpp').val($(this).attr('val'));
					document.forms.result_per_page.submit();
				});
		});

	}

	/* --- Search properties dropdown menu (end) --- */

	/* --- Cart pages functions and events (begin) --- */

	function initBillingContactPhones() {
		$('#billing-phone-help').bind('mouseenter', function() {
			showDiscount("phone-question");
		}).bind('mousemove', function(event) {
				moveDiscount(event,'300px');
			}).bind('mouseout', function() {
				hideDiscount();
			});
		$('#billing-rphone-help').bind('mouseenter', function(event) {
			showDiscount("rphone-question");
		}).bind('mousemove', function(event) {
				moveDiscount(event,'300px');
			}).bind('mouseout', function() {
				hideDiscount();
			});
	}

	if ($('body').hasClass('profile-page')) {
		initBillingContactPhones();
	}

	if (
		($('#shopping-cart-2').length > 0) ||
		($('#offerPopup').length > 0)
	)
	{
		initDelFullPrice();
		$('del.fullPrice').live('mouseenter', function() {
			showDiscount($(this).data('id'));
		}).live('mousemove', function(event) {
			moveDiscount(event,'auto');
		}).live('mouseout', function() {
			hideDiscount();
		});
	}

	if ($('#shopping-cart-2').length > 0) {

		/* --- Cart - Common (begin) --- */

		$('.alttitle').each(function() {
			$(this).find('.price-type').alttitle('div#alttitle_' + $(this).attr('for'));
		});

		$('strike.fullPrice').live('mouseenter', function() {
			if ($(this).data('id')=='' || $(this).data('id')==undefined) {
				$(this).data('id',$(this).prop('title')).removeAttr('title');
			}
			showDiscount($(this).data('id'));
		}).live('mousemove', function(event) {
				moveDiscount(event,'auto');
			}).live('mouseout', function() {
				hideDiscount();
			});

		/* --- Cart - Common (begin) --- */

		/* --- Cart - Step 1 (begin) --- */

		if ($('body').hasClass('first-step')) {

			function cartAction(action) {
				$('#action')[0].value = action;
				$('#form')[0].submit();
			}

			function offerState(tId, oId, state) {
				var el = document.getElementById('off_'+tId+'_'+oId);
				if (el != null) {
					el.value = state;

					var action = 'templateOffersLoad';
					if (tId == 'onCart') action = 'onCartOffersLoad';
					$.jajax('/jajaxserver.php?app=SystemCart&controller=CartRender&action='+action, {
						fun:updateInfo,
						formid:'form',
						post: page_meta.session_name + '=' + page_meta.session_ID + '&tId='+tId
					});
				}
			}

			function cartCalculate(event) {
				if (event != false) {
					event.cancelBubble=true;
				}
				$.jajax('/jajaxserver.php?app=SystemCart&controller=CartCalculation&action=cartCalculation', {
					fun:updateInfo,
					formid:'form',
					post: page_meta.session_name + '=' + page_meta.session_ID
				});
				return false;
			}

			$('.click-box h3').live('click',function() {
				var common_slide_area = $('.slide-area:visible',$(this).closest('.cart-slide-box'));
				var current_slide_area = $('.slide-area',$(this).closest('.click-box'));
				var button_box = $('.button-box',$(this).closest('.click-box'));
				if ((current_slide_area.get(0) !== common_slide_area.get(0)) && (common_slide_area.length > 0)) {
					common_slide_area.css('display','none');
					$('.button-box',common_slide_area.closest('.click-box')).addClass('bg-off');
				}
				if (current_slide_area.is(':visible')) {
					current_slide_area.css('display','none');
					button_box.addClass('bg-off');
				} else {
					current_slide_area.css('display','block');
					button_box.removeClass('bg-off');
				}
			});

			$('#form').submit(function() {
				cartCalculate(false);
				return false;
			});

			$('.cart-template-cont input[type=radio]').change(function(event) {
				cartCalculate(event);
			});

			$('.checkout-link').click(function() {
				return verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step);
			});

			$('.continue-shopping-link').click(function() {
				cartAction('shopping')
				return false;
			});

			$('.refresh-cart-link').click(function() {
				cartAction('update');
				return false;
			});

			$('.offer-state-change').live('click',function() {
				var offer_params = $(this).attr('id').split('_');
				offerState(offer_params[1],offer_params[2],offer_params[3]);
				return false;
			});


			if (!($('.cart-template-box').length > 0) && !($('#oncart-checked-offers')[0].childNodes.length > 0)) {
				$('body').addClass('empty-cart');
				$('#total').text('0');
			}

			$('.template-price').each(function() {

				if ($('input',$(this)).is(':checked')) {
					$(this).addClass('selected');
				}

				$('input',$(this)).click(function(event) {
					if (!$(this).closest('label').hasClass('selected')) {
						$(this).closest('p').find('label').toggleClass('selected');
					}
					event.stopPropagation();
				});

			});

			/* - Shopping cart captcha (begin) - */

			function addCaptcha() {
				$('#verificationCode')[0].value = $('#sendVerificationCode')[0].value;
				$('#sendCaptcha')[0].submit();
			}

			$('#apply_cart_captcha_verification_code').click(function() {
				addCaptcha();
				return false;
			});

			$('#sendVerificationCode').keypress(function(event) {
				if (((event.keyCode == 10) ||(event.keyCode==13))) {
					addCaptcha();
				}
			});

			/* - Shopping cart captcha (end) - */

		}

		/* --- Cart - Step 1 (end) --- */

		/* --- Cart - Step 2 (begin) --- */

		if ($('body').hasClass('first-step')) {
			function checkPromocode() {
				var promocode = $('#promo_field').val();
				$.jajax('/jajaxserver.php?app=SystemCart&controller=CartCalculation&action=cartDetailsCalculation', {
					fun:updateInfo,
					formid:'form',
					post: page_meta.session_name + '=' + page_meta.session_ID + '&codes=' + promocode
				});
			}
			$('#apply_promo_code').click(function() {
				checkPromocode();
			});
			$('#promo_field').keypress(function(e) {
				if (isEnterPressed(e)) {
					checkPromocode();
					return false;
				}
			});
		}


		if ($('body').hasClass('second-step')) {

			function OnCountryChange(selCountry) {
				if (!page_meta.cart_empty) {
					$.jajax('/jajaxserver.php?app=SystemCart&controller=CountryChange&action=onCountryChange', {
						fun:$.jajaxparse,
						post:'country=' + selCountry.value + '&step=' + page_meta.cart_step + '&' + page_meta.session_name + '=' + page_meta.session_ID + '&gift=' + (true == page_meta.gift_certificate ? 'on' : 'off')
					});
				}
			}
			/*/////////////////////////////////////////*/


			function prepareSimpleSlider() {
				$('.slide-area').css({
					'display':'none'
				});
				$("#click_to_action").html("(click to open)");
				$('.click-box').each(function() {
					var button = $(this).children('.button-box');
					var slidearea = $(this).children('.slide-area');
					button.click(function() {
						slidearea.slideToggle("fast", function() {
							if($(button).hasClass('bg-off')){
								$("#click_to_action").html("(click to hide)");
							}
							else {$("#click_to_action").html("(click to open)");}

						});
						button.toggleClass('bg-off');
						button.children('.img').toggleClass('open');
					});
				});
			}

			prepareSimpleSlider();

			function checkCartDetailsField(field, isFocus) {
				if ('undefined' == typeof isFocus)
				{
					isFocus = false;
				}
				verify_email_info(page_meta.session_name + '=' + page_meta.session_ID + '&step=' + page_meta.cart_step + '&checkField='+field.name + (true == isFocus ? '&focus=on' : ''), true);
			}

			$('#billing-email').blur(function() {
				checkCartDetailsField(this);
			}).keyup(function(e) {
				if (isEnterPressed(e))
				{
					checkCartDetailsField(this);
				}
			});

			$('#billing-country').change(function() {
				OnCountryChange(this);
			});

			initBillingContactPhones();

			$('#billing-new-password-help').bind('mouseenter', function(event) {
				showDiscount("new-pass-question");
			}).bind('mousemove', function(event) {
					moveDiscount(event,'300px');
				}).bind('mouseout', function() {
					hideDiscount();
				});

			$('#create_acc-help').bind('mouseenter', function(event) {
				showDiscount("create-acc-question");
			}).bind('mousemove', function(event) {
					moveDiscount(event,'300px');
				}).bind('mouseout', function() {
					hideDiscount();
				});

			$('#billing-re-enter-password-help').bind('mouseenter', function(event) {
				showDiscount("re-enter-pass-question");
			}).bind('mousemove', function(event) {
					moveDiscount(event,'300px');
				}).bind('mouseout', function() {
					hideDiscount();
				});

			$('.cart-details-popup').click(function() {
				$.jajax('/jajaxserver.php?app=SystemCart&controller=Popups&action=popup', {
					fun:function(html) {
						$('#ajax-cart-details-popup').html(html).popup('open');
					},
					datatype:'text',
					post:'name=' + $(this).attr('href').substr(1, 3)
				});
				return false;
			});

		}

		/* --- Cart - Step 2 (end) --- */

	}

	/*--- Cart pages functions and events (end) --- */

	/* --- Live demo page (begin) --- */
/*
	if ($('#livedemo').length > 0) {

		function resizeIframe() {
			wdb = document.body.scrollHeight;
			$('#livedemo').height(wdb - 105 + 'px');
			if ($.browser.msie || $.browser.safari || $.browser.chrome || $.browser.opera) {
				bdb = document.body.offsetHeight;
				$('#livedemo').height(bdb - 105 + 'px');
				var removeFromHeight = ($.browser.opera) ? 0 : 103;
				$('.iframeltable:not(.stretched)').height(bdb - removeFromHeight + 'px');
				var addToHeight = ($.browser.opera) ? 0 : 1;
				$('.iframeltable.stretched').height(bdb + addToHeight + 'px');
			}
		}
		resizeIframe();

	}
*/
	/* --- Live demo page (end) --- */

	/* --- Block align -> delivery page (begin) --- */

	if ($('#delivery-page-content').length > 0) {

		function initializeBlocksAligner(wrappers) {
			// jQuery is required
			// ujeen
			function calculateOthers(wrappers) {
				var max_elem_num = wrappers.length-1;
				var max_elem_padding = parseInt(wrappers[max_elem_num].css('padding-top'))+parseInt(wrappers[max_elem_num].css('padding-bottom'));
				for (var i = 0 ; i < wrappers.length-1 ; i++) {
					var temp_var1 = parseInt(wrappers[i].css('padding-top'))+parseInt(wrappers[i].css('padding-bottom'));
					wrappers[i].height(wrappers[max_elem_num].height()-(temp_var1-max_elem_padding));
				}
			}
			function sortFromMax(wrappers) {
				for (var i = 0 ; i < wrappers.length ; i++) {
					var temp_var;
					if (typeof wrappers[i+1] != 'undefined') {
						if (wrappers[i].height() > wrappers[i+1].height()) {
							temp_var = wrappers[i+1];
							wrappers[i+1] = wrappers[i];
							wrappers[i] = temp_var;
						}
					}
				}
				return wrappers;
			}
			if ((wrappers != null) && (typeof wrappers == 'object')) {
				for (var i = 0 ; i < wrappers.length ; i++) {
					wrappers[i] = $(wrappers[i]);
				}
				calculateOthers(sortFromMax(wrappers));
			}
		}

		initializeBlocksAligner($('#purchase-main-details .content-wrapper'));
		initializeBlocksAligner($('#purchase-additional-bonuses .bonuse'));

	}

	/* --- Block align -> delivery page (end) --- */

	/* --- McAfee Banner (begin) --- */

	if ($('#McAfeeBox').length > 0) {

		function ShowMcAfeeBanner(id) {
			if (window.location.href.indexOf ('/delivery.php') == -1) {
				var McAfee_html = '<a target="_blank" href="https://www.mcafeesecure.com/RatingVerify?ref=www.templatemonster.com"><img width="65" height="37" border="0" src="https://images.scanalert.com/meter/www.templatemonster.com/55.gif" alt="McAfee Secure sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee Secure is a Trademark of McAfee, Inc.\'); return false;" /></a>';
			} else {
				var McAfee_html = '<a target="_blank" href="/redirect/?u=aHR0cHM6Ly93d3cubWNhZmVlc2VjdXJlLmNvbS9SYXRpbmdWZXJpZnk/cmVmPXd3dy50ZW1wbGF0ZW1vbnN0ZXIuY29t"><img width="65" height="37" border="0" src="https://images.scanalert.com/meter/www.templatemonster.com/55.gif" alt="McAfee Secure sites help keep you safe from identity theft, credit card fraud, spyware, spam, viruses and online scams" oncontextmenu="alert(\'Copying Prohibited by Law - McAfee Secure is a Trademark of McAfee, Inc.\'); return false;" /></a>';
			}
			var box = document.getElementById(id);
			box.innerHTML = McAfee_html;
		}

		function initializeMcAfeeBanner() {
			if (typeof (McAfeeBannerInitialized) == 'undefined') {
				ShowMcAfeeBanner('McAfeeBox')
				McAfeeBannerInitialized = true;
			}
		}

		initializeMcAfeeBanner();

	}

	/* --- McAfee Banner (end) --- */

});

/* ------------------------------------------ INIT AFTER DOM READY (END) ------------------------------------------ */

function callBannerWithGA(bannerId, bannerFile)
{
	var banner = $('#'+bannerId);
	banner.click(function(e) {
		e.data = bannerFile;
		e.bid = bannerId;
		onclikGAHandler(e);
	});
	banner.mouseup(function(e) {
		e.data = bannerFile;
		e.bid = bannerId;
		onmouseupGAHandler(e);
	});
}

function onclikGAHandler(e) {
	ga_track_banner(e)
}

function onmouseupGAHandler(e) {
	if ( ($.browser.mozilla ||  $.browser.opera) && e.button==1) {
		ga_track_banner(e);
	}
}

function replaceFlashContent(status) {
	if (status) {
		var ifr = $('#iframe' + this.flem);
		ifr.css('display', 'none');
		$('#prv-fl-bl-cust').css('width', ifr.css('width')).css('height', ifr.css('height')).css('display', 'block');
	} else {
		$('#prv-fl-bl-cust').css('display', 'none');
		$('#iframe' + this.flem).css('display', 'block');
	}
}

function showCustomizationPopup(tid, sid) {
	this.flem = sid;
	$('#popup-customization-content-v1').css('display', 'block');
	$('#popup-customization-content-v2').css('display', 'none');
	$('#popup-customization-form').each(function() {
		this.reset();
	});
	var full_name = $('#popup-customization-form input[name="y_name"]:first').parent().parent().find('.popup-customization-form-error:first');
	var email = $('#popup-customization-form input[name="y_mail"]:first').parent().parent().find('.popup-customization-form-error:first');
	var tido = $('#popup-customization-form input[name="t_number"]:first').parent().parent().find('.popup-customization-form-error:first');
	var comment = $('#popup-customization-form textarea[name="y_comments"]:first').parent().parent().find('.popup-customization-form-error:first');
	full_name.css('display', 'none');
	email.css('display', 'none');
	tido.css('display', 'none');
	comment.css('display', 'none');
	lockcustomizationform = false;
	$('#error-customization-server').css('display', 'none');
	$('#popup-customization-content-form input[name="t_number"]:first').val(tid);
	replaceFlashContent(true);
	trackEventCustomization(1);
	$('#popup-customization').popup('open', {scroll:true});
	return false;
}

var lockcustomizationform = false;

function responseCustomizationForm(type, result, event) {
	var full_name = $('#popup-customization-form input[name="y_name"]:first').parent().parent().find('.popup-customization-form-error:first');
	var email = $('#popup-customization-form input[name="y_mail"]:first').parent().parent().find('.popup-customization-form-error:first');
	var tid = $('#popup-customization-form input[name="t_number"]:first').parent().parent().find('.popup-customization-form-error:first');
	var comment = $('#popup-customization-form textarea[name="y_comments"]:first').parent().parent().find('.popup-customization-form-error:first');
	var checkField = '';
	if (false == type) {
		checkField = $(event).attr('name');
	}
	if (('' == checkField) || ('y_name' == checkField)) {
		full_name.css('display', 'none');
	}
	if (('' == checkField) || ('y_mail' == checkField)) {
		email.css('display', 'none');
	}
	if (('' == checkField) || ('t_number' == checkField)) {
		tid.css('display', 'none');
	}
	if (('' == checkField) || ('y_comments' == checkField)) {
		comment.css('display', 'none');
	}
	$('#error-customization-server').css('display', 'none');
	if ('undefined' != typeof result.errors) {
		if ('undefined' != typeof result.errors.full_name) {
			full_name.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.email) {
			email.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.tid) {
			tid.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.comment) {
			comment.css('display', 'block');
		}
		if ('undefined' != typeof result.errors.invalid_request) {
			$('#error-customization-server').css('display', 'block');
		}
	}
	if ('undefined' != typeof result.ok) {
		$('#popup-customization-content-v1').toggle();
		$('#popup-customization-content-v2').toggle();
	}
}

function submitCustomizationForm(type, event) {
	if (lockcustomizationform) {
		return false;
	}
	if (true == type) {
		trackEventCustomization(3);
		lockcustomizationform = true;
		$('#button-customization-form .ajax-loader-c:first').css('display', 'block');
		$('#button-customization-form .regular_button:first').removeClass('primary_action').addClass('disabled_action');
		$.jajax('/jajaxserver.php?app=Customization', {
			fun:function(result) {
				responseCustomizationForm(type, result, event);
				$('#button-customization-form .regular_button:first').removeClass('disabled_action').addClass('primary_action');
				$('#button-customization-form .ajax-loader-c:first').css('display', 'none');
				if ('undefined' != typeof result.ok) {
					lockcustomizationform = true;
				} else {
					lockcustomizationform = false;
				}
			},
			formid:'popup-customization-form'
		});
	} else {
		var result = {
			errors:{}
		};
		var full_name = $('#popup-customization-form input[name="y_name"]:first');
		var email = $('#popup-customization-form input[name="y_mail"]:first');
		var tid = $('#popup-customization-form input[name="t_number"]:first');
		var comment = $('#popup-customization-form textarea[name="y_comments"]:first');
		var field = $(event).attr('name');
		if (('y_name' == field) && ('' == full_name.val())) {
			result.errors.full_name = true;
		}
		if (('y_mail' == field) && ('' == email.val())) {
			result.errors.email = true;
		}
		if (('t_number' == field) && (('' == tid.val()) || (0 >= tid.val()))) {
			result.errors.tid = true;
		}
		if (('y_comments' == field) && ('' == comment.val())) {
			result.errors.comment = true;
		}
		responseCustomizationForm(0, result, event);
	}
}

var offerTracker = [];
function init_cart_offer_tracker() {
	initDelFullPrice();
}

$(document).ready(function() {
	$('#popup-customization-header-fon a:first').click(function() {
		replaceFlashContent(false);
		trackEventCustomization(2);
		$('#popup-customization').popup('close');
		return false;
	});
	$('#popup-customization-form').submit(function() {
		return false;
	});
	$('#button-customization-form a:first').click(function() {
		submitCustomizationForm(true, this);
	});
	$('#popup-customization-form input').keypress(function(e) {
		if (isEnterPressed(e)) {
			submitCustomizationForm(true, this);
		}
	});
	$.countryState('#billing-country', '#billing-state');
	$.countryState('#i5', '#i7');
	$.countryState('#country', '#state');	$('#profile-tabs').uitabs();
	init_cart_offer_tracker();
});

$(document).ready(function() {
	if (1 == $('#delivery-page-content').length)
	{
		var deliveryBonusesTracker = [];
		function init_delivery_bonuses_tracker() {
			$(document).scrollEvent({
				'eclass':'.delivery_bonus',
				'fun':function(id, is_visible, position) {
					var idinfo = id.split('_');
					if ((is_visible) && (-1 == $.inArray(idinfo[1] + '_' + idinfo[2], deliveryBonusesTracker))) {
						deliveryBonusesTracker.push(idinfo[1] + '_' + idinfo[2]);
						eval($.base64Decode(idinfo[3]));
					}
				},
				'autostart':true
			});
		}
		init_delivery_bonuses_tracker();
	}
});

function close_fb_popup(clear) {
	$('#popup_facebook_comment').popup('close');
	if (clear) {
		fb_popup_cancel = true;
		$('#popup_facebook_comment_text').val('');
	} else {
		fb_popup_cancel = false;
	}
	return false;
}

/* HC Tree */
function toggleTreeHC(expandableElement, hcId, ttId, isAjax) {
	if (!jQuery.isPlainObject(__hcTree))
		return false;
	var pCat = __hcTree[hcId];
	if (!jQuery.isPlainObject(pCat) || (pCat['children'].length == 0)/* || ( !jQuery.isPlainObject(pCat['children'])) || (jQuery.isEmptyObject(pCat['children']))*/)
		return false;
	var listElement = $(expandableElement).closest('li');
	var innerElement = listElement.find('ul:first');
	if (innerElement.length < 1)
		return false;
	if (innerElement.html() != '') {
		if (innerElement.is(':visible'))
			collapseHC(listElement);
		else
			expandHC(listElement);
		return false;
	}
	var ch = pCat['children'];
	var q = '';
	if (isAjax)
	{
		var link = $(expandableElement).siblings('span').find('a').attr('href');
		var qPos = link.lastIndexOf('?');
		if (-1 != qPos)
			q = link.substring(link.lastIndexOf('?')+1);
		if ('' != q)
		{
			jQuery.jajax('/jajaxserver.php?app=Categories&controller=Tree&action=expand', {
				post: 'hcId=' + hcId+'&'+q+((ttId > 0) ? '&type='+ttId : ''),
				fun:function (result)
				{
					if ('undefined' == typeof result.error) {
						ch = result.ids;
					}
					fillHc(ch, innerElement, listElement, ttId, q);
				}
			});
			return false;
		}
	}
	fillHc(ch, innerElement, listElement, ttId, q);
	return false;
}
function fillHc(Hchildren, innerElement, listElement, ttId, q)
{
//    if (( !jQuery.isPlainObject(Hchildren)) || (jQuery.isEmptyObject(Hchildren)))
//        return false;
	if (Hchildren.length == 0)
	return false;
	var innerHtml = '';
	for (var cId in Hchildren) {
//	for (var i = 0; i < Hchildren.length; i++) {
//		var cat = __hcTree[Hchildren[i]];
		var cat = __hcTree[cId];
		if (!jQuery.isPlainObject(cat))
			continue;
//        var isExpandable = !jQuery.isEmptyObject(cat['children']);
		var isExpandable = cat['children'].length > 0;
		var isAjax = ('' != q);
		var url = cat['url'];
		innerHtml += '<li>'
			+(isExpandable ? '<div onClick="toggleTreeHC(this, '+cat['id']+','+ttId+','+isAjax+');"></div>' : '')
			+'<span><a href="'+url+(isAjax ? ((-1 == url.indexOf('?') ? '?' : '&')+q) : '')+'">'+cat['category']+'</a></span>'
			+(isExpandable ? '<ul></ul>' : '')
			+'</li>';
	}
	innerElement.html(innerHtml);
	expandHC(listElement);
	return true;
}
function expandHC(element) {
	element.removeClass('expandable').addClass('collapsable');
	element.find('div:first');
	element.siblings('.collapsable').each(function(index) {
		collapseHC($(this));
	});
}
function collapseHC(element) {
	element.removeClass('collapsable');
	element.find('div:first');
}
/* HC Tree */

$(function(){

if (typeof $.ui != 'undefined') {
	$.widget("my.banner_slider_system", {

		// These options will be used as defaults
		options: {
			bssId: '',
			width: null,
			height: null,
			align: null,
			valign: null,
			titleSize: null,
			titleTop: null,
			animationOpenDirection: null,
			animationCloseDirection: null,
			animationOpenSpeed: 'slow',
			animationCloseSpeed: 'slow',
			animationOpenEffect: 'slide',
			animationCloseEffect: 'slide',
			persistent: false,
			minimizePanelAlwaysOnTop: false,
			minimizePanel: null,
			closeHandler: null,
			autoOpenPrevent: null,
			autoOpenTimeout: null,
			autoCloseTimeout: null,
			autoCloseAfterManualTimeout: null,
			cookieTTL: null,
			cookieName: 'bssitc',
			cookieVal: '[]',
			onOpen: null,
			onClose: null,
			onSubmit: null
		},

		_wasManuallyOpened: false,

		_autoCloseTimeoutHandler: null,

		// Set up the widget
		_create: function() {
				var self = this;
				this.isFistCall = 1;
				if (!($("div").is("#invite"))) { /* don't init for pages which include bss_template_04*/
					this._initStyles();
				}
				if (null !== this.options.closeHandler){
				$(this.options.closeHandler).click(function(){
					self.hide();
					return false;
				});
			}
			if(this.options.persistent && this.options.minimizePanel !== null){
				$(this.options.minimizePanel).click(function(){
					if( self._isVisible() ){
						self.hide();
					}else{
						self._wasManuallyOpened = true;
						self.show();
					}
					return false;
				});
			}
			if(null !== this.options.animationOpenDirection){
				if(!this.options.autoOpenTimeout){
					this.show(true, true);
				}else{
					this.hide(true, true);
					if(!this.options.autoOpenPrevent){
						this._openedManually = window.setTimeout(function(){
							self.show(true);
						}, this.options.autoOpenTimeout);
					}
				}
			}
			if(this.options.autoCloseTimeout || this.options.autoCloseTimeout2){
				var callback = function(){ self.preventAutoClose(); };
				$(this.element).bind('click', callback)
					.find('form :input, button')
						.bind('click change keyup', callback);
			}
		},

		_setCookie: function(){
			if(this.options.cookieTTL===null){
				var date = new Date();
				date.setFullYear( date.getFullYear() + 1 );
				this.options.cookieTTL = date.toGMTString();
			}

			var cookieInfo;
			var allCookie = document.cookie.split(";");
			var cookieValue = this.options.cookieVal;
			for (var index in allCookie)
			{
				cookieInfo = allCookie[index].split("=", 2);
				if (this.options.cookieName == $.trim(cookieInfo[0]))
				{
					cookieValue = unescape($.trim(cookieInfo[1]));
					break;
				}
			}

			if ('1' == cookieValue)
			{
				cookieValue = '["' + this.options.bssId + '"]';
			}

			var cookieArr = $.parseJSON(cookieValue);
			cookieArr.push(this.options.bssId);
			cookieArr = $.unique(cookieArr);
			cookieValue = $.toJSON(cookieArr);
			document.cookie = this.options.cookieName+'='+escape(cookieValue)
					+ "; expires="+this.options.cookieTTL+'; path=/';

		},

		_initStyles: function(){
			Cufon.replace(this.element.find('.gui-bss-template-01 h2'), {fontFamily:'Myriad Pro Regular'});
			//Cufon.replace('#' + this.options.bss_id + ' .gui-bss-template-01 h2', {fontFamily:'Myriad Pro Regular'});
			$('h2:first', this.element).css({
				fontSize: this.options.titleSize + 'px',
				marginTop: this.options.titleTop + 'px'
			});
			if (null != this.options.closeHandler) {
				$(this.options.closeHandler).hover(function() {
					$(this).addClass('ui-state-hover');
				}, function() {
					$(this).removeClass('ui-state-hover');
				});
			}
			if(null !== this.options.animationOpenDirection) {
				var css = {
					width: this.options.width + 'px',
					height: this.options.height + 'px'
				};
				if ('left' == this.options.align) {
					css.left = 0;
				} else {
					css.right = 0;
				}
				if ('top' == this.options.valign) {
                                       css.top = 0;
                               } else {
                                       css.bottom = 0;
                               }
			}
			this.element.css(css);
			if (null != this.options.closeHandler) {
				$('.gui-bss-iframe-banner', this.element).css({
					width: this.options.width + 'px',
					height: this.options.height + 'px'
				});
				if ($.browser.msie && $.browser.version == 7) {
					this._setPositionBSS(this.options.valign);
					$(window).scroll(function() {
						this._setPositionBSS(this.options.valign)
					});
				}
			}
		},

		_setPositionBSS: function (valign) {
			var oy = $(window).scrollTop();
			var css = {
				position:'absolute'
			};
			if ('top' == valign) {
				css.top = oy;
			} else {
				css.bottom = -oy;
			}
			this.element.css(css);
		},

		_showElement: function(element){
			var show_params = {};
			var animation_effect = null;
			var animation_speen = null;
			if(this.options.animationOpenDirection){
				show_params.direction = this.options.animationOpenDirection;
				animation_effect = this.options.animationOpenEffect;
				animation_speen = this.options.animationOpenSpeed;
			}
			if ('object' == typeof element)
			{
				$(element).show(animation_effect, show_params, animation_speen);
			}
			else
			{
				$(element).css('display', 'block');
			}
		},

		_hideElement: function(element){
			var hide_params = {};
			if(this.options.animationCloseDirection != null){
				hide_params.direction = this.options.animationCloseDirection;
			}
			if (this.isFistCall == 1) {
				this.isFistCall = 0;
			} else {
				$(element).hide(this.options.animationOpenEffect, hide_params, this.options.animationCloseSpeed);
			}
		},

		_bssTrigger: function(type, event, data){
			if(typeof data == 'undefined'){
				data = {};
			}
			data.wasManuallyOpened = this._wasManuallyOpened;
			if( $.isFunction(this['_'+type]) ){
				this['_'+type]( type, event, data );
			}
			return this._trigger(type, event, data)
		},

		_onSubmit: function(){
			this._setCookie();
		},

		_isVisible: function(){
			return $(this.element).is(':visible');
		},

		show: function(is_autoopen, ignore_trigger){
			clearTimeout(this._openedManually);
			clearInterval(this._autoCloseTimeoutHandler);
			if(typeof is_autoopen    == 'undefined') is_autoopen    = false;
			if(typeof ignore_trigger == 'undefined') ignore_trigger = false;
			var self = this;
			if( !ignore_trigger && $.isFunction(this.options.onOpen) ){
				this._bssTrigger('onOpen', null, {is_autoopen: is_autoopen});
			}
			if(this.options.persistent && this.options.minimizePanel != null && !this.options.minimizePanelAlwaysOnTop){
				this._hideElement(this.options.minimizePanel);
			}
			this._showElement(this.element);
			this.preventAutoClose();
			var timeout = !self._wasManuallyOpened
				? this.options.autoCloseTimeout
				: this.options.autoCloseAfterManualTimeout ;
			if(null !== timeout){
				this._autoCloseTimeoutHandler = window.setTimeout(function(dialog){
					self.hide(true);
				}, timeout);
			}
		},

		hide: function(is_autoclose, ignore_trigger){
			clearTimeout(this._openedManually);
			clearInterval(this._autoCloseTimeoutHandler);
			if(typeof is_autoclose   == 'undefined') is_autoclose   = false;
			if(typeof ignore_trigger == 'undefined') ignore_trigger = false;
			if( !ignore_trigger ){
				this._setCookie();
				if( $.isFunction(this.options.onClose) ){
					this._bssTrigger('onClose', null, {isAutoclose: is_autoclose})
				}
			}
			this._hideElement(this.element);
			if(this.options.persistent && this.options.minimizePanel != null){
				this._showElement(this.options.minimizePanel);
				this.options.persistent = false;
			}
		},

		preventAutoClose: function(){
			if(this._autoCloseTimeoutHandler){
				// prevent closing of by the old time-out
				clearTimeout(this._autoCloseTimeoutHandler);
				this._autoCloseTimeoutHandler = null;
			}
		},

		triggerEvent: function(type){
			this._bssTrigger(type);
		}
	});
}

})

function initBSS(bss_id, width, height, align, valign, titleSize, titleTop, animationOpenDirection, animationCloseDirection) {
	$("#"+bss_id).banner_slider_system({
		bssId: bss_id,
		width: width,
		height: height,
		align: align,
		valign: valign,
		titleSize: titleSize,
		titleTop: titleTop,
		animationOpenDirection: animationOpenDirection,
		animationCloseDirection: animationCloseDirection,
		closeHandler: '#' + bss_id + ' a.close:first'
	});
	return false;
}

function billingDetailsProceedError()
{
	$('#billing-email-alert').html('<div class="border_left"><strong>Invalid e-mail</strong><div class="clear"></div></div>');
}

function billingDetailsShowForm()
{
	var emailProceed = $('#new-customer-email');
	$('#billing-email').val(emailProceed.val());
	emailProceed.val('');
	$('#billing-details-new-customer-email').addClass('field_none');
	/*
	$('#billing-state, #billing-fullname, #billing-address, #billing-city, #billing-postalcode, #billing-rphone, #billing-phone, #new-password, #reenter-password').val('').removeClass('required-field');
	$('#billing-country').val($('#billing-country').attr('default_value'));
	$('#billing-email-alert, #billing-fullname-alert, #billing-address-alert, #billing-city-alert, #billing-country-alert, #billing-state-alert, #billing-postalcode-alert, #billing-rphone-alert, #billing-phone-alert, #new-password-alert, #account-reenter-password-alert').html('');
	 */
	$('#account-email-step-1-block, #billing-details-form').removeClass('field_none');
	$('#billing-fullname').focus();
}

function billingDetailsShowWAC(email)
{
	$('#email_register').html(email);
	billingDetailsSetWACLogin(email);
	$('#new-customer, #billing-details-new-customer-email').addClass('field_none');
	$('#customer-is-already-registered, #account-email-step-1-block').removeClass('field_none');
		setChatUrlEmail(email);
}

function billingDetailsShowProceedForm()
{
	billingDetailsSetWACLogin('');
	$('#billing-email-alert').html('');
	$('#account-email-step-1-block, #billing-details-form, #customer-is-already-registered').addClass('field_none');
	$('#new-customer, #billing-details-new-customer-email').removeClass('field_none');
	$('#new-customer-email').val('').focus();
	$('#billing-email').val('');
}

function billingDetailsEmailProceed(obj)
{
	$(obj).blur();
	var email = $.trim($('#new-customer-email').val());
	$.jajax('/jajaxserver.php?app=SystemCart&controller=CheckFormDetails&action=checkUserWAC', {
		fun:function(response) {
			if (false == response.status)
			{
				billingDetailsProceedError();
			}
			else
			{
				if (true == response.is_wac)
				{
					billingDetailsShowWAC(email);
				}
				else
				{
					billingDetailsShowForm();
				}
			}
		},
		post:'email=' + email + '&' + page_meta.session_name + '=' + page_meta.session_ID
	});
}

function billingDetailsSetWACLogin(login)
{
	$('#wac_login_form').attr('src', $('#wac_login_form').attr('tmpsrc') + '&login=' + login + ('' != login ? '' : '&focus=off'));
}

$(document).ready(function()
{
	if ($('body').hasClass('second-step'))
	{
		$('#new-customer-email').focus();
		$('#form').submit(function()
		{
			return false;
		});
		$('#billing-country').attr('default_value', $('#billing-country').val());
		$('#new-customer-email-proceed').click(function()
		{
			billingDetailsEmailProceed(this);
			return false;
		});
		$('#new-customer-email').keyup(function(e)
		{
			if (isEnterPressed(e))
			{
				billingDetailsEmailProceed(this);
				return false;
			}
		});
		$('#account-email-step-1-block').click(function() {
                    $('#merchant-system-page .primary_action').each(function() {
                        $(this).data('oldOnClick', $(this).attr('onclick')).attr('onclick', 'return false').addClass("btn-checkout");
                    });
			billingDetailsShowProceedForm();
			return false;
		});
	};
});

/* PCBD */

$(document).ready(function()
{
	if ($('body').hasClass('second-step'))
	{
		(function($)
		{
			var methods = {
				check:function()
				{
					var status = true;
					var check = $(this).data('check');
					var value = $.trim($(this).val());
					$(this).val(value);
					if ('' == value)
					{
						$(this).removeClass('required-field');
						$(check.alert_id).html('');
						return true;
					}
					for (var keyCheck in check.check)
					{
						if ('function' == typeof methods[keyCheck])
						{
							if (true != methods[keyCheck].apply(this, [check.check[keyCheck]]))
							{
								status = false;
							}
						}
						else
						{
							status = false;
						}
					}
					if (true == status)
					{
						$(this).removeClass('required-field');
						$(check.alert_id).html('<span class="all_right"></span>');
					}
					else
					{
						$(this).addClass('required-field');
						$(check.alert_id).html('<div class="border_left"><strong>' + check.error + '</strong><div class="clear"></div></div>');
					}
					return status;
				},
				isEnterPressed:function(e)
				{
					var keycode;
					if (window.event)
					{
						keycode = window.event.keyCode;
					}
					else if (e)
					{
						keycode = e.which;
					}
					else
					{
						return false;
					}
					return (13 == keycode);
				},
				minLen:function(len)
				{
					if (len <= $(this).val().length)
					{
						return true;
					}
					return false;
				},
				minWord:function(count)
				{
					if (true == methods.minLen.apply(this, [1]))
					{
						if (count <= $(this).val().split(/ +/).length)
						{
							return true;
						}
					}
					return false;
				},
				notRegular:function(regular)
				{
					if ($(this).val().match(regular))
					{
						return false;
					}
					return true;
				},
				notValue:function(values)
				{
					if (-1 != $.inArray($(this).val(), values))
					{
						return false;
					}
					return true;
				},
				checkFunction:function(fun)
				{
					return fun();
				},
				minNumberLen:function(len)
				{
					var numbers = $(this).val().replace(/[^0-9]+/g, '');
					$(this).val(numbers);
					if (len <= numbers.length)
					{
						return true;
					}
					return false;
				}
			};
			$.fn.checkBillingDetails = function()
			{
				var thisObj = $(this);
				var settings = {
					'fullName':{
						'id':'#billing-fullname',
						'alert_id':'#billing-name-alert',
						'check':{
							'minLen':3,
							'minWord':2
						},
						'error':'Please specify your full name.'
					},
					'billingAddress':{
						'id':'#billing-address',
						'alert_id':'#billing-address-alert',
						'check':{
							'minLen':2
						},
						'error':'Please specify a valid billing address.'
					},
					'city':{
						'id':'#billing-city',
						'alert_id':'#billing-city-alert',
						'check':{
							'minLen':3,
							'notRegular':/^[0-9\-\ ]+$/
						},
						'error':'Please specify a valid city.'
					},
					'country':{
						'id':'#billing-country',
						'alert_id':'#billing-country-alert',
						'check':{
							'minLen':1
						},
						'error':'Please select a country.'
					},
					'state':{
						'id':'#stateFiled',
						'alert_id':'#billing-state-alert',
						'check':{
							'notValue':["", "select_state"],
							'checkFunction':function()
							{
								if (-1 != $.inArray($('#billing-country').val(), ["UNITED STATES", "CANADA"]))
								{
									if ('Outside U.S./Canada' == $('#stateFiled').val())
									{
										return false;
									}
								}
								return true;
							}
						},
						'error':'Please select a state.'
					},
					'postalCode':{
						'id':'#billing-postalcode',
						'alert_id':'#billing-code-alert',
						'check':{
							'minLen':1
						},
						'error':'Please specify a valid postal code.'
					},
					'contactPhone':{
						'id':'#billing-rphone',
						'alert_id':'#billing-rphone-alert',
						'check':{
							'minNumberLen':5
						},
						'error':'Please specify your reachable phone number.'
					},
					'billingPhone':{
						'id':'#billing-phone',
						'alert_id':'#billing-phone-alert',
						'check':{
							'minNumberLen':5
						},
						'error':'Please specify your phone number.'
					},
					'wacPassword':{
						'id':'#new-password',
						'alert_id':'#account-new-password-alert',
						'check':{
							'minLen':6
						},
						'error':'Password should be minimum 6 symbols in length.'
					},
					'wacRePassword':{
						'id':'#reenter-password',
						'alert_id':'#account-reenter-password-alert',
						'check':{
							'minLen':6,
							'checkFunction':function()
							{
								if ($('#new-password').val() == $('#reenter-password').val())
								{
									return true;
								}
								return false;
							}
						},
						'error':'Passwords do not match.'
					}
				};
				for (var skey in settings)
				{
					var elObj = $(settings[skey].id, thisObj);
					if (1 != elObj.length)
					{
						continue;
					}
					elObj.data('check', settings[skey]).bind('blur', (function() {
						methods['check'].apply(this);
					})).bind('keyup', (function(e) {
						if (methods['isEnterPressed'].apply(this, [e]))
						{
							methods['check'].apply(this);
						}
					}));
				}
				return thisObj;
			};
		})(jQuery);
		$('#form').checkBillingDetails();
	}
});

$(document).ready(function(){
	var $lsd = $('#lsd-container ul'),
		hide = function(e) {
			$lsd.stop().animate({
				height: 22
			}).removeClass('lsd-active');
	};
	$lsd.click(function(e){
		if ($(this).hasClass('lsd-active')) {
				hide($lsd);
			} else {
				$lsd.stop().animate({
					height: 78
				}).addClass('lsd-active');
			}
		});
	$(document).bind('click', function(e) {
		var $parents = $(e.target).parents();
			if (!$parents.hasClass("lsd-dropdown")) {
			hide($lsd);
		}
			});
	});

$(document).ready(function()
{
	if (1 == $('#newsletter-block').length)
	{
		(function($)
		{
			var methods = {
				isEnterPressed:function(e)
				{
					var keycode;
					if (window.event)
					{
						keycode = window.event.keyCode;
					}
					else if (e)
					{
						keycode = e.which;
					}
					else
					{
						return false;
					}
					return (13 == keycode);
				},
				sendNewsletterSubscribe:function(icon)
				{
					$.jajax('/jajaxserver.php?app=Newsletter&action=subscription', {
						fun:$.jajaxparse,
						formid:'newsletterSubscriptionForm' + (true == icon ? ', post:\'icon=true\'' : '')
					});
				},
				check:function(inputs, icon)
				{
					var error = false;
					inputs.each(function() {
						var value = $.trim($(this).val());
						$(this).val(value);
						if ('' == value)
						{
							error = true;
						}
					});
					if (true == error)
					{
						$('#errorBox').html('Make sure you have completed all of the required fields');
					}
					else
					{
						methods['sendNewsletterSubscribe'].apply(this, [icon]);
					}
				}
			};
			$.fn.newsletterSubscribe = function()
			{
				var cField;
				var thisObj = $(this);
				var inputs = $('input', thisObj);
				var icon = ('true' == thisObj.attr('icon') ? true : false);
				inputs.bind('keydown', function(e)
				{
					cField = $.trim($(this).val());
				}).bind('keyup', (function(e)
				{
					if (
						(methods['isEnterPressed'].apply(this, [e])) &&
						(cField == $.trim($(this).val()))
					)
					{
						methods['check'].apply(this, [inputs, icon]);
					}
				}));
				$('.submit', thisObj).bind('click', function() {
					methods['check'].apply(this, [inputs, icon]);
					return false;
				});
				return thisObj;
			};
		})(jQuery);
		$('#newsletter-block').newsletterSubscribe();
	}
		$('.badge-responsive a, .badge-cherry a').append('<div class="ribbon_image"></div>');
});



function setChatUrlEmail(email)
	{
	var chatLink = $('#account-email-gen-chat');
	chatLink.attr('href', chatLink.attr('original_href') + '&email=' + email);
	}

$(document).ready(function() {
	if (
		(1 == $('#shopping-cart-2').length) ||
		(1 == $('#preview_page_offers').length) ||
		(1 == $('#delivery_page').length)

	)
	{
		$(document).click(function(event) {

			if (0 == $(event.target).parents('.checklist-widget-bundle-prices').length)
			{
				var list1 = $('.checklist-options', $(this));
				list1.hide();
			}
		});
		$('.checklist-widget-bundle-prices').live('click', function() {
			var list = $('.checklist-options:first', $(this));
			list.toggle();
		});
		$('.checklist-widget-bundle-prices ul li').live('mouseout', function() {
			$(this).removeClass('bundle-select-line-menu');
		}).live('mouseenter', function() {
			$(this).addClass('bundle-select-line-menu');
		}).live('click', function() {
			var selectValue = $(this).parents('.checklist-widget').find('.checklist-select-value:first');
			selectValue.html($(this).html());
			var del = selectValue.find('del:first');
			if (1 == del.length)
			{
				if (
					(1 == $('#shopping-cart-2').length) ||
					(1 == $('#delivery_page').length)
				)
				{
					del.data('id', $(this).find('del:first').data('id'));
				}
				else
				{
					del.data('title', $(this).find('del:first').data('title'));
					initOfferPopupDiscount(del);
				}
			}
			var des = $(this).attr('description');
			$(this).parents('.checklist-widget').find('input:first').val($(this).attr('val'));
			$(this).parents('.checklist-widget').next().html(des);
			if (
					(true == $(this).parents('.preview_page_offers').find('input:first').prop('checked')) ||
					(true == $(this).parents('.preview_page_offers_oncart').find('input:first').prop('checked'))
			)
			{
				$(this).parents('li').find('input:first').click().click();
			}
			var list1 = $(this).parents('.checklist-widget').find('.checklist-options');
			list1.hide();
			return false;
		});
	}
});

function initDelFullPrice()
{
	$('.fullPrice').each(function() {
		var element = $(this);
		if ('undefined' != typeof element.attr('title'))
		{
			element.data('id', element.attr('title')).removeAttr('title');
		}
	});
}

function initOfferPopupDiscount(obj)
{
	obj.hover(function() {
	showPreviewOfferDiscountPopup($(this).data('title'));
	},function() {
		hideDiscount();
	}).mousemove(function(event) {
		moveDiscount(event,'auto');
	});
}
$(document).ready(function() {

	if (
		(1 == $('#delivery_page').length)
	)
	{
		$('#gui-delivery-tabs').tabs();
		function refreshCartInfo()
		{
			var count = 0;
			var fullprice = 0;
			var finalprice = 0;
			$('#gui-delivery-cart-info>div').each(function() {
				count++;
				fullprice += parseInt($('.gui-delivery-offer-fullprice:first', $(this)).html());
				finalprice += parseInt($('.gui-delivery-offer-finalprice:first', $(this)).html());
			});
			$('#gui-delivery-cart-total-count').html(count);
			$('#gui-delivery-cart-total-fullprice').html(fullprice);
			$('#gui-delivery-cart-total-discount').html(fullprice - finalprice);
			$('#gui-delivery-cart-total-finalprice').html(finalprice);
			$("#cart_products").html('('+ count+")");
			if(count == 0) {
				$(".added_offers").hide();
				$(".order-details").removeClass("long_width").find(".content-wrapper").show();
				$(".banner-chat").show();
				$(".block_shop_cart").hide();
				$(window).scroll(function() {
					$(".block_shop_cart").hide();
				});
			}
			else {
				$(".added_offers").show();
				$(".banner-chat").hide();
				$(".order-details").addClass("long_width").find(".content-wrapper").hide();
				$(window).scroll(function() {
			        $(".block_shop_cart").css({top: $(window).height()/2-56});
			        if($(window).scrollTop() > 200) {
			        	if(count != 0) {
			                $(".block_shop_cart").show();
			            }
			        }
			        else {
			                $(".block_shop_cart").hide();
			        }
				});
			}
			$('.gui-delivery-cart-on-cart').each(function() {
				$('.gui-delivery-offer:visible', $(this)).css('borderTop', 'none');
				$('.gui-delivery-offer:visible:first', $(this)).css('borderTop', '1px solid #AFD9F2');
			});
		}
		$('#gui-delivery-cart-submit').click(function() {
			$(this).parents('form').submit();
			return false;
		});

		$('.gui-delivery-cart-info-button-remove').live('click', function() {
			var offerBlock = $(this).parents('.gui-delivery-offer-cart');
			$('#gui-delivery-tabs .gui-delivery-offer #add-to-cart-'+offerBlock.attr('originaltid')+'-'+offerBlock.attr('oid'))
				.closest ('div.gui-delivery-offer')
				.each (function (index, element) {
					var el = $(element);
					if (typeof (on_remove_from_cart) === 'function') {
						on_remove_from_cart (el.attr ('internal'), el.attr ('presentationid'), el.attr ('positionid'));
					}
			});
                        if($(this).closest(".gui-delivery-offer-cart").attr("type") == "onTemplate") {
                            $('.cart-ontemplate-'+$(this).closest('.gui-delivery-offer-cart').attr('tid')+'-offer-'+$(this).closest('.gui-delivery-offer-cart').attr('oid')).removeClass('hidden');
                        } else {
                           $('.cart-oncart-offer-'+$(this).closest('.gui-delivery-offer-cart').attr('oid')).removeClass('hidden');
                        }
                        offerBlock.remove();
			refreshCartInfo();
                        countOffers();
			return false;
		});

		$('.gui-delivery-offer a.gui-offer-add-button').live('click', function() {
			var offerBlock = $(this).parents('.gui-delivery-offer');
			var offerItem = $($('#gui-delivery-cart-info-item').html());
			var tid = ('onCart' == offerBlock.attr('type') ? 0 : offerBlock.attr('tid'));
			var tidTitle = '';
                        var type = $(this).closest(".gui-delivery-offer").attr("type");
			if (0 != tid)
			{
				tidTitle += ' - #' + tid;
			}
			$('.gui-delivery-offer-title:first', offerItem).html($('.gui-delivery-offer-title:first', offerBlock).html() + tidTitle);
			var cv = $('.gui-delivery-offer-price:first .checklist-select-value:first', offerBlock);
			if (0 == cv.length)
			{
				var priceBlock = $('.gui-delivery-offer-price:first', offerBlock);
				$('.gui-delivery-offer-price:first', offerItem).html(priceBlock.html());
				var title = $('del:first', priceBlock).data('id');
			}
			else
			{
				$('.gui-delivery-offer-price:first', offerItem).html(cv.html());
				var title = $('del:first', cv).data('id');
			}
			$('del:first', offerItem).data('id', title);
			$('input', offerBlock).each(function() {
				offerItem.append($(this).clone());
			});
			var oid = offerBlock.attr('oid');
			offerItem.attr({
				tid:tid,
				originaltid:offerBlock.attr('tid'),
				oid:oid,
                                type: type
			});
			$('#gui-delivery-cart-info').append(offerItem);
			//var originalTID = offerBlock.attr('tid');
                        if($(this).closest(".gui-delivery-offer").attr("type") == "onTemplate") {
                            $('.cart-ontemplate-'+$(this).closest('.gui-delivery-offer').attr('tid')+'-offer-'+$(this).closest('.gui-delivery-offer').attr('oid')).addClass('hidden');
                        } else {
                           $('.cart-oncart-offer-'+$(this).closest('.gui-delivery-offer').attr('oid')).addClass('hidden');
                        }
                        refreshCartInfo();
                        countOffers();
			return false;
		});

		initDelFullPrice();
		$('del.fullPrice').live('mouseenter', function() {
			showDiscount($(this).data('id'));
		}).live('mousemove', function(event) {
			moveDiscount(event,'auto');
		}).live('mouseout', function() {
			hideDiscount();
		});

	}

});

$(document).ready(function(){
	function addClassToBody()
	{
		if($.browser.msie && $.browser.version == '6.0') {
			$("body").addClass("isIE6");
		}
		if($.browser.msie && $.browser.version == '7.0') {
			$("body").addClass("isIE");
		}
		if($.browser.msie && $.browser.version == '8.0') {
			$("body").addClass("isIE8");
		}
		if($.browser.msie && $.browser.version >= '9.0') {
			$("body").addClass("gteIE9");
		}
		else {}
	}
	addClassToBody();
        $("#more_one_template .download_link").click(function() {
            $("iframe.to_download").remove();
            $(".template_info .box .secondary_action").each(function() {

                var href = $(this).attr("href");

                    var t = $('<iframe class="to_download" src="' + href + '"></iframe>');
                    $('body').append(t);

            })
            return false;
        });
});
function addClassToOffer() {
    $(".gui-delivery-offer").each(function() {
        if($(this).attr("type") == "onTemplate") {
            $(this).addClass('cart-ontemplate-'+$(this).attr("tid")+'-offer-'+$(this).attr("oid"));
        } else {
            $(this).addClass('cart-oncart-offer-'+$(this).attr("oid"));
        }
    });
}
function countOffers() {
    $(".template_info").each(function() {
        var visible_template_oferrs = $(this).find(".gui-delivery-cart-on-template").find(".gui-delivery-offer").length-$(this).find(".gui-delivery-cart-on-template").find(".gui-delivery-offer.hidden").length;
        var visible_cart_oferrs = $(this).find(".gui-delivery-cart-on-cart").find(".gui-delivery-offer").length-$(this).find(".gui-delivery-cart-on-cart").find(".gui-delivery-offer.hidden").length;
        var str = $(this).attr("id");
        var position = str.indexOf("-")+1;
        var number_template = str.substr(position, str.length);
        $('#gui-delivery-ontemplate-offer-title-' + number_template).css('display', (0 == visible_template_oferrs ? 'none' : 'block'));
        $('#gui-delivery-oncart-offer-title-' + number_template).css('display', (0 == visible_cart_oferrs ? 'none' : 'block'));
        $("#tabs-" + number_template).find(".text").css('display', (visible_template_oferrs == 0 && visible_cart_oferrs ==0 ? 'none' : 'block'));
        $("#tabs-" + number_template).find(".gui-delivery-cart-on-cart").find(".gui-delivery-offer").css('borderTop', 'none');
        $("#tabs-" + number_template).find(".gui-delivery-cart-on-cart").find(".gui-delivery-offer").not(".hidden").eq(0).css('borderTop', '1px solid #AFD9F2');
    });
}
var flagDeliveryOpenOffer = false;

function change_height(obj)
{
    if (true == flagDeliveryOpenOffer)
    {
        return false;
    }
    flagDeliveryOpenOffer = true;
    var block = obj.closest("div").find(".content-wrapper1");
    var open = obj.parents('.purch_offer').find('h2.open');
    if (0 == open.length)
    {
        block.slideDown("500", function() {
            obj.addClass('open');
            flagDeliveryOpenOffer = false;
        });
    }
    else
    {
        open.parent().find(".content-wrapper1").slideUp('500', function() {
            if (obj.hasClass('open'))
            {
                open.removeClass('open');
                flagDeliveryOpenOffer = false;
            }
            else
            {
                open.removeClass('open');
                block.slideDown("500", function() {
                    obj.addClass('open');
                    flagDeliveryOpenOffer = false;
                });
            }
        });
    }
}

