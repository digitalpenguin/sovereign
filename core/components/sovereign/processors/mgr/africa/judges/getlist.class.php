<?php
class AssignedJudgesGetListProcessorOld extends modObjectGetListProcessor {
    public $classKey = 'modUser';
    public $languageTopics = array('user');
    public $permission = 'view_user';
    public $defaultSortField = 'email';


    public function initialize() {
        $initialized = parent::initialize();
        $this->setDefaultProperties(array(
            'usergroup' => false,
            'query' => '',
        ));
        if ($this->getProperty('sort') == 'username_link') $this->setProperty('sort','username');
        if ($this->getProperty('sort') == 'id') $this->setProperty('sort','modUser.id');
        return $initialized;
    }


    public function getData() {

        $data = array();
        $userCollection = array();
        $judgesGroup = 'AfricanJudgesGallery#'.$this->getProperty('galleryId');
        if ($userGroup = $this->modx->getObject('modUserGroup',array('name' => $judgesGroup))) {
            $userCollection = $userGroup->getUsersIn();
            $userCollection->leftJoin('modUserProfile', 'Profile');

            /*foreach ($userCollection as $userObject) {
                $username = $userObject->get('username');
                $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of username : ' . $username);
                $profile = $userObject->getOne('Profile');
                $this->modx->log(modX::LOG_LEVEL_DEBUG, 'The current value of fullname : ' . $profile->fullname);



            }*/

        }

        $data['total'] = sizeof($userCollection);

        $data['results'] = $userCollection;

        return $data;
    }



    public function prepareQueryBeforeCount(xPDOQuery $c) {
        $c->leftJoin('modUserProfile','Profile');

        $query = $this->getProperty('query','');
        if (!empty($query)) {
            $c->where(array('modUser.username:LIKE' => '%'.$query.'%'));
            $c->orCondition(array('Profile.fullname:LIKE' => '%'.$query.'%'));
            $c->orCondition(array('Profile.email:LIKE' => '%'.$query.'%'));
        }

        $userGroup = $this->getProperty('usergroup',0);
        if (!empty($userGroup)) {
            $c->innerJoin('modUserGroupMember','UserGroupMembers');
            $c->where(array(
                'UserGroupMembers.user_group' => $userGroup,
            ));
        }


        return $c;
    }

    public function prepareQueryAfterCount(xPDOQuery $c) {
        $c->select($this->modx->getSelectColumns('modUser','modUser'));
        $c->select($this->modx->getSelectColumns('modUserProfile','Profile','',array('fullname','email','blocked')));
        //$this->setProperty('username', $this->getProperty('email'));
        return $c;
    }

    /**
     * Prepare the row for iteration
     * @param xPDOObject $object
     * @return array
     */
    public function prepareRow(xPDOObject $object) {
        $objectArray = $object->toArray();
        $objectArray['blocked'] = $object->get('blocked') ? true : false;
        $objectArray['cls'] = 'pupdate premove pcopy';
        unset($objectArray['password'],$objectArray['cachepwd'],$objectArray['salt']);
        return $objectArray;
    }
}
return 'AssignedJudgesGetListProcessorOld';