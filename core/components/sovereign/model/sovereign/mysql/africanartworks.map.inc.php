<?php
$xpdo_meta_map['africanArtworks']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_african_artworks',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'gallery_id' => 0,
    'sid' => 0,
    'title' => '',
    'first_name' => '',
    'surname' => '',
    'address_1' => '',
    'address_2' => '',
    'address_3' => '',
    'city' => '',
    'state' => '',
    'postal_code' => '',
    'country' => '',
    'tel_no' => '',
    'fax_no' => '',
    'email_address' => '',
    'dob' => NULL,
    'nom_name' => '',
    'statement' => NULL,
    'art_title' => '',
    'art_materials' => '',
    'height' => '',
    'width' => '',
    'depth' => '',
    'value' => '',
    'work_brief' => NULL,
    'art_brief' => NULL,
    'donate' => '',
    'share' => 0,
    'filename' => '',
    'gallery_type' => 0,
    'caption' => NULL,
    'edition' => 0,
    'img_height' => '',
    'img_width' => '',
    'confirmed' => 0,
    'closeup_filename' => '',
    'closeup_desc' => NULL,
    'createdon' => NULL,
    'createdby' => 0,
  ),
  'fieldMeta' => 
  array (
    'gallery_id' => 
    array (
      'dbtype' => 'int',
      'precision' => '10',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => false,
      'default' => 0,
    ),
    'sid' => 
    array (
      'dbtype' => 'int',
      'precision' => '11',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => true,
      'default' => 0,
    ),
    'title' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'first_name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'surname' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'address_1' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'address_2' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'address_3' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'city' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'state' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'postal_code' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'country' => 
    array (
      'dbtype' => 'char',
      'precision' => '2',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'tel_no' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '15',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'fax_no' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '15',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'email_address' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'dob' => 
    array (
      'dbtype' => 'date',
      'phptype' => 'string',
      'null' => true,
    ),
    'nom_name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'statement' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
    ),
    'art_title' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'art_materials' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'height' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'width' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'depth' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'value' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '15',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'work_brief' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
    ),
    'art_brief' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
    ),
    'donate' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '10',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'share' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'filename' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '50',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'gallery_type' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0,
    ),
    'caption' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
    ),
    'edition' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => true,
      'default' => 0,
    ),
    'img_height' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '30',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'img_width' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '30',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'confirmed' => 
    array (
      'dbtype' => 'int',
      'precision' => '1',
      'phptype' => 'integer',
      'attributes' => 'unsigned',
      'null' => true,
      'default' => 0,
    ),
    'closeup_filename' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '45',
      'phptype' => 'string',
      'null' => true,
      'default' => '',
    ),
    'closeup_desc' => 
    array (
      'dbtype' => 'text',
      'phptype' => 'string',
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
      'null' => false,
      'default' => 0,
    ),
  ),
  'aggregates' => 
  array (
    'AfricanGallery' => 
    array (
      'class' => 'africanGalleries',
      'local' => 'gallery_id',
      'foreign' => 'id',
      'cardinality' => 'one',
      'owner' => 'foreign',
    ),
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