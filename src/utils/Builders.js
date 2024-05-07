/*
    Baileys MessageBuilder by github.com/ZTRdiamond
    ------------------------------------------------------
    Source: https://github.com/ZanixonGroup/amira-bot-base
    | Don't delete this credit!
*/

import _ from "lodash";

export class MessageBuilder {
  constructor(){
    this.message = {
      contextInfo: {
        externalAdReply: {
          mediaType: 1,
          previewType: 0
        }
      }
    };
  }
  
  setText(text) {
    _.set(this.message, 'text', text);
    return this;
  }
  
  setCaption(caption) {
    _.set(this.message, 'caption', caption);
    return this;
  }
  
  setImage(image) {
    _.set(this.message, 'image', image);
    return this;
  }
  
  setVideo(video) {
    _.set(this.message, 'video', video);
    return this;
  }
  
  setAudio(audio) {
    _.set(this.message, 'audio', audio);
    return this;
  }
  
  setDocument(document) {
    _.set(this.message, 'document', document);
    return this;
  }
  
  setMimetype(mimetype) {
    _.set(this.message, 'mimetype', mimetype);
    return this;
  }
  
  setMentions(mentions) {
    _.set(this.message, 'mentions', mentions);
    _.set(this.message, 'contextInfo.mentionedJid', mentions);
    return this;
  }
  
  setForwardingScore(score = 5) {
    _.set(this.message, "contextInfo.forwardingScore", score);
    return this;
  }
  
  setForwarded(status = false) {
    _.set(this.message, "contextInfo.isForwarded", status);
    return this;
  }
  
  setThumbnailTitle(title) {
    _.set(this.message, 'contextInfo.externalAdReply.title', title);
    return this;
  }
  
  setThumbnailBody(body) {
    _.set(this.message, 'contextInfo.externalAdReply.body', body);
    return this;
  }
  
  setThumbnailAds(ads = false) {
    _.set(this.message, 'contextInfo.externalAdReply.showAdAttribution', ads);
    return this;
  }
  
  setThumbnailMediaUrl(url) {
    _.set(this.message, 'contextInfo.externalAdReply.mediaUrl', url);
    return this;
  }
  
  setThumbnailImage(image) {
    if(typeof image === "string") {
      _.set(this.message, 'contextInfo.externalAdReply.thumbnailUrl', image);
    } else {
      _.set(this.message, 'contextInfo.externalAdReply.thumbnail', image);
    }
    return this;
  }
  
  setThumbnailLarge() {
    _.set(this.message, 'contextInfo.externalAdReply.renderLargerThumbnail', true);
    return this;
  }
  
  setThumbnailSmall() {
    _.set(this.message, 'contextInfo.externalAdReply.renderLargerThumbnail', false);
    return this;
  }
  
  setThumbnailUrl(url) {
    _.set(this.message, 'contextInfo.externalAdReply.sourceUrl', url);
    return this;
  }
  
  setThumbnailMediatype(type = 1) {
    _.set(this.message, 'contextInfo.externalAdReply.mediaType', type);
    return this;
  }
  
  setThumbnailPreviewtype(type = "PHOTO") {
    _.set(this.message, 'contextInfo.externalAdReply.previewType', type);
    return this;
  }
  
  setNewsletterJid(jid) {
    _.set(this.message, 'contextInfo.forwardedNewsletterMessageInfo.newsletterJid', jid);
    return this;
  }
  
  setNewsletterName(name) {
    _.set(this.message, 'contextInfo.forwardedNewsletterMessageInfo.newsletterName', name);
    return this;
  }
  
  setNewsletterServerMessageId(id = 125) {
    _.set(this.message, 'contextInfo.forwardedNewsletterMessageInfo.serverMessageId', id);
    return this;
  }
  
  build() {
    return _.cloneDeep(this.message);
  }
}