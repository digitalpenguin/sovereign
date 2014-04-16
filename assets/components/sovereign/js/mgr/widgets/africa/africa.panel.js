Sovereign.panel.AfricanPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,id: 'sovereign-panel-africa'
        ,baseCls: 'modx-formpanel'
        ,cls: 'form' // changing this to container affects the margins
        ,items: [{
            xtype: 'modx-vtabs'
            ,activeTab: 0
            ,autoWidth: true
            ,resizable: true
            ,monitorResize:true
            ,deferredRender: false
            ,bodyStyle: 'padding: 0 10px 10px 10px; min-height:700px;'
            ,id: 'africanTabs'
            ,enableTabScroll : true
            ,defaults: {
                bodyCssClass: 'vertical-tabs tabs-sovereign'
                ,autoScroll: false
                ,autoHeight: true
                ,layout: 'form'
            }
            ,listeners: {
                'tabchange': function(tabPanel, tab) {
                    //if (Ext.get(tab.ownerCt.getTabEl(tab)).isVisible() == 0) {
                        Ext.getCmp('sovereign-grid-galleryafricansubmissions').refresh();
                    //}
                }
            }
            ,items: [{
                title: _('sovereign.submissionsgallery_label')
                ,id: 'african-panel-submissions'
                ,defaults: { autoHeight: true, autoWidth: true }
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_african_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>'
                    ,id: 'sovereign-galleryafrican-submissions-header'
                    ,border: true
                    ,bodyCssClass: 'panel-desc'
                    ,style: 'margin: 10px 0px 10px 0px'
                },{
                    xtype: 'sovereign-grid-galleryafricansubmissions'
                    ,preventRender: true
                }]
            },{
                title: _('sovereign.judgesgallery_label')
                ,defaults: { autoHeight: true }
                ,id: 'african-panel-judges'
                ,items: [{
                    html: '<h3>'+_('sovereign.tab_heading_african_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>'
                    ,id: 'sovereign-galleryafrican-judges-header'
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
                ,id: 'african-panel-public'
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
    replaceSubmissionsGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-africanartworksubmissions')) { // stop double clicks
            var africanTabs = Ext.getCmp('africanTabs');
            var activeMainAfricanTab = africanTabs.getActiveTab();
            var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
            var submissionsGridHeader = Ext.getCmp('sovereign-galleryafrican-submissions-header');
            submissionsGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AfricanArtworkSubmissions;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                submissionsGridHeader.update('<h3>'+ row.get('galleryname')+' - Pending Artworks</h3><p>'+ _('sovereign.submissions_artworks_desc') +'</p>');
                activeMainAfricanTab.add(artworkGrid);
                activeMainAfricanTab.doLayout();
                /*artworkGrid.getEl().slideIn('r', {
                    easing: 'easeIn',
                    duration:.3,
                    useDisplay: false
                });*/
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToSubmissionsGrid: function() {
        var tabs = Ext.getCmp('africanTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-africanartworksubmissions');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
        var submissionsGridHeader = Ext.getCmp('sovereign-galleryafrican-submissions-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            submissionsGridHeader.update('<h3>'+_('sovereign.tab_heading_african_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>');
            tab.remove(artworkGrid);
            tab.add(submissionsGrid);
            tab.doLayout();
            submissionsGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            submissionsGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect
    },replaceJudgesGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-africanartworkjudges')) { // stop double clicks
            var africanTabs = Ext.getCmp('africanTabs');
            var activeMainAfricanTab = africanTabs.getActiveTab();
            var judgesGrid = Ext.getCmp('sovereign-grid-galleryafricanjudges');
            var judgesGridHeader = Ext.getCmp('sovereign-galleryafrican-judges-header');
            judgesGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AfricanArtworkJudges;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                judgesGridHeader.update('<h3>'+ row.get('galleryname')+' - Judges\' Gallery Artworks</h3><p>'+ _('sovereign.judges_artworks_desc') +'</p>');
                activeMainAfricanTab.add(artworkGrid);
                activeMainAfricanTab.doLayout();
                /*artworkGrid.getEl().slideIn('r', {
                 easing: 'easeIn',
                 duration:.3,
                 useDisplay: false
                 });*/
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToJudgesGrid: function() {
        var tabs = Ext.getCmp('africanTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-africanartworkjudges');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var judgesGrid = Ext.getCmp('sovereign-grid-galleryafricanjudges');
        var judgesGridHeader = Ext.getCmp('sovereign-galleryafrican-judges-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            judgesGridHeader.update('<h3>'+_('sovereign.tab_heading_african_judges')+'</h3><p>'+ _('sovereign.judges_galleries_desc') +'</p>');
            tab.remove(artworkGrid);
            tab.add(judgesGrid);
            tab.doLayout();
            judgesGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            judgesGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    },replacePublicGrid: function(grid, row, galleryId) {
        if (!Ext.getCmp('sovereign-grid-africanartworksubmissions')) { // stop double clicks
            var africanTabs = Ext.getCmp('africanTabs');
            var activeMainAfricanTab = africanTabs.getActiveTab();
            var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
            var submissionsGridHeader = Ext.getCmp('sovereign-galleryafrican-submissions-header');
            submissionsGrid.getEl().ghost('l', {
                easing: 'easeOut',
                duration:.3,
                remove: true,
                useDisplay: true
            });


            var artworkGrid = new Sovereign.grid.AfricanArtworkSubmissions;
            artworkGrid.passGalleryId(galleryId); // pass id of selected gallery
            var slideGridIn = new Ext.util.DelayedTask(function(){ // define delay
                submissionsGridHeader.update('<h3>'+ row.get('galleryname')+' - Pending Artworks</h3><p>'+ _('sovereign.submissions_artworks_desc') +'</p>');
                activeMainAfricanTab.add(artworkGrid);
                activeMainAfricanTab.doLayout();
                /*artworkGrid.getEl().slideIn('r', {
                 easing: 'easeIn',
                 duration:.3,
                 useDisplay: false
                 });*/
            });
            slideGridIn.delay(350); // keep delay slightly longer than effect
        } else {
            //do nothing here (to stop more than one grid loading)
        }
    },backToPublicGrid: function() {
        var tabs = Ext.getCmp('africanTabs');
        var tab = tabs.getActiveTab();
        var artworkGrid = Ext.getCmp('sovereign-grid-africanartworksubmissions');
        artworkGrid.getEl().ghost('r', {
            easing: 'easeOut',
            duration:.3,
            remove: true,
            useDisplay: true
        });

        var submissionsGrid = Ext.getCmp('sovereign-grid-galleryafricansubmissions');
        var submissionsGridHeader = Ext.getCmp('sovereign-galleryafrican-submissions-header');
        var slideGridOut = new Ext.util.DelayedTask(function(){
            submissionsGridHeader.update('<h3>'+_('sovereign.tab_heading_african_submissions')+'</h3><p>'+ _('sovereign.submissions_galleries_desc') +'</p>');
            tab.remove(artworkGrid);
            tab.add(submissionsGrid);
            tab.doLayout();
            submissionsGrid.getEl().slideIn('l', {
                easing: 'easeIn',
                duration:.3,
                scope: this
            });
            artworkGrid.destroy();
            submissionsGrid.refresh();
        });
        slideGridOut.delay(350); // keep delay slightly longer than effect

    }
});
Ext.reg('sovereign-panel-africa',Sovereign.panel.AfricanPanel);