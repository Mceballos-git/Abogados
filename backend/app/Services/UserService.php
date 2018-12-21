<?php

namespace App\Services;

use App\Models\UserModel;

/**
 * Centralized Section to Interact with user Models
 *
 * Class UserService
 * @package App\Services
 */
class UserService
{


    /**
     * Search for an entry in users table with values active = 1 and email = :$email
     *
     * @param $email
     * @return UserModel
     */
    public function getActiveUserByEmail($email)
    {

        $conditions = [
            'active' => 1,
            'email' => $email
        ];
        return UserModel::where($conditions)->first();
    }
}