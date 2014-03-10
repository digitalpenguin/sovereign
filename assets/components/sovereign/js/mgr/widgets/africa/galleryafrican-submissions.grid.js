Sovereign.grid.GalleryAfricanSubmissions = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryafricansubmissions'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryafrican/getList' }
        ,fields: ['id','galleryname','url','year','menu']
        ,paging: true
        ,remoteSort: true
        ,listeners : {
            'rowclick': function(grid, index, rec){
                console.log('yup');
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                    var galleryname = row.get('galleryname');
                }
                this.loadNewGrid(grid, row, galleryname);
            }
        }
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
        },{
            header: _('sovereign.year')
            ,dataIndex: 'year'
            ,sortable: true
            ,width: 100
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryafricansubmissions-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryafricansubmissions-search-filter'
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
            ,id: 'modx-filter-clear-galleryafricansubmissions'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAfricanSubmissions.superclass.constructor.call(this,config)
};

Ext.extend(Sovereign.grid.GalleryAfricanSubmissions,MODx.grid.Grid,{
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
        Ext.getCmp('galleryafricansubmissions-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.gallery_update')
            ,handler: this.updateGalleryAfricanSubmissions
        },'-',{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAfricanSubmissions
        }];
    },updateGalleryAfricanSubmissions: function(btn,e) {
        if (!this.updateGalleryWindow) {
            this.updateGalleryWindow = MODx.load({
                xtype: 'sovereign-window-galleryafricansubmissions-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateGalleryWindow.setValues(this.menu.record);
        this.updateGalleryWindow.show(e.target);
    },removeGalleryAfricanSubmissions: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,galleryname: this.config.galleryname
            ,params: {
                action: 'mgr/galleryafrican/remove'
                ,id: this.menu.record.id
                ,galleryname: this.menu.record.galleryname
                ,dir: this.menu.record.url
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },loadNewGrid: function(grid, row, galleryname) {
        Ext.getCmp('sovereign-panel-africa').replaceSubmissionsGrid(grid, row, galleryname);
    }
});
Ext.reg('sovereign-grid-galleryafricansubmissions',Sovereign.grid.GalleryAfricanSubmissions);




Sovereign.window.UpdateGalleryAfricanSubmissions = function(config) {
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
    Sovereign.window.UpdateGalleryAfricanSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateGalleryAfricanSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryafricansubmissions-update',Sovereign.window.UpdateGalleryAfricanSubmissions);




Sovereign.window.CreateGalleryAfricanSubmissions = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricansubmissions-create');
    if (check) check.destroy();
    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.name = "";
    this.url = "";
    this.parent = 'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/create'
            ,name: this.name
            ,parent: this.parent
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },{
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
    Sovereign.window.CreateGalleryAfricanSubmissions.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanSubmissions,MODx.Window);
Ext.reg('sovereign-window-galleryafricansubmissions-create',Sovereign.window.CreateGalleryAfricanSubmissions);