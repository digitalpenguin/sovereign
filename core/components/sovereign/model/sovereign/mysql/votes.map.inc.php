<?php
$xpdo_meta_map['votes']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_votes',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'item_id' => 0,
    'user_id' => 0,
    'value' => 0,
    'ip' => '',
    'date' => NULL,
  ),
  'fieldMeta' => 
  array (
    'item_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'user_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'value' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'attributes' => 'unsigned',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'ip' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '40',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'date' => 
    array (
      'dbtype' => 'datetime',
      'phptype' => 'datetime',
      'null' => true,
    ),
  ),
  'aggregates' => 
  array (
    'Item' => 
    array (
      'class' => 'artItem',
      'local' => 'item_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
    'User' => 
    array (
      'class' => 'modUser',
      'local' => 'user_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
