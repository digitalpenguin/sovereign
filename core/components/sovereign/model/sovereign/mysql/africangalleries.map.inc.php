<?php
$xpdo_meta_map['africanGalleries']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_african_galleries',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'galleryname' => '',
    'artworktotal' => 0,
    'url' => '',
    'year' => '',
    'enabled' => 0,
    'vote_on' => 0,
    'votes' => 0,
    'createdon' => NULL,
    'createdby' => 0,
  ),
  'fieldMeta' => 
  array (
    'galleryname' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'artworktotal' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'url' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'year' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '6',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'enabled' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'vote_on' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => true,
      'default' => 0,
    ),
    'votes' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'createdon' => 
    array (
      'dbtype' => 'datetime',
      'phptype' => 'datetime',
      'null' => true,
    ),
    'createdby' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => true,
      'default' => 0,
    ),
  ),
  'composites' => 
  array (
    'AfricanArtworks' => 
    array (
      'class' => 'africanArtworks',
      'local' => 'id',
      'foreign' => 'gallery_id',
      'cardinality' => 'many',
      'owner' => 'local',
    ),
  ),
  'aggregates' => 
  array (
    'CreatedBy' => 
    array (
      'class' => 'modUser',
      'local' => 'createdby',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
  ),
);
