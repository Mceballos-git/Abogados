<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PostsController extends Controller
{
    /**
     * PostsController constructor.
     */
    public function __construct()
    {

        $this->middleware('auth:api');
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $posts = Post::get();
        return response()->json(compact('posts'));
    }
}
