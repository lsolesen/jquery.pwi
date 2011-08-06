/**
 * Picasa Webalbum Integration jQuery plugin
 * This library was inspired aon pwa by Dieter Raber
 * @name jquery.pwi.js
 * @author Jeroen Diderik - http://www.jdee.nl/
 * @revision 1.4.0
 * @date august 05, 2011
 * @copyright (c) 2010-2011 Jeroen Diderik(www.jdee.nl)
 * @license Creative Commons Attribution-Share Alike 3.0 Netherlands License - http://creativecommons.org/licenses/by-sa/3.0/nl/
 * @Visit http://pwi.googlecode.com/ for more informations, duscussions etc about this library
 */
function formatTitle(a,b,c,d){var e=a;if(d.orig.context.downloadlink){var f='<a style="color: #FFF;" href="'+d.orig.context.downloadlink+'">Download</a>';return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+e+"  "+f+'</td><td id="fancybox-title-float-right"></td></tr></table>'}else{return'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+e+'</td><td id="fancybox-title-float-right"></td></tr></table>'}}(function(a){var b,c={};a.fn.pwi=function(c){function t(a,b){var c=document.getElementById("loadinggif");if(a){if(c){c.style.display="block"}document.body.style.cursor="wait"}else{if(c){c.style.display="none"}document.body.style.cursor="default";d.html(b)}}function s(){t(true,"");var b="http://picasaweb.google.com/data/feed/api/user/"+e.username+(e.album!==""?"/album/"+e.album:"")+"?kind=photo&max-results="+e.maxResults+"&alt=json&q="+(e.authKey!==""?"&authkey="+e.authKey:"")+(e.keyword!==""?"&tag="+e.keyword:"");a.getJSON(b,"callback=?",n);return d}function r(){if(e.photostore[e.album]){m(e.photostore[e.album])}else{var b=(e.page-1)*e.maxResults+1;var c="http://picasaweb.google.com/data/feed/api/user/"+e.username+"/album/"+e.album+"?kind=photo&alt=json"+(e.authKey!==""?"&authkey="+e.authKey:"")+(e.keyword!==""?"&tag="+e.keyword:"")+"&imgmax=d&thumbsize="+e.thumbSize+(e.thumbCrop==1?"c":"")+","+e.photoSize;t(true,"");a.getJSON(c,"callback=?",m)}return d}function q(){if(e.albumstore.feed){l(e.albumstore)}else{t(true,"");var b="http://picasaweb.google.com/data/feed/api/user/"+e.username+"?kind=album&access="+e.albumTypes+"&alt=json&thumbsize="+e.thumbSize+(e.thumbCrop==1?"c":"");a.getJSON(b,"callback=?",l)}return d}function p(a){a.stopPropagation();a.preventDefault();e.onclickThumb(a)}function o(a){a.stopPropagation();a.preventDefault();e.onclickAlbumThumb(a)}function n(b){var c=a("<div/>"),d=b.feed?b.feed.entry.length:0,f=0;while(f<e.maxResults&&f<d){var g=k(b.feed.entry[f],false);c.append(g);f++}c.append("<div style='clear: both;height:0px;'> </div>");var h=a("div.pwi_photo",c).css(e.thumbCss);if(typeof e.popupExt==="function"){e.popupExt(h.find("a[rel='lb-"+e.username+"']"))}else if(typeof e.onclickThumb!="function"&&a.slimbox){h.find("a[rel='lb-"+e.username+"']").slimbox(e.slimbox_config)}t(false,c)}function m(b){var c,d,f="",g=b.feed.openSearch$totalResults.$t,i="",j="",l=b.feed.gphoto$location===undefined?"":b.feed.gphoto$location.$t,m,n=h(b.feed.gphoto$timestamp===undefined?"":b.feed.gphoto$timestamp.$t),o=g=="1"?false:true;if(b.feed.subtitle===undefined){m=""}else{var p=b.feed.subtitle.$t.match(/\[keywords\s*:\s*.*\s*\](.*)/);if(p){m=p[1]}else{m=b.feed.subtitle.$t}}i=b.feed.title==="undefined"||e.albumTitle.length>0?e.albumTitle:b.feed.title.$t;c=a("<div/>");if(e.mode!="album"&&e.mode!="keyword"){f=a("<div class='pwi_album_backlink'>"+e.labels.albums+"</div>").bind("click.pwi",function(a){a.stopPropagation();q();return false});c.append(f)}if(e.showAlbumDescription){d=a("<div class='pwi_album_description'/>");d.append("<div class='title'>"+i+"</div>");d.append("<div class='details'>"+g+" "+(o?e.labels.photos:e.labels.photo)+(e.showAlbumdate?", "+n:"")+(e.showAlbumLocation&&l?", "+l:"")+"</div>");d.append("<div class='description'>"+m+"</div>");if(e.showSlideshowLink){if(e.mode==="keyword"||e.keyword!==""){}else{d.append("<div><a href='http://picasaweb.google.com/"+e.username+"/"+b.feed.gphoto$name.$t+""+(e.authKey!==""?"?authkey="+e.authKey:"")+"#slideshow/"+b.feed.entry[0].gphoto$id.$t+"' rel='gb_page_fs[]' target='_new' class='sslink'>"+e.labels.slideshow+"</a></div>")}}c.append(d)}if(typeof e.popupExt==="function"){var s=a("<div class='pwi_photo'/>");for(var u=0;u<b.feed.link.length;u++){if(b.feed.link[u].type=="text/html"&&b.feed.link[u].rel=="alternate"){s.append("<a class='iframe' href='"+b.feed.link[u].href+"#slideshow/' rel='sl-"+e.username+"' title='"+n+"'>"+e.labels.slideshow+"</a><br>");break}}c.append(s);c.append("<div style='clear: both;height:0px;'/>")}if(g>e.maxResults){$pageCount=g/e.maxResults;var v=a("<div class='pwi_prevpage'/>").text(e.labels.prev),w=a("<div class='pwi_nextpage'/>").text(e.labels.next);j=a("<div class='pwi_pager'/>");if(e.page>1){v.addClass("link").bind("click.pwi",function(a){a.stopPropagation();e.page=parseInt(e.page,10)-1;r();return false})}j.append(v);for(var x=1;x<$pageCount+1;x++){if(x==e.page){f="<div class='pwi_pager_current'>"+x+"</div> "}else{f=a("<div class='pwi_pager_page'>"+x+"</div>").bind("click.pwi",x,function(a){a.stopPropagation();e.page=a.data;r();return false})}j.append(f)}if(e.page<$pageCount){w.addClass("link").bind("click.pwi",function(a){a.stopPropagation();e.page=parseInt(e.page,10)+1;r();return false})}j.append(w);j.append("<div style='clear: both;height:0px;'/>")}if(j.length>0&&(e.showPager==="both"||e.showPager==="top")){c.append(j)}var y=(e.page-1)*e.maxResults;var z=e.maxResults*e.page;for(var u=0;u<g;u++){var A=k(b.feed.entry[u],!(u>=y&&u<z));c.append(A)}if(j.length>0&&(e.showPager==="both"||e.showPager==="bottom")){c.append(j.clone(true))}e.photostore[e.album]=b;var B=a(".pwi_photo",c).css(e.thumbCss);if(typeof e.popupExt==="function"){e.popupExt(B.find("a[rel='lb-"+e.username+"']"));e.popupExt(B.find("a[rel='sl-"+e.username+"']"))}else if(typeof e.onclickThumb!="function"&&a.slimbox){B.find("a[rel='lb-"+e.username+"']").slimbox(e.slimbox_config,function(a){if(a.downloadlink){var b='<a href="'+a.downloadlink+'">Download</a>';return[a.href,a.title+"  "+b]}else{return[a.href,a.title]}})}c.append("<div style='clear: both;height:0px;'/>");t(false,c);var C=document.getElementsByTagName("a");for(var u=0;u<C.length;u++){if(C[u].className=="downloadlink"){C[u].downloadlink=C[u].title.substr(C[u].title.indexOf("  ")+2);C[u].title=C[u].title.substr(0,C[u].title.indexOf("  "))}}}function l(b){var c=a("<div/>"),d=0;var f=0,g="",i=0;var j,k;if(navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)/i)==null){j=new Date(e.albumStartDateTime);if(isNaN(j)){var m=e.albumStartDateTime.replace(/-/g,"/");j=new Date(m)}k=new Date(e.albumEndDateTime);if(isNaN(k)){var m=e.albumEndDateTime.replace(/-/g,"/");k=new Date(m)}}else{var m=e.albumStartDateTime.replace(/-/g,"/");j=new Date(m);m=e.albumEndDateTime.replace(/-/g,"/");k=new Date(m)}d=e.albumsPerPage*(e.albumPage-1);f=b.feed.entry.length;while(d<e.albumMaxResults&&d<f&&d<e.albumsPerPage*e.albumPage){var n=b.feed.entry[d].gphoto$name.$t,o=new Date(Number(b.feed.entry[d].gphoto$timestamp.$t)),p=b.feed.entry[d].media$group.media$thumbnail[0].url;if((a.inArray(n,e.albums)>-1||e.albums.length===0)&&(e.albumStartDateTime==""||o>=j)&&(e.albumEndDateTime==""||o<=k)){var q=true;if(e.albumKeywords.length>0){q=false;var s=b.feed.entry[d].summary.$t.match(/\[keywords\s*:\s*(.*)\s*\]/);if(s){var u=new Array;var v=s[1].split(/,/);for(var w in v){$newmatch=v[w].match(/\s*['"](.*)['"]\s*/);if($newmatch){u.push($newmatch[1])}}if(u.length>0){q=true;for(var w in e.albumKeywords){if(a.inArray(e.albumKeywords[w],u)<0){q=false;break}}}}}if(q==true){i++;if(e.showAlbumThumbs){$scAlbum=a("<div class='pwi_album' style='height:180px;width:"+(e.thumbSize+1)+"px;cursor: pointer;'/>")}else{$scAlbum=a("<div class='pwi_album' style='cursor: pointer;'/>")}var x=b.feed.entry[d];$scAlbum.bind("click.pwi",x,function(a){a.stopPropagation();e.page=1;e.album=a.data.gphoto$name.$t;if(typeof e.onclickAlbumThumb==="function"){e.onclickAlbumThumb(a);return false}else{r();return false}});if(e.showAlbumThumbs){$scAlbum.append("<img src='"+p+"'/>")}if(e.showAlbumTitles){$scAlbum.append("<br/>"+b.feed.entry[d].title.$t+"<br/>"+(e.showAlbumdate?h(b.feed.entry[d].gphoto$timestamp.$t):"")+(e.showAlbumPhotoCount?"    "+b.feed.entry[d].gphoto$numphotos.$t+" "+e.labels.photos:""))}c.append($scAlbum)}}d++}c.append("<div style='clear: both;height:0px;'/>");if(i==0){c=a("<div class='pwi_album_description'/>");c.append("<div class='title'>"+e.labels.noalbums+"</div>");t(false,c);return}if(f>e.albumsPerPage){var y=f/e.albumsPerPage;var z=a("<div class='pwi_prevpage'/>").text(e.labels.prev),A=a("<div class='pwi_nextpage'/>").text(e.labels.next);$navRow=a("<div class='pwi_pager'/>");if(e.albumPage>1){z.addClass("link").bind("click.pwi",function(a){a.stopPropagation();e.albumPage=parseInt(e.albumPage,10)-1;l(b);return false})}$navRow.append(z);for(var w=1;w<y+1;w++){if(w==e.albumPage){tmp="<div class='pwi_pager_current'>"+w+"</div> "}else{tmp=a("<div class='pwi_pager_page'>"+w+"</div>").bind("click.pwi",w,function(a){a.stopPropagation();e.albumPage=a.data;l(b);return false})}$navRow.append(tmp)}if(e.albumPage<y){A.addClass("link").bind("click.pwi",function(a){a.stopPropagation();e.albumPage=parseInt(e.albumPage,10)+1;l(b);return false})}$navRow.append(A);$navRow.append("<div style='clear: both;height:0px;'/>");if($navRow.length>0&&(e.showPager==="both"||e.showPager==="top")){c.append($navRow)}if($navRow.length>0&&(e.showPager==="both"||e.showPager==="bottom")){c.prepend($navRow.clone(true))}}e.albumstore=b;t(false,c)}function k(b,c){var d,f="",g="",h=b.media$group.media$thumbnail[0].url,k=b.media$group.media$thumbnail[1].url,l=b.media$group.media$content[0].url,m=b.gphoto$id.$t;g=i(b.summary?b.summary.$t:"");if(e.showPhotoDate){if(b.exif$tags.exif$time){f=j(b.exif$tags.exif$time.$t)}else if(b.gphoto$timestamp){f=j(b.gphoto$timestamp.$t)}else{f=j(b.published.$t)}f+=" "}if(c){d=a("<div class='pwi_photo' style='display: none'/>");d.append("<a class='downloadlink' href='"+k+"' rel='lb-"+e.username+"' title='"+f+"  "+l+"'></a>");return d}else{f+=g.replace(new RegExp("'","g"),"&#39;");d=a("<div class='pwi_photo' style='height:"+(e.thumbSize+(e.showPhotoCaption?15:1))+"px;cursor: pointer;'/>");d.append("<a class='downloadlink' href='"+k+"' rel='lb-"+e.username+"' title='"+f+"  "+l+"'><img src='"+h+"'/></a>");if(e.showPhotoCaption){if(e.showPhotoCaptionDate&&e.showPhotoDate){g=f}if(e.showPhotoDownload){g+='<a href="'+l+'">Download foto</a>'}if(g>e.showCaptionLength){g=g.substring(0,e.showCaptionLength)}d.append("<br/>"+g)}if(typeof e.onclickThumb==="function"){var n=b;d.bind("click.pwi",n,p)}return d}}function j(a){var b=new Date(Number(a));$year=b.getUTCFullYear();if($year<1e3){$year+=1900}if(b=="Invalid Date"){return a}else{if(b.getUTCHours()==0&&b.getUTCMinutes()==0&&b.getUTCSeconds()==0){return b.getUTCDate()+"-"+(b.getUTCMonth()+1)+"-"+$year}else{return b.getUTCDate()+"-"+(b.getUTCMonth()+1)+"-"+$year+" "+b.getUTCHours()+":"+(b.getUTCMinutes()<10?"0"+b.getUTCMinutes():b.getUTCMinutes())}}}function i(a){return a.replace(/\n/g,"<br />\n")}function h(a){var b=new Date(Number(a)),c=b.getUTCFullYear();if(c<1e3){c+=1900}return b.getUTCDate()+"-"+(b.getUTCMonth()+1)+"-"+c}function g(){if(e.username===""){alert("Make sure you specify at least your username."+"\n"+"See http://pwi.googlecode.com for more info");return}switch(e.mode){case"latest":s();break;case"album":r();break;case"keyword":r();break;default:q();break}}function f(){e=c;ts=(new Date).getTime();e.id=ts;d=a("<div id='pwi_"+ts+"'/>").appendTo(b);d.addClass("pwi_container");g();return false}var d,e={};c=a.extend({},a.fn.pwi.defaults,c);b=this;f()};a.fn.pwi.defaults={mode:"albums",username:"",album:"",authKey:"",albums:[],keyword:"",albumKeywords:[],albumStartDateTime:"",albumEndDateTime:"",albumCrop:1,albumTitle:"",albumThumbSize:144,albumMaxResults:999,albumsPerPage:999,albumPage:1,albumTypes:"public",page:1,photoSize:800,maxResults:50,showPager:"bottom",thumbSize:144,thumbCrop:1,thumbCss:{margin:"5px"},onclickThumb:"",onclickAlbumThumb:"",popupExt:"",showAlbumTitles:true,showAlbumThumbs:true,showAlbumdate:true,showAlbumPhotoCount:true,showAlbumDescription:true,showAlbumLocation:true,showSlideshow:true,showSlideshowLink:false,showPhotoCaption:false,showPhotoCaptionDate:false,showCaptionLength:9999,showPhotoDownload:false,showPhotoDate:true,labels:{photo:"photo",photos:"photos",albums:"Back to albums",slideshow:"Display slideshow",noalbums:"No albums available",loading:"PWI fetching data...",page:"Page",prev:"Previous",next:"Next",devider:"|"},months:["January","February","March","April","May","June","July","August","September","October","November","December"],slimbox_config:{loop:false,overlayOpacity:.6,overlayFadeDuration:400,resizeDuration:400,resizeEasing:"swing",initialWidth:250,initlaHeight:250,imageFadeDuration:400,captionAnimationDuration:400,counterText:"{x}/{y}",closeKeys:[27,88,67,70],prevKeys:[37,80],nextKeys:[39,83]},blockUIConfig:{message:"<div class='lbLoading pwi_loader'>loading...</div>",css:"pwi_loader"},albumstore:{},photostore:{},token:""}})(jQuery)
