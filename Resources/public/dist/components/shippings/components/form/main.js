define(["sulusalesshipping/util/shippingStatus","sulusalesshipping/util/sidebar"],function(a,b){"use strict";var c="#shipping-form",d={shippedOrderItems:null},e={accountId:"#account",contactId:"#contact",accountAddressesUrl:"/admin/api/accounts/<%= id %>/addresses",deliveryAddressInstanceName:"delivery-address",validateWarningTranslation:""},f=function(){var b=[{id:"save-button",icon:"floppy-o",iconSize:"large","class":"highlight",position:1,group:"left",disabled:!0,callback:function(){this.sandbox.emit("sulu.header.toolbar.save")}.bind(this)}],c={icon:"hand-o-right",iconSize:"large",group:"left",id:"workflow",position:40,items:[]},d={confirm:{title:this.sandbox.translate("salesshipping.shippings.confirm"),callback:g.bind(this)},edit:{title:this.sandbox.translate("salesshipping.shippings.edit"),callback:h.bind(this)},ship:{title:this.sandbox.translate("salesshipping.shippings.ship"),callback:i.bind(this)},cancel:{title:this.sandbox.translate("salesshipping.shippings.cancel"),callback:j.bind(this)},divider:{divider:!0}};this.options.data.id&&(this.shippingStatusId===a.CREATED?c.items.push(d.confirm):this.shippingStatusId===a.DELIVERY_NOTE?(c.items.push(d.edit),c.items.push(d.cancel),c.items.push(d.divider),c.items.push(d.ship)):this.shippingStatusId===a.SHIPPED&&c.items.push(d.cancel),c.items.length>0&&b.push(c)),this.sandbox.emit("sulu.header.set-toolbar",{template:b})},g=function(){k.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.confirm")})},h=function(){k.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.edit")})},i=function(){k.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.ship")})},j=function(){k.call(this,function(){this.sandbox.emit("sulu.salesshipping.shipping.cancel")})},k=function(a){if("function"!=typeof a)throw"checkForUnsavedData: callback is not a function";this.saved?a.call(this):this.sandbox.emit("sulu.overlay.show-warning","sulu.overlay.be-careful","sulu.overlay.unsaved-changes-confirm",null,a.bind(this))},l=function(){return this.options.data&&this.options.data.status?this.options.data.status.id:null},m=function(){this.sandbox.on("sulu.header.toolbar.delete",function(){this.sandbox.emit("sulu.salesshipping.shipping.delete",this.options.data.id)},this),this.sandbox.on("sulu.salesshipping.shipping.saved",function(a){this.options.data=a,o.call(this,!0)},this),this.sandbox.on("sulu.header.toolbar.save",function(){this.submit()},this),this.sandbox.on("husky.toolbar.header.initialized",function(){o.call(this,!this.isNew)}.bind(this)),this.sandbox.on("sulu.header.back",function(){this.sandbox.emit("sulu.salesshipping.shippings.list"),this.sandbox.emit("husky.navigation.select-item","sales/shippings")},this),this.sandbox.on("husky.input.expected-delivery-date.initialized",function(){this.dfdExpectedDeliveryDate.resolve()},this),this.sandbox.on("sulu.editable-data-row.delivery-address.initialized",function(){this.dfdDeliveryAddressInitialized.resolve()}.bind(this)),this.sandbox.on("sulu.editable-data-row.address-view.delivery-address.changed",function(a){this.options.data.deliveryAddress=a,q.call(this,this.options.data),t.call(this)}.bind(this))},n=function(){var a=this.sandbox.translate("salesshipping.shipping"),b=[{title:"navigation.sales"},{title:"salesshipping.shippings.title",event:"salesshipping.shippings.list"}];this.options.data&&this.options.data.number&&(a+=" #"+this.options.data.number,b.push({title:"#"+this.options.data.number})),this.sandbox.emit("sulu.header.set-title",a),this.sandbox.emit("sulu.header.set-breadcrumb",b)},o=function(a){if(a!==this.saved){var b=this.options.data&&this.options.data.id?"edit":"add";this.sandbox.emit("sulu.header.toolbar.state.change",b,a,!0)}this.saved=a},p=function(a){var b=this.sandbox.form.create(c);b.initialized.then(function(){q.call(this,a,!0),s.call(this,a)}.bind(this))},q=function(a){this.sandbox.form.setData(c,a).then(function(){a.hasOwnProperty("deliveryAddress")&&(this.sandbox.dom.html(this.$find(e.accountId),a.deliveryAddress.accountName),this.sandbox.dom.html(this.$find(e.contactId),a.deliveryAddress.firstName+" "+a.deliveryAddress.lastName))}.bind(this)).fail(function(a){this.sandbox.logger.error("An error occured when setting data!",a)}.bind(this))},r=function(a){this.sandbox.util.load(this.sandbox.util.template(e.accountAddressesUrl,{id:a.order.account.id})).then(function(b){var c=b._embedded.addresses,d=null;a&&a.deliveryAddress?d=a.deliveryAddress:a&&a.hasOwnProperty("order")?d=a.order.deliveryAddress:!d&&c.length>0&&(d=c[0]),this.sandbox.data.when(this.dfdDeliveryAddressInitialized).then(function(){this.sandbox.emit("sulu.editable-data-row."+e.deliveryAddressInstanceName+".data.update",c,d),this.options.data.deliveryAddress=d,q.call(this,this.options.data),this.dfdAddressSet.resolve()}.bind(this))}.bind(this)).fail(function(a,b){this.sandbox.logger.error(a,b)}.bind(this))},s=function(a){this.sandbox.start(c),r.call(this,a)},t=function(){o.call(this,!1)};return{view:!0,layout:{sidebar:{width:"fixed",cssClasses:"sidebar-padding-50"}},templates:["/admin/shipping/template/shipping/form"],initialize:function(){this.options=this.sandbox.util.extend({},d,this.options),this.saved=!0,this.isNew=!this.options.data.id,this.dfdAllFieldsInitialized=this.sandbox.data.deferred(),this.dfdExpectedDeliveryDate=this.sandbox.data.deferred(),this.dfdDesiredDeliveryDate=this.sandbox.data.deferred(),this.dfdAddressSet=this.sandbox.data.deferred(),this.dfdDeliveryAddressInitialized=this.sandbox.data.deferred(),this.sandbox.data.when(this.dfdExpectedDeliveryDate,this.dfdAddressSet).then(function(){this.dfdAllFieldsInitialized.resolve()}.bind(this)),this.shippingStatusId=l.call(this),this.isEditable=!this.shippingStatusId||this.shippingStatusId===a.CREATED,m.call(this),n.call(this),f.call(this),this.render(),this.listenForChange(),this.options.data&&this.options.data.id&&b.initForDetail(this.sandbox,this.options.data)},render:function(){var a=this.options.data,b=this.sandbox.util.extend({},{isEditable:this.isEditable,isNew:this.isNew,shippedOrderItems:this.options.shippedOrderItems},a);this.sandbox.dom.html(this.$el,this.renderTemplate(this.templates[0],b)),p.call(this,a)},submit:function(){if(this.sandbox.logger.log("save Model"),this.sandbox.form.validate(c)){var a=this.sandbox.form.getData(c);""===a.id&&delete a.id,this.sandbox.logger.log("log data",a),this.sandbox.emit("sulu.salesshipping.shipping.save",a)}else this.sandbox.emit("sulu.labels.warning.show",this.sandbox.translate(e.validateWarningTranslation))},listenForChange:function(){this.sandbox.data.when(this.dfdAllFieldsInitialized).then(function(){this.sandbox.dom.on(c,"change",t.bind(this),".changeListener select, .changeListener input, .changeListener .husky-select, .changeListener textarea"),this.sandbox.dom.on(c,"keyup",t.bind(this),".changeListener select, .changeListener input, .changeListener textarea"),this.sandbox.on("sulu.item-table.changed",t.bind(this))}.bind(this))}}});