<?php
class GalleryAfricanGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';

    /*private function setArtworkCount() {
        $gallery = $this->modx->getObject('africanGalleries');
        if($count = $gallery->getCount('AfricanArtworks') > 0){
            $gallery->set('artworktotal' ,$count);
        } else {
            $gallery->set('artworktotal' ,0);
        }


        //$gallery->set('artworktotal', $gallery->get('artworktotal')+1); // adds one to the total
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'CURRENT VALUE OF ARTWORK TOTAL: ' . $gallery->get('artworktotal'));
        //$gallery->save();
    }*/

    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'galleryname:LIKE' => '%'.$query.'%',
                'OR:year:LIKE' => '%'.$query.'%',
            ));
        }
        /*
        $id = $this->getProperty('id');
        if (!empty($id)) {
            $c->where(array(
                'id' => $id
            ));
        }*/
        return $c;
    }

    /*public function beforeSave() {
        $this->setArtworkCount();
    }*/
}
return 'GalleryAfricanGetListProcessor';