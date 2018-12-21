<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordResetModel extends Model
{
    protected $table = 'password_resets';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     * @codeCoverageIgnore
     */
    public function user()
    {
        return $this->belongsTo(UserModel::class, 'user_id', 'id');
    }

    /**
     * @return bool
     */
    public function hasExpired()
    {
        $expirationDate = new \DateTime($this->created_at);
        $expirationDate->modify('+1 day');

        // Token Has Expired.
        if (strtotime(date('Y-m-d H:i:s')) > strtotime($expirationDate->format('Y-m-d H:i:s'))) {
            return true;
        }

        // Token has not expired
        return false;
    }
}