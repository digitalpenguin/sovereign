Sovereign.window.AfricanShowJudgesList = function(config) {
    config = config || {};
    this.ident = config.ident || 'sovshowjudges'+Ext.id();
    Ext.apply(config, {
        title: 'Assigned Judges'
        ,width: 600
        ,fields: [{
            xtype: 'sovereign-grid-african-assignedjudges'
        }]
    });
    Sovereign.window.AfricanShowJudgesList.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.AfricanShowJudgesList, MODx.Window);
Ext.reg('sovereign-window-african-showjudges', Sovereign.window.AfricanShowJudgesList);


Sovereign.grid.AfricanAssignedJudges = function(config) {
    config = config || {};
    Ext.applyIf(config, {
        id: 'sovereign-grid-african-assignedjudges'
        ,url: Sovereign.config.connectorUrl
        ,baseParams: { action: 'mgr/africa/judges/getList' }
        ,fields: ['id','fullname','username','email', 'password', 'menu']
        ,paging: true
        ,pageSize: 10
        ,remoteSort: true
        ,autoExpandColumn: 'title'
        ,save_action: 'mgr/africa/judges/updateFromGrid'
        ,autosave: true
        ,columns: [{
            header: 'Full Name'
            ,dataIndex: 'fullname'
            ,sortable: true
            ,width:.04
        },{
            header: 'Email Address'
            ,dataIndex: 'email'
            ,sortable: true
            ,width:.06
        },{
            header: 'Username'
            ,dataIndex: 'username'
            ,sortable: false
            ,width:.05
        }]
    });
    Sovereign.grid.AfricanAssignedJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.grid.AfricanAssignedJudges,MODx.grid.Grid, {
    getMenu: function() {
    return [{
        text: 'Update Judges\' Details'
        ,handler: this.updateJudge
        },'-',{
            text: 'Reset Password'
            ,handler: this.resetPassword
        },'-',{
            text: 'Remove Judge'
            ,handler: this.removeJudge
        }];
    },updateJudge: function(btn,e) {
        if (!this.updateJudgeWindow) {
            this.updateJudgeWindow = MODx.load({
                xtype: 'sovereign-window-africanjudges-update'
                ,record: this.menu.record
                ,listeners: {
                    'success': {fn:this.refresh,scope:this}
                }
            });
        }
        this.updateJudgeWindow.setValues(this.menu.record);
        this.updateJudgeWindow.show(e.target);
    }
});
Ext.reg('sovereign-grid-african-assignedjudges',Sovereign.grid.AfricanAssignedJudges);


Sovereign.window.UpdateAfricanJudges = function(config) {
    config = config || {};
    Ext.applyIf(config,{
        title: _('doodles.doodle_update')
        ,url: Sovereign.config.connectorUrl
        ,baseParams: {
            action: 'mgr/africa/judges/update'
            ,id: Ext.getCmp('sovereign-grid-african-assignedjudges').config.id
        }
        ,fields: [{
            xtype: 'hidden'
            ,name: 'id'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Full Name'
            ,name: 'fullname'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Email Address'
            ,name: 'email'
            ,anchor: '100%'
        },{
            xtype: 'textfield'
            ,fieldLabel: 'Username'
            ,name: 'username'
            ,anchor: '100%'
        }]
    });
    Sovereign.window.UpdateAfricanJudges.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.window.UpdateAfricanJudges,MODx.Window);
Ext.reg('sovereign-window-africanjudges-update',Sovereign.window.UpdateAfricanJudges);