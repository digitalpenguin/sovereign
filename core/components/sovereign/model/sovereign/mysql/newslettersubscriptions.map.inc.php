<?php
$xpdo_meta_map['newsletterSubscriptions']= array (
  'package' => 'sovereign',
  'version' => '1.1',
  'table' => 'sovereign_newsletter_subscriptions',
  'extends' => 'xPDOSimpleObject',
  'fields' => 
  array (
    'first_name' => NULL,
    'surname' => NULL,
    'email_address' => NULL,
    'region' => NULL,
  ),
  'fieldMeta' => 
  array (
    'first_name' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
    ),
    'surname' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '200',
      'phptype' => 'string',
      'null' => true,
    ),
    'email_address' => 
    array (
      'dbtype' => 'varchar',
      'precision' => '250',
      'phptype' => 'string',
      'null' => true,
    ),
    'region' => 
    array (
      'dbtype' => 'tinyint',
      'precision' => '1',
      'phptype' => 'integer',
      'null' => true,
    ),
  ),
  'indexes' => 
  array (
    'region' => 
    array (
      'alias' => 'region',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => 
      array (
        'region' => 
        array (
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
);
