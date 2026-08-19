(function(){"use strict";
var files={services:"content/services.json",portfolio:"content/portfolio.json",about:"content/about.json",settings:"content/settings.json"};
var data={};
function load(url){return fetch(url).then(function(r){return r.ok?r.json():Promise.reject(url)})}
function render(){
if(data.services&&data.services.items){
var sg=document.getElementById("servicesGrid");
if(sg){sg.innerHTML="";data.services.items.forEach(function(item,i){
var n=String(i+1).padStart(2,"0");var c=document.createElement("div");
c.className="service-card reveal"+(i>0?" reveal-delay-"+i:"");
c.innerHTML="<img src=\""+item.image+"\" alt=\""+item.title+"\" loading=\"lazy\"><div class=\"service-card-overlay\"><span class=\"service-card-number\">"+n+"</span><div class=\"service-card-arrow\"><svg viewBox=\"0 0 24 24\"><path d=\"M7 17L17 7M17 7H7M17 7v10\"/></svg></div><h3>"+item.title+"</h3><p>"+item.description+"</p></div>";
sg.appendChild(c)})}}
if(data.portfolio&&data.portfolio.projects){
var pg=document.getElementById("portfolioGrid");
if(pg){pg.innerHTML="";data.portfolio.projects.forEach(function(p,i){
var d=document.createElement("div");d.className="portfolio-item reveal"+(i>0?" reveal-delay-"+i:"");
d.innerHTML="<img src=\""+p.image+"\" alt=\""+p.title+"\" loading=\"lazy\"><div class=\"portfolio-overlay\"><h4>"+p.title+"</h4><span class=\"portfolio-location\">\ud83d\udccd "+p.location+"</span><div class=\"portfolio-icon\"><svg viewBox=\"0 0 24 24\"><path d=\"M7 17L17 7M17 7H7M17 7v10\"/></svg></div></div>";
pg.appendChild(d)})}}
if(data.about){
var ap=document.getElementById("aboutPhoto");if(ap&&data.about.photo)ap.src=data.about.photo;
var at=document.getElementById("aboutTitle");if(at&&data.about.title)at.innerHTML=data.about.title;
var ad1=document.getElementById("aboutDesc1");if(ad1&&data.about.description_1)ad1.textContent=data.about.description_1;
var ad2=document.getElementById("aboutDesc2");if(ad2&&data.about.description_2)ad2.textContent=data.about.description_2;
if(data.about.highlights){var ah=document.getElementById("aboutHighlights");if(ah){ah.innerHTML="";data.about.highlights.forEach(function(h){
var d=document.createElement("div");d.className="about-highlight";
d.innerHTML="<div class=\"about-highlight-icon\"><svg viewBox=\"0 0 24 24\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M8 12l2 2 4-4\"/></svg></div><span>"+h.text+"</span>";
ah.appendChild(d)})}}}
if(window.initRevealObserver)window.initRevealObserver();
}
var promises=Object.keys(files).map(function(k){return load(files[k]).then(function(d2){data[k]=d2}).catch(function(){console.warn("Fallback: "+k)})});
Promise.all(promises).then(render);
})();