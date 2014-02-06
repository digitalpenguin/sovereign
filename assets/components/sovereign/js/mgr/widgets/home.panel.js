Sovereign.panel.Home = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
            html: '<h2>'+_('sovereign.management')+'</h2>'
            ,border: false
            ,cls: 'modx-page-header'
        },{
            xtype: 'modx-tabs'
            ,defaults: { border: false ,autoHeight: true }
            ,border: true
            ,items: [{
                title: _('sovereign.tab_label_african')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,autoScroll: true
                ,autoHeight: true
                ,layout: 'form'
                ,items: [{
                    xtype: 'sovereign-panel-africa'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                    ,bodyStyle: 'padding: 0 10px 0 0'
                }]
            },{
                title: _('sovereign.tab_label_asian')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>Testing the second tab...</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                    xtype: 'sovereign-grid-galleryasia'
                    ,cls: 'main-wrapper'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.tab_label_european')
                ,tooltip: _('')
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<p>Testing the third tab...</p>'
                    ,border: false
                    ,bodyCssClass: 'panel-desc'
                },{
                 xtype: 'sovereign-grid-galleryeurope'
                 ,cls: 'main-wrapper'
                 ,preventRender: true
                 }]
            }]
            // only to redo the grid layout after the content is rendered
            // to fix overflow components' panels, especially when scroll bar is shown up
            ,listeners: {
                'afterrender': function(tabPanel) {
                    tabPanel.doLayout();
                }
            }
        }]
    });
    Sovereign.panel.Home.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.Home,MODx.Panel);
Ext.reg('sovereign-panel-home',Sovereign.panel.Home);