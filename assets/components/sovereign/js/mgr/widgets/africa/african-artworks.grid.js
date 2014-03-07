Sovereign.grid.AfricanArtworks = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        id: 'sovereign-grid-africanartworks'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryafrican/artworks/getListArtworks' }
        ,fields: ['id','filename','url','aname','pname','menu']
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
            ,align: 'center'
            ,sortable: true
            ,width: 50
            ,renderer: function(value){
                return '<img src="' + MODx.config.site_url + '/assets/components/sovereign/galleries/african/'+ config.galleryName + '/' + value.toString() + '" >';
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
            ,text: _('sovereign.add_artwork')
            ,iconCls: 'icon-add'
            ,handler: this.uploadArtwork
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
    },uploadArtwork: function(btn,e) {
        var r = {
            galleryId: this.config.galleryId
            ,active: true
        };
        if (!this.addArtworkWindow) {
            this.addArtworkWindow = MODx.load({
                xtype: 'sovereign-window-africanartworks-create'
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.addArtworkWindow.setValues(r);
        this.addArtworkWindow.show(e.target);
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
    },passGalleryId: function(galleryname) {
        this.config.galleryName = galleryname;
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
    var check = Ext.getCmp('sovereign-window-africanartworks-create');
    if (check) {
        check.destroy();
    }
    this.ident = config.ident || 'sovupart'+Ext.id();
    this.galleryName = Ext.getCmp('sovereign-grid-africanartworks').config.galleryName;
    Ext.applyIf(config,{
        title: _('sovereign.add_artwork')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/artworks/create'
            ,gallery: 'assets/components/sovereign/galleries/african/' + this.galleryName + '/'
            ,galleryId: this.galleryName
        }
        ,id: this.ident
        ,fileUpload : true
        ,allowBlank: true
        ,height: 150
        ,width: '70%'
        ,minWidth: 650
        ,fields: [{
            xtype: 'hidden'
            ,name: 'gallery'
        },{
            xtype: 'container'
            ,layout     : 'hbox'
            ,border     : false
            ,items      : [{
                xtype           : 'container' // Left fieldset
                ,border         : false
                ,layout:'form'
                ,frame          : false
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,xtype: 'textfield'
                }
                ,items      : [{
                    id: this.ident+'-filename'
                    ,inputType: 'file'
                    ,fieldLabel: _('sovereign.browse_file_label')
                    ,name: 'filename'
                    ,height: 30
                },{
                    id: this.ident+'-aname'
                    ,fieldLabel: _('sovereign.artwork_name')
                    ,name: 'pname'
                },{
                    id: this.ident+'-caption'
                    ,fieldLabel: _('sovereign.artwork_caption')
                    ,name: 'caption'
                }]
            },{
                xtype           : 'container' // Right fieldset
                ,layout: 'form'
                ,border         : false
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,xtype: 'textfield'
                }
                ,items      : [{
                    id: this.ident+'-pname'
                    ,fieldLabel: _('sovereign.artist_name')
                    ,name: 'aname'
                },{
                    id: this.ident+'-address1'
                    ,fieldLabel: _('sovereign.artwork_address1')
                    ,name: 'address1'
                },{
                    id: this.ident+'-address2'
                    ,fieldLabel: _('sovereign.artwork_address2')
                    ,name: 'address2'
                }]
            }]
        }]
        ,buttons: [{
            text: 'Save',
            handler: this.upload,
            scope: this
        }, {
            text: 'Cancel',
            handler: function() {
                config.closeAction !== 'close' ? this.hide() : this.close();
            },
            scope: this
        }]
    });
    Sovereign.window.CreateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanArtworks,MODx.Window, {
    upload: function() {
        var file = Ext.get(this.ident+'-filename').getValue();
        if (!file) {
            Ext.MessageBox.alert(_('sovereign.error'), _('sovereign.file_err_ns'));
            return false;
        }
        this.addValues();
        return this.submit();
    }
    ,addValues: function() {
        this.baseParams.action = 'mgr/galleryafrican/artworks/create';
    },
    submit: function(close) {
        close = close === false ? false : true;
        var f = this.fp.getForm();

        if (f.isValid() && this.fireEvent('beforeSubmit', f.getValues())) {
            f.submit({
                waitMsg: _('sovereign.waiting_msg'),
                scope: this,
                failure: function(frm, a) {
                    if (this.fireEvent('failure', {f: frm, a: a})) {
                        MODx.form.Handler.errorExt(a.result, frm);
                    }
                },
                success: function(frm, a) {
                    if (this.config.success) {
                        Ext.callback(this.config.success, this.config.scope || this, [frm, a]);
                    }
                    this.fireEvent('success', {f: frm, a: a});
                    if (close) {
                        this.config.closeAction !== 'close' ? this.hide() : this.close();
                    }
                }
            });
        }
    }
});
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