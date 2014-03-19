<?php
class GalleryAfricanGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanGalleries';
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

    public function afterIteration(array $list) {
        $rows = array();
        foreach ($list as $row){
            $row['artworktotal'] = $this->getArtworkCount($row['id']);
            $row['createdby'] = $this->getUserName($row['createdby']);
            $rows[] = $row;
        }
        return $rows;
    }

    private function getArtworkCount($galleryId) {
        $count = $this->modx->getCount('africanArtworks', array('gallery_id' => $galleryId));
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of count:' . $count);
        return $count;
    }

    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }

}
return 'GalleryAfricanGetListProcessor';