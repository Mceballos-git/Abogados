<?php

namespace App\Services;

use App\Mail\ForgotPassword;
use App\Mail\InvitationEmail;
use App\Models\PasswordResetModel;
use App\Models\UserModel;
use Illuminate\Support\Facades\Mail;

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
     * @return mixed
     */
    public function getActiveUserByEmail($email)
    {
        $conditions = [
            'active' => 1,
            'email' => $email
        ];
        return UserModel::where($conditions)->first();
    }

    /**
     *
     * @param $emailOrUsername
     */
    public function getActiveUserByEmailOrUsername($emailOrUsername)
    {
        $query = UserModel::where('active', 1);
        $query->where(function($q) use ($emailOrUsername) {
            $q->where('username', $emailOrUsername);
            $q->orWhere('email', $emailOrUsername);
        });
        return $query->first();
    }

    /**
     * Creates a PasswordResetModel for the given $userModel and Send new InvitationEmail
     *
     * @param UserModel $userModel
     * @return bool
     * @throws \Exception
     */
    public function sendInvitationEmail(UserModel $userModel)
    {
        $passwordReset = $this->createPasswordReset($userModel);
        Mail::to($userModel)->send(new InvitationEmail($passwordReset));
        return true;
    }

    /**
     * Create Password Reset Model for given user
     *
     * @param UserModel $userModel
     * @return mixed
     * @throws \Exception
     */
    private function createPasswordReset(UserModel $userModel)
    {
        // Create new Reset Password Request
        return PasswordResetModel::create([
            'user_id' => $userModel->id,
            'token' => $token = bin2hex(random_bytes(72))
        ]);
    }

    /**
     * Creates a PasswordResetModel and send an Email to the related user
     *
     * @param UserModel $userModel
     * @return bool
     * @throws \Exception
     */
    public function sendPasswordResetEmail(UserModel $userModel)
    {
        $passwordReset = $this->createPasswordReset($userModel);
        Mail::to($userModel)->send(new ForgotPassword($passwordReset));
        return true;
    }
}