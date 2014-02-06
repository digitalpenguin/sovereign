<?php
class GalleryAfricanGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'galleryAfrican';
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
        return $c;
    }
}
return 'GalleryAfricanGetListProcessor';