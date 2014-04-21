<?php

class AfricanSingleJudgeCreateProcessor extends modObjectProcessor {

    public $object;

/*
    public function process() {
        $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of galleryId : ' . $this->getProperty('galleryId'));


        $user = $this->modx->newObject('modUser', array('username' => $this->getProperty('username')));
        $user->set('password', md5($this->getProperty('password')));
        $userProfile = $this->modx->newObject('modUserProfile');
        $userProfile->set('fullname', $this->getProperty('fullname'));
        $userProfile->set('email', $this->getProperty('email'));
        $success = $user->addOne($userProfile);
        if ($success) {
            $user->save();
            $this->modx->log(modX::LOG_LEVEL_DEBUG, 'SUCCESS');
            return $this->success();
        } else {
            $this->modx->log(modX::LOG_LEVEL_DEBUG, 'FAILURE');
            return $this->failure();
        }
    }*/

    public function process() {
        // gets the id of current gallery
        $galleryId = $this->getProperty('galleryId');

        // creates a group using the gallery id if one doesn't already exist
        if (!$group = $this->modx->getObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId))) {
            $group = $this->modx->newObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId));
            $group->save();
        }

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
            $user->addOne($profile);
            $success = $user->save();
        } else {
            $success = false;
        }

        $joinSuccess = $user->joinGroup($group->id, $role->id);

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