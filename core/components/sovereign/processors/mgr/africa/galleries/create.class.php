<?php
/**
 * Create a directory and add the properties to database.
 *
 * @param string $galleryName The name of the directory to create
 * @param string $parent The parent directory
 * @param boolean $prependPath (optional) If true, will prepend rb_base_dir to
 * the final path
 *
 * @package sovereign
 */
class GalleryAfricanCreateProcessor extends modObjectCreateProcessor {
    public $classKey = 'africanGalleries';
    public $languageTopics = array('sovereign:default');
    public $objectType = 'sovereign';

    /** @var modMediaSource|modFileMediaSource $source */
    public $source;
    public function checkPermissions() {
        return $this->modx->hasPermission('directory_create');
    }

    public function getLanguageTopics() {
        return array('file');
    }

    public function initialize() {
        $this->setUserId();
        $this->setCreateTime();
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        return parent::initialize();
    }

    private function setUserId() {
        $user = $this->modx->getLoginUserID();
        $this->setProperty('createdby', $user);
    }

    private function setCreateTime() {
        date_default_timezone_set('Asia/Hong_Kong');
        $date = date('m/d/Y h:i:s a', time());
        $this->setProperty('createdon', $date);
    }

    /*public function process() {
        if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking current url: ' . $this->getProperty('url') . ' Checking current parent: ' . $this->getProperty('parent'));

        $success = $this->source->createContainer($this->getProperty('id'),$this->getProperty('parent'));

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
        return parent::process();
    }*/

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

    public function beforeSave() {
        $name = $this->getProperty('galleryname');
        if (empty($name)) {
            $this->addFieldError('galleryname',$this->modx->lexicon('sovereign.competition_err_ns_name'));
        } else if ($this->doesAlreadyExist(array('galleryname' => $name))) {
            $this->addFieldError('galleryname',$this->modx->lexicon('sovereign.competition_err_ae'));
        }
        return parent::beforeSave();
    }

    public function afterSave() {
        $id = $this->object->get('id');
        //$this->modx->log(modX::LOG_LEVEL_DEBUG, ' CURRENT VALUE OF ID: ' . $id);

        /*if (!$this->getSource()) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }*/
        $this->source->setRequestProperties($this->getProperties());
        $this->source->initialize();
        if (!$this->source->checkPolicy('create')) {
            return $this->failure($this->modx->lexicon('permission_denied'));
        }
        $this->modx->log(modX::LOG_LEVEL_DEBUG, ' Checking current parent: ' . $this->getProperty('parent'));

        $success = $this->source->createContainer($id, $this->getProperty('parent'));

        if (empty($success)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }

        $success2 = $this->source->createContainer('thumbnails', $this->getProperty('parent').$id);
        if (empty($success2)) {
            $msg = '';
            $errors = $this->source->getErrors();
            foreach ($errors as $k => $msg) {
                $this->modx->error->addField($k,$msg);
            }
            return $this->failure($msg);
        }
        return parent::afterSave();
    }
}
return 'GalleryAfricanCreateProcessor';