<?php
$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';

/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'judgesGallery');
$tpl2 = $modx->getOption('tpl',$scriptProperties,'judgesGalleryAlt');
$sort = $modx->getOption('sort',$scriptProperties,'id');
$dir = $modx->getOption('dir',$scriptProperties,'DESC');
$limit = $modx->getOption('limit',$scriptProperties,10);
$offset = $modx->getOption('offset',$scriptProperties,0);
$totalVar = $modx->getOption('totalVar', $scriptProperties, 'total');

// get the id of the
$resource = $modx->getObject('modResource', array('pagetitle'=>'JudgesGallery'));
$resourceId = $resource->get('id');
echo "<p>Here is the page id: {$resourceId}</p>";

$user = $modx->user->get('id');
$profile = $modx->user->getOne('Profile');
$name = $profile->get('fullname');
echo "<p>User id is: {$user}</p>";
echo "<p>Hi {$name},<br/>Welcome to the Judges' Gallery. Please rate each artwork out of five stars. You can come back and alter your votes until the voting period has ended.</p>";

// Check for judges user group and check region
foreach($modx->user->getUserGroupNames() as $group) {
    $groupArray = str_split($group, 3);
    echo $groupArray[0];
    switch($groupArray[0]) {
        case 'Afr': // African Gallery
            $africanGroup = str_split($group, 21);
            echo 'Recognised african';
            $galleryId = $africanGroup[1]; // Gets the gallery number from the end of the group name
            break;
        case 'Asi': // Asian Gallery
            $asianGroup = str_split($group, 19);
            $galleryId = $asianGroup[1]; // Gets the gallery number from the end of the group name
            break;
        case 'Eur': // European Gallery
            $europeanGroup = str_split($group, 22);
            $galleryId = $europeanGroup[1]; // Gets the gallery number from the end of the group name
            break;
        case 'Mid': // Middle-Eastern Gallery
            $mideasternGroup = str_split($group, 24);
            $galleryId = $mideasternGroup[1]; // Gets the gallery number from the end of the group name
            break;
    }
}

echo 'Gallery ID is : '.$galleryId;

// Get total number of records
$c = $modx->newQuery('africanArtworks');
if(!empty($galleryId)) {
    $c->where(array(
        'gallery_id' => $galleryId
    ));
} else {
    return '<p>No artworks currently available!</p>';
}
$total = $modx->getCount('africanArtworks',$c);
$modx->setPlaceholder($totalVar,$total);

$c->limit($limit,$offset);
$c->sortby($sort,$dir);
$artworks = $modx->getCollection('africanArtworks',$c);


$output = '';
$i = 1;
foreach ($artworks as $artwork) {
    $artworkArray = $artwork->toArray();
    if ($i % 2 != 0) {
        $output .= $sovereign->getChunk($tpl,$artworkArray);
    } else {
        $output .= $sovereign->getChunk($tpl2,$artworkArray);
    }
    $i++;
}
return $output;