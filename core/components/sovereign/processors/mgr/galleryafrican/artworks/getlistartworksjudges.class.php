<?php
class AfricanArtworksJudgesGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        // Used to filter artworks into galleries
        $galleryId = $this->getProperty('galleryId');
        if(!empty($galleryId)) {
            $c->where(array(
                    'gallery_id' => $galleryId, // only show artworks that match this gallery id
                    array(
                        'confirmed:=' => 1, // only show artworks that have been confirmed
                    )
            ));
        }

        // Used to search for artworks in specific galleries
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'gallery_id' => $galleryId, // only show artworks that match this gallery id
                array(
                    'confirmed:=' => 1, // only show artworks that have been confirmed
                    array(
                        'art_title:LIKE' => '%'.$query.'%',
                        'OR:first_name:LIKE' => '%'.$query.'%'
                    )
                )
            ));
        }

        return $c;
    }
}
return 'AfricanArtworksJudgesGetListProcessor';