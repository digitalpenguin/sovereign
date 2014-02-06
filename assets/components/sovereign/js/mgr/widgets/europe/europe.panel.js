Sovereign.panel.EuropeanPanel = function(config) {
    config = config || {};
    Ext.apply(config,{
        border: false
        ,baseCls: 'modx-formpanel'
        ,cls: 'container'
        ,items: [{
        }]
    });
    Sovereign.panel.EuropeanPanel.superclass.constructor.call(this,config);
};
Ext.extend(Sovereign.panel.EuropeanPanel,MODx.Panel);
Ext.reg('sovereign-panel-europe',Sovereign.panel.EuropeanPanel);