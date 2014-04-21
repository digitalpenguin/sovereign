<?php

class AfricanJudgeCreateProcessor extends modProcessor {

    public function process() {
        $user = $this->modx->newObject('modUser', array('username' => 'SallyRand'));
        $userProfile = $this->modx->newObject('modUserProfile');
        $userProfile->set('fullname', 'Sally Rand');
        $userProfile->set('email', 'sally@digitalpenguin.hk');
        $success = $user->addOne($userProfile);
        if ($success) {
            $user->save();
            $this->modx->log(modX::LOG_LEVEL_DEBUG, 'SUCCESS');
            return $this->success();
        } else {
            $this->modx->log(modX::LOG_LEVEL_DEBUG, 'FAILURE');
            return $this->failure();
        }
    }

}
return 'AfricanJudgeCreateProcessor';