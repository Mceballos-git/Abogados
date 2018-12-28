<?php

namespace App\Http\Middleware;

use App\Traits\RequestHelperTrait;
use Illuminate\Http\Request;
use Closure;
use App\Traits\ResponseHandlerTrait;
use Illuminate\Support\Facades\Auth;

/**
 * Class AuthorizationMiddleware
 * @package App\Http\Middleware
 */
class AuthorizationMiddleware
{
    const INVALID_ROUTE_CONFIG = 'Route is configured to use Authorization middleware but roles were not configured';
    const INVALID_USER_ROLES = 'You have not set any role.';
    const INVALID_CREDENTIALS = 'You must be logged in';
    const NOT_ACCESS = 'You have not access to this resource';

    use ResponseHandlerTrait;
    use RequestHelperTrait;


    /**
     * Handle an incoming request in order to verify if the user has the right permissions to execute it
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param Bool $validate
     * @return mixed
     *
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     */
    public function handle(Request $request, Closure $next, $rolesString)
    {
        // Get user to interact with, if not found return authentication error.
        if (!$user = Auth::user()) {
            return $this->unauthorizedResponse(self::INVALID_CREDENTIALS);
        }

        $this->setRequest($request);

        // Check that there is roles available to compare with
        $validRoles = explode('.', $rolesString);
        if (!$validRoles || !is_array($validRoles) || !count($validRoles)) {
            return $this->forbiddenResponse(self::INVALID_ROUTE_CONFIG);
        }

        // Get user roles
        $userRoles = $user->getRoles();
        $forbiddenRole = (!$userRoles || !is_array($userRoles) || !count($userRoles));
        if ($forbiddenRole) {
            return $this->forbiddenResponse(self::INVALID_USER_ROLES);
        }

        // If user roles not accord to $userRoles - return 403.
        if (!$this->validate($validRoles, $userRoles)) {
            return $this->forbiddenResponse(self::NOT_ACCESS);
        }

        // Otherwise continue execution as normal
        return $next($request);
    }

    /**
     * Validate if specified roles exist in role array.
     * @param array $roles
     * @param array $userRoles
     * @return bool
     */
    private function validate(array $roles, $userRoles)
    {
        $valid = false;
        foreach ($userRoles as $role) {
            if (in_array($role, $roles)) {
                $valid = true;
                break;
            }
        }
        return $valid;
    }
}
