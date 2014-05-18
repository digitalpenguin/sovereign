Sovereign.grid.GalleryAfricanPublic = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-galleryafricanpublic'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/africa/galleries/getListPublic' }
        ,fields: ['id','galleryname','description','url','year','artworktotal','votes','enabled','createdon','createdby','menu']
        ,paging: true
        ,pageSize: 10
        ,remoteSort: true
        ,listeners : {
            'rowclick': function(grid, index, rec){
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelections()[0];
                    var galleryId = row.get('id');
                }
                this.loadNewGrid(grid, row, galleryId);
            }
        }
        ,autoExpandColumn: 'year'
        ,columns: [{
            header: 'ID#'
            ,dataIndex: 'id'
            ,sortable: true
            ,width:.03
        },{
            header: _('sovereign.galleryname')
            ,dataIndex: 'galleryname'
            ,sortable: true
            ,width:.15
        },{
            header: _('sovereign.gallery_desc')
            ,dataIndex: 'description'
            ,sortable: true
            ,width:.3
        },{
            header: _('sovereign.gallery_artwork_total')
            ,align: 'center'
            ,dataIndex: 'artworktotal'
            ,sortable: false
            ,width:.06
        },{
            header: _('sovereign.gallery_vote_total')
            ,align: 'center'
            ,dataIndex: 'votes'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.created_on')
            ,dataIndex: 'createdon'
            ,sortable: true
            ,width:.08
        },{
            header: _('sovereign.gallery_cover')
            ,dataIndex: 'cover_filename'
            ,sortable: false
            ,width:.1
        }]
        ,tbar:[{
            text: _('sovereign.gallery_create')
            ,handler: { xtype: 'sovereign-window-galleryafricanpublic-create' ,blankValues: true }
        },'->',{
            xtype: 'textfield'
            ,id: 'galleryafricanpublic-search-filter'
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
            ,id: 'modx-filter-clear-galleryafricanpublic'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.GalleryAfricanPublic.superclass.constructor.call(this,config)
};

Ext.extend(Sovereign.grid.GalleryAfricanPublic,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/africa/galleries/getListJudges'
            ,'parent': this.config.resource
        };
        Ext.getCmp('galleryafricanpublic-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function(grid, index, rec) {
        if (grid.getSelectionModel().hasSelection()) {
            var row = grid.getSelectionModel().getSelections()[0];
            var enabledVal = row.get('enabled');
        }
        return [{
            text: _('sovereign.gallery_endpublicvoting')
            ,handler: this.endVotingGalleryAfricanPublic
        },'-',{
            text: _('sovereign.gallery_back_to_submissions')
            ,handler: this.backToJudgesPhaseGalleryAfricanPublic
        },{
            text: _('sovereign.gallery_remove')
            ,handler: this.removeGalleryAfricanPublic
        }];

    },endVotingGalleryAfricanPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_endpublicvoting')
            ,text: _('sovereign.gallery_endpublicvoting_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/galleries/endPublicVoting'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },backToJudgesPhaseGalleryAfricanPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_back_to_judges')
            ,text: _('sovereign.gallery_back_to_judges_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/galleries/moveGallery'
                ,id: this.menu.record.id
                ,phase: 1
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },removeGalleryAfricanPublic: function() {
        MODx.msg.confirm({
            title: _('sovereign.gallery_remove')
            ,text: _('sovereign.gallery_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/africa/galleries/remove'
                ,id: this.menu.record.id
                // A hack to prepend the modx install base path
                ,dir: Sovereign.config.modxBasePath + Sovereign.config.africanGalleryUrl + this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },loadNewGrid: function(grid, row, galleryId) {
        Ext.getCmp('sovereign-panel-africa').replacePublicGrid(grid, row, galleryId);
    }
});
Ext.reg('sovereign-grid-galleryafricanpublic',Sovereign.grid.GalleryAfricanPublic);



Sovereign.window.CreateGalleryAfricanPublic = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-galleryafricanpublic-create');
    if (check) check.destroy();
    this.ident = config.ident || 'sovcrgal'+Ext.id();
    this.parent = Sovereign.config.africanGalleryUrl;//'assets/components/sovereign/galleries/african/';
    Ext.applyIf(config,{
        title: _('sovereign.gallery_create')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/galleries/create'
            ,parent: this.parent
            ,galleryphase: 2 // 2 represents public phase
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'url'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.galleryname')
            ,name: 'galleryname'
            ,width: 300
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.gallery_desc')
            ,name: 'description'
            ,width: 300
        }]
    });
    Sovereign.window.CreateGalleryAfricanPublic.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateGalleryAfricanPublic,MODx.Window);
Ext.reg('sovereign-window-galleryafricanpublic-create',Sovereign.window.CreateGalleryAfricanPublic);