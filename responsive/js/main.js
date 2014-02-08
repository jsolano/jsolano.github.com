$(function(){
			// IPad/IPhone
			var viewportmeta = document.querySelector && document.querySelector('meta[name="viewport"]'),
			ua = navigator.userAgent,

			gestureStart = function () {
				viewportmeta.content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
			},

			scaleFix = function () {
				if (viewportmeta && /iPhone|iPad/.test(ua) && !/Opera Mini/.test(ua)) {
				viewportmeta.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
				document.addEventListener("gesturestart", gestureStart, false);
				}
			};
			scaleFix();
			});


//function to fix height of iframe!
			var calcHeight = function() {
			var headerDimensions = $('#mainlivedemo').height();
			var selector = ($('.stretched').length > 0) ? '#iframelive' : '#iframelive iframe';
				$(selector).height($(window).height() - headerDimensions);
			}
			$(document).ready(function() {
			calcHeight();
			});
			$(window).resize(function() {
			calcHeight();
			}).load(function() {
			calcHeight();
			});


$(function(){
				mobileCss = function () {
				if(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Opera Mini/)) {
					$('body').css({'height':'auto'});
					$('html').css({'height':'auto'});
					$('#mainlivedemo').addClass('mobile');
	//                    $('#frameWrapper').addClass('mobile');
	//                    $('#iframelive iframe').addClass('mobile');
				}
				};
				mobileCss();
			});


$(document).ready(function() {
			if(!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Opera Mini/))) {

				var frame = document.getElementById('frame');
                var argURL = window.location.search;
                var defaulURL = 'http://jsolano.org'

                if (argURL) {
                	var targetURL = argURL.substring(argURL.indexOf('=') + 1);
                	$('#site_to_validate').val(targetURL);
                	$('#frame').attr('src',targetURL);
                } else {
                	$('#site_to_validate').val(defaulURL);
                	$('#frame').attr('src',defaulURL);
                }

				$('#iframelive').removeClass().addClass('dynamic_mode');
					$('ul#responsivator').show();

				function widtherator (scrWid) {
					$('ul#responsivator li').removeClass();
					if ( scrWid >= 1280) { $('#desktop').removeClass().addClass('active'); }
					if ( (scrWid >= 1259) && (scrWid <= 1279)) { $('#tablet-landscape').addClass('active'); }
					if ( (scrWid >= 916) && (scrWid <= 1258)) { $('#tablet-portrait').addClass('active'); }
					if ( (scrWid >= 759) && (scrWid <= 915) ) { $('#iphone-landscape').addClass('active'); }
					if ( scrWid <= 758) { $('#iphone-portrait').addClass('active'); }
				}

				widtherator ($(window).width());
				$(window).resize( function () {
					widtherator ($(window).width());
				});

                $('#go_validate').click(function() {
                	var url_to_validate = $('#site_to_validate').val();
                	if (url_to_validate) {
 					  $('#frame').attr('src',url_to_validate);
                	} else {
                		alert('Upps, Please enter a URL !');
                	}
                	
                });

				$('ul#responsivator li').click(function () {
					$('ul#responsivator li').removeClass();
					$(this).addClass('active');
					var device = $(this).attr('id');
					$('#iframelive').removeClass().addClass(device);
					frame.src = frame.src;
					$(window).unbind('resize');

					if (device === 'desktop') {
						$(window).resize( function () {
						if ($(window).width() > 1280) {
							$('#iframelive').removeClass().addClass('dynamic_mode');
							frame.src = frame.src;
							$(window).resize( function () { widtherator ($(window).width()); })
						}
						});
					} else {
						$(window).resize( function () {
						if ( (($(window).width() - $('#frameWrapper').width()) > 50 ) && (($(window).width() - $('#frameWrapper').width()) < 100) ) {
								$('#iframelive').removeClass().addClass('dynamic_mode');
								frame.src = frame.src;
								$(window).resize( function () { widtherator ($(window).width()); })
							}
						});
					}

				});
			}
		});
		
var g_inputsCnt = 0;var g_InputThis = new Array(null, null, null, null);var g_alerted = false;/* we test the input if it includes 4 digits   (input is a part of 4 inputs for filling the credit-card number)*/function is4DigitsCardNumber(val){	var regExp = new RegExp('[0-9]{4}');	return (val.length == 4 && val.search(regExp) == 0);}/* testing the whole credit-card number 19 digits devided by three '-' symbols or   exactly 16 digits without any dividers*/function isCreditCardNumber(val){	if(val.length == 19)	{		var regExp = new RegExp('[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}');		return (val.search(regExp) == 0);	}	else if(val.length == 16)	{		var regExp = new RegExp('[0-9]{4}[0-9]{4}[0-9]{4}[0-9]{4}');		return (val.search(regExp) == 0);	}	return false;}function CheckInputOnCreditNumber(self){	if(g_alerted)		return false;	var value = self.value;	if(self.type == 'text')	{		if(is4DigitsCardNumber(value))		{			var cont = true;			for(i = 0; i < g_inputsCnt; i++)				if(g_InputThis[i] == self)					cont = false;			if(cont && g_inputsCnt < 4)			{				g_InputThis[g_inputsCnt] = self;				g_inputsCnt++;			}		}		g_alerted = (g_inputsCnt == 4);		if(g_alerted)			g_inputsCnt = 0;		else			g_alerted = isCreditCardNumber(value);	}	return g_alerted;}function CheckInputOnPassword(self){	if(g_alerted)		return false;	var value = self.value;	if(self.type == 'password')	{		g_alerted = (value.length > 0);	}	return g_alerted;}function onInputBlur(self, bRatingOk, bFishingSite){	var bCreditNumber = CheckInputOnCreditNumber(self);	var bPassword = CheckInputOnPassword(self);	if((!bRatingOk || bFishingSite == 1) && (bCreditNumber || bPassword) )	{		var warnDiv = document.getElementById("wrcinputdiv");		if(warnDiv)		{			/* show the warning div in the middle of the screen */			warnDiv.style.left = "0px";			warnDiv.style.top = "0px";			warnDiv.style.width = "100%";			warnDiv.style.height = "100%";			document.getElementById("wrc_warn_fs").style.display = 'none';			document.getElementById("wrc_warn_cn").style.display = 'none';			if(bFishingSite)				document.getElementById("wrc_warn_fs").style.display = 'block';			else				document.getElementById("wrc_warn_cn").style.display = 'block';			warnDiv.style.display = 'table';		}	}}
