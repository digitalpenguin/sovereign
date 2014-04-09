Sovereign.window.CreateAfricanArtworks = function(config) {
    config = config || {};
    var check = Ext.getCmp('sovereign-window-africanartworks-create');
    check ? check.destroy(): '';

    // Top left fieldset - Artist's name

    this.fieldSetName = {
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


     //Top-right fieldset. DOB and Image

    this.fieldSetDob = Ext.apply({}, {
        flex:1
        ,title: 'Date of Birth'
        ,items: [{
            xtype: 'datefield'
            ,fieldLabel: 'Date of Birth'
            ,name: 'dob'
            ,type: 'date'
            ,format: MODx.config.manager_date_format
        }]
    }, this.fieldSetName);


    this.fieldSetImage = Ext.apply({}, {
        flex:1
        ,title: 'Image'
        ,items: [{
            inputType: 'file'
            ,fieldLabel: 'Select a File to Upload'
            ,name: 'filename'
        }]
    }, this.fieldSetName);

    this.dobAndImageContainer = {
        xtype:'container'
        ,layout: 'vbox'
        ,width:300
        ,layoutConfig:{
            align:'stretch'
        }
        ,items: [
            this.fieldSetDob
            ,this.fieldSetImage
        ]
    };

    this.topFieldSetContainer = {
        xtype: 'container'
        ,layout: 'hbox'
        ,height: 200
        ,layoutConfig: {
            align: 'stretch'
        }
        ,items: [
            this.fieldSetName
            ,this.dobAndImageContainer
        ]
    };
/*
    this.fieldSetTemp = Ext.apply({}, {

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
    }, this.fieldSetName);

*/
    this.addressFieldSetLeft = Ext.apply({}, {
        flex:1
        ,border:0
        ,title: ''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'Address Line 1'
            ,name:'address_1'
        },{
            fieldLabel: 'Address Line 2'
            ,name: 'address_2'
        },{
            fieldLabel: 'Address Line 3'
            ,name: 'address_3'
        }]
    }, this.fieldSetName);

    this.addressFieldSetRight = Ext.apply({}, {
        flex:1
        ,border:0
        ,title:''
        ,style: 'border-width:0px;'
        ,items: [{
            fieldLabel: 'City'
            ,name: 'city'
        },{
            xtype: 'container'
            ,border: false
            ,layout: 'column'
            ,anchor: '100%'
            ,items: [{
                xtype: 'container'
                ,layout: 'form'
                ,width: 190
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
    }, this.fieldSetName);

    //Address Tab
    this.addressTab = {
        title: 'Address'
        ,xtype: 'container'
        ,layout: 'hbox'
        ,layoutConfig: {
            align:'stretch'
        }
        ,items: [
            this.addressFieldSetLeft
            ,this.addressFieldSetRight
        ]
    };

    this.tabs = [{
        xtype: 'container'
        ,title: 'Contact'
        ,layout: 'form'
        ,width: 300
        ,style: 'padding:10px 0 0 10px;'
        ,bodyStyle: 'padding:6px 6px 0;'
        ,defaults: {
            xtype: 'textfield'
            ,width: 230
        }
        ,items: [{
            fieldLabel: 'Home'
            ,name:'home'
        },{
            fieldLabel: 'Mobile'
            ,name: 'mobile'
        },{
            fieldLabel: 'Fax'
            ,name: 'fax'
        }]
    },this.addressTab
    ,{
        title: 'Art Details'
        ,xtype: 'container'
        ,name: 'bio'
    },{
        title: 'Caption'
        ,xtype: 'textarea'
        ,name: 'caption'
    },{
        title: 'Work Brief'
        ,xtype: 'textarea'
        ,name: 'work_brief'
    },{
        title: 'Art Brief'
        ,xtype: 'textarea'
        ,name: 'art_brief'
    }];

    this.tabPanel = {
        xtype: 'tabpanel'
        ,activeTab: 0
        ,deferredRender: false
        ,layoutOnTabChange: true
        ,border: true
        ,flex: 1
        ,height:230
        ,style: 'margin:6px 0;'
        ,plain: true
        ,items: this.tabs
    };

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
        ,height: 600
        ,width: '60%'
        ,minWidth: 500
        ,fields: [{
            xtype: 'hidden'
            ,name: 'gallery_id'
        },{
            minWidth: 600
            ,height: 460
            ,frame: true
            ,layout: 'vbox'
            ,layoutConfig: {
                align: 'stretch'
            }
            ,items: [
                this.topFieldSetContainer
                ,this.tabPanel
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