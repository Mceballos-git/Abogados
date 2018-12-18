<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


//Route::get('')
Route::get('/posts', 'PostsController@index');


/** ------ Authentication ---------- */
Route::post('/auth/login', 'AuthenticationController@login');
Route::middleware('auth:api')->get('/auth/logout', 'AuthenticationController@logout');


/** ------------ User Security  ------------ **/

Route::middleware('auth:api')->post('/user-security/change-password', 'UserSecurityController@changePassword'); // Change Password.
Route::post('/user-security/forgot-password', 'UserSecurityController@forgotPassword'); // Forgot Password.
Route::post('/user-security/reset-password', 'UserSecurityController@resetPassword'); // Forgot Password.





