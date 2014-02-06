Sovereign.grid.GalleryAfrican = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryafrican'
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
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryafrican-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryafrican-search-filter'
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
            ,id: 'modx-filter-clear-galleryafrican'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAfrican.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.GalleryAfrican,MODx.grid.Grid,{
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
        Ext.getCmp('galleryafrican-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryAfrican
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAfrican
        }];
    },updateGalleryAfrican: function(btn,e) {
        if (!this.updateGalleryWindow) {
            this.updateGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryafrican-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryWindow.setValues(this.menu.record);
        this.updateGalleryWindow.show(e.target);
    },removeGalleryAfrican: function() {
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
Ext.reg('sovereign-grid-galleryafrican',Sovereign.grid.GalleryAfrican);

Sovereign.window.UpdateGalleryAfrican = function(config) {
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
    Sovereign.window.UpdateGalleryAfrican.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfrican,MODx.Window);
Ext.reg('sovereign-window-galleryafrican-update',Sovereign.window.UpdateGalleryAfrican);


Sovereign.window.CreateGalleryAfrican = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/create'
        }
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.name')
            ,name: 'galleryname'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.year')
            ,name: 'year'
            ,width: 300
        }]
    });
    Sovereign.window.CreateGalleryAfrican.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfrican,MODx.Window);
Ext.reg('sovereign-window-galleryafrican-create',Sovereign.window.CreateGalleryAfrican);