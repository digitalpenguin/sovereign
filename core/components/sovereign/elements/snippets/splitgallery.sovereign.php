<?php

$sovereign = $modx->getService('sovereign','Sovereign',$modx->getOption('sovereign.core_path',null,$modx->getOption('core_path').'components/sovereign/').'model/sovereign/',$scriptProperties);
if (!($sovereign instanceof Sovereign)) return '';



/* setup default properties */
$tpl = $modx->getOption('tpl',$scriptProperties,'currentGallerySplitSlides');


// Get most recent gallery that is in public phase
$record = $modx->query("SELECT MAX(id) FROM {$modx->getTableName('africanGalleries')} WHERE phase=0");
$highestId = (integer) $record->fetch(PDO::FETCH_COLUMN);
$record->closeCursor();
$galleryId = $highestId;


// Get total number of records
$c = $modx->newQuery('africanArtworks');
if(!empty($galleryId)) {
    $c->where(array(
        'gallery_id' => $galleryId
    ));
}
$total = $modx->getCount('africanArtworks', $c);

//Divide total by 6 and round up to get the number of slides required
if($total < 7) {
    $numOfSlides = 1;
} else {
    $numOfSlides = ceil($total/6);
}

$artworks = $modx->getCollection('africanArtworks',$c);

$output = '';
foreach ($artworks as $artwork) {
    $i = 0;
    if($i < $numOfSlides) {
    $artworkArray = $artwork->toArray();
    $output .= $sovereign->getChunk($tpl,$artworkArray);
    $i++;
    } else {
        break;
    }

    //$modx->log(modX::LOG_LEVEL_DEBUG, $sovereign->getChunk($tpl,$artworkArray));
}
return $output;
