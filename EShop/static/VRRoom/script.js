(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1_playlist,this.mainPlayList]); this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1_playlist.set('selectedIndex', 0); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "rootPlayer",
 "mobileMipmappingEnabled": false,
 "vrPolyfillScale": 0.5,
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "mouseWheelEnabled": true,
 "scrollBarOpacity": 0.5,
 "children": [
  "this.MainViewer",
  "this.Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
  "this.Container_1C24B0E2_095E_7692_419F_6F571A3BF713",
  "this.Container_1AE8C9D4_093A_76B6_4184_11C5F3785456",
  "this.Container_18CC8D9F_0E8A_4D34_415A_2346EF6C0234"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "backgroundPreloadEnabled": true,
 "paddingLeft": 0,
 "minHeight": 20,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "unregisterKey": function(key){  delete window[key]; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "registerKey": function(key, value){  window[key] = value; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "existsKey": function(key){  return key in window; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "getKey": function(key){  return window[key]; }
 },
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 20,
 "verticalAlign": "top",
 "defaultVRPointer": "laser",
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "downloadEnabled": false,
 "paddingBottom": 0,
 "class": "Player",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "definitions": [{
 "fieldOfViewOverlayOutsideOpacity": 0,
 "label": "FloorPlan",
 "id": "map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78",
 "minimumZoomFactor": 1,
 "thumbnailUrl": "media/map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78_t.png",
 "width": 4000,
 "image": {
  "levels": [
   {
    "url": "media/map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78.png",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 2400
   },
   {
    "url": "media/map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78_lq.png",
    "width": 295,
    "class": "ImageResourceLevel",
    "height": 222,
    "tags": "preload"
   }
  ],
  "class": "ImageResource"
 },
 "fieldOfViewOverlayRadiusScale": 0.3,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "maximumZoomFactor": 1,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "class": "Map",
 "initialZoomFactor": 1,
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "height": 3000,
 "overlays": [
  "this.overlay_1E600713_08A1_4BD4_4184_DA392172E2E8"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 89,
  "class": "PanoramaCameraPosition",
  "yaw": -179.03,
  "pitch": -9.2
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_camera"
},
{
 "class": "PlayList",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "items": [
  {
   "media": "this.panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E66597_FF93_9477_41DD_678E7A3E9971",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_camera",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ]
},
{
 "class": "PlayList",
 "id": "DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1_playlist",
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1BMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1BMapPlayer"
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00005",
 "id": "panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A",
 "thumbnailUrl": "media/panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00006",
 "id": "panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289",
 "thumbnailUrl": "media/panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_camera"
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "Large Con",
 "id": "panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099",
 "thumbnailUrl": "media/panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_161ABDBC_0E87_CD74_417C_11BEC14F760A",
  {
   "media": "this.panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4ED4AC7_FF93_FDD7_41D1_0E8894B7F15A_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E66597_FF93_9477_41DD_678E7A3E9971",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0",
   "class": "PanoramaPlayListItem",
   "camera": "this.panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C",
   "class": "PanoramaPlayListItem",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_camera",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00007",
 "id": "panorama_F4E66597_FF93_9477_41DD_678E7A3E9971",
 "thumbnailUrl": "media/panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F27E5D55_FF74_F4CA_41E3_D72EE1D14099_camera"
},
{
 "hfovMax": 96,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00002",
 "id": "panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149",
 "thumbnailUrl": "media/panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00009",
 "id": "panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C",
 "thumbnailUrl": "media/panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00008",
 "id": "panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0",
 "thumbnailUrl": "media/panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "viewerArea": "this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B",
 "class": "MapPlayer",
 "id": "ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1BMapPlayer",
 "movementMode": "constrained"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 4,
 "initialPosition": {
  "hfov": 84,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "hfov": 111,
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_camera"
},
{
 "viewerArea": "this.MainViewer",
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "touchControlMode": "drag_rotation",
 "buttonCardboardView": [
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB"
 ],
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true,
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_rotation"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E481E4_FF93_8FCA_41BB_0FD023083289_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E68D17_FF93_7477_41E2_3B60E92461C0_camera"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_camera"
},
{
 "hfovMax": 113,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00004",
 "id": "panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8",
 "thumbnailUrl": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_t.jpg",
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_1F896E46_0E9A_4F14_4179_69FCF9AA568B"
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4E66597_FF93_9477_41DD_678E7A3E9971_camera"
},
{
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4E55D20_FF93_744A_41C9_14B9E1ECD149"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8"
  }
 ],
 "hfov": 360,
 "label": "Sofa",
 "id": "panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA",
 "thumbnailUrl": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_t.jpg",
 "pitch": 0,
 "partial": false,
 "hfovMax": 88,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_t.jpg"
  }
 ],
 "vfov": 180,
 "mapLocations": [
  {
   "map": "this.map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78",
   "x": 2137.87,
   "class": "PanoramaMapLocation",
   "angle": 177.24,
   "y": 1629.07
  }
 ],
 "overlays": [
  "this.overlay_192CFD75_08A1_3E5D_419B_679CF898ED82",
  "this.overlay_18A09FDD_08A1_DA4C_4192_47DB1468D433",
  "this.overlay_11192F7F_08A1_3A4C_4170_E8A92F46AF5E",
  "this.overlay_1F5D5601_08A1_4DB5_419B_E4D95D1BF131"
 ]
},
{
 "hfovMax": 130,
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/f/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/u/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/r/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/b/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/d/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 4096,
      "colCount": 8,
      "rowCount": 8,
      "height": 4096
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 2048,
      "colCount": 4,
      "rowCount": 4,
      "height": 2048
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_0/l/3/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_t.jpg"
  }
 ],
 "vfov": 180,
 "hfov": 360,
 "label": "office_demo_00003",
 "id": "panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31",
 "thumbnailUrl": "media/panorama_F4E3B0BC_FF93_8DBA_41D3_57B6E02B8F31_t.jpg",
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_F4F9208F_FF9C_8C56_41DA_80189802D06C_camera"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MainViewer",
 "left": 0,
 "playbackBarBottom": 5,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#009999",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 50,
 "toolTipOpacity": 0.5,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 13,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 7,
 "minWidth": 100,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 0,
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 0.53,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": 0,
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 10,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0
 ]
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7",
 "left": "0%",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
  "this.Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
  "this.IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "backgroundImageUrl": "skin/Container_32CC4EA6_16EF_8891_41B3_C36F5FCE49B7.png",
 "minHeight": 1,
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "height": "12.832%",
 "scrollBarMargin": 2,
 "verticalAlign": "top",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "visible",
 "shadow": false,
 "data": {
  "name": "--- MENU"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 115.05,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 641,
 "scrollBarMargin": 2,
 "horizontalAlign": "left",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-- SETTINGS"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#04A3E1",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
  "this.Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--INFO"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
  "this.Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--LOCATION"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--FLOORPLAN"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08",
 "left": "0%",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
  "this.Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "top": "0%",
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.6,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "--CONTACT"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1C24B0E2_095E_7692_419F_6F571A3BF713",
 "left": "0.9%",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B",
  "this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "37.279%",
 "top": "2.31%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "ListFloorPlan"
 },
 "overflow": "scroll",
 "width": "24.141%"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1AE8C9D4_093A_76B6_4184_11C5F3785456",
 "left": "0.6%",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1AA4265A_093B_DDB2_4193_7A4B52DDAC7A"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "height": "89.796%",
 "top": "1.08%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "SofaDetail3D"
 },
 "overflow": "scroll",
 "width": "98.58%"
},
{
 "propagateClick": false,
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_18CC8D9F_0E8A_4D34_415A_2346EF6C0234",
 "left": "2.47%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_18713B29_0E8E_F51D_4183_182212164792",
  "this.IconButton_1852640B_0E8E_531D_4190_3FDDE61FAAC5"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "3.27%",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "85.17%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "overflow": "scroll",
 "width": "90.882%",
 "data": {
  "name": "Video Chair Container"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton FULLSCREEN"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton MUTE"
 }
},
{
 "map": {
  "width": 104.05,
  "x": 2085.85,
  "class": "HotspotMapOverlayMap",
  "image": {
   "levels": [
    {
     "url": "media/map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78_HS_0_map.gif",
     "width": 19,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ],
   "class": "ImageResource"
  },
  "y": 1585.56,
  "offsetY": 0,
  "height": 87.02,
  "offsetX": 0
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 2085.85,
  "class": "HotspotMapOverlayImage",
  "height": 87.02,
  "y": 1585.56,
  "width": 104.05,
  "image": {
   "levels": [
    {
     "url": "media/map_1E282B41_08A3_5BB4_4189_4DB93CC9BA78_HS_0.png",
     "width": 83,
     "class": "ImageResourceLevel",
     "height": 69
    }
   ],
   "class": "ImageResource"
  }
 },
 "useHandCursor": true,
 "class": "AreaHotspotMapOverlay",
 "id": "overlay_1E600713_08A1_4BD4_4184_DA392172E2E8"
},
{
 "media": "this.panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA",
 "class": "PanoramaPlayListItem",
 "camera": "this.panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_camera",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_161ABDBC_0E87_CD74_417C_11BEC14F760A, this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1BMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_161ABDBC_0E87_CD74_417C_11BEC14F760A"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "FloorPlanViewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#009999",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "87%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": "13%",
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "visible": false,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0
 ]
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton HS "
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 37,
 "maxWidth": 49,
 "id": "IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA",
 "width": 49,
 "right": 30,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "bottom": 8,
 "minWidth": 1,
 "mode": "push",
 "height": 37,
 "iconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA.png",
 "rollOverIconURL": "skin/IconButton_30AC9FB1_16E7_88F3_41B2_18944AAAD6FA_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "IconButton VR"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton VR"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 58,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton GYRO"
 }
},
{
 "rollOverDisplay": true,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 54.6,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0_HS_0_0.png",
      "width": 1971,
      "class": "ImageResourceLevel",
      "height": 1050
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.84,
   "roll": 0,
   "yaw": 178.71
  }
 ],
 "id": "overlay_1F896E46_0E9A_4F14_4179_69FCF9AA568B",
 "areas": [
  {
   "click": "this.setComponentVisibility(this.Container_18CC8D9F_0E8A_4D34_415A_2346EF6C0234, true, 0, null, null, false); this.setComponentVisibility(this.WebFrame_18713B29_0E8E_F51D_4183_182212164792, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_1852640B_0E8E_531D_4190_3FDDE61FAAC5, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "Click To Show Video"
  }
 ],
 "maps": [
  {
   "hfov": 54.6,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 178.71,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4E4C64C_FF93_94DA_41D3_A5276541CED8_0_HS_0_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 106
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 7.84
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": true,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Polygon"
 },
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 51.55,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_0_0.png",
      "width": 1844,
      "class": "ImageResourceLevel",
      "height": 1096
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.4,
   "roll": 0,
   "yaw": 46.45
  }
 ],
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_192CFD75_08A1_3E5D_419B_679CF898ED82",
 "maps": [
  {
   "hfov": 51.55,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 46.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_0_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 118
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -31.4
  }
 ]
},
{
 "rollOverDisplay": true,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Polygon"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 53.73,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_1_0.png",
      "width": 1934,
      "class": "ImageResourceLevel",
      "height": 1233
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.23,
   "roll": 0,
   "yaw": -42.8
  }
 ],
 "id": "overlay_18A09FDD_08A1_DA4C_4192_47DB1468D433",
 "areas": [
  {
   "click": "this.setComponentVisibility(this.Container_1AE8C9D4_093A_76B6_4184_11C5F3785456, true, 0, null, null, false); this.setComponentVisibility(this.Container_1AA4265A_093B_DDB2_4193_7A4B52DDAC7A, true, 0, null, null, false); this.setComponentVisibility(this.WebFrame_1AF491AB_093A_B692_4186_46C700B3073F, true, 0, null, null, false); this.setComponentVisibility(this.HTMLText_1A5835A3_093E_5E93_417B_1D4CA9B1D750, true, 0, null, null, false); this.setComponentVisibility(this.IconButton_1D333C42_092A_CD92_419A_6827C3F5E88E, true, 0, null, null, false)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 53.73,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -42.8,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_1_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 127
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -34.23
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Right-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.81,
   "image": "this.AnimatedImageResource_124B4A97_08A0_DADD_4191_76532A3E7D6B",
   "pitch": -15,
   "yaw": 63.48,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_11192F7F_08A1_3A4C_4170_E8A92F46AF5E",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 14.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 63.48,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -15
  }
 ]
},
{
 "enabledInCardboard": true,
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.81,
   "image": "this.AnimatedImageResource_124C4A98_08A0_DAD3_4189_07E871AB550A",
   "pitch": -13.59,
   "yaw": -32.16,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_1F5D5601_08A1_4DB5_419B_E4D95D1BF131",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "maps": [
  {
   "hfov": 11.81,
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -32.16,
   "image": {
    "levels": [
     {
      "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.59
  }
 ]
},
{
 "propagateClick": true,
 "maxHeight": 2,
 "maxWidth": 3000,
 "id": "Image_9511127C_9B79_D2C1_41D8_D080B87BFD84",
 "left": "0%",
 "right": "0%",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_9511127C_9B79_D2C1_41D8_D080B87BFD84.png",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "bottom": 53,
 "minWidth": 1,
 "height": 2,
 "paddingTop": 0,
 "class": "Image",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "data": {
  "name": "white line"
 },
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_9A7696F9_9256_4198_41E2_40E7CF09A427",
 "left": "0%",
 "width": 1199,
 "scrollBarColor": "#000000",
 "children": [
  "this.Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
  "this.Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
  "this.Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
  "this.Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
  "this.Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
  "this.Button_33E0F47E_11C1_A20D_419F_BB809AD89259"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 30,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "minHeight": 1,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 51,
 "bottom": "0%",
 "horizontalAlign": "left",
 "gap": 10,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "-button set container"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "right": "0%",
 "width": 110,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "middle",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "height": 110,
 "horizontalAlign": "center",
 "top": "0%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "button menu sup"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "center",
 "bottom": "0%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "height": "85.959%",
 "scrollBarMargin": 2,
 "gap": 3,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "overflow": "scroll",
 "width": "91.304%",
 "data": {
  "name": "-button set"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_04FF5C2C_1216_7593_41B2_1B5CFADF351D",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_04FF2C2C_1216_7593_4195_88C3C7049763",
  "this.Container_04FF0C2C_1216_7593_419A_8AC354592A51"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "left",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "scroll",
 "shadow": true,
 "propagateClick": true
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_04FF9C2D_1216_75ED_41A8_E3495D8F554E",
 "left": "10%",
 "scrollBarColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A"
 ],
 "borderSize": 0,
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "right",
 "bottom": "84.02%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "7%",
 "horizontalAlign": "center",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "visible",
 "shadow": true,
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_1813AA3E_1663_8BF1_41A2_CA5EE3718362",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
  "this.Container_1813FA3E_1663_8BF1_4180_5027A2A87866"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "left",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "scroll",
 "shadow": true,
 "propagateClick": true
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_1812AA3F_1663_8BEF_41A4_02F566B1BC6D",
 "left": "10%",
 "scrollBarColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1"
 ],
 "borderSize": 0,
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "right",
 "bottom": "80%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "7%",
 "horizontalAlign": "center",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "visible",
 "shadow": true,
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "15%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "borderSize": 0,
 "paddingRight": 10,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 10,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "7%",
 "horizontalAlign": "center",
 "bottom": "7%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 10,
 "backgroundOpacity": 1,
 "paddingTop": 10,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "visible",
 "shadow": true,
 "propagateClick": true
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_0DEF7FEC_12FA_D293_4197_332CA20EDBCF",
 "left": "10%",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
  "this.Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "data": {
  "name": "Global"
 },
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "shadowVerticalLength": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "left",
 "bottom": "5%",
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "shadowBlurRadius": 25,
 "gap": 10,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "paddingTop": 0,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadowOpacity": 0.3,
 "overflow": "scroll",
 "shadow": true,
 "propagateClick": true
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_0DEC1FED_12FA_D26D_41AE_8CE7699C44D8",
 "left": "10%",
 "scrollBarColor": "#000000",
 "right": "10%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4"
 ],
 "borderSize": 0,
 "paddingRight": 20,
 "scrollBarVisible": "rollOver",
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "top": "5%",
 "horizontalAlign": "right",
 "bottom": "84.67%",
 "contentOpaque": false,
 "minWidth": 1,
 "scrollBarMargin": 2,
 "gap": 10,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "Container X global"
 },
 "overflow": "visible",
 "shadow": false
},
{
 "fontFamily": "Arial",
 "backgroundColorRatios": [
  0
 ],
 "arrowColor": "#FFFFFF",
 "textDecoration": "none",
 "id": "DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1",
 "left": "0%",
 "propagateClick": false,
 "data": {
  "name": "DropDownFloorPlan"
 },
 "selectedPopUpBackgroundColor": "#333333",
 "fontColor": "#FFFFFF",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 5,
 "popUpBackgroundColor": "#999999",
 "popUpShadow": false,
 "paddingLeft": 5,
 "popUpBackgroundOpacity": 0.84,
 "backgroundColorDirection": "vertical",
 "minHeight": 20,
 "selectedPopUpFontColor": "#FFFFFF",
 "popUpGap": 0,
 "playList": "this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1_playlist",
 "minWidth": 200,
 "backgroundColor": [
  "#000000"
 ],
 "fontSize": 14,
 "height": "12.914%",
 "top": "0%",
 "gap": 0,
 "popUpShadowBlurRadius": 6,
 "fontStyle": "normal",
 "popUpBorderRadius": 0,
 "popUpShadowOpacity": 0,
 "paddingTop": 0,
 "class": "DropDown",
 "paddingBottom": 0,
 "backgroundOpacity": 0.84,
 "borderRadius": 4,
 "shadow": false,
 "visible": false,
 "popUpShadowColor": "#000000",
 "popUpShadowSpread": 1,
 "fontWeight": "normal",
 "arrowBeforeLabel": false,
 "popUpFontColor": "#000000",
 "rollOverPopUpBackgroundColor": "#FFFFFF"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1AA4265A_093B_DDB2_4193_7A4B52DDAC7A",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "right": "5.53%",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_1AF491AB_093A_B692_4186_46C700B3073F",
  "this.HTMLText_1A5835A3_093E_5E93_417B_1D4CA9B1D750",
  "this.IconButton_1D333C42_092A_CD92_419A_6827C3F5E88E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "horizontalAlign": "left",
 "bottom": "4.4%",
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "scrollBarMargin": 2,
 "height": "88.939%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container3268"
 },
 "overflow": "scroll",
 "width": "88.177%"
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_18713B29_0E8E_F51D_4183_182212164792",
 "left": "0%",
 "propagateClick": false,
 "width": "94.819%",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "//www.youtube.com/embed/YC427llhIHg?controls=0",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "minHeight": 1,
 "bottom": "0.48%",
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "insetBorder": false,
 "height": "90.415%",
 "paddingTop": 0,
 "class": "WebFrame",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "visible": false,
 "data": {
  "name": "Video Chair 01"
 }
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 512,
 "maxWidth": 512,
 "id": "IconButton_1852640B_0E8E_531D_4190_3FDDE61FAAC5",
 "right": "0%",
 "width": 84,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 75,
 "click": "this.setComponentVisibility(this.Container_18CC8D9F_0E8A_4D34_415A_2346EF6C0234, false, 0, null, null, false); this.setComponentVisibility(this.WebFrame_18713B29_0E8E_F51D_4183_182212164792, false, 0, null, null, false); this.setComponentVisibility(this.IconButton_1852640B_0E8E_531D_4190_3FDDE61FAAC5, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_1852640B_0E8E_531D_4190_3FDDE61FAAC5.png",
 "top": "0%",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "visible": false,
 "data": {
  "name": "Close Video"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_124B4A97_08A0_DADD_4191_76532A3E7D6B",
 "levels": [
  {
   "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_2_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "rowCount": 6,
 "frameCount": 24,
 "frameDuration": 41,
 "colCount": 4,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_124C4A98_08A0_DAD3_4189_07E871AB550A",
 "levels": [
  {
   "url": "media/panorama_F4D0F7C2_FF94_93CE_41DD_20CBB3B381AA_0_HS_3_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ]
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_03D37B27_0C7A_63B3_41A1_89572D8C8762",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button house info"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 120,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 0,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "HOUSE INFO",
 "backgroundColor": [
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "rollOverShadow": false,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "iconWidth": 0,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1FDDCF4A_0C0A_23FD_417A_1C14E098FDFD",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button panorama list"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 140,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "PANORAMA LIST",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1CA392FC_0C0A_2295_41A3_18DEA65FB6AD",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button location"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 100,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "LOCATION",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "visible": false,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1FE4B611_0C0A_256F_418E_EA27E66F8360",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button floorplan"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 113,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "FLOORPLAN",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "visible": false,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_1EBF3282_0C0A_1D6D_4190_52FC7F8C00A5",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button photoalbum"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 122,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "PHOTOALBUM",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "visible": false,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "shadowSpread": 1,
 "propagateClick": true,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_33E0F47E_11C1_A20D_419F_BB809AD89259",
 "rollOverBackgroundColor": [
  "#DB9B4D"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "iconBeforeLabel": true,
 "data": {
  "name": "Button contact"
 },
 "shadowColor": "#000000",
 "fontFamily": "Cinzel Bold",
 "fontColor": "#FFFFFF",
 "width": 100,
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "rollOverFontColor": "#DB9B4D",
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 40,
 "fontSize": 14,
 "label": "CONTACT",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "shadowBlurRadius": 15,
 "gap": 5,
 "rollOverBackgroundOpacity": 0,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, true, 0, null, null, false)",
 "fontStyle": "normal",
 "pressedFontColor": "#000000",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#DB9B4D"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "borderRadius": 0,
 "visible": false,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 0,
 "fontWeight": "bold"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "toggle",
 "height": 60,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "image button menu"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 58,
 "click": "this.shareTwitter(window.location.href)",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "visible": false,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton TWITTER"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "width": 43,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 48,
 "click": "if(!this.Container_1C24B0E2_095E_7692_419F_6F571A3BF713.get('visible')){ this.setComponentVisibility(this.Container_1C24B0E2_095E_7692_419F_6F571A3BF713, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_1C24B0E2_095E_7692_419F_6F571A3BF713, false, 0, null, null, false) }; if(!this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B, true, 0, null, null, false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_1F74CC65_095A_CD92_419C_1832A0C7CE1B, false, 0, null, null, false) }; if(!this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1.get('visible')){ this.setComponentVisibility(this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1, true, 0, null, null, false) } else { this.setComponentVisibility(this.DropDown_1C5B3BF1_095A_4A8E_419D_58F0E38402E1, false, 0, null, null, false) }",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.jpg",
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "IconButton FloorPlan"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_04FF2C2C_1216_7593_4195_88C3C7049763",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77"
 ],
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 10,
 "paddingBottom": 10,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "50%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_04FF0C2C_1216_7593_419A_8AC354592A51",
 "propagateClick": true,
 "scrollBarColor": "#0069A3",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
  "this.Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
  "this.Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167"
 ],
 "borderSize": 0,
 "paddingRight": 60,
 "paddingLeft": 60,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 450,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "width": "50%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "iconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_04FE7C2D_1216_75ED_4197_E539B3CD3A95, false, 0, null, null, false)",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_04FE6C2D_1216_75ED_41A3_C531DD2D317A_pressed.png",
 "class": "IconButton",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 90,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "header"
 },
 "overflow": "visible"
},
{
 "scrollBarWidth": 10,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemLabelFontStyle": "normal",
 "scrollBarColor": "#987B55",
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemMode": "normal",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "scrollBarVisible": "rollOver",
 "rollOverItemThumbnailShadowColor": "#987B55",
 "horizontalAlign": "center",
 "paddingLeft": 70,
 "itemMaxHeight": 1000,
 "itemThumbnailOpacity": 1,
 "minHeight": 1,
 "itemLabelFontFamily": "Times New Roman",
 "width": "100%",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "verticalAlign": "middle",
 "itemPaddingRight": 3,
 "minWidth": 1,
 "itemBorderRadius": 0,
 "height": "100%",
 "itemPaddingLeft": 3,
 "selectedItemLabelFontColor": "#987B55",
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "itemHorizontalAlign": "center",
 "itemOpacity": 1,
 "itemBackgroundOpacity": 0,
 "backgroundOpacity": 0,
 "itemThumbnailBorderRadius": 0,
 "itemPaddingTop": 3,
 "itemBackgroundColorRatios": [],
 "propagateClick": true,
 "itemBackgroundColor": [],
 "itemWidth": 220,
 "shadow": false,
 "selectedItemThumbnailShadow": true,
 "itemMinHeight": 50,
 "borderSize": 0,
 "paddingRight": 70,
 "selectedItemLabelFontWeight": "bold",
 "itemLabelFontWeight": "bold",
 "itemLabelTextDecoration": "none",
 "rollOverItemLabelFontColor": "#987B55",
 "rollOverItemThumbnailShadow": true,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "scrollBarMargin": 2,
 "itemLabelFontSize": 14,
 "itemMinWidth": 50,
 "itemThumbnailScaleMode": "fit_outside",
 "itemVerticalAlign": "top",
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "gap": 26,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemBackgroundColorDirection": "vertical",
 "itemThumbnailHeight": 125,
 "paddingTop": 10,
 "itemThumbnailShadow": false,
 "paddingBottom": 70,
 "class": "ThumbnailGrid",
 "borderRadius": 5,
 "itemPaddingBottom": 3,
 "itemLabelGap": 7,
 "data": {
  "name": "ThumbnailList5161"
 },
 "itemThumbnailWidth": 220
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_1813DA3E_1663_8BF1_4193_F28A53801FBC",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E"
 ],
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 10,
 "paddingBottom": 10,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "70%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_1813FA3E_1663_8BF1_4180_5027A2A87866",
 "propagateClick": true,
 "scrollBarColor": "#0069A3",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
  "this.Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
  "this.Container_18128A3F_1663_8BEF_41B6_51D1938FA48A"
 ],
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 40,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 400,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 40,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "width": "30%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "iconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "height": "75%",
 "click": "this.setComponentVisibility(this.Container_1812EA3F_1663_8BEF_41AF_0A4CCC089B5F, false, 0, null, null, false)",
 "width": "25%",
 "rollOverIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_1812DA3F_1663_8BEF_41A5_6E0723037CA1_pressed.png",
 "class": "IconButton",
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 90,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "header"
 },
 "overflow": "visible"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Floor Plan"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "MapViewer",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#009999",
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "class": "ViewerArea",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingRight": 6,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "playbackBarHeadHeight": 15
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "width": "100%",
 "data": {
  "name": "Container photo"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_0DEC9FEC_12FA_D293_41A0_DAD5B350B643",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270"
 ],
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "center",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "middle",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 10,
 "paddingBottom": 10,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "85%",
 "data": {
  "name": "-left"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_0DECBFED_12FA_D26D_41AD_EE1B8CC7BCC8",
 "propagateClick": true,
 "scrollBarColor": "#0069A3",
 "scrollBarOpacity": 0.51,
 "children": [
  "this.Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
  "this.Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
  "this.Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F"
 ],
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 460,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "backgroundOpacity": 1,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "width": "50%",
 "data": {
  "name": "-right"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4",
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 50,
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_0DEC3FED_12FA_D26D_419F_4067E8C6DA08, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4.png",
 "rollOverIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_rollover.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_0DEC0FED_12FA_D26D_41B1_C01AE2D2C1D4_pressed.png",
 "shadow": false,
 "cursor": "hand",
 "data": {
  "name": "X"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_1AF491AB_093A_B692_4186_46C700B3073F",
 "left": "0.1%",
 "propagateClick": false,
 "width": "70.129%",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "https://sketchfab.com/models/f426165b35b74577926b1ab44f3382ab/embed?autospin=1&autostart=1&camera=0&preload=1",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "minHeight": 1,
 "bottom": "0%",
 "minWidth": 1,
 "backgroundColor": [
  "#000000"
 ],
 "insetBorder": false,
 "height": "99.827%",
 "paddingTop": 0,
 "class": "WebFrame",
 "paddingBottom": 0,
 "backgroundOpacity": 0.69,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "WebFrame3546"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "id": "HTMLText_1A5835A3_093E_5E93_417B_1D4CA9B1D750",
 "scrollBarColor": "#000000",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "-0.04%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 20,
 "data": {
  "name": "HTMLText53815"
 },
 "paddingLeft": 20,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "shadowVerticalLength": 3,
 "scrollBarVisible": "rollOver",
 "top": "0%",
 "width": "29.97%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "scrollBarMargin": 2,
 "height": "100%",
 "shadowBlurRadius": 7,
 "class": "HTMLText",
 "paddingBottom": 20,
 "backgroundOpacity": 0.81,
 "paddingTop": 20,
 "shadowSpread": 1,
 "borderRadius": 0,
 "shadow": true,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:53px;\"><B>Sofa</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:33px;\"><B><I>black</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:14px;font-family:Tahoma, Geneva, sans-serif;\">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:33px;\"><B><I>$400.00</I></B></SPAN></SPAN></DIV></div>",
 "shadowOpacity": 0.45,
 "propagateClick": false
},
{
 "transparencyActive": false,
 "propagateClick": false,
 "maxHeight": 233,
 "maxWidth": 216,
 "id": "IconButton_1D333C42_092A_CD92_419A_6827C3F5E88E",
 "right": "0%",
 "width": 62,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "minWidth": 1,
 "mode": "push",
 "height": 59,
 "click": "this.setComponentVisibility(this.Container_1AE8C9D4_093A_76B6_4184_11C5F3785456, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_1D333C42_092A_CD92_419A_6827C3F5E88E.png",
 "top": "0%",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "data": {
  "name": "IconButton5081"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "propagateClick": true,
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77",
 "left": "0%",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_04FF3C2C_1216_7593_41AF_91EA0BBCCE77.jpg",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "width": "100%",
 "verticalAlign": "bottom",
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_04FF1C2C_1216_7593_417B_D7E74ABC91E3",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "width": "100%",
 "gap": 0,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_04FFEC2C_1216_7593_41A4_4CD23AB66B04",
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.Container_095ED5F6_1BEA_B02B_41B1_5247CD8872B4",
  "this.Container_0BD17D93_1236_F6B5_4193_247950F46092",
  "this.Container_04FFDC2C_1216_7593_41A7_64E2588509FB"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 300,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_04FF8C2D_1216_75ED_41A5_B4FCB592F167",
 "propagateClick": true,
 "width": 370,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "paddingLeft": 80,
 "top": "0%",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 36,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.54vh;font-family:'Otama.ep';\"><B>PANORAMA LIST:</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "minWidth": 50,
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.png",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.png",
 "data": {
  "name": "X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "backgroundColorRatios": [
  0
 ],
 "id": "WebFrame_198A3B12_1666_89B6_41B5_4C2585EFD00E",
 "left": "0%",
 "propagateClick": true,
 "right": "0%",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.874102370473!2d2.335449951395685!3d48.860611079186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671d877937b0f%3A0xb975fcfa192f84d4!2sMuseo+del+Louvre!5e0!3m2!1ses!2ses!4v1542366357291\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "scrollEnabled": true,
 "minHeight": 1,
 "bottom": "0%",
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF"
 ],
 "top": "0%",
 "insetBorder": false,
 "paddingTop": 0,
 "class": "WebFrame",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "data": {
  "name": "WebFrame5113"
 },
 "shadow": false
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_18121A3E_1663_8BF1_41B4_AB4C2B45EFFF",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 60,
 "width": "100%",
 "gap": 0,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_18120A3E_1663_8BF1_419D_69232EA5FB3D",
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.Container_00680EBB_1C6A_B01A_41B7_CA8C74B88FBB",
  "this.Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
  "this.HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
  "this.Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 520,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_18128A3F_1663_8BEF_41B6_51D1938FA48A",
 "propagateClick": true,
 "width": 370,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll",
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "paddingLeft": 80,
 "top": "0%",
 "width": "77.115%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 36,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:3.54vh;font-family:'Cinzel Bold';\"><B>floorplan/</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 }
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "right": 20,
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "minWidth": 50,
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.png",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.png",
 "data": {
  "name": "IconButton54739"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "progressBarBorderColor": "#000000",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarBottom": 0,
 "toolTipShadowSpread": 0,
 "playbackBarHeadOpacity": 1,
 "progressBorderColor": "#009999",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "toolTipBorderColor": "#767676",
 "width": "100%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "paddingLeft": 0,
 "minHeight": 1,
 "toolTipOpacity": 1,
 "toolTipShadowBlurRadius": 3,
 "toolTipFontSize": 12,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "playbackBarRight": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "minWidth": 1,
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "toolTipFontWeight": "normal",
 "height": "100%",
 "progressBarBorderSize": 0,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionMode": "blending",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "toolTipShadowHorizontalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "shadow": false,
 "playbackBarBorderSize": 0,
 "toolTipShadowVerticalLength": 0,
 "propagateClick": true,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontStyle": "normal",
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "borderSize": 0,
 "paddingRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "top": "0%",
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowVerticalLength": 0,
 "displayTooltipInTouchScreens": true,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "vrPointerColor": "#FFFFFF",
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "paddingTop": 0,
 "class": "ViewerArea",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "paddingBottom": 0,
 "toolTipPaddingRight": 6,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "toolTipDisplayTime": 600,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "transitionDuration": 500,
 "progressBackgroundColorRatios": [
  0
 ]
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": 165,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "top": "20%",
 "horizontalAlign": "center",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "transparencyActive": false,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "right": 10,
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "middle",
 "top": "20%",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "bottom": "20%",
 "minWidth": 50,
 "mode": "push",
 "width": "14%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand"
},
{
 "transparencyActive": true,
 "propagateClick": true,
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "right": 20,
 "width": 60,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "minWidth": 50,
 "mode": "push",
 "height": 60,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.png",
 "top": 20,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.png",
 "paddingTop": 0,
 "class": "IconButton",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.png",
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "cursor": "hand"
},
{
 "propagateClick": true,
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270",
 "left": "0%",
 "horizontalAlign": "right",
 "borderSize": 0,
 "paddingRight": 0,
 "url": "skin/Image_0DEC8FEC_12FA_D26C_4162_7A2BAB1DA270.jpg",
 "paddingLeft": 0,
 "minHeight": 1,
 "top": "0%",
 "width": "100%",
 "verticalAlign": "middle",
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "scaleMode": "fit_outside",
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Image"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_0DECAFED_12FA_D26D_4191_988031ED4C85",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 0,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "right",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "width": "100%",
 "gap": 0,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container space"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "vertical",
 "id": "Container_0DECDFED_12FA_D26D_41A3_11915FF353DB",
 "propagateClick": true,
 "scrollBarColor": "#E73B2C",
 "scrollBarOpacity": 0.79,
 "children": [
  "this.Container_38BF7F5E_1C3A_D01A_41B5_74C8E50916F2",
  "this.Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
  "this.HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
  "this.Button_0DECFFED_12FA_D26D_419B_F907711405D7"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 300,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 100,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "100%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 30,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container text"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_0DECEFED_12FA_D26D_4184_68D80FD2C88F",
 "propagateClick": true,
 "width": 370,
 "scrollBarColor": "#000000",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "scrollBarOpacity": 0.5,
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "2.54%",
 "horizontalAlign": "left",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "overflow": "scroll",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_095ED5F6_1BEA_B02B_41B1_5247CD8872B4",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0,
 "children": [
  "this.HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "30%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "visible",
 "width": "100%",
 "data": {
  "name": "Container header"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_0BD17D93_1236_F6B5_4193_247950F46092",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": 7,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "horizontal",
 "id": "Container_04FFDC2C_1216_7593_41A7_64E2588509FB",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "children": [
  "this.HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
  "this.HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "75%",
 "gap": 22,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "- content"
 }
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_00680EBB_1C6A_B01A_41B7_CA8C74B88FBB",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0,
 "children": [
  "this.HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
  "this.HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 130,
 "width": "100%",
 "gap": 10,
 "paddingTop": 20,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container header location"
 },
 "overflow": "scroll"
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_18124A3F_1663_8BEF_4167_4F797ED9B565",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": 7,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "line"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "HTMLText_18127A3F_1663_8BEF_4175_B0DF8CE38BFE",
 "scrollBarColor": "#987B55",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 20,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:2.59vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGUE EROS MAGNA, ID BIBENDUM EROS MALESUADA VITAE.</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.54vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> line 2</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> line 3</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">GPS:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> xxxxxxxxxx</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button31015"
 },
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_18126A3F_1663_8BEF_41A4_B0EDA1A5F4E3",
 "propagateClick": true,
 "width": 207,
 "shadowColor": "#000000",
 "fontFamily": "Antonio",
 "fontColor": "#FFFFFF",
 "fontWeight": "bold",
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#987B55"
 ],
 "minWidth": 1,
 "mode": "push",
 "fontSize": 30,
 "label": "BOOK NOW",
 "height": 59,
 "shadowBlurRadius": 6,
 "gap": 5,
 "iconBeforeLabel": true,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "fontStyle": "normal",
 "paddingTop": 0,
 "class": "Button",
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.7,
 "borderRadius": 0,
 "visible": false,
 "rollOverBackgroundOpacity": 1,
 "iconWidth": 32,
 "shadow": false,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1
},
{
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_38BF7F5E_1C3A_D01A_41B5_74C8E50916F2",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0,
 "children": [
  "this.HTMLText_335E39B6_12FA_FEFE_41AA_91C449696299"
 ],
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "minWidth": 1,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "44%",
 "gap": 10,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "borderRadius": 0,
 "shadow": false,
 "overflow": "scroll",
 "width": "100%",
 "data": {
  "name": "Container header contact"
 }
},
{
 "backgroundColorRatios": [
  0
 ],
 "scrollBarWidth": 10,
 "layout": "absolute",
 "id": "Container_30C72FD2_121E_72B7_4185_0FFA7496FDA6",
 "propagateClick": true,
 "scrollBarColor": "#000000",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 1,
 "scrollBarVisible": "rollOver",
 "verticalAlign": "top",
 "horizontalAlign": "left",
 "scrollBarMargin": 2,
 "contentOpaque": false,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": 7,
 "width": "100%",
 "gap": 10,
 "paddingTop": 0,
 "class": "Container",
 "paddingBottom": 0,
 "backgroundOpacity": 1,
 "borderRadius": 0,
 "shadow": false,
 "data": {
  "name": "Container25772"
 },
 "overflow": "scroll"
},
{
 "propagateClick": true,
 "id": "HTMLText_0DECCFED_12FA_D26D_418B_9646D02C4859",
 "scrollBarColor": "#987B55",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.54vh;font-family:'Antonio';\"><B>LOREM IPSUM</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.54vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:3.54vh;font-family:'Antonio';\"><B>CONTACT:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">E-mail:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> Info@loremipsum.com </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Web: </SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">www.loremipsum.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Tlf.:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.5vh;font-family:'Open Sans Semibold';\">Address:</SPAN><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\"> line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Address line 2</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText"
 }
},
{
 "iconBeforeLabel": true,
 "shadowSpread": 1,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "Button31015"
 },
 "layout": "horizontal",
 "textDecoration": "none",
 "id": "Button_0DECFFED_12FA_D26D_419B_F907711405D7",
 "propagateClick": true,
 "shadowColor": "#000000",
 "fontFamily": "Antonio",
 "fontColor": "#FFFFFF",
 "horizontalAlign": "center",
 "borderSize": 0,
 "paddingRight": 0,
 "iconHeight": 32,
 "paddingLeft": 0,
 "backgroundColorDirection": "vertical",
 "minHeight": 30,
 "borderColor": "#000000",
 "verticalAlign": "middle",
 "minWidth": 1,
 "mode": "push",
 "pressedBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#987B55"
 ],
 "fontSize": "3.26vh",
 "label": "BOOK NOW",
 "height": "12%",
 "shadowBlurRadius": 6,
 "gap": 5,
 "rollOverBackgroundOpacity": 1,
 "click": "this.openLink('http://www.loremipsum.com', '_blank')",
 "fontStyle": "normal",
 "paddingTop": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "paddingBottom": 0,
 "backgroundOpacity": 0.7,
 "class": "Button",
 "borderRadius": 0,
 "shadow": false,
 "iconWidth": 32,
 "cursor": "hand",
 "pressedBackgroundOpacity": 1,
 "width": "35%",
 "fontWeight": "bold"
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_04FFCC2C_1216_7593_41A3_D345BDE131A2",
 "left": "0%",
 "scrollBarColor": "#996633",
 "right": "0%",
 "scrollBarOpacity": 0,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.99vh;font-family:'Cinzel Bold';\"><B>LOREM</B></SPAN><SPAN STYLE=\"font-size:5.99vh;font-family:'Otama.ep';\"><B>/</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:10.75vh;font-family:'Cinzel Bold';\"><B>IPSUM</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "data": {
  "name": "HTMLText18899"
 }
},
{
 "propagateClick": true,
 "id": "HTMLText_0B1CF751_121B_B3B2_41AA_8DF6E24BB6F1",
 "scrollBarColor": "#987B55",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "50%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#987b55;font-size:2.59vh;font-family:'Antonio';\"><B>LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT. MAECENAS CONGHE EROS MAGNA.</B></SPAN><SPAN STYLE=\"font-size:1.5vh;\"> </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Proin sit amet pharetra magna. Donec varius eu nisi at facilisis. Vivamus nibh magna, fermentum ac nibh sit amet, euismod efficitur sem. Fusce blandit, purus sed gravida vulputate, justo quam laoreet quam, et dictum mauris arcu vitae justo. </SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Vivamus euismod condimentum ligula quis feugiat. Cras imperdiet tortor mi, a posuere velit tempus et. Maecenas et scelerisque turpis. Quisque in gravida leo, sed dapibus nibh. Ut at consequat turpis. Curabitur et tempor ex, aliquet interdum quam. Aliquam erat volutpat. </SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText12940"
 }
},
{
 "propagateClick": true,
 "id": "HTMLText_04FFBC2C_1216_7593_41A4_E1B06B145F04",
 "scrollBarColor": "#987B55",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "50%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 20,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Integer eget pulvinar urna, et tincidunt sem. Suspendisse imperdiet tincidunt risus id mollis. Vivamus suscipit dui sit amet tortor pellentesque, ac laoreet tortor finibus. Nulla maximus urna id sagittis ultricies. Suspendisse in mi sit amet nisi rutrum sodales non eu elit. Integer cursus, odio nec efficitur fermentum.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.5vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.5vh;font-family:'Open Sans Semibold';\">Ut sed mattis ipsum. Curabitur blandit hendrerit nisi ac feugiat.</SPAN></SPAN></DIV></div>",
 "scrollBarWidth": 10,
 "data": {
  "name": "HTMLText19460"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_18123A3E_1663_8BF1_419F_B7BD72D2053B",
 "left": "0%",
 "scrollBarColor": "#BBD149",
 "right": "0%",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": "0%",
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": 85,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.31vh;font-family:'Cinzel Bold';\"><B>HOUSE</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText23803"
 },
 "shadow": false
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_18125A3F_1663_8BEF_4196_AE566E10BAFC",
 "left": "0%",
 "scrollBarColor": "#BBD149",
 "scrollBarOpacity": 0.5,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "width": "100%",
 "bottom": 0,
 "minWidth": 1,
 "height": 65,
 "scrollBarMargin": 2,
 "paddingTop": 0,
 "class": "HTMLText",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "shadow": false,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:50px;font-family:'Cinzel Bold';\"><B>LOCATION</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText24905"
 }
},
{
 "propagateClick": true,
 "scrollBarWidth": 10,
 "id": "HTMLText_335E39B6_12FA_FEFE_41AA_91C449696299",
 "left": "0%",
 "scrollBarColor": "#BBD149",
 "right": "0%",
 "scrollBarOpacity": 0,
 "borderSize": 0,
 "paddingRight": 0,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "paddingLeft": 0,
 "top": 0,
 "scrollBarMargin": 2,
 "minWidth": 1,
 "height": "100%",
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderRadius": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.99vh;font-family:'Cinzel Bold';\"><B>CONTACT</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:10.75vh;font-family:'Cinzel Bold';\"><B>INFO</B></SPAN></SPAN></DIV></div>",
 "shadow": false,
 "data": {
  "name": "HTMLText23803"
 }
}],
 "width": "100%",
 "data": {
  "name": "Player468"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
