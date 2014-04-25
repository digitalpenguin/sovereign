<?php

$userCollection = array();
$judgesGroup = 'AfricanJudgesGallery#13';//.$this->getProperty('galleryId');
if ($userGroup = $this->modx->getObject('modUserGroup',array('name' => $judgesGroup))) {
    if ($userCollection = $userGroup->getUsersIn()){

        /*foreach ($userCollection as $userObject){
            //do something with the userObject
        }*/
    }

}
$count = sizeof($userCollection);
echo $count;

return $this->outputArray($userCollection, $count);
