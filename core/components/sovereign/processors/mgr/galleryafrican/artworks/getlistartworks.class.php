<?php
class AfricanArtworksGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    public function prepareQueryBeforeCount(xPDOQuery $c) {

        $galleryId = $this->getProperty('galleryId');
        if(!empty($galleryId)) {
            $c->where(array(
                'gallery_id' => $galleryId
            ));
        }

        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                array(
                    'aname:LIKE' => '%'.$query.'%',
                    'OR:pname:LIKE' => '%'.$query.'%',
                ),
                'gallery_id' => $galleryId,
            ));
        }

        return $c;
    }
}
return 'AfricanArtworksGetListProcessor';