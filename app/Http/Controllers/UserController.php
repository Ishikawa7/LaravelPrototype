<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller as BaseController;
use App\Models\User;
use App\Models\Admin;

class HomeController extends BaseController
{
    public function index(){
        $user= User::find(session('id'));
        $admin= Admin::find(session('id'));

        return view('user')
            ->with('nome',$user->nome);
    }
}
?>