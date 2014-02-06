Sovereign.grid.GalleryAfricanJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryafricanjudges'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryafrican/getList' }
        ,fields: ['id','galleryname','year','menu']
        ,paging: true
        ,remoteSort: true
        ,autoExpandColumn: 'galleryname'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 60
        },{
            header: _('sovereign.galleryname')
            ,dataIndex: 'galleryname'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        },{
            header: _('sovereign.year')
            ,dataIndex: 'year'
            ,sortable: true
            ,width: 100
            ,editor: { xtype: 'textfield' }
        }]
        ,tbar:['->',{
            xtype: 'textfield'
            ,id: 'galleryafricanjudges-search-filter'
            ,emptyText: _('sovereign.search...')
            ,listeners: {
                'change': {fn:this.search,scope:this}
                ,'render': {fn: function(cmp) {
                    new Ext.KeyMap(cmp.getEl(), {
                        key: Ext.EventObject.ENTER
                        ,fn: function() {
                            this.fireEvent('change',this);
                            this.blur();
                            return true;
                        }
                        ,scope: cmp
                    });
                },scope:this}
            }
        },{
            xtype: 'button'
            ,id: 'modx-filter-clear-galleryafricanjudges'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAfricanJudges.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryAfricanJudges,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/galleryafrican/getList'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryafricanjudges-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryAfricanJudges
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAfricanJudges
        }];
    },updateGalleryAfricanJudges: function(btn,e) {
        if (!this.updateGalleryWindow) {
            this.updateGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryafricanjudges-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryWindow.setValues(this.menu.record);
        this.updateGalleryWindow.show(e.target);
    },removeGalleryAfricanJudges: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/galleryafrican/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    }
});
Ext.reg('sovereign-grid-galleryafricanjudges',Sovereign.grid.GalleryAfricanJudges);

Sovereign.window.UpdateGalleryAfricanJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/update'
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.name')
            ,name: 'galleryname'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.year')
            ,name: 'year'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.UpdateGalleryAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-galleryafricanjudges-update',Sovereign.window.UpdateGalleryAfricanJudges);