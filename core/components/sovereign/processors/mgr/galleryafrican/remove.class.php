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

    public function initialize() {
        $galleryname = $this->getProperty('galleryname');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of galleryname:' . $galleryname);
        $c = $this->modx->newQuery('galleryAfricanImages');
        $c->where(array('galleryname' => $galleryname));
        $c->prepare();
        $total = $this->modx->getCount('galleryAfricanImages', $c);
        if ($total > 0) {
            return $this->failure($this->modx->lexicon('sovereign.remove.refuse_delete_items_exist'));
        }
        return parent::initialize();
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
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of dir:' . $this->getProperty('dir'));
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