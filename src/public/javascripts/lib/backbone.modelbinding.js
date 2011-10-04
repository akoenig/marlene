// Backbone.ModelBinding v0.3.8
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT Liscene
//
// Documentation and Full Licence Availabe at:
// http://github.com/derickbailey/backbone.modelbinding
Backbone.ModelBinding=function(){return{version:"0.3.8",bind:function(a,b){Backbone.ModelBinding.Configuration.configureBindingAttributes(b);var d=a.model,e=Backbone.ModelBinding.Conventions,c;for(c in e)if(e.hasOwnProperty(c)){var g=e[c];g.handler.bind(g.selector,a,d)}Backbone.ModelBinding.Configuration.restoreBindingAttrConfig()},unbind:function(a){var b=a.model,d=Backbone.ModelBinding.Conventions,e;for(e in d)if(d.hasOwnProperty(e)){var c=d[e],g=c.handler,c=c.selector;g.unbind&&g.unbind(c,a,b)}}}}();
Backbone.ModelBinding.Configuration=function(){var a={text:"id",textarea:"id",password:"id",radio:"name",checkbox:"id",select:"id"};return{configureBindingAttributes:function(b){b&&(this.storeBindingAttrConfig(),b.all&&(this.configureAllBindingAttributes(b.all),delete b.all),_.extend(a,b))},configureAllBindingAttributes:function(b){this.storeBindingAttrConfig();a.text=b;a.textarea=b;a.password=b;a.radio=b;a.checkbox=b;a.select=b},storeBindingAttrConfig:function(){this._config=_.clone(a)},restoreBindingAttrConfig:function(){if(this._config)a=
this._config,delete this._config},getBindingAttr:function(b){return a[b]},getBindingValue:function(a,d){var e=this.getBindingAttr(d);return a.attr(e)}}}();
Backbone.ModelBinding.StandardBinding=function(){var a={_getElementType:function(a){var d=a[0].tagName.toLowerCase();if(d=="input"&&(d=a.attr("type"),d==void 0||d==""))d="text";return d},_modelChange:function(a,d){this.element.val(d)}};a.unbind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),c=Backbone.ModelBinding.Configuration.getBindingValue(c,a._getElementType(c));e.unbind("change:"+c,a._modelChange)})};a.bind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),b=Backbone.ModelBinding.Configuration.getBindingValue(c,
a._getElementType(c));e.bind("change:"+b,a._modelChange,{element:c});c.bind("change",function(c){var a={};a[b]=d.$(c.target).val();e.set(a)});var f=e.get(b);typeof f!=="undefined"&&f!==null&&c.val(f)})};return a}();
Backbone.ModelBinding.SelectBoxBinding=function(){var a={_modelChange:function(a,d){this.element.val(d)}};a.unbind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),c=Backbone.ModelBinding.Configuration.getBindingValue(c,"select");e.unbind("change:"+c,a._modelChange)})};a.bind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),b=Backbone.ModelBinding.Configuration.getBindingValue(c,"select");e.bind("change:"+b,a._modelChange,{element:c});c.bind("change",function(c){var a={},c=d.$(c.target);
a[b]=c.val();a[b+"_text"]=c.find(":selected").text();e.set(a)});var f=e.get(b);typeof f!=="undefined"&&f!==null&&c.val(f)})};return a}();
Backbone.ModelBinding.RadioGroupBinding=function(){var a={_modelChange:function(a,d){this.view.$("input[type=radio]["+this.bindingAttr+"="+this.group_name+"][value="+d+"]").attr("checked","checked")}};a.unbind=function(b,d,e){var c=[];d.$(b).each(function(){var b=d.$(this),b=Backbone.ModelBinding.Configuration.getBindingValue(b,"radio");c[b]||(c[b]=!0,Backbone.ModelBinding.Configuration.getBindingAttr("radio"),e.unbind("change:"+b,a._modelChange))})};a.bind=function(b,d,e){var c=[];d.$(b).each(function(){var b=
d.$(this),f=Backbone.ModelBinding.Configuration.getBindingValue(b,"radio");if(!c[f]){c[f]=!0;b=Backbone.ModelBinding.Configuration.getBindingAttr("radio");e.bind("change:"+f,a._modelChange,{bindingAttr:b,group_name:f,view:d});d.$("input[type=radio]["+b+"="+f+"]").bind("change",function(c){c=d.$(c.currentTarget);if(c.attr("checked")){var a={};a[f]=c.val();e.set(a)}});var h=e.get(f);typeof h!=="undefined"&&h!==null&&d.$("input[type=radio]["+b+"="+f+"][value="+h+"]").attr("checked","checked")}})};return a}();
Backbone.ModelBinding.CheckboxBinding=function(){var a={_modelChange:function(a,d){d?this.element.attr("checked","checked"):this.element.removeAttr("checked")}};a.unbind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),c=Backbone.ModelBinding.Configuration.getBindingValue(c,"checkbox");e.unbind("change:"+c,a._modelChange)})};a.bind=function(b,d,e){d.$(b).each(function(){var c=d.$(this),b=Backbone.ModelBinding.Configuration.getBindingValue(c,"checkbox");e.bind("change:"+b,a._modelChange,{element:c});
c.bind("change",function(c){var a={},c=d.$(c.target).attr("checked")?!0:!1;a[b]=c;e.set(a)});if(e.attributes.hasOwnProperty(b)){var f=e.get(b);typeof f!=="undefined"&&f!==null&&f!=!1?c.attr("checked","checked"):c.removeAttr("checked")}})};return a}();
Backbone.ModelBinding.DataBindBinding=function(){var a={},b={"default":""};Backbone.ModelBinding.Configuration.dataBindSubst=function(a){this.storeDataBindSubstConfig();_.extend(b,a)};Backbone.ModelBinding.Configuration.storeDataBindSubstConfig=function(){Backbone.ModelBinding.Configuration._dataBindSubstConfig=_.clone(b)};Backbone.ModelBinding.Configuration.restoreDataBindSubstConfig=function(){if(Backbone.ModelBinding.Configuration._dataBindSubstConfig)b=Backbone.ModelBinding.Configuration._dataBindSubstConfig,
delete Backbone.ModelBinding.Configuration._dataBindSubstConfig};Backbone.ModelBinding.Configuration.getDataBindSubst=function(a,e){var c=e;e===void 0&&(c=b.hasOwnProperty(a)?b[a]:b["default"]);return c};a._modelChange=function(d,b){a._setOnElement(this.element,this.elementAttr,b)};a._setOnElement=function(a,b,c){c=Backbone.ModelBinding.Configuration.getDataBindSubst(b,c);switch(b){case "html":a.html(c);break;case "text":a.text(c);break;case "enabled":a.attr("disabled",!c);break;case "displayed":a.css("display",
c?"block":"none");break;case "hidden":a.css("display",c?"none":"block");break;default:a.attr(b,c)}};a._splitBindingAttr=function(a){var b=[],a=a.attr("data-bind").split(";");_.each(a,function(a){a=$.trim(a).split(" ");a.length==1&&a.unshift("text");b.push({elementAttr:a[0],modelAttr:a[1]})});return b};a.bind=function(b,e,c){e.$(b).each(function(){var b=e.$(this),d=a._splitBindingAttr(b);_.each(d,function(d){c.bind("change:"+d.modelAttr,a._modelChange,{element:b,elementAttr:d.elementAttr});a._setOnElement(b,
d.elementAttr,c.get(d.modelAttr))})})};a.unbind=function(b,e,c){e.$(b).each(function(){var b=e.$(this),b=a._splitBindingAttr(b);_.each(b,function(b){c.unbind("change:"+b.modelAttr,a._modelChange)})})};return a}();
Backbone.ModelBinding.Conventions=function(){return{text:{selector:"input:text",handler:Backbone.ModelBinding.StandardBinding},textarea:{selector:"textarea",handler:Backbone.ModelBinding.StandardBinding},password:{selector:"input:password",handler:Backbone.ModelBinding.StandardBinding},radio:{selector:"input:radio",handler:Backbone.ModelBinding.RadioGroupBinding},checkbox:{selector:"input:checkbox",handler:Backbone.ModelBinding.CheckboxBinding},select:{selector:"select",handler:Backbone.ModelBinding.SelectBoxBinding},
databind:{selector:"*[data-bind]",handler:Backbone.ModelBinding.DataBindBinding}}}();