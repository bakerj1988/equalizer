/*! Created at 07-12-2014 */
define(["../../vendor/jquery.min","underscore"],function(a,b){a(function(){a.getScript("http://connect.soundcloud.com/sdk.js").then(function(){SC.initialize({client_id:"129995c68429621b69af9121acc1c116"});var c=b.template(a("#audio-tmpl").html());SC.get("/tracks",{genres:"punk",license:"cc-by-sa"},function(b){function d(a){h=window.Event?a.pageY:event.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop),i.gain.value=h/j}console.log(b),b.forEach(function(b){a("<div>").html(c({name:b.permalink})).appendTo("body")});var e=(b[0].uri.match(/\d+$/)[0],document.createElement("audio"));e.src=b[0].stream_url+"?client_id=129995c68429621b69af9121acc1c116",e.controls=!0,a("body").prepend(e);{var f=a("#waveform")[0];f.getContext("2d"),f.width,f.height}if(window.context=123,"undefined"!=typeof AudioContext)context=new AudioContext;else{if("undefined"==typeof webkitAudioContext)throw new Error("AudioContext not supported. :(");context=new webkitAudioContext}var g=context.createAnalyser();window.source=context.createMediaElementSource(e),source.connect(g);var h,i=context.createGain(),j=window.innerHeight;document.onmousemove=d,g.connect(i),i.connect(context.destination)})})})});