Sovereign.panel.AsianPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
        }]
    });
    Sovereign.panel.AsianPanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.AsianPanel,MODx.Panel);
Ext.reg('sovereign-panel-asia',Sovereign.panel.AsianPanel);