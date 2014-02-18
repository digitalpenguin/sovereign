Sovereign.panel.AfricanPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,id: 'sovereign-panel-africa'
        ,cls: 'form'
        ,items: [{
            xtype: 'modx-vtabs'
            ,activeTab: 0
            ,autoWidth: true
            ,resizable: true
            ,monitorResize:true
            ,deferredRender: false
            ,bodyStyle: 'padding: 0 0 10px 10px; min-height:360px;'
            ,id: 'africanTabs'
            ,enableTabScroll : true
            ,defaults: {
                bodyCssClass: 'vertical-tabs tabs-sovereign'
                ,autoScroll: false
                ,autoHeight: true
                ,layout: 'form'
            }
            ,items: [{
                title: _('sovereign.submissionsgallery_label')
                ,id: 'africangalleries-submissions'
                ,defaults: { autoHeight: true }
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_african_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>'
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
                    html: '<h3>'+_('sovereign.tab_heading_african_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>'
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
                    html: '<h3>'+_('sovereign.tab_heading_african_public')+'</h3><p>'+ _('sovereign.public_galleries_desc') +'</p>'
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
Ext.extend(Sovereign.panel.AfricanPanel,MODx.Panel,{
    replaceSubmissionsGrid: function(grid, row, id) {
        var africanTabs = Ext.getCmp('africanTabs');
        var activeMainAfricanTab = africanTabs.getActiveTab();
        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
        submissionsGrid.getEl().ghost('l', {
            easing: 'easeOut',
            duration:.3,
            remove: false,
            useDisplay: true
        });

        var artworkGrid = new Sovereign.grid.AfricanArtworks;
        var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
            activeMainAfricanTab.add(artworkGrid);
            artworkGrid.filterByGalleryId(id);
            activeMainAfricanTab.doLayout();
            artworkGrid.getEl().slideIn('r', {
                easing: 'easeIn',
                duration:.3,
                useDisplay: true
            });
        });
        slideGridIn.delay(350); // keep delay slightly longer than effect

    },backToSubmissionsGrid: function() {
        var tabs = Ext.getCmp('africanTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-africanartworks');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            tab.add(submissionsGrid);
            submissionsGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                useDisplay: true
            });
            tab.doLayout();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    }
});
Ext.reg('sovereign-panel-africa',Sovereign.panel.AfricanPanel);