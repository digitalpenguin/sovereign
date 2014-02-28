<?php

class GalleryAfricanArtworksCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'galleryAfricanImages';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';
}

    function fireBeforeSaveEvent() {
        $this->modx->runProcessor('mgr/galleryafrican/artworks/upload', $this->sovereign->config['assetsUrl'] . 'galleries/');
        return true;
    }

return 'GalleryAfricanArtworksCreateProcessor';