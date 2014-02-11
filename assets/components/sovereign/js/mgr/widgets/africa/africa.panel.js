Sovereign.panel.AfricanPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'form'
        ,items: [{
            xtype: 'modx-vtabs'
            ,activeTab: 0
            ,autoWidth: true
            ,resizable: true
            ,monitorResize:true
            ,deferredRender: false
            ,bodyStyle: 'padding: 0 0 10px 10px'
            ,id: 'africanTabs'
            ,enableTabScroll : true
            ,defaults: {
                bodyCssClass: 'vertical-tabs tabs-sovereign'
                ,autoScroll: true
                ,autoHeight: true
                ,autoWidth: true
                ,layout: 'form'
            }
            ,items: [{
                title: _('sovereign.unconfirmedgallery_label')
                ,id: 'africangalleries-home'
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>'+ _('sovereign.african_new_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryafricansubmissions'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.judgesgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'africangalleries-judges'
                ,items: [{
                    html: '<p>'+ _('sovereign.african_judges_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryafricanjudges'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.publicgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'africangalleries-public'
                ,items: [{
                    html: '<p>'+ _('sovereign.african_public_galleries_desc') +'</p>'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,bodyStyle: 'margin: 10px 0px 10px 0px'
                }/*,{
                 xtype: 'sovereign-grid-judgesgallery_african'
                 ,preventRender: true
                 }*/]
            }]
        }]
    });
    Sovereign.panel.AfricanPanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.AfricanPanel,MODx.Panel);
Ext.reg('sovereign-panel-africa',Sovereign.panel.AfricanPanel);


