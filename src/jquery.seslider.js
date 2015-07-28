(function($) {
    $.fn.seSlider = function(options) {
        var defaults = {
            nextBtn: '.sliderNextBtn',
            prevBtn: '.sliderPrevBtn',
            playPauseBtn: '.sliderPlayBtn',
            resetBtn: '.sliderResetBtn',
            preventReversedCycle: false,
            progressBar: null,
            playCallback: null,
            pauseCallback: null,
            endCallback: null,
            autoPlay: false,
            slideshowSoundTrack: null,
            slideshowSteps: null,
            slideshowIntervalTime: 1000,
            transitionSpeed: 200
        };
        var params = $.extend(defaults, options);

        function moveLeft(slider, slideshow, btnClicked) {
            if(params.preventReversedCycle === true && slideshow.currStep <= 1)
                return;

            slider.animate({
                left: + slider.children('li').width()
            }, params.transitionSpeed, function() {
                slideshow.currStep--;
                slider.find('li').last().prependTo(slider);
                slider.css('left', '');

                if(btnClicked === true)
                {
                    if(slideshow.currStep < 1)
                    {
                        if(slideshow.interval !== false)
                            stopSlideShow(slideshow, true, false);

                        slideshow.currStep = slideshow.maxStep;
                    }

                    if(params.slideshowSteps === null)
                        slideshow.elapsedTime = params.slideshowIntervalTime * (slideshow.currStep - 1);
                    else
                        slideshow.elapsedTime = params.slideshowSteps[slideshow.currStep - 2] || 0;

                    updateProgressBar(slideshow.elapsedTime / slideshow.maxTime * 100);
                    updateSoundTrackTime(slideshow.elapsedTime / 1000);
                }
            });
        }

        function moveRight(slider, slideshow, btnClicked) {
            slider.animate({
                left: - slider.children('li').width()
            }, params.transitionSpeed, function() {
                slideshow.currStep++;
                slider.find('li').first().appendTo(slider);
                slider.css('left', '');

                if(btnClicked === true)
                {
                    if(slideshow.currStep > slideshow.maxStep)
                    {
                        slideshow.currStep = 1;
                        if(slideshow.interval !== false)
                        {
                            stopSlideShow(slideshow, true, false);
                            return;
                        }
                    }

                    if(params.slideshowSteps === null)
                        slideshow.elapsedTime = params.slideshowIntervalTime * (slideshow.currStep - 1);
                    else
                        slideshow.elapsedTime = params.slideshowSteps[slideshow.currStep - 2] || 0;

                    updateProgressBar(slideshow.elapsedTime / slideshow.maxTime * 100);
                    updateSoundTrackTime(slideshow.elapsedTime / 1000);
                }
            });
        }

        function playSlideShow(slider, slideshow)
        {
            slideshow.interval = setInterval(function() {
                slideshow.elapsedTime += params.slideshowIntervalTime;
                updateProgressBar(slideshow.elapsedTime / slideshow.maxTime * 100);

                if(params.slideshowSteps !== null && params.slideshowSteps[slideshow.currStep - 1] > slideshow.elapsedTime)
                    return;

                moveRight(slider, slideshow, false);

                if(slideshow.currStep >= slideshow.maxStep)
                    stopSlideShow(slideshow, true, false);
            }, params.slideshowIntervalTime);

            if(params.slideshowSoundTrack !== null)
                $(params.slideshowSoundTrack).get(0).play();

            if(typeof params.playCallback === 'function')
                params.playCallback();
        }

        function stopSlideShow(slideshow, endReached, reset)
        {
            if(slideshow.interval !== false)
            {
                clearInterval(slideshow.interval);
                slideshow.interval = false;
                
                if(params.slideshowSoundTrack !== null)
                    $(params.slideshowSoundTrack).get(0).pause();
            }

            if(endReached === true || reset === true)
            {
                if(reset === true && slideshow.currStep !== 1)
                    $('.slider').find('li').slice(slideshow.maxStep - (slideshow.currStep - 1)).prependTo('.slider ul');

                slideshow.currStep = 1;
                slideshow.elapsedTime = 0;
                updateProgressBar(0);
                updateSoundTrackTime(0);

                if(reset !== true && typeof params.endCallback === 'function')
                    params.endCallback();
            }
            else if(typeof params.pauseCallback === 'function')
                params.pauseCallback();
        }

        function updateProgressBar(size)
        {
            if(params.progressBar !== null)
                $(params.progressBar).children('div').css('width', size + '%');
        }

        function updateSoundTrackTime(time)
        {
            if(params.slideshowSoundTrack !== null)
                $(params.slideshowSoundTrack).get(0).currentTime = time;
        }

        return this.each(function() {
            var obj = $(this).children('ul');
            var slideWidth = obj.children('li').width(),
                slideshow = {
                interval: false,
                maxStep: obj.find('li').length,
                currStep: 1,
                elapsedTime: 0
            };
            slideshow.maxTime = params.slideshowSteps !== null ? params.slideshowSteps[slideshow.maxStep - 1] : params.slideshowIntervalTime * slideshow.maxStep;

            if(obj.children('li').length === 1)
                return true;

            obj.children('li').last().prependTo(obj);
            if(obj.children('li').length === 2)
            {
                var first = obj.children('li').first().clone(),
                    last = obj.children('li').last().clone();
                obj.append(first).append(last);
            }

            obj.css({width: slideWidth * slideshow.maxStep, marginLeft: - slideWidth});
            
            if(params.autoPlay === true)
                playSlideShow(obj, slideshow);

            //Next button
            $(params.nextBtn).on('touchstart click', function(e) {
                e.preventDefault();
                if(obj.css('left') !== 'auto')
                    return;

                moveRight(obj, slideshow, true);
            });

            //Prev button
            $(params.prevBtn).on('touchstart click', function(e) {
                e.preventDefault();
                if(obj.css('left') !== 'auto')
                    return;

                moveLeft(obj, slideshow, true);
            });

            //Reset button
            $(params.resetBtn).on('touchstart click', function(e) {
                e.preventDefault();
                stopSlideShow(slideshow, true, true);
            });

            //SlideShow play
            $(params.playPauseBtn).on('touchstart click', function(e) {
                e.preventDefault();
                if(slideshow.interval === false)
                    playSlideShow(obj, slideshow);
                else
                    stopSlideShow(slideshow, false, false);
            });
        });
    };
})(jQuery);
