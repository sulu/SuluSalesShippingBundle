define(["sulusalesshipping/util/shippingStatus","sulusalesshipping/util/sidebar","sulusalesorder/util/header","widget-groups"],function(a,b,c,d){"use strict";var e="#shipping-form",f={shippedOrderItems:null},g={accountId:"#account",contactId:"#contact",accountAddressesUrl:"/admin/api/accounts/<%= id %>/addresses",deliveryAddressInstanceName:"delivery-address",validateQuantityWarningTranslation:"salesshipping.shipping.validation.quantityError",validateWarningTranslation:"salesshipping.shipping.validation.error"},h=function(){var b={save:{},"delete":{options:{disabled:!0}}},c={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",title:"workflows.title",dropdownItems:[]},d={confirm:{title:this.sandbox.translate("salesshipping.shippings.confirm"),callback:i.bind(this),disabled:!0},edit:{title:this.sandbox.translate("salesshipping.shippings.edit"),callback:j.bind(this),disabled:!0},ship:{title:this.sandbox.translate("salesshipping.shippings.ship"),callback:k.bind(this),disabled:!0},cancel:{title:this.sandbox.translate("salesshipping.shippings.cancel"),callback:l.bind(this),disabled:!0},divider:{divider:!0}};this.options.data.id&&(this.shippingStatusId===a.CREATED?(b["delete"].options.disabled=!1,d.confirm.disabled=!1):this.shippingStatusId===a.DELIVERY_NOTE?(d.edit.disabled=!1,d.cancel.disabled=!1,d.ship.disabled=!1):this.shippingStatusId===a.SHIPPED&&(d.cancel.disabled=!1),c.dropdownItems.push(d.confirm),c.dropdownItems.push(d.edit),c.dropdownItems.push(d.cancel),c.dropdownItems.push(d.divider),c.dropdownItems.push(d.ship),c.dropdownItems.length>0&&(b.workflows={options:c})),this.sandbox.emit("sulu.header.set-toolbar",{buttons:b})},i=function(){m.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.confirm")})},j=function(){m.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.edit")})},k=function(){m.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.ship")})},l=function(){m.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.cancel")})},m=function(a){if("function"!=typeof a)throw"checkForUnsavedData: callback is not a function";this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.unsaved-changes-confirm",null,a.bind(this))},n=function(){return this.options.data&&this.options.data.status?this.options.data.status.id:null},o=function(){this.sandbox.on("sulu.toolbar.delete",function(){this.sandbox.emit("sulu.salesshipping.shipping.delete",this.options.data.id)},this),this.sandbox.on("sulu.salesshipping.shipping.saved",function(a){this.options.data=a,q.call(this,!0)},this),this.sandbox.on("sulu.toolbar.save",function(){this.submit()},this),this.sandbox.on("husky.toolbar.header.initialized",function(){q.call(this,!this.isNew)}.bind(this)),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesshipping.shippings.list"),this.sandbox.emit("husky.navigation.select-item","sales/shippings")},this),this.sandbox.on("husky.input.expected-delivery-date.initialized",function(){this.dfdExpectedDeliveryDate.resolve()},this),this.sandbox.on("sulu.editable-data-row.delivery-address.initialized",function(){this.dfdDeliveryAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view.delivery-address.changed",function(a){this.options.data.deliveryAddress=a,s.call(this,this.options.data),v.call(this)}.bind(this))},p=function(){var a=this.sandbox.translate("salesshipping.shipping"),b=[{title:"navigation.sales"},{title:"salesshipping.shippings.title",event:"salesshipping.shippings.list"}];this.options.data&&this.options.data.number&&(a+=" #"+this.options.data.number,b.push({title:"#"+this.options.data.number})),this.sandbox.emit("sulu.header.set-title",a),this.sandbox.emit("sulu.header.set-breadcrumb",b)},q=function(a){a!==this.saved&&(a?c.disableSave.call(this):c.enableSave.call(this)),this.saved=a},r=function(a){var b=this.sandbox.form.create(e);b.initialized.then(function(){s.call(this,a,!0),u.call(this,a)}.bind(this))},s=function(a){this.sandbox.form.setData(e,a).then(function(){a.hasOwnProperty("deliveryAddress")&&(this.sandbox.dom.html(this.$find(g.accountId),a.deliveryAddress.accountName),this.sandbox.dom.html(this.$find(g.contactId),a.deliveryAddress.firstName+" "+a.deliveryAddress.lastName))}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},t=function(a){this.sandbox.util.load(this.sandbox.util.template(g.accountAddressesUrl,{id:a.order.customerAccount.id})).then(function(b){var c=b._embedded.addresses,d=null;a&&a.deliveryAddress?d=a.deliveryAddress:a&&a.hasOwnProperty("order")?d=a.order.deliveryAddress:!d&&c.length>0&&(d=c[0]),this.sandbox.data.when(this.dfdDeliveryAddressInitialized).then(function(){this.sandbox.emit("sulu.editable-data-row."+g.deliveryAddressInstanceName+".data.update",c,d),this.options.data.deliveryAddress=d,s.call(this,this.options.data),this.dfdAddressSet.resolve()}.bind(this))}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},u=function(a){this.sandbox.start(e),t.call(this,a)},v=function(){q.call(this,!1)};return{view:!0,layout:{content:{width:"fixed"},sidebar:{width:"max",cssClasses:"sidebar-padding-50"}},templates:["/admin/shipping/template/shipping/form"],initialize:function(){this.options=this.sandbox.util.extend({},f,this.options),this.saved=!0,this.isNew=!this.options.data.id,this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdExpectedDeliveryDate=this.sandbox.data.deferred(),this.dfdDesiredDeliveryDate=this.sandbox.data.deferred(),this.dfdAddressSet=this.sandbox.data.deferred(),this.dfdDeliveryAddressInitialized=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdExpectedDeliveryDate,this.dfdAddressSet).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.shippingStatusId=n.call(this),this.isEditable=!this.shippingStatusId||this.shippingStatusId===a.CREATED,o.call(this),p.call(this),h.call(this),this.render(),this.listenForChange(),this.options.data&&this.options.data.id&&d.exists("shipping-detail")&&b.initForDetail(this.sandbox,this.options.data)},render:function(){var a=this.options.data,b=this.sandbox.util.extend({},{isEditable:this.isEditable,isNew:this.isNew,shippedOrderItems:this.options.shippedOrderItems},a);this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0],b)),r.call(this,a)},submit:function(){var a=this.sandbox.form.getData(e),b=this.isQuantityZero(a);this.sandbox.form.validate(e)&&!b?(""===a.id&&delete a.id,this.sandbox.logger.log("saving shipping",a),this.sandbox.emit("sulu.salesshipping.shipping.save",a)):b?this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(g.validateQuantityWarningTranslation)):this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(g.validateWarningTranslation))},isQuantityZero:function(a){var b=!0;return this.sandbox.util.foreach(a.items,function(a){return parseInt(a.quantity,10)>0?(b=!1,!1):void 0}.bind(this)),b},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(e,"change",v.bind(this),".changeListener select, .changeListener input, .changeListener .husky-select, .changeListener textarea"),this.sandbox.dom.on(e,"keyup",v.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.item-table.changed",v.bind(this))}.bind(this))}}});