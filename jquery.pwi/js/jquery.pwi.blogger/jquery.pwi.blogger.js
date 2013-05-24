/**
 * Blogger integration module for Picasa Webalbum Integration jQuery plugin
 *
 * @name jquery.pwi.blogger.js
 * @author Johan Borkhuis - http://www.borkhuis.com/
 * @revision 2.0.2
 * @date May 7, 2013
 * @copyright (c) 2010-2013 Jeroen Diderik(www.jdee.nl) and Johan Borkhuis
 * @license Creative Commons Attribution-Share Alike 3.0 Netherlands License - http://creativecommons.org/licenses/by-sa/3.0/nl/
 * @Visit http://pwi.googlecode.com/ for more informations, discussions etc about this library
 */

    $(document).ready(function () {

        // This will show one picture from the provided album, with previous and
        // next links below the picture
        var $target = $(".pwi_default");    // find all pwi containers of the current page
        $target.each(function() {           // loop over each container found
            var $username = $(this).attr("username");   // extract username to access album
            var $album = $(this).attr("id");            // extract album name
            var $authKey = $(this).attr("authKey");     // extract authkey if needed
            $(this).pwi({                   // apply the plugin for each album found
                username: $username,
                album: $album,
                authKey: $authKey,
                ownRelTag: $(this).attr("id")   // Needed to be able to use multiple instances on one page
            });
        });

        // This will show one picture from the provided album, with previous and
        // next links below the picture
        var $target = $(".pwi_single_picture");    // find all pwi containers of the current page
        $target.each(function() {           // loop over each container found
            var $username = $(this).attr("username");   // extract username to access album
            var $album = $(this).attr("id");            // extract album name
            var $authKey = $(this).attr("authKey");     // extract authkey if needed
            $(this).pwi({                   // apply the plugin for each album found
                username: $username,
                album: $album,
                authKey: $authKey,
                mode: "album",
                ownRelTag: $(this).attr("id"),  // Needed to be able to use multiple instances on one page
                showAlbumDescription: false,
                showPageCounter: false,
                showPhotoDownloadPopup: false,
                maxResults: 1,
                thumbSize: 520,
                albumCrop: 0,
                photoSize: 1600,
                colorbox_config: {
                    config_photos: {
                        loop: true,
                        slideshowSpeed: 5000,
                        slideshowAuto: true
                    }
                }
            });
        });
    });

