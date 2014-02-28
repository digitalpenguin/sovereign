<?php
/**
* @package     sovereign
*/
include_once MODX_CORE_PATH . 'model/modx/processors/browser/file/upload.class.php';

class SovereignUploadProcessor extends modBrowserFileUploadProcessor {

    public function getLanguageTopics() {
        return array('file');
    }

    public function initialize() {
        $path = $this->getProperty('path');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of path is:' . $path);
        $this->setProperty('path', $path);
        return parent::initialize();
    }

    public function process() {
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of path is:' . $this->getProperty('path'));
        return parent::process();
    }


}

return 'SovereignUploadProcessor';