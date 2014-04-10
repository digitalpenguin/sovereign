Sovereign.grid.AfricanArtworks = function(config) {
    config = config || {};

    this.exp = new Ext.grid.RowExpander({
        enableCaching: false
        ,tpl : new Ext.Template(
            '<div class="expanded">' +
                '<h4>Caption</h4>' +
                '<p>{caption}</p>' +
            '</div>' +
            '<div class="expanded">' +
                '<h4>Work Brief</h4>' +
                '<p>{work_brief}</p>' +
            '</div>' +
            '<div class="expanded">' +
            '<h4>Art Brief</h4>' +
            '<p>{art_brief}</p>' +
            '</div>' +
            '<div class="expanded">' +
                '<ul>' +
                    '<li>{height}</li>' +
                    '<li>{width}</li>' +
                    '<li>{depth}</li>' +
                '</ul>' +
            '</div>'

        )
    });


    Ext.applyIf(config,{
        id: 'sovereign-grid-africanartworks'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/galleryafrican/artworks/getListArtworks' }
        ,fields: ['id','gallery_id','title','first_name','surname','address_1','address_2','address_3'
            ,'city','state','postal_code','country','tel_no','fax_no','email_address','dob','nom_name','statement'
            ,'art_title','art_materials','height','width','depth','value','work_brief','art_brief','donate','share'
            ,'filename','gallery_type','caption','edition','img_height','img_width','confirmed','closeup_filename'
            ,'closeup_desc','createdon','createdby','menu']
        ,paging: true
        ,pageSize: 5
        ,remoteSort: true
        ,autoExpandColumn: 'art_title'
        ,listeners: {
            'render': {fn:this.filterGalleries,scope:this}
            ,'cellclick': function(grid, rowIndex, columnIndex, e) {
                var record = grid.getStore().getAt(rowIndex); // Get the Record
                var fieldName = grid.getColumnModel().getDataIndex(columnIndex); // Get field name
                config.currentFileName = record.get(fieldName);
                if (columnIndex == 2)
                    this.displayArtwork(e);
            }
        }
        ,plugins: [this.exp]
        ,columns: [this.exp,{
            header: _('id')
            ,dataIndex: 'id'
            ,sortable: true
            ,width:.02
        },{
            header: _('sovereign.artwork_thumb')
            ,dataIndex: 'filename'
            ,align: 'center'
            ,sortable: true
            ,width:.04
            ,renderer: function(value){
                return '<img src="' + MODx.config.site_url + '/assets/components/sovereign/galleries/african/'+ config.galleryId + '/thumbnails/' + value + '_small.jpeg" >';
            }
        },{
            header: _('sovereign.artist_title')
            ,dataIndex: 'title'
            ,sortable: true
            ,width:.02
        },{
            header: _('sovereign.first_name')
            ,dataIndex: 'first_name'
            ,sortable: false
            ,width:.05
        },{
            header: _('sovereign.surname')
            ,dataIndex: 'surname'
            ,sortable: false
            ,width:.05
        },{
            header: _('sovereign.country')
            ,dataIndex: 'country'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_title')
            ,dataIndex: 'art_title'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_art_materials')
            ,dataIndex: 'art_materials'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_caption')
            ,dataIndex: 'art_caption'
            ,sortable: true
            ,width:.04
        },{
            header: _('sovereign.artwork_work_brief')
            ,dataIndex: 'work_brief'
            ,sortable: true
            ,width:.07
        },{
            header: _('sovereign.artwork_art_brief')
            ,dataIndex: 'art_brief'
            ,sortable: true
            ,width:.07
        },{
            header: _('sovereign.artwork_nominator')
            ,dataIndex: 'nom_name'
            ,sortable: true
            ,width:.07
        },{
            header: _('sovereign.artwork_donation')
            ,dataIndex: 'donate'
            ,sortable: true
            ,width:.05
        },{
            header: _('sovereign.artwork_confirmed')
            ,dataIndex: 'confirmed'
            ,sortable: true
            ,width:.05
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
            ,handler: { xtype: 'sovereign-window-africanartworks-create' ,blankValues: true }
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
            //,'parent': this.config.resource
            ,'galleryId': this.config.galleryId
        };
        Ext.getCmp('africanartworks-search-filter').reset();
        this.getBottomToolbar().changePage(1);
        this.refresh();
    },filterGalleries: function() {
        var s = this.getStore();
        s.baseParams.galleryId = this.config.galleryId;
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
    },displayArtwork: function(e) {
        this.displayArtworkWindow = new Sovereign.window.DisplayAfricanArtwork;
        this.displayArtworkWindow.setValues(this.menu.record);
        this.displayArtworkWindow.show(e.target);

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
    },passGalleryId: function(galleryId) {
        this.config.galleryId = galleryId;
    }/*,filterByGalleryId: function(id) {
        this.getStore().baseParams['id'] = id;
        this.getBottomToolbar().changePage(1);
        this.refresh();
    }*/,backToGallery: function() {
        Ext.getCmp('sovereign-panel-africa').backToSubmissionsGrid();
    }


});
Ext.reg('sovereign-grid-africanartworks',Sovereign.grid.AfricanArtworks);
/*
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
*/

Sovereign.window.DisplayAfricanArtwork = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-africanartwork-display');
    if (check) {
        check.destroy();
    }
    this.currentFileName = Ext.getCmp('sovereign-grid-africanartworks').config.currentFileName;
    this.galleryId = Ext.getCmp('sovereign-grid-africanartworks').config.galleryId;
    this.ident = config.ident || 'sovdisart'+Ext.id();
    Ext.apply(config,{
        title: _('sovereign.artwork_window_display')
        ,cls: 'container'
        ,id: this.id
        ,modal: true
        ,layout: 'form'
        ,width: 850
        ,listeners: {
            'show': function(){this.center();}
        }
        ,fields: [{
            html: '<a target="_blank" href="'+ MODx.config.site_url + 'assets/components/sovereign/galleries/african/'+ this.galleryId +'/'+ this.currentFileName + '">' +
                '<img src="' + MODx.config.site_url + 'assets/components/sovereign/galleries/african/'+ this.galleryId + '/thumbnails/' + this.currentFileName + '_large.jpeg" >'
        }]
        ,buttons:[{
            text: 'Close'
            ,scope: this
            ,handler: function() { this.hide(); }
        }]
    });

    Sovereign.window.DisplayAfricanArtwork.superclass.constructor.call(this,config);

};
Ext.extend(Sovereign.window.DisplayAfricanArtwork,MODx.Window);
Ext.reg('sovereign-window-africanartwork-display',Sovereign.window.DisplayAfricanArtwork);


