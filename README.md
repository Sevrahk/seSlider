# jQuery seSlider #

jquery.seSlider is a lightweight slider plugin for jQuery.
It allows you to create classical slider with next and previous button or slideshow that can be linked to a sound.

Requirements
-----
[jQuery](http://www.jquery.com) (>= 1.7)

Usage
-----

### Step 1: Call the JS lib ###
First, include the jQuery library (by downloading it or calling it from CDN).  
Next, download the package from this site and link the slider Javascript file.

```html
<!-- jQuery library (served from Google CDN) -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<!-- slider Javascript file -->
<script src="/js/jquery.seslider.min.js"></script>
```

### Step 2: Create HTML markup ###
Create a `<div class="slider">` tag, with a `<ul>` list and a `<li>` for each slide. Slides can contain images, video, or any HTML content.

```html
<div class="slider">
    <ul>
        <li><img src="img/img01.jpg" alt="" /></li>
        <li><img src="img/img02.jpg" alt="" /></li>
        <li><img src="img/img03.jpg" alt="" /></li>
        ...
    </ul>
</div>
```

### Step 3: Add the following CSS to your code. ###
You will have to edit the width and height properties to adapt the slider to your needs. 

```css
.slider {
    width: 800px; /* can be changed following your needs */
    height: 600px; /* can be changed following your needs */
    overflow: hidden;
}

.slider ul {
    margin: 0;
    padding: 0;
    position: relative;
    list-style: none;
}

.slider ul li {
    width: 800px; /* can be changed following your needs */
    float: left;
}
```

### Step 4: Call the plugin ###

```javascript
$(document).ready(function() {
    $('.slider').seSlider();
});
```

Options
-----
- **nextBtn**  
The next button selector.  
*default: '.sliderNextBtn'*

- **prevBtn**  
The previous button selector.  
*default: '.sliderPrevBtn'*

- **playPauseBtn**  
The play/pause button selector.  
*default: '.sliderPlayBtn'*

- **resetBtn**  
The reset button selector.  
*default: null*

- **preventReversedCycle**  
Allow or prevent changing slide if you are on the first slide on click on previous button.  
*default: false*

- **progressBar**  
The progress bar selector. If the value is different to null the plugin will automaticly update the progressBar.  
*default: null*

- **changeCallback**  
Function called when the change slide animation is triggered.  
*default: null*  
*Optional parameters: currentSlideIndex, toSlideIndex, direction*

- **afterChangeCallback**  
Function called after the change slide animation is complete.  
*default: null*  
*Optional parameters: newSlideIndex*

- **playCallback**  
Function called when the slideShow starts.  
*default: null*

- **pauseCallback**  
Function called when the slideShow is set to pause.  
*default: null*

- **endCallback**  
Function called when the slideShow is ended.  
*default: null*

- **resetCallback**  
Function called when the slideShow is reseted.  
*default: null*

- **slideshowSoundTrack**  
The audio tag selector that runs with the slideshow.  
*default: null*

- **slideshowSteps**  
The array containing the times of each slide.  
If the value is set to null the slideshow will change to the next slide after each `slideshowIntervalTime`.  
*default: null*

- **slideshowIntervalTime**  
If `slideshowSteps` is null: The interval time between each slide change.  
If `slideshowSteps` is not null: The interval time between each step checking.  
*default: 1000*

- **transitionSpeed**  
The animation's transition speed between 2 list elements.  
*default: 200*

Progress bar
-----

Due to a desire of compatibility the plugin is designed to interact with a progress bar composed by a classical div tag

```html
<div class="progressBar"><div></div></div>
```

```css
.progressBar {
    width: 800px; /* can be changed following your needs */
    height: 15px; /* can be changed following your needs */
    box-shadow: 0 2px 5px #aaaaaa inset; /* can be changed following your needs */
    background: #eeeeee; /* can be changed following your needs */
}

.progressBar div {
    width: 0;
    height: 100%;
    background: #ee4444; /* can be changed following your needs */
}
```
