Sovereign.panel.AfricanArtworksPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,id: 'sovereign-panel-african-artworks'
        ,cls: 'form'
        ,items: [{
            title: _('sovereign.submissionsgallery_artworks_label')
            ,id: 'sovereign-panel-african-artworks'
            ,defaults: { autoHeight: true }
            ,items: [{
                html: '<h3>'+_('sovereign.tab_heading_african_submissions_artworks')+'</h3><p>'+ _('sovereign.submissions_galleries_artworks_desc') +'</p>'
                ,border: true
                ,bodyCssClass: 'panel-desc'
                ,bodyStyle: 'margin: 10px 0px 10px 0px'
            },{
                xtype: 'sovereign-grid-africanartworks'
                ,preventRender: true
            }]
        }]
    });
    Sovereign.panel.AfricanArtworksPanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.AfricanArtworksPanel,MODx.Panel);
Ext.reg('sovereign-panel-african-artworks',Sovereign.panel.AfricanArtworksPanel);