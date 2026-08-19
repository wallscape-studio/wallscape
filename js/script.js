(function(){"use strict";
var navbar=document.getElementById("navbar");
var hamburger=document.getElementById("hamburger");
var mobileMenu=document.getElementById("mobileMenu");
var mobileLinks=document.querySelectorAll(".mobile-link");
var baSlider=document.getElementById("baSlider");
var baAfter=document.getElementById("baAfter");
var baLine=document.getElementById("baLine");
var baHandle=document.getElementById("baHandle");
var contactForm=document.getElementById("contactForm");

function handleScroll(){
if(window.scrollY>50){navbar.classList.add("scrolled")}else{navbar.classList.remove("scrolled")}
var sections=document.querySelectorAll("section[id]");
var navLinks=document.querySelectorAll(".nav-links a:not(.btn)");
var current="";
sections.forEach(function(s){if(window.scrollY>=s.offsetTop-120)current=s.getAttribute("id")});
navLinks.forEach(function(l){l.style.color=l.getAttribute("href")==="#"+current?"var(--secondary)":""});
}

var scrollTick;
window.addEventListener("scroll",function(){if(scrollTick)window.cancelAnimationFrame(scrollTick);scrollTick=window.requestAnimationFrame(handleScroll)});

function toggleMenu(){
hamburger.classList.toggle("active");
mobileMenu.classList.toggle("active");
document.body.style.overflow=mobileMenu.classList.contains("active")?"hidden":"";
}
hamburger.addEventListener("click",toggleMenu);
hamburger.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleMenu()}});
mobileLinks.forEach(function(l){l.addEventListener("click",function(){hamburger.classList.remove("active");mobileMenu.classList.remove("active");document.body.style.overflow=""})});

document.querySelectorAll("a[href^=\"#\"]").forEach(function(a){
a.addEventListener("click",function(e){
e.preventDefault();
var t=document.querySelector(this.getAttribute("href"));
if(t)window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-navbar.offsetHeight,behavior:"smooth"});
});
});

var isDragging=false;
function updateSlider(x){
var r=baSlider.getBoundingClientRect();
var p=Math.max(2,Math.min(98,((x-r.left)/r.width)*100));
baAfter.style.clipPath="inset(0 0 0 "+p+"%)";
baLine.style.left=p+"%";
baHandle.style.left=p+"%";
}
if(baSlider){
baSlider.addEventListener("mousedown",function(e){isDragging=true;updateSlider(e.clientX);e.preventDefault()});
document.addEventListener("mousemove",function(e){if(isDragging)updateSlider(e.clientX)});
document.addEventListener("mouseup",function(){isDragging=false});
baSlider.addEventListener("touchstart",function(e){isDragging=true;updateSlider(e.touches[0].clientX)},{passive:true});
baSlider.addEventListener("touchmove",function(e){if(isDragging){updateSlider(e.touches[0].clientX);e.preventDefault()}},{passive:false});
baSlider.addEventListener("touchend",function(){isDragging=false});
}

window.initRevealObserver=function(){
var els=document.querySelectorAll(".reveal:not(.revealed)");
var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("revealed");obs.unobserve(e.target)}})},{threshold:0.1,rootMargin:"0px 0px -50px 0px"});
els.forEach(function(el){obs.observe(el)});
};
window.initRevealObserver();

if(contactForm){contactForm.addEventListener("submit",function(){var btn=this.querySelector(".form-submit");btn.textContent="Wysylanie...";btn.style.opacity="0.7";btn.style.pointerEvents="none"})}
})();