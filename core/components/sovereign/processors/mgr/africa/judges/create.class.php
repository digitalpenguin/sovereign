<?php

class AfricanSingleJudgeCreateProcessor extends modObjectProcessor {

    public $object;

    public function process() {
        // gets the id of current gallery
        $galleryId = $this->getProperty('galleryId');

        // creates a group using the gallery id if one doesn't already exist
        if (!$group = $this->modx->getObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId))) {
            $group = $this->modx->newObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId));
            $group->save();
        }

        // set the group id to gallery
        $groupId = $group->get('id');
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of groupid : ' . $groupId);
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of galleryid : ' . $galleryId);

        $gallery = $this->modx->getObject('africanGalleries', array('id' => $galleryId));
        $gallery->set('usergroupid', $groupId);
        $gallery->save();


        // creates the appropriate role for the user if it doesn't already exist
        if (!$role = $this->modx->getObject('modUserGroupRole', array('name' => 'AfricanJudge'))) {
            $role = $this->modx->newObject('modUserGroupRole',
                array('name' => 'AfricanJudge',
                    'authority' => '7'));
            $role->save();
        }

        // creates the user account with all the fields the judge will need
        if(!$user = $this->modx->getObject('modUserProfile', array('email' => $this->getProperty('email')))) {
            $user = $this->modx->newObject('modUser', array('username' => $this->getProperty('email')));
            $user->set('password', md5($this->getProperty('password')));
            $profile = $this->modx->newObject('modUserProfile');
            $profile->set('fullname', $this->getProperty('fullname'));
            $profile->set('email', $this->getProperty('email'));
            $profile->save();
            $user->addOne($profile);


            $success = $user->save();
        } else {
            $success = false;
        }

        // Assign the user both a group and a role
        $joinSuccess = $user->joinGroup($group->get('id'), $role->get('id'));


        if ($success && $joinSuccess) {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Created: '.print_r($_POST,true));
            return $this->success();
        } else {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Join failed');
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Denied: '.print_r($_POST,true));
            return $this->failure();
        }

    }

}
return 'AfricanSingleJudgeCreateProcessor';