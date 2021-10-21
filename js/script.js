var classicLayout = false;
(function($) { "use strict"; 
	
	
	/* DOCUMENT LOAD */
	$(function() {

		//FastClick.attach(document.body);
		

		// ------------------------------
			// LAYOUT DETECT
			classicLayout = $('html').attr('data-classic-layout') === 'true';
			classicLayout = classicLayout || ($('html').attr('data-mobile-classic-layout') === 'true' && ($(window).width() < 1025));
			classicLayout = classicLayout || !Modernizr.cssanimations;
			
			if(classicLayout) { // CLASSIC LAYOUT
				$('html').addClass('classic-layout');	
				paginaActivada();
				$.address.change(function() {
					paginaActivada();
					$('html').removeClass('is-menu-toggled-on');
					});
			} else { // MODERN LAYOUT
				$('html').addClass('modern-layout');
				$.address.change(function() {
					paginaActivada();
					$('html').removeClass('is-menu-toggled-on');	
					});
			}
			
			// don't change hash tag if isAnimating
			$('.enlaces .enlacePagina').on("click", function() {
				if( window.isAnimating ) {
					return false;
				}
			});

			$.address.change(function() {
				paginaActivada();
			})
	})




//paginaActivada()

function paginaActivada(){
	let path = $.address.path();
//	console.log(path)
	path = path.slice(1, path.length);

	if (path=="") {
		///console.log('vacio')
		// var irPagina = $('.enlaces li').first().find('a').attr('href');
		// 	path = irPagina.slice(2,irPagina.length);
		// 	console.log(path)
		$('#incio').addClass( 'pt-page-visible' ).siblings().removeClass( 'pt-page-visible' );	
		PageTransitions.nextPage(0);

	}else{
		///console.log('no vacio')
		///console.log(path)

		//  if(!($('.pt-page-visible').length)) { // first load - don't animate page change
		// // 	$('#'+ path).addClass( 'pt-page-visible' );
		// // 	current = $('#'+ path).index();
		//  	setCurrentMenuItem();
		//  } else { 
		// 	console.log('aqui')
		// 	console.log(current)
		// 	///console.log('path index')
		// 	console.log($('#'+ path).index())
		// 	PageTransitions.nextPage( $('#'+ path).index() );
		//  }


		if(classicLayout) {
			$('#'+ path).addClass( 'pt-page-visible' ).siblings().removeClass( 'pt-page-visible' );	
			setCurrentMenuItem();
		} else {
			if(!($('.pt-page-visible').length)) { // first load - don't animate page change
				$('#'+ path).addClass( 'pt-page-visible' );
				current = $('#'+ path).index();
				
				setCurrentMenuItem();
			} else { // animate page change
				//console.log(giveDetailUrl());
				PageTransitions.nextPage( $('#'+ path).index() );
			}	
		}
	}

	
}

function setCurrentMenuItem(){
	var activePageId = $('.pt-page-visible').attr('id');	
	if (activePageId=='inicio') {
		$('.enlaces a').parent().removeClass('active')
		return
	}
	$('.enlaces a[href$=' + activePageId +']').parent().addClass('active').siblings().removeClass('active');
}


// ------------------------------
	// PAGE TRANSITIONS : modern layout
	var current = 0;
	var inClass, outClass;
	window.nextAnimation = $('html').data("next-animation");
	window.prevAnimation = $('html').data("prev-animation");
	window.randomize = $('html').data("random-animation");
	window.isAnimating = false;
	var PageTransitions = (function() {

		var $main = $( '#main' ),
			$pages = $main.children( '.pt-page' ),
			$menuLinks = $('.enlaces a'),
			animcursor = 1,
			endCurrPage = false,
			endNextPage = false,
			animEndEventNames = {
				'WebkitAnimation' : 'webkitAnimationEnd',
				'OAnimation' : 'oAnimationEnd',
				'msAnimation' : 'MSAnimationEnd',
				'animation' : 'animationend'
			},
			// animation end event name
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			// support css animations
			support = Modernizr.cssanimations;
		
		
		// init()
		function init() {
	
			//$pages.each( function() {
				//var $page = $( this );
				//$page.attr('data-org-class-list', $page.attr( 'class' ) );
			//} );
		}
		// end init()
		
		// PAGE CHANGE FN
		function nextPage(nextPageIndex) {
			
			// DO NOTHING : if nextPage is same with the current page
			if(nextPageIndex === current) {
				return; 
				}
			
			var animation = nextPageIndex > current ? nextAnimation : prevAnimation;
			
			// random animation
			if(randomize) {
				if( animcursor > 67 ) {
					animcursor = 1;
				}
				animation = animcursor;
				++animcursor;	
			}
			
			if( window.isAnimating ) {
				return false;
			}
	
			window.isAnimating = true;
			
			var $currPage = $pages.eq( current );
			
			current = nextPageIndex; 

			var $nextPage = $pages.eq( current ).addClass( 'pt-page-visible' );
				
	
			switch( animation ) {
	
				case 1:
					outClass = 'pt-page-moveToLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 2:
					outClass = 'pt-page-moveToRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 3:
					outClass = 'pt-page-moveToTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 4:
					outClass = 'pt-page-moveToBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 5:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 6:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 7:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 8:
					outClass = 'pt-page-fade';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 9:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 10:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 11:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 12:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 13:
					outClass = 'pt-page-moveToLeftEasing pt-page-ontop';
					inClass = 'pt-page-moveFromRight';
					break;
				case 14:
					outClass = 'pt-page-moveToRightEasing pt-page-ontop';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 15:
					outClass = 'pt-page-moveToTopEasing pt-page-ontop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 16:
					outClass = 'pt-page-moveToBottomEasing pt-page-ontop';
					inClass = 'pt-page-moveFromTop';
					break;
				case 17:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromRight pt-page-ontop';
					break;
				case 18:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromLeft pt-page-ontop';
					break;
				case 19:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromBottom pt-page-ontop';
					break;
				case 20:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-moveFromTop pt-page-ontop';
					break;
				case 21:
					outClass = 'pt-page-scaleDown';
					inClass = 'pt-page-scaleUpDown pt-page-delay300';
					break;
				case 22:
					outClass = 'pt-page-scaleDownUp';
					inClass = 'pt-page-scaleUp pt-page-delay300';
					break;
				case 23:
					outClass = 'pt-page-moveToLeft pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 24:
					outClass = 'pt-page-moveToRight pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 25:
					outClass = 'pt-page-moveToTop pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 26:
					outClass = 'pt-page-moveToBottom pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 27:
					outClass = 'pt-page-scaleDownCenter';
					inClass = 'pt-page-scaleUpCenter pt-page-delay400';
					break;
				case 28:
					outClass = 'pt-page-rotateRightSideFirst';
					inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
					break;
				case 29:
					outClass = 'pt-page-rotateLeftSideFirst';
					inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
					break;
				case 30:
					outClass = 'pt-page-rotateTopSideFirst';
					inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
					break;
				case 31:
					outClass = 'pt-page-rotateBottomSideFirst';
					inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
					break;
				case 32:
					outClass = 'pt-page-flipOutRight';
					inClass = 'pt-page-flipInLeft pt-page-delay500';
					break;
				case 33:
					outClass = 'pt-page-flipOutLeft';
					inClass = 'pt-page-flipInRight pt-page-delay500';
					break;
				case 34:
					outClass = 'pt-page-flipOutTop';
					inClass = 'pt-page-flipInBottom pt-page-delay500';
					break;
				case 35:
					outClass = 'pt-page-flipOutBottom';
					inClass = 'pt-page-flipInTop pt-page-delay500';
					break;
				case 36:
					outClass = 'pt-page-rotateFall pt-page-ontop';
					inClass = 'pt-page-scaleUp';
					break;
				case 37:
					outClass = 'pt-page-rotateOutNewspaper';
					inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
					break;
				case 38:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-moveFromRight';
					break;
				case 39:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-moveFromLeft';
					break;
				case 40:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-moveFromBottom';
					break;
				case 41:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-moveFromTop';
					break;
				case 42:
					outClass = 'pt-page-rotatePushLeft';
					inClass = 'pt-page-rotatePullRight pt-page-delay180';
					break;
				case 43:
					outClass = 'pt-page-rotatePushRight';
					inClass = 'pt-page-rotatePullLeft pt-page-delay180';
					break;
				case 44:
					outClass = 'pt-page-rotatePushTop';
					inClass = 'pt-page-rotatePullBottom pt-page-delay180';
					break;
				case 45:
					outClass = 'pt-page-rotatePushBottom';
					inClass = 'pt-page-rotatePullTop pt-page-delay180';
					break;
				case 46:
					outClass = 'pt-page-rotateFoldLeft';
					inClass = 'pt-page-moveFromRightFade';
					break;
				case 47:
					outClass = 'pt-page-rotateFoldRight';
					inClass = 'pt-page-moveFromLeftFade';
					break;
				case 48:
					outClass = 'pt-page-rotateFoldTop';
					inClass = 'pt-page-moveFromBottomFade';
					break;
				case 49:
					outClass = 'pt-page-rotateFoldBottom';
					inClass = 'pt-page-moveFromTopFade';
					break;
				case 50:
					outClass = 'pt-page-moveToRightFade';
					inClass = 'pt-page-rotateUnfoldLeft';
					break;
				case 51:
					outClass = 'pt-page-moveToLeftFade';
					inClass = 'pt-page-rotateUnfoldRight';
					break;
				case 52:
					outClass = 'pt-page-moveToBottomFade';
					inClass = 'pt-page-rotateUnfoldTop';
					break;
				case 53:
					outClass = 'pt-page-moveToTopFade';
					inClass = 'pt-page-rotateUnfoldBottom';
					break;
				case 54:
					outClass = 'pt-page-rotateRoomLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomLeftIn';
					break;
				case 55:
					outClass = 'pt-page-rotateRoomRightOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomRightIn';
					break;
				case 56:
					outClass = 'pt-page-rotateRoomTopOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomTopIn';
					break;
				case 57:
					outClass = 'pt-page-rotateRoomBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateRoomBottomIn';
					break;
				case 58:
					outClass = 'pt-page-rotateCubeLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeLeftIn';
					break;
				case 59:
					outClass = 'pt-page-rotateCubeRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeRightIn';
					break;
				case 60:
					outClass = 'pt-page-rotateCubeTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeTopIn';
					break;
				case 61:
					outClass = 'pt-page-rotateCubeBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCubeBottomIn';
					break;
				case 62:
					outClass = 'pt-page-rotateCarouselLeftOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselLeftIn';
					break;
				case 63:
					outClass = 'pt-page-rotateCarouselRightOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselRightIn';
					break;
				case 64:
					outClass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselTopIn';
					break;
				case 65:
					outClass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
					inClass = 'pt-page-rotateCarouselBottomIn';
					break;
				case 66:
					outClass = 'pt-page-rotateSidesOut';
					inClass = 'pt-page-rotateSidesIn pt-page-delay200';
					break;
				case 67:
					outClass = 'pt-page-rotateSlideOut';
					inClass = 'pt-page-rotateSlideIn';
					break;
	
			}
	
			$currPage.addClass( outClass ).on( animEndEventName, function() {
				$currPage.off( animEndEventName );
				endCurrPage = true;
				if( endNextPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			$nextPage.addClass( inClass ).on( animEndEventName, function() {
				$nextPage.off( animEndEventName );
				endNextPage = true;
				if( endCurrPage ) {
					onEndAnimation( $currPage, $nextPage );
				}
			} );
	
			if( !support ) {
				onEndAnimation( $currPage, $nextPage );
			}
		}
	
		function onEndAnimation( $outpage, $inpage ) {
			endCurrPage = false;
			endNextPage = false;
			resetPage( $outpage, $inpage );
			window.isAnimating = false;
			setCurrentMenuItem();
		}
	
		function resetPage( $outpage, $inpage ) {
			//$outpage.attr( 'class', $outpage.attr( 'data-org-class-list' ) );
			//$inpage.attr( 'class', $inpage.attr( 'data-org-class-list' ) + ' pt-page-visible' );
			$outpage.removeClass(outClass);
			$inpage.removeClass(inClass);
			//console.log("inClass = " + inClass);
			$pages.eq( current ).siblings().removeClass( 'pt-page-visible' );
		}
	
		init();
	
		return { 
			init : init,
			nextPage : nextPage
		};
	
	})();
	window.nextPage = function(index) {
		return new PageTransitions.nextPage(index);
		};
})(jQuery);