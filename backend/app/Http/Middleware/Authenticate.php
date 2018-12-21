<?php

namespace App\Http\Middleware;

use Illuminate\Auth\AuthenticationException;
use \Tymon\JWTAuth\Http\Middleware\Authenticate as Middleware;
use Closure;

class Authenticate extends Middleware
{

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     *
     * @throws \Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException
     *
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        var_dump('tu puta madre');
        die();

        $this->authenticate($request);

        return $next($request);
    }


    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        throw new AuthenticationException();
    }
}
