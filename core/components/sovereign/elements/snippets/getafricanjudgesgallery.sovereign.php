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


$galleryId = 11;
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