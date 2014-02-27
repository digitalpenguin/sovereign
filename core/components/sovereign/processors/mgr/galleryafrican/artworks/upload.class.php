<?php
class SovereignAfricanArtworkUploadProcessor extends modObjectProcessor {
    public $classKey = 'galleryAfricanImages';
    public $objectType = 'sovereign';
    public $languageTopics = array('sovereign:default');
    /** @var galleryAfricanImages $object */
    //public $object;

    public function process() {
        if (empty($_FILES['file'])) $this->addFieldError('file',$this->modx->lexicon('sovereign.image_err_ns_file'));
        if ($this->hasErrors()) {
            return $this->failure();
        } else {
            $itemArray = $this->object->toArray();
            unset($itemArray['description']);
            return $this->success('',$itemArray);
        }
    }

    /*
    public function initialize() {
        $gallery = $this->getProperty('gallery',false);
        if (empty($gallery)) return $this->modx->lexicon('sovereign.gallery_err_ns');
        return parent::initialize();
    }
    */
    /*
    public function process() {
        $this->setCheckbox('active');
        if (empty($_FILES['file'])) $this->addFieldError('file',$this->modx->lexicon('sovereign.image_err_ns_file'));
        if ($this->hasErrors()) {
            return $this->failure();
        }
    */
       // /** @var galleryAfricanImages $image */
       /* $this->object = $this->modx->newObject('galleryAfricanImages');
        $this->object->fromArray($this->getProperties());
        $this->object->set('createdby',$this->modx->user->get('id'));

        if (empty($_FILES['file']) || $_FILES['file']['error'] != UPLOAD_ERR_OK) {
            return $this->failure($this->modx->lexicon('sovereign.image_err_ns_file'));
        }

        if (!$this->object->save()) {
            return $this->failure($this->modx->lexicon('sovereign.image_err_save'));
        }

        if (!$this->object->upload($_FILES['file'],$this->getProperty('gallery'))) {
            $this->object->remove();
            return $this->failure($this->modx->lexicon('sovereign.item_err_upload'));
        }
        $this->object->save();

        //$this->associateToGallery();
        //$this->setTags();
        return $this->cleanup();
    }


    public function cleanup() {
        $itemArray = $this->object->toArray();
        unset($itemArray['description']);
        return $this->success('',$itemArray);
    }*/
}
return 'SovereignAfricanArtworkUploadProcessor';