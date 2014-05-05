<?php
class GalleryAfricanMoveToJudgesProcessor extends modObjectUpdateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    public function initialize() {
        $phase = $this->getProperty('phase');
        if (!empty($phase)) {
            switch ($phase) {
                case 0:
                    $this->setProperty('phase', 0);
                    break;
                case 1:
                    $this->setProperty('phase', 1);
                    break;
                case 2:
                    $this->setProperty('phase', 2);
                    break;
            }
        }
        return parent::initialize();
    }

}
return 'GalleryAfricanMoveToJudgesProcessor';