<?php
/**
 * Remove a directory
 * @param string $galleryname The name of the gallery
 * @param string $dir The directory to remove
 * @param boolean $prependPath (optional) If true, will prepend rb_base_dir to
 * the final path
 *
 * @package sovereign
 *
 */
class GalleryAfricanRemoveProcessor extends modObjectRemoveProcessor {
    public $classKey = 'galleryAfrican';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;
    public function checkPermissions() {
        return $this->modx->hasPermission('directory_remove');
    }

    public function getLanguageTopics() {
        return array('file');
    }

    public function initialize() {
        $this->setDefaultProperties(array(
            'name' => false,
            'parent' => ''
        ));
        $dir = $this->getProperty('dir');
        if (empty($dir)) return $this->modx->lexicon('file_folder_err_ns');
        return parent::initialize();
    }

    public function beforeSet() {

        $galleryname = $this->getProperty('galleryname');
        $total = $this->modx->getCount('galleryAfricanImages',array('galleryname' => $galleryname));
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Number of artworks belonging to this gallery: ' . $total);
        if ($total > 0) {
            return $this->failure($this->modx->lexicon('sovereign.refuse_delete_items_exist'));
        }
    }

    public function process() {
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('remove')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }

        $success = $this->source->removeContainer($this->getProperty('dir'));

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
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
return 'GalleryAfricanRemoveProcessor';