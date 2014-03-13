<?php
class GalleryAfricanActivateProcessor extends modObjectUpdateProcessor {
    public $classKey = 'galleryAfrican';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $this->setProperty('enabled', 1);
        return parent::initialize();
    }

}
return 'GalleryAfricanActivateProcessor';