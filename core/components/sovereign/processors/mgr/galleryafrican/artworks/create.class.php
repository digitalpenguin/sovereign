<?php
class SovereignAfricanArtworkCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'africanArtworks';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';
    /** @var africanArtworks $object */
    public $object;

    /** @var modMediaSource $source */
    public $source;


    public function checkPermissions() {
        return $this->modx->hasPermission('file_upload');
    }

    public function getLanguageTopics() {
        $langs = parent::getLanguageTopics();
        $langs[] = 'sovereign';
        return $langs;
    }

    private function addToGalleryArtworkCount() {
        $galleryName = $this->getProperty('galleryname');
        $artwork = $this->modx->getObject('africanArtworks', array('galleryname' => $galleryName));
        $gallery = $artwork->getOne('AfricanGallery');
        // WORKING IF VERY FIRST ENTRY INTO TABLE
        //$gallery->set('artworktotal', $gallery->get('artworktotal')+1); // adds one to the total
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'CURRENT VALUE OF ARTWORK TOTAL: ' . $gallery.get('createdon'));
        //$gallery->save();
    }

    public function initialize() {
        $this->setDefaultProperties(array(
            'source' => 1,
            'galleryname' => false,
        ));
        $this->setProperty('galleryname', $this->getProperty('gallery'));
        if (!$this->getProperty('galleryname')) return $this->modx->lexicon('file_folder_err_ns');
        $this->addToGalleryArtworkCount();
        return parent::initialize();
    }



    public function process() {

        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $success = $this->source->uploadObjectsToContainer($this->getProperty('galleryId'),$_FILES);

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $filenames = array();
        if (is_array($_FILES)) {
            foreach ($_FILES as $file) {
                if (!empty($file['name'])) {
                    $filenames[] = $file['name'];
                }
            }
        }
        $this->setProperty('filename', $filenames[0]);

        return parent::process();
    }

    /**
     * Get the active Source
     * @return modMediaSource|boolean
     */
    public function getSource() {
        $this->modx->loadClass('sources.modMediaSource');
        $this->source = modMediaSource::getDefaultSource($this->modx,$this->getProperty('source'));
        if (empty($this->source) || !$this->source->getWorkingContext()) {
            return false;
        }
        return $this->source;
    }


}
return 'SovereignAfricanArtworkCreateProcessor';

