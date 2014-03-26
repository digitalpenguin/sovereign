<?php
class SovereignHomeManagerController extends SovereignManagerController {
    public function process(array $scriptProperties = array()) {
 
    }
    public function getPageTitle() { return $this->modx->lexicon('sovereign'); }
    public function loadCustomCssJs() {
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/plugins/fittoparent.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/african-artworks.window.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/african-artworks.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/galleryafrican-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/galleryafrican-judges.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/galleryafrican-public.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/galleryasian-submissions.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/galleryasian-judges.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/mideast/gallerymideast-submissions.grid.js');
        $this->addJavaScript($this->sovereign->config['jsUrl'].'mgr/widgets/europe/galleryeuropean-submissions.grid.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/africa/africa.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/asia/asia.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/mideast/mideast.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/europe/europe.panel.js');
        $this->addJavascript($this->sovereign->config['jsUrl'].'mgr/widgets/home.panel.js');
        $this->addLastJavascript($this->sovereign->config['jsUrl'].'mgr/sections/index.js');
    }
    public function getTemplateFile() { return $this->sovereign->config['templatesPath'].'home.tpl'; }
}
