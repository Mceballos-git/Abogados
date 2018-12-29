<?php

namespace App\Mail;

use App\Models\PasswordResetModel;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

/**
 * Class invitationEmail
 * @package App\Mail
 */
class InvitationEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var PasswordResetModel
     */
    protected $passwordResetModel;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(PasswordResetModel $passwordResetModel)
    {
        $this->passwordResetModel = $passwordResetModel;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $userModel = $this->passwordResetModel->user;
        $data = [
            'firstName' => $userModel->first_name,
            'lastName' => $userModel->last_name,
            'token' => $this->passwordResetModel->token
        ];
        return $this->from('ezequiel.carrizo.ac@gmail.com')
            ->subject('Sassani-Soft Nueva Cuenta')
            ->view('emails.invitationEmail')
            ->with($data);
    }
}
