<?php

class AfricanSingleJudgeCreateProcessor extends modObjectProcessor {

    public $object;
    private $resourceParentId = 21; // Change on upload
    private $resourceTemplateId = 10; // Change on upload

    public function process() {
        // gets the id of current gallery
        $galleryId = $this->getProperty('galleryId');

        // creates a group using the gallery id if one doesn't already exist
        if (!$userGroup = $this->modx->getObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId))) {
            $userGroup = $this->modx->newObject('modUserGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId));
            $userGroup->save();
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
            $user = $this->modx->newObject('modUser', array('username' => $this->getProperty('email'))); // make the username the email
            $user->set('primary_group', $userGroup->get('id'));
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
        $joinSuccess = $user->joinGroup($userGroup->get('id'), $role->get('id'));


        // creates a judges gallery page if it doesn't already exist
        if (!$galleryPage = $this->modx->getObject('modResource', array('pagetitle' => 'AfricanJudgesGallery#'.$galleryId))) {
            $galleryPage = $this->modx->newObject('modResource', array('pagetitle' => 'AfricanJudgesGallery#'.$galleryId));
            $galleryPage->set('createdby', $this->modx->user->id);
            $galleryPage->set('parent', $this->resourceParentId);
            $galleryPage->set('template', $this->resourceTemplateId);
            $galleryPage->set('pagetitle', 'AfricanJudgesGallery#'.$galleryId);
            $galleryPage->set('published', 1);
            $galleryPage->set('content', 'Testing testing testing');
            $galleryPage->set('alias', 'african-judges-gallery'.$galleryId);
            $galleryPage->save();



            // creates a resource group if it doesn't already exist
            if (!$resourceGroup = $this->modx->getObject('modResourceGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId))) {
                $resourceGroup = $this->modx->newObject('modResourceGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId));
                $resourceGroup->save();
            } else {
                $resourceGroup = $this->modx->getObject('modResourceGroup', array('name' => 'AfricanJudgesGallery#'.$galleryId));
            }

            // Add page to the resource group
            $galleryPage->joinGroup($resourceGroup->get('id'));

            // Add the resource group to the user group
            $rgId = $resourceGroup->get('id');
            $resourceAccess = $this->modx->newObject('modAccessResourceGroup');
            $resourceAccess->fromArray(array(
                'principal' => $userGroup->get('id'),
                'principal_class' => 'modUserGroup',
                'target' => $rgId,
                'authority' => 9999,
                'policy' => 14,
                'context_key' => 'mgr',
            ));
            if ($resourceAccess->save() == false) {
                $this->modx->log(modX::LOG_LEVEL_ERROR,'6-1. Could not create access to RG');
            } else {$this->modx->log(modX::LOG_LEVEL_ERROR,'6-1. Access to RG created');}

        }


        if ($success && $joinSuccess) {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Created: '.print_r($_POST,true));
            return $this->success();
        } else {
            $this->modx->log(modX::LOG_LEVEL_ERROR,'Profile Denied: '.print_r($_POST,true));
            return $this->failure();
        }

    }

}
return 'AfricanSingleJudgeCreateProcessor';