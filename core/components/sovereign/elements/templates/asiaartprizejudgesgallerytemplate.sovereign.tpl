<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>[[++site_name]] - [[*pagetitle]]</title>
<base href="[[++site_url]]" />
<link href="[[++assets_url]]theme/css/html5reset-1.6.1.css" rel="stylesheet" type="text/css" />
<link href="[[++assets_url]]theme/css/style.css" rel="stylesheet" type="text/css" />

<link href='http://fonts.googleapis.com/css?family=Muli:300,400,400italic,300italic' rel='stylesheet' type='text/css'>

<!--- fancybox --->
<link rel="stylesheet" type="text/css" href="[[++assets_url]]theme/fancybox/jquery.fancybox.css?v=2.1.5" media="screen" />

<!-- slider -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.0.0/animate.min.css">
<link rel="stylesheet" href="[[++assets_url]]theme/css/liquid-slider.css">

<!-- Rate It -->
<link rel="stylesheet" href="[[++assets_url]]theme/css/rateit.css">
</head>

<body class="no-js">

[[$header]]

[[$nav]]

<section id="slide">
    <img src="[[++assets_url]]theme/images/judge_banner.jpg" alt="Judges Gallery" /></div>
</section>

<!-- Judges Gallery block -->
<section class="judges_block">

    [[!getAfricanJudgesGallery]]

    <div class="judge_submit">
        <input type="submit" class="btn_judge_submit" name="submit" value="Submit" />

    </div>

</section>


[[*content]]
[[$newsletter-signup]]

<footer>
	<div id="footer_wrap">
		<div id="footer_contact">
        	<h1>Contact</h1>
            <p><u>Email</u><br/>
            <a href="mailto:art@sovereignartfoundation.com">art@sovereignartfoundation.com</a></p>
        </div>
        <div id="footer_contact2">
            <p><u>Hong Kong</u><br/>
                Tel: +852 2542 1177<br/>
                Fax: +852 2545 0550</p>
            <p><u>London</u><br/>
                Tel: + 44 (0)20 7389 0555<br/>
                Fax: + 44 (0)20 7930 1151</p>
        </div>
        <div id="footer_soical">
        	<h1>Follow us</h1>
            <ul class="social_icons_footer">
                <li><a href="facebook.com" class="soical_fb">facebook</a></li>
                <li><a href="facebook.com" class="soical_twitter">twitter</a></li>
                <li><a href="facebook.com" class="soical_google">google+</a></li>
                <li><a href="facebook.com" class="soical_youtube">youtube</a></li>
                <li><a href="facebook.com" class="soical_linkedin">linkedin</a></li>
                <li><a href="facebook.com" class="soical_rss">rss</a></li>
        	</ul>  
            <div class="clear"></div>
            <p class="copyright">&copy; The Sovereign Group 2014. All rights resevered.<br />
				<a href="privacypolicy.html">Privacy Policy</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="accesibility.html">Accesibility</a>&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;<a href="cookiepolicy.html">Cookie Policy</a></p>
        </div>
    
    	<div class="clear"></div>
    </div>
</footer>

<script src="[[++assets_url]]theme/js/modernizr-latest.js" type="text/javascript"></script>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>

<!--- fancybox --->
<script type="text/javascript" src="[[++assets_url]]theme/fancybox/jquery.fancybox.js?v=2.1.5"></script>
<!-- Add Media helper -->
<script type="text/javascript" src="[[++assets_url]]theme/fancybox/helpers/jquery.fancybox-media.js?v=1.0.6"></script>

<!--- slider --->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js"></script>
<script src="[[++assets_url]]theme/js/jquery.liquid-slider.min.js"></script>
 
<!--- sticky --->
<script type="text/javascript" src="[[++assets_url]]theme/js/jquery.sticky.js"></script>

<!--- smooth scroll --->
<script src="[[++assets_url]]theme/js/smooth-scroll.js"></script>

<!--- rate it --->
<script src="[[++assets_url]]theme/js/jquery.rateit.js"></script>

<!-- js call for action -->
<script src="[[++assets_url]]theme/js/script.js" type="text/javascript"></script>


</body>
</html>