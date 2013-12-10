<?php
$uri = $_SERVER['REQUEST_URI'];
$title = 'zernyu chou';
$meta = 'Hello! I\'m Zernyu and this is my portfolio. I am a Chicago-based full stack developer, but I have a keen appreciation for front end development and the endless possibilities of beautiful user interfaces.';
$project_details = '';

switch($uri) {
    case '/projects':
        $title = 'zernyu chou | projects';
        $meta = 'Hello! I\'m Zernyu. Come peruse my various projects I have worked on';
        break;
    case '/about':
        $title = 'zernyu chou | about';
        $meta = 'Hello! I\'m Zernyu. Check out my resume and give me a holler.';
        break;
    case '/projects/apo':
        $title = 'zernyu chou | projects | Alpha Phi Omega';
        $meta = 'When I became the chapter\'s website administrator and Will moved on to become the chapter president, he handed me the codebase and that was when I dove headfirst into the world of software engineering.';
	    $project_details = file_get_contents('./pages/apo.html');
        break;
    case '/projects/vodori':
        $title = 'zernyu chou | projects | Vodori';
        $meta = 'I worked full time at Vodori as both a front and back end developer.';
	    $project_details = file_get_contents('./pages/vodori.html');
        break;
    case '/projects/grababike':
        $title = 'zernyu chou | projects | Grab a Bike';
        $meta = 'Grab a Bike was an ambitious school project to research and develop a sustainable bike sharing program for the University of Illinois campus, much like Chicago\'s Divvy Bikes and New York\'s Citi Bikes.';
	    $project_details = file_get_contents('./pages/grababike.html');
        break;
    case '/projects/musicmuse':
        $title = 'zernyu chou | projects | Music Muse';
        $meta = 'Music Muse was a quick experimental concept project I worked on at school to explore what an online music aggregator could be like. It scraped electronic music blogs that shared mp3 files and listed the tracks in an interface very similar to iTunes.';
	    $project_details = file_get_contents('./pages/musicmuse.html');
        break;
    case '/projects/rab':
        $title = 'zernyu chou | projects | RAB Lighting';
        $meta = 'As their sole developer, I was tasked with rewriting their aging back orders system and writing a snazzy new calculator feature on the website. I only had a little experience with JavaScript and no experience with PHP or SQL at the time. I had to learn fast!';
	    $project_details = file_get_contents('./pages/rab.html');
        break;
}
?>
<!doctype html><html><head><title><?php echo $title; ?></title><meta name="description" content="<?php echo $meta; ?>"><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><link rel="stylesheet" type="text/css" href="/css/main.css"><!--[if lte IE 8]><link rel="stylesheet" type="text/css" href="/css/ie.css"/><![endif]--><!--[if IE 7]><link rel="stylesheet" type="text/css" href="/css/ie7.css"/><![endif]--><script src="/js/main.js"></script></head><body><a href="/" title="zernyu" data-link=""><img id="zernyu" class="layer" src="/png/zernyu1.png" alt="zernyu" data-focus-image="/png/zernyu1.png" data-blur-image="/png/zernyu2.png" data-width="753" data-height="217" data-top="-20" data-left="-20" data-opacity="1" data-layer="5"></a><a href="/projects" title="projects" data-link=""><img id="projects" class="layer" src="/png/projects1.png" alt="projects" data-focus-image="/png/projects1.png" data-blur-image="/png/projects2.png" data-width="396" data-height="117" data-top="200" data-left="300" data-opacity="0.5" data-layer="4"></a><div id="projectsStripContainer" class="layer strip" data-focus-background="/png/strip1.png" data-blur-background="/png/strip2.png" data-width="100%" data-height="220" data-top="220" data-layer="4"><table><tr class="items"><td><a href="/projects/vodori" title="Vodori" data-link=""><img src="/png/projects/vodori1.png" alt="Vodori" data-key="vodori"></a></td><td><a href="/projects/grababike" title="Grab a Bike" data-link=""><img src="/png/projects/grab1.png" alt="Grab a Bike" data-key="grababike"></a></td><td><a href="/projects/apo" title="Alpha Phi Omega" data-link=""><img src="/png/projects/apo1.png" alt="Alpha Phi Omega" data-key="apo"></a></td><td><a href="/projects/musicmuse" title="Music Muse" data-link=""><img src="/png/projects/muse1.png" alt="Music Muse" data-key="musicmuse"></a></td><td><a href="/projects/rab" title="RAB Lighting" data-link=""><img src="/png/projects/rab1.png" alt="RAB" data-key="rab"></a></td></tr></table></div><img id="slider" class="layer" src="/png/slider1.png" alt="scroll" data-focus-image="/png/slider1.png" data-blur-image="/png/slider2.png" data-width="242" data-height="77" data-top="380" data-left="-242" data-opacity="0.75" data-layer="4"><a href="/about" title="about" data-link=""><img id="about" class="layer" src="/png/about1.png" alt="about" data-focus-image="/png/about1.png" data-blur-image="/png/about2.png" data-width="300" data-height="98" data-top="300" data-left="300" data-opacity="0.5" data-layer="4"></a><div id="aboutStripContainer" class="layer strip" data-width="100%" data-height="220" data-top="-220" data-left="0" data-layer="4"><div class="itemSpacer">&nbsp;</div><div id="info"><div id="phone">225-755-ZERN</div><div id="email"><a href="mailto:z@zernyu.com" title="Talk to me!" target="_blank">z@zernyu.com</a></div></div><a href="/resume.pdf" title="My resume!" target="_blank"><img id="resume" src="/png/resume1.png" alt="resume"></a></div><div id="popup" class="layer" data-width="80%" data-height="90%" data-top="10%" data-left="10%" data-opacity="1" data-hide="true" data-layer="3"><?php echo $project_details; ?></div></body></html>
