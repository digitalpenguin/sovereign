Sovereign.grid.AfricanArtworks = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-africanartworks'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryafrican/artworks/getListArtworks' }
        ,fields: ['id','filename','aname','pname','menu']
        ,paging: true
        ,remoteSort: true
        ,autoExpandColumn: 'title'
        ,columns: [{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width: 10
        },{
            header: _('sovereign.artwork_thumb')
            ,dataIndex: 'filename'
            ,sortable: true
            ,width: 50
            ,renderer: function(value){
                return '<img src="' + Sovereign.config.assetsUrl + 'galleries/african/submissions/' + value + '" />';
            }
        },{
            header: _('sovereign.artist_name')
            ,dataIndex: 'aname'
            ,sortable: true
            ,width: 100
        },{
            header: _('sovereign.artwork_name')
            ,dataIndex: 'pname'
            ,sortable: true
            ,width: 100
        }]
        ,tbar:[{
            text: _('sovereign.back_to_galleries')
            ,listeners: {
                'click': {fn: this.backToGallery, scope:this}
            }
        },'-',{
            xtype: 'button'
            ,id: 'sovereign-add-artwork'
            ,text: _('sovereign.add_artwork')
            ,iconCls: 'icon-add'
            ,cls: 'green'
            ,handler: {
                xtype: 'sovereign-window-africanartworks-create'
                ,blankValues: true
            }
        },'->',{
            xtype: 'textfield'
            ,id: 'africanartworks-search-filter'
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
            ,id: 'modx-filter-clear-africanartworks'
            ,iconCls:'icon-reload'
            ,text: _('filter_clear')
            ,listeners: {
                'click': {fn: this.clearFilter, scope: this}
            }
        }]
    });
    Sovereign.grid.AfricanArtworks.superclass.constructor.call(this,config)
};
Ext.extend(Sovereign.grid.AfricanArtworks,MODx.grid.Grid,{
    search: function(tf,nv,ov) {
        var s = this.getStore();
        s.baseParams.query = tf.getValue();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },clearFilter: function() {
        this.getStore().baseParams = {
            action: 'mgr/galleryafrican/artworks/getListArtworks'
            ,'parent': this.config.resource
        };
        Ext.getCmp('africanartworks-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },getMenu: function() {
        return [{
            text: _('sovereign.artworks_update')
            ,handler: this.updateAfricanArtworks
        },'-',{
            text: _('sovereign.artworks_remove')
            ,handler: this.removeAfricanArtworks
        }];
    },updateAfricanArtworks: function(btn,e) {
        if (!this.updateArtworksWindow) {
            this.updateArtworksWindow = MODx.load({
                xtype: 'sovereign-window-africanartworks-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateArtworksWindow.setValues(this.menu.record);
        this.updateArtworksWindow.show(e.target);
    },removeAfricanArtworks: function() {
        MODx.msg.confirm({
            title: _('sovereign.artworks_remove')
            ,text: _('sovereign.artworks_remove_confirm')
            ,url: this.config.url
            ,params: {
                action: 'mgr/galleryafrican/artworks/remove'
                ,id: this.menu.record.id
            }
            ,listeners: {
                'success': {fn:this.refresh,scope:this}
            }
        });
    },filterByGalleryId: function(id) {
        this.getStore().baseParams['id'] = id;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },backToGallery: function() {
        Ext.getCmp('sovereign-panel-africa').backToSubmissionsGrid();
    }


});
Ext.reg('sovereign-grid-africanartworks',Sovereign.grid.AfricanArtworks);

Sovereign.window.UpdateAfricanArtworks = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('sovereign.artworks_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/artworks/update'
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
    Sovereign.window.UpdateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateAfricanArtworks,MODx.Window);
Ext.reg('sovereign-window-africanartworks-update',Sovereign.window.UpdateAfricanArtworks);


Sovereign.window.CreateAfricanArtworks = function(config) {
    config = config || {};
    this.ident = config.ident || 'sovupart'+Ext.id();
    Ext.applyIf(config,{
        title: _('sovereign.add_artwork')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/artworks/upload'
        }
        ,fileUpload : true
        ,height: 150
        ,width: '70%'
        ,minWidth: 650
        ,items: [{
            xtype: 'hidden'
            ,name: 'competition'
        },{
            html: '<h3>Testing</h3><p>These are the instructions...</p>'
            ,bodyCssClass: 'panel-desc'
            ,bodyStyle: 'margin: 10px 0px 10px 0px'
        },{
            /*
             * hbox layout
             */
            layout     : 'hbox'
            ,border     : false
            ,items      : [{
                /*
                 * Left fieldset
                 */
                xtype           : 'fieldset'
                ,border         : false
                ,frame          : false
                ,defaultType    : 'field'
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,allowBlank: false
                }
                ,items      : [{
                    xtype: 'textfield'
                    ,inputType: 'file'
                    ,fieldLabel: _('sovereign.browse_file_label')
                    ,name: 'filename'
                    ,height: 30
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('sovereign.artwork_name')
                    ,name: 'aname'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('sovereign.artwork_caption')
                    ,name: 'caption'
                }]
            },{
                /*
                 * Right fieldset
                 */
                xtype           : 'fieldset'
                ,border         : false
                ,defaultType    : 'field'
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,allowBlank: false
                }
                ,items      : [{
                    xtype: 'textfield'
                    ,fieldLabel: _('sovereign.artist_name')
                    ,name: 'pname'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('sovereign.artwork_address1')
                    ,name: 'pname'
                },{
                    xtype: 'textfield'
                    ,fieldLabel: _('sovereign.artwork_address2')
                    ,name: 'pname'
                }]
            }]
        }]

        /*
        ,fields: [{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_name')
            ,name: 'aname'
        },{
            xtype: 'textfield'
            ,inputType: 'file'
            ,border: false
            ,fieldLabel: _('sovereign.browse_file_label')
            ,name: 'filename'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artist_name')
            ,name: 'pname'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_caption')
            ,name: 'caption'
        },{
            xtype: 'sovereign-combo-countries'
            ,fieldLabel: _('sovereign.artwork_country')
            ,name: 'country'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_media')
            ,name: 'media'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_estimate')
            ,name: 'estimate'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_winnerof')
            ,name: 'winnerof'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_represented_by')
            ,name: 'represented_by'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_storeprice')
            ,name: 'storeprice'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_saleprice')
            ,name: 'saleprice'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_statement')
            ,name: 'statement'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_workbrief')
            ,name: 'workbrief'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_artbrief')
            ,name: 'artbrief'
        },{
            xtype: 'textfield'
            ,fieldLabel: _('sovereign.artwork_donate')
            ,name: 'donate'
        }]*/

    });
    Sovereign.window.CreateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanArtworks,MODx.Window);
Ext.reg('sovereign-window-africanartworks-create',Sovereign.window.CreateAfricanArtworks);


/*
 * Country Combo-Box
 */
Sovereign.combo.Countries = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        store: new Ext.data.ArrayStore({
            id: 0
            ,fields: ['country-code','display']
            ,data: [
                ['AU','Australia']
                ,['GB','England']
            ]
        })
        ,mode: 'local'
        ,displayField: 'display'
        ,valueField: 'country-code'
    });
    Sovereign.combo.Countries.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.combo.Countries,MODx.combo.ComboBox);
Ext.reg('sovereign-combo-countries',Sovereign.combo.Countries);