Sovereign.window.CreateAfricanArtworks = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-africanartworks-create');
    check ? check.destroy(): '';

    this.fieldSet1 = {
        xtype: 'fieldset'
        ,title: 'Artist\'s Name'
        ,flex: 1
        ,border: false
        ,labelWidth: 60
        ,defaultType: 'field'
        ,defaults: {
            anchor: '-10'
            ,allowBlank: false
            ,listeners: {
                afterrender: function(cmp) {
                    cmp.getEl().set({
                        "autocomplete": 'off'
                    });
                }
            }
        }
        ,items: [{
            fieldLabel: 'Title'
            ,name: 'title'
        },{
            fieldLabel: 'First'
            ,name: 'first_name'
        },{
            fieldLabel: 'Last'
            ,name: 'surname'
        }]
    };

    this.fieldSet2 = Ext.apply({}, {
        flex: 1
        ,title: 'Address Information'
        ,items: [{
            fieldLabel: 'Address'
            ,name: 'address_1'
        },{
            fieldLabel: 'Street'
            ,name: 'address_2'
        },{
            xtype: 'container'
            ,border: false
            ,layout: 'column'
            ,anchor: '100%'
            ,items: [{
                xtype: 'container'
                ,layout: 'form'
                ,width: 200
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'State'
                    ,name: 'state'
                }]
            },{
                xtype: 'container'
                ,layout: 'form'
                ,columnWidth: 1
                ,labelWidth: 30
                ,items: [{
                    xtype: 'textfield'
                    ,fieldLabel: 'Post Code'
                    ,anchor: '-0.01'
                    ,name: 'postal_code'
                }]
            }]
        }]
    }, this.fieldSet1);

    this.fieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldSet1
            ,this.fieldSet2
        ]
    };

    this.ident = config.ident || 'sovupart'+Ext.id();
    this.galleryId = Ext.getCmp('sovereign-grid-africanartworks').config.galleryId;
    Ext.applyIf(config,{
        id: this.ident
        ,title: 'Add Artwork'
        ,fields: [{
            width: 700
            ,height: 360
            ,frame: true
            ,layout: 'vbox'
            ,layoutConfig: {
            align: 'stretch'
            }
            ,items: [
                this.fieldSetContainer
            ]
        }]
    });
    Sovereign.window.CreateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanArtworks,MODx.Window);
Ext.reg('sovereign-window-africanartworks-create',Sovereign.window.CreateAfricanArtworks);


/*
Sovereign.window.CreateAfricanArtworks = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-africanartworks-create');
    if (check) {
        check.destroy();
    }
    this.ident = config.ident || 'sovupart'+Ext.id();
    this.galleryId = Ext.getCmp('sovereign-grid-africanartworks').config.galleryId;
    Ext.applyIf(config,{
        title: _('sovereign.add_artwork')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/galleryafrican/artworks/create'
            ,galleryUrl: 'assets/components/sovereign/galleries/african/' + this.galleryId + '/'
            ,galleryId: this.galleryId
        }
        ,id: this.ident
        ,fileUpload : true
        ,allowBlank: true
        ,height: 150
        ,width: '60%'
        ,minWidth: 650
        ,fields: [{
            xtype: 'hidden'
            ,name: 'gallery_id'
        },{
            xtype: 'container'
            ,layout     : 'hbox'
            ,border     : false
            ,items      : [{
                xtype           : 'container' // Left fieldset
                ,border         : false
                ,layout         :'form'
                ,frame          : false
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,xtype: 'textfield'
                    ,listeners: {
                        afterrender: function(cmp) {
                            cmp.getEl().set({
                                "autocomplete": 'off'
                            });
                        }
                    }
                }
                ,items      : [{
                    id: this.ident+'-filename'
                    ,inputType: 'file'
                    ,fieldLabel: _('sovereign.browse_file_label')
                    ,name: 'filename'
                    ,height: 30
                },{
                    id: this.ident+'-arttitle'
                    ,fieldLabel: _('sovereign.artwork_name')
                    ,name: 'art_title'
                },{
                    id: this.ident+'-nominate'
                    ,fieldLabel: _('sovereign.artwork_nominator')
                    ,name: 'nom_name'
                }]
            },{
                xtype           : 'container' // Right fieldset
                ,layout         : 'form'
                ,border         : false
                ,flex           : 1
                ,defaults       : {
                    anchor: '-10'
                    ,xtype: 'textfield'
                    ,listeners: {
                        afterrender: function(cmp) {
                            cmp.getEl().set({
                                "autocomplete": 'off'
                            });
                        }
                    }
                }
                ,items      : [{
                    id: this.ident+'-firstname'
                    ,fieldLabel: _('sovereign.artist_name')
                    ,name: 'first_name'
                },{
                    id: this.ident+'-address1'
                    ,fieldLabel: _('sovereign.artwork_address1')
                    ,name: 'address_1'
                },{
                    id: this.ident+'-address2'
                    ,fieldLabel: _('sovereign.artwork_address2')
                    ,name: 'address_2'
                }]
            }]
        }]
    });
    Sovereign.window.CreateAfricanArtworks.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.CreateAfricanArtworks,MODx.Window);
Ext.reg('sovereign-window-africanartworks-create',Sovereign.window.CreateAfricanArtworks);*/