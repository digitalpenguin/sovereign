<?php
class GalleryAfricanSubmissionsGetListProcessor extends modObjectGetListProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    public $objectType = 'sovereign';


    /**
     * Checks for matching value in the specified fields
     * @param xPDOQuery $c
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $query = $this->getProperty('query');
        if (!empty($query)) {
            $c->where(array(
                'galleryname:LIKE' => '%'.$query.'%',
                'OR:description:LIKE' => '%'.$query.'%',
            ));
        }
        return $c;
    }

    /**
     * Returns the specified row with new values from the functions below
     * @param array $list
     * @return array
     */
    public function afterIteration(array $list) {
        $rows = array();
        foreach ($list as $row){
            $row['artworktotal'] = $this->getArtworkCount($row['id']);
            $row['createdby'] = $this->getUserName($row['createdby']);
            $rows[] = $row;
        }
        return $rows;
    }

    /**
     * Returns the number of artworks in the specified gallery
     * @param $galleryId
     * @return int
     */
    private function getArtworkCount($galleryId) {
        $count = $this->modx->getCount('africanArtworks', array('gallery_id' => $galleryId, 'confirmed' => 0));
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of count:' . $count);
        return $count;
    }

    /**
     * Returns the full user's name that created the gallery
     * @param $userId
     * @return mixed
     */
    private function getUserName($userId) {
        $profile = $this->modx->getObject('modUserProfile', array('internalKey' => $userId));
        $fullName = $profile->get('fullname');
        return $fullName;
    }

}
return 'GalleryAfricanSubmissionsGetListProcessor';