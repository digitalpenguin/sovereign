<?php
class AfricanArtworksGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'galleryAfricanImages';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'galleryname:LIKE' => '%'.$query.'%',
                'OR:year:LIKE' => '%'.$query.'%',
            ));
        }

        $galleryId = $this->getProperty('galleryId');
        if(!empty($galleryId)) {
            $c->where(array(
                'galleryname' => $galleryId
            ));
        }

        return $c;
    }
}
return 'AfricanArtworksGetListProcessor';